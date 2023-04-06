const express = require('express')
const multer = require('multer')
const upload = multer({dest:'./upload'})
const router = express.Router()
const userCtrl = require('../app/controllers/userController')
const budgetCtrl = require('../app/controllers/budgetController')
const categoryCtrl = require('../app/controllers/categoryController')
const expenseCtrl = require('../app/controllers/expenseController')
const profileController = require('../app/controllers/profileController')
const {authenticateUser} = require('../app/middlewares/authentication')

// User
router.post('/users/register', userCtrl.register)
router.post('/users/login', userCtrl.login)
router.get('/users/account', authenticateUser, userCtrl.account)

// Budget
router.put('/user/budget/:id', authenticateUser, budgetCtrl.update)
router.get('/user/budget', authenticateUser, budgetCtrl.show)

// Category
router.post('/user/category', authenticateUser, categoryCtrl.create)
router.get('/user/categories', authenticateUser, categoryCtrl.list)
router.get('/user/category/:id', authenticateUser, categoryCtrl.show)
router.put('/user/category/:id', authenticateUser, categoryCtrl.update)
router.delete('/user/category/:id', authenticateUser, categoryCtrl.destroy)

// Expense
router.post('/user/expense', authenticateUser, expenseCtrl.create)
router.get('/user/expenses', authenticateUser, expenseCtrl.list)
router.get('/user/deletedExpenses', authenticateUser, expenseCtrl.showDeleted)
router.get('/user/restoreExpenses/:id', authenticateUser, expenseCtrl.restoreExpense)
router.get('/user/expense/:id', authenticateUser, expenseCtrl.show)
router.put('/user/expense/:id', authenticateUser, expenseCtrl.update)
router.delete('/user/expense/:id', authenticateUser, expenseCtrl.softDelete)
router.delete('/user/permanentDeleteExpense/:id', authenticateUser, expenseCtrl.hardDelete)

// Profile
router.get('/user/profile', authenticateUser, profileController.show)
router.put('/user/profile/:id', authenticateUser, upload.single('image'), profileController.update)


module.exports = router