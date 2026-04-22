import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      
      <h1 className="text-6xl font-bold text-gray-800">
        404
      </h1>

      <p className="text-xl text-gray-600 mt-2">
        Page not found
      </p>

      <p className="text-gray-500 mt-2">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}