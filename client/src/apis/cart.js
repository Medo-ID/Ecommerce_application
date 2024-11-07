const url = process.env.REACT_APP_URL;

export const addItemToCart = async (id, quantity) => {
    try {
        const response = await fetch(`${url}/api/cart/add/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quantity)
        });

        const data = await response.json()
        
        if (response.ok) {
            return { success: true, message: data.message }
        } else {
            return { success: false, error: data.message }
        }

    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const fetchCartItems = async () => {
    try {
        const response = await fetch(`${url}/api/cart/your-cart`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json()
        
        if (response.ok) {
            return { success: true, cart: data.data }
        } else {
            return { success: false, error: data.message }
        }

    } catch (error) {
        return { success: false, error: error.message }
    }
}