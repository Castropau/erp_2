import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex justify-center ">
      <table className="table table-xs table-zebra w-full dark:bg-gray-700">
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-gray-100 dark:bg-gray-600"
                  : "bg-white dark:bg-gray-800"
              }
            >
              <td className="text-xs dark:bg-gray-500">
                <div className="skeleton w-16 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              </td>
              <td className="text-xs dark:bg-gray-500">
                <div className="skeleton w-24 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              </td>
              <td className="text-xs dark:bg-gray-500">
                <div className="skeleton w-20 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              </td>
              <td className="text-xs dark:bg-gray-500">
                <div className="skeleton w-24 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              </td>
              <td className="text-xs dark:bg-gray-500">
                <div className="skeleton w-20 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              </td>
              <td className="text-xs dark:bg-gray-500">
                <div className="skeleton w-16 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              </td>
              <td className="text-xs dark:bg-gray-500">
                <div className="skeleton w-24 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingPage;
