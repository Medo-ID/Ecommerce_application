import { Plus } from "lucide-react";
import { useAuth } from "../hooks/authContext";
import { useCart } from "../hooks/cartContext";
import { addItemToCart } from "../apis/cart";
import { toast } from "sonner";

const CartButton = ({ product, quantity = 1, variant = "full", label = "Add To Cart" }) => {
    const { isAuthenticated } = useAuth()
    const { addToCart } = useCart()

    const handleAddToCart = async () => {
        if (isAuthenticated) {
            const res = await addItemToCart(product.id, quantity)
            if (res.success) {
                toast.success(res.message)
            } else {
                toast.error("Something went wrong! Item can't be added.")
            }
        } else {
            addToCart(product, quantity)
            toast.success("Item added to cart!")
        }
    };

    // Class variants for different button styles
    const buttonStyles = {
        full: "bg-mainOrange rounded-2xl text-white py-2 px-4 hover:bg-mainTeal/70 shadow-xl transition-all duration-200",
        compact: "bg-mainOrange p-2 rounded-xl text-white hover:bg-mainTeal/90 transition-all duration-200",
    }

    return (
        <button
            onClick={handleAddToCart}
            className={buttonStyles[variant]}
        >
            {variant === "compact" ? <Plus size={18} /> : label}
        </button>
    )
};

// Usage Examples:
// Full Add to Cart Button
export const AddToCartButton = (props) => <CartButton {...props} variant="full" />

// Compact Button with Plus Icon
export const CompactAddToCartButton = (props) => <CartButton {...props} variant="compact" />

