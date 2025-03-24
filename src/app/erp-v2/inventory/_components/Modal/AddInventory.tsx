"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** components */
import { CiCirclePlus } from "react-icons/ci";

/** api */
import { CreateInventory } from "@/api/inventory/CreateInventory"; // Endpoint for creating inventory (can be used for category creation as well)

/** interfaces */
import { CreateInventories } from "@/api/inventory/CreateInventory"; // Interface for CreateInventory payload
import { Field, Form, Formik } from "formik";
import { FetchItems } from "@/api/inventory/Items";

export default function AddCategory() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const queryClient = useQueryClient();

  // Mutation to create an inventory (or category)
  const {
    mutate: createCategory,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: CreateInventories) => CreateInventory(data),
    onSuccess: () => {
      console.log("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      setShowCategoryModal(false);
    },
    onError: (error: any) => {
      console.error("Error creating category:", error);
    },
  });

  // fetch items

  const {
    isLoading: itemLoading,
    error: itemError,
    data: itemList,
  } = useQuery({
    queryKey: ["items"],
    queryFn: FetchItems,
  });

  if (itemLoading) return <div>Loading items...</div>;
  if (itemError instanceof Error)
    return <div>Error loading items: {itemError.message}</div>;

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-info"
          onClick={() => setShowCategoryModal(true)}
        >
          <CiCirclePlus className="w-6 h-6" />
          Add Item
        </button>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-7xl">
            <h3 className="font-bold text-lg">Add Category</h3>
            <Formik
              initialValues={{
                // photos: "",
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
              onSubmit={(values, { resetForm }) => {
                createCategory(values);
                resetForm();
                console.log(values);
              }}
            >
              <Form className="py-4">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    {/* Category Information */}
                    <h2 className="font-bold text-lg">Category Information</h2>
                    <div className="mb-4">
                      <label
                        htmlFor="item_reference"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Item Reference
                      </label>
                      <Field
                        as="select"
                        id="item_reference"
                        name="item_reference"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                      >
                        {/* Render item references as options */}
                        {itemList?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.item}{" "}
                            {/* This will display the item's name */}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="item"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Item Name
                      </label>
                      <Field
                        type="text"
                        id="item"
                        name="item"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter item name"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="brand"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Brand
                      </label>
                      <Field
                        type="text"
                        id="brand"
                        name="brand"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter brand"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="serial"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Serial Number
                      </label>
                      <Field
                        type="text"
                        id="serial"
                        name="serial"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter serial number"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="model"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Model
                      </label>
                      <Field
                        type="text"
                        id="model"
                        name="model"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter model"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="specification"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Specification
                      </label>
                      <Field
                        type="text"
                        id="specification"
                        name="specification"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter specification"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="unit_of_measurement"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Unit of Measurement
                      </label>
                      <Field
                        type="text"
                        id="unit_of_measurement"
                        name="unit_of_measurement"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter unit of measurement"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="srp"
                        className="block text-sm font-medium text-gray-700"
                      >
                        SRP (Suggested Retail Price)
                      </label>
                      <Field
                        type="text"
                        id="srp"
                        name="srp"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter SRP"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Quantity
                      </label>
                      <Field
                        type="number"
                        id="quantity"
                        name="quantity"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter quantity"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <Field
                        type="text"
                        id="description"
                        name="description"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter description"
                      />
                    </div>

                    {/* <div className="mb-4">
                      <label
                        htmlFor="item_reference"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Item Reference
                      </label>
                      <Field
                        type="text"
                        id="item_reference"
                        name="item_reference"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter item reference"
                      />
                    </div> */}

                    <div className="mb-4">
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Location
                      </label>
                      <Field
                        type="text"
                        id="location"
                        name="location"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter location"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category Name
                      </label>
                      <Field
                        type="text"
                        id="category"
                        name="category"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter category name"
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-action">
                  <button type="submit" className="btn">
                    Submit
                  </button>
                  <button
                    className="btn"
                    onClick={() => setShowCategoryModal(false)}
                  >
                    Close
                  </button>
                </div>
              </Form>
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
