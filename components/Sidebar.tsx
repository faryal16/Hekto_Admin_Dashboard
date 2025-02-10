"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Orders", path: "/admin/dashboard/orders" },
    { name: "Sales", path: "/admin/dashboard/sales" },
    { name: "Visitors", path: "/admin/dashboard/visitors" },
    { name: "Products", path: "/admin/dashboard/products" },
    { name: "Add Product", path: "/admin/dashboard/addProduct" },
    { name: "Analytics", path: "/admin/dashboard/analytics" },
    { name: "Settings", path: "/admin/dashboard/settings" },
  ];

  return (
    <div className="h-full p-4 bg-white shadow-lg">
      <h2 className="text-lg font-bold mb-6">Dashboard</h2>
      <ul>
        {links.map(({ name, path }) => (
          <li key={path}>
            <Link
              href={path}
              className={`block p-2 rounded ${pathname === path ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
