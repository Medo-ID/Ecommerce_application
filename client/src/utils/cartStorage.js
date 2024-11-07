export const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cartItems")) || []
};

export const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
};

export const clearCartInLocalStorage = () => {
    localStorage.removeItem("cartItems")
};