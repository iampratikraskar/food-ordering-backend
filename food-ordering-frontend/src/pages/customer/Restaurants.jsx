import { useEffect, useState } from "react";
import { getAllRestaurants } from "../../services/restaurantService";
import RestaurantCard from "../../components/customer/RestaurantCard";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await getAllRestaurants();

                setRestaurants(data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);

                setError("Failed to load restaurants.");
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

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
                        Finding restaurants...
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

                    <h1 className="text-4xl md:text-5xl font-bold">
                        Find Your Favorite Restaurant 🍽️
                    </h1>

                    <p className="mt-3 text-orange-100 text-lg">
                        Discover delicious food from the best restaurants
                        around you.
                    </p>

                </div>

            </section>

            {/* Restaurant List */}
            <section className="max-w-7xl mx-auto px-6 py-12">

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            All Restaurants
                        </h2>

                        <p className="text-gray-500 mt-1">
                            {restaurants.length} restaurant
                            {restaurants.length !== 1 ? "s" : ""} available
                        </p>
                    </div>

                </div>

                {restaurants.length === 0 ? (

                    <div className="text-center py-20">

                        <div className="text-7xl mb-5">
                            🍽️
                        </div>

                        <h2 className="text-2xl font-bold text-gray-700">
                            No restaurants found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Please check again later.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {restaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                restaurant={restaurant}
                            />
                        ))}

                    </div>

                )}

            </section>

        </div>
    );
};

export default Restaurants;