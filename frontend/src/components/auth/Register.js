import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, register } from '../../redux/actions/authActions';
import MetaData from '../layout/MetaData';

const Register = () =>
{
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector(state => state.auth);

    useEffect(() =>
    {

        if (isAuthenticated)
        {
            navigate('/');
        }
        if (error)
        {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, isAuthenticated, error, navigate])

    const submitHandler = (e) =>
    {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);
        dispatch(register(formData))
    }

    const onChange = e =>
    {
        if (e.target.name === 'avatar')
        {
            const reader = new FileReader();

            reader.onload = () =>
            {
                if (reader.readyState === 2)
                {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        } else
        {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    return (
        <>
            <MetaData title={'Register User'} />
            <div className="container">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mb-3">Register</h1>
                            <div className="form-group">
                                <label htmlFor="email_field">Name</label>
                                <input type="name"
                                    id="name_field"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='Avatar Preview'
                                            />
                                        </figure>
                                    </div>
                                    <div className="ms-2">
                                        <input className="form-control"
                                            type="file"
                                            name='avatar'
                                            id='customFile'
                                            accept="images/*"
                                            onChange={onChange} />
                                        <small>Image must be less than 500kb</small>
                                    </div>
                                </div>
                            </div>

                            <button
                                id="register_button"
                                type="submit"
                                className="btn"
                                disabled={loading ? true : false}
                            >
                                REGISTER
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
