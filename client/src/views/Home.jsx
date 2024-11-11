import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/Product-Card";
import { HomeFilter } from "../components/Home-Filter";
import { fetchTrendingProducts } from "../apis/products";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { toast } from "sonner";


function Home() {
    const [products, setProducts] = useState([])

    const fetchTrending = async () => {
        const res = await fetchTrendingProducts()
        if (res.success) {
            setProducts(res.products)
        } else {
            console.error(res.error)
        }
    }

    useEffect(() => {
        const message = localStorage.getItem("success_login")
        if (message) {
            toast.success(message)
        }
        localStorage.removeItem("success_login")
    }, [])
    
    useEffect(() => {
        fetchTrending()
    }, [])

    return (
        <div className="container mx-auto flex flex-col justify-evenly gap-24">
            
            {/* Hero section */}
            <section className="relative my-4 flex flex-col justify-center md:flex-row md:justify-between items-center md:gap-20 px-4 py-4 overflow-hidden">

                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-mainOrange/40 via-mainTeal/40 to-mainOrange/40 blur-3xl opacity-80 animate-rotateGradient-slow"></div>

                <div className="relative z-10 flex flex-col justify-center md:justify-evenly items-start gap-6 max-w-2xl md:mx-10">
                    <p className="text-neutral-600 text-sm md:text-base drop-shadow-lg">TRENDY COLLECTION 🔥</p>
                    <h1 className="text-4xl lg:text-6xl font-semibold text-900 drop-shadow-2xl leading-tight">
                        Make Your 
                        <span className="text-mainOrange drop-shadow-2xl"> Interior </span> 
                        Unique & Modern 
                        <span className="text-mainOrange">.</span>
                    </h1>
                    <p className="text-sm md:text-base text-neutral-900 drop-shadow-lg leading-relaxed">
                        Turn your room with panto into a minimalist and modern masterpiece.
                    </p>
                    <Link 
                        to="products"
                        className="mt-4 bg-mainOrange hover:bg-mainTeal/80 text-white rounded-2xl py-3 px-8 shadow-custom-orange hover:shadow-custom-teal transition-all duration-300 ease-in-out"
                    >
                        Discover Now
                    </Link>
                </div>

                <div className="relative z-10 max-w-xl">
                    <img
                        className="w-full h-full object-cover"
                        src="/imgs/chair_home.png" 
                        alt="Image of a dark blue chair"
                    />
                </div>
            </section>
            
            {/* Best Categories Section */}
            <section className="my-4 md:my-12 flex flex-col lg:flex-row justify-between items-center gap-10 px-4">
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
                            src="/imgs/products/leather.png"
                            alt="Recliner Chair"
                        />
                    </div>
                </div>

                {/* Dining Chairs */}
                <div className="p-6 md:p-8 bg-neutral-400/10 flex justify-between items-center border border-neutral-400/25 w-full max-w-md">
                    <div className="flex flex-col justify-center gap-4">
                        <h2 className="text-2xl font-semibold">Accent</h2>
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
                            src="/imgs/chair_home.png"
                            alt="Dining Chair"
                        />
                    </div>
                </div>

                {/* Dining Chairs */}
                <div className="p-6 md:p-8 bg-mainTeal/10 flex justify-between items-center border border-mainTeal/25 w-full max-w-md">
                    <div className="flex flex-col justify-center gap-4">
                        <h2 className="text-2xl font-semibold">Dining</h2>
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
                            src="/imgs/products/modern.png"
                            alt="Dining Chair"
                        />
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="md:my-12 flex flex-col justify-between items-center gap-20 px-4">
                {/* Section Heading */}
                <div className="flex flex-col items-center gap-2 max-w-xl">
                    <h2 className="text-3xl font-semibold">Trending Products</h2>
                    <p className="text-sm text-neutral-500 text-center">
                        Explore our top trending products, where style meets comfort. 
                        Discover popular picks like cozy recliners and elegant dining 
                        chairs to elevate your space.     
                    </p>
                </div>

                {/* Product Carousel for Mobile */}
                <div className="w-full md:hidden">
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1.5}
                        pagination={{ clickable: true }}
                        navigation={false}
                        modules={[Pagination, Navigation]}
                        className="custom-swiper"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Product Grid for Desktop */}
                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section className="my-4 md:my-12 flex flex-col justify-between gap-20 px-6">
                <HomeFilter />
            </section>

        </div>
    )
}

export default Home;