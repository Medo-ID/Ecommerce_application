import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrderDetail } from "../apis/orders";
import { Spinner } from "./Spinner";
import { ChevronUp, ChevronDown } from "lucide-react";

function OrderList({ orders }) {
    console.log(orders)
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState({});
    const [loading, setLoading] = useState(false);

    const toggleOrderDetails = async (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
            return;
        }

        setLoading(true);
        const res = await fetchOrderDetail(orderId);
        setLoading(false);

        if (res.success) {
            setOrderDetails((prevDetails) => ({
                ...prevDetails,
                [orderId]: res.order,
            }));
            setExpandedOrder(orderId);
        }
    };

    return (
        <div className="space-y-4">
            {orders.length === 0 ? (
                <p>No orders Yet! <Link to="/products" className="text-mainTeal hover:underline">Browse our Products</Link></p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className="p-4 border border-gray-200 shadow-sm"
                    >
                        <div className="flex justify-between items-center text-sm">
                            <div className="space-y-1">
                                <p><span className="font-medium">Order ID:</span> {order.id}</p>
                                <p><span className="font-medium">Total Amount:</span> ${order.total_amount}</p>
                                <p><span className="font-medium">Status:</span> {order.status}</p>
                            </div>
                            <button
                                onClick={() => toggleOrderDetails(order.id)}
                                className="bg-neutral-900/10 p-2 rounded-full text-mainTeal transition-all duration-200 border border-mainTeal/25 hover:text-mainOrange"
                            >
                                {expandedOrder === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                        </div>

                        {expandedOrder === order.id && (
                            <div className="mt-4 space-y-2">
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    orderDetails[order.id]?.map((item) => (
                                        <div key={item.product_id} className="text-sm pl-4 border-l-2 border-mainOrange">
                                            <p>Product: {item.name}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Unit Price: ${item.unit_price}</p>
                                            <p>Total Price: ${item.total_price}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default OrderList;