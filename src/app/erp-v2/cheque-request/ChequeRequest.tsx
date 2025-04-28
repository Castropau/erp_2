"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { fetchChequesLists } from "@/api/cheque-request/fetchCheque";
import Link from "next/link";
import AddChequeRequest from "./_components/Modal/AddChequeRequest";

export default function ChequeRequest() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { isLoading, error, data } = useQuery({
    queryKey: ["cheque"],
    queryFn: fetchChequesLists,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      const serial = item.serial_no?.toLowerCase() || "";
      const instructions = item.special_instructions?.toLowerCase() || "";
      return (
        serial.includes(searchTerm.toLowerCase()) ||
        instructions.includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, data]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);

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
    return (
      <div className="text-center text-red-600 py-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className="p-6 bg-gray-400 rounded-md shadow-md dark:bg-gray-dark">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <label className="relative w-full max-w-sm">
          {/* Search Input */}
          <input
            type="search"
            className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-dark dark:text-white"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          {/* Search Icon (left) */}
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              ×
            </button>
          )} */}
        </label>
        <AddChequeRequest />
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-4 uppercase tracking-wide dark:text-white">
        Cheque Requests
      </h1>

      <div className="overflow-auto rounded-lg shadow-sm border border-gray-700 dark:bg-gray-dark">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2 font-semibold">Serial No</th>
              <th className="px-4 py-2 font-semibold">Purpose</th>
              <th className="px-4 py-2 font-semibold">Total</th>
              <th className="px-4 py-2 font-semibold">Requested By</th>
              <th className="px-4 py-2 font-semibold">Date Requested</th>
              <th className="px-4 py-2 font-semibold">Status</th>
              <th className="px-4 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-gray-500 py-4 dark:bg-gray-dark dark:text-white"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              currentRows.map((cheque, index) => (
                <tr
                  key={cheque.id}
                  className={`transition-colors duration-300 ease-in-out
    ${
      index % 2 === 0
        ? "bg-gray-50 dark:bg-gray-800"
        : "bg-white dark:bg-gray-900"
    }
    text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <td className="px-4 py-2">{cheque.serial_no}</td>
                  <td className="px-4 py-2">{cheque.purpose}</td>
                  <td className="px-4 py-2">₱{cheque.grand_total}</td>
                  <td className="px-4 py-2">{cheque.requested_by}</td>
                  <td className="px-4 py-2">{cheque.date_requested}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${
                        cheque.status ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {cheque.status ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link href={`/erp-v2/cheque-request/detail/${cheque.id}`}>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition text-xs">
                        View
                      </button>
                    </Link>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center gap-3 mt-6 text-sm">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
