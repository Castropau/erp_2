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

    return data.filter((user) => {
      const serialNumber = user.serial_no ? user.serial_no.toLowerCase() : "";
      const instructions = user.special_instructions
        ? user.special_instructions.toLowerCase()
        : "";
      return (
        serialNumber.includes(searchTerm.toLowerCase()) ||
        instructions.includes(searchTerm.toLowerCase())
      );
    });
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
  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between mb-4 gap-250">
        <label className="input flex-grow w-2/3">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="w-120" // Ensures the input takes up the specified width
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value); // Update search term
              setCurrentPage(1); // Reset the page to 1 whenever the search term changes
            }}
          />
        </label>

        <div className="ml-auto">
          <AddChequeRequest />
        </div>
      </div>
      <h1>Cheque Request</h1>
      <table className="table table-xs table-zebra w-full">
        <thead>
          <tr className="text-blue-500">
            <th>Serial No</th>
            <th>Purpose</th>
            <th>Total</th>
            <th>Requested By</th>
            <th>Date Requested</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-4">
                No records found
              </td>
            </tr>
          ) : (
            currentRows?.map((cheque, index) => (
              <tr
                key={cheque.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="text-xs">{cheque.serial_no}</td>
                <td className="text-xs">{cheque.purpose}</td>
                <td className="text-xs">{cheque.grand_total}</td>
                <td className="text-xs">{cheque.requested_by}</td>
                <td className="text-xs">{cheque.date_requested}</td>
                <td className="text-xs">
                  <span
                    className={`${
                      cheque.status
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    } py-1 px-3 rounded-full`}
                  >
                    {cheque.status ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="text-xs flex gap-2">
                  <Link href={`/erp-v2/cheque-request/detail/${cheque.id}`}>
                    <button className="btn btn-info">View</button>
                  </Link>
                  <button className="btn btn-error">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          onClick={handlePrev}
          className="btn bg-blue-500 text-xs text-white hover:bg-blue-600 disabled:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xs mr-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          className="btn bg-blue-500 text-xs text-white hover:bg-blue-600 disabled:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
