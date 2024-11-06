// HomeFilter component
import { useEffect, useState } from "react";
import { FilterCard } from "./Filter-Card";

export const HomeFilter = () => {
    const [category, setCategory] = useState("all");

    const handleCategory = (category) => {
        setCategory(category);
    };

    useEffect(() => {
        console.log(category);
    }, [category]);

    const activeLink = "text-sm font-medium text-neutral-900 border-b-2 border-mainOrange transition-colors duration-200";
    const notActiveLink = "text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200";

    return (
        <div className="flex flex-col gap-6 px-4">
            {/* Header and Category Filter */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold">Products</h2>
                <ul className="flex space-x-6">
                    {["all", "office", "accent", "dining"].map((item) => (
                        <li
                            key={item}
                            className={`cursor-pointer ${
                                category === item ? activeLink : notActiveLink
                            }`}
                            onClick={() => handleCategory(item)}
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
                        src="./imgs/chair_home.png"
                        alt="Comfy Lounge Chair"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Product Cards */}
                {Array(6).fill(null).map((_, index) => (
                    <FilterCard 
                        key={index}
                        image="./imgs/dining_chairs.png"
                        title="Comfy Lounge Chair"
                        price={249.99}
                        category={category}
                    />
                ))}
            </div>
        </div>
    );
};
