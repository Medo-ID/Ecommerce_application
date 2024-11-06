import { useEffect, useState } from "react";
import { ProductCard } from "../components/Product-Card";
import ProductsFilter from "../components/Products-Filter";
import { fetchAllProducts } from "../apis/products";

function Products() {
    const [allProducts, setAllProducts] = useState([])

    const getAllProducts = async () => {
        const res = await fetchAllProducts()
        if (res.success) {
            setAllProducts(res.products)
        } else {
            console.error(res.error)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <div className="container mx-auto my-8 space-y-8 px-4 md:px-0">
            <h2 className="text-2xl font-semibold">All Chairs</h2>

            {/* Filter Section - Stacked for mobile, sidebar for desktop */}
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-12 gap-4">
                {/* Filter */}
                <div className="md:col-span-3 space-y-4 w-full h-fit bg-mainTeal/5 border border-mainTeal/25 p-4 md:p-6">
                    <h2 className="text-lg font-semibold">Filter By Category</h2>

                    {/* Slider for mobile view */}
                    <div className="md:hidden overflow-x-auto flex space-x-4">
                        <ProductsFilter />
                    </div>

                    {/* Vertical List for desktop */}
                    <div className="hidden md:block">
                        <ProductsFilter />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="col-span-9 w-full h-fit md:p-4 bg-neutral-300/10 border border-neutral-400/25">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allProducts.map(item => (
                            <ProductCard
                                key={item.id}
                                image={item.image}
                                title={item.name}
                                category={item.category_name}
                                rating={item.rating}
                                price={parseFloat(item.price)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
