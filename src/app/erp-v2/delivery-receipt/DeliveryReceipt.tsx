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
import AddDeliveryReceipt from "./_components/Modal/AddDeliveryReceipt";
import ViewDeliveryReceipt from "./_components/ViewDeliveryReceipt";
import {
  Delivery,
  fetchDeliveryList,
} from "@/api/delivery_receipt/fetchDelivery";
import { fetchReceiptById } from "@/api/delivery_receipt/fetchReceipt";

/** components */

// import PersonalInformation from "../Modal/PersonalInformation";

interface Receipt {
  id: number; // id as an integer
}

export default function DeliveryReceipt(props: Receipt) {
  const { id } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { isLoading, error, data } = useQuery<Delivery[]>({
    queryKey: ["delivery"],
    queryFn: fetchDeliveryList,
  });

  const {
    data: ReceiptData,
    isLoading: Rloading,
    isError,
    error: rerror,
  } = useQuery({
    queryKey: ["quotation", id],
    queryFn: () => fetchReceiptById(id),
    enabled: !!id,
  });

  //   if (isLoading) return <div>Loading...</div>;

  //   if (error instanceof Error)
  //     return <div>An error has occurred: {error.message}</div>;

  const filteredData = useMemo(() => {
    return data?.filter(
      (user) =>
        user.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.delivered_to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase())
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
  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="overflow-x-auto">
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
          <AddDeliveryReceipt />
        </div>
      </div>
      <h1>Deliver receipt</h1>
      <table className="table table-xs table-zebra w-full">
        <thead>
          <tr className="text-blue-500">
            <th>Date</th>
            <th>Delivered to</th>
            <th>address</th>
            <th>PO no</th>
            <th>OR no.</th>
            <th>actions</th>
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
                <td className="text-xs">{user.date}</td>
                <td className="text-xs">{user.delivered_to}</td>
                <td className="text-xs">{user.address}</td>
                <td className="text-xs">{user.po_no}</td>
                <td className="text-xs">{user.or_no}</td>

                <td className="text-xs flex gap-2">
                  {/* <PersonalInformation id={user.id} /> */}
                  <ViewDeliveryReceipt id={user.id} />
                  {/* <ModuleAccess /> */}
                  <button className="btn btn-error">delete</button>
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
