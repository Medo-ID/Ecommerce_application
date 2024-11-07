import { Link } from "react-router-dom";

export const FilterCard = (product) => {
    const { id, name, category_name, image, price } = product.product
    return (
        <div className="shadow-sm overflow-hidden w-full hover:shadow-md hover:scale-105 transition-all delay-100">
            <Link to={`/products/${id}`} key={id}>
                {/* Product Image */}
                <div className="bg-neutral-200/50 h-48">
                    <img
                        src={`/imgs/products/${image}`}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Details */}
                <div className="flex flex-col justify-between items-start p-2 gap-2">
                    <h3 className="font-medium text-neutral-900">{name}</h3>
                    <div className="text-sm flex justify-between items-center w-full">
                        <p className="font-light text-neutral-500">{category_name}</p>
                        <p className="text-sm font-semibold text-mainOrange">${price}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};