export const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-col justify-between border border-neutral-400/25 shadow-md animate-pulse mb-12 md:mb-0">
            {/* Skeleton Image */}
            <div className="bg-neutral-200/50 w-full h-48"></div>
            
            {/* Skeleton Details */}
            <div className="p-2">
                <div className="flex justify-between items-start gap-4">
                    {/* Skeleton Text Blocks */}
                    <div className="flex flex-col gap-2">
                        <div className="bg-neutral-300 rounded h-4 w-3/4"></div>
                        <div className="bg-neutral-200 rounded h-3 w-1/2"></div>
                    </div>
                </div>

                {/* Skeleton Rating */}
                <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="bg-neutral-300 rounded-full h-4 w-4"></div>
                    ))}
                </div>
            </div>

            {/* Skeleton Price and Button */}
            <div className="flex justify-between items-center p-2 gap-4">
                <div className="bg-neutral-300 h-5 w-12 rounded"></div>
                <div className="bg-neutral-300 h-8 w-8 rounded"></div>
            </div>
        </div>
    );
};
