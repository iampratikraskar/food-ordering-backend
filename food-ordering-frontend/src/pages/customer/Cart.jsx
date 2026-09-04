import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Cart = () => {

    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
    } = useCart();


    // Empty cart
    if (cartItems.length === 0) {

        return (
            <div className="min-h-screen bg-gray-50">

                <div className="max-w-4xl mx-auto px-6 py-20 text-center">

                    <div className="text-8xl mb-6">
                        🛒
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Your Cart is Empty
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Looks like you haven't added anything yet.
                    </p>

                    <Link
                        to="/restaurants"
                        className="inline-block mt-7 bg-orange-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
                    >
                        Explore Restaurants
                    </Link>

                </div>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <section className="bg-orange-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-10">

                    <h1 className="text-4xl font-bold">
                        Your Cart 🛒
                    </h1>

                    <p className="mt-2 text-orange-100">
                        {totalItems} item
                        {totalItems !== 1 ? "s" : ""} in your cart
                    </p>

                </div>

            </section>


            {/* Cart */}
            <section className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-5">

                        {cartItems.map((item) => (

                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row gap-5"
                            >

                                {/* Image */}
                                <div className="w-full sm:w-32 h-32 bg-orange-100 rounded-xl overflow-hidden flex-shrink-0">

                                    {item.imageUrl ? (

                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            onError={(event) => {
                                                event.currentTarget.style.display = "none";
                                            }}
                                        />

                                    ) : (

                                        <div className="w-full h-full flex items-center justify-center text-5xl">
                                            🍽️
                                        </div>

                                    )}

                                </div>


                                {/* Details */}
                                <div className="flex-1">

                                    <div className="flex justify-between gap-4">

                                        <div>

                                            <h2 className="text-xl font-bold text-gray-800">
                                                {item.name}
                                            </h2>

                                            <p className="text-gray-500 text-sm mt-1">
                                                {item.description}
                                            </p>

                                        </div>


                                        <button
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                            className="text-red-500 hover:text-red-700 font-medium"
                                        >
                                            Remove
                                        </button>

                                    </div>


                                    {/* Price + Quantity */}
                                    <div className="flex justify-between items-center mt-5">

                                        <p className="text-xl font-bold text-orange-500">
                                            ₹{item.price}
                                        </p>


                                        <div className="flex items-center border rounded-lg">

                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(item.id)
                                                }
                                                className="px-4 py-2 text-lg font-bold hover:bg-gray-100"
                                            >
                                                −
                                            </button>

                                            <span className="px-4 font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseQuantity(item.id)
                                                }
                                                className="px-4 py-2 text-lg font-bold hover:bg-gray-100"
                                            >
                                                +
                                            </button>

                                        </div>


                                        <p className="font-bold text-gray-800">
                                            ₹{item.price * item.quantity}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}


                        {/* Clear Cart */}
                        <button
                            onClick={clearCart}
                            className="text-red-500 hover:text-red-700 font-medium"
                        >
                            Clear Cart
                        </button>

                    </div>


                    {/* Summary */}
                    <div className="lg:col-span-1">

                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">

                            <h2 className="text-2xl font-bold text-gray-800">
                                Order Summary
                            </h2>


                            <div className="mt-6 space-y-4">

                                <div className="flex justify-between text-gray-600">
                                    <span>
                                        Items
                                    </span>

                                    <span>
                                        {totalItems}
                                    </span>
                                </div>


                                <div className="flex justify-between text-gray-600">
                                    <span>
                                        Subtotal
                                    </span>

                                    <span>
                                        ₹{totalPrice}
                                    </span>
                                </div>


                                <div className="flex justify-between text-gray-600">
                                    <span>
                                        Delivery
                                    </span>

                                    <span className="text-green-600">
                                        Free
                                    </span>
                                </div>


                                <hr />


                                <div className="flex justify-between text-xl font-bold text-gray-800">
                                    <span>
                                        Total
                                    </span>

                                    <span className="text-orange-500">
                                        ₹{totalPrice}
                                    </span>
                                </div>

                            </div>


                            <button
                                className="w-full mt-7 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition"
                            >
                                Proceed to Checkout
                            </button>


                            <Link
                                to="/restaurants"
                                className="block text-center mt-4 text-orange-500 font-medium hover:text-orange-600"
                            >
                                ← Continue Shopping
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
};

export default Cart;