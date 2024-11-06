export const FilterCard = ({ title, category, image, price }) => {
    return (
        <div className="shadow-sm overflow-hidden w-full">
            {/* Product Image */}
            <div className="bg-neutral-200/50 h-40">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Details */}
            <div className="flex justify-between items-start p-4">
                <div className="space-y-1 text-sm">
                    <h3 className="font-semibold text-neutral-900">{title}</h3>
                    <p className="text-neutral-500">{category}</p>
                </div>
                <p className="text-sm font-semibold text-mainOrange">${price.toFixed(2)}</p>
            </div>
        </div>
    );
};