// pages/sign-in.tsx
"use client";

import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SignInPage() {
  const {  isLoaded, isSignedIn } = useUser(); // Use Clerk's hook to access user data
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // If the user is already signed in, redirect to the admin dashboard
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-300 to-pink-500">
      {!isSignedIn && (
        <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 w-full max-w-md">
          <h2 className="text-3xl text-center font-semibold text-gray-800">Sign In</h2>
          <SignIn path="/sign-in" routing="path" fallbackRedirectUrl="/" />
        </div>
      )}
    </div>
  );
}
