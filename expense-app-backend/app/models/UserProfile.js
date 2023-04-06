const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userProfileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String
    },
    image: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})
UserProfile = mongoose.model('UserProfile', userProfileSchema)
module.exports = UserProfile