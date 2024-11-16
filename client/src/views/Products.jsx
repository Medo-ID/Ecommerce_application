import { useEffect, useState } from "react";
import { ProductCard } from "../components/Product-Card";
import ProductsFilter from "../components/Products-Filter";
import { fetchAllProducts } from "../apis/products";
import { ProductCardSkeleton } from "../components/Card-Loading-Skeleton";

function Products() {
    const [allProducts, setAllProducts] = useState([])
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)

    const getAllProducts = async () => {
        setLoading(true)
        const res = await fetchAllProducts()
        if (res.success) {
            setAllProducts(res.products)
        } else {
            console.error(res.error)
        }
        setLoading(false)
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const handleCategory = (selectedCategory) => {
        setCategory(selectedCategory)
    };

    const clearCategory = () => {
        setCategory("")
    };

    console.log('test all products in products page: ', allProducts)

    // Filter products based on selected category
    const filteredProducts = category
        ? allProducts.filter((product) => product.category_name === category)
        : allProducts

    return (
        <div className="container mx-auto my-8 space-y-8 px-4 md:px-0">
            <h2 className="text-2xl font-semibold">All Chairs</h2>

            {/* Filter Section - Stacked for mobile, sidebar for desktop */}
            <div className="relative space-y-6 md:space-y-0 md:grid md:grid-cols-12 gap-4">
                {/* Filter */}
                <div className="sticky top-0 left-0 md:col-span-3 space-y-3 md:space-y-4 w-full h-fit bg-neutral-400/10 border border-neutral-400/50 p-2 md:p-6 z-10">
                    <h2 className="text-lg font-semibold">Filter By Category</h2>

                    {/* Slider for mobile view */}
                    <div className="md:hidden overflow-x-auto flex space-x-4">
                        <ProductsFilter
                            category={category}
                            onCategoryChange={handleCategory}
                            onClearCategory={clearCategory}
                        />
                    </div>

                    {/* Vertical List for desktop */}
                    <div className="hidden md:block">
                        <ProductsFilter
                            category={category}
                            onCategoryChange={handleCategory}
                            onClearCategory={clearCategory}
                        />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="col-span-9 w-full h-fit md:p-4 bg-neutral-200/20 border border-neutral-400/50">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(8)].map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default Products;
