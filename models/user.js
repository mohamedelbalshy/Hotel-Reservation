const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const crypto = require('crypto');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;


var UserSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        minLength: 2,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        minLength: 2,
        required: true
    },
    password:{
        type: String,
        trim: true,
        minLength: 2,
        required: true
    },
    age: {
        type: Number,
        min: 18, 
        max: 65
    }, 
    gender: {
        type: Boolean,
        default: true
    },
    address: {
        type: String,
        minLength: 2
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        minLength:4,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    if (user.password) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next(err);
            });
        });
    }
});


UserSchema.methods.comparePassword = function (password) {

    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.gravatar = function (size) {
    if (!size) size = 200;
    if (!this.email) return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};
UserSchema.plugin(deepPopulate);


module.exports = mongoose.model('User',UserSchema);