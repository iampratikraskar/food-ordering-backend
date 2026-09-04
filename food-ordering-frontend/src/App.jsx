import './App.css';

import { Route, Routes } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/customer/Home';
import Restaurants from './pages/customer/Restaurants';
import Foods from './pages/customer/Foods';
import Cart from './pages/customer/Cart';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Dashboard from './pages/admin/Dashboard';

import { CartProvider } from './context/CartContext';


function App() {

    return (
        <CartProvider>

            <div>

                <Navbar />

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/restaurants"
                        element={<Restaurants />}
                    />

                    <Route
                        path="/restaurants/:restaurantId/foods"
                        element={<Foods />}
                    />

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/admin"
                        element={<Dashboard />}
                    />

                </Routes>

                <Footer />

            </div>

        </CartProvider>
    );
}

export default App;