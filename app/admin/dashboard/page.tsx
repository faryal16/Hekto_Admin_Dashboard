"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const salesData = [
  { date: "Jan", sales: 4000 },
  { date: "Feb", sales: 3000 },
  { date: "Mar", sales: 5000 },
  { date: "Apr", sales: 7000 },
  { date: "May", sales: 6000 },
];

const productPerformance = [
  { product: "Chairs", sales: 2400 },
  { product: "Sofas", sales: 4000 },
  { product: "Tables", sales: 1800 },
  { product: "Beds", sales: 3200 },
];

const orderDistribution = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 30 },
  { name: "Cancelled", value: 10 },
];

const COLORS = ["#4CAF50", "#FFC107", "#FF5722"];

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h2 className="text-center text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sales Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#4C9BFE" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={orderDistribution}
                cx="50%"
                cy="50%"
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {orderDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
