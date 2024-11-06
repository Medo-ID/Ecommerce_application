import { useEffect, useState } from "react";

export const CartItem = ({ image, title, price, quantity }) => {
    const [total, setTotal] = useState();

    useEffect(() => {
        setTotal((price * quantity).toFixed(2));
    }, [price, quantity]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 p-4 bg-mainBg/10 border border-neutral-400/50 shadow-sm text-center md:text-left">
            {/* Product Section */}
            <div className="flex items-center justify-center md:justify-start col-span-2 md:col-span-1 gap-2 mx-auto">
                <div className="w-16 h-16 overflow-hidden bg-neutral-200/50 rounded-md">
                    <img 
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover" 
                    />
                </div>
                <h3 className="text-sm font-semibold text-neutral-800">{title}</h3>
            </div>

            {/* Price */}
            <h3 className="mx-auto text-sm text-neutral-600">${price.toFixed(2)}</h3>

            {/* Quantity Input */}
            <input
                type="number"
                value={quantity}
                min="0"
                onChange={(e) => quantity === e.target.value}
                className="w-16 p-2 mx-auto text-center border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-mainTeal rounded-md"
            />

            {/* Total Price */}
            <h3 className="mx-auto text-sm font-semibold text-neutral-800">${total}</h3>

            {/* Update Button */}
            <button className="mx-auto px-4 py-2 text-sm text-white bg-mainTeal rounded-2xl hover:bg-mainOrange/70 focus:outline-none focus:ring-2 focus:ring-mainTeal focus:ring-offset-1 transition">
                Update
            </button>
        </div>
    );
};