// LoadingModal.tsx
import React from "react";

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-medium text-gray-700 dark:text-white">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;
