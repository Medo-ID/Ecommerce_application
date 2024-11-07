// HomeFilter component
import { useEffect, useState } from "react";
import { FilterCard } from "./Filter-Card";
import { fetchProductsByCategoty } from "../apis/products";

export const HomeFilter = () => {
    const [category, setCategory] = useState("all");
    const [products, setProducts] = useState([]);

    const handleCategory = async (category) => {
        const res = await fetchProductsByCategoty(category)
        if (res.success) {
            setProducts(res.products)
        } else {
            console.error(res.error)
        }
    };

    useEffect(() => {
        handleCategory(category)
    }, [category]);

    const activeLink = "text-sm font-medium text-neutral-900 border-b-2 border-mainOrange transition-colors duration-200";
    const notActiveLink = "text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200";

    return (
        <div className="flex flex-col gap-6 md:px-2">
            {/* Header and Category Filter */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold">Products</h2>
                <ul className="flex space-x-3 md:space-x-6">
                    {["all", "office", "accent", "dining"].map((item) => (
                        <li
                            key={item}
                            className={`cursor-pointer ${
                                category === item ? activeLink : notActiveLink
                            }`}
                            onClick={() => setCategory(item)}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Product Grid */}
            <div className="grid grid-rows-2 md:grid-cols-4 gap-6">
                {/* Featured Large Image */}
                <div className="row-span-2 md:col-span-1">
                    <img
                        src="/imgs/banner.jpg"
                        alt="Category Banner"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Cards */}
                {products.map(product => (
                    <FilterCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};
