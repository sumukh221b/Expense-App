import axios from 'axios'
import swal from 'sweetalert'

export const asyncRegisterUser = (formData, handleRedirect) => {
   return (dispatch) => {
      axios.post('http://localhost:3021/users/register', formData)
         .then((response) => {
            const userData = response.data
            if (userData.hasOwnProperty('errors')) {
               dispatch(setErrors(userData.errors))
            } else {
               dispatch(registerUser(userData))
               dispatch(setErrors({}))
               handleRedirect()
               swal('Hi there..!', 'Registered account successfully', "success")
            }
         })
         .catch((err) => {
            swal('Hi there..!', `${err.message}`, 'warning')
         })
   }
}

export const registerUser = (userData) => {
   return {
      type: 'ADD_USER',
      payload: userData
   }
}

export const setErrors = (err) => {
   return {
      type : 'SET_ERRORS',
      payload : err
   }
}

export const asyncLoginUser = (formData, handleRedirect) => {
   return (dispatch) => {
      axios.post('http://localhost:3021/users/login', formData)
         .then((response) => {
            const userData = response.data
            if (userData.hasOwnProperty('errors')) {
               dispatch(setErrors(userData.errors))
            } else {
               localStorage.setItem('token', userData.token)
               const tokenVerify = userData.token
               if(tokenVerify === undefined) {
                  swal('Hi User..!', 'invalid email or password', "error")
               } else {
                  handleRedirect()
                  swal('Hi User..!', 'Logged-in successfully', "success")
               }
            }
         })
         .catch((err) => {
            alert(err.message)
         })
   }
}