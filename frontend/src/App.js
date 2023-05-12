import React, { useEffect, useState } from 'react'
import './App.css'
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer"
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from "react-redux";
//Auth
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions'
import store from './store';
import axios from 'axios'

//cart
import ProductDetails from './components/product/ProductDetails'
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess';

//order
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

//admin
import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'
import UpdateProduct from './components/admin/UpdateProduct'
import NewProduct from './components/admin/NewProduct'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from './components/admin/ProductReviews'
import ProductCategory from './components/product/ProductCategory';

function App() {

    const [stripeApiKey, setStripeApiKey] = useState('');

    useEffect(() => {
        store.dispatch(loadUser())

        async function getStripApiKey() {
            const { data } = await axios.get('/api/v1/stripeapi');

            setStripeApiKey(data.stripeApiKey)
        }

        getStripApiKey();

    }, [])

    const { cartItems} = useSelector((state) => state.cart);
    var items = [];
      for (var i = 0; i < cartItems.length; i++) {
        items.push(cartItems[i]);
      }

      const valuesGA3 = items.map(
        ({ name, product, price, brand, category, variant, quantity }) => ({
          name,
          id: product,
          price,
          brand,
          category,
          variant,
          quantity,
        })
      );

    return (
        <Router>
            <div className="App">
                <Header />
                <div className="container container-fluid">

                    <Route path="/" component={Home} exact />
                    <Route path="/category" component={ProductCategory} exact />
                    <Route path="/search/:keyword" component={Home} />
                    <Route path="/product/:id" component={ProductDetails} exact />

                    <Route path="/cart" component={Cart} exact valuesGA3={valuesGA3}/>
                    <ProtectedRoute path="/shipping" component={Shipping} valuesGA3={valuesGA3} />
                    <ProtectedRoute path="/confirm" component={ConfirmOrder} exact  valuesGA3={valuesGA3}/>
                    <ProtectedRoute path="/success" component={OrderSuccess} />
                    {stripeApiKey &&
                        <Elements stripe={loadStripe(stripeApiKey)}>
                            <ProtectedRoute path="/payment" component={Payment} />
                        </Elements>
                    }


                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <ProtectedRoute path="/me" component={Profile} exact />
                    <ProtectedRoute path="/me/update" component={UpdateProfile} exact />

                    <ProtectedRoute path="/orders/me" component={ListOrders} exact />
                    <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
                </div>

                <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
                <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
                <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
                <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
                <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
                <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
                <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
                <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
                <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />

                <Footer />
            </div>
        </Router>
    );

}

export default App;
