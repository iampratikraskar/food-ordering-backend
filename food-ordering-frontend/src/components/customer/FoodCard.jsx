import { useCart } from "../../context/CartContext";

const FoodCard = ({ food }) => {

    const {
        addToCart,
        loading
    } = useCart();

    const handleAddToCart = async () => {

        try {

            await addToCart(food);

            alert(`${food.name} added to cart!`);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to add item to cart."
            );

        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">

            {/* Food Image */}
            <div className="h-48 bg-gradient-to-r from-orange-300 to-orange-500 flex items-center justify-center">

                {food.imageUrl ? (
                    <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-7xl">
                        🍕
                    </span>
                )}

            </div>

            {/* Food Details */}
            <div className="p-5">

                <div className="flex justify-between items-start gap-3">

                    <h2 className="text-xl font-bold text-gray-800">
                        {food.name}
                    </h2>

                    <span className="text-lg font-bold text-orange-500 whitespace-nowrap">
                        ₹{food.price}
                    </span>

                </div>

                {/* Description */}
                {food.description && (
                    <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                        {food.description}
                    </p>
                )}

                {/* Availability */}
                <div className="mt-4">

                    {food.available ? (
                        <span className="text-green-600 text-sm font-semibold">
                            ● Available
                        </span>
                    ) : (
                        <span className="text-red-500 text-sm font-semibold">
                            ● Currently unavailable
                        </span>
                    )}

                </div>

                {/* Add to Cart */}
                <button
                    onClick={handleAddToCart}
                    disabled={!food.available || loading}
                    className={`w-full mt-4 py-3 rounded-xl font-semibold transition ${
                        food.available && !loading
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                    {loading
                        ? "Adding..."
                        : food.available
                            ? "🛒 Add to Cart"
                            : "Unavailable"
                    }
                </button>

            </div>

        </div>
    );
};

export default FoodCard;