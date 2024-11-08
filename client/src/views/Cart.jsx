import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { CartItem } from "../components/Cart-Item";
import { useAuth } from "../hooks/authContext";
import { useCart } from "../hooks/cartContext";
import { fetchCartItems } from "../apis/cart";

function Cart() {
    const { isAuthenticated } = useAuth()
    const { cartItems } = useCart()
    const [items, setItems] = useState([])
    const [refreshWhenDelete, setRefreshWhenDelete] = useState(false)
    const [refreshWhenUpdate, setRefreshWhenUpdate] = useState(false)

    const getCartItemsForAuth = async () => {
        const res = await fetchCartItems()
        if (res.success) {
            setItems(res.cart)
        } 
    }

    useEffect(() => {
        if (isAuthenticated) {
            getCartItemsForAuth()
        } else {
            setItems(cartItems)
        }
        
    }, [isAuthenticated, refreshWhenDelete, refreshWhenUpdate])

    return (
        <div className="container mx-auto space-y-8 my-8 md:py-4 px-4">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <div className="w-full h-fit bg-mainTeal/5 border border-mainTeal/25 p-4 md:p-6 space-y-2">
                {items.length === 0 ? (
                    <div className="text-center">
                        <h3 className="text-lg">No items in your cart yet!</h3>
                        <Link to="/products" className="text-mainTeal hover:underline text-sm">Browse our Products</Link>
                    </div>
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
                        {items.map((item) => (
                            <CartItem 
                                key={item.id} 
                                item={item} 
                                setRefreshWhenDelete={setRefreshWhenDelete} 
                                setRefreshWhenUpdate={setRefreshWhenUpdate} 
                            />
                        ))}
                    </>
                )}
            </div>

        </div>
    )
}

export default Cart;