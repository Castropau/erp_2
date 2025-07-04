"use client";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchInventoryDataById } from "@/api/inventory/FetchInventoryId";
import {
  updateInventory,
  UpdateInventory,
} from "@/api/inventory/updateInventory";
// import { FetchItems } from "@/api/inventory/Items";
// import { FetchLocation } from "@/api/inventory/FetchLocation";
import { FetchCategories } from "@/api/inventory/FetchCategory";
import { FetchItemInventory } from "@/api/inventory/fetchItemNumber";
import { fetchingLocations } from "@/api/inventory/FetchLocation";
import { deleteInventories } from "@/api/inventory/deleteInventor";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

function View() {
  const [showMenu, setShowMenu] = useState(false);
  const [errorMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false); // Track whether in edit mode
  const params = useParams();
  const id = typeof params?.id === "string" ? Number(params.id) : undefined;
  const queryClient = useQueryClient();
  // const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessdeleted, setShowSuccessDeleted] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuClicks = (action: any) => {
    setShowMenu(false);

    if (action === "edit") {
      setIsEditMode(true);
    } else if (action === "delete") {
      alert("Delete clicked");
    }
  };
  const { mutate: deleteInventory } = useMutation({
    mutationFn: deleteInventories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      setShowSuccessDeleted(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (err) => {
      console.error("Failed to delete:", err);
    },
  });
  const handleMenuClick = (id: number | string) => {
    if (confirm("Are you sure you want to delete this inventory?")) {
      deleteInventory(Number(id)); // call mutation or API
      setTimeout(() => {
        window.location.href = "/erp-v2/inventory/";
      }, 2000);
    }
  };

  const { mutate: updatedView } = useMutation({
    mutationFn: (viewData: UpdateInventory) =>
      updateInventory(id as number, viewData),
    onSuccess: () => {
      console.log("inventory updated successfully");
      queryClient.invalidateQueries({ queryKey: ["inventory", id] });
    },
    onError: (error) => {
      console.error("Error updating inventory:", error);
    },
  });

  const {
    data: InventoryData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["inventory", id],
    queryFn: () => fetchInventoryDataById(id!),
    enabled: !!id,
  });

  const { data: itemData } = useQuery({
    queryKey: ["item_no"],
    queryFn: FetchItemInventory,
  });

  const { data: locationList } = useQuery({
    queryKey: ["location"],
    queryFn: fetchingLocations,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: FetchCategories,
  });

  if (!id) return <div>Loading route params...</div>;
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error fetching data: {error.message}</div>;

  return (
    <>
      {showSuccessdeleted && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Deleted!</strong>
          <span className="block sm:inline ml-2">
            Item deleted successfully.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            // onClick={() => setShowSuccessDeleted(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 00-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
            </svg>
          </span>
        </div>
      )}

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
      <Link className="btn text-black uppercase" href="/erp-v2/inventory/">
        {/* <FaArrowLeft /> */}
        Back to inventories
      </Link>
      <div className="flex justify-between p-6  dark:bg-gray-800 dark:text-white">
        <div className="w-1/3">
          <img
            src="/images/logo.png" // Replace with your image URL
            alt="View"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="w-2/3 pl-6">
          {/* 3-Dot Menu - Show when not in edit mode */}
          {!isEditMode && (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="absolute top-0 right-0 text-gray-500"
              >
                <FaEllipsisV size={20} />
              </button>
              {showMenu && (
                <div className="absolute top-8 right-0 w-32 bg-white shadow-lg rounded-md z-10">
                  <div
                    onClick={() => handleMenuClicks("edit")}
                    className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaEdit className="inline mr-2" /> Edit
                  </div>
                  <div
                    onClick={() => handleMenuClick(Number(id))} // convert to number if it's from a string source
                    className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaTrash className="inline mr-2" /> Delete
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Formik Form */}
          <Formik
            initialValues={{
              description: InventoryData?.description || "",
              brand: InventoryData?.brand || "",
              serial: InventoryData?.serial || "",
              model: InventoryData?.model || "",
              specification: InventoryData?.specification || "",
              quantity: InventoryData?.quantity || 0,
              unit_of_measurement: InventoryData?.unit_of_measurement || "",
              srp: InventoryData?.srp || 0,
              category: InventoryData?.category.id || 0,
              location: InventoryData?.location.id || 0,
              item_reference: InventoryData?.item_reference.id || 0,
              item: InventoryData?.item_no || "",
              photos: InventoryData?.photos || "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const payload: UpdateInventory = {
                id: id!,
                ...values,
                quantity: Number(values.quantity),
                srp: Number(values.srp),
              };
              // updatedView(payload);
              // console.log(payload);
              // setSubmitting(false);
              // setIsEditMode(false);
              try {
                await updatedView(payload);
                console.log(payload);

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
            }}
          >
            <Form className="grid grid-cols-2  md:grid-cols-4 mb-2 gap-2 ">
              {/* Error Message */}
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}

              {/* Conditional rendering for item_reference and item_no */}
              {isEditMode ? (
                <div>
                  <label className="block mb-2 text-sm font-bold">
                    Item Reference
                  </label>
                  <Field
                    as="select"
                    name="item_reference"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    disabled={!isEditMode} // Disable if not in edit mode
                  >
                    <option value="">Select Item Reference</option>
                    {itemData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.item_no}
                      </option>
                    ))}
                  </Field>
                </div>
              ) : (
                <div>
                  <label className="block mb-2 text-sm font-bold">
                    Item No
                  </label>
                  <Field
                    type="text"
                    name="item"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    readOnly={!isEditMode} // Set as readonly if not in edit mode
                  />
                </div>
              )}

              {/* Rest of the fields (including Profile Image) */}
              {[
                {
                  type: "text",
                  name: "description",
                  placeholder: "Enter your Description",
                  label: "Description",
                },
                {
                  type: "text",
                  name: "brand",
                  placeholder: "Enter your brand",
                  label: "Brand",
                },
                {
                  type: "text",
                  name: "serial",
                  placeholder: "Enter your serial",
                  label: "Serial",
                },
                {
                  type: "text",
                  name: "model",
                  placeholder: "Enter your model",
                  label: "Model",
                },
                {
                  type: "text",
                  name: "specification",
                  placeholder: "Enter your specification",
                  label: "Specification",
                },
                {
                  type: "text",
                  name: "quantity",
                  placeholder: "Enter your quantity",
                  label: "Quantity",
                },
                {
                  type: "text",
                  name: "unit_of_measurement",
                  placeholder: "Enter unit of measurement",
                  label: "Unit of Measurement",
                },
                {
                  type: "text",
                  name: "srp",
                  placeholder: "Enter SRP",
                  label: "SRP",
                },
                {
                  type: "select",
                  name: "category",
                  label: "Category",
                  options:
                    categoriesData?.map((loc) => ({
                      value: loc.id,
                      label: loc.category,
                    })) || [],
                },
                {
                  type: "select",
                  name: "location",
                  label: "Location",
                  options:
                    locationList?.map((loc) => ({
                      value: loc.id,
                      label: loc.location,
                    })) || [],
                },
              ].map((item) => (
                <div key={item.name} className="space-y-4">
                  <label className="block mb-2 text-sm font-bold">
                    {item.label}
                  </label>
                  {item.type === "select" ? (
                    <Field
                      as="select"
                      name={item.name}
                      className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      disabled={!isEditMode} // Disable if not in edit mode
                    >
                      <option value="">Select a {item.label}</option>
                      {item.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  ) : (
                    <Field
                      type={item.type}
                      name={item.name}
                      className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      disabled={!isEditMode} // Disable all fields if not in edit mode
                    />
                  )}
                </div>
              ))}

              {/* Profile Image Field (conditionally hidden if not in edit mode) */}
              {isEditMode && (
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Profile Image
                  </label>
                  <Field
                    type="file"
                    name="photos"
                    placeholder="Upload your photos"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                </div>
              )}

              <div className=" col-span-4 flex justify-end gap-4">
                {/* Cancel Button */}
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="btn uppercase"
                  >
                    Cancel
                  </button>
                )}

                {/* Update Button */}
                {isEditMode && (
                  <button type="submit" className="btn uppercase">
                    Update
                  </button>
                )}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

export default View;
