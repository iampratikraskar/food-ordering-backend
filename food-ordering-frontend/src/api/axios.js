import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});


// ================= REQUEST INTERCEPTOR =================
// Automatically attach JWT token to every request

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ================= RESPONSE INTERCEPTOR =================
// Handle expired / invalid JWT

api.interceptors.response.use(

    (response) => {
        return response;
    },

    (error) => {

        if (error.response?.status === 401) {

            console.log("Session expired. Logging out...");

            localStorage.removeItem("token");

            // Send user to login page
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);


export default api;