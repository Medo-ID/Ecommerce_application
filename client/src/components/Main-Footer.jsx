import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export const MainFooter = () => {
    return (
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start p-6 md:py-16 text-neutral-100 gap-8">
            <div className="max-w-md space-y-4">
                <h2 className="font-bold text-mainOrange text-lg">
                    <span className="text-neutral-100">S</span>tudios.
                </h2>
                <p className="text-base">
                    There are many variations of Lorem ipsum available, but the majority have suffered alteration in some form.
                </p>
                <div className="flex space-x-4">
                    <Instagram />
                    <Linkedin />
                    <Twitter />
                </div>
            </div>
            <div className="flex items-start justify-between gap-10 md:gap-40 py-2">
                <div className="space-y-2 text-sm">
                    <h3 className="font-semibold">Navigation</h3>
                    <ul className="space-y-1">
                        <li className="hover:text-mainOrange"><Link to='/'>Home</Link></li>
                        <li className="hover:text-mainOrange"><Link to='/products'>Products</Link></li>
                        <li className="hover:text-mainOrange"><Link to='/signup'>Sign Up</Link></li>
                    </ul>
                </div>
                <div className="space-y-2 text-sm">
                    <h3 className="font-semibold">Features</h3>
                    <ul className="space-y-1">
                        <li className="hover:text-mainOrange"><Link to='/cart'>Cart</Link></li>
                        <li className="hover:text-mainOrange"><Link to='/login'>Login</Link></li>
                        <li className="hover:text-mainOrange"><Link to='/privacy'>Privacy</Link></li>
                    </ul>
                </div>
                <div className="space-y-4 text-sm">
                    <h3 className="font-semibold">Categories</h3>
                    <ul className="space-y-1">
                        <li className="hover:text-mainOrange"><Link to='/products?category=recliners'>Recliners</Link></li>
                        <li className="hover:text-mainOrange"><Link to='/products?category=accent'>Accent</Link></li>
                        <li className="hover:text-mainOrange"><Link to='/products?category=dining'>Dining</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};