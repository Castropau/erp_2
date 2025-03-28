"use client";

import React, { useState } from "react";
import { CiCirclePlus, CiEdit } from "react-icons/ci"; // Import the Edit icon
import { Field, Form, Formik, FieldArray } from "formik";

/** api */
import { CreateCategory } from "@/api/inventory/CreateCategory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/** interfaces */
import { fetchDepartmentsList } from "@/api/User/fetchDepartmentList";
import { fetchUserList } from "@/api/User/fetchUserList";
import { FaBan, FaEye, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function ViewDeliveryReceipt() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const queryClient = useQueryClient();

  const {
    mutate: registerCategory,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: CreateCategory) => CreateCategory(data),
    onSuccess: () => {
      console.log("category registered successfully");
      queryClient.invalidateQueries({ queryKey: ["category"] });
      setShowRegisterModal(false);
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
    },
  });

  // Fetch project data based on dropdown selection
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchDepartmentsList, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });

  // Fetch user list for 'remittedBy' dropdown
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserList, // Assume fetchUserList is an API call to fetch users
  });

  // Handle form submission
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const [rows, setRows] = useState([{ no: 1, quantity: "", description: "" }]);

  const handleAddRow = () => {
    setRows([...rows, { no: rows.length + 1, quantity: "", description: "" }]);
  };

  const handleRemoveRow = (index: any) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  return (
    <>
      <div className="flex justify-start">
        <button
          className="btn btn-info"
          onClick={() => setShowRegisterModal(true)}
        >
          <FaEye className="w-6 h-6 btn-info" />
          View
        </button>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-7xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Warehouse Released</h3>
              {/* Toggle between CiEdit and CiCircleBan based on editability */}
              {isEditable ? (
                <FaBan
                  onClick={() => setIsEditable(false)} // Switch to readonly mode
                  className="w-6 h-6 cursor-pointer"
                />
              ) : (
                <CiEdit
                  onClick={() => setIsEditable(true)} // Switch to editable mode
                  className="w-6 h-6 cursor-pointer"
                />
              )}
            </div>

            <Formik
              initialValues={{
                projectName: "",
                projectDate: "",
                remittedBy: "",
                receivedBy: "",
                terms: "",
                poNo: "",
                salesman: "",
                approvedBy: "",
                deliveredTo: "",
                tin: "",
                businessStyle: "",
                address: "",
                note: "",
                tableRows: [
                  {
                    date: "",
                    particulars: "",
                    expenses: "",
                    cashFromAccounting: "",
                    balance: "",
                    vatIncluded: false,
                  },
                ],
                notesRows: [{ note: "" }],
              }}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => {
                // Array for "From" and "To" fields
                const fromFields = [
                  { label: "Date Released", name: "projectDate", type: "date" },
                  {
                    label: "Terms",
                    name: "terms",
                    type: "text",
                    placeholder: "Enter terms",
                  },
                  {
                    label: "PO No.",
                    name: "poNo",
                    type: "text",
                    placeholder: "Enter PO No.",
                  },
                  {
                    label: "Salesman",
                    name: "salesman",
                    type: "select",
                    options: ["Salesman 1", "Salesman 2"],
                  },
                  {
                    label: "Approved By",
                    name: "approvedBy",
                    type: "select",
                    options: ["Approver 1", "Approver 2"],
                  },
                ];

                const toFields = [
                  {
                    label: "Delivered To",
                    name: "deliveredTo",
                    type: "text",
                    placeholder: "Enter delivered to",
                  },
                  {
                    label: "TIN",
                    name: "tin",
                    type: "text",
                    placeholder: "Enter TIN",
                  },
                  {
                    label: "Business Style",
                    name: "businessStyle",
                    type: "text",
                    placeholder: "Enter business style",
                  },
                  {
                    label: "Address",
                    name: "address",
                    type: "text",
                    placeholder: "Enter address",
                  },
                  {
                    label: "Note",
                    name: "note",
                    type: "text",
                    placeholder: "Enter note",
                  },
                ];
                const warehouseReleasedFields = [
                  {
                    label: "Released By",
                    name: "releasedBy",
                    type: "select",
                    options: ["Employee 1", "Employee 2"],
                  },
                  { label: "Date", name: "releasedDate", type: "date" },
                ];

                return (
                  <Form className="py-4">
                    {/* Warehouse Released Section */}
                    <div className="my-6">
                      {/* <h4 className="font-bold text-lg">Warehouse Released</h4> */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {warehouseReleasedFields.map((field) => (
                          <div key={field.name}>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                              {field.label}
                            </label>
                            {field.type === "select" ? (
                              <Field
                                as="select"
                                name={field.name}
                                className={`${
                                  isEditable
                                    ? ""
                                    : "bg-gray-200 cursor-not-allowed"
                                } border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                disabled={!isEditable}
                              >
                                <option value="">Select {field.label}</option>
                                {field.options?.map((option, idx) => (
                                  <option key={idx} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Field>
                            ) : (
                              <Field
                                type={field.type}
                                name={field.name}
                                className={`${
                                  isEditable
                                    ? ""
                                    : "bg-gray-200 cursor-not-allowed"
                                } border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                disabled={!isEditable}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* "From" and "To" Sections with borders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* "From" Section with Border */}
                      <div className="space-y-6 border p-4 rounded-lg">
                        <h4 className="font-bold text-lg">From</h4>
                        {fromFields.map((field) => (
                          <div key={field.name}>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                              {field.label}
                            </label>
                            {field.type === "select" ? (
                              <Field
                                as="select"
                                name={field.name}
                                className={`${
                                  isEditable
                                    ? ""
                                    : "bg-gray-200 cursor-not-allowed"
                                } border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                disabled={!isEditable}
                              >
                                <option value="">Select {field.label}</option>
                                {field.options?.map((option, idx) => (
                                  <option key={idx} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Field>
                            ) : (
                              <Field
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                className={`${
                                  isEditable
                                    ? ""
                                    : "bg-gray-200 cursor-not-allowed"
                                } border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                disabled={!isEditable}
                              />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* "To" Section with Border */}
                      <div className="space-y-6 border p-4 rounded-lg">
                        <h4 className="font-bold text-lg">To</h4>
                        {toFields.map((field) => (
                          <div key={field.name}>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                              {field.label}
                            </label>
                            <Field
                              type={field.type}
                              name={field.name}
                              placeholder={field.placeholder}
                              className={`${
                                isEditable
                                  ? ""
                                  : "bg-gray-200 cursor-not-allowed"
                              } border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                              disabled={!isEditable}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Table Section */}
                    <div className="my-6">
                      <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                          <tr>
                            <th className="border px-4 py-2">No.</th>
                            <th className="border px-4 py-2">Quantity</th>
                            <th className="border px-4 py-2">Description</th>
                            {isEditable && (
                              <th className="border px-4 py-2">Action</th> // Conditionally render Action column
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, index) => (
                            <tr key={index}>
                              <td className="border px-4 py-2">{row.no}</td>
                              <td className="border px-4 py-2">
                                <input
                                  type="number"
                                  value={row.quantity}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].quantity =
                                      e.target.value;
                                    setRows(updatedRows);
                                  }}
                                  className="w-full border p-2"
                                  disabled={!isEditable} // Disable input if not editable
                                />
                              </td>
                              <td className="border px-4 py-2">
                                <textarea
                                  value={row.description}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].description =
                                      e.target.value;
                                    setRows(updatedRows);
                                  }}
                                  className="w-full border p-2"
                                  disabled={!isEditable} // Disable input if not editable
                                />
                              </td>
                              {isEditable && ( // Conditionally render Action button
                                <td className="border px-4 py-2">
                                  <div className="flex justify-center">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveRow(index)}
                                      className="flex text-red-600 hover:text-red-800"
                                    >
                                      <FaTrash />
                                      Remove
                                    </button>
                                  </div>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {isEditable && ( // Conditionally render Add Row button
                        <div className="flex justify-start mt-4">
                          <button
                            type="button"
                            onClick={handleAddRow}
                            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                          >
                            <FaPlusCircle />
                            <span>Add Row</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* <div className="modal-action">
                      <button type="submit" className="btn">
                        {isEditable ? "Update" : "Submit"}{" "}
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => setShowRegisterModal(false)}
                      >
                        Cancel
                      </button>
                    </div> */}
                    <div className="modal-action">
                      {/* Show Update if in edit mode, else show nothing */}
                      {isEditable && (
                        <button type="submit" className="btn">
                          Update
                        </button>
                      )}

                      {/* Show Cancel button */}
                      <button
                        type="button"
                        className="btn"
                        onClick={() => setShowRegisterModal(false)} // Close the modal on Cancel
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>

            {isError && (
              <div className="text-red-500 mt-4">
                <p>Error: {error?.message || "An error occurred"}</p>
              </div>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}
