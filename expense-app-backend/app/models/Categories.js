const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category