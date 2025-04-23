"use client";

import { useQuery } from "@tanstack/react-query";
/** state */
import React, { useState, useMemo } from "react";

/** api */
import { fetchBomList } from "@/api/bill_of_materials/fetchBill";
import AddLaborOfComputation from "../labor_of_computation/_compoments/Modal/AddLaborOfComputation";
import PersonalInformation from "../user/_components/Modal/PersonalInformation";
import ModuleAccess from "../user/_components/Modal/ModuleAccess";

/** interfaces */
import { Bom } from "@/api/bom-quotation/fetchBom";
import EditBom from "./_components/Modal/EditBom";
import { fetchUserLists } from "@/api/bill_of_materials/fetchUsers";
import AddBom from "./_components/Modal/AddBom";

export default function BillOfMaterials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch BOM list
  const { isLoading, error, data } = useQuery<Bom[]>({
    queryKey: ["bom"],
    queryFn: fetchBomList,
  });

  // Filter data based on search term
  const filteredData = useMemo(() => {
    return data?.filter(
      (bom) =>
        bom.bom_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bom.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  // Pagination
  // const totalPages = Math.ceil(filteredData!.length / rowsPerPage);
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
          <AddBom />
        </div>
      </div>

      <table className="table table-xs table-zebra w-full">
        <thead>
          <tr className="text-blue-500">
            <th>BOM No</th>
            <th>Project Name</th>
            <th>Client</th>
            <th>Date</th>
            <th>Prepared By</th>
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
            currentRows?.map((bom, index) => (
              <tr
                key={bom.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="text-xs">{bom.bom_no}</td>
                <td className="text-xs">{bom.project_name}</td>
                <td className="text-xs">{bom.client}</td>

                <td className="text-xs">{bom.date_created}</td>
                {/* Replace with actual date */}
                <td className="text-xs">{bom.created_by}</td>
                {/* Replace with actual prepared by info */}
                <td className="text-xs">
                  <span
                    className={`${
                      bom.status === "Approved To Be Revised"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    } py-1 px-3 rounded-full`}
                  >
                    {bom.status === "Approved To Be Revised"
                      ? "Approved To Be Revised"
                      : "Pending"}
                  </span>
                </td>

                <td className="text-xs flex gap-2">
                  <EditBom id={bom.id} />
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
  );
}
