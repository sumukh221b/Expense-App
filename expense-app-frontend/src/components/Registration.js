import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { asyncRegisterUser } from '../action/userAction';

const Registration = (props) => {

  const handleRedirect = () => {
    props.history.push('/login')
  }

  const user = useSelector((state) => {
    return state.user
  })

  console.log('user', user)

  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required')
  });

  const dispatch = useDispatch()

  const handleSubmit = (values, { resetForm }) => {
    dispatch(asyncRegisterUser(values, handleRedirect))
    resetForm()
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <div className='col-md-12 d-flex justify-content-center mt-5'>
        <div className="card text-center" style={{width : '22rem'}}>
          <div className="card-header">
            <h4>Please register here</h4>
          </div>
          <div className="card-body">
            <Form>
              <div>
                <label className='d-flex justify-content-left' htmlFor="username">Username:</label>
                <Field className='form-control card-title' id="username" name="username" />
                <ErrorMessage name="username" />
                <div className='error'>{user.errors.username && user.errors.username.message}</div>
              </div>
              <div>
                <label className='d-flex justify-content-left' htmlFor="email">Email:</label>
                <Field className='form-control card-title' type="email" id="email" name="email" />
                <ErrorMessage name="email" />
                <div className='error'>{user.errors.email && user.errors.email.message}</div>
              </div>
              <div>
                <label className='d-flex justify-content-left' htmlFor="password">Password:</label>
                <Field className='form-control card-title' type="password" id="password" name="password" />
                <ErrorMessage name="password" />
                <div className='error'>{user.errors.password && user.errors.password.message}</div>
              </div>
              <div className='mt-2'>
                <button className='btn btn-success' type="submit">Register</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default Registration;