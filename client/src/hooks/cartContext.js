import { createContext, useContext, useEffect, useState } from "react";
import { clearCartInLocalStorage, deleteFromCart, getCartFromLocalStorage, saveCartToLocalStorage } from "../utils/cartStorage";
import { fetchCartItems } from "../apis/cart";


// Create Cart Context
const CartContext = createContext()

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getCartFromLocalStorage)
    const [itemsCount, setItemsCount] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    // Update local storage whenever cartItems changes
    useEffect(() => {
        saveCartToLocalStorage(cartItems);
    }, [cartItems]);

    // Function to add items to the cart
    const addToCart = (item, quantity) => {
        // Check if the item exists in the current cart state
        const itemExists = cartItems.some((cartItem) => cartItem.id === item.id)
        setCartItems((prevItems) => {
            if (itemExists) {
                // If the item exists, map through and update the quantity
                return prevItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: parseInt(cartItem.quantity) + parseInt(quantity) }
                        : cartItem
                );
            } else {
                // If it doesn't exist, add the new item with the specified quantity
                return [...prevItems, { ...item, quantity }]
            }
        })
    }

    const updateCart = (id, quantity) => {
        if (quantity === 0) {
            deleteItemFromCart(id)
            return "Item deleted"
        } else {
            setCartItems((prevItems) =>
                prevItems.map((cartItem) =>
                    cartItem.id === id ? { ...cartItem, quantity } : cartItem
                )
            )
            return "Quantity updated!"
        }
    }

    const deleteItemFromCart = (id) => {
        deleteFromCart(id)
        setCartItems(getCartFromLocalStorage())
    }

    // Function to clear the cart
    const clearCart = () => {
        setCartItems([])
        clearCartInLocalStorage()
    }

    const getItemsCount = async () => {
        const res = await fetchCartItems();
        if (res.success) {
            setItemsCount(res.itemsCount);
        } else {
            setItemsCount
        }
    };

    const refreshCartCount = () => setRefreshTrigger((prev) => !prev);

    return (
        <CartContext.Provider value={{ 
                cartItems, 
                addToCart, 
                updateCart, 
                clearCart, 
                deleteItemFromCart, 
                getItemsCount,
                itemsCount, 
                refreshCartCount,
                refreshTrigger
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Hook to use cart context in other components
export const useCart = () => useContext(CartContext)
