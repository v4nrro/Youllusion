const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password, repeatPassword } = req.body;

        if (password != repeatPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (!username || !email || !password || !req.file) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({
            username,
            email,
            password: hashedPassword,
            avatar: process.env.API_URL + '/uploads/images/' + req.file.filename,
        });

        await newUser.save();

        res.status(200).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const user = await Users.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const googleCallback = async (req, res) => {
    try {
        const user = {
            _id: null,
            username: null,
            email: null,
            role: null,
        }

        const foundUser = await Users.findOne({ email: req.user.emails[0].value })

        if (foundUser) {
            user._id = foundUser._id;
            user.username = foundUser.username;
            user.email = foundUser.email;
            user.role = foundUser.role
        }
        else {
            const newUser = new Users({
                username: req.user.name.givenName,
                email: req.user.emails[0].value,
                password: 'google',
                avatar: req.user.photos[0].value,
            });

            user._id = newUser._id;
            user.username = newUser.username;
            user.email = newUser.email;
            user.role = newUser.role

            await newUser.save();
        }

        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.redirect(`http://localhost:4200/auth/callback?token=${token}`); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const validate = async (req, res) => {
    return res.status(200).json({
        message: "Token is valid",
        user: req.user,
    });
}

module.exports = {
    register,
    login,
    validate,
    googleCallback,
};