"use client";
import { AddDelivery } from "@/api/delivery_receipt/addDelivery";
import { fetchReleasedBy } from "@/api/delivery_receipt/fetchReleased";
import { fetchSalesmanBy } from "@/api/delivery_receipt/fetchSalesman";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import React, { useState } from "react";

const Add = () => {
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    mutate: registerQuotation,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (data: AddDelivery) => AddDelivery(data),
    onSuccess: () => {
      console.log("delivery registered successfully");
      queryClient.invalidateQueries({ queryKey: ["delivery"] });
      //   setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
  const [rows, setRows] = useState([{ no: 1, quantity: "", description: "" }]);

  const handleAddRow = () => {
    setRows([...rows, { no: rows.length + 1, quantity: "", description: "" }]);
  };

  const handleRemoveRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };
  const { data: ReleasedData } = useQuery({
    queryKey: ["released"],
    queryFn: fetchReleasedBy, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });
  const { data: SalesmanData } = useQuery({
    queryKey: ["sales"],
    queryFn: fetchSalesmanBy, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });
  return (
    <>
      <>
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
      </>
      <div>
        <Link
          className="btn text-black uppercase"
          href="/erp-v2/delivery-receipt"
        >
          back to delivery receipt
        </Link>
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
          // onSubmit={(values, { resetForm }) => {
          //   const deliveryPayload = {
          //     items: rows.map((row, index) => ({
          //       id: 0,
          //       order: `${index + 1}.0`,
          //       quantity: row.quantity,
          //       description: row.description,
          //     })),
          //     date: values.date,
          //     date_released: values.date_released,
          //     created_by: "",
          //     delivered_to: values.delivered_to,
          //     tin: values.tin,
          //     business_style: values.business_style,
          //     address: values.address,
          //     note: values.note,
          //     terms: values.terms,
          //     po_no: values.po_no,
          //     or_no: values.or_no,
          //     salesman: parseInt(values.salesman),
          //     approved_by: parseInt(values.approved_by),
          //     released_by: parseInt(values.released_by),
          //     id: 0,
          //   };
          //   registerQuotation(deliveryPayload);
          //   console.log(deliveryPayload);
          //   resetForm(); // ✅ This clears all form fields
          //   setRows([{ no: 1, quantity: "", description: "" }]);
          // }}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            const deliveryPayload = {
              items: rows.map((row, index) => ({
                // id: 0,
                order: `${index + 1}.0`,
                quantity: row.quantity,
                description: row.description,
              })),
              date: values.date,
              date_released: values.date_released,
              created_by: "",
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
              // id: 0,
            };

            try {
              await registerQuotation(deliveryPayload); // ⏳ Wait for API call
              console.log("Submitted:", deliveryPayload);

              setShowSuccess(true); // ✅ Optional: show alert

              resetForm(); // ✅ Clear form fields
              setRows([{ no: 1, quantity: "", description: "" }]); // ✅ Reset dynamic rows

              setTimeout(() => {
                setShowSuccess(false);
                window.location.href = "/erp-v2/delivery-receipt"; // 🔁 Optional redirect
              }, 2000);
            } catch (error) {
              console.error("Submission failed:", error);
              // Optional: show error alert here
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form className="py-1 uppercase">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
            <label htmlFor="">Date</label>
            <Field
              type="date"
              id="date"
              name="date"
              className="mt-1 block w-100 border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-6 gap-1">
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
                    SalesmanData?.map((user) => ({
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
                <div key={item.name} className="mb-1 text-center">
                  <label
                    htmlFor={item.name}
                    className="block text-sm font-medium "
                  >
                    {item.label}
                  </label>
                  {item.type === "select" ? (
                    <Field
                      as="select"
                      name={item.name}
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
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
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      placeholder={item.placeholder}
                      required
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Column 2: Organization Information */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-1">
              {[
                // {
                //   type: "date",
                //   name: "date",
                //   //   placeholder: "Date:",
                //   label: "Date:",
                // },
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
                <div key={item.name} className="mb-1 text-center">
                  <label
                    htmlFor={item.name}
                    className="block text-sm font-medium "
                  >
                    {item.label}
                  </label>

                  <Field
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    placeholder={item.placeholder || ""}
                    required
                  />
                </div>
              ))}
            </div>

            {/* end of inputs */}
            {/* notes */}
            {/* Table for rows */}
            <div className="flex justify-start mt-4">
              <button
                type="button"
                onClick={handleAddRow}
                className="bg-white mb-2 uppercase font-bold text-black border border-black px-4 py-2 rounded flex items-center space-x-2"
              >
                <span>Add Row</span>
              </button>
            </div>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table
                style={{ width: "100%" }}
                className="table table-xs w-full border border-gray-200 rounded-lg shadow-lg"
              >
                <thead className="bg-white text-black  border-b-gray-400">
                  <tr className="text-sm font-medium text-center uppercase">
                    <th className=" px-4 py-2">No.</th>
                    <th className=" px-4 py-2">Quantity</th>
                    <th className=" px-4 py-2">Description</th>
                    <th className=" px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td className="text-center px-4 py-2">{row.no}</td>
                      <td className=" px-4 py-2">
                        <input
                          type="number"
                          value={row.quantity}
                          onChange={(e) => {
                            const updatedRows = [...rows];
                            updatedRows[index].quantity = e.target.value;
                            setRows(updatedRows);
                          }}
                          className="text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                        />
                      </td>
                      <td className=" px-4 py-2">
                        <input
                          type="text"
                          value={row.description}
                          onChange={(e) => {
                            const updatedRows = [...rows];
                            updatedRows[index].description = e.target.value;
                            setRows(updatedRows);
                          }}
                          className="text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                        />
                      </td>
                      <td className=" px-4 py-2">
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveRow(index)}
                            // className="uppercase flex text-red-600 hover:text-red-800"
                            className="text-xs text-red-700 hover:cursor-pointer hover:underline uppercase"
                          >
                            {/* <FaTrash /> */}
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* <div className="flex justify-start mt-4">
      <button
        type="button"
        onClick={handleAddRow}
        className="bg-white uppercase font-bold text-blue-800 border border-blue-800 px-4 py-2 rounded flex items-center space-x-2"
      >
        <span>Add Row</span>
      </button>
    </div> */}
            </div>
            <div className="modal-action">
              {/* <button type="submit" className="btn uppercase">
      Submit
    </button> */}
              {/* <button className="btn" onClick={() => setShowRegisterModal(false)}>
      Close
    </button> */}
              <Link
                href="/erp-v2/delivery-receipt"
                className="btn text-black uppercase"
              >
                back
              </Link>
              <button type="submit" className="btn uppercase">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Add;
