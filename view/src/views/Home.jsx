import { useEffect, useState } from "react";
import { getProducts } from "../apis/products";

function Home() {
    const [allProducts, setAllProducts] = useState([]);

    const products = async () => {
        const res = await getProducts();
        if (!res.ok) {
            setAllProducts(["Not Items are available"])
            return;
        }
        const data = JSON.parse(res.products)
        setAllProducts(data)
    }

    useEffect(() => {
        products()
    }, [])

    return (
        <div>
            {allProducts?.map(item => <p key={item.id}>{item}</p>)}
        </div>
    );
}

export default Home;