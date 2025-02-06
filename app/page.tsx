"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to login page if user is not signed in and is on home page
  useEffect(() => {
    if (isLoaded && !isSignedIn && pathname === "/") {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, pathname, router]);

  // Ensure that the page is fully loaded
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-500 to-teal-500">
      {isSignedIn ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold  text-white">Welcome, {user.fullName}!</h1>
          <Link href="/admin/dashboard">
            <button className="border  p-2 rounded-lg bg-pink-500 hover:bg-pink-700 text-white text-xl m-4">
              Go To Admin Dashboard
            </button>
          </Link>
        </div>
      ) : (
        <div className="text-white text-3xl">Please log in to continue.</div>
      )}
    </div>
  );
}
