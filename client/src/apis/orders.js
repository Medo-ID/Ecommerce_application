const { REACT_APP_ENV, REACT_APP_PROD_URL, REACT_APP_DEV_URL } = process.env;
const url = REACT_APP_ENV === 'production' ? REACT_APP_PROD_URL : REACT_APP_DEV_URL;

export const fetchOrders = async () => {
    try {
        const response = await fetch(`${url}/api/orders`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        const result = await response.json()

        if (response.ok){
            return { success: true, orders: result.data }
        } else {
            return { success: false, message: result.message }
        }
    } catch (error) {
        return { success: false, error: error.message  }
    }
}

export const fetchOrderDetail = async (id) => {
    try {
        const response = await fetch(`${url}/api/orders/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        const result = await response.json()

        if (response.ok){
            return { success: true, order: result.data }
        } else {
            return { success: false, message: result.message }
        }
    } catch (error) {
        return { success: false, error: error.message  }
    }
}