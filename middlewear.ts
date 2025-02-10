import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // Optionally, configure paths for public routes
  // This property is not used in the latest versions of Clerk.
  // Instead, you can handle public routes differently as needed.
  // For example, you can check paths manually using `next` middleware.
});

export const config = {
  matcher: ['/admin/dashboard*'],  // Adjust this according to your requirements
};
