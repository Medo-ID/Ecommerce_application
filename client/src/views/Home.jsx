import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ProductCard } from "../components/ProductCard";
import { HomeFilter } from "../components/HomeFilter";

function Home() {
    
    useEffect(() => {
        const message = localStorage.getItem("success_logout")
        if (message) {
            toast.success(message)
        }
        localStorage.removeItem("success_logout")
    }, []);

    return (
        <div className="container mx-auto flex flex-col justify-evenly gap-20">
            
            {/* Hero section */}
            <section className="my-4 flex flex-col md:flex-row justify-between items-center gap-20 px-6">
                <div className="flex flex-col justify-evenly items-start gap-8 max-w-2xl">
                    <p className="text-neutral-400 text-base">TRENDY COLLECTION 🔥</p>
                    <h1 className="text-5xl font-semibold">
                        Make Your
                        <span className="text-mainOrange drop-shadow-2xl"> Interior </span> 
                        Unique & Modern 
                        <span className="text-mainOrange">.</span>
                    </h1>
                    <p>Turn your room with panto into a lot more minimalist and modern.</p>
                    <Link 
                        to='products'
                        className="mt-4 bg-mainOrange hover:bg-mainTeal/70 text-white rounded-2xl py-3 px-6 shadow-custom-orange hover:shadow-custom-teal transition-all delay-200"
                    >
                        Discover Now
                    </Link>
                </div>
                <div className="max-w-xl">
                    <img
                        className="w-full h-full object-cover"
                        src="./imgs/chair_home.png" alt="Image of a dark blue chair"
                    />
                </div>
            </section>
            
            {/* Best Categories Section */}
            <section className="my-4 flex flex-col lg:flex-row justify-between items-center gap-10 px-6">
                {/* Recliners */}
                <div className="p-6 md:p-8 bg-mainOrange/10 flex justify-between items-center border border-mainOrange/25 w-full max-w-md">
                    <div className="flex flex-col justify-center gap-4">
                        <h2 className="text-2xl font-semibold">Recliners</h2>
                        <p className="text-sm text-neutral-500 max-w-xs">
                            Chairs designed for relaxation with reclining functionality.
                        </p>
                        <Link to="/" className="text-mainOrange hover:text-mainTeal text-sm font-semibold">
                            Shop Now
                        </Link>
                    </div>
                    <div className="w-32 h-32 md:w-40 md:h-40">
                        <img
                            className="w-full h-full object-cover rounded-lg"
                            src="./imgs/recliner_chairs.png"
                            alt="Recliner Chair"
                        />
                    </div>
                </div>

                {/* Dining Chairs */}
                <div className="p-6 md:p-8 bg-neutral-400/10 flex justify-between items-center border border-neutral-400/25 w-full max-w-md">
                    <div className="flex flex-col justify-center gap-4">
                        <h2 className="text-2xl font-semibold">Accent Chairs</h2>
                        <p className="text-sm text-neutral-500 max-w-xs">
                            Chairs meant to add style and character to any room.
                        </p>
                        <Link to="/" className="text-mainOrange hover:text-mainTeal text-sm font-semibold">
                            Shop Now
                        </Link>
                    </div>
                    <div className="w-32 h-32 md:w-40 md:h-40">
                        <img
                            className="w-full h-full object-cover rounded-lg"
                            src="./imgs/chair_home.png"
                            alt="Dining Chair"
                        />
                    </div>
                </div>

                {/* Dining Chairs */}
                <div className="p-6 md:p-8 bg-mainTeal/10 flex justify-between items-center border border-mainTeal/25 w-full max-w-md">
                    <div className="flex flex-col justify-center gap-4">
                        <h2 className="text-2xl font-semibold">Dining Chairs</h2>
                        <p className="text-sm text-neutral-500 max-w-xs">
                            Comfortable chairs for dining rooms, available in various styles.
                        </p>
                        <Link to="/" className="text-mainOrange hover:text-mainTeal text-sm font-semibold">
                            Shop Now
                        </Link>
                    </div>
                    <div className="w-32 h-32 md:w-40 md:h-40">
                        <img
                            className="w-full h-full object-cover rounded-lg"
                            src="./imgs/dining_chairs.png"
                            alt="Dining Chair"
                        />
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="my-8 flex flex-col justify-between items-center gap-20 px-6">
                {/* Section Heading */}
                <div className="flex flex-col items-center gap-2 max-w-xl">
                    <h2 className="text-3xl font-semibold">Trending Products</h2>
                    <p className="text-sm text-neutral-500 text-center">
                        Explore our top trending products, where style meets comfort. 
                        Discover popular picks like cozy recliners and elegant dining 
                        chairs to elevate your space.     
                    </p>
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array(4).fill(null).map((_, index) => (
                        <ProductCard
                            key={index}
                            img="./imgs/chair_home.png"
                            title="Elegant Recliner"
                            category="Recliners"
                            rating={4.3}
                            price={299.99}
                        />
                    ))}
                </div>
            </section>

            <section className="my-8 flex flex-col justify-between gap-20 px-6">
                <HomeFilter />
            </section>

        </div>
    )
}

export default Home;