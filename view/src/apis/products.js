import { url } from ".";

export const getProducts = async () => {
    try{
        const res = await fetch(`${url}/api/products`)
    
        // Check if the response was unsuccessful
        if (!res.ok) {
            return { message: res.message || 'Something went wrong', status: res.status };
        }

        // Parse the JSON response
        const data = await res.json();
    
        return { products: data.data, status: data.status };
    } catch (error) {
        // Catch network or unexpected errors
        return { message: 'Network error or server unavailable', status: 500 };
    }
}