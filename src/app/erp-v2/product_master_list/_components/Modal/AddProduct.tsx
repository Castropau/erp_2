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

export default function AddProduct() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [formData, setFormData] = useState<RegisterEmployee>({
  //   first_name: "",
  //   middle_name: "",
  //   last_name: "",
  //   suffix: "",
  //   birth_date: "",
  //   sex: false,
  //   address: "",
  //   email: "",
  //   contact_number: "",
  //   department: "",
  //   role: "",
  //   username: "",
  //   password: "",
  //   password2: "",
  // });

  const queryClient = useQueryClient();

  // const handleInputChanged = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "radio" ? checked : value,
  //   }));
  // };

  const {
    mutate: registerEmployee,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: RegisterEmployee) => registerUser(data),
    onSuccess: () => {
      console.log("User registered successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
    queryKey: ["departments"],
    queryFn: fetchDepartmentsList,
  });

  // roles
  const { data: RoleList } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoleList,
  });

  if (DisLoading) return <div>Loading...</div>;
  if (Derror instanceof Error)
    return <div>An error has occurred: {Derror.message}</div>;

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-info"
          onClick={() => setShowRegisterModal(true)}
        >
          <FaCirclePlus className="w-6 h-6 btn-info" />
          Add item list
        </button>
      </div>
      <div>
        {/* Registration Modal */}
        {showRegisterModal && (
          <dialog open className="modal">
            <div className="modal-box w-11/12 max-w-7xl">
              <h3 className="font-bold text-lg">Add item</h3>
              <Formik
                initialValues={{
                  first_name: "",
                  middle_name: "",
                  last_name: "",
                  suffix: "",
                  sex: false,
                  birth_date: "",
                  contact_number: "",
                  address: "",
                  email: "",
                  department: "",
                  role: "",
                  username: "",
                  password: "",
                  password2: "",
                }}
                onSubmit={(values, { resetForm }) => {
                  registerEmployee(values);
                  resetForm();
                  console.log(values);
                }}
              >
                <Form className="py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      {[
                        {
                          type: "text",
                          name: "first_name",
                          placeholder: "Enter your first name",
                          label: "item Name",
                        },
                        {
                          type: "text",
                          name: "middle_name",
                          placeholder: "Enter your middle name",
                          label: "brand",
                        },
                        {
                          type: "text",
                          name: "last_name",
                          placeholder: "Enter your last name",
                          label: "model",
                        },
                        {
                          type: "text",
                          name: "suffix",
                          placeholder: "Enter your suffix",
                          label: "unit of measurement",
                        },
                      ].map((item) => (
                        <div key={item.name} className="mb-4">
                          <label
                            htmlFor={item.name}
                            className="block text-sm font-medium text-gray-700"
                          >
                            {item.label}
                          </label>

                          {item.type === "text" ||
                          item.type === "date" ||
                          item.type === "tel" ||
                          item.type === "email" ? (
                            <Field
                              type={item.type}
                              id={item.name}
                              name={item.name}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              placeholder={item.placeholder}
                              required={item.name !== "middle_name"}
                            />
                          ) : item.type === "radio" ? (
                            <div className="flex items-center">
                              {item.options?.map((option) => (
                                <div
                                  key={option.value.toString()}
                                  className="mr-4"
                                >
                                  <Field
                                    type="radio"
                                    id={option.value.toString()}
                                    name={item.name}
                                    value={option.value}
                                    className="mr-2"
                                    required
                                  />
                                  <label htmlFor={option.value.toString()}>
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>

                    {/* 2nd column */}
                    <div>
                      {/* organization fnformation  */}
                      {[
                        {
                          type: "select",
                          name: "department",
                          label: "Vendor",
                          options:
                            departmentList?.map((department) => ({
                              value: department.id.toString(),
                              label: department.department,
                            })) || [],
                        },
                        {
                          type: "select",
                          name: "role",
                          label: "Category",
                          options:
                            RoleList?.map((roles) => ({
                              value: roles.id.toString(),
                              label: roles.role,
                            })) || [],
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
                            as="select"
                            id={item.name}
                            name={item.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                          >
                            {item.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                      ))}

                      {/* account information */}
                      {[
                        {
                          type: "text",
                          name: "username",
                          placeholder: "Enter your SRP",
                          label: "SRP",
                        },
                        {
                          type: "password",
                          name: "password",
                          placeholder: "Enter your unit price",
                          label: "Unit price",
                        },
                        {
                          type: "password",
                          name: "password2",
                          label: "VAT%",
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
                            type={item.type}
                            id={item.name}
                            name={item.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder={item.placeholder}
                            required
                          />
                        </div>
                      ))}
                      <label htmlFor="">VAT:</label>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox"
                      />
                    </div>
                  </div>
                  {[
                    {
                      type: "text",
                      name: "description",
                      placeholder: "Enter your description",
                      label: "description",
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
                        as="textarea" // Use 'as' to render a textarea instead of an input
                        id={item.name}
                        name={item.name}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder={item.placeholder}
                        required
                      />
                    </div>
                  ))}

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
