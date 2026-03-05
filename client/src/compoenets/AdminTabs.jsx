import { Plus, Box, BarChart3, User, ListOrdered, ListOrderedIcon } from "lucide-react";

const AdminTabs = ({ activeTab, setActiveTab }) => {
  const tabStyle = (tab) =>
    `flex items-center gap-2
     px-5 py-2 h-10
     rounded-lg text-sm font-medium
     whitespace-nowrap flex-shrink-0
     transition
     ${
       activeTab === tab
         ? "bg-emerald-600 text-white"
         : "bg-[#020617] text-gray-400 hover:text-white"
     }`;

  return (
    <div className="my-6">
      <div
        className="
          flex gap-3
          overflow-x-auto
          pb-3
          px-4           /* 👈 FIX: space so first/last not cut */
          scrollbar-hide
          md:justify-center  /* 👈 FIX: better for scroll containers */
        "
      >
        <button
          onClick={() => setActiveTab("create")}
          className={tabStyle("create")}
        >
          <Plus size={16} /> Create Product
        </button>

        <button
          onClick={() => setActiveTab("list")}
          className={tabStyle("list")}
        >
          <Box size={16} /> Products List
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={tabStyle("analytics")}
        >
          <BarChart3 size={16} /> Analytics
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={tabStyle("orders")}
        >
          <ListOrderedIcon size={16} /> Orders
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={tabStyle("users")}
        >
          <User size={16} /> Users
        </button>
      </div>
    </div>
  );
};

export default AdminTabs;
