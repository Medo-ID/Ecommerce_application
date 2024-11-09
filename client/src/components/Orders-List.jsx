import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrderDetail } from "../apis/orders";
import { Spinner } from "./Spinner";

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

    console.log(orderDetails)

    return (
        <div className="space-y-4">
            {orders.length === 0 ? (
                <p>No orders found. <Link to="/products" className="text-mainTeal hover:underline">Browse our Products</Link></p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className="p-4 border border-gray-200 rounded-md shadow-sm"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-800">Order ID: {order.id}</p>
                                <p>Total Amount: ${order.total_amount}</p>
                                <p>Status: {order.status}</p>
                            </div>
                            <button
                                onClick={() => toggleOrderDetails(order.id)}
                                className="text-mainTeal font-semibold hover:underline"
                            >
                                {expandedOrder === order.id ? "Hide Details" : "View Details"}
                            </button>
                        </div>

                        {expandedOrder === order.id && (
                            <div className="mt-4 space-y-2">
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    orderDetails[order.id]?.map((item) => (
                                        <div key={item.product_id} className="pl-4 border-l-2 border-mainOrange">
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