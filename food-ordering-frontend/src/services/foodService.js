import api from "../api/axios";

export const getFoodsByRestaurant = async (restaurantId) => {
    const response = await api.get(
        `/foods/restaurant/${restaurantId}`
    );

    return response.data;
};