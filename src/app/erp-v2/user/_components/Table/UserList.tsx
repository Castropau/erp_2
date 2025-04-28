"use client";

import { useQuery } from "@tanstack/react-query";
/**state */
import React, { useState, useMemo } from "react";

/** api */
import { fetchUserList } from "@/api/User/fetchUserList";

/** components */
const PersonalInformation = React.lazy(
  () => import("../Modal/PersonalInformation")
);
// import PersonalInformation from "../Modal/PersonalInformation";
import ModuleAccess from "../Modal/ModuleAccess";
import { FaCirclePlus } from "react-icons/fa6";
import CreateUser from "../Modal/CreateUser";

interface User {
  id: number; // id as an integer
  full_name: string; // full_name as a string
  department: string; // department as a string
  role: string;
  is_active: boolean;
  is_superuser: boolean;
}

export default function UserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { isLoading, error, data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUserList,
  });

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          {/* Loading Spinner */}
          <div className="w-16 h-16 border-4 border-t-4 border-gray-800 border-dashed rounded-full animate-spin"></div>

          <span className="text-lg text-gray-700">Please wait...</span>
        </div>
      </div>
    );
  }

  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  const filteredData = useMemo(() => {
    return data?.filter(
      (user) =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const totalPages = Math.ceil(filteredData!.length / rowsPerPage);

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

  return (
    <>
      <div className="p-6 bg-gray-400 rounded-lg shadow-md dark:bg-gray-700">
        {/* Information Text */}
        <div className="bg-gray-200 p-4 rounded-md mb-6 dark:bg-gray-400">
          <span className="text-sm text-gray-600 font-semibold">
            This page contains user information. You can{" "}
            <strong>EDIT your DETAILS</strong> by clicking on "Personal
            Information." The "Module Access" section controls permissions for
            CRUD operations (Create, Read, Update, Delete).
          </span>
        </div>

        {/* Search and Add User Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Search Input */}
          <label className="relative w-full max-w-sm">
            <input
              type="search"
              className="dark:text-white w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page to 1 on search
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

          {/* Add User Button */}
          <div className="ml-auto">
            <CreateUser />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-auto border border-gray-700 rounded-lg shadow-sm">
          <table className="min-w-full text-sm bg-white">
            <thead className="bg-gray-700 text-white dark:bg-gray-950">
              <tr>
                <th className="px-4 py-3 text-left">Full Name</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Active</th>
                <th className="px-4 py-3 text-center">Actions</th>
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
        ? "bg-gray-50 dark:bg-gray-600"
        : "bg-white dark:bg-gray-700"
    }
    text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-400`}
                  >
                    <td className="px-4 py-2">{user.full_name}</td>
                    <td className="px-4 py-2">{user.department}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`${
                          user.is_active
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        } py-1 px-3 rounded-full`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="inline-flex gap-2 items-center justify-center">
                        <PersonalInformation id={user.id} />
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
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-gray-800 transition"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-gray-800 transition"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-8">
        {/* Info Text */}
        <span className="text-sm text-gray-100 font-semibold p-2 rounded-md">
          This page displays user information. Currently, there are,
          <strong>123</strong> users in total, with <strong>123</strong> active
          users and <strong>123</strong> inactive users.
        </span>

        {/* Stats Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Active Users Card */}
          <div className="dark:bg-gray-900 bg-blue-50 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h4 className="text-lg font-medium text-blue-600">Active Users</h4>
            <p className="text-4xl font-bold text-blue-700">123</p>
          </div>

          {/* Inactive Users Card */}
          <div className="dark:bg-gray-900 bg-red-50 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h4 className="text-lg font-medium text-red-600">Inactive Users</h4>
            <p className="text-4xl font-bold text-red-700">123</p>
          </div>
        </div>
      </div>
    </>
  );
}
