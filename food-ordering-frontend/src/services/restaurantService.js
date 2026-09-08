import api from "../api/axios";

// Get all restaurants
export const getAllRestaurants = async () => {
    const response = await api.get("/restaurants");
    return response.data;
};

// Get restaurant by ID
export const getRestaurantById = async (id) => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
};

// Add restaurant
export const addRestaurant = async (restaurantData) => {
    const response = await api.post(
        "/restaurants",
        restaurantData
    );
    return response.data;
};

// Update restaurant
export const updateRestaurant = async (id, restaurantData) => {
    const response = await api.put(
        `/restaurants/${id}`,
        restaurantData
    );
    return response.data;
};

// Delete restaurant
export const deleteRestaurant = async (id) => {
    const response = await api.delete(
        `/restaurants/${id}`
    );
    return response.data;
};