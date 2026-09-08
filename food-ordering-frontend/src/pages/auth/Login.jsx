import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const {
        login,
        isAdmin
    } = useAuth();


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    // ==========================================
    // LOGIN
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        // Validation

        if (
            !formData.email ||
            !formData.password
        ) {

            setError(
                "Please enter email and password."
            );

            return;
        }


        try {

            setLoading(true);


            const response = await api.post(
                "/auth/login",
                formData
            );


            const token =
                response.data.token;


            if (!token) {

                setError(
                    "Login failed. Token was not received."
                );

                return;
            }


            // Store token and update AuthContext
            login(token);


            setSuccess(
                "Login successful!"
            );


            /*
             * JWT role is decoded by AuthContext.
             *
             * Since React state updates asynchronously,
             * decode the role directly from the token
             * here for immediate redirect.
             */

            let userRole = null;

            try {

                const payload =
                    JSON.parse(
                        atob(
                            token.split(".")[1]
                        )
                    );

                userRole = payload.role;

            } catch (decodeError) {

                console.error(
                    "Failed to decode JWT:",
                    decodeError
                );
            }


            // ======================================
            // REDIRECT
            // ======================================

            setTimeout(() => {

                if (
                    userRole === "ROLE_ADMIN"
                ) {

                    navigate(
                        "/admin",
                        { replace: true }
                    );

                } else {

                    navigate(
                        "/",
                        { replace: true }
                    );
                }

            }, 700);


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            if (
                error.response?.status === 401
            ) {

                setError(
                    "Invalid email or password."
                );

            } else if (
                error.response?.data?.message
            ) {

                setError(
                    error.response.data.message
                );

            } else {

                setError(
                    "Unable to login. Please try again."
                );
            }


        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">

            <div className="w-full max-w-md">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="text-center mb-8">

                    <div className="text-6xl mb-4">
                        🍔
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back!
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your FoodHub account
                    </p>

                </div>


                {/* =================================
                    FORM CARD
                ================================= */}

                <div className="bg-white rounded-2xl shadow-md p-8">


                    {/* ERROR */}

                    {error && (

                        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">

                            {error}

                        </div>

                    )}


                    {/* SUCCESS */}

                    {success && (

                        <div className="mb-5 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">

                            {success}

                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* EMAIL */}

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
                                autoComplete="email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="mb-6">

                            <label className="block text-gray-700 font-medium mb-2">

                                Password

                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
                        >

                            {loading
                                ? "Logging in..."
                                : "Login"}

                        </button>

                    </form>


                    {/* REGISTER */}

                    <p className="text-center text-gray-500 mt-6">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-orange-500 font-semibold hover:text-orange-600"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;