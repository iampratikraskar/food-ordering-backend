import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Navbar = () => {

    const { totalItems } = useCart();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-bold text-orange-500"
                    >
                        🍔 FoodHub
                    </Link>


                    {/* Navigation */}
                    <div className="flex items-center gap-6">

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


                        <Link
                            to="/login"
                            className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;