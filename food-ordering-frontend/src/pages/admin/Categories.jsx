import { useEffect, useState } from "react";

import {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
} from "../../services/categoryService";

import {
    getAllRestaurants
} from "../../services/restaurantService";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        restaurantId: ""
    });


    // =============================
    // LOAD DATA
    // =============================

    const loadData = async () => {

        try {

            setLoading(true);

            const [
                categoryData,
                restaurantData
            ] = await Promise.all([
                getAllCategories(),
                getAllRestaurants()
            ]);

            setCategories(categoryData);
            setRestaurants(restaurantData);

        } catch (error) {

            console.error(
                "Failed to load categories:",
                error.response?.data || error.message
            );

            alert("Failed to load categories.");

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        loadData();
    }, []);


    // =============================
    // FORM CHANGE
    // =============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    // =============================
    // RESET
    // =============================

    const resetForm = () => {

        setFormData({
            name: "",
            restaurantId: ""
        });

        setEditingId(null);
        setShowForm(false);
    };


    // =============================
    // ADD
    // =============================

    const handleAdd = () => {

        resetForm();

        setShowForm(true);
    };


    // =============================
    // EDIT
    // =============================

    const handleEdit = (category) => {

        setEditingId(category.id);

        setFormData({
            name: category.name || "",
            restaurantId:
                category.restaurantId || ""
        });

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =============================
    // SUBMIT
    // =============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {
            alert("Category name is required.");
            return;
        }

        if (!formData.restaurantId) {
            alert("Please select a restaurant.");
            return;
        }

        const categoryData = {
            name: formData.name.trim(),
            restaurantId:
                Number(formData.restaurantId)
        };

        try {

            setSaving(true);

            if (editingId) {

                await updateCategory(
                    editingId,
                    categoryData
                );

                alert(
                    "Category updated successfully!"
                );

            } else {

                await addCategory(
                    categoryData
                );

                alert(
                    "Category added successfully!"
                );
            }

            resetForm();

            await loadData();

        } catch (error) {

            console.error(
                "Failed to save category:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to save category."
            );

        } finally {

            setSaving(false);

        }
    };


    // =============================
    // DELETE
    // =============================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteCategory(id);

            alert(
                "Category deleted successfully!"
            );

            await loadData();

        } catch (error) {

            console.error(
                "Failed to delete category:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete category."
            );
        }
    };


    // =============================
    // RESTAURANT NAME
    // =============================

    const getRestaurantName = (restaurantId) => {

        const restaurant =
            restaurants.find(
                (restaurant) =>
                    Number(restaurant.id) ===
                    Number(restaurantId)
            );

        return restaurant
            ? restaurant.name
            : `Restaurant #${restaurantId}`;
    };


    // =============================
    // LOADING
    // =============================

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <div className="text-5xl mb-4">
                        📂
                    </div>

                    <p className="text-gray-600">
                        Loading categories...
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}

            <div className="bg-white shadow-sm">

                <div className="max-w-7xl mx-auto px-6 py-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <h1 className="text-3xl font-bold text-gray-800">
                                📂 Category Management
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Manage food categories for your restaurants
                            </p>

                        </div>

                        <button
                            onClick={handleAdd}
                            className="bg-orange-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                        >
                            ➕ Add Category
                        </button>

                    </div>

                </div>

            </div>


            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* FORM */}

                {showForm && (

                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl font-bold text-gray-800">

                                {editingId
                                    ? "✏️ Edit Category"
                                    : "➕ Add Category"}

                            </h2>

                            <button
                                type="button"
                                onClick={resetForm}
                                className="text-xl text-gray-500 hover:text-red-500"
                            >
                                ✕
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* NAME */}

                            <div>

                                <label className="block font-semibold text-gray-700 mb-2">
                                    Category Name *
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Pizza, Burger, Drinks"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />

                            </div>


                            {/* RESTAURANT */}

                            <div>

                                <label className="block font-semibold text-gray-700 mb-2">
                                    Restaurant *
                                </label>

                                <select
                                    name="restaurantId"
                                    value={formData.restaurantId}
                                    onChange={handleChange}
                                    disabled={!!editingId}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-100"
                                >

                                    <option value="">
                                        Select Restaurant
                                    </option>

                                    {restaurants.map(
                                        (restaurant) => (

                                            <option
                                                key={restaurant.id}
                                                value={restaurant.id}
                                            >
                                                {restaurant.name}
                                            </option>

                                        )
                                    )}

                                </select>

                                {editingId && (

                                    <p className="text-sm text-gray-500 mt-2">
                                        Restaurant cannot be changed while editing because your current backend update method only updates the category name.
                                    </p>

                                )}

                            </div>


                            {/* BUTTONS */}

                            <div className="flex gap-4">

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId
                                            ? "Update Category"
                                            : "Add Category"}
                                </button>

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                )}


                {/* STATS */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                    <div className="bg-white p-6 rounded-xl shadow-sm">

                        <p className="text-gray-500">
                            Total Categories
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-2">
                            {categories.length}
                        </p>

                    </div>


                    <div className="bg-white p-6 rounded-xl shadow-sm">

                        <p className="text-gray-500">
                            Restaurants
                        </p>

                        <p className="text-3xl font-bold text-orange-500 mt-2">
                            {restaurants.length}
                        </p>

                    </div>

                </div>


                {/* CATEGORY LIST */}

                {categories.length === 0 ? (

                    <div className="bg-white rounded-xl shadow-md p-12 text-center">

                        <div className="text-6xl mb-4">
                            📂
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            No Categories Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Add your first food category.
                        </p>

                    </div>

                ) : (

                    <div className="bg-white rounded-xl shadow-md overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-100">

                                    <tr>

                                        <th className="text-left px-6 py-4">
                                            ID
                                        </th>

                                        <th className="text-left px-6 py-4">
                                            Category
                                        </th>

                                        <th className="text-left px-6 py-4">
                                            Restaurant
                                        </th>

                                        <th className="text-center px-6 py-4">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {categories.map(
                                        (category) => (

                                            <tr
                                                key={category.id}
                                                className="border-t hover:bg-gray-50"
                                            >

                                                <td className="px-6 py-4 text-gray-500">
                                                    #{category.id}
                                                </td>

                                                <td className="px-6 py-4 font-semibold text-gray-800">
                                                    {category.name}
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {getRestaurantName(
                                                        category.restaurantId
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <div className="flex justify-center gap-3">

                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    category
                                                                )
                                                            }
                                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                                        >
                                                            ✏️ Edit
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    category.id
                                                                )
                                                            }
                                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                                        >
                                                            🗑️ Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default Categories;