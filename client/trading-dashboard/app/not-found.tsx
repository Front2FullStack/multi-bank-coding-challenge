"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const pathname = usePathname();

  // Log the error to the console for debugging purposes
  useEffect(() => {
    console.error(
      `404 Not Found: User attempted to access a non-existent route: ${pathname}`
    );
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center  bg-gray-900">
      <div className="mx-4 w-full max-w-md rounded-2xl  p-8 text-center shadow-xl bg-gray-800/60 dark:backdrop-blur-sm">
        <div className="mb-6 flex justify-center">
          <AlertTriangle
            aria-label="Warning: Page not found"
            className="h-16 w-16 text-yellow-500"
          />
        </div>

        <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-8xl font-extrabold text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold  text-gray-100">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <Home className="h-5 w-5" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
