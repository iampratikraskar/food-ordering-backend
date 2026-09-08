import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getOrderById } from "../../services/orderService";

const OrderSuccess = () => {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadOrder();
    }, [orderId]);

    const loadOrder = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getOrderById(orderId);

            setOrder(data);

        } catch (error) {

            console.error(
                "Failed to load order:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load order details."
            );

        } finally {

            setLoading(false);

        }
    };

    /* ================= LOADING ================= */

    if (loading) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="text-7xl animate-bounce">
                        🍔
                    </div>

                    <p className="text-gray-500 mt-4 text-lg">
                        Loading your order...
                    </p>

                </div>

            </div>
        );
    }


    /* ================= ERROR ================= */

    if (error) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

                <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-lg w-full">

                    <div className="text-6xl">
                        😕
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mt-4">
                        Order Not Found
                    </h1>

                    <p className="text-red-500 mt-3">
                        {error}
                    </p>

                    <div className="flex justify-center gap-4 mt-6">

                        <Link
                            to="/orders"
                            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600"
                        >
                            My Orders
                        </Link>

                        <Link
                            to="/"
                            className="border border-gray-300 px-6 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Home
                        </Link>

                    </div>

                </div>

            </div>
        );
    }


    /* ================= SUCCESS ================= */

    return (

        <div className="bg-gray-50 min-h-screen">

            {/* ================= SUCCESS HEADER ================= */}

            <div className="bg-green-500 text-white py-14">

                <div className="max-w-4xl mx-auto px-6 text-center">

                    <div className="w-24 h-24 mx-auto bg-green rounded-full flex items-center justify-center shadow-lg">

                        <span className="text-5xl">
                            ✓
                        </span>

                    </div>

                    <h1 className="text-4xl font-bold mt-6">
                        Order Placed Successfully!
                    </h1>

                    <p className="text-orange-100 mt-3 text-lg">
                        Thank you for ordering with FoodHub.
                    </p>

                </div>

            </div>


            {/* ================= CONTENT ================= */}

            <div className="max-w-4xl mx-auto px-6 py-10">


                {/* Order Information */}

                <div className="bg-white rounded-2xl shadow-md p-7">

                    <div className="flex flex-col sm:flex-row justify-between gap-4 border-b pb-6">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Order ID
                            </p>

                            <h2 className="text-2xl font-bold text-gray-800">
                                #{order.id}
                            </h2>

                        </div>


                        <div>

                            <p className="text-gray-500 text-sm">
                                Status
                            </p>

                            <span className="inline-block mt-1 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                                {order.status}
                            </span>

                        </div>

                    </div>


                    {/* ================= ORDER DETAILS ================= */}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-6 border-b">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Delivery Address
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                                📍 {order.deliveryAddress}
                            </p>

                        </div>


                        <div>

                            <p className="text-gray-500 text-sm">
                                Payment Method
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                                💳 {order.paymentMethod}
                            </p>

                        </div>


                        <div>

                            <p className="text-gray-500 text-sm">
                                Total Amount
                            </p>

                            <p className="font-bold text-orange-500 text-xl mt-1">
                                ₹{order.totalAmount}
                            </p>

                        </div>

                    </div>


                    {/* ================= ITEMS ================= */}

                    <div className="py-6">

                        <h3 className="text-xl font-bold text-gray-800 mb-5">
                            Order Items
                        </h3>

                        <div className="space-y-4">

                            {order.items?.map((item) => {

                                const foodName =
                                    item.food?.name ||
                                    item.foodName ||
                                    item.name ||
                                    `Food Item #${item.foodId}`;

                                return (

                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
                                    >

                                        <div>

                                            <p className="font-semibold text-gray-800">
                                                {foodName}
                                            </p>

                                            <p className="text-gray-500 text-sm mt-1">
                                                ₹{item.price} × {item.quantity}
                                            </p>

                                        </div>

                                        <p className="font-bold text-gray-800">
                                            ₹{item.subtotal}
                                        </p>

                                    </div>

                                );

                            })}

                        </div>

                    </div>


                    {/* ================= TOTAL ================= */}

                    <div className="border-t pt-6">

                        <div className="flex justify-between items-center">

                            <span className="text-xl font-bold text-gray-800">
                                Total
                            </span>

                            <span className="text-2xl font-bold text-orange-500">
                                ₹{order.totalAmount}
                            </span>

                        </div>

                    </div>

                </div>


                {/* ================= ACTIONS ================= */}

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

                    <Link
                        to={`/orders/${order.id}`}
                        className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold text-center hover:bg-orange-600 transition"
                    >
                        📄 View Order Details
                    </Link>

                    <Link
                        to="/orders"
                        className="border border-orange-500 text-orange-500 px-8 py-3 rounded-xl font-bold text-center hover:bg-orange-50 transition"
                    >
                        📦 My Orders
                    </Link>

                    <Link
                        to="/restaurants"
                        className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-bold text-center hover:bg-gray-50 transition"
                    >
                        🍽️ Order More
                    </Link>

                </div>

            </div>

        </div>

    );
};

export default OrderSuccess;