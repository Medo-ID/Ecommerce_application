export const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cartItems")) || []
}

export const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

export const clearCartInLocalStorage = () => {
    localStorage.removeItem("cartItems")
}

export const deleteFromCart = (id) => {
    const cartItems = getCartFromLocalStorage()
    const updatedCartItems = cartItems.filter(item => item.id !== id)
    
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
}