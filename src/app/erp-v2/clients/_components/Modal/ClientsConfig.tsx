"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCirclePlus } from "react-icons/fa6";
import { Formik, Field, Form, FieldArray } from "formik";
import { registerUser } from "@/api/User/registerUser";
import { RegisterEmployee } from "@/interfaces/RegisterEmployee";
import { fetchUserLists } from "@/api/cash-request/fetchUsers";

export default function ClientsConfig() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: registerEmployee } = useMutation({
    mutationFn: (data: RegisterEmployee) => registerUser(data),
    onSuccess: () => {
      console.log("registered");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  // users fetch
  const {
    isLoading: DisLoading,
    error: Derror,
    data: usersList,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserLists,
  });

  const unitsList = ["kg", "unit", "box", "liter", "meter"];

  const handleSubmit = (values: any) => {
    console.log("Form data to submit:", values);
    registerEmployee(values);
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn btn-info"
          onClick={() => setShowRegisterModal(true)}
        >
          Config
        </button>
      </div>

      {showRegisterModal && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-7xl">
            <h3 className="font-bold text-lg">Quotations</h3>

            <Formik
              initialValues={{
                special_instructions: "",
                project_name: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className="py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Heading for Special Information */}

                    {/* Form Fields */}
                    {[
                      {
                        type: "textarea",
                        name: "special_instructions",
                        placeholder: "Enter special instructions",
                        label: "Notes & Assumptions",
                        value: "default",
                      },
                      {
                        type: "textarea",
                        name: "project_name",
                        placeholder: "Enter project name",
                        label: "Terms & Conditions",
                        value: "default",
                      },
                    ].map((item) => (
                      <div key={item.name} className="mb-4 col-span-2">
                        <label
                          htmlFor={item.name}
                          className="block text-sm font-medium text-gray-700"
                        >
                          {item.label}
                        </label>
                        {item.type === "text" ||
                        item.type === "date" ||
                        item.type === "textarea" ? (
                          <Field
                            as={item.type === "textarea" ? "textarea" : "input"}
                            type={item.type === "textarea" ? null : item.type}
                            id={item.name}
                            name={item.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder={item.placeholder}
                            value={item.value}
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="modal-action">
                    <button type="submit" className="btn">
                      Submit
                    </button>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setShowRegisterModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </dialog>
      )}
    </>
  );
}
