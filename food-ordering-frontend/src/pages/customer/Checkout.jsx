import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { placeOrder } from "../../services/orderService";
import getErrorMessage from "../../utils/errorHandler";

const Checkout = () => {

    const navigate = useNavigate();

    const {
        cartItems,
        totalItems,
        totalPrice,
        fetchCart
    } = useCart();

    const [formData, setFormData] = useState({
        deliveryAddress: "",
        paymentMethod: "COD"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (!formData.deliveryAddress.trim()) {
            setError("Please enter your delivery address.");
            return;
        }

        if (!formData.paymentMethod) {
            setError("Please select a payment method.");
            return;
        }

        if (cartItems.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        try {

            setLoading(true);

            const order = await placeOrder({
                deliveryAddress: formData.deliveryAddress,
                paymentMethod: formData.paymentMethod
            });

            await fetchCart(); // Refresh cart after placing order

            // Backend clears the cart after successful order placement.
            // Refreshing the page/context will fetch the empty cart.
            navigate(`/order-success/${order.id}`);

        } catch (error) {

            console.error("Failed to place order:", error);

            setError(
                getErrorMessage(
                    error,
                    "Failed to place order. Please try again."
                )
            );

        } finally {

            setLoading(false);

        }
    };

    /* ================= EMPTY CART ================= */

    if (cartItems.length === 0) {

        return (

            <div className="bg-gray-50 min-h-screen">

                <div className="max-w-4xl mx-auto px-6 py-16">

                    <div className="bg-white rounded-2xl shadow-md p-12 text-center">

                        <div className="text-7xl">
                            🛒
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mt-5">
                            Your cart is empty
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Add some delicious food before checking out.
                        </p>

                        <Link
                            to="/restaurants"
                            className="inline-block mt-6 bg-orange-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
                        >
                            Browse Restaurants →
                        </Link>

                    </div>

                </div>

            </div>

        );
    }

    return (

        <div className="bg-gray-50 min-h-screen">

            {/* ================= HEADER ================= */}

            <div className="bg-orange-500 text-white py-10">

                <div className="max-w-7xl mx-auto px-6">

                    <Link
                        to="/cart"
                        className="text-orange-100 hover:text-white text-sm"
                    >
                        ← Back to Cart
                    </Link>

                    <h1 className="text-4xl font-bold mt-4">
                        Checkout
                    </h1>

                    <p className="mt-2 text-orange-100">
                        Enter your delivery details and place your order.
                    </p>

                </div>

            </div>


            {/* ================= CONTENT ================= */}

            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                    {/* ================= FORM ================= */}

                    <div className="lg:col-span-2">

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            {/* Delivery Address */}

                            <div className="bg-white rounded-2xl shadow-md p-6">

                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    📍 Delivery Address
                                </h2>

                                <label
                                    htmlFor="deliveryAddress"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Full Delivery Address
                                </label>

                                <textarea
                                    id="deliveryAddress"
                                    name="deliveryAddress"
                                    value={formData.deliveryAddress}
                                    onChange={handleChange}
                                    placeholder="Enter your complete delivery address..."
                                    rows="5"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 resize-none"
                                    required
                                />

                                <p className="text-gray-400 text-sm mt-2">
                                    Please provide a complete address so your order can be delivered correctly.
                                </p>

                            </div>


                            {/* Payment Method */}

                            <div className="bg-white rounded-2xl shadow-md p-6">

                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    💳 Payment Method
                                </h2>

                                <div className="space-y-3">


                                    {/* COD */}

                                    <label
                                        className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${formData.paymentMethod === "COD"
                                            ? "border-orange-500 bg-orange-50"
                                            : "border-gray-200 hover:border-orange-300"
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="COD"
                                            checked={
                                                formData.paymentMethod === "COD"
                                            }
                                            onChange={handleChange}
                                            className="w-5 h-5 accent-orange-500"
                                        />

                                        <div>

                                            <p className="font-bold text-gray-800">
                                                💵 Cash on Delivery
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Pay when your order arrives.
                                            </p>

                                        </div>

                                    </label>


                                    {/* Online Payment */}

                                    <label
                                        className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${formData.paymentMethod === "ONLINE"
                                            ? "border-orange-500 bg-orange-50"
                                            : "border-gray-200 hover:border-orange-300"
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="ONLINE"
                                            checked={
                                                formData.paymentMethod === "ONLINE"
                                            }
                                            onChange={handleChange}
                                            className="w-5 h-5 accent-orange-500"
                                        />

                                        <div>

                                            <p className="font-bold text-gray-800">
                                                💳 Online Payment
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Online payment integration can be added later.
                                            </p>

                                        </div>

                                    </label>

                                </div>

                            </div>


                            {/* Error */}

                            {error && (

                                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">

                                    <p className="font-semibold">
                                        {error}
                                    </p>

                                </div>

                            )}


                            {/* Place Order */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >

                                {loading
                                    ? "Placing Order..."
                                    : "Place Order →"
                                }

                            </button>

                        </form>

                    </div>


                    {/* ================= ORDER SUMMARY ================= */}

                    <div>

                        <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">

                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Order Summary
                            </h2>


                            {/* Items */}

                            <div className="space-y-4 mb-6">

                                {cartItems.map((item) => {

                                    const foodName =
                                        item.food?.name ||
                                        item.foodName ||
                                        item.name ||
                                        `Food Item #${item.foodId}`;

                                    return (

                                        <div
                                            key={item.id}
                                            className="flex justify-between gap-4"
                                        >

                                            <div>

                                                <p className="font-semibold text-gray-700">
                                                    {foodName}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    ₹{item.price} × {item.quantity}
                                                </p>

                                            </div>

                                            <p className="font-semibold text-gray-800 whitespace-nowrap">
                                                ₹{item.subtotal}
                                            </p>

                                        </div>

                                    );

                                })}

                            </div>


                            <div className="border-t pt-5 space-y-4">

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
                                        Delivery Fee
                                    </span>

                                    <span>
                                        ₹0
                                    </span>

                                </div>


                                <div className="border-t pt-4">

                                    <div className="flex justify-between text-xl font-bold">

                                        <span>
                                            Total
                                        </span>

                                        <span className="text-orange-500">
                                            ₹{totalPrice}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Checkout;