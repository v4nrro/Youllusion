const Users = require('../models/Users');

const postUser = async (req, res) => {
    try {
        const { username, email, password, avatar } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newUser = new Users({
            username,
            email,
            password,
            avatar,
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    postUser,
};