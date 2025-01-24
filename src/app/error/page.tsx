"use client";
import { useError } from "@/contexts/ErrorContext";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const { errorMessage } = useError();
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center max-w-lg p-6 bg-white shadow-md rounded-md">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-lg text-gray-700">
          {errorMessage || "Something went wrong."}
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
