"use client";
import { CreatePurchase } from "@/api/purchase-order/createPurchase";
import { Formik, Form, Field, FieldArray } from "formik";
import React, { useState } from "react";
// import users from "../../dashboard/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchVendorsList } from "@/api/vendor/fetchVendor";
import Link from "next/link";

const AddPurchase = () => {
  const queryClient = useQueryClient();
  const [selectedProject, setSelectedProject] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    mutate: registerQuotation,
    // isError: errors,
    // error: errorr,
  } = useMutation({
    mutationFn: (data: CreatePurchase) => CreatePurchase(data),
    onSuccess: () => {
      console.log("purchase registered successfully");
      queryClient.invalidateQueries({ queryKey: ["purchase"] });
      //   setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchVendorsList, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
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
          href="/erp-v2/purchase-order"
        >
          back to purchase order list
        </Link>
        {selectedProject}
        <Formik
          initialValues={{
            project: "",
            projectName: "",
            projectDate: "",
            remittedBy: "",
            receivedBy: "",
            tableRows: [
              {
                id: 0,
                item: "",
                description: "",
                srp: 0,
                quantity: 0,
                total: 0,
                // description: "",
              },
            ],
            discount: 0,
            vat: 0,
            terms: "",
          }}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            const payload: CreatePurchase = {
              items: values.tableRows.map((row) => ({
                // id: row.id || 0,
                item: row.item,
                description: row.description || "",
                unit_price: row.srp || 0,
                quantity: row.quantity || 0,
              })),
              terms: values.terms,
              discount: values.discount || 0,
              vat_percentage: values.vat || 0,
              vendor: parseFloat(values.project),
            };

            // registerQuotation(payload);
            // console.log("Submitting purchase payload:", payload);
            try {
              await registerQuotation(payload); // ✅ Wait for the mutation to finish
              console.log("Submitting purchase payload:", payload);

              setShowSuccess(true); // Optional success alert
              resetForm();

              setTimeout(() => {
                window.location.href = "/erp-v2/purchase-order"; // ✅ Redirect after success
              }, 2000);
            } catch (error) {
              console.error("Failed to submit purchase:", error); // Error logging
            } finally {
              setSubmitting(false); // Always stop loading
            }
          }}
        >
          {({ values, setFieldValue }) => {
            // Calculate total expenses and cash from accounting
            const totalExpenses = values.tableRows.reduce(
              (acc, row) => acc + (row.srp * row.quantity || 0),
              0
            );
            // const totalCashFromAccounting = values.tableRows.reduce(
            //   (acc, row) => acc + (parseFloat(row.balance) || 0),
            //   0
            // );
            // const totalCashFromBalance = values.tableRows.reduce(
            //   (acc, row) => acc + (parseFloat(row.balance) || 0),
            //   0
            // );
            return (
              <Form className="py-1">
                {/* Dropdown for Project Selection */}
                {/* <div className="mb-1">
                  <label className="block text-sm font-bold uppercase ">
                    Company
                  </label>
                  <Field
                    as="select"
                    name="project"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-gray-dark"
                    // onChange={(e) => {
                    //   setSelectedProject(e.target.value);
                    //   setFieldValue("project", e.target.value);
                    // }}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setSelectedProject(selectedId);
                      setFieldValue("project", selectedId);
  
                      const selectedVendor = projects?.find(
                        (proj) => proj.id.toString() === selectedId
                      );
  
                      if (selectedVendor) {
                        setFieldValue("address", selectedVendor.address || "");
                        setFieldValue("tin", selectedVendor.tin || "");
                        setFieldValue(
                          "contact_number",
                          selectedVendor.contact_number || ""
                        );
                      }
                    }}
                  >
                    <option value="">Select a Project</option>
                    {projects?.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.vendor}
                      </option>
                    ))}
                  </Field>
                </div> */}

                {/* Project Details */}
                {
                  <div className="space-y-1">
                    <h4 className="font-semibold">Project Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {[
                        {
                          label: "company",
                          name: "project",
                          type: "select",
                          placeholder: "enter terms_conditions",
                        },
                        {
                          label: "Address",
                          name: "address",
                          type: "text",
                          placeholder: "Address",
                        },
                        {
                          label: "TIN",
                          name: "tin",
                          type: "text",
                          placeholder: "TIN",
                        },
                        {
                          label: "Contact Number",
                          name: "contact_number",
                          type: "text",
                          placeholder: "Contact Number",
                        },
                        // {
                        //   label: "terms",
                        //   name: "terms",
                        //   type: "text",
                        //   placeholder: "terms",
                        // },
                      ].map((item) => (
                        <div key={item.name}>
                          <label className="text-center uppercase block mb-2 text-sm font-medium text-gray-700">
                            {item.label}
                          </label>
                          {item.type === "select" ? (
                            <Field
                              as="select"
                              name="project"
                              className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                              // onChange={(e) => {
                              //   setSelectedProject(e.target.value);
                              //   setFieldValue("project", e.target.value);
                              // }}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const selectedId = e.target.value;
                                setSelectedProject(selectedId);
                                setFieldValue("project", selectedId);

                                const selectedVendor = projects?.find(
                                  (proj) => proj.id.toString() === selectedId
                                );

                                if (selectedVendor) {
                                  setFieldValue(
                                    "address",
                                    selectedVendor.address || ""
                                  );
                                  setFieldValue(
                                    "tin",
                                    selectedVendor.tin || ""
                                  );
                                  setFieldValue(
                                    "contact_number",
                                    selectedVendor.contact_number || ""
                                  );
                                }
                              }}
                            >
                              <option value="">Select a Project</option>
                              {projects?.map((project) => (
                                <option key={project.id} value={project.id}>
                                  {project.vendor}
                                </option>
                              ))}
                            </Field>
                          ) : (
                            <Field
                              type={item.type}
                              name={item.name}
                              placeholder={item.placeholder}
                              className="bg-gray-50 hover:cursor-not-allowed dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                              required
                            />
                          )}
                        </div>
                      ))}
                      <div className="">
                        <label className="uppercase text-center block mb-2 text-sm font-medium text-gray-700">
                          Terms & Conditions
                        </label>
                        <Field
                          type="text"
                          name="terms"
                          className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                          placeholder="Enter terms and conditions for this quotation"
                        />
                      </div>
                    </div>
                  </div>
                }
                {/* Terms & Conditions */}
                {/* <div className="mt-1 mb-2">
                  <h4 className="font-semibold">Terms & Conditions</h4>
                  <Field
                    as="textarea"
                    name="terms"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:text-white mt-2"
                    placeholder="Enter terms and conditions for this quotation"
                  />
                </div> */}

                {/* Table for Adding Expenses */}
                <div className="space-y-1">
                  {/* <h4 className="font-semibold">Expenses</h4> */}
                  <FieldArray
                    name="tableRows"
                    render={(arrayHelpers) => (
                      <>
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({
                                item: "",
                                description: "",
                                srp: "",
                                quantity: "",
                                total: 0,
                              })
                            }
                            className="btn bg-white mt-5 text-black border border-black  uppercase mb-2"
                          >
                            Add Row
                          </button>
                        </>
                        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                          <table
                            style={{ width: "100%" }}
                            className="table table-xs w-full border border-gray-200 rounded-lg shadow-lg"
                          >
                            <thead className="bg-white text-black  border-b-gray-400">
                              <tr className="text-sm font-medium text-center uppercase">
                                {[
                                  "# ITEM",
                                  "Description",
                                  "Unit price",
                                  "Quantity",
                                  "Total",
                                ].map((header) => (
                                  <th key={header} className="p-2 text-center ">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {values.tableRows.map((row, index) => (
                                <tr key={index}>
                                  <td className="p-2">
                                    <Field
                                      type="text"
                                      name={`tableRows[${index}].item`}
                                      className="text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                                    />
                                  </td>
                                  <td className="p-2">
                                    <Field
                                      type="text"
                                      name={`tableRows[${index}].description`}
                                      className="text-center w-full text-xs border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                                    />
                                  </td>
                                  <td className="p-2">
                                    <Field
                                      type="number"
                                      name={`tableRows[${index}].srp`}
                                      className=" text-center w-full text-xs border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        const srp = parseFloat(
                                          e.target.value || ""
                                        );
                                        const quantity =
                                          values.tableRows[index].quantity || 0;
                                        const total = srp * quantity;

                                        // Update the srp and total in the form state
                                        setFieldValue(
                                          `tableRows[${index}].srp`,
                                          srp
                                        );
                                        setFieldValue(
                                          `tableRows[${index}].total`,
                                          total
                                        );
                                      }}
                                    />
                                  </td>
                                  <td className="p-2">
                                    <Field
                                      type="number"
                                      name={`tableRows[${index}].quantity`}
                                      className="text-center w-full text-xs border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        const quantity =
                                          parseFloat(e.target.value) || 0;
                                        const srp =
                                          values.tableRows[index].srp || 0;
                                        const total = srp * quantity;

                                        // Update the quantity and total in the form state
                                        setFieldValue(
                                          `tableRows[${index}].quantity`,
                                          quantity
                                        );
                                        setFieldValue(
                                          `tableRows[${index}].total`,
                                          total
                                        );
                                      }}
                                    />
                                  </td>
                                  <td className="p-2">
                                    <Field
                                      type="number"
                                      name={`tableRows[${index}].total`}
                                      readOnly
                                      className="text-center w-full text-xs border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                                    />
                                  </td>
                                  <td className="p-2 flex justify-center">
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      // className="btn btn-danger"
                                      className="hover:underline hover:cursor-pointer flex justify-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {/* <button
          type="button"
          onClick={() =>
            arrayHelpers.push({
              item: "",
              description: "",
              srp: "",
              quantity: "",
              total: 0,
            })
          }
          className="btn bg-white text-black border border-black mt-2 uppercase mb-2"
        >
          Add Row
        </button> */}
                          <div className="flex justify-between py-2 gap-2 border-gray-300">
                            <div className="ml-auto flex w-full gap-2">
                              {/* <button
      type="button"
      onClick={() =>
        arrayHelpers.push({
          item: "",
          description: "",
          srp: "",
          quantity: "",
          total: 0,
        })
      }
      className="btn bg-white mt-5 text-black border border-black  uppercase mb-2"
    >
      Add Row
    </button> */}
                              {/* <div className="">
                              <label className="font-semibold">Discount</label>
                              <Field
                                type="number"
                                name="discount"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-dark dark:text-white"
                                onChange={(e) => {
                                  const discount =
                                    parseFloat(e.target.value) || 0;
                                  setFieldValue("discount", discount);
                                }}
                              />
                            </div>

                            <div className="">
                              <label className="font-semibold">VAT (%)</label>
                              <Field
                                type="number"
                                name="vat"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-dark dark:text-white"
                                onChange={(e) => {
                                  const vat = parseFloat(e.target.value);
                                  setFieldValue("vat", vat);
                                }}
                              />
                            </div>

                            <div className="">
                              <label className="font-semibold">Sub Total</label>
                              <input
                                type="number"
                                value={totalExpenses}
                                readOnly
                                className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                              />
                            </div>

                            <div className="">
                              <label className="font-semibold">VAT Value</label>
                              <input
                                type="number"
                                value={(() => {
                                  const vat =
                                    (parseFloat(values.vat) || 0) / 100;
                                  return totalExpenses * vat;
                                })()}
                                readOnly
                                className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                              />
                            </div>
                            <div className="">
                              <label className="font-semibold">
                                Grand Total
                              </label>
                              <input
                                type="number"
                                value={(() => {
                                  const discountAmount =
                                    totalExpenses * (values.discount / 100) ||
                                    0;
                                  const vatAmount =
                                    totalExpenses * (values.vat / 100) || 0;
                                  return (
                                    totalExpenses - discountAmount + vatAmount
                                  );
                                })()}
                                readOnly
                                className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                              />
                            </div> */}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>

                {/* Total Row */}
                <div className="flex justify-between py-2 border-t border-gray-300">
                  <div className="ml-auto flex space-x-4 w-full">
                    <div className="flex flex-col w-1/4">
                      <label className="font-semibold">Discount</label>
                      <Field
                        type="number"
                        name="discount"
                        className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const discount = parseFloat(e.target.value) || 0;
                          setFieldValue("discount", discount);
                        }}
                      />
                    </div>

                    <div className="flex flex-col w-1/4">
                      <label className="font-semibold">VAT (%)</label>
                      <Field
                        type="number"
                        name="vat"
                        className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const vat = parseFloat(e.target.value);
                          setFieldValue("vat", vat);
                        }}
                      />
                    </div>

                    <div className="flex flex-col w-1/4">
                      <label className="font-semibold">Sub Total</label>
                      <input
                        type="number"
                        value={totalExpenses}
                        readOnly
                        className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      />
                    </div>

                    <div className="flex flex-col w-1/4">
                      <label className="font-semibold">VAT Value</label>
                      <input
                        type="number"
                        value={(() => {
                          const vat = (values.vat || 0) / 100;
                          return totalExpenses * vat;
                        })()}
                        readOnly
                        className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      />
                    </div>
                    <div className="flex flex-col w-1/4">
                      <label className="font-semibold">Grand Total</label>
                      <input
                        type="number"
                        value={(() => {
                          const discountAmount =
                            totalExpenses * (values.discount / 100) || 0;
                          const vatAmount =
                            totalExpenses * (values.vat / 100) || 0;
                          return totalExpenses - discountAmount + vatAmount;
                        })()}
                        readOnly
                        className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between py-2 border-t border-gray-300">
                  <div className="ml-auto flex space-x-4 w-full">
                    {/* Grand Total */}
                    {/* <div className="flex flex-col w-1/4">
                              <label className="font-semibold">Grand Total</label>
                              <input
                                type="number"
                                value={(() => {
                                  const discountAmount =
                                    totalExpenses * (values.discount / 100) || 0;
                                  const vatAmount =
                                    totalExpenses * (values.vat / 100) || 0;
                                  return totalExpenses - discountAmount + vatAmount;
                                })()}
                                readOnly
                                className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                              />
                            </div> */}
                  </div>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="modal-action">
                  {/* <button type="submit" className="btn uppercase">
                  Submit
                </button> */}
                  {/* <button
                  type="button"
                  className="btn"
                  onClick={() => setShowRegisterModal(false)}
                >
                  Cancel
                </button> */}
                  <Link
                    className="btn text-black uppercase"
                    href="/erp-v2/purchase-order"
                  >
                    {" "}
                    back
                  </Link>
                  <button type="submit" className="btn uppercase">
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default AddPurchase;
