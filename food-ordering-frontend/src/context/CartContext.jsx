import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("foodhub_cart");

        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart whenever it changes
    useEffect(() => {
        localStorage.setItem(
            "foodhub_cart",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);


    // Add food to cart
    const addToCart = (food) => {

        setCartItems((currentItems) => {

            const existingItem = currentItems.find(
                (item) => item.id === food.id
            );

            if (existingItem) {

                return currentItems.map((item) =>
                    item.id === food.id
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...food,
                    quantity: 1,
                },
            ];
        });
    };


    // Increase quantity
    const increaseQuantity = (foodId) => {

        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === foodId
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                      }
                    : item
            )
        );
    };


    // Decrease quantity
    const decreaseQuantity = (foodId) => {

        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.id === foodId
                        ? {
                              ...item,
                              quantity: item.quantity - 1,
                          }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };


    // Remove item completely
    const removeFromCart = (foodId) => {

        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== foodId
            )
        );
    };


    // Clear entire cart
    const clearCart = () => {
        setCartItems([]);
    };


    // Total number of items
    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );


    // Total price
    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    return useContext(CartContext);
};