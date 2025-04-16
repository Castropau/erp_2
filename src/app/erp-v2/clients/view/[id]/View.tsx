"use client";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChequeItems } from "@/api/cheque-request/fetchItems";
import { ChequeUnits } from "@/api/cheque-request/fetchUnits";
import { UpdateItems, updateItems } from "@/api/cheque-request/UpdateItem";
import {
  updateLocation,
  UpdateLocation,
} from "@/api/cheque-request/UpdateLocation";
import { deleteItem } from "@/api/cheque-request/DeleteItem";
import { deleteLocation } from "@/api/cheque-request/DeleteLocation";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
// import ViewClients from "../../_components/Modal/ViewClients";
import { useParams } from "next/navigation";
import { fetchClientDataById } from "@/api/clients/fetchClientsView";
import ViewClients from "../../_components/Modal/ViewClients";
import { updateClient, UpdateClient } from "@/api/clients/updateClient";
import ViewQuo from "../../_components/ViewQuo";

function View() {
  const [isEditable, setIsEditable] = useState(false); // State to toggle between edit and view mode
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermLocation, setSearchTermLocation] = useState("");
  const [currentPageItems, setCurrentPageItems] = useState(1);
  const [currentPageUnits, setCurrentPageUnits] = useState(1);

  const params = useParams();
  const id = Number(params?.id);

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };
  const handleCancel = () => {
    setIsEditable(false); // Switch back to readonly mode without saving
  };
  const queryClient = useQueryClient();

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
    data: VendorData,
    isLoading: isCLoading,
    isError: cerror,
    error: cerrors,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: () => fetchClientDataById(id),

    enabled: !!id,
  });
  const {
    isLoading: isUnitsLoading,
    error: UnitsError,
    data: unitsData,
  } = useQuery({
    queryKey: ["units"],
    queryFn: ChequeUnits,
  });
  const { mutate: updateClients } = useMutation({
    mutationFn: (data: UpdateClient) => updateClient(VendorData!.id, data),
    onSuccess: () => {
      console.log("vendor updated successfully");

      queryClient.invalidateQueries({ queryKey: ["client", id] });
      queryClient.invalidateQueries({ queryKey: ["client"] });
      setShowEditModal(false);
    },
    onError: (error) => {
      console.error("Error updating cheque:", error);
    },
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
    <>
      <div className="ml-auto">
        <Link href="/erp-v2/clients">
          <button className="btn btn-info">
            <IoMdArrowBack />
            Back to Clients
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex justify-between items-center">
            Personal Information
            <div className="flex space-x-2">
              {!isEditable ? (
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Edits
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          </h2>

          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
          </div>

          <Formik
            initialValues={{
              client: VendorData?.client || "",
              address: VendorData?.address || "",
              contact_person: VendorData?.contact_person || "",
              position: VendorData?.position || "",
              contact_number: VendorData?.contact_number || "",
              email: VendorData?.email || "",
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              console.log(values);
              updateClients(values); // Handle form submission by calling the mutation
            }}
          >
            <Form className="space-y-6 md:space-y-8">
              <div style={{ color: "red" }}>
                {/* Display error messages here if needed */}
              </div>

              {/* Input Fields */}
              {[
                {
                  type: "text",
                  name: "client",
                  placeholder: "Vendor",
                  label: "client",
                },
                {
                  type: "text",
                  name: "address",
                  placeholder: "Contact",
                  label: "address",
                },
                {
                  type: "text",
                  name: "contact_person",
                  placeholder: "Enter email",
                  label: "contact_person",
                },
                {
                  type: "text",
                  name: "position",
                  placeholder: "Enter address",
                  label: "position",
                },
                {
                  type: "text",
                  name: "contact_number",
                  placeholder: "Enter address",
                  label: "contact_number",
                },

                {
                  type: "email",
                  name: "email",
                  placeholder: "Enter description",
                  label: "email",
                },
              ].map((item) => (
                <div key={item.name} className="space-y-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </label>
                  {item.type === "select" ? (
                    <Field
                      as="select"
                      name={item.name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={!isEditable}
                    >
                      <option value="">Select {item.label}</option>
                      {item.options?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                  ) : (
                    <Field
                      type={item.type}
                      id={item.name}
                      name={item.name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={item.placeholder}
                      readOnly={!isEditable} // Conditionally disable input based on isEditable state
                    />
                  )}
                </div>
              ))}

              {/* Submit Button */}
              {isEditable && (
                <div className="modal-action">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                  >
                    Update
                  </button>
                </div>
              )}
            </Form>
          </Formik>
        </div>

        {/* Second Column: Table */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* <AddUnit /> */}
          {isUnitsLoading ? (
            <div>Loading locations...</div>
          ) : (
            <>
              <input
                type="search"
                className="w-120 mb-4 p-2 border rounded"
                placeholder="Search"
                value={searchTermLocation}
                onChange={(e) => {
                  setSearchTermLocation(e.target.value);
                  setCurrentPageUnits(1);
                }}
              />
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="text-blue-500">
                    <th className="p-2 text-left">Quotation #</th>
                    <th className="p-2 text-left">Product Name</th>

                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {VendorData?.quotations?.map((quotation) => (
                    <tr key={quotation.id} className="border-b">
                      <td className="p-2">{quotation.quotation_no}</td>
                      <td className="p-2">{quotation.project_name}</td>
                      <td className="p-2">
                        {/* <button
                          //   onClick={() => handleViewQuotation(quotation.id)}
                          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                          View
                        </button> */}
                        <ViewQuo id={quotation.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end items-center mt-4 gap-2">
                <button
                  onClick={handlePrevUnits}
                  className="btn bg-blue-500 text-xs text-white hover:bg-blue-600 disabled:bg-gray-300"
                  disabled={currentPageUnits === 1}
                >
                  Previous
                </button>
                <span className="text-xs mr-2">
                  Page {currentPageUnits} of {totalPagesUnits}
                </span>
                <button
                  onClick={handleNextUnits}
                  className="btn bg-blue-500 text-xs text-white hover:bg-blue-600 disabled:bg-gray-300"
                  disabled={currentPageUnits === totalPagesUnits}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default View;
