import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { clearErrors, login } from '../../redux/actions/authActions';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const Login = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector(state => state.auth);

    console.log(location.search);

    useEffect(() =>
    {

        if (isAuthenticated)
        {
            navigate(from, { replace: true });
        }
        if (error)
        {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, isAuthenticated, navigate, error])

    const submitHandler = (e) =>
    {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={'Login'} />
                    <div className="container">
                        <div className="row wrapper">
                            <div className="col-10 col-lg-5">
                                <form className="shadow-lg" onSubmit={submitHandler}>
                                    <h1 className="mb-3">Login</h1>
                                    <div className="form-group">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password_field">Password</label>
                                        <input
                                            type="password"
                                            id="password_field"
                                            className="form-control"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <Link to="/password/forgot" className="float-end">Forgot Password?</Link>
                                    <br />
                                    <button type="submit" className="btn btn-success float-start my-2">LOGIN</button>
                                    <br />
                                    <Link to="/register" className="float-end">New User?</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Login
