import { Link, useLocation } from "react-router-dom";
import { User, LogOut, Menu, X, Armchair } from "lucide-react";
import { useAuth } from "../hooks/authContext";
import { logoutUser } from "../apis/auth";
import CartIcon from "./Cart-Icon";
import { useState } from "react";
import { useCart } from "../hooks/cartContext";
import { toast } from "sonner";

export const Navbar = () => {
  const { pathname } = useLocation();
  const { isAuthenticated, checkAuthStatus } = useAuth();
  const { refreshCartCount } = useCart();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const activeLink =
    "text-neutral-900 font-medium border-b border-mainOrange md:py-1 transition-color duration-200";
  const notActiveLink =
    "text-neutral-700 hover:text-neutral-900 md:py-1 transition-color duration-200";

  const activeIcon =
    "bg-neutral-900/10 p-2 rounded-full text-mainOrange transition-all duration-200 border border-mainOrange/25";
  const notActiveIcon =
    "hover:bg-neutral-900/5 p-2 rounded-full transition-all duration-200";

  const handleLogout = async () => {
    const res = await logoutUser();

    if (res.success) {
      checkAuthStatus();
      refreshCartCount();
      toast.success(res.message);
    }
  };

  return (
    <nav className="container mx-auto flex justify-between items-center py-4 px-2 relative">
      <div className="flex gap-4 md:gap-12 items-center">
        <div className="flex justify-center items-center gap-2">
          <Armchair />
          <h1 className="font-bold text-mainOrange text-lg md:py-1">
            <span className="text-neutral-900">S</span>tudios.
          </h1>
        </div>
        <ul className="flex space-x-2 text-xs md:space-x-6 md:text-sm">
          <Link
            to="/"
            className={pathname === "/" ? activeLink : notActiveLink}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={pathname === "/products" ? activeLink : notActiveLink}
          >
            Products
          </Link>
        </ul>
      </div>
      <div className="flex gap-4 md:gap-12 justify-end items-center text-xs md:text-sm w-full">
        <ul className="flex space-x-1 md:space-x-4">
          {isAuthenticated && (
            <Link to="/account">
              <User
                className={pathname === "/account" ? activeIcon : notActiveIcon}
                size={34}
              />
            </Link>
          )}
          <Link to="/cart">
            <CartIcon
              className={pathname === "/cart" ? activeIcon : notActiveIcon}
            />
          </Link>
        </ul>
        {/* Mobile Menu Toggle Button */}
        {!isAuthenticated && (
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden ml-4 text-mainOrange bg-neutral-900/10 p-2 rounded-full border border-mainOrange/25 transition-all duration-200"
          >
            <Menu size={18} />
          </button>
        )}
        {/* Desktop Links */}
        <ul className="space-x-4">
          {isAuthenticated ? (
            <button className="flex items-center" onClick={handleLogout}>
              <LogOut
                className="bg-neutral-900/10 p-2 rounded-full text-mainTeal transition-all duration-200 border border-mainTeal/25"
                size={34}
              />
            </button>
          ) : (
            <ul className="flex">
              <Link
                to="/login"
                className="hidden md:flex text-neutral-900 hover:text-mainOrange py-2 px-4 transition-all duration-200"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="hidden md:flex bg-mainOrange rounded-2xl text-white py-2 px-4 hover:bg-mainTeal/70 shadow-xl transition-all duration-200"
              >
                Sign up
              </Link>
            </ul>
          )}
        </ul>{" "}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-start p-6 
          transform transition-all duration-300 ease-in-out ${
            !isAuthenticated && showMobileMenu
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
      >
        <button
          onClick={() => setShowMobileMenu(false)}
          className="text-mainOrange bg-neutral-900/10 p-2 rounded-full border border-mainOrange/25 hover:bg-neutral-900/20 transition-all duration-200 self-end"
        >
          <X />
        </button>
        <h1 className="font-bold text-mainOrange text-lg mt-4 mb-8">
          <span className="text-neutral-900">S</span>tudios.
        </h1>
        <div className="flex flex-col items-center w-full gap-4">
          <Link
            to="/login"
            onClick={() => setShowMobileMenu(false)}
            className="text-neutral-900 hover:text-mainOrange py-3 px-8 w-full text-center transition-all duration-200 text-lg hover:scale-105"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            onClick={() => setShowMobileMenu(false)}
            className="bg-mainOrange rounded-2xl text-white py-3 px-8 w-full text-center hover:bg-mainTeal hover:shadow-2xl shadow-xl transition-all duration-200 text-lg hover:scale-105"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};
