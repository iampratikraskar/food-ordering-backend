import api from "../api/axios";

// Get all foods
export const getAllFoods = async () => {
    const response = await api.get("/foods");
    return response.data;
};

// Get food by ID
export const getFoodById = async (id) => {
    const response = await api.get(`/foods/${id}`);
    return response.data;
};

// Get foods by restaurant
export const getFoodsByRestaurant = async (restaurantId) => {
    const response = await api.get(
        `/foods/restaurant/${restaurantId}`
    );
    return response.data;
};

// Add food
export const addFood = async (foodData) => {
    const response = await api.post(
        "/foods",
        foodData
    );
    return response.data;
};

// Update food
export const updateFood = async (id, foodData) => {
    const response = await api.put(
        `/foods/${id}`,
        foodData
    );
    return response.data;
};

// Delete food
export const deleteFood = async (id) => {
    const response = await api.delete(
        `/foods/${id}`
    );
    return response.data;
};

// Search food
export const searchFood = async (name) => {
    const response = await api.get(
        "/foods/search",
        {
            params: { name }
        }
    );

    return response.data;
};

// Get foods by price
export const getFoodsByPrice = async (min, max) => {
    const response = await api.get(
        "/foods/price",
        {
            params: {
                min,
                max
            }
        }
    );

    return response.data;
};

// Get available foods
export const getAvailableFoods = async () => {
    const response = await api.get(
        "/foods/available"
    );

    return response.data;
};