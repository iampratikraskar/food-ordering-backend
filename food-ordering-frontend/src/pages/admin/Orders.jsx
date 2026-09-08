import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");

    const loadOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllOrders();

            setOrders(data || []);

        } catch (err) {

            console.error("Failed to load orders:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load orders."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        loadOrders();
    }, []);


    const handleStatusChange = async (orderId, status) => {

        try {

            setUpdatingId(orderId);

            const updatedOrder =
                await updateOrderStatus(orderId, status);

            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order.id === orderId
                        ? updatedOrder
                        : order
                )
            );

        } catch (err) {

            console.error("Failed to update order:", err);

            alert(
                err.response?.data?.message ||
                "Failed to update order status."
            );

        } finally {

            setUpdatingId(null);

        }
    };


    const getStatusClass = (status) => {

        switch (status) {

            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            case "CONFIRMED":
                return "bg-blue-100 text-blue-700";

            case "PREPARING":
                return "bg-purple-100 text-purple-700";

            case "OUT_FOR_DELIVERY":
                return "bg-indigo-100 text-indigo-700";

            case "DELIVERED":
                return "bg-green-100 text-green-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };


    if (loading) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="text-5xl mb-4">
                        📦
                    </div>

                    <p className="text-gray-600 text-lg">
                        Loading orders...
                    </p>

                </div>

            </div>
        );
    }


    if (error) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

                <div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-md w-full">

                    <div className="text-5xl mb-4">
                        😕
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Unable to Load Orders
                    </h2>

                    <p className="text-gray-600 mb-6">
                        {error}
                    </p>

                    <button
                        onClick={loadOrders}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>

                        <h1 className="text-4xl font-bold text-gray-800">
                            Order Management
                        </h1>

                        <p className="text-gray-600 mt-2">
                            Manage customer orders and update their status.
                        </p>

                    </div>

                    <button
                        onClick={loadOrders}
                        className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-lg font-semibold transition"
                    >
                        ↻ Refresh Orders
                    </button>

                </div>


                {/* Statistics */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                    <div className="bg-white rounded-xl shadow-sm p-5">

                        <p className="text-sm text-gray-500">
                            Total Orders
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-1">
                            {orders.length}
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow-sm p-5">

                        <p className="text-sm text-gray-500">
                            Pending
                        </p>

                        <p className="text-3xl font-bold text-yellow-600 mt-1">
                            {
                                orders.filter(
                                    (order) =>
                                        order.status === "PENDING"
                                ).length
                            }
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow-sm p-5">

                        <p className="text-sm text-gray-500">
                            Preparing
                        </p>

                        <p className="text-3xl font-bold text-purple-600 mt-1">
                            {
                                orders.filter(
                                    (order) =>
                                        order.status === "PREPARING"
                                ).length
                            }
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow-sm p-5">

                        <p className="text-sm text-gray-500">
                            Delivered
                        </p>

                        <p className="text-3xl font-bold text-green-600 mt-1">
                            {
                                orders.filter(
                                    (order) =>
                                        order.status === "DELIVERED"
                                ).length
                            }
                        </p>

                    </div>

                </div>


                {/* Empty state */}

                {orders.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

                        <div className="text-6xl mb-5">
                            📦
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            No Orders Found
                        </h2>

                        <p className="text-gray-500">
                            Customer orders will appear here.
                        </p>

                    </div>

                ) : (

                    /* Orders table */

                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-100">

                                    <tr>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Order
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Date
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Items
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Amount
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Payment
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Status
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {orders.map((order) => (

                                        <tr
                                            key={order.id}
                                            className="border-t border-gray-100 hover:bg-gray-50"
                                        >

                                            {/* Order */}

                                            <td className="px-6 py-5">

                                                <p className="font-bold text-gray-800">
                                                    #{order.id}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Customer #{order.customerId}
                                                </p>

                                            </td>


                                            {/* Date */}

                                            <td className="px-6 py-5">

                                                <p className="text-sm text-gray-700">
                                                    {order.orderDate
                                                        ? new Date(
                                                              order.orderDate
                                                          ).toLocaleDateString()
                                                        : "N/A"}
                                                </p>

                                            </td>


                                            {/* Items */}

                                            <td className="px-6 py-5">

                                                <div className="space-y-1">

                                                    {order.items?.map(
                                                        (item) => (

                                                            <p
                                                                key={item.id}
                                                                className="text-sm text-gray-700"
                                                            >
                                                                {item.foodName}
                                                                {" × "}
                                                                {item.quantity}
                                                            </p>

                                                        )
                                                    )}

                                                </div>

                                            </td>


                                            {/* Amount */}

                                            <td className="px-6 py-5">

                                                <p className="font-bold text-orange-500">
                                                    ₹{order.totalAmount}
                                                </p>

                                            </td>


                                            {/* Payment */}

                                            <td className="px-6 py-5">

                                                <span className="text-sm font-medium text-gray-700">
                                                    {order.paymentMethod}
                                                </span>

                                            </td>


                                            {/* Status */}

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status}
                                                </span>

                                            </td>


                                            {/* Action */}

                                            <td className="px-6 py-5">

                                                <select
                                                    value={order.status}
                                                    disabled={
                                                        updatingId ===
                                                        order.id
                                                    }
                                                    onChange={(event) =>
                                                        handleStatusChange(
                                                            order.id,
                                                            event.target.value
                                                        )
                                                    }
                                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
                                                >

                                                    <option value="PENDING">
                                                        Pending
                                                    </option>

                                                    <option value="CONFIRMED">
                                                        Confirmed
                                                    </option>

                                                    <option value="PREPARING">
                                                        Preparing
                                                    </option>

                                                    <option value="OUT_FOR_DELIVERY">
                                                        Out for Delivery
                                                    </option>

                                                    <option value="DELIVERED">
                                                        Delivered
                                                    </option>

                                                    <option value="CANCELLED">
                                                        Cancelled
                                                    </option>

                                                </select>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default Orders;