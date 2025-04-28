"use client";
import React, { useState } from "react";

/** api */
import { ChequeItems } from "@/api/cheque-request/fetchItems";
import { ChequeUnits } from "@/api/cheque-request/fetchUnits";
import { updateItems, UpdateItems } from "@/api/cheque-request/UpdateItem";
import {
  updateLocation,
  UpdateLocation,
} from "@/api/cheque-request/UpdateLocation";
import { deleteItem } from "@/api/cheque-request/DeleteItem";
import { deleteLocation } from "@/api/cheque-request/DeleteLocation";

/** components */

import AddUnit from "../../cheque-request/_components/Modal/AddUnit";

/** query */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import AddItem from "../../cheque-request/_components/Modal/AddItem";
import { IoMdArrowBack } from "react-icons/io";

interface PageProps {}

function Page(props: PageProps) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermLocation, setSearchTermLocation] = useState("");
  const [currentPageItems, setCurrentPageItems] = useState(1);
  const [currentPageUnits, setCurrentPageUnits] = useState(1);
  const rowsPerPage = 10;

  const {
    isLoading: isItemsLoading,
    error: itemsError,
    data: itemsData,
  } = useQuery({
    queryKey: ["items"],
    queryFn: ChequeItems,
  });

  const {
    isLoading: isUnitsLoading,
    error: UnitsError,
    data: unitsData,
  } = useQuery({
    queryKey: ["units"],
    queryFn: ChequeUnits,
  });

  const totalPagesItems = Math.ceil((itemsData?.length || 0) / rowsPerPage);
  const totalPagesUnits = Math.ceil((unitsData?.length || 0) / rowsPerPage);

  const filteredItemsData = itemsData?.filter((item) =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUnitsData = unitsData?.filter((location) =>
    location.unit_of_measurement
      .toLowerCase()
      .includes(searchTermLocation.toLowerCase())
  );

  const indexOfLastRowItems = currentPageItems * rowsPerPage;
  const indexOfFirstRowItems = indexOfLastRowItems - rowsPerPage;
  const currentItemsRows = filteredItemsData?.slice(
    indexOfFirstRowItems,
    indexOfLastRowItems
  );

  const indexOfLastRowUnits = currentPageUnits * rowsPerPage;
  const indexOfFirstRowUnits = indexOfLastRowUnits - rowsPerPage;
  const currentUnitsRows = filteredUnitsData?.slice(
    indexOfFirstRowUnits,
    indexOfLastRowUnits
  );

  const handlePrevItems = () => {
    if (currentPageItems > 1) setCurrentPageItems(currentPageItems - 1);
  };

  const handleNextItems = () => {
    if (currentPageItems < totalPagesItems)
      setCurrentPageItems(currentPageItems + 1);
  };

  const handlePrevUnits = () => {
    if (currentPageUnits > 1) setCurrentPageUnits(currentPageUnits - 1);
  };

  const handleNextUnits = () => {
    if (currentPageUnits < totalPagesUnits)
      setCurrentPageUnits(currentPageUnits + 1);
  };

  // update item mutation
  const { mutate: updatedItem } = useMutation({
    mutationFn: (data: UpdateItems) => updateItems(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setIsItemModalOpen(false);
    },
  });

  // update location mutation
  const { mutate: updateLoc } = useMutation({
    mutationFn: (data: UpdateLocation) => updateLocation(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      setIsLocationModalOpen(false);
    },
  });

  // delete item mutation
  const { mutate: deleteItemMutation } = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  // delete location mutation
  const { mutate: deleteLocationMutation } = useMutation({
    mutationFn: (id: number) => deleteLocation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });

  return (
    <div className="p-4 sm:ml-64">
      <div className="ml-auto">
        <Link href="/erp-v2/cash-request">
          <button className="btn btn-info">
            <IoMdArrowBack />
            Back to Cash Request
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Item Table */}
        <div className="p-4 rounded-lg shadow-md bg-gray-600">
          <AddItem />
          {isItemsLoading ? (
            <div>Loading items...</div>
          ) : (
            <>
              <label className="relative w-full max-w-sm">
                {/* Search Input */}
                <input
                  type="search"
                  className="text-white w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Search item"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
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
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="text-blue-500">
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItemsRows?.map((item) => (
                    <tr key={item.id} className="border-b text-white">
                      <td className="p-2">{item.item}</td>
                      <td className="p-2">
                        <button
                          className="btn btn-primary mr-2"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsItemModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md"
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              "Are you sure you want to delete this item?"
                            );
                            if (confirmDelete) deleteItemMutation(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end items-center mt-4 gap-2">
                <button
                  onClick={handlePrevItems}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
                  disabled={currentPageItems === 1}
                >
                  Previous
                </button>
                <span className="text-xs mr-2">
                  Page {currentPageItems} of {totalPagesItems}
                </span>
                <button
                  onClick={handleNextItems}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
                  disabled={currentPageItems === totalPagesItems}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        {/* Location Table */}
        <div className="bg-gray-600 p-4 rounded-lg shadow-md">
          <AddUnit />
          {isUnitsLoading ? (
            <div>Loading locations...</div>
          ) : (
            <>
              <label className="relative w-full max-w-sm">
                {/* Search Input */}
                <input
                  type="search"
                  className="text-white w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Search location"
                  value={searchTermLocation}
                  onChange={(e) => {
                    setSearchTermLocation(e.target.value);
                    setCurrentPageUnits(1);
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
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="text-blue-500">
                    <th className="p-2 text-left">Location</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUnitsRows?.map((location) => (
                    <tr key={location.id} className="border-b text-white">
                      <td className="p-2">{location.unit_of_measurement}</td>
                      <td className="p-2">
                        <button
                          className="btn btn-primary mr-2"
                          onClick={() => {
                            setSelectedLocation(location);
                            setIsLocationModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md"
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              "Are you sure you want to delete this location?"
                            );
                            if (confirmDelete)
                              deleteLocationMutation(location.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end items-center mt-4 gap-2">
                <button
                  onClick={handlePrevUnits}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
                  disabled={currentPageUnits === 1}
                >
                  Previous
                </button>
                <span className="text-xs mr-2">
                  Page {currentPageUnits} of {totalPagesUnits}
                </span>
                <button
                  onClick={handleNextUnits}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
                  disabled={currentPageUnits === totalPagesUnits}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal for editing items */}
      {isItemModalOpen && selectedItem && (
        <div className="fixed inset-0 flex justify-center items-center ">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Edit Item</h3>
            <Formik
              initialValues={{
                item: selectedItem.item || "",
              }}
              onSubmit={(values) => {
                updatedItem({ id: selectedItem.id, item: values.item });
              }}
            >
              <Form>
                <div className="mb-4">
                  <label htmlFor="item" className="block text-sm font-medium">
                    Item Name
                  </label>
                  <Field
                    type="text"
                    id="item"
                    name="item"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsItemModalOpen(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      {/* Modal for editing locations */}
      {isLocationModalOpen && selectedLocation && (
        <div className="fixed inset-0 flex justify-center items-center ">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Edit Location</h3>
            <Formik
              initialValues={{
                unit_of_measurement: selectedLocation.unit_of_measurement || "",
              }}
              onSubmit={(values) => {
                updateLoc({
                  id: selectedLocation.id,
                  unit_of_measurement: values.unit_of_measurement,
                });
              }}
            >
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="unit_of_measurement"
                    className="block text-sm font-medium"
                  >
                    Location Name
                  </label>
                  <Field
                    type="text"
                    id="unit_of_measurement"
                    name="unit_of_measurement"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsLocationModalOpen(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
