const url = process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;


// Initiate checkout session
export const checkout = async (cartItems) => {
    try {
        const response = await fetch(`${url}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartItems }),
        });
        const result = await response.json()

        if (response.ok) {
            window.location.href = result.url // Redirect to Stripe Checkout
            return { ok: true }
        } else {
            return { ok: false, message: result.message || 'Checkout failed.' }
        }
    } catch (error) {
        return { ok: false, message: 'Error redirecting to checkout', error }
    }
}

// Place order after successful checkout
export const placeOrder = async () => {
    try {
        const response = await fetch(`${url}/api/cart/checkout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json()

        if (response.ok) {
            return { success: true, message: result.message }
        } else {
            return { success: false, message: result.message || 'Order placement failed.' }
        }
    } catch (error) {
        return { success: false, message: 'Error placing order', error }
    }
}

