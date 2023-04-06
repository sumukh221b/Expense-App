const Budget = require('../models/Budget')

const budgetCtrl = {}

budgetCtrl.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Budget.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true })
        .then((budget) => {
            res.status(200).json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}

budgetCtrl.show = (req, res) => {
    Budget.findOne({ userId: req.user._id })
        .then((budget) => {
            res.status(200).json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = budgetCtrl