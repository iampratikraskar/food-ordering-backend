import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFoodsByRestaurant } from "../../services/foodService";
import FoodCard from "../../components/customer/FoodCard";

const Foods = () => {

    const { restaurantId } = useParams();

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchFoods = async () => {

            try {

                const data =
                    await getFoodsByRestaurant(restaurantId);

                setFoods(data);

            } catch (error) {

                console.error(
                    "Error fetching foods:",
                    error
                );

                setError("Failed to load menu.");

            } finally {

                setLoading(false);

            }
        };

        fetchFoods();

    }, [restaurantId]);


    // Loading
    if (loading) {

        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">

                <div className="flex flex-col items-center gap-4">

                    <div className="flex gap-2">

                        <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></span>

                        <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>

                        <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>

                    </div>

                    <p className="text-lg font-medium text-gray-600">
                        Loading menu...
                    </p>

                </div>

            </div>
        );
    }


    // Error
    if (error) {

        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">

                <div className="text-center">

                    <div className="text-6xl mb-4">
                        😕
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800">
                        Something went wrong
                    </h2>

                    <p className="text-red-500 mt-2">
                        {error}
                    </p>

                </div>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <section className="bg-orange-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-12">

                    <p className="text-orange-100 mb-2">
                        Restaurant #{restaurantId}
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold">
                        Restaurant Menu 🍕
                    </h1>

                    <p className="mt-3 text-orange-100 text-lg">
                        Choose your favorite food and add it to your cart.
                    </p>

                </div>

            </section>


            {/* Foods */}
            <section className="max-w-7xl mx-auto px-6 py-12">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            Available Food
                        </h2>

                        <p className="text-gray-500 mt-1">
                            {foods.length} item
                            {foods.length !== 1 ? "s" : ""} on the menu
                        </p>

                    </div>

                </div>


                {foods.length === 0 ? (

                    <div className="text-center py-20">

                        <div className="text-7xl mb-5">
                            🍽️
                        </div>

                        <h2 className="text-2xl font-bold text-gray-700">
                            No food items found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            This restaurant hasn't added any food items yet.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {foods.map((food) => (

                            <FoodCard
                                key={food.id}
                                food={food}
                                onAddToCart={() => {
                                    console.log(
                                        "Add to cart:",
                                        food
                                    );
                                }}
                            />

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
};

export default Foods;