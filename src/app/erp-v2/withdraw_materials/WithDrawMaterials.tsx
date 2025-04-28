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
import CreateMaterialRequest from "./add-material-request/CreateMaterialRequest";
import Link from "next/link";
import {
  fetchWithdrawList,
  Withdraw,
} from "@/api/withdraw-materials/fetchWithdraw";
import { FaCirclePlus, FaEye, FaTrash } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";

/** components */

// import PersonalInformation from "../Modal/PersonalInformation";

export default function WithDrawMaterials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { isLoading, error, data } = useQuery<Withdraw[]>({
    queryKey: ["withdraw"],
    queryFn: fetchWithdrawList,
  });

  const filteredData = useMemo(() => {
    return data?.filter(
      (user) =>
        user.serial_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="p-6 bg-gray-400 rounded-md shadow-md dark:bg-gray-dark">
      <div className="flex items-center justify-between mb-4 gap-4">
        <label className="relative w-full max-w-sm">
          {/* Search Input */}
          <input
            type="search"
            className="dark:text-white w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
        </label>

        <div className="ml-auto">
          {/* <CreateMaterialRequest /> */}
          <Link href="/erp-v2/withdraw_materials/add-material-request">
            <button className="btn btn-info">
              <FaPlusCircle className="w-6 h-6 btn-info" />
              Add Material Request
            </button>
          </Link>
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 uppercase tracking-wide dark:text-white">
        Withdraw Materials
      </h1>
      <div className="overflow-auto rounded-lg shadow-sm border border-gray-700">
        <table className="table table-xs w-full border-t rounded-lg shadow-lg bg-white dark:bg-gray-dark text-sm">
          <thead className="bg-gray-700 text-white">
            <tr className="text-white-600 text-sm font-medium">
              <th className="py-2 px-4 text-left text-sm font-medium">
                Serial #
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                Purpose
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                Status
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                Date Needed
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                Requested by
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                Actions
              </th>
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
                  className={`transition-colors duration-300 ease-in-out
    ${
      index % 2 === 0
        ? "bg-gray-50 dark:bg-gray-800"
        : "bg-white dark:bg-gray-900"
    }
    text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <td className="text-xs">{user.serial_no}</td>
                  <td className="text-xs">{user.purpose}</td>
                  <td className="text-xs">{user.status}</td>
                  <td className="text-xs">{user.date_needed}</td>
                  <td className="text-xs">
                    {user.name_of_requestor.full_name}
                  </td>
                  <td className="text-xs px-4 py-2">
                    <div className="flex items-center gap-2">
                      {/* View Button */}
                      <Link
                        href={`/erp-v2/withdraw_materials/view/${user.id}`}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm shadow transition"
                      >
                        <FaEye className="w-4 h-4" />
                        View
                      </Link>

                      {/* Delete Button */}
                      <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm shadow transition">
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
