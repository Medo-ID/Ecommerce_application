import { useEffect, useState } from "react";
import { DeleteFromCart } from "./Delete-From-Cart";
import { UpdateCart } from "./Update-Cart";

export const CartItem = ({ item, setRefreshWhenDelete, setRefreshWhenUpdate }) => {
    const { id, image, name, price, quantity } = item
    const [current_quantity, setCurrent_quantity] = useState(quantity)
    const [total, setTotal] = useState()

    useEffect(() => {
        setCurrent_quantity(quantity)
    }, [quantity]);

    useEffect(() => {
        setTotal((price * quantity).toFixed(2))
    }, [price, current_quantity]);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10)
        setCurrent_quantity(newQuantity)
    };

    return (
        <div className="grid grid-rows-2 grid-cols-4 md:grid-rows-1 md:grid-cols-5 items-center p-2 bg-mainBg/10 border border-neutral-400/50 shadow-sm text-center md:text-left">
            {/* Product Section */}
            <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2">
                <div className="w-16 h-16 overflow-hidden bg-neutral-200/50 border border-neutral-300">
                    <img 
                        src={`/imgs/products/${image}`}
                        alt={name}
                        className="w-full h-full object-cover" 
                    />
                </div>
                <h3 className="text-sm font-medium text-neutral-800">{name}</h3>
            </div>

            {/* Price */}
            <h3 className="mx-auto text-sm text-neutral-600">${price}</h3>

            {/* Quantity Input */}
            <input
                type="number"
                value={current_quantity}
                min="0"
                onChange={handleQuantityChange}
                className="w-16 p-2 mx-auto text-center border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-mainTeal rounded-md"
            />

            {/* Total Price */}
            <h3 className="mx-auto text-sm font-semibold text-neutral-800">${total}</h3>

            <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2">
                {/* Update Button */}
                <UpdateCart id={id} quantity={current_quantity} setRefreshWhenUpdate={setRefreshWhenUpdate} />

                {/* Delete Item */}
                <DeleteFromCart id={id} setRefreshWhenDelete={setRefreshWhenDelete} />
            </div>
        </div>
    );
};