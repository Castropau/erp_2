import { AddRoles, CreateRole } from "@/api/Roles/CreateRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const AddRole = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const queryClient = useQueryClient();

  const {
    mutate: registerRole,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: AddRoles) => CreateRole(data),
    onSuccess: () => {
      console.log("registered");
      queryClient.invalidateQueries({ queryKey: ["role"] });
      setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
  // const handleSubmit = (values: any) => {
  //   console.log("Form data to submit:", values);
  //   registerRole(values);
  // };
  return (
    <div>
      <div className="flex justify-end">
        <button
          className="btn bg-blue-500 text-white uppercase"
          onClick={() => setShowRegisterModal(true)}
        >
          {/* <FaCirclePlus className="w-6 h-5 btn-info" /> */}
          Add role
        </button>
      </div>
      {showRegisterModal && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-md rounded-lg shadow-lg bg-white p-6">
            <h3 className="text-xl font-semibold text-center mb-4">Role</h3>

            <Formik
              initialValues={{
                role: "",
              }}
              onSubmit={(values, { resetForm }) => {
                registerRole(values);
                resetForm();
                console.log(values);
              }}
            >
              <Form className="space-y-6 md:space-y-8">
                {isError && (
                  <div className="text-red-500 mt-4 text-sm">
                    <p>Error: {error?.message || "An error occurred"}</p>
                  </div>
                )}
                {[
                  {
                    type: "text",
                    name: "role",
                    placeholder: "Enter role",
                    label: "Role",
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

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                  {/* <button
                    type="submit"
                    className="btn bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Submit
                  </button> */}
                  <button
                    type="button"
                    className="btn bg-gray-200 uppercase text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                    onClick={() => setShowRegisterModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn bg-blue-500 uppercase text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AddRole;
