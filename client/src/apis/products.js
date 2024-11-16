const url = process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

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

export const fetchOneProduct = async (id) => {
    try {
        const response = await fetch(`${url}/api/products/product_id/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json()
        
        if (response.ok) {
            return { success: true, product: data.data }
        } else {
            return { success: false, error: data.message }
        }

    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const fetchTrendingProducts = async () => {
    try {
        const response = await fetch(`${url}/api/products/latest`, {
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

export const fetchRelatedProducts = async (category) => {
    try {
        const response = await fetch(`${url}/api/products/related?name=${category}`, {
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

export const fetchProductsByCategoty = async (category) => {
    try {
        const response = await fetch(`${url}/api/products/category?name=${category}`, {
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
