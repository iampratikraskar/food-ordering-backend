import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    getOrderById,
    cancelOrder
} from "../../services/orderService";
import getErrorMessage from "../../utils/errorHandler";

const OrderDetails = () => {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancelling, setCancelling] = useState(false);

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
                getErrorMessage(
                    error,
                    "Unable to load order details."
                )
            );

        } finally {

            setLoading(false);

        }
    };


    const handleCancel = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setCancelling(true);

            const updatedOrder = await cancelOrder(orderId);

            setOrder(updatedOrder);

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

            setCancelling(false);

        }
    };


    /* ================= STATUS ================= */

    const statuses = [
        {
            value: "PENDING",
            label: "Order Placed",
            icon: "📝"
        },
        {
            value: "CONFIRMED",
            label: "Confirmed",
            icon: "✓"
        },
        {
            value: "PREPARING",
            label: "Preparing",
            icon: "👨‍🍳"
        },
        {
            value: "OUT_FOR_DELIVERY",
            label: "Out for Delivery",
            icon: "🛵"
        },
        {
            value: "DELIVERED",
            label: "Delivered",
            icon: "🎉"
        }
    ];


    const getStatusIndex = (status) => {

        return statuses.findIndex(
            (item) => item.value === status
        );

    };


    /* ================= LOADING ================= */

    if (loading) {

        return (

            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="text-7xl animate-bounce">
                        📦
                    </div>

                    <p className="text-gray-500 mt-4">
                        Loading order details...
                    </p>

                </div>

            </div>

        );
    }


    /* ================= ERROR ================= */

    if (error || !order) {

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
                        {error || "Unable to find this order."}
                    </p>

                    <Link
                        to="/orders"
                        className="inline-block mt-6 bg-orange-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-orange-600"
                    >
                        ← Back to My Orders
                    </Link>

                </div>

            </div>

        );
    }


    const currentStatusIndex = getStatusIndex(order.status);

    const canCancel =
        order.status === "PENDING" ||
        order.status === "CONFIRMED";


    /* ================= MAIN ================= */

    return (

        <div className="bg-gray-50 min-h-screen">


            {/* ================= HEADER ================= */}

            <div className="bg-orange-500 text-white py-10">

                <div className="max-w-6xl mx-auto px-6">

                    <Link
                        to="/orders"
                        className="text-orange-100 hover:text-white text-sm"
                    >
                        ← Back to My Orders
                    </Link>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-5">

                        <div>

                            <p className="text-orange-100 text-sm">
                                Order ID
                            </p>

                            <h1 className="text-4xl font-bold">
                                #{order.id}
                            </h1>

                        </div>

                        <div className="bg-white text-orange-600 px-5 py-3 rounded-xl font-bold">
                            {order.status}
                        </div>

                    </div>

                </div>

            </div>


            {/* ================= CONTENT ================= */}

            <div className="max-w-6xl mx-auto px-6 py-10">


                {/* ================= STATUS TRACKER ================= */}

                {order.status !== "CANCELLED" && (

                    <div className="bg-white rounded-2xl shadow-md p-7 mb-8">

                        <h2 className="text-2xl font-bold text-gray-800 mb-8">
                            Order Status
                        </h2>


                        <div className="relative">

                            {/* Connecting Line */}

                            <div className="absolute left-0 right-0 top-6 h-1 bg-gray-200 hidden md:block">
                            </div>


                            <div
                                className="absolute left-0 top-6 h-1 bg-orange-500 hidden md:block transition-all duration-500"
                                style={{
                                    width:
                                        currentStatusIndex <= 0
                                            ? "0%"
                                            : `${(currentStatusIndex / (statuses.length - 1)) * 100}%`
                                }}
                            >
                            </div>


                            {/* Statuses */}

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">

                                {statuses.map((status, index) => {

                                    const completed =
                                        index <= currentStatusIndex;

                                    return (

                                        <div
                                            key={status.value}
                                            className="flex md:flex-col items-center md:text-center gap-3"
                                        >

                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold z-10 ${completed
                                                        ? "bg-orange-500 text-white"
                                                        : "bg-gray-200 text-gray-500"
                                                    }`}
                                            >
                                                {status.icon}
                                            </div>


                                            <div>

                                                <p
                                                    className={`font-semibold ${completed
                                                            ? "text-orange-600"
                                                            : "text-gray-400"
                                                        }`}
                                                >
                                                    {status.label}
                                                </p>

                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                        </div>

                    </div>

                )}


                {/* ================= CANCELLED ================= */}

                {order.status === "CANCELLED" && (

                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">

                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl">
                                ✕
                            </div>

                            <div>

                                <h2 className="text-xl font-bold text-red-700">
                                    Order Cancelled
                                </h2>

                                <p className="text-red-600 mt-1">
                                    This order has been cancelled.
                                </p>

                            </div>

                        </div>

                    </div>

                )}


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                    {/* ================= ORDER ITEMS ================= */}

                    <div className="lg:col-span-2">

                        <div className="bg-white rounded-2xl shadow-md p-7">

                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                🍽️ Order Items
                            </h2>


                            <div className="space-y-4">

                                {order.items?.map((item) => {

                                    const foodName =
                                        item.food?.name ||
                                        item.foodName ||
                                        item.name ||
                                        `Food Item #${item.foodId}`;

                                    const foodImage =
                                        item.food?.imageUrl ||
                                        item.imageUrl ||
                                        null;

                                    return (

                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 border-b last:border-b-0 pb-4 last:pb-0"
                                        >

                                            {/* Image */}

                                            <div className="w-20 h-20 rounded-xl bg-orange-100 flex items-center justify-center overflow-hidden flex-shrink-0">

                                                {foodImage ? (

                                                    <img
                                                        src={foodImage}
                                                        alt={foodName}
                                                        className="w-full h-full object-cover"
                                                    />

                                                ) : (

                                                    <span className="text-4xl">
                                                        🍕
                                                    </span>

                                                )}

                                            </div>


                                            {/* Details */}

                                            <div className="flex-grow">

                                                <h3 className="font-bold text-gray-800">
                                                    {foodName}
                                                </h3>

                                                <p className="text-gray-500 text-sm mt-1">
                                                    ₹{item.price} × {item.quantity}
                                                </p>

                                            </div>


                                            {/* Subtotal */}

                                            <p className="font-bold text-gray-800">
                                                ₹{item.subtotal}
                                            </p>

                                        </div>

                                    );

                                })}

                            </div>


                            {/* Total */}

                            <div className="border-t mt-6 pt-6">

                                <div className="flex justify-between">

                                    <span className="text-xl font-bold text-gray-800">
                                        Total
                                    </span>

                                    <span className="text-2xl font-bold text-orange-500">
                                        ₹{order.totalAmount}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================= ORDER INFO ================= */}

                    <div>

                        <div className="bg-white rounded-2xl shadow-md p-7 sticky top-24">

                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Order Information
                            </h2>


                            {/* Order ID */}

                            <div className="border-b pb-4 mb-4">

                                <p className="text-gray-500 text-sm">
                                    Order ID
                                </p>

                                <p className="font-bold text-gray-800 mt-1">
                                    #{order.id}
                                </p>

                            </div>


                            {/* Payment */}

                            <div className="border-b pb-4 mb-4">

                                <p className="text-gray-500 text-sm">
                                    Payment Method
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    💳 {order.paymentMethod}
                                </p>

                            </div>


                            {/* Address */}

                            <div className="border-b pb-4 mb-4">

                                <p className="text-gray-500 text-sm">
                                    Delivery Address
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    📍 {order.deliveryAddress}
                                </p>

                            </div>


                            {/* Total */}

                            <div>

                                <p className="text-gray-500 text-sm">
                                    Total Amount
                                </p>

                                <p className="text-2xl font-bold text-orange-500 mt-1">
                                    ₹{order.totalAmount}
                                </p>

                            </div>


                            {/* Cancel */}

                            {canCancel && (

                                <button
                                    onClick={handleCancel}
                                    disabled={cancelling}
                                    className="w-full mt-7 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    {cancelling
                                        ? "Cancelling..."
                                        : "❌ Cancel Order"
                                    }
                                </button>

                            )}

                        </div>

                    </div>

                </div>


                {/* ================= BOTTOM ACTION ================= */}

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

                    <Link
                        to="/orders"
                        className="border border-orange-500 text-orange-500 px-7 py-3 rounded-xl font-semibold text-center hover:bg-orange-50"
                    >
                        📦 My Orders
                    </Link>

                    <Link
                        to="/restaurants"
                        className="bg-orange-500 text-white px-7 py-3 rounded-xl font-semibold text-center hover:bg-orange-600"
                    >
                        🍽️ Order More
                    </Link>

                </div>

            </div>

        </div>

    );
};

export default OrderDetails;