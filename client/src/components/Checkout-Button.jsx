import { toast } from "sonner"
import { checkout, placeOrder } from "../apis/checkout"
import { useAuth } from "../hooks/authContext"
import { clearCartInLocalStorage } from "../utils/cartStorage"

export const Checkout = ({ checkoutItems }) => {
    const { isAuthenticated } = useAuth()

    const handleCheckout = async (e) => {
        e.preventDefault()

        // Initiate checkout session
        const checkoutRes = await checkout(checkoutItems)

        if (!checkoutRes.ok) {
            toast.error('Something went wrong during checkout!')
            return
        }

        if (isAuthenticated) {
            await placeOrder()
            return
        } else {
            // Final success message only after placing order is successful
            toast.success('Order placed! You will receive an email confirmation.')
            clearCartInLocalStorage()
        }
    };

    return (
        <button
            onClick={handleCheckout}
            className="text-sm mt-2 bg-mainOrange hover:bg-mainTeal/70 text-white rounded-2xl py-2 px-6 hover:shadow-custom-teal transition-all delay-120"
        >
            Checkout
        </button>
    )
}