import { useState } from "react";
import AdminTabs from "../compoenets/AdminTabs";
import CreateProductForm from "../compoenets/CreateProductForm";
import ProductManagement from "../compoenets/ProductManagement";
import UserManagement from "../compoenets/UserManagement";
import AdminAnalytics from "../compoenets/AdminAnalytics";
import AdminOrders from "../compoenets/AdminOrders";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen text-white px-6 pb-10">
      <h1 className="text-3xl font-bold text-emerald-400 text-center mt-6">
        Admin Dashboard
      </h1>

      <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "create" && <CreateProductForm />}
      {activeTab === "list" && <ProductManagement />}
      {activeTab === "analytics" && (
        {/* <AdminAnalytics /> */}
      )}
      {activeTab === "orders" && (
        {/* <AdminOrders /> */}
      )}
      {activeTab === "users" && <UserManagement />}
    </div>
  );
};

export default AdminDashboard;
