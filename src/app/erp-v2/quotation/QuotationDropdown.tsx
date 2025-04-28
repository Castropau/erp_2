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
import Link from "next/link";
import AddCashRequest from "../cash-request/_components/Modal/AddCashRequest";
import AddQuotations from "./_components/Modal/AddQuotations";
import Config from "./_components/Modal/Config";
import View from "./_components/Modal/View";
import { fetchQuoList, Quatations } from "@/api/quotation/fetchQuo";
import { FaTrash } from "react-icons/fa6";

/** components */

// import PersonalInformation from "../Modal/PersonalInformation";

interface User {
  id: number; // id as an integer
  full_name: string; // full_name as a string
  department: string; // department as a string
  role: string;
  is_active: boolean;
  is_superuser: boolean;
}

export default function QuotationDropdown() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { isLoading, error, data } = useQuery<Quatations[]>({
    queryKey: ["quotations"],
    queryFn: fetchQuoList,
  });

  // const filteredData = useMemo(() => {
  //   return data?.filter(
  //     (user) =>
  //       user.quotation_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       user.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       user.client.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }, [searchTerm, data]);
  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((user) => {
      const serialNumber = user.quotation_no
        ? user.quotation_no.toLowerCase()
        : "";
      const instructions = user.project_name
        ? user.project_name.toLowerCase()
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
    <div className="p-6 bg-gray-400 rounded-md shadow-md dark:bg-gray-dark dark:text-white">
      <div className="flex items-center justify-between mb-4 gap-4">
        <label className="relative w-full max-w-sm">
          {/* Search Input */}
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

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              ×
            </button>
          )}
        </label>

        <div className="flex items-center gap-4">
          <AddQuotations />
          <Config />
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-4 uppercase tracking-wide dark:bg-gray-dark dark:text-white">
        Quotation
      </h1>
      <div className="overflow-auto rounded-lg shadow-sm border border-gray-700">
        <table className="table table-xs w-full border-t rounded-lg shadow-lg bg-white text-sm">
          <thead className="bg-gray-700 text-white">
            <tr className="text-white-600 text-sm font-medium">
              <th className="py-2 px-4 text-left text-sm font-medium">
                Quotation
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                Project
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">To</th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                Created by
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                Date created
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                Status
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
                  colSpan={7}
                  className="text-center text-gray-500 py-4 font-semi-bold"
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
                  <td className="text-xs">{user.quotation_no}</td>
                  <td className="text-xs">{user.project_name}</td>
                  <td className="text-xs">{user.client}</td>
                  <td className="text-xs">{user.created_by}</td>
                  <td className="text-xs">{user.date_created}</td>
                  <td className="text-xs">
                    <span
                      className={`${
                        user.status
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } py-1 px-3 rounded-full`}
                    >
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-xs flex gap-2">
                    {/* <PersonalInformation id={user.id} /> */}
                    <View id={user.id} />
                    {/* <ModuleAccess /> */}
                    <button
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs shadow transition duration-200"
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
                      <FaTrash /> Delete
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
