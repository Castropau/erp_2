"use client";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { FaEllipsisV, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchInventoryDataById } from "@/api/inventory/FetchInventoryId";
import {
  updateInventory,
  UpdateInventory,
} from "@/api/inventory/updateInventory";

function View() {
  const [showMenu, setShowMenu] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false); // Track whether in edit mode
  const params = useParams();
  //   const id = Number(params?.id);
  const id = typeof params?.id === "string" ? Number(params.id) : undefined;
  const queryClient = useQueryClient();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here
    // For example, you could send data to an API or perform validation
  };

  const handleMenuClick = (action: any) => {
    setShowMenu(false);

    if (action === "edit") {
      setIsEditMode(true);
    } else if (action === "delete") {
      alert("Delete clicked");
    }
  };
  const { mutate: updatedView } = useMutation({
    mutationFn: (viewData: UpdateInventory) => updateInventory(id, viewData),
    onSuccess: () => {
      console.log("inventory updated successfully");
      queryClient.invalidateQueries({ queryKey: ["inventory", id] });
      //   setShowRegisterModal(false); // Close the modal after successful update
    },
    onError: (error) => {
      console.error("Error updating quotation:", error);
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
  if (!id) return <div>Loading route params...</div>;
  if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>Error fetching data: {error.message}</div>;
  return (
    <>
      <Link className="btn btn-info" href="/erp-v2/inventory/">
        <FaArrowLeft />
        Back
      </Link>
      <div className="flex justify-between p-6 bg-gray-50">
        {/* Left Column: Image */}
        <div className="w-1/3">
          <img
            src="https://via.placeholder.com/150" // Replace with your image URL
            alt="View"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Right Column: Form with 11 Inputs */}
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

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute top-8 right-0 w-32 bg-white shadow-lg rounded-md z-10">
                  <div
                    onClick={() => handleMenuClick("edit")}
                    className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaEdit className="inline mr-2" />
                    Edit
                  </div>
                  <div
                    onClick={() => handleMenuClick("delete")}
                    className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaTrash className="inline mr-2" />
                    Delete
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
              //   description: "",
              quantity: InventoryData?.quantity || 0,
              unit_of_measurement: InventoryData?.unit_of_measurement || "",
              srp: InventoryData?.srp || 0,
              category: InventoryData?.category || "",
              location: InventoryData?.location || "",
              photos: InventoryData?.photos || "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              const payload: UpdateInventory = {
                id: id!,
                ...values,
                quantity: Number(values.quantity),
                srp: Number(values.srp),
              };

              updatedView(payload);
              console.log(payload);
              setSubmitting(false);
              setIsEditMode(false);
            }}
          >
            <Form className="space-y-4">
              {/* Error Message */}
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}

              {[
                {
                  type: "select",
                  name: "item",
                  placeholder: "Enter your Item",
                  label: "Item",
                  options: [
                    { value: "US", label: "United States" },
                    { value: "CA", label: "Canada" },
                    { value: "IN", label: "India" },
                    // Add more countries as needed
                  ],
                },
                {
                  type: "text",
                  name: "description",
                  placeholder: "Enter your Description",
                  label: "Description",
                },
                {
                  type: "text",
                  name: "brand",
                  placeholder: "Enter your email",
                  label: "Brand",
                },
                {
                  type: "text",
                  name: "serial",
                  placeholder: "Enter your first name",
                  label: "Serial",
                },
                {
                  type: "text",
                  name: "model",
                  placeholder: "Enter your last name",
                  label: "Model",
                },
                {
                  type: "text",
                  name: "specification",
                  placeholder: "Enter your address",
                  label: "Specification",
                },
                {
                  type: "text",
                  name: "quantity",
                  placeholder: "Enter your phone number",
                  label: "Quantity",
                },
                {
                  type: "text",
                  name: "unit_of_measurement",
                  placeholder: "Enter your company name",
                  label: "Unit of measurement",
                },
                {
                  type: "text",
                  name: "srp",
                  placeholder: "Enter your job title",
                  label: "srp",
                },
                {
                  type: "select",
                  name: "category",

                  label: "category",
                  options: [
                    { value: 2, label: "United States" },
                    { value: 3, label: "Canada" },
                    { value: 4, label: "India" },
                    // Add more countries as needed
                  ],
                },
                {
                  type: "select",
                  name: "location",

                  label: "location",
                  options: [
                    { value: 2, label: "United States" },
                    { value: 3, label: "Canada" },
                    { value: 4, label: "India" },
                    // Add more countries as needed
                  ],
                },
                {
                  type: "file",
                  name: "photos",
                  placeholder: "Upload your profile image",
                  label: "Profile Image",
                },
              ].map((item) => (
                <div key={item.name} className="space-y-4">
                  {item.name === "photos" && !isEditMode ? null : (
                    <>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        {item.label}
                      </label>

                      {item.type === "file" ? (
                        isEditMode ? (
                          <Field
                            type={item.type}
                            id={item.name}
                            name={item.name}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder={item.placeholder}
                          />
                        ) : null
                      ) : item.type === "select" ? (
                        <Field
                          as="select"
                          id={item.name}
                          name={item.name}
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          disabled={!isEditMode}
                        >
                          <option value="">Select a country</option>
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
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder={item.placeholder}
                          disabled={!isEditMode} // Disable text inputs if not in edit mode
                        />
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Buttons */}
              <div className="flex gap-4">
                {/* Cancel Button */}
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="w-full bg-gray-500 text-white py-2 rounded-md"
                  >
                    Cancel
                  </button>
                )}

                {/* Update Button */}
                {isEditMode && (
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                  >
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
