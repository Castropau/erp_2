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

  if (isLoading) return <div>Loading...</div>;

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
      <div className="overflow-x-auto">
        <span className="text-sm text-gray-600 font-semibold p-2 rounded-md">
          This page contains user information. You can EDIT your DETAILS by
          clicking on "Personal Information." The "Module Access" section
          controls permissions for CRUD operations (Create, Read, Update,
          Delete).
        </span>

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
            <CreateUser />
          </div>
        </div>

        <table className="table table-xs table-zebra w-full">
          <thead>
            <tr className="text-blue-500">
              <th>Full Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Active</th>
              <th>Actions</th>
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
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="text-xs">{user.full_name}</td>
                  <td className="text-xs">{user.department}</td>
                  <td className="text-xs">{user.role}</td>
                  <td className="text-xs">
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
                  <td className="text-xs flex gap-2">
                    <PersonalInformation id={user.id} />
                    <ModuleAccess />
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
      <div className="mt-8">
        <span className="text-sm text-gray-600 font-semibold p-2 rounded-md">
          This page displays user information. Currently, there are{" "}
          <strong>123</strong> users in total, with <strong>123</strong> active
          users and <strong>123</strong> inactive users.
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[120px]">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-medium">Active Users</h4>
            <p className="text-2xl font-bold">123</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-medium">Inactive Users</h4>
            <p className="text-2xl font-bold">123</p>
          </div>
        </div>
      </div>
    </>
  );
}
