const url = process.env.REACT_APP_URL;

export const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${url}/api/products`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json()
        
        if (response.ok) {
            return { success: true, products: data.data }
        } else {
            return { success: false, error: data.message }
        }

    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const fetchTrendingProducts = async () => {
    try {
        const response = await fetch(`${url}/api/products//latest`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json()
        
        if (response.ok) {
            return { success: true, products: data.data }
        } else {
            return { success: false, error: data.message }
        }

    } catch (error) {
        return { success: false, error: error.message }
    }
}
