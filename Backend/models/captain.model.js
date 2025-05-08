const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3, 'Firstname msut be 3 chars or long'],
        },
        lastname : {
            type : String,
            minlength : [3, 'Lastname msut be 3 chars or long'],
        },
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        match : [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
    socketId : {
        type : String,
    },
    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive'
    },
    vehicle : {
        color : {
            type : String,
            required : true,
            minlength : [3, 'Color must be 3 chars or long'],
        },
        plate : {
            type : String,
            required : true,
            minlength : [3, 'Plate must be 3 chars or long'],
        },
        capacity : {
            type : Number,
            required : true,
            min : [1, 'Capacity must be at least 1'],
        },
        vehicleType : {
            type : String,
            required : true,
            enum : ['motorcycle', 'car', 'auto'],
        }
    },
    location : {
        ltd : {
            type : Number,
        },
        lng : {
            type : Number
        }
    }
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : '1d'});
    return token;
}

captainSchema.methods.comparePassowrd = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

captainSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;