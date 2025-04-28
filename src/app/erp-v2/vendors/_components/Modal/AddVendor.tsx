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
import { fetchDepartmentsList } from "@/api/User/fetchDepartmentList";
import { fetchRoleList } from "@/api/User/fetchRoleList";
import { CiCirclePlus } from "react-icons/ci";
import { CreateCategory } from "@/api/inventory/CreateCategory";
import { CreateVendor } from "@/api/vendor/addVendor";
import { fetchCountryList } from "@/api/vendor/fetchCountry";

export default function AddVendor() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const {
    mutate: registerVendor,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: CreateVendor) => CreateVendor(data),
    onSuccess: () => {
      console.log("vendor registered successfully");
      queryClient.invalidateQueries({ queryKey: ["vendor"] });
      setShowRegisterModal(false);
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
    },
  });

  // departments

  const {
    isLoading: DisLoading,
    error: Derror,
    data: departmentList,
  } = useQuery({
    queryKey: ["country"],
    queryFn: fetchCountryList,
  });

  // roles
  const { data: RoleList } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoleList,
  });

  return (
    <>
      <div className="flex justify-start">
        <button
          className="btn btn-info"
          onClick={() => setShowRegisterModal(true)}
        >
          <FaCirclePlus className="w-6 h-6 btn-info" />
          Add vendor
        </button>
      </div>
      <div>
        {/* Registration Modal */}
        {showRegisterModal && (
          <dialog open className="modal mt-15 backdrop-blur-sm">
            <div className="modal-box w-11/12 max-w-7xl max-h-[80vh] overflow-y-auto dark:bg-gray-dark dark:text-white">
              <h3 className="font-bold text-lg">Create Vendor</h3>
              <span className="font-bold">
                Fill out this information below to create new vendor
              </span>

              {/* Error Message Display */}
              <div style={{ color: "red" }}>{errorMessage}</div>

              <Formik
                initialValues={{
                  vendor: "",
                  contact_number: "",
                  contact_person: "",
                  tin: "",
                  email: "",
                  country: "",
                  bank_details: "",
                  address: "",
                }}
                onSubmit={(values, { resetForm }) => {
                  registerVendor(values);
                  resetForm();
                  console.log(values);
                }}
              >
                <Form className="py-4">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Category Field */}
                    {[
                      {
                        type: "text",
                        name: "vendor",
                        placeholder: "Enter Vendor name",
                        label: "Vendor Name",
                      },
                      {
                        type: "text",
                        name: "contact_number",
                        placeholder: "Phone number",
                        label: "Phone number",
                      },
                      {
                        type: "email",
                        name: "email",
                        placeholder: "Enter Email",
                        label: "Email",
                      },
                      {
                        type: "text",
                        name: "address",
                        placeholder: "Enter address",
                        label: "Address",
                      },
                      {
                        type: "text",
                        name: "country",
                        placeholder: "Enter Country",
                        label: "Country",
                      },
                      {
                        type: "text",
                        name: "tin",
                        placeholder: "Enter TIN",
                        label: "TIN",
                      },
                      {
                        type: "text",
                        name: "contact_person",
                        placeholder: "Enter Contact",
                        label: "Contact Person",
                      },
                      {
                        type: "text",
                        name: "bank_details",
                        placeholder: "Enter Bank Details",
                        label: "Bank Details",
                      },
                      {
                        type: "text",
                        name: "description",
                        placeholder: "Enter Description",
                        label: "Description",
                      },
                    ].map((item) => (
                      <div key={item.name} className="space-y-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          {item.label}
                        </label>
                        <Field
                          type={item.type}
                          id={item.name}
                          name={item.name}
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={item.placeholder}
                          required
                        />
                      </div>
                    ))}
                  </div>

                  {/* Submit and Close Buttons */}
                  <div className="modal-action">
                    <button type="submit" className="btn">
                      Submit
                    </button>
                    <button
                      className="btn"
                      onClick={() => setShowRegisterModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </Form>
              </Formik>

              {/* Error Handling */}
              {isError && (
                <div className="text-red-500 mt-4">
                  <p>Error: {error?.message || "An error occurred"}</p>
                </div>
              )}
            </div>
          </dialog>
        )}
      </div>
    </>
  );
}
