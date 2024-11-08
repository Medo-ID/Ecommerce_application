import { toast } from "sonner"
import { updateCartForAuth } from "../apis/cart"
import { useAuth } from "../hooks/authContext"
import { useCart } from "../hooks/cartContext"

export const UpdateCart = ({ id, quantity, setRefreshWhenUpdate }) => {
    const { isAuthenticated } = useAuth()
    const { updateCart } = useCart()

    const handleUpdate = async () => {
        if (isAuthenticated) {
            const res = await updateCartForAuth(id, quantity)
            if (res.success) {
                setRefreshWhenUpdate(prev => !prev)
                toast.success(res.message)
            } else {
                toast.error(res.error || "Failed to update item from cart")
            }
        } else {
            const message = updateCart(id, quantity)
            setRefreshWhenUpdate(prev => !prev)
            toast.success(message)
        }
    }

    return (
        <button
            onClick={handleUpdate}
            className="px-4 py-2 text-sm text-white bg-mainTeal rounded-2xl hover:bg-mainOrange/70 transition-all delay-120"
        >
            
            Update
        </button>
    )
}