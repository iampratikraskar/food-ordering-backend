import { useEffect, useState } from "react";

import {
    getAllFoods,
    addFood,
    updateFood,
    deleteFood
} from "../../services/foodService";

import {
    getAllRestaurants
} from "../../services/restaurantService";

import {
    getCategoriesByRestaurant
} from "../../services/categoryService";

const Foods = () => {

    const [foods, setFoods] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        available: true,
        restaurantId: "",
        categoryId: ""
    });


    // ==========================================
    // LOAD FOODS + RESTAURANTS
    // ==========================================

    const loadData = async () => {

        try {

            setLoading(true);

            const [
                foodsData,
                restaurantsData
            ] = await Promise.all([
                getAllFoods(),
                getAllRestaurants()
            ]);

            setFoods(foodsData);
            setRestaurants(restaurantsData);

        } catch (error) {

            console.error(
                "Failed to load data:",
                error.response?.data ||
                error.message
            );

            alert("Failed to load food data.");

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        loadData();
    }, []);


    // ==========================================
    // LOAD CATEGORIES FOR RESTAURANT
    // ==========================================

    const loadCategories = async (restaurantId) => {

        if (!restaurantId) {

            setCategories([]);

            return;
        }

        try {

            setLoadingCategories(true);

            const data =
                await getCategoriesByRestaurant(
                    restaurantId
                );

            setCategories(data);

        } catch (error) {

            console.error(
                "Failed to load categories:",
                error.response?.data ||
                error.message
            );

            setCategories([]);

            alert(
                "Failed to load categories."
            );

        } finally {

            setLoadingCategories(false);

        }
    };


    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = async (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        if (name === "restaurantId") {

            setFormData((previous) => ({
                ...previous,
                restaurantId: value,
                categoryId: ""
            }));

            await loadCategories(value);

            return;
        }

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        setFormData({
            name: "",
            description: "",
            price: "",
            imageUrl: "",
            available: true,
            restaurantId: "",
            categoryId: ""
        });

        setCategories([]);
        setEditingId(null);
        setShowForm(false);
    };


    // ==========================================
    // ADD
    // ==========================================

    const handleAdd = () => {

        resetForm();

        setShowForm(true);
    };


    // ==========================================
    // EDIT
    // ==========================================

    const handleEdit = async (food) => {

        setEditingId(food.id);

        setFormData({
            name: food.name || "",
            description: food.description || "",
            price: food.price || "",
            imageUrl: food.imageUrl || "",
            available:
                food.available !== false,
            restaurantId:
                food.restaurantId || "",
            categoryId:
                food.categoryId || ""
        });

        setShowForm(true);

        // Load categories belonging
        // to this food's restaurant
        await loadCategories(
            food.restaurantId
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {

            alert(
                "Food name is required."
            );

            return;
        }

        if (
            !formData.price ||
            Number(formData.price) <= 0
        ) {

            alert(
                "Price must be greater than 0."
            );

            return;
        }

        if (!formData.restaurantId) {

            alert(
                "Please select a restaurant."
            );

            return;
        }

        if (!formData.categoryId) {

            alert(
                "Please select a category."
            );

            return;
        }


        const foodData = {

            name:
                formData.name.trim(),

            description:
                formData.description.trim(),

            price:
                Number(formData.price),

            imageUrl:
                formData.imageUrl.trim()
                    ? formData.imageUrl.trim()
                    : null,

            available:
                formData.available,

            restaurantId:
                Number(formData.restaurantId),

            categoryId:
                Number(formData.categoryId)
        };


        try {

            setSaving(true);

            if (editingId) {

                await updateFood(
                    editingId,
                    foodData
                );

                alert(
                    "Food updated successfully!"
                );

            } else {

                await addFood(foodData);

                alert(
                    "Food added successfully!"
                );
            }

            resetForm();

            await loadData();

        } catch (error) {

            console.error(
                "Failed to save food:",
                error.response?.data ||
                error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to save food."
            );

        } finally {

            setSaving(false);

        }
    };


    // ==========================================
    // DELETE
    // ==========================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this food?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteFood(id);

            alert(
                "Food deleted successfully!"
            );

            await loadData();

        } catch (error) {

            console.error(
                "Failed to delete food:",
                error.response?.data ||
                error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete food."
            );
        }
    };


    // ==========================================
    // RESTAURANT NAME
    // ==========================================

    const getRestaurantName = (
        restaurantId
    ) => {

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


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <div className="text-5xl mb-4">
                        🍕
                    </div>

                    <p className="text-gray-600">
                        Loading foods...
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="bg-gray-50 min-h-screen">

            {/* ==================================
                HEADER
            ================================== */}

            <div className="bg-white shadow-sm">

                <div className="max-w-7xl mx-auto px-6 py-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <h1 className="text-3xl font-bold text-gray-800">
                                🍕 Food Management
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Add, edit and manage food items
                            </p>

                        </div>

                        <button
                            onClick={handleAdd}
                            className="bg-orange-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                        >
                            ➕ Add Food
                        </button>

                    </div>

                </div>

            </div>


            <div className="max-w-7xl mx-auto px-6 py-8">


                {/* ==================================
                    FORM
                ================================== */}

                {showForm && (

                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl font-bold text-gray-800">

                                {editingId
                                    ? "✏️ Edit Food"
                                    : "➕ Add New Food"}

                            </h2>

                            <button
                                type="button"
                                onClick={resetForm}
                                className="text-gray-500 hover:text-red-500 text-xl"
                            >
                                ✕
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* FOOD NAME */}

                            <div>

                                <label className="block font-semibold text-gray-700 mb-2">
                                    Food Name *
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Margherita Pizza"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div>

                                <label className="block font-semibold text-gray-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Describe the food..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />

                            </div>


                            {/* PRICE */}

                            <div>

                                <label className="block font-semibold text-gray-700 mb-2">
                                    Price *
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="1"
                                    step="0.01"
                                    placeholder="e.g. 299"
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
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
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

                            </div>


                            {/* CATEGORY */}

                            <div>

                                <label className="block font-semibold text-gray-700 mb-2">
                                    Category *
                                </label>

                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    disabled={
                                        !formData.restaurantId ||
                                        loadingCategories ||
                                        categories.length === 0
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-100"
                                >

                                    <option value="">

                                        {!formData.restaurantId
                                            ? "Select restaurant first"
                                            : loadingCategories
                                                ? "Loading categories..."
                                                : categories.length === 0
                                                    ? "No categories found"
                                                    : "Select Category"}

                                    </option>

                                    {categories.map(
                                        (category) => (

                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>

                                        )
                                    )}

                                </select>

                                {formData.restaurantId &&
                                    !loadingCategories &&
                                    categories.length === 0 && (

                                        <p className="text-sm text-red-500 mt-2">
                                            No categories exist for this restaurant. Create a category first.
                                        </p>

                                    )}

                            </div>


                            {/* IMAGE */}

                            <div>

                                <label className="block font-semibold text-gray-700 mb-2">
                                    Image URL
                                </label>

                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/pizza.jpg"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />

                            </div>


                            {/* AVAILABLE */}

                            <div className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    name="available"
                                    checked={
                                        formData.available
                                    }
                                    onChange={handleChange}
                                    className="w-5 h-5"
                                />

                                <label className="font-semibold text-gray-700">
                                    Food is available
                                </label>

                            </div>


                            {/* BUTTONS */}

                            <div className="flex gap-4 pt-3">

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                                >

                                    {saving
                                        ? "Saving..."
                                        : editingId
                                            ? "Update Food"
                                            : "Add Food"}

                                </button>

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>
                )}


                {/* ==================================
                    STATISTICS
                ================================== */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow-sm p-6">

                        <p className="text-gray-500">
                            Total Foods
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-2">
                            {foods.length}
                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow-sm p-6">

                        <p className="text-gray-500">
                            Available
                        </p>

                        <p className="text-3xl font-bold text-green-600 mt-2">

                            {
                                foods.filter(
                                    (food) =>
                                        food.available !== false
                                ).length
                            }

                        </p>

                    </div>


                    <div className="bg-white rounded-xl shadow-sm p-6">

                        <p className="text-gray-500">
                            Unavailable
                        </p>

                        <p className="text-3xl font-bold text-red-500 mt-2">

                            {
                                foods.filter(
                                    (food) =>
                                        food.available === false
                                ).length
                            }

                        </p>

                    </div>

                </div>


                {/* ==================================
                    FOOD LIST
                ================================== */}

                {foods.length === 0 ? (

                    <div className="bg-white rounded-xl shadow-md p-12 text-center">

                        <div className="text-6xl mb-4">
                            🍽️
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            No Foods Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Start by adding your first food item.
                        </p>

                        <button
                            onClick={handleAdd}
                            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
                        >
                            ➕ Add Food
                        </button>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {foods.map((food) => (

                            <div
                                key={food.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                            >

                                {/* IMAGE */}

                                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">

                                    {food.imageUrl ? (

                                        <img
                                            src={food.imageUrl}
                                            alt={food.name}
                                            className="w-full h-full object-cover"
                                        />

                                    ) : (

                                        <span className="text-6xl">
                                            🍕
                                        </span>

                                    )}

                                </div>


                                <div className="p-5">

                                    <div className="flex justify-between items-start gap-3">

                                        <h3 className="text-xl font-bold text-gray-800">
                                            {food.name}
                                        </h3>

                                        <span
                                            className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                                                food.available !== false
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {food.available !== false
                                                ? "Available"
                                                : "Unavailable"}
                                        </span>

                                    </div>


                                    <p className="text-orange-500 font-bold text-xl mt-3">
                                        ₹
                                        {Number(
                                            food.price
                                        ).toFixed(2)}
                                    </p>


                                    <p className="text-gray-500 text-sm mt-2">
                                        {food.description ||
                                            "No description available."}
                                    </p>


                                    <div className="mt-4 text-sm text-gray-600">

                                        <p>
                                            🍽️{" "}
                                            <strong>
                                                Restaurant:
                                            </strong>{" "}
                                            {getRestaurantName(
                                                food.restaurantId
                                            )}
                                        </p>

                                        <p className="mt-1">
                                            📂{" "}
                                            <strong>
                                                Category ID:
                                            </strong>{" "}
                                            {food.categoryId}
                                        </p>

                                    </div>


                                    {/* ACTIONS */}

                                    <div className="flex gap-3 mt-5">

                                        <button
                                            onClick={() =>
                                                handleEdit(food)
                                            }
                                            className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    food.id
                                                )
                                            }
                                            className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                                        >
                                            🗑️ Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default Foods;