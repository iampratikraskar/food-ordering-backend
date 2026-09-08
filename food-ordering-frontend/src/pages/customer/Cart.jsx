import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Cart = () => {

    const navigate = useNavigate();

    const {
        cartItems,
        totalItems,
        totalPrice,
        loading,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
    } = useCart();

    const handleRemove = async (itemId) => {
        try {
            await removeFromCart(itemId);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to remove item."
            );
        }
    };

    const handleClearCart = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to clear your cart?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await clearCart();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to clear cart."
            );
        }
    };

    const handleCheckout = () => {

        if (cartItems.length === 0) {
            return;
        }

        navigate("/checkout");
    };

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* ================= HEADER ================= */}

            <div className="bg-orange-500 text-white py-10">

                <div className="max-w-7xl mx-auto px-6">

                    <h1 className="text-4xl font-bold">
                        🛒 Your Cart
                    </h1>

                    <p className="mt-2 text-orange-100">
                        Review your items before checkout.
                    </p>

                </div>

            </div>


            {/* ================= CONTENT ================= */}

            <div className="max-w-7xl mx-auto px-6 py-10">


                {/* ================= EMPTY CART ================= */}

                {!loading && cartItems.length === 0 && (

                    <div className="bg-white rounded-2xl shadow-md p-12 text-center">

                        <div className="text-7xl">
                            🛒
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800 mt-5">
                            Your cart is empty
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Looks like you haven't added anything yet.
                        </p>

                        <Link
                            to="/restaurants"
                            className="inline-block mt-6 bg-orange-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
                        >
                            Browse Restaurants →
                        </Link>

                    </div>

                )}


                {/* ================= CART ================= */}

                {cartItems.length > 0 && (

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                        {/* ================= CART ITEMS ================= */}

                        <div className="lg:col-span-2">

                            <div className="flex justify-between items-center mb-5">

                                <div>

                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Cart Items
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-1">
                                        {totalItems} item
                                        {totalItems !== 1 ? "s" : ""}
                                    </p>

                                </div>


                                <button
                                    onClick={handleClearCart}
                                    disabled={loading}
                                    className="text-red-500 hover:text-red-700 font-semibold text-sm"
                                >
                                    Clear Cart
                                </button>

                            </div>


                            <div className="space-y-4">

                                {cartItems.map((item) => {

                                    /*
                                     * Different backend DTOs may return
                                     * the food name in different fields.
                                     *
                                     * We check the common possibilities.
                                     */
                                    const foodName =
                                        item.food?.name ||
                                        item.foodName ||
                                        item.name ||
                                        `Food Item #${item.foodId}`;

                                    const foodDescription =
                                        item.food?.description ||
                                        item.description ||
                                        "";

                                    const foodImage =
                                        item.food?.imageUrl ||
                                        item.imageUrl ||
                                        null;

                                    return (

                                        <div
                                            key={item.id}
                                            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                                        >

                                            <div className="flex flex-col sm:flex-row gap-5">


                                                {/* ================= IMAGE ================= */}

                                                <div className="w-full sm:w-32 h-32 rounded-xl bg-orange-100 flex items-center justify-center overflow-hidden flex-shrink-0">

                                                    {foodImage ? (

                                                        <img
                                                            src={foodImage}
                                                            alt={foodName}
                                                            className="w-full h-full object-cover"
                                                        />

                                                    ) : (

                                                        <span className="text-6xl">
                                                            🍕
                                                        </span>

                                                    )}

                                                </div>


                                                {/* ================= DETAILS ================= */}

                                                <div className="flex-grow">

                                                    {/* Name + Subtotal */}

                                                    <div className="flex justify-between items-start gap-4">

                                                        <div>

                                                            <h3 className="text-xl font-bold text-gray-800">
                                                                {foodName}
                                                            </h3>


                                                            {foodDescription && (

                                                                <p className="text-gray-500 text-sm mt-1">
                                                                    {foodDescription}
                                                                </p>

                                                            )}

                                                        </div>


                                                        <p className="text-xl font-bold text-orange-500 whitespace-nowrap">
                                                            ₹{item.subtotal}
                                                        </p>

                                                    </div>


                                                    {/* PRICE × QUANTITY */}

                                                    <p className="text-gray-500 text-sm mt-3">

                                                        ₹{item.price} × {item.quantity}

                                                    </p>


                                                    {/* ================= CONTROLS ================= */}

                                                    <div className="flex items-center justify-between mt-5">


                                                        {/* Quantity */}

                                                        <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">

                                                            <button
                                                                onClick={() =>
                                                                    decreaseQuantity(item.id)
                                                                }
                                                                disabled={loading}
                                                                className="w-11 h-10 text-xl font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                                                            >
                                                                −
                                                            </button>


                                                            <span className="w-12 text-center font-semibold text-gray-800">
                                                                {item.quantity}
                                                            </span>


                                                            <button
                                                                onClick={() =>
                                                                    increaseQuantity(item.id)
                                                                }
                                                                disabled={loading}
                                                                className="w-11 h-10 text-xl font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                                                            >
                                                                +
                                                            </button>

                                                        </div>


                                                        {/* Remove */}

                                                        <button
                                                            onClick={() =>
                                                                handleRemove(item.id)
                                                            }
                                                            disabled={loading}
                                                            className="text-red-500 hover:text-red-700 font-semibold text-sm disabled:opacity-50"
                                                        >
                                                            🗑 Remove
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                        </div>


                        {/* ================= ORDER SUMMARY ================= */}

                        <div>

                            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">

                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Order Summary
                                </h2>


                                <div className="space-y-4">


                                    {/* Items */}

                                    <div className="flex justify-between text-gray-600">

                                        <span>
                                            Items
                                        </span>

                                        <span>
                                            {totalItems}
                                        </span>

                                    </div>


                                    {/* Subtotal */}

                                    <div className="flex justify-between text-gray-600">

                                        <span>
                                            Subtotal
                                        </span>

                                        <span>
                                            ₹{totalPrice}
                                        </span>

                                    </div>


                                    {/* Delivery */}

                                    <div className="flex justify-between text-gray-600">

                                        <span>
                                            Delivery Fee
                                        </span>

                                        <span>
                                            ₹0
                                        </span>

                                    </div>


                                    {/* Total */}

                                    <div className="border-t pt-4">

                                        <div className="flex justify-between text-xl font-bold text-gray-800">

                                            <span>
                                                Total
                                            </span>

                                            <span className="text-orange-500">
                                                ₹{totalPrice}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* Checkout */}

                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition disabled:opacity-50"
                                >
                                    Proceed to Checkout →
                                </button>


                                {/* Continue Shopping */}

                                <Link
                                    to="/restaurants"
                                    className="block text-center mt-4 text-orange-500 font-semibold hover:text-orange-600"
                                >
                                    ← Continue Shopping
                                </Link>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default Cart;