import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Home() {
    
    useEffect(() => {
        const message = localStorage.getItem("success_logout")
        if (message) {
            toast.success(message)
        }
        localStorage.removeItem("success_logout")
    }, []);

    return (
        <div className="flex flex-col justify-evenly items-center gap-20">
            {/* Hero section */}
            <section className="mx-auto my-10 md:flex justify-evenly items-center gap-20 px-6">
                <div className="flex flex-col justify-evenly items-start gap-8 max-w-lg">
                    <p className="text-neutral-400 text-base">TRENDY COLLECTION 🔥</p>
                    <h1 className="text-5xl font-semibold">
                        Make Your
                        <span className="text-mainOrange"> Interior </span> 
                        Unique & Modern 
                        <span className="text-mainOrange">.</span>
                    </h1>
                    <p>Turn your room with panto into a lot more minimalist and modern.</p>
                    <Link 
                        to='products'
                        className="bg-mainOrange hover:bg-mainTeal/70 text-white rounded-2xl py-3 px-8 shadow-custom-orange hover:shadow-custom-teal transition-all delay-120"
                    >
                        Discover Now
                    </Link>
                </div>
                <div className="max-w-lg">
                    <img
                        className="w-full h-full object-cover"
                        src="./imgs/chair_home.png" alt="Image of a dark blue chair"
                    />
                </div>
            </section>
            
            <section className="mx-auto my-10 flex flex-col md:flex-row justify-evenly items-stretch gap-10 px-6 max-w-5xl">
                {/* Recliners Section */}
                <div className="p-6 md:p-8 bg-mainOrange/10 flex justify-between items-center border border-mainOrange/25 rounded-lg w-full max-w-md">
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

                {/* Dining Chairs Section */}
                <div className="p-6 md:p-8 bg-mainTeal/10 flex justify-between items-center border border-mainTeal/25 rounded-lg w-full max-w-md">
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

        </div>
    )
}

export default Home;