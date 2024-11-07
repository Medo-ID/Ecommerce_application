import { createContext, useContext, useEffect, useState } from "react";
import { clearCartInLocalStorage, getCartFromLocalStorage, saveCartToLocalStorage } from "../utils/cartStorage";


// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getCartFromLocalStorage);

    // Update local storage whenever cartItems changes
    useEffect(() => {
        saveCartToLocalStorage(cartItems);
    }, [cartItems]);

    // Function to add items to the cart
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    // Function to clear the cart
    const clearCart = () => {
        setCartItems([]);
        clearCartInLocalStorage();
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to use cart context in other components
export const useCart = () => useContext(CartContext);
