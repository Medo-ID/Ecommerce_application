import { url } from ".";

export const registerUser = async (user) => {
    try {
        const res = await fetch(`${url}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        // Parse the JSON response
        const data = await res.json();

        // Check if the response was unsuccessful
        if (!res.ok) {
            return { message: data.message || 'Something went wrong', status: res.status };
        }

        return { message: data.message, status: res.status };
    } catch (error) {
        // Catch network or unexpected errors
        return { message: 'Network error or server unavailable', status: 500 };
    }
};

export const loginUser = async (user) => {
    try {
        const res = await fetch(`${url}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || 'Something went wrong', status: res.status };
        }

        return { message: data.message, status: res.status };
    } catch (error) {
        return { message: 'Network error or server unavailable', status: 500 };
    }
}

export const logoutUser = async () => {
    try {
        const res = await fetch(`${url}/api/logout`)
        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || 'Something went wrong', status: res.status };
        }

        return { message: data.message, status: res.status };
    } catch (error) {
        return { message: 'Network error or server unavailable', status: 500 };
    }
}