import api from "../api/axios";

// Get all categories
export const getAllCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
};

// Get category by ID
export const getCategoryById = async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
};

// Get categories belonging to one restaurant
export const getCategoriesByRestaurant = async (restaurantId) => {
    const response = await api.get(
        `/categories/restaurant/${restaurantId}`
    );

    return response.data;
};

// Add category
export const addCategory = async (categoryData) => {
    const response = await api.post(
        "/categories",
        categoryData
    );

    return response.data;
};

// Update category
export const updateCategory = async (id, categoryData) => {
    const response = await api.put(
        `/categories/${id}`,
        categoryData
    );

    return response.data;
};

// Delete category
export const deleteCategory = async (id) => {
    const response = await api.delete(
        `/categories/${id}`
    );

    return response.data;
};

