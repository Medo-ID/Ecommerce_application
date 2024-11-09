const url = process.env.REACT_APP_URL;

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