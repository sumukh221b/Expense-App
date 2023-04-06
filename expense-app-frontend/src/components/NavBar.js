import React, { useEffect } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import Login from './Login'
import Registration from "./Registration";
import Home from "./Home";
import Setting from "./Settings";
import Profile from "./Profile";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import swal from 'sweetalert'

const NavBar = (props) => {
    const { userLoggedIn, handleAuth } = props

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            props.history.push('/about')
        }
    }, [])

    return (
        <div>
            {userLoggedIn ? (
                <>
                    <div className='row'>
                        <nav className="navbar navbar-dark bg-dark fixed-top">
                            <div className="container-fluid">
                                <h3 className="navbar-brand"> Welcome to Expenseeve App </h3>
                                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
                                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                            <li className="nav-item">
                                                <Link style={{ textDecoration: 'none' }} className="nav-link" aria-current="page" to="/home">Home</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link style={{ textDecoration: 'none' }} className="nav-link" to="/setting">Setting</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link style={{ textDecoration: 'none' }} className="nav-link" to="/profile">Profile</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link style={{ textDecoration: 'none' }} className="nav-link" onClick={() => {
                                                    localStorage.removeItem('token')
                                                    swal("Hi User", "You have successfully logged out", "success")
                                                    handleAuth()
                                                    props.history.push("/login")
                                                }}>Logout</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </>
            ) : (
                <>
                    <nav className="navbar justify-content-end" >
                        <ul className="nav">
                            <li className="nav-item">
                                <Link style={{ textDecoration: 'none', color: 'white' }} className="nav-link" aria-current="page" to="/about">About us</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{ textDecoration: 'none', color: 'white' }} className="nav-link" aria-current="page" to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{ textDecoration: 'none', color: 'white' }} className="nav-link" aria-current="page" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{ textDecoration: 'none', color: 'white' }} className="nav-link" aria-current="page" to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
            <div>
                <Route path="/register" component={Registration} exact={true} />
            </div>
            <div>
                <Route path="/login" render={(props) => {
                    return (
                        <Login {...props} handleAuth={handleAuth} />
                    )
                }} exact={true} />
            </div>
            <div>
                <Route path="/home" component={Home} exact={true} />
            </div>
            <div>
                <Route path="/setting" component={Setting} exact={true} />
            </div>
            <div>
                <Route path="/profile" component={Profile} exact={true} />
            </div>
            <div>
                <Route path="/about" component={AboutUs} exact={true} />
            </div>
            <div>
                <Route path="/contact" component={Contact} exact={true} />
            </div>
        </div>
    )
}

const WrappedComponent = withRouter(NavBar)

export default WrappedComponent