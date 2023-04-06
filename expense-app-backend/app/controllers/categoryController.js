const Category = require('../models/Categories')

const categoryCtrl = {}

categoryCtrl.create = (req, res) => {
    const body = req.body
    const categoryDetails = new Category(body)
    categoryDetails.userId = req.user._id
    categoryDetails.save()
        .then((categories) => {
            res.status(200).json(categories)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

categoryCtrl.list = (req, res) => {
    Category.find({ userId: req.user._id })
        .then((categories) => {
            res.status(200).json(categories)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

categoryCtrl.show = (req, res) => {
    const id = req.params.id
    Category.find({ _id: id, userId: req.user._id })
        .then((category) => {
            res.status(200).json(category)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

categoryCtrl.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Category.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true })
        .then((category) => {
            res.status(200).json(category)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

categoryCtrl.destroy = (req, res) => {
    const id = req.params.id
    Category.findOneAndDelete({ _id: id, userId: req.user._id })
        .then((category) => {
            res.status(200).json(category)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

module.exports = categoryCtrl