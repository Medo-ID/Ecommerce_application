import { useState, useEffect } from 'react';
import { fetchRelatedProducts } from "../apis/products";
import { ProductCard } from './Product-Card';
import { Spinner } from './Spinner';

export const RelatedProducts = (category) => {
    const categoryName = category.category
    const [related, setRelated] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getRelated = async () => {
            try {
                const res = await fetchRelatedProducts(categoryName)
                if (res.success) {
                    setRelated(res.products)
                } else {
                    setError(res.error)
                }
            } catch (error) {
                setError("Failed to fetch related products.")
            } finally {
                setLoading(false)
            }
        }

        getRelated()
    }, [categoryName])

    if (loading) return (
        <div className="container mx-auto my-8 space-y-8 px-4 md:px-0">
            <Spinner />
        </div>
    )
    
    if (error) return (
        <div className="container mx-auto my-8 space-y-8 px-4 md:px-0">
            <p className="text-red-600 text-sm font-medium text-center">{error}</p>
        </div>
    )

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}