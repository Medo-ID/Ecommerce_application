const url = process.env.REACT_APP_API_URL;

export const registerUser = async (userObj) => {
    try {
        const response = await fetch(`${url}/api/auth/register`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userObj)
        });

        const data = await response.json()
        
        if (response.ok) {
            return { success: true, message: data.message }
        } else {
            return { success: false, error: data.error }
        }

    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${url}/api/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
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

export const logoutUser = async () => {
    try {
        const response = await fetch(`${url}/api/auth/logout`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json()
        
        if (response.ok) {
            return { success: true, message: data.message }
        } else {
            return { success: false, error: data.error }
        }

    } catch (error) {
        return { success: false, error: error.message }
    }
}