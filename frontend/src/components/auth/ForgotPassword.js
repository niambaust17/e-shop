import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../redux/actions/authActions';
import MetaData from '../layout/MetaData';

const ForgotPassword = () =>
{
    const [email, setEmail] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, loading, message } = useSelector(state => state.forgotPassword);

    useEffect(() =>
    {

        if (error)
        {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (message)
        {
            alert.success(message);
        }
    }, [dispatch, alert, message, error])

    const submitHandler = (e) =>
    {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);
        dispatch(forgotPassword(formData));
    }

    return (
        <>
            <MetaData title={'Forgot Password'} />
            <div className="container">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">Forgot Password</h1>
                            <div className="form-group">
                                <label htmlFor="email_field">Enter Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <button
                                id="forgot_password_button"
                                type="submit"
                                className="btn" disabled={loading ? true : false}>
                                Send Email
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ForgotPassword
