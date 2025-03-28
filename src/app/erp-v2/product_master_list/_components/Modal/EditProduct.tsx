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

export default function EditProduct() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const queryClient = useQueryClient();

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

  const {
    isLoading: DisLoading,
    error: Derror,
    data: departmentList,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartmentsList,
  });

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
                  vat_checked: false, // Add VAT checkbox state here
                }}
                onSubmit={(values, { resetForm }) => {
                  registerEmployee(values);
                  resetForm();
                  console.log(values);
                }}
              >
                <Form className="py-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - 2 inputs in one line */}
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        {
                          type: "text",
                          name: "first_name",
                          placeholder: "Enter your first name",
                          label: "Item Name",
                        },
                        {
                          type: "text",
                          name: "middle_name",
                          label: "Vendor",
                          placeholder: "Search or type your middle name",
                          datalistId: "middle-name-list",
                          options: [
                            "John",
                            "Jane",
                            "Michael",
                            "Sarah",
                            "Sarah",
                          ],
                        },
                      ].map((item) => (
                        <div key={item.name} className="mb-4">
                          <label
                            htmlFor={item.name}
                            className="block text-sm font-medium text-gray-700"
                          >
                            {item.label}
                          </label>

                          {/* Input with datalist */}
                          <input
                            type={item.type}
                            id={item.name}
                            name={item.name}
                            className="w-full p-2 border rounded-md"
                            placeholder={item.placeholder}
                            list={item.datalistId} // Link input to datalist
                            required
                          />
                          <datalist id={item.datalistId}>
                            {item.options?.map((option, index) => (
                              <option key={index} value={option} />
                            ))}
                          </datalist>
                        </div>
                      ))}

                      {[
                        {
                          type: "text",
                          name: "last_name",
                          placeholder: "Enter Model",
                          label: "Model",
                        },
                        {
                          type: "text",
                          name: "suffix",
                          placeholder: "Enter your suffix",
                          label: "Category",
                          datalistId: "middle-name-list",
                          options: [
                            "John",
                            "Jane",
                            "Michael",
                            "Sarah",
                            "Sarah",
                          ],
                        },
                        {
                          type: "text",
                          name: "last_name",
                          placeholder: "Enter your last name",
                          label: "Brand",
                        },
                        {
                          type: "text",
                          name: "last_name",
                          placeholder: "Enter Model",
                          label: "SRP",
                        },
                        {
                          type: "text",
                          name: "last_name",
                          placeholder: "Enter Model",
                          label: "Unit price",
                        },
                        {
                          type: "text",
                          name: "last_name",
                          placeholder: "Enter Model",
                          label: "VAT",
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
                            list={item.datalistId} // Link input to datalist
                            required
                          />
                        </div>
                      ))}

                      <div className="mb-4 flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="checkbox"
                        />
                        <label
                          htmlFor="vat_checked"
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
                                Field
                              </th>
                              <th className="border border-gray-300 px-4 py-2">
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2">
                                First Name
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                John
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-2">
                                Last Name
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                Doe
                              </td>
                            </tr>
                            {/* You can dynamically populate more rows here */}
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
                          name: "role",
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
