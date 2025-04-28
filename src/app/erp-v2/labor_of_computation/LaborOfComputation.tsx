"use client";

import { useQuery } from "@tanstack/react-query";
/**state */
import React, { useState, useMemo } from "react";

/** api */

import PersonalInformation from "../user/_components/Modal/PersonalInformation";
import ModuleAccess from "../user/_components/Modal/ModuleAccess";
import AddLaborOfComputation from "./_compoments/Modal/AddLaborOfComputation";
import {
  FetchLaborComputation,
  LaborComputation,
} from "@/api/labor_of_computation/LaborOfComputations";
import EditLabor from "./_compoments/Modal/EditLabor";

/** components */

// import PersonalInformation from "../Modal/PersonalInformation";

export default function LaborOfComputation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { isLoading, error, data } = useQuery<LaborComputation[]>({
    queryKey: ["labor"],
    queryFn: FetchLaborComputation,
  });

  const filteredData = useMemo(() => {
    return data?.filter(
      (labor) =>
        labor.lc_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        labor.bom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        labor.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        labor.project_duration
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        labor.system.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

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

  // if (isLoading) return <div>Loading...</div>;
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
      {/* Top Section: Search + Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search Input */}
        <label className="relative w-full max-w-sm dark:text-white">
          <input
            type="search"
            className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          {/* Search Icon */}
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
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
        </label>

        {/* Add Button */}
        <div className="ml-auto">
          <AddLaborOfComputation />
        </div>
      </div>

      {/* Table */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 uppercase tracking-wide dark:text-white">
        Labor of Computation
      </h1>
      <div className="overflow-auto border border-gray-700 rounded-lg shadow-sm">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Labor No</th>
              <th className="px-4 py-3 text-left">BOM</th>
              <th className="px-4 py-3 text-left">Project Name</th>
              <th className="px-4 py-3 text-left">System</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 py-6 dark:bg-gray-dark dark:text-white"
                >
                  No records found
                </td>
              </tr>
            ) : (
              currentRows?.map((labor, index) => (
                <tr
                  key={labor.id}
                  className={`transition-colors duration-300 ease-in-out
    ${
      index % 2 === 0
        ? "bg-gray-50 dark:bg-gray-800"
        : "bg-white dark:bg-gray-900"
    }
    text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <td className="px-4 py-2">{labor.lc_no}</td>
                  <td className="px-4 py-2">{labor.bom}</td>
                  <td className="px-4 py-2">{labor.project_name}</td>
                  <td className="px-4 py-2">{labor.system}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="inline-flex gap-2 items-center justify-center">
                      <EditLabor id={labor.id} />
                      <ModuleAccess />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-6 gap-3 text-sm">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-800 transition"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-800 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
