import { Plus, Star } from 'lucide-react';

export const ProductCard = ({ image, title, category, rating, price }) => {
    // Round rating to nearest half-star for cleaner display
    const roundedRating = Math.round(rating * 2) / 2;
    
    return (
        <div className="border border-neutral-400/25">
            {/* Product Image */}
            <div className="bg-neutral-200/50 w-full min-h-80">
                <img
                    src={`./imgs/products/${image}`}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex justify-between items-start p-2 gap-4">
                <div className=''>
                    {/* Category and Title */}
                    <h3 className="text-base font-medium text-neutral-900">{title}</h3>
                    <p className="text-sm font-light text-neutral-500">{category}</p>
                </div>
                
            </div>
            
            {/* Rating */}
            <div className="flex px-2">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        className={
                            index + 0.5 < roundedRating
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-neutral-300"
                        }
                        size={18}
                    />
                ))}
            </div>

            <div className='flex justify-between items-center p-2 gap-4'>
                {/* Price */}
                <p className="text-md font-medium text-mainOrange">${price.toFixed(2)}</p>

                {/* Add to Cart Button */}
                <button 
                    onClick={() => handleAddToCart()} 
                    className="bg-mainOrange p-2  rounded-xl text-white hover:bg-mainTeal/90 transition-all duration-200"
                >
                    <Plus size={18} />
                </button>
            </div>
        </div>
    );
};