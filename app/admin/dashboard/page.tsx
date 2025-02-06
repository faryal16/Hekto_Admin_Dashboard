"use client";

import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import Sales from "./sales/page";
import Orders from "./orders/page";
import Analytics from "./analytics/page";
import Settings from "./settings/page";
import ProductsPage from "./products/page";
import AddProductPage from "./addProduct/page";
import Visitors from "./visitors/page";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("orders");
  const { isSignedIn } = useUser(); // Check if the user is signed in
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle sidebar

  // If user is not signed in, display sign-in prompt
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <h2 className="text-xl text-red-500 mb-4">You are not signed in. Please log in.</h2>
        <button
          onClick={() => router.push("/sign-in")}
          className="border px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "orders":
        return <Orders />;
      case "sales":
        return <Sales />;
      case "visitors":
        return <Visitors />;
      case "products":
        return <ProductsPage />;
      case "add-products":
        return <AddProductPage />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Orders />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-200">
      {/* Sidebar - Responsive */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 bg-white shadow-lg z-50`}>
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 w-full">
        {/* Navbar (Mobile Toggle + User Profile) */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="text-2xl md:text-3xl font-semibold flex-1 text-center">Admin Dashboard</h1>

          {/* User Profile */}
          <div className="flex items-center  space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Render Active Page */}
        {renderPage()}
      </div>
    </div>
  );
}
