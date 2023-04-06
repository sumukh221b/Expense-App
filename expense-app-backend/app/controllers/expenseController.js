const Expense = require('../models/Expense')
const Category = require('../models/Categories')

const expenseCtrl = {}

expenseCtrl.create = (req, res) => {
    const body = req.body
    const expenseDetails = new Expense(body)
    expenseDetails.userId = req.user._id
    const category = Category.find({ userId: req.user._id })
    expenseDetails.save()
        .then((expenses) => {
            res.status(200).json(expenses)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

expenseCtrl.list = (req, res) => {
    Expense.find({ userId: req.user._id })
        .then((expenses) => {
            res.status(200).json(expenses)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

expenseCtrl.show = (req, res) => {
    const id = req.params.id
    Expense.find({ _id: id, userId: req.user._id })
        .then((expenses) => {
            res.status(200).json(expenses)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

expenseCtrl.showDeleted = (req, res) => {
    Expense.find({ userId: req.user._id, deleted: true })
        .then((expenses) => {
            res.status(200).json(expenses)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

expenseCtrl.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Expense.findOneAndUpdate({ _id: id, userId: req.user._id }, body, { new: true })
        .then((expense) => {
            res.status(200).json(expense)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

expenseCtrl.softDelete = (req, res) => {
    const id = req.params.id
    Expense.delete({ _id: id, userId: req.user._id })
        .then((expense) => {
            res.status(200).json({
                'expense': expense,
                '_id': id
            })
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

expenseCtrl.restoreExpense = (req, res) => {
    const id = req.params.id
    Expense.findOne({ _id: id, userId: req.user._id, deleted: true })
        .then((expense) => {
            console.log('expense', expense)
            if (expense) {
                expense.restore(function (err, restored) {
                    if (err) {
                        res.json(err.message)
                    }
                    res.json(restored)
                })
            } else {
                res.json('not found')
            }

        })
        .catch((err) => {
            res.json(err)
        })
}

/* 
expenseController.restore =  function(req,res){
    const id = req.params.id 
    Expense.findOne({_id:id, userId:req.user._Id, deleted:true})
    .then((expense) => {  
        if(expense){
            expense.restore(function(err,restored){
                if(err){
                    res.json(err.message)
                }
                res.json(restored)
            }) 
        }else{
            res.json('not found')
        }
           
    })
    .catch((err) =>{
        res.json(err)
    })
}
*/

expenseCtrl.hardDelete = (req, res) => {
    const id = req.params.id
    Expense.findOneAndDelete({ _id: id, userId: req.user._id })
        .then((expense) => {
            res.status(200).json(expense)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

module.exports = expenseCtrl