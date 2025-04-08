const Users = require('../models/Users');

const getAllUsers = async (req, res) => {
    try {
        const users = await Users
            .find();

        res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await Users
            .findById(req.params.id)
            .populate("posts")
            .populate("subscribers");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

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

        res.status(200).json({ message: "User fetched succesfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getLoggedUser,
};