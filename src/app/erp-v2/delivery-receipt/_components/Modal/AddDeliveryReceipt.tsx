"use client";

import React, { useState } from "react";
import {
  QueryClient,
  useMutation,
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

export default function AddDeliveryReceipt() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [formData, setFormData] = useState<RegisterEmployee>({
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    birth_date: "",
    sex: false,
    address: "",
    email: "",
    contact_number: "",
    department: "",
    role: "",
    username: "",
    password: "",
    password2: "",
  });

  const queryClient = useQueryClient();

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form data to submit:", formData);
    registerEmployee(formData); // trigger the mutation with form data
    // reset form after submit
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      suffix: "",
      birth_date: "",
      sex: false,
      address: "",
      email: "",
      contact_number: "",
      department: "",
      role: "",
      username: "",
      password: "",
      password2: "",
    });
  };
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
                  first_name: "",
                  middle_name: "",
                  last_name: "",
                  suffix: "",
                  sex: "",
                  birth_date: "",
                  contact_number: "",
                  address: "",
                  email: "",
                  department: "",
                  role: "",
                  username: "",
                  password: "",
                  password2: "",
                }}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                <Form className="py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      {[
                        {
                          type: "text",
                          name: "first_name",
                          placeholder: "Enter Terms",
                          label: "Terms:",
                        },
                        {
                          type: "text",
                          name: "middle_name",
                          placeholder: "Enter P.O no.",
                          label: "O.R No. ",
                        },
                        {
                          type: "select",
                          name: "department",
                          label: "Sales man",
                          options: [
                            { value: "", label: "Select department" },
                            { value: "1", label: "Crimson" },
                            { value: "Amber", label: "Amber" },
                            { value: "Velvet", label: "Velvet" },
                          ],
                        },
                        {
                          type: "select",
                          name: "suffix",
                          label: "Approved by",
                          options: [
                            { value: "", label: "Select department" },
                            { value: "1", label: "Crimson" },
                            { value: "Amber", label: "Amber" },
                            { value: "Velvet", label: "Velvet" },
                          ],
                        },
                        {
                          type: "select",
                          name: "birth_date",
                          placeholder: "",
                          label: "Released by",
                          options: [
                            { value: "", label: "Select department" },
                            { value: "1", label: "Crimson" },
                            { value: "Amber", label: "Amber" },
                            { value: "Velvet", label: "Velvet" },
                          ],
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
                          name: "department",
                          //   placeholder: "Date:",
                          label: "Date:",
                        },
                        {
                          type: "text",
                          name: "department",
                          placeholder: "Delivered to",
                          label: "Delivered to",
                        },
                        {
                          type: "text",
                          name: "department",
                          placeholder: "TIN:",
                          label: "TIN",
                        },
                        {
                          type: "text",
                          name: "department",
                          placeholder: "Business Style:",
                          label: "Business Style",
                        },
                        {
                          type: "text",
                          name: "department",
                          placeholder: "NOTE:",
                          label: "NOTE",
                        },
                        {
                          type: "date",
                          name: "department",
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
