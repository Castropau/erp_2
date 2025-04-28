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
import { fetchReceiptById } from "@/api/delivery_receipt/fetchReceipt";
import { fetchReleasedBy } from "@/api/delivery_receipt/fetchReleased";
import { fetchApprovedBy } from "@/api/delivery_receipt/fetchApproved";
import { fetchSalesmanBy } from "@/api/delivery_receipt/fetchSalesman";
import { UpdateView, updateView } from "@/api/delivery_receipt/updateDelivery";
interface DeliveryId {
  id: number;
}
export default function ViewDeliveryReceipt(props: DeliveryId) {
  const { id } = props;
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const queryClient = useQueryClient();

  const {
    data: ReceiptData,
    isLoading: Rloading,
    isError: ReceiptError,
    error: rerror,
  } = useQuery({
    queryKey: ["deliveryId", id],
    queryFn: () => fetchReceiptById(id),
    enabled: !!id,
  });

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

  const { mutate: updateDeliveryReceipt } = useMutation({
    mutationFn: (data: UpdateView) => updateView(id, data),
    onSuccess: () => {
      console.log("delivery updated successfully");
      queryClient.invalidateQueries({ queryKey: ["delivery", id] });
      setShowRegisterModal(false); // Close the modal after successful update
    },
    onError: (error) => {
      console.error("Error updating quotation:", error);
    },
  });

  const { data: SalesmanData } = useQuery({
    queryKey: ["released"],
    queryFn: fetchSalesmanBy, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });
  const { data: ReleasedData } = useQuery({
    queryKey: ["released"],
    queryFn: fetchReleasedBy, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });
  const { data: ApprovedData } = useQuery({
    queryKey: ["released"],
    queryFn: fetchApprovedBy, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
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
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition duration-200"
          onClick={() => setShowRegisterModal(true)}
        >
          <FaEye className="w-6 h-6 btn-info" />
          View
        </button>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <dialog open className="modal mt-15 backdrop-blur-sm">
          <div className="modal-box w-11/12 max-w-7xl max-h-[80vh] overflow-y-auto dark:bg-gray-dark ">
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
                projectName: ReceiptData?.released_by.id || "",
                projectDate: ReceiptData?.date || "",
                remittedBy: ReceiptData?.created_by.full_name || "",
                receivedBy: "",
                terms: ReceiptData?.terms || "",
                po_no: ReceiptData?.po_no || "",
                salesman: ReceiptData?.salesman?.id || "",
                approved_by: ReceiptData?.approved_by?.id || "",
                delivery_to: ReceiptData?.delivered_to || "",
                tin: ReceiptData?.tin || "",
                business_style: ReceiptData?.business_style || "",
                address: ReceiptData?.address || "",
                note: ReceiptData?.note || "",
                // items: ReceiptData?.items || [
                //   {
                //     quantity: "",
                //     description: "",
                //   },
                // ],
                items: ReceiptData?.items || [
                  {
                    quantity: "",
                    description: "",
                    order: 1.0, // Add order field to initial item, if not present
                  },
                ],
                notesRows: [{ note: "" }],
                released_by: ReceiptData?.released_by?.id || "",
                releasedDate: ReceiptData?.date_released || "",
              }}
              enableReinitialize={true}
              onSubmit={(values) => {
                const updatedData = {
                  ...ReceiptData,
                  ...values,
                  items: values.items.map((item, index) => ({
                    ...item,
                    no: index + 1,
                  })),
                };

                // Call your mutation here
                updateDeliveryReceipt(updatedData); // <-- replace this with your mutation logic

                console.log("Updated data to send:", updatedData);
              }}
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
                    name: "po_no",
                    type: "text",
                    placeholder: "Enter PO No.",
                  },
                  {
                    label: "Salesman",
                    name: "salesman",
                    type: "select",
                    options:
                      SalesmanData?.map((user) => ({
                        value: user.id.toString(),
                        label: user.full_name,
                      })) || [],
                  },
                  {
                    label: "Approved By",
                    name: "approved_by",
                    type: "select",
                    // options: ["Approver 1", "Approver 2"],
                    options:
                      ApprovedData?.map((user) => ({
                        value: user.id.toString(),
                        label: user.full_name,
                      })) || [],
                  },
                ];

                const toFields = [
                  {
                    label: "Delivered To",
                    name: "delivery_to",
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
                    name: "business_style",
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
                    name: "released_by",
                    type: "select",
                    options:
                      ReleasedData?.map((user) => ({
                        value: user.id.toString(),
                        label: user.full_name,
                      })) || [],
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
                            <label className="block mb-2 text-sm font-medium ">
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
                                } border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-dark`}
                                disabled={!isEditable}
                              >
                                <option value="">Select {field.label}</option>
                                {field.options?.map((option, idx) => (
                                  <option key={idx} value={option.value}>
                                    {option.label}
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
                                } border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
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
                            <label className="block mb-2 text-sm font-medium ">
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
                                } border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                disabled={!isEditable}
                              >
                                <option value="">Select {field.label}</option>
                                {field.options?.map((option, idx) => (
                                  <option key={idx} value={option.value}>
                                    {option.label}
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
                                } border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
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
                            <label className="block mb-2 text-sm font-medium ">
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
                              } border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                              disabled={!isEditable}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Table Section */}
                    <div className="my-6">
                      <FieldArray name="items">
                        {({ insert, remove, push }) => (
                          <>
                            {isEditable && (
                              <div className="mb-4">
                                <button
                                  type="button"
                                  onClick={() =>
                                    push({
                                      no: values.items.length + 1,
                                      quantity: "",
                                      description: "",
                                      order: (values.items.length + 1).toFixed(
                                        1
                                      ),
                                    })
                                  }
                                  className="btn btn-info"
                                >
                                  Add Item
                                </button>
                              </div>
                            )}

                            <table className="min-w-full table-auto border-collapse border border-gray-300">
                              <thead>
                                <tr>
                                  <th className="border px-4 py-2">No.</th>

                                  <th className="border px-4 py-2">Quantity</th>
                                  <th className="border px-4 py-2">
                                    Description
                                  </th>
                                  {isEditable && (
                                    <th className="border px-4 py-2">Action</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {values.items.map((item, index) => (
                                  <tr key={index}>
                                    <td className="border px-4 py-2">
                                      {index + 1}
                                    </td>

                                    <td className="border px-4 py-2">
                                      <Field
                                        type="number"
                                        name={`items[${index}].quantity`}
                                        className={`w-full border p-2 ${
                                          !isEditable &&
                                          "bg-gray-200 cursor-not-allowed dark:bg-gray-dark"
                                        }`}
                                        disabled={!isEditable}
                                      />
                                    </td>

                                    <td className="border px-4 py-2">
                                      <Field
                                        as="textarea"
                                        name={`items[${index}].description`}
                                        className={`w-full border p-2 ${
                                          !isEditable &&
                                          "bg-gray-200 cursor-not-allowed dark:bg-gray-dark"
                                        }`}
                                        disabled={!isEditable}
                                      />
                                    </td>

                                    {isEditable && (
                                      <td className="border px-4 py-2 text-center">
                                        <button
                                          type="button"
                                          onClick={() => remove(index)}
                                          className="text-red-600 hover:text-red-800"
                                        >
                                          <FaTrash className="inline mr-1" />
                                          Remove
                                        </button>
                                      </td>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </>
                        )}
                      </FieldArray>

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
