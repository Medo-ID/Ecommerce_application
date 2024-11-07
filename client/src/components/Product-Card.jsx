import { Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductCard = (product) => {
    // Round rating to nearest half-star for cleaner display
    const { id, image, name, category_name, rating, price } = product.product
    const roundedRating = Math.round(rating * 2) / 2;
    
    return (
        <div className="flex flex-col justify-between border border-neutral-400/25 hover:shadow-md hover:scale-105 transition-all delay-100">
            <Link to={`/products/${id}`} key={id}>
                {/* Product Image */}
                <div className="bg-neutral-200/50 w-full h-fit">
                    <img
                        src={`/imgs/products/${image}`}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex justify-between items-start p-2 gap-4">
                    <div className=''>
                        {/* Category and Title */}
                        <h3 className="font-medium text-neutral-900">{name}</h3>
                        <p className="text-sm font-light text-neutral-500">{category_name}</p>
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
            </Link>

            <div className='flex justify-between items-center p-2 gap-4'>
                {/* Price */}
                <p className="text-md font-medium text-mainOrange">${price}</p>

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