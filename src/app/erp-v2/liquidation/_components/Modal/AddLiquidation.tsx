"use client";

import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { Field, Form, Formik, FieldArray } from "formik";
import { CiCirclePlus } from "react-icons/ci";

/** api */
import { CreateCategory } from "@/api/inventory/CreateCategory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/** interfaces */
import { fetchDepartmentsList } from "@/api/User/fetchDepartmentList";
import { fetchUserList } from "@/api/User/fetchUserList";

export default function AddLiquidation() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");

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

  return (
    <>
      <div className="flex justify-start">
        <button
          className="btn btn-info"
          onClick={() => setShowRegisterModal(true)}
        >
          <CiCirclePlus className="w-6 h-6 btn-info" />
          Add Liquidation
        </button>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-7xl">
            <h3 className="font-bold text-lg">Create New Liquidation</h3>
            <Formik
              initialValues={{
                project: "",
                projectName: "",
                projectDate: "",
                remittedBy: "",
                receivedBy: "",
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
                // Calculate total expenses and cash from accounting
                const totalExpenses = values.tableRows.reduce(
                  (acc, row) => acc + (parseFloat(row.expenses) || 0),
                  0
                );
                const totalCashFromAccounting = values.tableRows.reduce(
                  (acc, row) => acc + (parseFloat(row.cashFromAccounting) || 0),
                  0
                );

                const totalCashFromBalance = values.tableRows.reduce(
                  (acc, row) => acc + (parseFloat(row.balance) || 0),
                  0
                );

                // const totalBalance = totalExpenses + totalCashFromBalance;

                return (
                  <Form className="py-4">
                    {/* Dropdown for Project Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Select Project
                      </label>
                      <Field
                        as="select"
                        name="project"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        onChange={(e) => {
                          setSelectedProject(e.target.value);
                          setFieldValue("project", e.target.value);
                        }}
                      >
                        <option value="">Select a Project</option>
                        {projects?.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.department}
                          </option>
                        ))}
                      </Field>
                    </div>

                    {/* Project Details */}
                    {selectedProject && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">Project Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {[
                            {
                              label: "Project Name",
                              name: "projectName",
                              type: "text",
                              placeholder: "Enter project name",
                            },
                            {
                              label: "Date",
                              name: "projectDate",
                              type: "date",
                              placeholder: "",
                            },
                            {
                              label: "Remitted By",
                              name: "remittedBy",
                              type: "select",
                              placeholder: "Select remitted by",
                            },
                            {
                              label: "Received By",
                              name: "receivedBy",
                              type: "select",
                              placeholder: "Enter who received",
                            },
                          ].map((item) => (
                            <div key={item.name}>
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                {item.label}
                              </label>
                              {item.type === "select" ? (
                                <Field
                                  as="select"
                                  name={item.name}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                  required
                                >
                                  <option value="">Select {item.label}</option>
                                  {users?.map((user) => (
                                    <option key={user.id} value={user.id}>
                                      {user.full_name}
                                    </option>
                                  ))}
                                </Field>
                              ) : (
                                <Field
                                  type={item.type}
                                  name={item.name}
                                  placeholder={item.placeholder}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                  required
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Table for Adding Expenses */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Expenses</h4>
                      <FieldArray
                        name="tableRows"
                        render={(arrayHelpers) => (
                          <div>
                            <table className="table-auto w-full border-collapse">
                              <thead>
                                <tr>
                                  {[
                                    "Date",
                                    "Particulars",
                                    "Expenses",
                                    "Cash From Accounting",
                                    "Balance",
                                    "VAT Inc",
                                    "Action",
                                  ].map((header) => (
                                    <th key={header} className="p-2 text-left">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {values.tableRows.map((row, index) => (
                                  <tr key={index}>
                                    {[
                                      {
                                        name: `tableRows[${index}].date`,
                                        type: "date",
                                      },
                                      {
                                        name: `tableRows[${index}].particulars`,
                                        type: "text",
                                      },
                                      {
                                        name: `tableRows[${index}].expenses`,
                                        type: "number",
                                      },
                                      {
                                        name: `tableRows[${index}].cashFromAccounting`,
                                        type: "number",
                                      },
                                      {
                                        name: `tableRows[${index}].balance`,
                                        type: "number",
                                      },
                                    ].map((field) => (
                                      <td key={field.name} className="p-2">
                                        <Field
                                          type={field.type}
                                          name={field.name}
                                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        />
                                      </td>
                                    ))}
                                    <td className="p-2">
                                      <Field
                                        type="checkbox"
                                        name={`tableRows[${index}].vatIncluded`}
                                        className="checkbox"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                        className="btn btn-danger"
                                      >
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <button
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({
                                  date: "",
                                  particulars: "",
                                  expenses: "",
                                  cashFromAccounting: "",
                                  balance: "",
                                  vatIncluded: false,
                                })
                              }
                              className="btn btn-info mt-4"
                            >
                              Add Row
                            </button>
                          </div>
                        )}
                      />
                    </div>

                    {/* Total Row */}
                    <div className="flex justify-between py-2 border-t border-gray-300">
                      <div className="ml-auto flex space-x-4">
                        <div className="font-semibold">Total</div>
                        <div className="w-1/4">
                          <input
                            type="number"
                            value={totalExpenses}
                            readOnly
                            className="bg-gray-200 p-2 rounded-md w-full"
                          />
                        </div>
                        <div className="w-1/4">
                          <input
                            type="number"
                            value={totalCashFromAccounting}
                            readOnly
                            className="bg-gray-200 p-2 rounded-md w-full"
                          />
                        </div>
                        <div className="w-1/4">
                          <input
                            type="number"
                            value={totalCashFromBalance}
                            readOnly
                            className="bg-gray-200 p-2 rounded-md w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Take Notes Section */}
                    <div className="mb-4">
                      <h4 className="font-semibold">Take Notes</h4>
                      <FieldArray
                        name="notesRows"
                        render={(arrayHelpers) => (
                          <div>
                            {values.notesRows.map((noteRow, index) => (
                              <div key={index} className="mb-2">
                                <Field
                                  type="text"
                                  name={`notesRows[${index}].note`}
                                  className="input"
                                  placeholder="Enter note"
                                />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="btn btn-danger ml-2"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push({ note: "" })}
                              className="btn btn-info mt-4"
                            >
                              Add Note
                            </button>
                          </div>
                        )}
                      />
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="modal-action">
                      <button type="submit" className="btn">
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => setShowRegisterModal(false)}
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
