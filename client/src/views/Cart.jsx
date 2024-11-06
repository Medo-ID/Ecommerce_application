import { CartItem } from "../components/Cart-Item";

function Cart() {
    return (
        <div className="container mx-auto space-y-8 my-8 md:py-4 px-4">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <div className="w-full h-fit bg-mainTeal/5 border border-mainTeal/25 p-4 md:p-6 space-y-2">
                {/* Global Labels Row */}
                <div className="hidden md:grid grid-cols-5 gap-4 p-2 bg-mainOrange/5 border border-mainOrange/20 shadow-sm text-sm font-medium text-center">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Total</span>
                    <span>Action</span>
                </div>

                {/* Cart Items */}
                {Array(2).fill(null).map((_, index) => (
                    <CartItem
                        key={index}
                        image="./imgs/dining_chairs.png"
                        title="Elegant Recliner"
                        quantity={2}
                        price={299.99}
                    />
                ))}
            </div>
        </div>
    )
}

export default Cart;