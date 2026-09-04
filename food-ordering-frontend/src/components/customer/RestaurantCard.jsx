import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group">

            {/* Image */}
            <div className="h-48 bg-orange-100 overflow-hidden">

                {restaurant.imageUrl ? (
                    <img
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                        🍽️
                    </div>
                )}

            </div>

            {/* Content */}
            <div className="p-5">

                <div className="flex justify-between items-start">

                    <h2 className="text-xl font-bold text-gray-800">
                        {restaurant.name}
                    </h2>

                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm">
                        ⭐ 4.5
                    </span>

                </div>

                <p className="text-gray-500 mt-2">
                    {restaurant.address}
                </p>

                <p className="text-gray-400 text-sm mt-1">
                    {restaurant.city}
                </p>

                <Link
                    to={`/restaurants/${restaurant.id}/foods`}
                    className="block text-center mt-5 bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                    View Menu
                </Link>

            </div>

        </div>
    );
};

export default RestaurantCard;