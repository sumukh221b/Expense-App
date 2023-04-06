import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { asyncGetBudget, asyncUpdateBudget } from '../action/budgetAction'
import { asyncAddCategory, asyncGetCategories, asyncRemoveCategory } from '../action/categoryAction'

const Setting = (props) => {
    const [budget, setBudget] = useState('')
    const [category, setCategory] = useState('')

    const dispatch = useDispatch()

    const storeBudget = useSelector((state) => {
        return state.budget
    })

    const storeCategory = useSelector((state) => {
        return state.categories
    })

    useEffect(() => {
        dispatch(asyncGetBudget())
        dispatch(asyncGetCategories())
    }, [dispatch])

    const handleBudget = (e) => {
        e.preventDefault()
        const budgetData = {
            amount: Number(budget)
        }
        dispatch(asyncUpdateBudget(storeBudget._id, budgetData))
        setBudget('')
    }

    const handleCategory = (e) => {
        e.preventDefault()
        const categoryData = {
            name: category
        }
        dispatch(asyncAddCategory(categoryData))
        setCategory('')
    }

    const handleRemove = (id) => {
        const confirmRemove = window.confirm('Are you sure?')
        if (confirmRemove) {
            dispatch(asyncRemoveCategory(id))
        }
    }

    return (
        <div className='row mt-5'>
            <div className='col-md-12 d-flex justify-content-center mt-5'>
                <div className="card text-center" style={{ width: '40rem'}}>
                    <div className="card-header">
                        <h3>Budget and Category Page</h3>
                    </div>
                    <div className="card-body d-flex justify-content-center">
                        <div className='card-title'>
                            <form onSubmit={handleBudget} style={{ width: '22rem' }}>
                                <div className='d-flex justify-content-center'>
                                    <h5>Current Budget - {storeBudget.amount} </h5>
                                </div>
                                <div className='mt-2'>
                                    <input className='form-control' type="text" value={budget} onChange={(e) => setBudget(e.target.value)} />
                                </div>
                                <div className='mt-2'>
                                    <input className='btn btn-success' type="submit" value="Update" />
                                </div>
                            </form>
                            <form className='mt-3' onSubmit={handleCategory} style={{ width: '22rem' }}>
                                <div>
                                    <h5> Add Category </h5>
                                </div>
                                <div className='mt-2'>
                                    <input className='form-control' type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                                </div>
                                <div className='mt-2'>
                                    <input className='btn btn-success' type="submit" value="Add" />
                                </div>
                            </form>
                            <div className='mt-2'>
                                <div>
                                    <h5>Category Lists - {storeCategory.length} </h5>
                                </div>
                                <div className='mt-3 table-wrapper-scroll-y my-custom-scrollbar'>
                                    <table className='table table-bordered table-hover table-striped mb-0'>
                                        <thead className='table-dark thead-light thead-fixed'>
                                            <tr>
                                                <th> Category Name</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                storeCategory.map(category => {
                                                    return (
                                                        <tr key={category._id}>
                                                            <td>{category.name}</td>
                                                            <td> <button onClick={() => handleRemove(category._id)} className='btn btn-danger'> </button> </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting