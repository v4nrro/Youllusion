const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await Users
            .find()
            .populate("posts");

        res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await Users
            .findById(req.params.id)
            .select("username posts subscribers avatar")
            .populate("posts")
            .populate("subscribers");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // TODO: Check if the user is subscribed to the user

        res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLoggedUser = async (req, res) => {
    try {
        const user = await Users
        .findById(req.user.userId)
        .populate("posts")
        .populate("subscribers");

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.me = true;

        res.status(200).json({ message: "User fetched succesfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const putCredentials = async (req, res) => {
    try {
        const { username, email } = req.body;

        if( !username || !email ) {
           return res.status(400).json({ message: "Missing required fields" });
        }

        const updatedUser = await Users.findByIdAndUpdate(
            req.user.userId,
            { username, email },
            { new: true, runValidators: true }
        );

        if(!updatedUser){
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Credentials updated succesfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const putAvatar = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const updatedUser = await Users.findByIdAndUpdate(
            req.user.userId,
            { avatar: process.env.API_URL + '/uploads/images/' + req.file.filename },
            { new: true, runValidators: true }
        );

        if(!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Avatar updated succesfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const putPassword = async (req, res) => {
    try {
        const { previousPassword, newPassword, confirmNewPassword } = req.body

        if(newPassword != confirmNewPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await Users.findById(req.user.userId);
        
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(previousPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect previous password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await Users.findByIdAndUpdate(
            req.user.userId,
            { password: hashedPassword },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Password updated succesfully", updatedUser});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteByMe = async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.user.userId);

        res.status(200).json({ message: "Account deleted succesfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteByAdmin = async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Account deleted succesfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSubscriptions = async (req, res) => {
    try {
        const user = await Users
            .findById(req.user.userId)
            .populate("subscriptions");

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Subscriptions fetched successfully", subscriptions: user.subscriptions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getLoggedUser,
    putCredentials,
    putPassword,
    putAvatar,
    deleteByMe,
    deleteByAdmin,
    getSubscriptions,
};