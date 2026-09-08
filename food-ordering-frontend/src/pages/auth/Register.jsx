import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        // Basic frontend validation
        if (
            !formData.fullName ||
            !formData.email ||
            !formData.phone ||
            !formData.password
        ) {
            setError("Please fill in all fields.");
            return;
        }


        if (!/^[0-9]{10}$/.test(formData.phone)) {
            setError("Phone number must contain exactly 10 digits.");
            return;
        }


        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }


        try {

            setLoading(true);

            await api.post(
                "/customers/register",
                formData
            );


            setSuccess(
                "Registration successful! Redirecting to login..."
            );


            // Go to login page
            setTimeout(() => {
                navigate("/login");
            }, 1200);


        } catch (error) {

            console.error("Registration error:", error);


            if (error.response?.data?.message) {

                setError(
                    error.response.data.message
                );

            } else if (error.response?.status === 409) {

                setError(
                    "An account with this email already exists."
                );

            } else {

                setError(
                    "Registration failed. Please try again."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">

            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">

                    <div className="text-6xl mb-4">
                        🍔
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Your Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Join FoodHub and start ordering delicious food
                    </p>

                </div>


                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-md p-8">

                    {/* Error */}
                    {error && (
                        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}


                    {/* Success */}
                    {success && (
                        <div className="mb-5 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                            {success}
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>

                        {/* Full Name */}
                        <div className="mb-5">

                            <label className="block text-gray-700 font-medium mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />

                        </div>


                        {/* Email */}
                        <div className="mb-5">

                            <label className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />

                        </div>


                        {/* Phone */}
                        <div className="mb-5">

                            <label className="block text-gray-700 font-medium mb-2">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter 10 digit phone number"
                                maxLength="10"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />

                        </div>


                        {/* Password */}
                        <div className="mb-6">

                            <label className="block text-gray-700 font-medium mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />

                        </div>


                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                    </form>


                    {/* Login Link */}
                    <p className="text-center text-gray-500 mt-6">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-orange-500 font-semibold hover:text-orange-600"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Register;