import api from "../api/axios";

// Get all customers
export const getAllCustomers = async () => {
    const response = await api.get("/customers");
    return response.data;
};

// Get customer by ID
export const getCustomerById = async (id) => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
};

// Delete customer
export const deleteCustomer = async (id) => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
};