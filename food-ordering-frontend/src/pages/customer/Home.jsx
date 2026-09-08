import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const categories = [
        { name: "Pizza", emoji: "🍕", description: "Cheesy & delicious" },
        { name: "Burger", emoji: "🍔", description: "Juicy & tasty" },
        { name: "Biryani", emoji: "🍛", description: "Rich & flavorful" },
        { name: "Chinese", emoji: "🍜", description: "Hot & delicious" },
        { name: "Desserts", emoji: "🍰", description: "Sweet cravings" },
        { name: "Drinks", emoji: "🥤", description: "Cool & refreshing" },
    ];

    const features = [
        {
            icon: "🚀",
            title: "Lightning Fast",
            description:
                "Get your favorite meals delivered quickly and conveniently.",
        },
        {
            icon: "🍽️",
            title: "Best Restaurants",
            description:
                "Discover amazing restaurants and delicious food near you.",
        },
        {
            icon: "🔒",
            title: "Secure Ordering",
            description:
                "Your account, orders and personal information stay protected.",
        },
        {
            icon: "💳",
            title: "Easy Checkout",
            description:
                "Enjoy a simple and smooth checkout experience every time.",
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* =====================================================
                HERO SECTION
            ====================================================== */}

            <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 text-white">

                {/* Decorative circles */}
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full" />
                <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-white/10 rounded-full" />

                <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT CONTENT */}

                        <div>

                            {/* Small badge */}
                            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">

                                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />

                                Fresh food • Fast delivery

                            </div>

                            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">

                                Delicious Food,

                                <br />

                                <span className="text-orange-100">
                                    Delivered Fast
                                </span>

                                <span className="ml-2">
                                    🚀
                                </span>

                            </h1>

                            <p className="mt-6 text-orange-50 text-lg md:text-xl leading-relaxed max-w-xl">

                                Order your favorite meals from the best
                                restaurants around you and enjoy delicious
                                food delivered straight to your doorstep.

                            </p>

                            {/* SEARCH */}

                            <div className="mt-8 bg-white rounded-2xl p-2 shadow-2xl max-w-2xl">

                                <div className="flex flex-col sm:flex-row gap-2">

                                    <div className="flex items-center flex-1 px-4">

                                        <span className="text-xl mr-3">
                                            🔍
                                        </span>

                                        <input
                                            type="text"
                                            placeholder="Search for food or restaurants..."
                                            className="w-full py-3 text-gray-700 outline-none placeholder:text-gray-400"
                                        />

                                    </div>

                                    <button
                                        type="button"
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-bold transition duration-200"
                                    >
                                        Search
                                    </button>

                                </div>

                            </div>

                            {/* CTA BUTTONS */}

                            <div className="flex flex-col sm:flex-row gap-4 mt-7">

                                <Link
                                    to="/restaurants"
                                    className="inline-flex items-center justify-center bg-white text-orange-600 px-7 py-3.5 rounded-xl font-bold shadow-lg hover:bg-gray-100 hover:-translate-y-0.5 transition duration-200"
                                >
                                    Explore Restaurants
                                    <span className="ml-2">
                                        →
                                    </span>
                                </Link>

                                <Link
                                    to="/restaurants"
                                    className="inline-flex items-center justify-center border-2 border-white/50 text-white px-7 py-3.5 rounded-xl font-bold hover:bg-white/10 transition duration-200"
                                >
                                    Browse Food 🍴
                                </Link>

                            </div>

                            {/* TRUST TEXT */}

                            <div className="flex flex-wrap items-center gap-5 mt-8 text-orange-100 text-sm">

                                <div className="flex items-center gap-2">
                                    <span className="text-lg">✓</span>
                                    Easy ordering
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-lg">✓</span>
                                    Fast delivery
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-lg">✓</span>
                                    Secure checkout
                                </div>

                            </div>

                        </div>


                        {/* RIGHT HERO VISUAL */}

                        <div className="hidden lg:flex justify-center">

                            <div className="relative">

                                {/* Main circle */}

                                <div className="w-[420px] h-[420px] rounded-full bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">

                                    <div className="w-[330px] h-[330px] rounded-full bg-white flex items-center justify-center shadow-2xl">

                                        <div className="text-center">

                                            <div className="text-[130px] leading-none">
                                                🍕
                                            </div>

                                            <p className="text-gray-800 text-xl font-extrabold mt-4">
                                                Fresh & Delicious
                                            </p>

                                            <p className="text-gray-500 text-sm mt-1">
                                                Delivered to your doorstep
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Floating card 1 */}

                                <div className="absolute -left-10 top-16 bg-white text-gray-800 rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">

                                    <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-xl">
                                        ⭐
                                    </div>

                                    <div>
                                        <p className="font-bold">
                                            4.8 / 5
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Customer rating
                                        </p>
                                    </div>

                                </div>


                                {/* Floating card 2 */}

                                <div className="absolute -right-8 bottom-16 bg-white text-gray-800 rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">

                                    <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center text-xl">
                                        🚴
                                    </div>

                                    <div>
                                        <p className="font-bold">
                                            Fast Delivery
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Right to your door
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                QUICK STATS
            ====================================================== */}

            <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">

                    <div className="text-center p-6">

                        <p className="text-3xl font-extrabold text-orange-500">
                            100+
                        </p>

                        <p className="text-gray-500 text-sm mt-1">
                            Food Choices
                        </p>

                    </div>

                    <div className="text-center p-6">

                        <p className="text-3xl font-extrabold text-orange-500">
                            50+
                        </p>

                        <p className="text-gray-500 text-sm mt-1">
                            Restaurants
                        </p>

                    </div>

                    <div className="text-center p-6">

                        <p className="text-3xl font-extrabold text-orange-500">
                            4.8★
                        </p>

                        <p className="text-gray-500 text-sm mt-1">
                            Average Rating
                        </p>

                    </div>

                    <div className="text-center p-6">

                        <p className="text-3xl font-extrabold text-orange-500">
                            24/7
                        </p>

                        <p className="text-gray-500 text-sm mt-1">
                            Easy Ordering
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CATEGORIES
            ====================================================== */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">

                    <div>

                        <p className="text-orange-500 font-bold text-sm uppercase tracking-wider">
                            Explore
                        </p>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
                            What are you craving?
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Explore our popular food categories.
                        </p>

                    </div>

                    <Link
                        to="/restaurants"
                        className="mt-5 md:mt-0 text-orange-500 font-bold hover:text-orange-600 transition"
                    >
                        View Restaurants →
                    </Link>

                </div>


                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">

                    {categories.map((category) => (

                        <Link
                            key={category.name}
                            to="/restaurants"
                            className="group bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
                        >

                            <div className="w-20 h-20 mx-auto bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition">

                                <span className="text-5xl group-hover:scale-110 transition duration-300">
                                    {category.emoji}
                                </span>

                            </div>

                            <h3 className="mt-4 font-bold text-gray-800">
                                {category.name}
                            </h3>

                            <p className="text-xs text-gray-400 mt-1">
                                {category.description}
                            </p>

                        </Link>

                    ))}

                </div>

            </section>


            {/* =====================================================
                HOW IT WORKS
            ====================================================== */}

            <section className="bg-white py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-14">

                        <p className="text-orange-500 font-bold text-sm uppercase tracking-wider">
                            Simple Process
                        </p>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
                            Order food in 3 easy steps
                        </h2>

                        <p className="text-gray-500 mt-3">
                            From craving to doorstep — we've made it simple.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-3 gap-10">

                        {/* Step 1 */}

                        <div className="text-center">

                            <div className="relative inline-flex">

                                <div className="w-24 h-24 bg-orange-50 rounded-3xl flex items-center justify-center text-5xl">
                                    🔍
                                </div>

                                <span className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                                    1
                                </span>

                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mt-6">
                                Choose Your Food
                            </h3>

                            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                                Browse restaurants and discover the food
                                you're craving.
                            </p>

                        </div>


                        {/* Step 2 */}

                        <div className="text-center">

                            <div className="relative inline-flex">

                                <div className="w-24 h-24 bg-orange-50 rounded-3xl flex items-center justify-center text-5xl">
                                    🛒
                                </div>

                                <span className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                                    2
                                </span>

                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mt-6">
                                Add to Cart
                            </h3>

                            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                                Select your favorite meals and customize
                                your order.
                            </p>

                        </div>


                        {/* Step 3 */}

                        <div className="text-center">

                            <div className="relative inline-flex">

                                <div className="w-24 h-24 bg-orange-50 rounded-3xl flex items-center justify-center text-5xl">
                                    🚴
                                </div>

                                <span className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                                    3
                                </span>

                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mt-6">
                                Enjoy Your Meal
                            </h3>

                            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                                Place your order and enjoy delicious food
                                delivered to your doorstep.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FEATURES
            ====================================================== */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="text-center mb-12">

                    <p className="text-orange-500 font-bold text-sm uppercase tracking-wider">
                        Why FoodHub?
                    </p>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
                        Everything you need for a great food experience
                    </h2>

                    <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                        We've designed FoodHub to make discovering and
                        ordering food simple, fast and enjoyable.
                    </p>

                </div>


                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {features.map((feature) => (

                        <div
                            key={feature.title}
                            className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
                        >

                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mt-6">
                                {feature.title}
                            </h3>

                            <p className="text-gray-500 mt-3 leading-relaxed">
                                {feature.description}
                            </p>

                        </div>

                    ))}

                </div>

            </section>


            {/* =====================================================
                CTA
            ====================================================== */}

            <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white">

                <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full" />

                <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-white/10 rounded-full" />

                <div className="relative max-w-4xl mx-auto text-center px-6 py-20">

                    <div className="text-6xl mb-5">
                        😋
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold">
                        Ready to order something delicious?
                    </h2>

                    <p className="mt-5 text-orange-100 text-lg max-w-2xl mx-auto">
                        Find your favorite restaurant, choose your meal and
                        let FoodHub take care of the rest.
                    </p>

                    <Link
                        to="/restaurants"
                        className="inline-flex items-center mt-8 bg-white text-orange-600 px-8 py-4 rounded-xl font-extrabold shadow-xl hover:bg-gray-100 hover:-translate-y-1 transition duration-200"
                    >
                        Start Ordering
                        <span className="ml-2 text-xl">
                            →
                        </span>
                    </Link>

                </div>

            </section>

        </div>
    );
};

export default Home;