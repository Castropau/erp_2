"use client";
import { fetchCashRequest } from "@/api/cash-request/fetchCashRequest";
import { fetchUserLists } from "@/api/cash-request/fetchUsers";
import { registerCheque } from "@/api/cheque-request/CreateCheque";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AddCheque = () => {
  const [rows] = useState<any[]>([]);
  const [isEditing] = useState(false);
  // const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const newTotalAmount = rows.reduce(
      (acc, row) => acc + parseFloat(row.amount || 0),
      0
    );
    setTotalAmount(newTotalAmount);
  }, [rows]);
  // Fetching users list
  const {
    // isLoading: DisLoading,
    // error: Derror,
    data: usersList,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserLists,
  });

  // const handleEditToggle = () => {
  //   setIsEditing(!isEditing);
  // };
  const { isLoading: isCashLoading, data: cashRecords } = useQuery({
    queryKey: ["cashRecords"],
    queryFn: fetchCashRequest,
  });

  const { mutate: registerChequeRequest } = useMutation({
    mutationFn: registerCheque,
    // mutationFn: (data: AddCheque) => registerCheque(data),
    onSuccess: () => {
      console.log("Cheque successfully registered");
      queryClient.invalidateQueries({ queryKey: ["cheque"] });
      //   setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Error during cheque registration:", error);
    },
  });
  // const handleSubmit = (values: any) => {
  //   console.log("Form data to submit:", values);
  //   registerChequeRequest(values);
  // };
  return (
    <div>
      {showSuccess && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>submitted successfully!</span>
        </div>
      )}
      <Link
        className="btn bg-white  text-black uppercase mb-2"
        href="/erp-v2/cheque-request/"
      >
        Back to cheque request list
      </Link>
      <Formik
        initialValues={{
          cheque_requisition_items: [],
          name_of_organization: "",
          payable_to: "",
          address: "",
          purpose: "",
          requested_by: 0,
          cheque_no: "",
          date_requested: "",
          serial_no: "",
        }}
        // onSubmit={handleSubmit}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await registerChequeRequest(values); // Your API call or mutation
            console.log("Cheque Requisition submitted:", values);

            setShowSuccess(true); // Optional toast or alert

            resetForm({
              values: {
                cheque_requisition_items: [],
                name_of_organization: "",
                payable_to: "",
                address: "",
                purpose: "",
                requested_by: 0,
                cheque_no: "",
                date_requested: "",
                serial_no: "",
              },
            });

            // Optional redirect
            setTimeout(() => {
              window.location.href = "/erp-v2/cheque-request";
            }, 2000);
          } catch (error) {
            console.error("Failed to register cheque requisition:", error);
          } finally {
            setSubmitting(false); // Stops form spinner
          }
        }}
      >
        {({ values }) => (
          <Form className="">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 uppercase"> */}
            <div className="flex flex-col gap-1 uppercase">
              <div className="grid grid-cols-1 md:grid-cols-8 gap-2">
                {/* Form Fields */}
                {[
                  {
                    name: "serial_no",
                    type: "select",
                    label: "Set Serial #",
                  }, // Change type to select here
                  { name: "date_requested", type: "date", label: "Date" },
                  {
                    name: "name_of_organization",
                    type: "text",
                    label: "Name of Organization",
                  },
                  { name: "cheque_no", type: "text", label: "cheque no" },
                  {
                    name: "payable_to",
                    type: "text",
                    label: "Payable To",
                  },
                  { name: "address", type: "text", label: "Address" },
                  { name: "purpose", type: "text", label: "Purpose" },
                  {
                    name: "requested_by",
                    type: "select",
                    label: "Requested By",
                    options:
                      usersList?.map((user) => ({
                        value: user.id,
                        label: user.full_name,
                      })) || [],
                  },
                ].map((item) => (
                  <div key={item.name} className=" dark:text-white">
                    <label
                      htmlFor={item.name}
                      className="block text-sm font-bold text-gray-700 dark:text-white dark:bg-gray-dark"
                    >
                      {item.label}
                    </label>

                    {item.type === "select" ? (
                      <Field
                        as="select"
                        id={item.name}
                        name={item.name}
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      >
                        <option value="">Select {item.label}</option>
                        {item.name === "serial_no"
                          ? values.cheque_requisition_items?.map(
                              (record: { id: number; serial_no: number }) => (
                                <option key={record.id} value={record.id}>
                                  {record.serial_no}
                                </option>
                              )
                            )
                          : item.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                      </Field>
                    ) : item.type === "text" || item.type === "date" ? (
                      <Field
                        type={item.type}
                        id={item.name}
                        name={item.name}
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      />
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="col-span-2">
                {/* <h2 className="font-bold text-lg dark:bg-gray-dark dark:text-white">
                              Items
                            </h2> */}
                <FieldArray name="cheque_requisition_items">
                  {({ push, remove }) => (
                    <div>
                      <div className="mt-2 overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
                        <table className="table table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
                          <thead className="bg-white text-black  border-b-gray-400">
                            <tr className="text-sm font-medium text-center uppercase">
                              <th className="p-2 text-center">Serial No</th>
                              <th className="p-2 text-center">
                                Date of Purchase
                              </th>
                              <th className="p-2 text-center">Description</th>
                              <th className="p-2 text-center">Amount</th>
                              <th className="p-2 text-center">Cheque Number</th>
                              <th className="p-2 text-center">Remark</th>
                              <th className="p-2 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(values.cheque_requisition_items) &&
                            values.cheque_requisition_items.length > 0 ? (
                              values.cheque_requisition_items.map(
                                (item, index) => (
                                  <tr key={index}>
                                    <td className="p-2">
                                      <Field
                                        name={`cheque_requisition_items[${index}].serial_no`}
                                        className="w-full border border-gray-200  text-center p-1 rounded"
                                        placeholder="Serial No"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <Field
                                        name={`cheque_requisition_items[${index}].date_of_purchase`}
                                        className="w-full border border-gray-200  text-center p-1 rounded"
                                        placeholder="Date"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <Field
                                        name={`cheque_requisition_items[${index}].description`}
                                        className="w-full border border-gray-200  text-center p-1 rounded"
                                        placeholder="Description"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <Field
                                        name={`cheque_requisition_items[${index}].amount`}
                                        className="w-full border border-gray-200  text-center p-1 rounded"
                                        placeholder="Amount"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <Field
                                        name={`cheque_requisition_items[${index}].cheque_no`}
                                        className="w-full border border-gray-200  text-center p-1 rounded"
                                        placeholder="Cheque No"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <Field
                                        name={`cheque_requisition_items[${index}].remark`}
                                        className="w-full border border-gray-200  text-center p-1 rounded"
                                        placeholder="Remarks"
                                      />
                                    </td>
                                    <td className="text-xs flex gap-2 justify-center">
                                      <button
                                        type="button"
                                        onClick={() => remove(index)} // Remove the row from Formik state
                                        // className="text-red-500 hover:text-red-700"
                                        className="hover:underline hover:cursor-pointer flex justify-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                                      >
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                )
                              )
                            ) : (
                              <tr>
                                <td
                                  colSpan={7}
                                  className="p-2 text-center text-gray-500"
                                >
                                  No items added yet
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        {/* Cash Record Selection Dropdown */}
                        <select
                          className="bg-gray-50 border border-gray-300 rounded-lg block w-50 p-2.5 dark:bg-gray-dark dark:text-white mt-4"
                          onChange={(e) => {
                            const parsedValue: {
                              id: number;
                              serial_no: string;
                              special_instructions: string;
                              grand_total: number;
                              requested_by: string;
                              date_requested: string;
                              status: string;
                            } = JSON.parse(e.target.value);

                            push({
                              id: parsedValue.id,
                              serial_no: parsedValue.serial_no,
                              cash_requisition: parsedValue.id,
                              date_of_purchase: parsedValue.date_requested,
                              description: parsedValue.special_instructions,
                              amount: parsedValue.grand_total,
                              cheque_no: "",
                              remark: "",
                            });

                            setTotalAmount(
                              (prevTotal) => prevTotal + parsedValue.grand_total
                            );
                          }}
                        >
                          <option value="">Select Cash Record</option>
                          {isCashLoading ? (
                            <option value="">Loading cash records...</option>
                          ) : (
                            cashRecords?.map((cash) => (
                              <option
                                key={cash.id}
                                value={JSON.stringify(cash)}
                              >
                                {cash.serial_no}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>

            <div className="mt-4 flex justify-between ">
              {/* Only show the Select Cash Record dropdown if in editing mode */}
              {isEditing && (
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  // onChange={(e) => handleAddRow(Number(e.target.value))}
                >
                  <option value="">Select Cash Record</option>
                  {isCashLoading ? (
                    <option value="">Loading cash records...</option>
                  ) : (
                    cashRecords?.map((cash) => (
                      <option key={cash.id} value={cash.id}>
                        {cash.serial_no}
                      </option>
                    ))
                  )}
                </select>
              )}
            </div>

            {/* Total Display */}
            <div className="mt-4 flex justify-end dark:bg-gray-dark dark:text-white">
              <span className="font-semibold text-lg">
                Total: ₱{totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="modal-action">
              <Link
                className="btn bg-white  text-black uppercase"
                href="/erp-v2/cheque-request/"
              >
                Back
              </Link>
              <button type="submit" className="btn uppercase">
                Submit
              </button>
              {/* <button
                className="btn"
                type="button"
                onClick={() => setShowRegisterModal(false)}
              >
                Close
              </button> */}
              {/* <Link
                className="btn bg-white  text-black uppercase"
                href="/erp-v2/cheque-request/"
              >
                Back
              </Link> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCheque;
