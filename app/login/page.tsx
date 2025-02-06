"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { RedirectToSignIn } from "@clerk/nextjs";

export default function LoginPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Avoid redirect if not fully loaded
    if (isLoaded && isSignedIn) {
      // Redirect signed-in users to the dashboard
      router.push("/admin/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);  // Add dependencies to avoid infinite loop

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-500 to-teal-500">
      {!isSignedIn ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <RedirectToSignIn />
        </div>
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  );
}
