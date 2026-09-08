import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import FoodCard from "../../components/customer/FoodCard";
import { getFoodsByRestaurant } from "../../services/foodService";
import { getRestaurantById } from "../../services/restaurantService";
import getErrorMessage from "../../utils/errorHandler";

const Foods = () => {

    const { restaurantId } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [foods, setFoods] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRestaurantMenu();
    }, [restaurantId]);

    const loadRestaurantMenu = async () => {

        try {

            setLoading(true);
            setError("");

            const [restaurantData, foodsData] = await Promise.all([
                getRestaurantById(restaurantId),
                getFoodsByRestaurant(restaurantId)
            ]);

            setRestaurant(restaurantData);
            setFoods(foodsData);

        } catch (error) {

            console.error(
                "Failed to load restaurant menu:",
                error
            );

            // setError(
            //     error.response?.data?.message ||
            //     "Failed to load restaurant menu."
            // );

            setError(
                getErrorMessage(
                    error,
                    "Failed to load restaurant menu."
                )
            );

        } finally {

            setLoading(false);

        }
    };


    if (loading) {

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="text-6xl animate-bounce">
                        🍕
                    </div>

                    <p className="text-gray-500 mt-4">
                        Loading menu...
                    </p>

                </div>

            </div>
        );
    }


    if (error) {

        return (
            <div className="min-h-screen bg-gray-50">

                <div className="max-w-4xl mx-auto px-6 py-16">

                    <div className="bg-white rounded-2xl shadow-md p-10 text-center">

                        <div className="text-6xl">
                            😕
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mt-4">
                            Unable to Load Menu
                        </h2>

                        <p className="text-red-500 mt-3">
                            {error}
                        </p>

                        <button
                            onClick={loadRestaurantMenu}
                            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600"
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Restaurant Header */}

            <div className="bg-orange-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-10">

                    <Link
                        to="/restaurants"
                        className="text-orange-100 hover:text-white text-sm"
                    >
                        ← Back to Restaurants
                    </Link>


                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mt-5">

                        <div>

                            <h1 className="text-4xl font-bold">
                                {restaurant?.name}
                            </h1>

                            <p className="mt-2 text-orange-100">
                                📍 {restaurant?.address}
                            </p>

                            {restaurant?.phone && (
                                <p className="mt-1 text-orange-100">
                                    📞 {restaurant.phone}
                                </p>
                            )}

                        </div>


                        {restaurant?.rating && (

                            <div className="bg-white text-orange-600 px-5 py-3 rounded-xl font-bold">
                                ⭐ {restaurant.rating} Rating
                            </div>

                        )}

                    </div>

                </div>

            </div>


            {/* Menu */}

            <div className="max-w-7xl mx-auto px-6 py-10">

                {foods.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow-md p-12 text-center">

                        <div className="text-6xl">
                            🍽️
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mt-4">
                            No Food Items Available
                        </h2>

                        <p className="text-gray-500 mt-2">
                            This restaurant has not added any food items yet.
                        </p>

                        <Link
                            to="/restaurants"
                            className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600"
                        >
                            Browse Restaurants
                        </Link>

                    </div>

                ) : (

                    <>

                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">

                            <div>

                                <h2 className="text-3xl font-bold text-gray-800">
                                    🍽️ Menu
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    {foods.length} food item
                                    {foods.length !== 1 ? "s" : ""}
                                </p>

                            </div>


                            <Link
                                to="/cart"
                                className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600"
                            >
                                🛒 View Cart
                            </Link>

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

                            {foods.map((food) => (

                                <FoodCard
                                    key={food.id}
                                    food={food}
                                />

                            ))}

                        </div>

                    </>

                )}

            </div>

        </div>
    );
};

export default Foods;