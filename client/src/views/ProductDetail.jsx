import { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { fetchOneProduct, fetchRelatedProducts } from "../apis/products";
import { Spinner } from "../components/Spinner";
import { Star } from "lucide-react";
import { RelatedProducts } from "../components/Related-Products";
import { AddToCartButton } from "../components/Add-To-Cart";

function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [productLoading, setProductLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetchOneProduct(id)
                if (res.success) {
                    setProduct(res.product)
                } else {
                    setError(res.error)
                }
            } catch (error) {
                setError("Failed to fetch product details.")
            } finally {
                setProductLoading(false)
            }
        }

        getProduct()
    }, [id]);

    if (productLoading) return (
        <div className="container mx-auto my-8 space-y-8 px-4 md:px-0">
            <Spinner />
        </div>
    )
    
    if (!product || error) return (
        <div className="container mx-auto my-8 space-y-8 px-4 md:px-0">
            <p className="text-red-600 text-sm font-medium text-center">{error}</p>
        </div>
    )

    return(
        <div className="container mx-auto my-8 space-y-8 px-4 md:px-0">
            {/* The product detail */}
            <section className="flex flex-col md:flex-row justify-evenly items-start gap-4 p-1 md:py-8 md:px-4 w-full h-fit bg-neutral-100/10 border">
                <div className="bg-neutral-200/50 max-w-md">
                    <img
                        src={`/imgs/products/${product.image}`}
                        alt={product.name}
                        className="max-w-md object-cover"
                    />
                </div>
                <div className="flex flex-col justify-around items-start gap-6">
                    <div className="flex flex-col justify-evenly items-start w-full gap-2">
                        <h2 className="text-2xl font-semibold">{product.name}</h2>
                        <p className="text-sm">{product.description}</p>
                        <p className="mt-1 text-xs text-gray-500">Category: {product.category_name}</p>
                        
                        {/* Rating */}
                        <div className="flex">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    className={
                                        index + 0.5 < Math.round(product.rating * 2) / 2
                                            ? "fill-yellow-500 text-yellow-500"
                                            : "text-neutral-300"
                                    }
                                    size={18}
                                />
                            ))}
                        </div>
                    
                    </div>
                    <div className="flex gap-4 justify-start items-center">
                        <p className="text-lg font-semibold">${product.price}</p>
                        {/* Quantity Input */}
                        <input
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-16 p-2 mx-auto text-center border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-mainTeal rounded-md"
                        />
                        <AddToCartButton product={product} quantity={quantity} />
                    </div>
                </div>
            </section>
            
            {/* Relaited products */}
            <section className="flex flex-col justify-evenly items-start gap-4 p-1 md:py-4 md:px-4 w-full h-fit bg-neutral-100/10 border">
                <h2 className="text-xl font-semibold">Related Products</h2>
                <Suspense fallback={<Spinner />}>
                    <RelatedProducts category={product.category_name} />
                </Suspense>
            </section>
        </div>
    )
}

export default ProductDetail;