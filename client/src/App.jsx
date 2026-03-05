import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/auth/authSlice";
import { useEffect } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import Store from "./pages/Store";
import ProductDetails from "./compoenets/ProductDetails";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import { fetchProducts } from "./features/product/productSlice";
import { fetchCart } from "./features/cart/cartSlice";
import Checkout from "./pages/Checkout";
import Address from "./pages/Address";
import MyOrders from "./pages/MyOrders";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./compoenets/Layout";
import PaymentSuccess from "./pages/PaymentSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import { fetchMyProfile } from "./features/user/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user, checkingAuth } = useSelector((state) => state.auth);
  // const user = useSelector((s) => s.auth.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (user) dispatch(fetchCart());
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchMyProfile());
    }
  }, [user, dispatch]);

  if (checkingAuth) {
    return (
      <div className="h-screen flex items-center justify-center text-emerald-400">
        Checking session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-950">
      <Router>
        <Routes>
          {/* LAYOUT WRAPPER */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/store/:category" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/address" element={<Address />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Route>

          {/* AUTH ROUTES (NO NAVBAR IF YOU WANT) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
