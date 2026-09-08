import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

    const { totalItems } = useCart();

    const {
        isAuthenticated,
        isAdmin,
        logout
    } = useAuth();

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);


    const handleLogout = () => {

        logout();

        setMenuOpen(false);

        navigate("/");
    };


    const closeMenu = () => {
        setMenuOpen(false);
    };


    return (

        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <div className="flex justify-between items-center h-16">


                    {/* ================= LOGO ================= */}

                    <Link
                        to={isAdmin ? "/admin" : "/"}
                        onClick={closeMenu}
                        className="text-2xl font-bold text-orange-500"
                    >
                        🍔 FoodHub

                        {isAdmin && (
                            <span className="text-sm text-gray-500 ml-2">
                                Admin
                            </span>
                        )}

                    </Link>


                    {/* ================= DESKTOP ================= */}

                    <div className="hidden md:flex items-center gap-6">

                        {!isAdmin ? (

                            <>

                                <Link
                                    to="/"
                                    className="text-gray-700 hover:text-orange-500 font-medium transition"
                                >
                                    Home
                                </Link>


                                <Link
                                    to="/restaurants"
                                    className="text-gray-700 hover:text-orange-500 font-medium transition"
                                >
                                    Restaurants
                                </Link>


                                {isAuthenticated && (

                                    <Link
                                        to="/orders"
                                        className="text-gray-700 hover:text-orange-500 font-medium transition"
                                    >
                                        📦 My Orders
                                    </Link>

                                )}


                                <Link
                                    to="/cart"
                                    className="relative text-gray-700 hover:text-orange-500 font-medium transition"
                                >
                                    🛒 Cart

                                    {totalItems > 0 && (

                                        <span className="absolute -top-3 -right-4 bg-orange-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                                            {totalItems}
                                        </span>

                                    )}

                                </Link>

                            </>

                        ) : (

                            <>

                                <Link
                                    to="/admin"
                                    className="text-gray-700 hover:text-orange-500 font-medium transition"
                                >
                                    📊 Dashboard
                                </Link>


                                <Link
                                    to="/admin/orders"
                                    className="text-gray-700 hover:text-orange-500 font-medium transition"
                                >
                                    📦 Orders
                                </Link>


                                <Link
                                    to="/admin/restaurants"
                                    className="text-gray-700 hover:text-orange-500 font-medium transition"
                                >
                                    🍽️ Restaurants
                                </Link>


                                <Link
                                    to="/admin/foods"
                                    className="text-gray-700 hover:text-orange-500 font-medium transition"
                                >
                                    🍕 Foods
                                </Link>


                                <Link
                                    to="/admin/categories"
                                    className="text-gray-700 hover:text-orange-500 font-medium transition"
                                >
                                    📂 Categories
                                </Link>


                                <Link
                                    to="/admin/customers"
                                    className="text-gray-700 hover:text-orange-500 font-medium transition"
                                >
                                    👥 Customers
                                </Link>

                            </>

                        )}


                        {/* Login / Logout */}

                        {isAuthenticated ? (

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                            >
                                Logout
                            </button>

                        ) : (

                            <Link
                                to="/login"
                                className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                            >
                                Login
                            </Link>

                        )}

                    </div>


                    {/* ================= MOBILE BUTTON ================= */}

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-700 text-3xl focus:outline-none"
                        aria-label="Toggle navigation menu"
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>

                </div>


                {/* ================= MOBILE MENU ================= */}

                {menuOpen && (

                    <div className="md:hidden border-t border-gray-100 py-4">

                        <div className="flex flex-col gap-2">


                            {!isAdmin ? (

                                <>

                                    <Link
                                        to="/"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium"
                                    >
                                        🏠 Home
                                    </Link>


                                    <Link
                                        to="/restaurants"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium"
                                    >
                                        🍽️ Restaurants
                                    </Link>


                                    {isAuthenticated && (

                                        <Link
                                            to="/orders"
                                            onClick={closeMenu}
                                            className="px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium"
                                        >
                                            📦 My Orders
                                        </Link>

                                    )}


                                    <Link
                                        to="/cart"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium flex justify-between"
                                    >

                                        <span>
                                            🛒 Cart
                                        </span>

                                        {totalItems > 0 && (

                                            <span className="bg-orange-500 text-white text-xs font-bold rounded-full min-w-6 h-6 flex items-center justify-center px-2">
                                                {totalItems}
                                            </span>

                                        )}

                                    </Link>

                                </>

                            ) : (

                                <>

                                    <Link
                                        to="/admin"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium"
                                    >
                                        📊 Dashboard
                                    </Link>


                                    <Link
                                        to="/admin/orders"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium"
                                    >
                                        📦 Orders
                                    </Link>


                                    <Link
                                        to="/admin/restaurants"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium"
                                    >
                                        🍽️ Restaurants
                                    </Link>


                                    <Link
                                        to="/admin/foods"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium"
                                    >
                                        🍕 Foods
                                    </Link>


                                    <Link
                                        to="/admin/categories"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium"
                                    >
                                        📂 Categories
                                    </Link>


                                    <Link
                                        to="/admin/customers"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium"
                                    >
                                        👥 Customers
                                    </Link>

                                </>

                            )}


                            {/* Mobile Login / Logout */}

                            {isAuthenticated ? (

                                <button
                                    onClick={handleLogout}
                                    className="mt-2 bg-red-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-600"
                                >
                                    Logout
                                </button>

                            ) : (

                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="mt-2 bg-orange-500 text-white px-4 py-3 rounded-lg font-semibold text-center hover:bg-orange-600"
                                >
                                    Login
                                </Link>

                            )}

                        </div>

                    </div>

                )}

            </div>

        </nav>

    );
};

export default Navbar;