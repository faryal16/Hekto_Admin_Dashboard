"use client";

import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react"; 
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser(); 
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <div className="flex h-screen bg-slate-200">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 bg-white shadow-lg z-50`}>
        <Sidebar />
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 w-full">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl md:text-3xl font-semibold flex-1 text-center">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Render Current Page */}
        {children}
      </div>
    </div>
  );
}
