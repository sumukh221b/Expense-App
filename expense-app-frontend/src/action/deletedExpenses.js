import axios from 'axios'

export const asyncGetDeletedExpenses = () => {
    return (dispatch) => {
        axios.get('http://localhost:3021/user/expenses', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const expensesData = response.data
                const filteredData = expensesData.filter(ele => ele.deleted)
                if (expensesData.hasOwnProperty('errors')) {
                    alert(expensesData.message)
                } else {
                    dispatch(getExpenses(filteredData))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const getExpenses = (data) => {
    return {
        type : 'SHOW_DELETED_EXPENSES',
        payload : data
    }
}

export const asyncSoftDeleteExpense = () => {
    return (dispatch) => {
        axios.get('http://localhost:3021/user/deletedExpenses', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const deletedData = response.data
                if (deletedData.hasOwnProperty('errors')) {
                    alert(deletedData.message)
                } else {
                    dispatch(deleteExpense(deletedData))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const deleteExpense = (data) => {
    return {
        type : 'DELETED_EXPENSES',
        payload : data
    }
}

export const asyncRestoreExpenses = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3021/user/restoreExpenses/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const expenseData = response.data
                if (expenseData.hasOwnProperty('errors')) {
                    alert(expenseData.message)
                } else {
                    dispatch(restoreExpense(expenseData))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const restoreExpense = (data) => {
    return {
        type: 'RESTORE_EXPENSE',
        payload: data
    }
}