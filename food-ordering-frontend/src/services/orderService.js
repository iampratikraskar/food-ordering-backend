import api from "../api/axios";

// Place a new order
export const placeOrder = async (orderData) => {
    const response = await api.post("/orders/place", orderData);
    return response.data;
};

// Get logged-in customer's orders
export const getMyOrders = async () => {
    const response = await api.get("/orders/my-orders");
    return response.data;
};

// Get one order by ID
export const getOrderById = async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
};

// Cancel customer's order
export const cancelOrder = async (orderId) => {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data;
};

// ===============================
// ADMIN APIs
// ===============================

// Get all orders
export const getAllOrders = async () => {
    const response = await api.get("/orders/admin/all");
    return response.data;
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
    const response = await api.put(
        `/orders/admin/${orderId}/status`,
        null,
        {
            params: {
                status: status
            }
        }
    );

    return response.data;
};