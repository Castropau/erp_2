"use client";
import { fetchCategory } from "@/api/delivery_receipt/fetchCategory";
import { fetchItemDataById } from "@/api/product_master_list/fetchItemId";
import { fetchVendorList } from "@/api/product_master_list/fetchVendor";
import { UpdateView, updateView } from "@/api/product_master_list/updateItem";
import NotFound from "@/components/Error/NotFound";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, FieldProps } from "formik";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Update = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const id = pathname?.split("/").pop();
  // const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: updateItem } = useMutation({
    mutationFn: (data: UpdateView) => updateView(id as string, data),
    onSuccess: () => {
      console.log("delivery updated successfully");
      queryClient.invalidateQueries({ queryKey: ["delivery", id] });
      //   setShowRegisterModal(false); // Close the modal after successful update
    },
    onError: (error) => {
      console.error("Error updating quotation:", error);
    },
  });
  const {
    // isLoading: DisLoading,
    // error: Derror,
    data: vendorList,
  } = useQuery({
    queryKey: ["vendor"],
    queryFn: fetchVendorList,
  });
  const {
    data: ItemData,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItemDataById(id as string),
    enabled: !!id,
  });
  const { data: CategoryData } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });

  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  if (userError) {
    return <NotFound />;
  }
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
          <span>Updated successfully!</span>
        </div>
      )}
      <Formik
        enableReinitialize
        initialValues={{
          vendor: ItemData?.vendor || "",
          category: ItemData?.category || "",
          item: ItemData?.item || "",
          brand: ItemData?.brand || "",
          model: ItemData?.model || "",
          unit_of_measurement: ItemData?.unit_of_measurement || "",
          unit_price: ItemData?.unit_price || 0,
          srp: ItemData?.srp || 0,
          vat_percentage: ItemData?.vat_percentage || 0,
          // vat_exempt: ItemData?.vat_exempt || false,
          vat_exempt: ItemData?.vat_exempt || false,
          description: ItemData?.description || "",
          // vat_checked: ItemData?.vat_exempt || false,
        }}
        // onSubmit={async (values, { resetForm, setSubmitting }) => {
        //   // Construct correct payload for submission
        //   const payload = {
        //     ...values,
        //     unit_price: values.unit_price,
        //     srp: values.srp,
        //     vat_percentage: values.vat_percentage,
        //     // vat_exempt: values.vat_exempt, // reverse logic from checkbox
        //     vat_exempt: values.vat_exempt,
        //   };

        //   // updateItem(payload); // send to API
        //   // resetForm();
        //   // console.log(payload);
        //   try {
        //     await updateItem(payload);
        //     // setIsEditing(false);
        //     setShowSuccess(true); // Show the success alert

        //     setTimeout(() => {
        //       window.location.href = "/erp-v2/product_master_list/"; // 🔁 Redirect to dashboard
        //     }, 2000);
        //   } catch (error) {
        //     console.error("Submission failed:", error);
        //   } finally {
        //     setSubmitting(false);
        //   }
        //   resetForm();
        // }}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = {
            ...values,
            unit_price: values.unit_price,
            srp: values.srp,
            vat_percentage: values.vat_percentage,
            vat_exempt: values.vat_exempt,
          };

          try {
            await updateItem(payload); // send update

            // ✅ Refetch updated item
            await queryClient.invalidateQueries({ queryKey: ["item", id] });

            setShowSuccess(true);

            setTimeout(() => {
              window.location.href = "/erp-v2/product_master_list/";
            }, 2000);
          } catch (error) {
            console.error("Submission failed:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({}) => (
          <Form className="py-1">
            <Link
              className="btn text-black uppercase"
              href="/erp-v2/product_master_list"
            >
              back to product master list
            </Link>
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 text-start">
                          <div className="grid grid-cols-2 gap-1 uppercase "> */}
            <div className="grid grid-cols-1 lg:grid-cols-1">
              <div className="grid grid-cols-1  md:grid-cols-5 gap-1 uppercase">
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
                    type: "select",
                    name: "category",
                    label: "Category",
                    placeholder: "Enter category",
                    // datalistId: "category-list",
                    // options: ["Category A", "Category B", "Category C"],
                    options:
                      CategoryData?.map((user) => ({
                        value: user.id.toString(),
                        label: user.category,
                      })) || [],
                  },
                  {
                    type: "text",
                    name: "vat_percentage",
                    label: "VAT (%)",
                    placeholder: "Enter VAT percentage",
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
                    type: "textarea",
                    name: "description",
                    label: "Description",
                    placeholder: "Enter role details or any comments here...",
                  },
                  // {
                  //   type: "text",
                  //   name: "vat_percentage",
                  //   label: "VAT (%)",
                  //   placeholder: "Enter VAT percentage",
                  // },
                ].map((item) => {
                  if (item.name === "vendor") {
                    return (
                      <div key={item.name} className="mb-1">
                        <label
                          htmlFor={item.name}
                          className="block text-sm font-bold "
                        >
                          {item.label}
                        </label>
                        <Field
                          as="select"
                          id={item.name}
                          name={item.name}
                          className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        >
                          <option value="">Select a vendor</option>
                          {vendorList?.map((vendor) => (
                            <option key={vendor.id} value={vendor.vendor}>
                              {vendor.vendor}
                            </option>
                          ))}
                        </Field>
                      </div>
                    );
                  }
                  if (item.name === "category") {
                    return (
                      <div key={item.name} className="mb-1">
                        <label
                          htmlFor={item.name}
                          className="block text-sm font-bold "
                        >
                          {item.label}
                        </label>
                        <Field
                          as="select"
                          id={item.name}
                          name={item.name}
                          className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        >
                          <option value="">Select a vendor</option>
                          {CategoryData?.map((vendor) => (
                            <option key={vendor.id} value={vendor.category}>
                              {vendor.category}
                            </option>
                          ))}
                        </Field>
                      </div>
                    );
                  }

                  return (
                    <div key={item.name} className="mb-1">
                      <label
                        htmlFor={item.name}
                        className="block text-sm font-bold "
                      >
                        {item.label}
                      </label>
                      <Field
                        type={item.type}
                        id={item.name}
                        name={item.name}
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        placeholder={item.placeholder}
                        // list={item.datalistId}
                      />
                      {/* {item.datalistId && (
                        <datalist id={item.datalistId}>
                          {item.options?.map((option, i) => (
                            <option key={i} value={option} />
                          ))}
                        </datalist>
                      )} */}
                    </div>
                  );
                })}

                {/* ✅ VAT Checkbox */}
                <div className="mt-3 flex items-center gap-2">
                  <Field name="vat_exempt">
                    {/* {({ field, form }) => ( */}
                    {({ field, form }: FieldProps) => (
                      <input
                        type="checkbox"
                        id="vat_exempt"
                        name="vat_exempt"
                        className="checkbox border-gray-300 dark:border-gray-600 dark:bg-gray-800  dark:checked:bg-white"
                        checked={field.value} // Ensures the checkbox is checked if vat_exempt is true
                        onChange={(e) => {
                          form.setFieldValue("vat_exempt", e.target.checked); // Update the value based on whether it's checked or not
                        }}
                      />
                    )}
                  </Field>
                  <label htmlFor="vat_exempt" className="text-sm font-medium ">
                    Apply VAT
                  </label>
                </div>
              </div>

              {/* Right Column - Table */}
              {/* <div className="lg:ml-4">
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
                          </div> */}
            </div>

            {/* Form Fields */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
                          <div className="grid grid-cols-1 gap-6 "> */}
            {/* <div className="grid grid-cols-1 gap-1">
              <div className="w-full">
                {[
                  {
                    type: "textarea",
                    name: "description",
                    label: "Description",
                    placeholder: "Enter role details or any comments here...",
                  },
                ].map((item) => (
                  <div key={item.name} className="mb-4">
                    <label
                      htmlFor={item.name}
                      className="block text-sm font-bold uppercase "
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
            </div> */}
            <div className="lg:ml-4">
              <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
                <table className="table table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
                  <thead className="bg-white text-black  border-b-gray-400">
                    <tr className="text-sm font-medium text-center uppercase">
                      <th className=" px-4 py-2">Created By</th>
                      <th className=" px-4 py-2">Date Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className=" text-xs text-center">
                        {ItemData?.created_by || "N/A"}
                      </td>
                      <td className=" text-xs text-center">
                        {ItemData?.date_created || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-action">
              {/* <button type="submit" className="btn uppercase">
                Update
              </button> */}
              {/* <button
                className="btn"
                onClick={() => setShowRegisterModal(false)}
              >
                Close
              </button> */}
              <Link
                className="btn text-black uppercase"
                href="/erp-v2/product_master_list"
              >
                back
              </Link>
              <button type="submit" className="btn uppercase">
                update
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Update;
