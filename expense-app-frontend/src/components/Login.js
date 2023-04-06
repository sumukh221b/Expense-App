import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { asyncLoginUser } from '../action/userAction';

const Login = (props) => {
  
  const handleRedirect = () => {
    props.history.push('/home')
    props.handleAuth()
  }

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required')
  });

  const dispatch = useDispatch()

  const handleLogin = (values, { resetForm }) => {
    dispatch(asyncLoginUser(values, handleRedirect))
    resetForm()
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
      <div className='col-md-12 d-flex justify-content-center mt-5'>
        <div className="card text-center" style={{ width: '22rem' }}>
          <div className="card-header">
            <h4>Login here</h4>
          </div>
          <div className="card-body">
            <Form >
              <div>
                <label className='d-flex justify-content-left' htmlFor="email">Email:</label>
                <Field className='form-control mt-2' type="email" id="email" name="email" />
                <ErrorMessage name="email" />
              </div>
              <div>
                <label className='d-flex justify-content-left mt-2' htmlFor="password">Password:</label>
                <Field className='form-control mt-2' type="password" id="password" name="password" />
                <ErrorMessage name="password" />
              </div>
              <div className='mt-3'>
                <button className='btn btn-success' type="submit">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  )
}

export default Login