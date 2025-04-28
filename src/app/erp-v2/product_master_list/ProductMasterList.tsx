"use client";

import { useQuery } from "@tanstack/react-query";
/**state */
import React, { useState, useMemo } from "react";

/** api */
import { fetchUserList } from "@/api/User/fetchUserList";
import PersonalInformation from "../user/_components/Modal/PersonalInformation";
import ModuleAccess from "../user/_components/Modal/ModuleAccess";
import CreateUser from "../user/_components/Modal/CreateUser";
import AddLaborOfComputation from "../labor_of_computation/_compoments/Modal/AddLaborOfComputation";
import AddProduct from "./_components/Modal/AddProduct";
import EditProduct from "./_components/Modal/EditProduct";
import { Bom, fetchBomList } from "@/api/bom-quotation/fetchBom";
import { fetchItemList, Item } from "@/api/product_master_list/fetchItem";
import { FaTrash } from "react-icons/fa6";

/** components */

// import PersonalInformation from "../Modal/PersonalInformation";

export default function ProductMasterList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { isLoading, error, data } = useQuery<Item[]>({
    queryKey: ["item"],
    queryFn: fetchItemList,
  });

  //   if (isLoading) return <div>Loading...</div>;

  //   if (error instanceof Error)
  //     return <div>An error has occurred: {error.message}</div>;

  // const filteredData = useMemo(() => {
  //   return data?.filter(
  //     (user) =>
  //       user.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       user.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       user.item.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }, [searchTerm, data]);
  const filteredData = useMemo(() => {
    return data?.filter((user) => {
      const vendor = user.vendor?.toLowerCase() || "";
      const description = user.description?.toLowerCase() || "";
      const item = user.item?.toLowerCase() || "";
      const term = searchTerm.toLowerCase();

      return (
        vendor.includes(term) ||
        description.includes(term) ||
        item.includes(term)
      );
    });
  }, [searchTerm, data]);

  //   const totalPages = Math.ceil(filteredData!.length / rowsPerPage);
  const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  function setShowRegisterModal(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }
  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          {/* Loading Spinner */}
          <div className="dark:border-gray-200 dark:border-t-white border-dashed w-16 h-16 border-4 border-t-4 border-gray-800 border-dashed rounded-full animate-spin"></div>

          <span className="text-lg text-gray-700 dark:text-white">
            Please wait...
          </span>
        </div>
      </div>
    );
  }

  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-400 rounded-lg shadow-md dark:bg-gray-dark">
      {/* Search & Add */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search Input */}
        <label className="relative w-full max-w-sm">
          <input
            type="search"
            className="dark:text-white w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-600"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          {/* Search Icon */}
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>

          {/* {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )} */}
        </label>

        {/* Add Product Button */}
        <div className="ml-auto">
          <AddProduct />
        </div>
      </div>

      {/* Section Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 uppercase tracking-wide dark:text-white">
        Product List
      </h1>

      {/* Table */}
      <div className="overflow-auto border border-gray-700 rounded-md shadow-sm">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Item #</th>
              <th className="px-4 py-2 text-left">Item Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Supplier</th>
              <th className="px-4 py-2 text-left">Brand</th>
              <th className="px-4 py-2 text-left">Model</th>
              <th className="px-4 py-2 text-right">SRP</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-gray-500 py-4 dark:bg-gray-dark dark:text-white"
                >
                  No records found
                </td>
              </tr>
            ) : (
              currentRows?.map((user, index) => (
                <tr
                  key={user.id}
                  className={`transition-colors duration-300 ease-in-out
    ${
      index % 2 === 0
        ? "bg-gray-50 dark:bg-gray-800"
        : "bg-white dark:bg-gray-900"
    }
    text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <td className="px-4 py-2">{user.item_no}</td>
                  <td className="px-4 py-2">{user.item}</td>
                  <td className="px-4 py-2">{user.description}</td>
                  <td className="px-4 py-2">{user.vendor}</td>
                  <td className="px-4 py-2">{user.brand}</td>
                  <td className="px-4 py-2">{user.model}</td>
                  <td className="px-4 py-2 text-right">{user.srp}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="inline-flex items-center justify-center gap-2">
                      <EditProduct id={user.id} />
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition">
                        <FaTrash className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-3 mt-6 text-sm">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-maroon-700 text-white rounded-md hover:bg-maroon-800 disabled:bg-gray-500 transition"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-maroon-700 text-white rounded-md hover:bg-maroon-800 disabled:bg-gray-500 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
