import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

import Home from "./pages/customer/Home";
import Restaurants from "./pages/customer/Restaurants";
import Foods from "./pages/customer/Foods";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";
import Orders from "./pages/customer/Orders";
import OrderDetails from "./pages/customer/OrderDetails";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminRestaurants from "./pages/admin/Restaurants";
import AdminFoods from "./pages/admin/Foods";
import AdminCategories from "./pages/admin/Categories";
import AdminCustomers from "./pages/admin/Customers";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <CartProvider>

                <div className="min-h-screen flex flex-col">

                    <Navbar />

                    <main className="flex-grow">

                        <Routes>

                            {/* =================================
                                PUBLIC CUSTOMER ROUTES
                            ================================= */}

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


                            {/* =================================
                                AUTH ROUTES
                            ================================= */}

                            <Route
                                path="/login"
                                element={<Login />}
                            />

                            <Route
                                path="/register"
                                element={<Register />}
                            />


                            {/* =================================
                                PROTECTED CUSTOMER ROUTES
                            ================================= */}

                            <Route element={<ProtectedRoute />}>

                                <Route
                                    path="/cart"
                                    element={<Cart />}
                                />

                                <Route
                                    path="/checkout"
                                    element={<Checkout />}
                                />

                                <Route
                                    path="/order-success/:orderId"
                                    element={<OrderSuccess />}
                                />

                                <Route
                                    path="/orders"
                                    element={<Orders />}
                                />

                                <Route
                                    path="/orders/:orderId"
                                    element={<OrderDetails />}
                                />

                            </Route>


                            {/* =================================
                                PROTECTED ADMIN ROUTES
                            ================================= */}

                            <Route element={<AdminRoute />}>

                                <Route
                                    path="/admin"
                                    element={<Dashboard />}
                                />

                                <Route
                                    path="/admin/orders"
                                    element={<AdminOrders />}
                                />

                                <Route
                                    path="/admin/restaurants"
                                    element={<AdminRestaurants />}
                                />

                                <Route
                                    path="/admin/foods"
                                    element={<AdminFoods />}
                                />

                                <Route
                                    path="/admin/categories"
                                    element={<AdminCategories />}
                                />

                                <Route
                                    path="/admin/customers"
                                    element={<AdminCustomers />}
                                />

                            </Route>

                        </Routes>

                    </main>

                    <Footer />

                </div>

            </CartProvider>
        </AuthProvider>
    );
}

export default App;