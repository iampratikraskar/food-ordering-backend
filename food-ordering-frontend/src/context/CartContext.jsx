import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const { isAuthenticated, isAdmin } = useAuth();

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    // Update cart state from backend response
    const updateCartState = (cart) => {
        setCartItems(cart?.items || []);
        setTotalPrice(cart?.totalPrice || 0);
    };

    // Fetch cart from backend
    const fetchCart = async () => {

        if (!isAuthenticated || isAdmin) {
            setCartItems([]);
            setTotalPrice(0);
            return;
        }

        try {

            setLoading(true);

            const response = await api.get("/cart");

            updateCartState(response.data);

        } catch (error) {

            if (error.response?.status === 404) {
                setCartItems([]);
                setTotalPrice(0);
            } else {
                console.error(
                    "Failed to fetch cart:",
                    error.response?.data || error.message
                );
            }

        } finally {
            setLoading(false);
        }
    };

    // Fetch cart whenever authentication changes
    useEffect(() => {
        fetchCart();
    }, [isAuthenticated , isAdmin]);


    // Add food to cart
    const addToCart = async (food) => {

        if (!isAuthenticated) {
            throw new Error("Please login to add items to cart.");
        }

        if( isAdmin) {
            throw new Error("Admins cannot add items to cart.");
        }

        try {

            setLoading(true);

            const response = await api.post("/cart/add", {
                foodId: food.id,
                quantity: 1
            });

            updateCartState(response.data);

        } catch (error) {

            console.error(
                "Failed to add item to cart:",
                error.response?.data || error.message
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };


    // Increase quantity
    const increaseQuantity = async (itemId) => {

        const item = cartItems.find(
            (cartItem) => cartItem.id === itemId
        );

        if (!item) {
            console.error("Cart item not found:", itemId);
            return;
        }

        try {

            setLoading(true);

            const response = await api.put("/cart/update", {
                itemId: item.id,
                quantity: item.quantity + 1
            });

            updateCartState(response.data);

        } catch (error) {

            console.error(
                "Failed to increase quantity:",
                error.response?.data || error.message
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };


    // Decrease quantity
    const decreaseQuantity = async (itemId) => {

        const item = cartItems.find(
            (cartItem) => cartItem.id === itemId
        );

        if (!item) {
            console.error("Cart item not found:", itemId);
            return;
        }

        // If quantity is 1, remove the item
        if (item.quantity <= 1) {
            await removeFromCart(item.id);
            return;
        }

        try {

            setLoading(true);

            const response = await api.put("/cart/update", {
                itemId: item.id,
                quantity: item.quantity - 1
            });

            updateCartState(response.data);

        } catch (error) {

            console.error(
                "Failed to decrease quantity:",
                error.response?.data || error.message
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };


    // Remove item
    const removeFromCart = async (itemId) => {

        try {

            setLoading(true);

            const response = await api.delete(
                `/cart/remove/${itemId}`
            );

            updateCartState(response.data);

        } catch (error) {

            console.error(
                "Failed to remove item:",
                error.response?.data || error.message
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };


    // Clear cart
    const clearCart = async () => {

        try {

            setLoading(true);

            const response = await api.delete("/cart/clear");

            updateCartState(response.data);

        } catch (error) {

            console.error(
                "Failed to clear cart:",
                error.response?.data || error.message
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };


    // Total number of items
    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );


    return (
        <CartContext.Provider
            value={{
                cartItems,
                totalItems,
                totalPrice,
                loading,
                fetchCart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    return useContext(CartContext);
};