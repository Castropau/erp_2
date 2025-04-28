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
import { Bom, fetchBomList } from "@/api/bom-quotation/fetchBom";
import AddQuotations from "../quotation/_components/Modal/AddQuotations";
import View from "./Modal/View";
import { FaTrash } from "react-icons/fa6";

/** components */

// import PersonalInformation from "../Modal/PersonalInformation";

export default function BomQuotation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { isLoading, error, data } = useQuery<Bom[]>({
    queryKey: ["bom"],
    queryFn: fetchBomList,
  });

  const filteredData = useMemo(() => {
    return data?.filter(
      (user) =>
        user.bom_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.client.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
      <div className="flex justify-center ">
        <table className="table table-xs table-zebra w-full">
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="text-xs">
                  <div className="skeleton w-16 h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="text-xs">
                  <div className="skeleton w-24 h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="text-xs">
                  <div className="skeleton w-20 h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="text-xs">
                  <div className="skeleton w-24 h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="text-xs">
                  <div className="skeleton w-20 h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="text-xs">
                  <div className="skeleton w-16 h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="text-xs">
                  <div className="skeleton w-24 h-4 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-400 rounded-lg shadow-md dark:bg-gray-dark">
      {/* Search + Add Button Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <label className="relative w-full max-w-sm">
          <input
            type="search"
            className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 dark:text-white"
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

          {/* Clear Button */}
        </label>

        <div className="ml-auto">
          <AddQuotations />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wider dark:text-white">
        BOM Quotation
      </h1>

      {/* Table Section */}
      <div className="overflow-auto rounded-lg border border-gray-400 shadow-sm">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Active</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 py-4 dark:bg-gray-dark dark:text-white"
                >
                  No records found
                </td>
              </tr>
            ) : (
              currentRows?.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-300 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  } text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <td className="px-4 py-2">{user.bom_no}</td>
                  <td className="px-4 py-2">{user.project_name}</td>
                  <td className="px-4 py-2">{user.client}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <View id={user.id} />
                    {/* <ModuleAccess /> */}
                    <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs shadow transition duration-200">
                      <FaTrash /> delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 gap-2 text-sm">
        <button
          onClick={handlePrev}
          className="px-4 py-1.5 bg-gray-700 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-1.5 bg-gray-700 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
