"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/**state */
import React, { useState, useMemo } from "react";

/** api */
import { fetchUserList } from "@/api/User/fetchUserList";
import PersonalInformation from "../user/_components/Modal/PersonalInformation";
import ModuleAccess from "../user/_components/Modal/ModuleAccess";
import CreateUser from "../user/_components/Modal/CreateUser";
import AddLaborOfComputation from "../labor_of_computation/_compoments/Modal/AddLaborOfComputation";
import AddCashRequest from "./_components/Modal/AddCashRequest";
import Link from "next/link";
import {
  fetchCashRequest,
  RequisitionCash,
} from "@/api/cash-request/fetchCashRequest";
import EditCashRequest from "./_components/Modal/EditCashRequest";
import { DeleteCash, deleteCashRequest } from "@/api/cash-request/deleteCash";
import { FaTrash } from "react-icons/fa6";

/** components */

// import PersonalInformation from "../Modal/PersonalInformation";

export default function CashRequest() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { isLoading, error, data } = useQuery<RequisitionCash[]>({
    queryKey: ["cash"],
    queryFn: fetchCashRequest,
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
  const queryClient = useQueryClient();
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

  const { mutate: deleteCash } = useMutation({
    mutationFn: (id: number) => deleteCashRequest(id),
    onSuccess: () => {
      console.log("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cash"] });
    },
    onError: (error) => {
      console.error("Error deleting cash:", error);
    },
  });

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
    <div className="overflow-x-auto ">
      <div className="flex items-center justify-between mb-4 gap-4">
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

        <div className="flex items-center gap-4">
          <Link href="/erp-v2/cash-request/requisition-list">
            <button className="btn btn-info">Selection Config</button>
          </Link>
          <AddCashRequest />
        </div>
      </div>

      <h1 className="text-2xl font-semibold mb-4">Cash Requests</h1>
      <table className="table table-xs w-full border-t border-gray-200 bg-white rounded-lg shadow-lg">
        <thead className="bg-gray-500 text-white">
          <tr className="text-white-600 text-sm font-medium">
            <th className="px-4 py-2">Serial #</th>
            <th className="px-4 py-2">Instruction</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Requested by</th>
            <th className="px-4 py-2">Date Requested</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-4">
                No records found
              </td>
            </tr>
          ) : (
            currentRows?.map((user, index) => (
              <tr
                key={user.id}
                className={`transition duration-300 ease-in-out ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="text-xs">{user.serial_no}</td>
                <td className="text-xs">{user.special_instructions}</td>
                <td className="text-xs">{user.grand_total}</td>
                <td className="text-xs">{user.requested_by}</td>
                <td className="text-xs">{user.date_requested}</td>
                <td className="text-xs">
                  <span
                    className={`${
                      user.status
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    } py-1 px-3 rounded-full`}
                  >
                    {user.status ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="text-xs flex gap-2">
                  {/* <PersonalInformation id={user.id} /> */}
                  <EditCashRequest id={user.id} />
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to delete this cash request?"
                        )
                      ) {
                        deleteCash(user.id);
                      }
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          onClick={handlePrev}
          className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm mr-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
