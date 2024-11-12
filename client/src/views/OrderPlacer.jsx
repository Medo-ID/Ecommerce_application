import { Link } from "react-router-dom";

function OrderPlacer() {
    return (
        <div className="container mx-auto my-12 px-6 md:px-12">
            <div className="max-w-md mx-auto bg-neutral-400/20 border border-neutral-400/60 p-8 space-y-6">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-semibold text-neutral-800">Thank You for Your Purchase!</h2>
                    <p className="text-lg text-neutral-600">
                        Your order was placed successfully. We’re excited to get it ready for you!
                    </p>
                </div>
                <div className="text-center md:space-y-8">
                    <p className="text-neutral-700">
                        {`If you're a registered member, you can `}
                        <Link 
                            to="/account" 
                            className="text-mainTeal font-medium hover:text-mainOrange"
                        >
                            track your order
                        </Link>
                        {` in your account.`}
                    </p>
                    <Link 
                        to="/products" 
                        className="text-sm font-medium inline-block bg-mainTeal text-white py-2 px-6 rounded-lg hover:bg-mainOrange transition ease-in-out duration-150"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderPlacer;