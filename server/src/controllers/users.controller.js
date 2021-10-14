const usersController = {}
const User = require('../models/User');

usersController.GetUsuarios = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
}

module.exports = usersController;