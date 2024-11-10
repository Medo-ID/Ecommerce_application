import { useEffect } from "react";
import { useAuth } from "../hooks/authContext";
import { useCart } from "../hooks/cartContext";
import { ShoppingCart } from "lucide-react";

const CartIcon = ({ className }) => {
    const { isAuthenticated } = useAuth()
    const { cartItems, getItemsCount, itemsCount, refreshTrigger } = useCart()

    useEffect(() => {
        // Fetch items count only if user is authenticated
        if (isAuthenticated) {
            getItemsCount()
        }
    }, [isAuthenticated, refreshTrigger]); // Update when refreshTrigger changes

    return (
        <div className="relative">
            <ShoppingCart
                className={`${className} text-mainTeal`}
                size={34}
            />
            <span 
                className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-mainOrange text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center"
            >
                {isAuthenticated ? itemsCount : cartItems.length}
            </span>
        </div>
    );
};

export default CartIcon;