import { Link } from "lucide-react";
import { CartItem } from "../components/Cart-Item";

function Cart() {
    const [items, setItems] = useState([])

    useEffect(() => {
        
    }, [])

    return (
        <div className="container mx-auto space-y-8 my-8 md:py-4 px-4">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <div className="w-full h-fit bg-mainTeal/5 border border-mainTeal/25 p-4 md:p-6 space-y-2">
                {items.length === 0 ? (
                    <>
                        <h3>No items in your cart yet!</h3>
                        <Link to="/products" className="text-mainTeal hover:underline">Browse our Products</Link>
                    </>
                ) : (
                    <>
                        {/* Global Labels Row */}
                        <div className="hidden md:grid grid-cols-5 gap-4 p-2 bg-mainOrange/5 border border-mainOrange/20 shadow-sm text-sm font-medium text-center">
                            <span>Product</span>
                            <span>Price</span>
                            <span>Quantity</span>
                            <span>Total</span>
                            <span>Action</span>
                        </div>
                        
                        {/* Cart Items */}
                        {items.map((item, index) => (
                            <CartItem
                                key={index}
                                image={`/imgs/${item.image}`}
                                title={item.title}
                                quantity={item.quantity}
                                price={item.price}
                            />
                        ))}
                    </>
                )}
            </div>

        </div>
    )
}

export default Cart;