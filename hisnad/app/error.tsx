'use client';

import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <div className="animate-scale-in">
          <FaExclamationTriangle className="mx-auto h-16 w-16 text-red-500" />
        </div>

        <div className="animate-fade-in-up space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Something went wrong!
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            We apologize for the inconvenience. Please try again or contact our
            support team for assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <form action={reset}>
              <button
                type="submit"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </form>

            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-white text-primary border border-primary rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
