export const Checkout = () => {
    const handleCheckout = () => {
        console.log('GG')
    }
    return (
        <button
            onClick={handleCheckout}
            className="text-sm font-medium mt-2 bg-mainOrange hover:bg-mainTeal/70 text-white rounded-2xl py-2 px-6 hover:shadow-custom-teal transition-all delay-120"
        >
            Checkout
        </button>
    )    
}