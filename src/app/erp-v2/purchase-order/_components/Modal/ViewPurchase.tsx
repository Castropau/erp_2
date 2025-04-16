"use client";

import React, { useState } from "react";
import { FaEdit, FaBan } from "react-icons/fa";
import { Field, Form, Formik, FieldArray } from "formik";
import { CiCirclePlus } from "react-icons/ci";

/** api */
import { CreateCategory } from "@/api/inventory/CreateCategory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/** interfaces */
import { fetchDepartmentsList } from "@/api/User/fetchDepartmentList";
import { fetchUserList } from "@/api/User/fetchUserList";
import { fetchPurchaseId } from "@/api/purchase-order/fetchPurchaseId";
import { fetchVendorsList } from "@/api/vendor/fetchVendor";
import { updateView, UpdateView } from "@/api/purchase-order/updatePurchase";
interface PurchaseId {
  id: number;
}

export default function ViewPurchase(props: PurchaseId) {
  const { id } = props;
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [isEditMode, setIsEditMode] = useState(false); // New state to toggle between edit and view mode
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

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
  const {
    data: PurchaseData,
    isLoading: Rloading,
    isError: ReceiptError,
    error: rerror,
  } = useQuery({
    queryKey: ["purchase", id],
    queryFn: () => fetchPurchaseId(id),
    enabled: !!id,
  });
  // Fetch project data based on dropdown selection
  const { data: projects } = useQuery({
    queryKey: ["vendor"],
    queryFn: fetchVendorsList, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });

  // Fetch user list for 'remittedBy' dropdown
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserList, // Assume fetchUserList is an API call to fetch users
  });

  const { mutate: updatePurchase } = useMutation({
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
          Add Purchase Order
        </button>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-7xl relative">
            <h3 className="font-bold text-lg">View Purchase Order</h3>
            {/* Edit Icon */}
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="absolute top-4 right-4"
              aria-label={isEditMode ? "Disable Editing" : "Enable Editing"}
            >
              {isEditMode ? (
                <FaBan className="text-red-500 w-6 h-6" />
              ) : (
                <FaEdit className="text-blue-500 w-6 h-6" />
              )}
            </button>

            <Formik
              initialValues={{
                project: PurchaseData?.to_vendor?.vendor || "",

                address: PurchaseData?.to_vendor?.address || "",
                contact_number: PurchaseData?.to_vendor?.contact_number || "",
                tin: PurchaseData?.to_vendor?.tin || "",
                vendor: PurchaseData?.to_vendor.id || "",
                terms: PurchaseData?.terms || "",
                discount: PurchaseData?.discount || 0,
                vat: PurchaseData?.vat_percentage || 0,
                sub_total: PurchaseData?.sub_total || "",
                tableRows: PurchaseData?.items || [
                  {
                    item: "",
                    description: "",
                    unit_price: "",
                    quantity: "",
                  },
                ],
                notesRows: [{ note: "" }],
              }}
              enableReinitialize={true}
              onSubmit={(values) => {
                const updatedData = {
                  id,
                  vendor: values.vendor,
                  project: values.project,
                  address: values.address,
                  tin: values.tin,
                  terms: values.terms,
                  contact_number: values.contact_number,
                  items: values.tableRows.map((item) => ({
                    ...item,
                    unit_price: parseFloat(item.unit_price),
                    quantity: parseFloat(item.quantity),
                  })),
                };

                updateView(id, updatedData)
                  .then((res) => {
                    console.log("Successfully updated:", res);
                    setShowRegisterModal(false); // Close modal
                  })
                  .catch((err) => {
                    console.error("Update failed:", err);
                  });

                console.log("Updated data to send:", updatedData);
              }}
            >
              {({ values, setFieldValue }) => {
                // Calculate total expenses and cash from accounting
                const totalExpenses = values.tableRows.reduce(
                  (acc, row) =>
                    acc + (parseFloat(row.srp) * parseFloat(row.quantity) || 0),
                  0
                );
                const totalCashFromAccounting = values.tableRows.reduce(
                  (acc, row) => acc + (parseFloat(row.balance) || 0),
                  0
                );
                const totalCashFromBalance = values.tableRows.reduce(
                  (acc, row) => acc + (parseFloat(row.balance) || 0),
                  0
                );

                return (
                  <Form className="py-4">
                    {/* Dropdown for Project Selection */}
                    {!isEditMode && (
                      <div className="space-y-4 mt-4">
                        {[
                          {
                            label: "Vendor",
                            name: "project",
                          },
                          {
                            label: "Address",
                            name: "address",
                          },
                          {
                            label: "Contact Number",
                            name: "contact_number",
                          },
                        ].map((item) => (
                          <div key={item.name}>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                              {item.label}
                            </label>
                            <Field
                              type="text"
                              name={item.name}
                              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              disabled={!isEditMode} // Disable when not in edit mode
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-6">
                      <h4 className="font-semibold">Terms & Conditions</h4>
                      <Field
                        as="textarea"
                        name="terms"
                        disabled={!isEditMode}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2"
                        placeholder="Enter terms and conditions for this quotation"
                      />
                    </div>

                    {isEditMode && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Company
                        </label>
                        <Field
                          as="select"
                          name="vendor"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          disabled={!isEditMode} // Disable when not in edit mode
                          onChange={(e) => {
                            const vendorId = e.target.value;
                            setSelectedProject(vendorId);
                            setFieldValue("project", vendorId);

                            // Find vendor info based on selected value
                            const selected = projects?.find(
                              (v) => v.id.toString() === vendorId
                            );
                            setSelectedVendor(selected);

                            // Auto-fill address, contact, and tin (assuming those fields exist in vendor)
                            if (selected) {
                              setFieldValue("address", selected.address || "");
                              setFieldValue(
                                "contact_number",
                                selected.contact_number || ""
                              );
                              setFieldValue("tin", selected.tin || ""); // Only if vendor has TIN
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
                      </div>
                    )}

                    {/* Project Details */}
                    {/* {isEditMode && selectedProject && ( */}
                    {isEditMode && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">Project Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {[
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
                                  disabled={!isEditMode} // Disable when not in edit mode
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
                                  disabled={!isEditMode} // Disable when not in edit mode
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
                                    "# ITEM",
                                    "Description",
                                    "Unit price",
                                    "Quantity",
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
                                    <td className="p-2">
                                      <Field
                                        type="text"
                                        name={`tableRows[${index}].item`}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        disabled={!isEditMode} // Disable when not in edit mode
                                      />
                                    </td>
                                    <td className="p-2">
                                      <Field
                                        type="text"
                                        name={`tableRows[${index}].description`}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        disabled={!isEditMode} // Disable when not in edit mode
                                      />
                                    </td>
                                    <td className="p-2">
                                      <Field
                                        type="number"
                                        name={`tableRows[${index}].unit_price`}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        disabled={!isEditMode} // Disable when not in edit mode
                                        onChange={(e) => {
                                          const unit_price =
                                            parseFloat(e.target.value) || 0;
                                          const quantity =
                                            parseFloat(
                                              values.tableRows[index].quantity
                                            ) || 0;
                                          const total = unit_price * quantity;

                                          setFieldValue(
                                            `tableRows[${index}].unit_price`,
                                            unit_price
                                          );
                                          setFieldValue(
                                            `tableRows[${index}].total`,
                                            total
                                          ); // for display only
                                        }}
                                      />
                                    </td>
                                    <td className="p-2">
                                      <Field
                                        type="number"
                                        name={`tableRows[${index}].quantity`}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        onChange={(e) => {
                                          const quantity =
                                            parseFloat(e.target.value) || 0;
                                          const unit_price =
                                            parseFloat(
                                              values.tableRows[index].unit_price
                                            ) || 0;
                                          const total = unit_price * quantity;

                                          setFieldValue(
                                            `tableRows[${index}].quantity`,
                                            quantity
                                          );
                                          setFieldValue(
                                            `tableRows[${index}].total`,
                                            total
                                          ); // for display only
                                        }}
                                      />
                                    </td>
                                    <td className="p-2">
                                      <Field
                                        type="number"
                                        name={`tableRows[${index}].total`}
                                        readOnly
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                      />
                                    </td>
                                    <td className="p-2">
                                      {isEditMode && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                          className="btn btn-danger"
                                        >
                                          Remove
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {isEditMode && (
                              <button
                                type="button"
                                onClick={() =>
                                  arrayHelpers.push({
                                    item: "",
                                    particulars: "",
                                    srp: "",
                                    quantity: "",
                                    total: 0,
                                  })
                                }
                                className="btn btn-info mt-4"
                                disabled={!isEditMode} // Disable when not in edit mode
                              >
                                Add Row
                              </button>
                            )}
                          </div>
                        )}
                      />
                    </div>

                    <div className="flex justify-between py-2 border-t border-gray-300">
                      <div className="ml-auto flex space-x-4 w-full">
                        {/* Discount Input */}
                        <div className="flex flex-col w-1/4">
                          <label className="font-semibold">Discount</label>
                          <Field
                            type="number"
                            name="discount"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            onChange={(e) => {
                              const discount = parseFloat(e.target.value) || 0;
                              setFieldValue("discount", discount);
                            }}
                            disabled={!isEditMode}
                          />
                        </div>

                        {/* VAT Input */}
                        <div className="flex flex-col w-1/4">
                          <label className="font-semibold">VAT (%)</label>
                          <Field
                            type="number"
                            name="vat"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            onChange={(e) => {
                              const vat = parseFloat(e.target.value);
                              setFieldValue("vat", vat);
                            }}
                            disabled={!isEditMode}
                          />
                        </div>

                        {/* Sub Total */}
                        <div className="flex flex-col w-1/4">
                          <label className="font-semibold">Sub Total</label>
                          <input
                            type="text"
                            name="sub_total"
                            value={PurchaseData?.sub_total}
                            readOnly
                            className="bg-gray-200 p-2 rounded-md w-full"
                            disabled={!isEditMode}
                          />
                        </div>

                        {/* VAT Value */}
                        <div className="flex flex-col w-1/4">
                          <label className="font-semibold">VAT Value</label>
                          <input
                            type="number"
                            value={(() => {
                              const vatPercentage =
                                (parseFloat(values.vat) || 0) / 100;
                              return totalExpenses * vatPercentage;
                            })()}
                            readOnly
                            className="bg-gray-200 p-2 rounded-md w-full"
                            disabled={!isEditMode}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Grand Total */}
                    <div className="flex justify-between py-2 border-t border-gray-300">
                      <div className="ml-auto flex space-x-4 w-full">
                        {/* Grand Total */}
                        <div className="flex flex-col w-1/4">
                          <label className="font-semibold">Grand Total</label>
                          <input
                            type="number"
                            // value={(() => {
                            //   const discountAmount =
                            //     totalExpenses * (values.discount / 100) || 0;
                            //   const vatAmount =
                            //     totalExpenses * (values.vat / 100) || 0;
                            //   return totalExpenses - discountAmount + vatAmount;
                            // })()}
                            value={PurchaseData?.grand_total}
                            readOnly
                            className="bg-gray-200 p-2 rounded-md w-full"
                            disabled={!isEditMode}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="modal-action">
                      {isEditMode ? (
                        <>
                          <button type="submit" className="btn">
                            Update
                          </button>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => setShowRegisterModal(false)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="btn"
                          onClick={() => setShowRegisterModal(false)}
                        >
                          Cancel
                        </button>
                      )}
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
