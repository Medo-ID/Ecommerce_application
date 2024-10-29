import { Link } from "react-router-dom";
import { logoutUser } from "../apis/auth";

export const Navbar = () => {
    const isAuthenticated = false;

    const links = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" }
    ];

    return (
        <nav className="flex justify-between items-center w-full bg-neutral-900 px-1 md:px-8 md:h-14">
            <h1 className="text-xl font-extrabold text-neutral-50">NextStore</h1>
            <div className="flex justify-around gap-8">
                <ul className="space-x-4">
                    {links.map(link => (
                        <Link
                            key={link.name}
                            className="text-base font-normal text-neutral-50"
                            to={link.path}
                        >
                            {link.name}
                        </Link>
                    ))}
                </ul>
                <div className="space-x-2">
                    {isAuthenticated ? (
                        <>
                            <Link 
                                className="bg-neutral-50 text-neutral-950 md:px-4 md:py-2 rounded-md text-sm font-medium"
                                to="/account"
                            >
                                Account
                            </Link>
                            <button 
                                className="bg-neutral-950 text-neutral-50 md:px-4 md:py-2 rounded-md text-sm font-medium"
                                onClick={logoutUser}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                className="bg-neutral-950 text-neutral-50 md:px-4 md:py-2 rounded-md text-sm font-medium" 
                                to="/login"
                            >
                                Log In
                            </Link>
                            <Link 
                                className="bg-neutral-50 text-neutral-950 md:px-4 md:py-2 rounded-md text-sm font-medium" 
                                to="/signup"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
