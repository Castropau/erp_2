"use client";
import {
  CreateInventories,
  CreateInventory,
} from "@/api/inventory/CreateInventory";
import { FetchCategories } from "@/api/inventory/FetchCategory";
import { FetchItemInventory } from "@/api/inventory/fetchItemNumber";
import { AllLocation } from "@/api/inventory/fetchLocations";
import { FetchItems } from "@/api/inventory/Items";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";

const AddInventory = () => {
  const queryClient = useQueryClient();
  // const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // New state to track edit mode

  const {
    mutate: createCategory,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (data: CreateInventories) => CreateInventory(data),
    onSuccess: () => {
      console.log("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      // setShowCategoryModal(false);
    },
    onError: (error: any) => {
      console.error("Error creating category:", error);
    },
  });

  const {
    // isLoading: itemLoading,
    // error: itemError,
    // data: itemList,
  } = useQuery({
    queryKey: ["items"],
    queryFn: FetchItems,
  });

  const {
    // isLoading: locationLoading,
    // error: locationError,
    data: locationList,
  } = useQuery({
    queryKey: ["location"],
    queryFn: AllLocation,
  });

  const {
    // isLoading: isCategoriesLoading,
    // error: categoriesError,
    data: categoriesData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: FetchCategories,
  });

  const {
    // isLoading: isItemLoading,
    // error: errors,
    data: itemData,
  } = useQuery({
    queryKey: ["item_no"],
    queryFn: FetchItemInventory,
  });
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
      <Link className="btn uppercase text-black" href="/erp-v2/inventory">
        back to inventory
      </Link>
      <Formik
        initialValues={{
          item: "",
          brand: "",
          serial: "",
          model: "",
          specification: "",
          unit_of_measurement: "",
          srp: 0,
          quantity: 0,
          description: "",
          item_reference: 0,
          location: 0,
          category: 0,
        }}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.item_reference)
            errors.item_reference = "This field is required";
          if (!values.item) errors.item = "This field is required";
          if (!values.location) errors.location = "This field is required";
          if (!values.category) errors.category = "This field is required";
          return errors;
        }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          // createCategory(values);
          // resetForm();
          try {
            await createCategory(values);
            console.log(values);

            // setIsEditing(false);
            setShowSuccess(true); // Show the success alert

            setTimeout(() => {
              window.location.href = "/erp-v2/inventory/"; // 🔁 Redirect to dashboard
            }, 2000);
          } catch (error) {
            console.error("Submission failed:", error);
          } finally {
            setSubmitting(false);
          }
          resetForm();
        }}
      >
        <>
          {/* <AutoFillFields itemData={itemData} /> */}

          <Form className="py-1">
            <div className="grid grid-cols-1 gap-6 uppercase text-center">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {/* <h2 className="font-bold text-lg">
                              Category Information
                            </h2> */}

                <div className="mb-1">
                  <label
                    htmlFor="item_reference"
                    className="block text-sm font-bold"
                  >
                    Item Reference
                  </label>
                  <Field
                    as="select"
                    id="item_reference"
                    name="item_reference"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    required
                  >
                    <option value="">Select an item reference</option>
                    {itemData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.item_no}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="mb-1">
                  <label htmlFor="item" className="block text-sm font-bold">
                    Item Name
                  </label>
                  <Field
                    type="text"
                    id="item"
                    name="item"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    required
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="brand" className="block text-sm font-bold">
                    Brand
                  </label>
                  <Field
                    type="text"
                    id="brand"
                    name="brand"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="serial" className="block text-sm font-bold">
                    Serial Number
                  </label>
                  <Field
                    type="text"
                    id="serial"
                    name="serial"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="model" className="block text-sm font-bold">
                    Model
                  </label>
                  <Field
                    type="text"
                    id="model"
                    name="model"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  />
                </div>

                <div className="mb-1">
                  <label
                    htmlFor="specification"
                    className="block text-sm font-bold"
                  >
                    Specification
                  </label>
                  <Field
                    type="text"
                    id="specification"
                    name="specification"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  />
                </div>

                <div className="mb-1">
                  <label
                    htmlFor="unit_of_measurement"
                    className="block text-sm font-bold"
                  >
                    Unit of Measurement
                  </label>
                  <Field
                    type="text"
                    id="unit_of_measurement"
                    name="unit_of_measurement"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="srp" className="block text-sm font-bold">
                    SRP (Suggested Retail Price)
                  </label>
                  <Field
                    type="text"
                    id="srp"
                    name="srp"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="quantity" className="block text-sm font-bold">
                    Quantity
                  </label>
                  <Field
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  />
                </div>

                <div className="mb-1">
                  <label
                    htmlFor="description"
                    className="block text-sm font-bold"
                  >
                    Description
                  </label>
                  <Field
                    type="text"
                    id="description"
                    name="description"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="location" className="block text-sm font-bold">
                    Location
                  </label>
                  <Field
                    as="select"
                    id="location"
                    name="location"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    required
                  >
                    <option value="">Select a location</option>
                    {locationList?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.location}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-bold">
                    Category Name
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    required
                  >
                    <option value="">Select a category</option>
                    {categoriesData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.category}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </Form>
        </>
      </Formik>
    </div>
  );
};

export default AddInventory;
