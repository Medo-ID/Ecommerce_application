import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";

export const Navbar = () => {
    const { pathname } = useLocation();

    const activeLink = "text-neutral-950 font-medium border-b border-mainOrange md:py-1 transition-color duration-200";
    const notActiveLink = "text-neutral-700 hover:text-neutral-950 md:py-1 transition-color duration-200";

    const activeIcon = "bg-neutral-950/10 p-2 rounded-full text-mainOrange transition-all duration-200";
    const notActiveIcon = "hover:bg-neutral-950/5 p-2 rounded-full transition-all duration-200";

    return (
        <nav className="w-full flex justify-between items-center md:py-4 px-4">
            <div className="flex gap-12 items-center">
                <h1 className="font-bold text-mainOrange text-lg md:py-1">
                    <span className="text-neutral-950">S</span>tudios.
                </h1>
                <ul className="flex space-x-6 text-sm">
                    <Link to="/" className={pathname === '/' ? activeLink : notActiveLink}>
                        Home
                    </Link>
                    <Link to="/products" className={pathname === '/products' ? activeLink : notActiveLink}>
                        Products
                    </Link>
                </ul>
            </div>
            <div className="flex gap-12 items-center text-sm">
                <ul className="flex space-x-4">
                    <Link to="/account">
                        <User
                            className={pathname === '/account' ? activeIcon : notActiveIcon}
                            size={34}
                        />
                    </Link>
                    <Link to="/cart">
                        <ShoppingCart
                            className={pathname === '/cart' ? activeIcon : notActiveIcon}
                            size={34}
                        />
                    </Link>
                </ul>
                <ul className="space-x-4">
                    <Link to="/login" className="text-neutral-950 hover:text-mainOrange py-2 px-4 transition-all duration-200">
                        Log in
                    </Link>
                    <Link to="/signup" className="bg-mainOrange rounded-2xl text-white py-2 px-4 hover:bg-mainOrange/80 transition-all duration-200">
                        Sign up
                    </Link>
                </ul>
            </div>
        </nav>
    );
};
