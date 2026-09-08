import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">

            {/* Restaurant Header */}
            <div className="h-40 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">

                <span className="text-7xl">
                    🍽️
                </span>

            </div>

            {/* Restaurant Information */}
            <div className="p-5">

                <div className="flex justify-between items-start gap-3">

                    <h2 className="text-xl font-bold text-gray-800">
                        {restaurant.name}
                    </h2>

                    {restaurant.rating && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                            ⭐ {restaurant.rating}
                        </span>
                    )}

                </div>

                {/* Address */}
                <p className="text-gray-500 mt-3 text-sm">
                    📍 {restaurant.address}
                </p>

                {/* Phone */}
                {restaurant.phone && (
                    <p className="text-gray-500 mt-2 text-sm">
                        📞 {restaurant.phone}
                    </p>
                )}

                {/* View Menu */}
                <Link
                    to={`/restaurants/${restaurant.id}/foods`}
                    className="block text-center mt-5 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
                >
                    View Menu →
                </Link>

            </div>

        </div>
    );
};

export default RestaurantCard;