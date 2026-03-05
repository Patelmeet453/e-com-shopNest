import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  /* HANDLE SUCCESS & ERROR */
  useEffect(() => {
    if (user) {
      toast.success("Login successful");
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [user, error]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur
                   border border-gray-800 rounded-xl p-8 shadow-xl"
      >
        <h2 className="text-center text-emerald-400 text-xl font-semibold mb-6">
          Login to your account
        </h2>

        <input
          type="email"
          placeholder="you@example.com"
          className="w-full mb-4 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="••••••••"
          className="w-full mb-6 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-md font-medium
            ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
        >
          {loading ? <Loader2 className="animate-spin" /> : <LogIn size={18} />}
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-emerald-400 hover:underline">
            Sign up →
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
