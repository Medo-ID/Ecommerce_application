import { useEffect, useState } from "react";

function ProductsFilter() {
    const [category, setCategory] = useState("");

    const handleCategory = (category) => {
        setCategory(category);
    };

    useEffect(() => {
        console.log(category);
    }, [category]);

    const activeLink = "text-sm font-medium text-mainOrange transition-colors duration-200";
    const notActiveLink = "text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200";

    return (
        <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 font-medium overflow-x-auto">
            {['Office', 'Gaming', 'Dining', 'Recliners', 'Accent'].map(item => (
                <li
                    key={item}
                    className={`cursor-pointer whitespace-nowrap ${
                        category === item ? activeLink : notActiveLink
                    }`}
                    onClick={() => handleCategory(item)}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}

export default ProductsFilter;