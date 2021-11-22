import React from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../../redux/actions/authActions';
import Search from './Search'

const Header = () =>
{
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart);

    const logoutHandler = () =>
    {
        dispatch(logout());
        alert.success('Logged out')
    }

    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            E-SHOP
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Search />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0">
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                        <span id="cart" className="ms-3">Cart</span>
                        <span className="ms-1" id="cart_count">{cartItems.length}</span>
                    </Link>
                    {
                        user ? (
                            <div class="ms-4 dropdown d-inline">
                                <Link to="" class="btn dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <figure className="avatar avatar-nav">
                                        <img
                                            src={user.avatar && user.avatar.url}
                                            alt={user && user.name}
                                            className="rounded-circle"
                                        />
                                    </figure>
                                    <span>{user && user.name}</span>
                                </Link>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {
                                        user && user.role === 'admin' && (<li><Link to="/dashboard" class="dropdown-item">Dashboard</Link></li>)
                                    }
                                    <li><Link to="/orders/me" class="dropdown-item">Orders</Link></li>
                                    <li><Link to="/me" class="dropdown-item">Profile</Link></li>
                                    <li><Link to="/" class="dropdown-item text-danger" onClick={logoutHandler}>Logout</Link></li>
                                </ul>
                            </div>
                        ) : !loading && <Link to="/login" className="btn ms-5" id="login_btn">Login</Link>
                    }

                </div>
            </nav>
        </>
    )
}

export default Header