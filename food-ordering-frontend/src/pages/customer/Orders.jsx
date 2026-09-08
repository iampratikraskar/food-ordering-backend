import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getMyOrders,
    cancelOrder
} from "../../services/orderService";
import getErrorMessage from "../../utils/errorHandler";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancellingId, setCancellingId] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getMyOrders();

            setOrders(data);

        } catch (error) {

            console.error(
                "Failed to load orders:",
                error
            );

            setError(
                getErrorMessage(
                    error,
                    "Failed to load your orders."
                )
            );

        } finally {

            setLoading(false);

        }
    };


    const handleCancel = async (orderId) => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setCancellingId(orderId);

            const updatedOrder = await cancelOrder(orderId);

            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order.id === orderId
                        ? updatedOrder
                        : order
                )
            );

        } catch (error) {

            console.error(
                "Failed to cancel order:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to cancel this order."
            );

        } finally {

            setCancellingId(null);

        }
    };


    /* ================= STATUS STYLE ================= */

    const getStatusStyle = (status) => {

        switch (status) {

            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            case "CONFIRMED":
                return "bg-blue-100 text-blue-700";

            case "PREPARING":
                return "bg-purple-100 text-purple-700";

            case "OUT_FOR_DELIVERY":
                return "bg-orange-100 text-orange-700";

            case "DELIVERED":
                return "bg-green-100 text-green-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };


    const getStatusLabel = (status) => {

        switch (status) {

            case "PENDING":
                return "Pending";

            case "CONFIRMED":
                return "Confirmed";

            case "PREPARING":
                return "Preparing";

            case "OUT_FOR_DELIVERY":
                return "Out for Delivery";

            case "DELIVERED":
                return "Delivered";

            case "CANCELLED":
                return "Cancelled";

            default:
                return status;
        }
    };


    /* ================= LOADING ================= */

    if (loading) {

        return (

            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="text-7xl animate-bounce">
                        📦
                    </div>

                    <p className="text-gray-500 mt-4 text-lg">
                        Loading your orders...
                    </p>

                </div>

            </div>

        );
    }


    /* ================= ERROR ================= */

    if (error) {

        return (

            <div className="min-h-screen bg-gray-50 px-6 py-16">

                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-10 text-center">

                    <div className="text-6xl">
                        😕
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mt-4">
                        Unable to Load Orders
                    </h1>

                    <p className="text-red-500 mt-3">
                        {error}
                    </p>

                    <button
                        onClick={loadOrders}
                        className="mt-6 bg-orange-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-orange-600"
                    >
                        Try Again
                    </button>

                </div>

            </div>

        );
    }


    return (

        <div className="bg-gray-50 min-h-screen">


            {/* ================= HEADER ================= */}

            <div className="bg-orange-500 text-white py-12">

                <div className="max-w-7xl mx-auto px-6">

                    <h1 className="text-4xl font-bold">
                        📦 My Orders
                    </h1>

                    <p className="mt-2 text-orange-100">
                        Track and manage your food orders.
                    </p>

                </div>

            </div>


            {/* ================= CONTENT ================= */}

            <div className="max-w-5xl mx-auto px-6 py-10">


                {/* ================= EMPTY ================= */}

                {orders.length === 0 && (

                    <div className="bg-white rounded-2xl shadow-md p-12 text-center">

                        <div className="text-7xl">
                            📦
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800 mt-5">
                            No Orders Yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            You haven't placed any orders yet.
                        </p>

                        <Link
                            to="/restaurants"
                            className="inline-block mt-6 bg-orange-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-orange-600"
                        >
                            Start Ordering →
                        </Link>

                    </div>

                )}


                {/* ================= ORDERS ================= */}

                {orders.length > 0 && (

                    <div className="space-y-6">

                        {orders.map((order) => {

                            const canCancel =
                                order.status === "PENDING" ||
                                order.status === "CONFIRMED";

                            const itemCount =
                                order.items?.reduce(
                                    (total, item) =>
                                        total + item.quantity,
                                    0
                                ) || 0;

                            return (

                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"
                                >

                                    {/* ================= TOP ================= */}

                                    <div className="flex flex-col sm:flex-row justify-between gap-4 border-b pb-5">

                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Order ID
                                            </p>

                                            <h2 className="text-xl font-bold text-gray-800">
                                                #{order.id}
                                            </h2>

                                        </div>


                                        <div>

                                            <span
                                                className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getStatusStyle(order.status)}`}
                                            >
                                                {getStatusLabel(order.status)}
                                            </span>

                                        </div>

                                    </div>


                                    {/* ================= ORDER INFO ================= */}

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-5 border-b">

                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Items
                                            </p>

                                            <p className="font-semibold text-gray-800 mt-1">
                                                🍽️ {itemCount} item
                                                {itemCount !== 1 ? "s" : ""}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Payment
                                            </p>

                                            <p className="font-semibold text-gray-800 mt-1">
                                                💳 {order.paymentMethod}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Total
                                            </p>

                                            <p className="font-bold text-orange-500 text-xl mt-1">
                                                ₹{order.totalAmount}
                                            </p>

                                        </div>

                                    </div>


                                    {/* ================= ITEMS ================= */}

                                    <div className="py-5">

                                        <p className="text-sm font-semibold text-gray-500 mb-3">
                                            Order Items
                                        </p>

                                        <div className="space-y-2">

                                            {order.items?.map((item) => {

                                                const foodName =
                                                    item.food?.name ||
                                                    item.foodName ||
                                                    item.name ||
                                                    `Food Item #${item.foodId}`;

                                                return (

                                                    <div
                                                        key={item.id}
                                                        className="flex justify-between bg-gray-50 rounded-lg px-4 py-3"
                                                    >

                                                        <div>

                                                            <span className="font-semibold text-gray-700">
                                                                {foodName}
                                                            </span>

                                                            <span className="text-gray-500 text-sm ml-2">
                                                                × {item.quantity}
                                                            </span>

                                                        </div>

                                                        <span className="font-semibold text-gray-700">
                                                            ₹{item.subtotal}
                                                        </span>

                                                    </div>

                                                );

                                            })}

                                        </div>

                                    </div>


                                    {/* ================= ADDRESS ================= */}

                                    <div className="bg-orange-50 rounded-xl p-4">

                                        <p className="text-sm text-gray-500">
                                            Delivery Address
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            📍 {order.deliveryAddress}
                                        </p>

                                    </div>


                                    {/* ================= ACTIONS ================= */}

                                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">

                                        <Link
                                            to={`/orders/${order.id}`}
                                            className="border border-orange-500 text-orange-500 px-5 py-2.5 rounded-xl text-center font-semibold hover:bg-orange-50 transition"
                                        >
                                            📄 View Details
                                        </Link>


                                        {canCancel && (

                                            <button
                                                onClick={() =>
                                                    handleCancel(order.id)
                                                }
                                                disabled={
                                                    cancellingId === order.id
                                                }
                                                className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-red-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                            >

                                                {cancellingId === order.id
                                                    ? "Cancelling..."
                                                    : "❌ Cancel Order"
                                                }

                                            </button>

                                        )}

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>

    );
};

export default Orders;