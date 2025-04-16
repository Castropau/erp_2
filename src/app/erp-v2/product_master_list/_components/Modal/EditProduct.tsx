"use client";

import React, { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

/** components */
import { FaCirclePlus } from "react-icons/fa6";

/** api */
import { registerUser } from "@/api/User/registerUser";

/** interfaces */
import { RegisterEmployee } from "@/interfaces/RegisterEmployee";
import { Field, Form, Formik } from "formik";
// import { fetchDepartmentsList } from "@/api/User/fetchDepartmentList";
import { fetchRoleList } from "@/api/User/fetchRoleList";
import { fetchItemDataById } from "@/api/product_master_list/fetchItemId";
import { updateView, UpdateView } from "@/api/product_master_list/updateItem";
import { fetchVendorList } from "@/api/product_master_list/fetchVendor";
interface ProductId {
  id: number;
}
export default function EditProduct(props: ProductId) {
  const { id } = props;
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const queryClient = useQueryClient();
  const {
    data: ItemData,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItemDataById(id),
    enabled: !!id,
  });

  const { mutate: updateItem } = useMutation({
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

  const {
    isLoading: DisLoading,
    error: Derror,
    data: vendorList,
  } = useQuery({
    queryKey: ["vendor"],
    queryFn: fetchVendorList,
  });

  const { data: RoleList } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoleList,
  });

  if (DisLoading) return <div>Loading...</div>;
  if (Derror instanceof Error)
    return <div>An error has occurred: {Derror.message}</div>;
  if (isUserLoading) return <div>Loading item data...</div>;
  if (userError) return <div>Error loading item: {userError.message}</div>;

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-info"
          onClick={() => setShowRegisterModal(true)}
        >
          <FaCirclePlus className="w-6 h-6 btn-info" />
          Edit
        </button>
      </div>
      <div>
        {/* Registration Modal */}
        {showRegisterModal && (
          <dialog open className="modal">
            <div className="modal-box w-11/12 max-w-7xl">
              <h3 className="font-bold text-lg">Edit</h3>
              <Formik
                enableReinitialize
                initialValues={{
                  vendor: ItemData?.vendor || "",
                  category: ItemData?.category || "",
                  item: ItemData?.item || "",
                  brand: ItemData?.brand || "",
                  model: ItemData?.model || "",
                  unit_of_measurement: ItemData?.unit_of_measurement || "",
                  unit_price: ItemData?.unit_price?.toString() || "",
                  srp: ItemData?.srp?.toString() || "",
                  vat_percentage: ItemData?.vat_percentage?.toString() || "",
                  // vat_exempt: ItemData?.vat_exempt || false,
                  vat_exempt: ItemData?.vat_exempt || false,
                  description: ItemData?.description || "",
                  // vat_checked: ItemData?.vat_exempt || false,
                }}
                onSubmit={(values, { resetForm }) => {
                  // Construct correct payload for submission
                  const payload = {
                    ...values,
                    unit_price: parseFloat(values.unit_price),
                    srp: parseFloat(values.srp),
                    vat_percentage: parseFloat(values.vat_percentage),
                    // vat_exempt: values.vat_exempt, // reverse logic from checkbox
                    vat_exempt: values.vat_exempt,
                  };

                  updateItem(payload); // send to API
                  resetForm();
                  console.log(payload);
                }}
              >
                {({ values }) => (
                  <Form className="py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="grid grid-cols-2 gap-6">
                        {[
                          {
                            type: "text",
                            name: "item",
                            label: "Item Name",
                            placeholder: "Enter item name",
                          },
                          {
                            name: "vendor",
                            label: "Vendor",
                            placeholder: "Select a vendor",
                          },
                          {
                            type: "text",
                            name: "model",
                            label: "Model",
                            placeholder: "Enter model",
                          },
                          {
                            type: "text",
                            name: "category",
                            label: "Category",
                            placeholder: "Enter category",
                            datalistId: "category-list",
                            options: ["Category A", "Category B", "Category C"],
                          },
                          {
                            type: "text",
                            name: "brand",
                            label: "Brand",
                            placeholder: "Enter brand",
                          },
                          {
                            type: "text",
                            name: "srp",
                            label: "SRP",
                            placeholder: "Enter SRP",
                          },
                          {
                            type: "text",
                            name: "unit_price",
                            label: "Unit Price",
                            placeholder: "Enter unit price",
                          },
                          {
                            type: "text",
                            name: "vat_percentage",
                            label: "VAT (%)",
                            placeholder: "Enter VAT percentage",
                          },
                        ].map((item) => {
                          if (item.name === "vendor") {
                            return (
                              <div key={item.name} className="mb-4">
                                <label
                                  htmlFor={item.name}
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {item.label}
                                </label>
                                <Field
                                  as="select"
                                  id={item.name}
                                  name={item.name}
                                  className="w-full p-2 border rounded-md"
                                >
                                  <option value="">Select a vendor</option>
                                  {vendorList?.map((vendor) => (
                                    <option
                                      key={vendor.id}
                                      value={vendor.vendor}
                                    >
                                      {vendor.vendor}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            );
                          }

                          return (
                            <div key={item.name} className="mb-4">
                              <label
                                htmlFor={item.name}
                                className="block text-sm font-medium text-gray-700"
                              >
                                {item.label}
                              </label>
                              <Field
                                type={item.type}
                                id={item.name}
                                name={item.name}
                                className="w-full p-2 border rounded-md"
                                placeholder={item.placeholder}
                                list={item.datalistId}
                              />
                              {item.datalistId && (
                                <datalist id={item.datalistId}>
                                  {item.options?.map((option, i) => (
                                    <option key={i} value={option} />
                                  ))}
                                </datalist>
                              )}
                            </div>
                          );
                        })}

                        {/* ✅ VAT Checkbox */}
                        <div className="mb-4 flex items-center gap-2">
                          <Field name="vat_exempt">
                            {({ field, form }) => (
                              <input
                                type="checkbox"
                                id="vat_exempt"
                                name="vat_exempt"
                                className="checkbox"
                                checked={field.value} // Ensures the checkbox is checked if vat_exempt is true
                                onChange={(e) => {
                                  form.setFieldValue(
                                    "vat_exempt",
                                    e.target.checked
                                  ); // Update the value based on whether it's checked or not
                                }}
                              />
                            )}
                          </Field>
                          <label
                            htmlFor="vat_exempt"
                            className="text-sm font-medium text-gray-700"
                          >
                            Apply VAT
                          </label>
                        </div>
                      </div>

                      {/* Right Column - Table */}
                      <div className="lg:ml-4">
                        <div className="space-y-4">
                          <h4 className="font-bold">Table</h4>
                          <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead>
                              <tr>
                                <th className="border border-gray-300 px-4 py-2">
                                  Created By
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  Date Created
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-gray-300 px-4 py-2">
                                  {ItemData?.created_by || "N/A"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {ItemData?.date_created || "N/A"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column - 2 inputs in one line */}
                      <div className="grid grid-cols-1 gap-6">
                        {[
                          {
                            type: "textarea",
                            name: "description",
                            label: "Description",
                            placeholder:
                              "Enter role details or any comments here...",
                          },
                        ].map((item) => (
                          <div key={item.name} className="mb-4">
                            <label
                              htmlFor={item.name}
                              className="block text-sm font-medium text-gray-700"
                            >
                              {item.label}
                            </label>
                            <Field
                              as="textarea"
                              id={item.name}
                              name={item.name}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              placeholder={item.placeholder}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="modal-action">
                      <button type="submit" className="btn">
                        Update
                      </button>
                      <button
                        className="btn"
                        onClick={() => setShowRegisterModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              {/* {isError && (
                <div className="text-red-500 mt-4">
                  <p>Error: {error?.message || "An error occurred"}</p>
                </div>
              )} */}
            </div>
          </dialog>
        )}
      </div>
    </>
  );
}
