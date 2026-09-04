import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const categories = [
        { name: "Pizza", emoji: "🍕" },
        { name: "Burger", emoji: "🍔" },
        { name: "Biryani", emoji: "🍛" },
        { name: "Chinese", emoji: "🍜" },
        { name: "Desserts", emoji: "🍰" },
        { name: "Drinks", emoji: "🥤" },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Hero Section */}
            <section className="bg-orange-500 text-white">
                <div className="max-w-7xl mx-auto px-6 py-20">

                    <div className="grid md:grid-cols-2 gap-10 items-center">

                        {/* Hero Content */}
                        <div>
                            <p className="text-orange-100 text-lg font-medium mb-3">
                                Hungry? We've got you covered! 🍴
                            </p>

                            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                Delicious Food,
                                <br />
                                Delivered Fast 🚀
                            </h1>

                            <p className="mt-6 text-orange-100 text-lg max-w-xl">
                                Order your favorite meals from the best
                                restaurants around you and enjoy delicious
                                food at your doorstep.
                            </p>

                            {/* Search */}
                            <div className="mt-8 flex bg-white rounded-xl p-2 shadow-lg max-w-xl">
                                <input
                                    type="text"
                                    placeholder="Search for food or restaurants..."
                                    className="flex-1 px-4 py-3 text-gray-700 outline-none"
                                />

                                <button className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold transition">
                                    Search
                                </button>
                            </div>

                            {/* CTA */}
                            <Link
                                to="/restaurants"
                                className="inline-block mt-6 bg-white text-orange-600 px-7 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
                            >
                                Explore Restaurants →
                            </Link>
                        </div>

                        {/* Hero Image / Emoji */}
                        <div className="hidden md:flex justify-center">
                            <div className="bg-white/20 rounded-full w-80 h-80 flex items-center justify-center">
                                <span className="text-9xl">
                                    🍕
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-6 py-14">

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Explore Categories
                    </h2>

                    <p className="text-gray-500 mt-2">
                        What are you craving today?
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">

                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
                        >
                            <div className="text-5xl">
                                {category.emoji}
                            </div>

                            <h3 className="mt-3 font-semibold text-gray-700">
                                {category.name}
                            </h3>
                        </div>
                    ))}

                </div>

            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-14">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Why Choose FoodHub?
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Everything you need for a great food ordering
                            experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        {/* Card 1 */}
                        <div className="text-center p-8 rounded-2xl bg-orange-50">
                            <div className="text-5xl mb-4">
                                🚀
                            </div>

                            <h3 className="text-xl font-bold text-gray-800">
                                Fast Delivery
                            </h3>

                            <p className="text-gray-500 mt-3">
                                Get your favorite food delivered quickly
                                and conveniently.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="text-center p-8 rounded-2xl bg-orange-50">
                            <div className="text-5xl mb-4">
                                🍽️
                            </div>

                            <h3 className="text-xl font-bold text-gray-800">
                                Best Restaurants
                            </h3>

                            <p className="text-gray-500 mt-3">
                                Discover delicious food from restaurants
                                you love.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="text-center p-8 rounded-2xl bg-orange-50">
                            <div className="text-5xl mb-4">
                                🔒
                            </div>

                            <h3 className="text-xl font-bold text-gray-800">
                                Secure Ordering
                            </h3>

                            <p className="text-gray-500 mt-3">
                                Your account and orders are protected with
                                secure authentication.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* Bottom CTA */}
            <section className="bg-orange-500 text-white py-16">

                <div className="max-w-4xl mx-auto text-center px-6">

                    <h2 className="text-3xl md:text-4xl font-bold">
                        Ready to order something delicious? 😋
                    </h2>

                    <p className="mt-4 text-orange-100 text-lg">
                        Find your favorite restaurant and order now.
                    </p>

                    <Link
                        to="/restaurants"
                        className="inline-block mt-7 bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
                    >
                        Order Now
                    </Link>

                </div>

            </section>

        </div>
    );
};

export default Home;