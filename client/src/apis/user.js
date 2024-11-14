const url = process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

export const fetchCurrentUser = async () => {
    try {
        const response = await fetch(`${url}/api/users/user`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        const result = await response.json()

        if (result.success) {
            return { success: true, user: result.data }
        } else {
            return { success: false, error: result.message }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const fetchUserAddress = async () => {
    try {
        const response = await fetch(`${url}/api/users/address`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        const result = await response.json()

        if (result.success) {
            return { success: true, address: result.address }
        } else {
            return { success: false, error: result.message }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const updateCurrentUser = async (id, userObject) => {
    try {
        const response = await fetch(`${url}/api/users/update/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userObject)
        })

        const result = await response.json()

        if (result.success) {
            return { success: true, message: result.message, user: result.data }
        } else {
            return { success: false, error: result.error }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const updateUserAddress = async (user_id, userAddress) => {
    try {
        const response = await fetch(`${url}/api/users/address/${user_id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userAddress)
        })

        const result = await response.json()

        if (result.success) {
            return { success: true, message: result.message, address: result.data }
        } else {
            return { success: false, error: result.error }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}