const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const validator = require('validator')
const bcryptjs = require('bcryptjs')
let passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 6,
        maxlength: 64,
        required: [true, 'username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)

            },
            message: function () {
                return 'enter valid email'
            }
        }
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 128,
        required: [true, 'password is required'],
        validate: {
            validator: function (value) {
                return passwordFormat.test(value)
            },
            message: function () {
                return 'Password should contain atleast 1 uppercase, 1 number and 1 special character'
            }
        }
    }
}, { timestamps: true })

userSchema.pre('save', function (next) {
    const user = this
    bcryptjs.genSalt()
        .then((salt) => {
            bcryptjs.hash(user.password, salt)
                .then((encrypted) => {
                    user.password = encrypted
                    next()
                })
        })
})

const User = mongoose.model('User', userSchema)
module.exports = User