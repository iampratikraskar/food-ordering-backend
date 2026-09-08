import { useEffect, useState } from "react";

import {
    getAllRestaurants,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant
} from "../../services/restaurantService";

const Restaurants = () => {

    const [restaurants, setRestaurants] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        rating: ""
    });


    useEffect(() => {
        loadRestaurants();
    }, []);


    const loadRestaurants = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllRestaurants();

            setRestaurants(data);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load restaurants."
            );

        } finally {

            setLoading(false);

        }
    };


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    const resetForm = () => {

        setFormData({
            name: "",
            address: "",
            phone: "",
            rating: ""
        });

        setEditingId(null);
        setShowForm(false);
    };


    const handleAdd = () => {

        setEditingId(null);

        setFormData({
            name: "",
            address: "",
            phone: "",
            rating: ""
        });

        setShowForm(true);
    };


    const handleEdit = (restaurant) => {

        setEditingId(restaurant.id);

        setFormData({
            name: restaurant.name || "",
            address: restaurant.address || "",
            phone: restaurant.phone || "",
            rating: restaurant.rating || ""
        });

        setShowForm(true);
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");

            const restaurantData = {
                name: formData.name,
                address: formData.address,
                phone: formData.phone || null,
                rating: formData.rating
                    ? Number(formData.rating)
                    : null
            };


            if (editingId) {

                const updatedRestaurant =
                    await updateRestaurant(
                        editingId,
                        restaurantData
                    );

                setRestaurants((previous) =>
                    previous.map((restaurant) =>
                        restaurant.id === editingId
                            ? updatedRestaurant
                            : restaurant
                    )
                );

            } else {

                const newRestaurant =
                    await addRestaurant(
                        restaurantData
                    );

                setRestaurants((previous) => [
                    ...previous,
                    newRestaurant
                ]);

            }

            resetForm();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to save restaurant."
            );

        } finally {

            setSaving(false);

        }
    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this restaurant?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteRestaurant(id);

            setRestaurants((previous) =>
                previous.filter(
                    (restaurant) =>
                        restaurant.id !== id
                )
            );

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete restaurant."
            );
        }
    };


    return (

        <div className="bg-gray-50 min-h-screen">

            {/* Header */}

            <div className="bg-orange-500 text-white py-10">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">

                        <div>

                            <h1 className="text-4xl font-bold">
                                🍽️ Restaurants
                            </h1>

                            <p className="text-orange-100 mt-2">
                                Manage all restaurants.
                            </p>

                        </div>


                        <button
                            onClick={handleAdd}
                            className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition"
                        >
                            + Add Restaurant
                        </button>

                    </div>

                </div>

            </div>


            {/* Content */}

            <div className="max-w-7xl mx-auto px-6 py-10">


                {/* Error */}

                {error && (

                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6">
                        {error}
                    </div>

                )}


                {/* Form */}

                {showForm && (

                    <div className="bg-white rounded-2xl shadow-md p-7 mb-8">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl font-bold text-gray-800">

                                {editingId
                                    ? "Edit Restaurant"
                                    : "Add Restaurant"
                                }

                            </h2>

                            <button
                                onClick={resetForm}
                                className="text-gray-500 hover:text-gray-800 text-xl"
                            >
                                ✕
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        >

                            {/* Name */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Restaurant Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter restaurant name"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                                    required
                                />

                            </div>


                            {/* Phone */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="10 digit phone number"
                                    maxLength="10"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                                />

                            </div>


                            {/* Address */}

                            <div className="md:col-span-2">

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter restaurant address"
                                    rows="3"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                                    required
                                />

                            </div>


                            {/* Rating */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Rating
                                </label>

                                <select
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                                >

                                    <option value="">
                                        Select Rating
                                    </option>

                                    <option value="1">⭐ 1</option>
                                    <option value="1.5">⭐ 1.5</option>
                                    <option value="2">⭐ 2</option>
                                    <option value="2.5">⭐ 2.5</option>
                                    <option value="3">⭐ 3</option>
                                    <option value="3.5">⭐ 3.5</option>
                                    <option value="4">⭐ 4</option>
                                    <option value="4.5">⭐ 4.5</option>
                                    <option value="5">⭐ 5</option>

                                </select>

                            </div>


                            {/* Buttons */}

                            <div className="md:col-span-2 flex gap-3 justify-end">

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-orange-500 text-white px-7 py-3 rounded-xl font-bold hover:bg-orange-600 disabled:bg-gray-300"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId
                                            ? "Update Restaurant"
                                            : "Add Restaurant"
                                    }
                                </button>

                            </div>

                        </form>

                    </div>

                )}


                {/* Loading */}

                {loading && (

                    <div className="text-center py-16">

                        <div className="text-6xl animate-bounce">
                            🍽️
                        </div>

                        <p className="text-gray-500 mt-4">
                            Loading restaurants...
                        </p>

                    </div>

                )}


                {/* Restaurant List */}

                {!loading && restaurants.length === 0 && (

                    <div className="bg-white rounded-2xl shadow-md p-12 text-center">

                        <div className="text-6xl">
                            🍽️
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mt-4">
                            No Restaurants
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Add your first restaurant.
                        </p>

                        <button
                            onClick={handleAdd}
                            className="mt-6 bg-orange-500 text-white px-7 py-3 rounded-xl font-bold hover:bg-orange-600"
                        >
                            + Add Restaurant
                        </button>

                    </div>

                )}


                {!loading && restaurants.length > 0 && (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {restaurants.map((restaurant) => (

                            <div
                                key={restaurant.id}
                                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                            >

                                <div className="flex justify-between items-start">

                                    <div>

                                        <h2 className="text-xl font-bold text-gray-800">
                                            {restaurant.name}
                                        </h2>

                                        {restaurant.rating && (
                                            <p className="text-green-600 font-semibold mt-1">
                                                ⭐ {restaurant.rating}
                                            </p>
                                        )}

                                    </div>

                                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                                        #{restaurant.id}
                                    </span>

                                </div>


                                <p className="text-gray-500 text-sm mt-4">
                                    📍 {restaurant.address}
                                </p>


                                {restaurant.phone && (

                                    <p className="text-gray-500 text-sm mt-2">
                                        📞 {restaurant.phone}
                                    </p>

                                )}


                                <div className="flex gap-3 mt-6">

                                    <button
                                        onClick={() =>
                                            handleEdit(restaurant)
                                        }
                                        className="flex-1 border border-orange-500 text-orange-500 py-2 rounded-lg font-semibold hover:bg-orange-50"
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(restaurant.id)
                                        }
                                        className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600"
                                    >
                                        🗑 Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
};

export default Restaurants;