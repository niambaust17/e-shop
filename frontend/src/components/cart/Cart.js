import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import MetaData from '../layout/MetaData';

const Cart = () =>
{
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    const increaseQty = (id, quantity, stock) =>
    {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        dispatch(addToCart(id, newQty));
    }

    const decreaseQty = (id, quantity) =>
    {
        const newQty = quantity - 1;
        if (newQty <= 0) return;
        dispatch(addToCart(id, newQty));
    }

    const removeFromCartHandler = (id) =>
    {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () =>
    {
        navigate('/shipping')
        // user ? <Navigate to='/shipping' /> : <Navigate to='/login' />
    }

    return (
        <>
            <MetaData title={"Your Cart"} />
            {
                cartItems.length === 0 ? <h3 className="mt-5">Your Cart Is Empty</h3> : (
                    <>
                        <div className="container container-fluid">
                            <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                            <div className="row d-flex justify-content-between">
                                <div className="col-12 col-lg-8">
                                    {
                                        cartItems.map(item => (<>
                                            <hr />
                                            <div className="cart-item" key={item.product}>
                                                <div className="row">
                                                    <div className="col-4 col-lg-3">
                                                        <img src={item.image} alt="Laptop" height="90" width="115" />
                                                    </div>

                                                    <div className="col-5 col-lg-3">
                                                        <Link to={`/products/${ item.product }`}>{item.name}</Link>
                                                    </div>


                                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                        <p id="card_item_price">${item.price}</p>
                                                    </div>

                                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                        <div className="stockCounter d-inline">
                                                            <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                                                            <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                            <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                                        </div>
                                                    </div>

                                                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                        <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeFromCartHandler(item.product)}></i>
                                                    </div>

                                                </div>
                                            </div>
                                            <hr />
                                        </>))
                                    }
                                </div>

                                <div className="col-12 col-lg-3 my-4">
                                    <div id="order_summary">
                                        <h4>Order Summary</h4>
                                        <hr />
                                        <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                                        <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>

                                        <hr />
                                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Cart
