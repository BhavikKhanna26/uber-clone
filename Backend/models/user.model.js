const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
                type : String,
                required : true,
                minlength : [3, 'First name msut be 3 chars or long'],
            },
        lastname : {
            type : String,
            minlength : [3, 'Last name msut be 3 chars or long'],
        },
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minlength : [5, 'Email must be 5 chars or long'],
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
    socketId : {
        type : String,
    },
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : '1d'});
    return token;
}

userSchema.methods.comparePassowrd = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;