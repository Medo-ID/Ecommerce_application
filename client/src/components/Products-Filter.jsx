import { X } from "lucide-react";

function ProductsFilter({ category, onCategoryChange, onClearCategory }) {
    const activeLink = "text-sm font-medium text-mainOrange transition-colors duration-200";
    const notActiveLink = "text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200";

    return (
        <div className={`flex justify-between md:items-start items-center w-full ${category && `flex-row-reverse`}`}>
            {category && (
                <X
                    onClick={onClearCategory}
                    className="w-8 h-8 p-2 bg-neutral-900/10 rounded-full text-mainOrange transition-all duration-200 cursor-pointer"
                />
            )}
            <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 font-medium overflow-x-auto">
                {['Office', 'Gaming', 'Dining', 'Recliners', 'Accent'].map((item) => (
                    <li
                        key={item}
                        className={`cursor-pointer whitespace-nowrap ${
                            category === item ? activeLink : notActiveLink
                        }`}
                        onClick={() => onCategoryChange(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductsFilter;
