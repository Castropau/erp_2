"use client";
import { CreateItem, Item } from "@/api/product_master_list/addItem";
import { fetchCategoryList } from "@/api/product_master_list/fetchCategory";
import { fetchVendorList } from "@/api/product_master_list/fetchVendor";
import { fetchDepartmentsList } from "@/api/User/fetchDepartmentList";
// import { fetchRoleList } from "@/api/User/fetchRoleList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import React, { useState } from "react";

const Add = () => {
  const queryClient = useQueryClient();
  // const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    mutate: registerItem,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (NewItem: Item) => CreateItem(NewItem),
    onSuccess: () => {
      console.log("new registered successfully");
      queryClient.invalidateQueries({ queryKey: ["item"] });
      //   setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
  const {
    // isLoading: DisLoading,
    // error: Derror,
    // data: departmentList,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartmentsList,
  });
  const {
    // isLoading: VendorisLoading,
    // error: Vendorerror,
    data: vendorList,
  } = useQuery({
    queryKey: ["vendor"],
    queryFn: fetchVendorList,
  });

  const {
    // isLoading: Categoryloading,
    // error: Categoryerror,
    data: categoryList,
  } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategoryList,
  });
  // roles
  // const { data: RoleList } = useQuery({
  //   queryKey: ["roles"],
  //   queryFn: fetchRoleList,
  // });
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
      <Formik
        initialValues={{
          vendor: "",
          category: "",
          item: "",
          brand: "",
          model: "",
          unit_of_measurement: "",
          unit_price: 0,
          srp: 0,
          vat_percentage: 0,
          vat_exempted: false,
          description: "",
        }}
        // onSubmit={async (values, { resetForm, setSubmitting }) => {
        //   registerItem({
        //     ...values,
        //     unit_price: values.unit_price,
        //     srp: values.srp,
        //     vat_percentage: values.vat_percentage,
        //     vat_exempt: values.vat_exempted,
        //   });
        //   // resetForm();
        //   // console.log(values);
        //   try {
        //     await registerItem(values);
        //     console.log(values);

        //     setIsEditing(false);
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
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await registerItem({
              ...values,
              unit_price: values.unit_price,
              srp: values.srp,
              vat_percentage: values.vat_percentage,
              vat_exempt: values.vat_exempted,
            });

            console.log("Submitted values:", values);
            // setIsEditing(false);
            setShowSuccess(true);
            setTimeout(() => {
              window.location.href = "/erp-v2/product_master_list/";
            }, 2000);
          } catch (error) {
            console.error("Submission failed:", error);
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="py-1">
            <Link
              className="btn text-black uppercase"
              href="/erp-v2/product_master_list"
            >
              back to product master list
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {/* Left column */}

              {[
                {
                  type: "text",
                  name: "item",
                  placeholder: "Enter item name",
                  label: "Item Name",
                },
                {
                  type: "text",
                  name: "brand",
                  placeholder: "Enter brand",
                  label: "Brand",
                },
                {
                  type: "text",
                  name: "model",
                  placeholder: "Enter model",
                  label: "Model",
                },
                {
                  type: "text",
                  name: "unit_of_measurement",
                  placeholder: "Enter unit of measurement",
                  label: "Unit of Measurement",
                },
                {
                  type: "text",
                  name: "description",
                  placeholder: "Enter your description",
                  label: "Description",
                },
                // ].map((item) => (
                //   <div key={item.name} className="mb-1 uppercase ">
                //     <label
                //       htmlFor={item.name}
                //       className="block text-sm font-bold "
                //     >
                //       {item.label}
                //     </label>
                //     <Field
                //       type={item.type}
                //       id={item.name}
                //       name={item.name}
                //       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                //       placeholder={item.placeholder}
                //     />
                //   </div>
                // ))
              ].map((item) => (
                <div key={item.name} className="mb-1 uppercase">
                  <label
                    htmlFor={item.name}
                    className="block text-sm font-bold text-center"
                  >
                    {item.label}
                  </label>
                  <Field
                    as={item.type === "textarea" ? "textarea" : "input"}
                    type={item.type !== "textarea" ? item.type : undefined}
                    id={item.name}
                    name={item.name}
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    placeholder={item.placeholder}
                  />
                </div>
              ))}

              {/* Right column */}

              {[
                {
                  type: "select",
                  name: "vendor",
                  label: "Vendor",
                  options:
                    vendorList?.map((d) => ({
                      value: d.vendor,
                      label: d.vendor,
                    })) || [],
                },
                {
                  type: "select",
                  name: "category",
                  label: "Category",
                  options:
                    categoryList?.map((r) => ({
                      value: r.category,
                      label: r.category,
                    })) || [],
                },
              ].map((item) => (
                <div key={item.name} className="mb-1 uppercase">
                  <label
                    htmlFor={item.name}
                    className="block text-sm font-bold text-center"
                  >
                    {item.label}
                  </label>
                  <Field
                    as="select"
                    id={item.name}
                    name={item.name}
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  >
                    <option value="">Select {item.label}</option>
                    {item.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>
              ))}

              {/* Price-related fields */}
              {[
                {
                  type: "number",
                  name: "srp",
                  placeholder: "Enter SRP",
                  label: "SRP",
                },
                {
                  type: "number",
                  name: "unit_price",
                  placeholder: "Enter Unit Price",
                  label: "Unit Price",
                },
                {
                  type: "number",
                  name: "vat_percentage",
                  placeholder: "Enter VAT Percentage",
                  label: "VAT %",
                },
              ].map((item) => (
                <div key={item.name} className="mb-1">
                  <label
                    htmlFor={item.name}
                    className="block text-sm font-bold text-center"
                  >
                    {item.label}
                  </label>
                  <Field
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    placeholder={item.placeholder}
                  />
                </div>
              ))}

              {/* VAT Checkbox */}
              <div className="mb-1 flex items-center gap-2 ">
                <input
                  type="checkbox"
                  id="vat_exempted"
                  name="vat_exempted"
                  checked={values.vat_exempted}
                  onChange={(e) =>
                    setFieldValue("vat_exempted", e.target.checked)
                  }
                  className="checkbox border-gray-300 dark:border-gray-600 dark:bg-gray-800  dark:checked:bg-white"
                />
                <label
                  htmlFor="vat_exempted"
                  className="text-sm font-medium text-gray-800 dark:text-white"
                >
                  Apply VAT
                </label>
              </div>
            </div>

            {/* Description */}
            {/* <div className="mb-1">
                            <label
                              htmlFor="description"
                              className="block text-sm font-bold uppercase "
                            >
                              Description
                            </label>
                            <Field
                              as="textarea"
                              id="description"
                              name="description"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              placeholder="Enter your description"
                            />
                          </div> */}

            {/* Actions */}
            <div className="modal-action">
              {/* <button type="submit" className="btn uppercase">
                Submit
              </button> */}
              {/* <button
                type="button"
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
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Add;
