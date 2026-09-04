import React from "react";
import { useCart } from "../../context/CartContext";

const FoodCard = ({ food }) => {

    const { addToCart } = useCart();


    const handleAddToCart = () => {

        addToCart(food);

    };


    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">

            {/* Image */}
            <div className="h-52 bg-orange-100 overflow-hidden">

                {food.imageUrl ? (

                    <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                            event.currentTarget.parentElement.innerHTML =
                                '<div class="w-full h-full flex items-center justify-center text-7xl">🍽️</div>';
                        }}
                    />

                ) : (

                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-7xl">
                            🍽️
                        </span>
                    </div>

                )}

            </div>


            {/* Content */}
            <div className="p-5">

                <div className="flex justify-between items-start gap-3">

                    <h2 className="text-xl font-bold text-gray-800">
                        {food.name}
                    </h2>


                    {food.available ? (

                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-semibold whitespace-nowrap">
                            Available
                        </span>

                    ) : (

                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-xs font-semibold whitespace-nowrap">
                            Unavailable
                        </span>

                    )}

                </div>


                {/* Description */}
                <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                    {food.description ||
                        "Delicious food made fresh for you."}
                </p>


                {/* Price + Add */}
                <div className="flex justify-between items-center mt-5">

                    <p className="text-2xl font-bold text-orange-500">
                        ₹{food.price}
                    </p>


                    <button
                        onClick={handleAddToCart}
                        disabled={!food.available}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                            food.available
                                ? "bg-orange-500 text-white hover:bg-orange-600"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {food.available
                            ? "+ Add"
                            : "Unavailable"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default FoodCard;