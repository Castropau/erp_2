"use client";

import React, { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

/** components */
import { FaCirclePlus, FaTrash } from "react-icons/fa6";

/** api */
import { registerUser } from "@/api/User/registerUser";

/** interfaces */
import { RegisterEmployee } from "@/interfaces/RegisterEmployee";
import { Field, Form, Formik } from "formik";
import { FaPlusCircle } from "react-icons/fa";
import { AddDelivery } from "@/api/delivery_receipt/addDelivery";
import { fetchReleasedBy } from "@/api/delivery_receipt/fetchReleased";

export default function AddDeliveryReceipt() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const queryClient = useQueryClient();

  const {
    mutate: registerQuotation,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: AddDelivery) => AddDelivery(data),
    onSuccess: () => {
      console.log("delivery registered successfully");
      queryClient.invalidateQueries({ queryKey: ["delivery"] });
      setShowRegisterModal(false);
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
    },
  });

  const handleInputChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? checked : value,
    }));
  };
  const { data: ReleasedData } = useQuery({
    queryKey: ["released"],
    queryFn: fetchReleasedBy, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });

  const { mutate: registerEmployee } = useMutation({
    mutationFn: (data: RegisterEmployee) => registerUser(data),
    onSuccess: () => {
      console.log("registered");
      // choice for modal
      queryClient.invalidateQueries({ queryKey: ["users"] });

      setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  const [rows, setRows] = useState([{ no: 1, quantity: "", description: "" }]);

  const handleAddRow = () => {
    setRows([...rows, { no: rows.length + 1, quantity: "", description: "" }]);
  };

  const handleRemoveRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn btn-info"
          onClick={() => setShowRegisterModal(true)}
        >
          <FaCirclePlus className="w-6 h-6 btn-info" />
          Add Delivery Receipt
        </button>
      </div>
      <div>
        {/* Registration Modal */}
        {showRegisterModal && (
          <dialog open className="modal">
            <div className="modal-box w-11/12 max-w-7xl">
              <h3 className="font-bold text-lg">Create New Delivery Receipt</h3>
              <Formik
                initialValues={{
                  terms: "",
                  po_no: "",
                  or_no: "",
                  salesman: "",
                  approved_by: "",
                  released_by: "",
                  date: "",
                  date_released: "",
                  delivered_to: "",
                  tin: "",
                  business_style: "",
                  address: "",
                  note: "",
                }}
                onSubmit={(values) => {
                  const deliveryPayload = {
                    items: rows.map((row, index) => ({
                      order: `${index + 1}.0`,
                      quantity: row.quantity,
                      description: row.description,
                    })),
                    date: values.date,
                    date_released: values.date_released,
                    created_by: "", // You can autofill this if current user info is available
                    delivered_to: values.delivered_to,
                    tin: values.tin,
                    business_style: values.business_style,
                    address: values.address,
                    note: values.note,
                    terms: values.terms,
                    po_no: values.po_no,
                    or_no: values.or_no,
                    salesman: parseInt(values.salesman),
                    approved_by: parseInt(values.approved_by),
                    released_by: parseInt(values.released_by),
                  };

                  registerQuotation(deliveryPayload);
                  console.log(deliveryPayload);
                }}
              >
                <Form className="py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      {[
                        {
                          type: "text",
                          name: "terms",
                          placeholder: "Enter Terms",
                          label: "Terms:",
                        },
                        {
                          type: "text",
                          name: "or_no",
                          placeholder: "Enter O.R no.",
                          label: "O.R No. ",
                        },
                        {
                          type: "text",
                          name: "po_no",
                          placeholder: "Enter P.O no.",
                          label: "P.O No. ",
                        },
                        {
                          type: "select",
                          name: "salesman",
                          label: "Sales man",
                          options:
                            ReleasedData?.map((user) => ({
                              value: user.id.toString(),
                              label: user.full_name,
                            })) || [],
                        },
                        {
                          type: "select",
                          name: "approved_by",
                          label: "Approved by",
                          options:
                            ReleasedData?.map((user) => ({
                              value: user.id.toString(),
                              label: user.full_name,
                            })) || [],
                        },
                        {
                          type: "select",
                          name: "released_by",
                          placeholder: "",
                          label: "Released by",
                          options:
                            ReleasedData?.map((user) => ({
                              value: user.id.toString(),
                              label: user.full_name,
                            })) || [],
                        },
                      ].map((item) => (
                        <div key={item.name} className="mb-4">
                          <label
                            htmlFor={item.name}
                            className="block text-sm font-medium text-gray-700"
                          >
                            {item.label}
                          </label>
                          {item.type === "select" ? (
                            <Field
                              as="select"
                              name={item.name}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            >
                              <option value="">Select {item.label}</option>

                              {item.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Field>
                          ) : (
                            <Field
                              type={item.type}
                              id={item.name}
                              name={item.name}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              placeholder={item.placeholder}
                              required
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Column 2: Organization Information */}
                    <div>
                      {[
                        {
                          type: "date",
                          name: "date",
                          //   placeholder: "Date:",
                          label: "Date:",
                        },
                        {
                          type: "text",
                          name: "delivered_to",
                          placeholder: "Delivered to",
                          label: "Delivered to",
                        },
                        {
                          type: "text",
                          name: "tin",
                          placeholder: "TIN:",
                          label: "TIN",
                        },
                        {
                          type: "text",
                          name: "business_style",
                          placeholder: "Business Style:",
                          label: "Business Style",
                        },
                        {
                          type: "text",
                          name: "address",
                          placeholder: "address:",
                          label: "address",
                        },
                        {
                          type: "text",
                          name: "note",
                          placeholder: "NOTE:",
                          label: "NOTE",
                        },
                        {
                          type: "date",
                          name: "date_released",
                          //   placeholder: "Date:",
                          label: "Date Released:",
                        },
                      ].map((item) => (
                        <div key={item.name} className="mb-4">
                          <label
                            htmlFor={item.name}
                            className="block text-sm font-medium text-gray-700"
                          >
                            {item.label}
                          </label>
                          {item.type === "select" ? (
                            <Field
                              as="select"
                              name={item.name}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            >
                              {item.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Field>
                          ) : (
                            <Field
                              type={item.type}
                              id={item.name}
                              name={item.name}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              placeholder={item.placeholder}
                              required
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* end of inputs */}
                  {/* notes */}
                  {/* Table for rows */}
                  <div className="my-6">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">No.</th>
                          <th className="border px-4 py-2">Quantity</th>
                          <th className="border px-4 py-2">Description</th>
                          <th className="border px-4 py-2">Action</th>
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
                                  updatedRows[index].quantity = e.target.value;
                                  setRows(updatedRows);
                                }}
                                className="w-full border p-2"
                              />
                            </td>
                            <td className="border px-4 py-2">
                              <input
                                type="text"
                                value={row.description}
                                onChange={(e) => {
                                  const updatedRows = [...rows];
                                  updatedRows[index].description =
                                    e.target.value;
                                  setRows(updatedRows);
                                }}
                                className="w-full border p-2"
                              />
                            </td>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>

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
                  </div>
                  <div className="modal-action">
                    <button type="submit" className="btn">
                      Submit
                    </button>
                    <button
                      className="btn"
                      onClick={() => setShowRegisterModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </dialog>
        )}
      </div>
    </>
  );
}
