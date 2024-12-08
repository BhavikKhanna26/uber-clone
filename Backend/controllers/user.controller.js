const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async(req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if(isUserAlreadyExist) {
        return res.status(400).json({ message : 'User already exist' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createuser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });

}

module.exports.loginUser = async(req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if(!user) {
        return res.status(401).json({ error : 'Invalid credentials' });
    }

    const isMatch = await user.comparePassowrd(password);

    if(!isMatch) {  
        return res.status(401).json({ error : 'Invalid credentials' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async(req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async(req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    const isBlacklisted = await blacklistTokenModel.findOne({ token });

    if(isBlacklisted) {
        return res.status(200).json({ error : 'Token already blacklisted' });
    }

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message : 'Logout successful' });
}