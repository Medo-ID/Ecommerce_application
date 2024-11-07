import { Plus } from "lucide-react"
import { useAuth } from "../hooks/authContext"
import { useCart } from "../hooks/cartContext"

const { isAuthenticated, checkAuthStatus } = useAuth()
const { addToCart } = useCart()

const handleAddToCartFromLocalStorage = (product, quantity) => {
    addToCart(product)
}

const handleAddToCartFromServer = async (id, quantity) => {
    const res = await addItemToCart(id)

}

export const compactAddToCartButton = () => {
    return (
        <button 
            onClick={() => handleAddToCart()} 
            className="bg-mainOrange p-2  rounded-xl text-white hover:bg-mainTeal/90 transition-all duration-200"
        >
            <Plus size={18} />
        </button>
    )
}

export const addToCartButton = () => {
    return (
        <button className="bg-mainOrange rounded-2xl text-white py-2 px-4 hover:bg-mainTeal/70 shadow-xl transition-all duration-200">
            Add To Cart
        </button>
    )
}

export const UpdateDeleteCartButton = () => {
    return (
        <button className="mx-auto px-4 py-2 text-sm text-white bg-mainTeal rounded-2xl hover:bg-mainOrange/70 focus:outline-none focus:ring-2 focus:ring-mainTeal focus:ring-offset-1 transition">
            Update
        </button>
    )
}