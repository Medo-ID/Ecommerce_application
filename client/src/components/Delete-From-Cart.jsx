import { X } from "lucide-react";
import { useAuth } from "../hooks/authContext";
import { useCart } from "../hooks/cartContext"; 
import { deleteFromCart } from "../apis/cart";
import { toast } from "sonner";

export const DeleteFromCart = ({ id, setRefreshWhenDelete }) => {
    const { isAuthenticated } = useAuth()
    const { deleteItemFromCart } = useCart()

    const handleDelete = async () => {
        if (isAuthenticated) {
            const res = await deleteFromCart(id)
            if (res.success) {
                setRefreshWhenDelete(prev => !prev)
                toast.success(res.message)
            } else {
                toast.error(res.error || "Failed to delete item from cart")
            }
        } else {
            deleteItemFromCart(id)
            setRefreshWhenDelete(prev => !prev)
            toast.success("Item deleted from cart")
        }
    };

    return (
        <button onClick={handleDelete}>
            <X className="w-8 h-8 p-2 bg-red-600/10 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 cursor-pointer" />
        </button>
    )
}
