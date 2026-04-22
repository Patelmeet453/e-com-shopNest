import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  Store,
  ListOrderedIcon,
  Contact,
  WalletCards,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import ProfileAvatar from "./ProfileAvatar";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);

  const isAdmin = user?.role === "admin";

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition
     ${isActive
      ? "bg-emerald-600 text-white"
      : "text-gray-300 hover:text-white hover:bg-gray-800"
    }`;

  const handleLogout = () => {
    dispatch(logoutUser()); // ✅ clears cookie + redux
    setOpen(false);
    toast.success("Logout Successfully")
  };

  return (
    <nav className="w-full bg-gray-900/80 backdrop-blur border-b border-gray-800 sticky top-0 z-50">
      <div className="px-6 md:px-16 mx-auto py-3 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="text-emerald-400 font-semibold text-lg">
          ShopNest
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-3">
          <NavLink to="/" className={linkClass}>
            <Home size={16} /> Home
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/shop"
            className={linkClass}
          >
            <Store size={16} /> Store
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/about"
            className={linkClass}
          >
            <WalletCards size={16} /> About Us
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/contact"
            className={linkClass}
          >
            <Contact size={16} /> Contact
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/orders"
            className={linkClass}
          >
            <ListOrderedIcon size={16} /> My Order
          </NavLink>

          {isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              <LayoutDashboard size={16} /> Dashboard
            </NavLink>
          )}

          {/* {user && (
            <NavLink to="/cart" className={linkClass}>
              <div className="relative">
                <ShoppingCart size={16} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 min-w-[16px] px-1 flex items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-semibold">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </NavLink>
          )}

          <NavLink onClick={() => setOpen(false)} to="/profile">
            <ProfileAvatar />
          </NavLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition"
            >
              <LogOut size={18} />
            </button>
          ) : (
            <>
              <NavLink
                to="/signup"
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition"
              >
                <UserPlus size={16} /> Sign Up
              </NavLink>

              <NavLink
                to="/login"
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition"
              >
                <LogIn size={16} /> Login
              </NavLink>
            </>
          )} */}
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex item-center space-x-2">
          <button
            className="lg:hidden text-gray-300"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          {user && (
            <NavLink to="/cart" className={linkClass}>
              <div className="relative">
                <ShoppingCart size={16} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 min-w-[16px] px-1 flex items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-semibold">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </NavLink>
          )}

          <NavLink onClick={() => setOpen(false)} to="/profile">
            <ProfileAvatar />
          </NavLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition"
            >
              <LogOut size={18} />
            </button>
          ) : (
            <>
              <NavLink
                to="/signup"
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition"
              >
                <UserPlus size={16} /> Sign Up
              </NavLink>

              <NavLink
                to="/login"
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition"
              >
                <LogIn size={16} /> Login
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden border-t border-gray-800 bg-gray-900 px-6 py-4 space-y-3">
          <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>
            <Home size={16} /> Home
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/store"
            className={linkClass}
          >
            <Home size={16} /> Store
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/about"
            className={linkClass}
          >
            <WalletCards size={16} /> About Us
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/contact"
            className={linkClass}
          >
            <Contact size={16} /> Contact
          </NavLink>

          {user && (
            <NavLink
              onClick={() => setOpen(false)}
              to="/cart"
              className={linkClass}
            >
              <ShoppingCart size={16} />
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              onClick={() => setOpen(false)}
              to="/admin"
              className={linkClass}
            >
              <LayoutDashboard size={16} /> Dashboard
            </NavLink>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <>
              <NavLink
                onClick={() => setOpen(false)}
                to="/signup"
                className="flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-md"
              >
                <UserPlus size={16} /> Sign Up
              </NavLink>

              <NavLink
                onClick={() => setOpen(false)}
                to="/login"
                className="flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-md"
              >
                <LogIn size={16} /> Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
