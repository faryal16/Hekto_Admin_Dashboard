"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Swal from "sweetalert2";
import { Product } from "@/sanity.types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "product"]{
            _id,
            name,
            description,
            price,
            "image": image.asset->url
          }`
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
        Swal.fire("Error!", "Failed to load products.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this product?",
      text: "You will not be able to recover this product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      console.log("Attempting to delete product with ID:", productId); // Debugging line
  
      // Ensure the correct method is used to delete the document
      const deletedProduct = await client.delete(productId); // Check if this resolves successfully
  
      if (deletedProduct) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } else {
        throw new Error("Product deletion failed");
      }
    } catch (error: unknown) {
      console.error("Error deleting product:", error); // Log error for better understanding
      Swal.fire("Error!", "Failed to delete the product.", "error");
    }
  };
  

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">All Products</h2>

      {/* Product Grid with Responsive Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-xl transform transition-transform hover:scale-105 hover:shadow-lg p-4 border border-gray-200 flex flex-col"
          >
            {/* Product Image */}
            <div className="relative w-full h-56 overflow-hidden rounded-md mb-4">
              {product.image ? (
                <Image
                  src={urlFor(product.image).url()}
                  alt="{product.name}"
                  layout="responsive"
                  width={500}
                  height={300}
                  objectFit="cover"
                  className="rounded-md"
                />
              ) : (
                <div className="bg-gray-300 w-full h-full flex justify-center items-center rounded-md">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>

            {/* Product Title */}
            <h3 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>

            {/* Price */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-blue-600">${product.price}</span>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(product._id)}
              className="mt-4 bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
