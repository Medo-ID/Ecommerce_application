const { REACT_APP_ENV, REACT_APP_PROD_URL, REACT_APP_DEV_URL } = process.env;
const url = REACT_APP_ENV === 'production' ? REACT_APP_PROD_URL : REACT_APP_DEV_URL;

export const fetchCartItems = async () => {
    try {
        const response = await fetch(`${url}/api/cart/your-cart`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json()
        
        if (response.ok) {
            return { success: true, cart: result.data, itemsCount: result.itemCount }
        } else {
            return { success: false, error: result.message }
        }

    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const saveCartToDatabase = async (cartItems) => {
    try {
        const response = await fetch(`${url}/api/cart/save-items`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems }) 
        });

        const result = await response.json()
        
        if (result.success) {
            return { success: true, result: result.message }
        } else {
            return { success: false, result: result.message }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const addItemToCart = async (id, quantity) => {
    try {
        const response = await fetch(`${url}/api/cart/add/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity })
        });

        const result = await response.json()
        
        if (response.ok) {
            return { success: true, message: result.message }
        } else {
            return { success: false, error: result.message }
        }

    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const updateCartForAuth = async (id, quantity) => {
    try {
        const response = await fetch(`${url}/api/cart/update/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity })
        });

        const result = await response.json()

        if (response.ok) {
            return { success: true, message: result.message }
        } else {
            return { success: false, error: result.message }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const deleteFromCart = async (id) => {
    try {
        const response = await fetch(`${url}/api/cart/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json()

        if (response.ok) {
            return { success: true, message: result.message }
        } else {
            return { success: false, error: result.message }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}
