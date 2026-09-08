import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDashboardStats } from "../../services/dashboardService";

const Dashboard = () => {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);


    const loadDashboard = async () => {

        try {

            setLoading(true);

            const data =
                await getDashboardStats();

            setStats(data);

        } catch (error) {

            console.error(
                "Failed to load dashboard:",
                error.response?.data ||
                error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to load dashboard statistics."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {
        loadDashboard();
    }, []);


    if (loading) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="text-5xl mb-4">
                        📊
                    </div>

                    <p className="text-gray-600">
                        Loading dashboard...
                    </p>

                </div>

            </div>
        );
    }


    if (!stats) {
        return null;
    }


    return (

        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}

            <div className="bg-white shadow-sm">

                <div className="max-w-7xl mx-auto px-6 py-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <h1 className="text-3xl font-bold text-gray-800">
                                📊 Admin Dashboard
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Overview of your FoodHub application
                            </p>

                        </div>

                        <button
                            onClick={loadDashboard}
                            className="bg-orange-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                        >
                            Refresh
                        </button>

                    </div>

                </div>

            </div>


            <div className="max-w-7xl mx-auto px-6 py-8">


                {/* MAIN STATISTICS */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* ORDERS */}

                    <div className="bg-white rounded-xl shadow-md p-6">

                        <div className="flex justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Total Orders
                                </p>

                                <p className="text-3xl font-bold text-gray-800 mt-2">
                                    {stats.totalOrders}
                                </p>

                            </div>

                            <div className="text-4xl">
                                📦
                            </div>

                        </div>

                    </div>


                    {/* RESTAURANTS */}

                    <div className="bg-white rounded-xl shadow-md p-6">

                        <div className="flex justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Restaurants
                                </p>

                                <p className="text-3xl font-bold text-gray-800 mt-2">
                                    {stats.totalRestaurants}
                                </p>

                            </div>

                            <div className="text-4xl">
                                🍽️
                            </div>

                        </div>

                    </div>


                    {/* CUSTOMERS */}

                    <div className="bg-white rounded-xl shadow-md p-6">

                        <div className="flex justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Customers
                                </p>

                                <p className="text-3xl font-bold text-gray-800 mt-2">
                                    {stats.totalCustomers}
                                </p>

                            </div>

                            <div className="text-4xl">
                                👥
                            </div>

                        </div>

                    </div>


                    {/* REVENUE */}

                    <div className="bg-white rounded-xl shadow-md p-6">

                        <div className="flex justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Revenue
                                </p>

                                <p className="text-3xl font-bold text-green-600 mt-2">
                                    ₹
                                    {Number(
                                        stats.totalRevenue
                                    ).toFixed(2)}
                                </p>

                            </div>

                            <div className="text-4xl">
                                💰
                            </div>

                        </div>

                        <p className="text-xs text-gray-400 mt-2">
                            Delivered orders
                        </p>

                    </div>

                </div>


                {/* ORDER STATUS */}

                <div className="mt-8">

                    <h2 className="text-2xl font-bold text-gray-800 mb-5">
                        Order Status
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">

                        <StatusCard
                            title="Pending"
                            value={stats.pendingOrders}
                            icon="⏳"
                        />

                        <StatusCard
                            title="Confirmed"
                            value={stats.confirmedOrders}
                            icon="✔️"
                        />

                        <StatusCard
                            title="Preparing"
                            value={stats.preparingOrders}
                            icon="👨‍🍳"
                        />

                        <StatusCard
                            title="Out for Delivery"
                            value={stats.outForDeliveryOrders}
                            icon="🚚"
                        />

                        <StatusCard
                            title="Delivered"
                            value={stats.deliveredOrders}
                            icon="✅"
                        />

                        <StatusCard
                            title="Cancelled"
                            value={stats.cancelledOrders}
                            icon="❌"
                        />

                        <StatusCard
                            title="All Orders"
                            value={stats.totalOrders}
                            icon="📦"
                        />

                    </div>

                </div>


                {/* MANAGEMENT */}

                <div className="mt-10">

                    <h2 className="text-2xl font-bold text-gray-800 mb-5">
                        Management
                    </h2>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                        <ManagementCard
                            icon="📦"
                            title="Order Management"
                            description="View and manage customer orders."
                            link="/admin/orders"
                        />


                        <ManagementCard
                            icon="🍽️"
                            title="Restaurant Management"
                            description="Add, edit and manage restaurants."
                            link="/admin/restaurants"
                        />


                        <ManagementCard
                            icon="🍕"
                            title="Food Management"
                            description="Manage food items and availability."
                            link="/admin/foods"
                        />


                        <ManagementCard
                            icon="📂"
                            title="Category Management"
                            description="Manage restaurant food categories."
                            link="/admin/categories"
                        />


                        <ManagementCard
                            icon="👥"
                            title="Customer Management"
                            description="View and manage customers."
                            link="/admin/customers"
                        />

                    </div>

                </div>


                {/* QUICK ACTIONS */}

                <div className="mt-10 bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-xl font-bold text-gray-800 mb-5">
                        ⚡ Quick Actions
                    </h2>

                    <div className="flex flex-wrap gap-4">

                        <Link
                            to="/admin/restaurants"
                            className="bg-orange-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-orange-600"
                        >
                            ➕ Add Restaurant
                        </Link>

                        <Link
                            to="/admin/categories"
                            className="bg-blue-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-600"
                        >
                            ➕ Add Category
                        </Link>

                        <Link
                            to="/admin/foods"
                            className="bg-green-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-600"
                        >
                            ➕ Add Food
                        </Link>

                        <Link
                            to="/admin/orders"
                            className="bg-purple-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-purple-600"
                        >
                            📦 View Orders
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};


// ==========================================
// STATUS CARD
// ==========================================

const StatusCard = ({
    title,
    value,
    icon
}) => {

    return (

        <div className="bg-white rounded-xl shadow-sm p-4 text-center">

            <div className="text-2xl">
                {icon}
            </div>

            <p className="text-sm text-gray-500 mt-2">
                {title}
            </p>

            <p className="text-2xl font-bold text-gray-800 mt-1">
                {value}
            </p>

        </div>
    );
};


// ==========================================
// MANAGEMENT CARD
// ==========================================

const ManagementCard = ({
    icon,
    title,
    description,
    link
}) => {

    return (

        <Link
            to={link}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition block"
        >

            <div className="text-4xl mb-4">
                {icon}
            </div>

            <h3 className="text-xl font-bold text-gray-800">
                {title}
            </h3>

            <p className="text-gray-500 mt-2">
                {description}
            </p>

            <p className="text-orange-500 font-semibold mt-4">
                Open →
            </p>

        </Link>
    );
};


export default Dashboard;