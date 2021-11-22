import './App.css';
import
{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetail from './components/product/ProductDetail';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useEffect, useState } from 'react';
import { loadUser } from './redux/actions/authActions';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import store from './redux/store';
import Profile from './components/auth/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/auth/UpdateProfile';
import UpdatePassword from './components/auth/UpdatePassword';
import ForgotPassword from './components/auth/ForgotPassword';
import NewPassword from './components/auth/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import Payment from './components/cart/Payment';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import { useSelector } from 'react-redux';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewsList from './components/admin/ReviewsList';

function App()
{
  const [stripeApiKey, setStripeApiKey] = useState('');
  useEffect(() =>
  {
    store.dispatch(loadUser())
    async function getStripeApiKey()
    {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey();
  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>}
          />
          <Route path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>}
          />
          <Route path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>}
          />
          {stripeApiKey &&
            <Route path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                </Elements>
              }
            />
          }
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<NewPassword />} />
          <Route path="/me"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>}
          />
          <Route path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>}
          />
          <Route path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>}
          />
          <Route path="/orders/me"
            element={
              <ProtectedRoute>
                <ListOrders />
              </ProtectedRoute>}
          />
          <Route path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>}
          />
          <Route path="/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>}
          />
          <Route path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductsList />
              </ProtectedRoute>}
          />
          <Route path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>}
          />
          <Route path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>}
          />
          <Route path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrdersList />
              </ProtectedRoute>}
          />
          <Route path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrder />
              </ProtectedRoute>}
          />
          <Route path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>}
          />
          <Route path="/admin/user/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>}
          />
          <Route path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true}>
                <ReviewsList />
              </ProtectedRoute>}
          />
        </Routes>
        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
