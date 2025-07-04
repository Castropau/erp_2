"use client";
import { CreateClient } from "@/api/clients/addClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import React, { useState } from "react";

const AddClients = () => {
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    mutate: registerClient,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (data: CreateClient) => CreateClient(data),
    onSuccess: () => {
      console.log("client registered successfully");
      queryClient.invalidateQueries({ queryKey: ["client"] });
      //   setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
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
      <Formik
        initialValues={{
          client: "",
          address: "",
          contact_person: "",
          position: "",
          contact_number: "",
          email: "",
        }}
        // onSubmit={(values, { resetForm }) => {
        //   registerClient(values);
        //   resetForm();
        //   console.log(values);
        // }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await registerClient(values); // wait for the API call to finish
            console.log("Client registered:", values);
            setShowSuccess(true); // Optional success alert

            resetForm(); // clear the form only after successful submission
            setTimeout(() => {
              window.location.href = "/erp-v2/clients"; // ✅ Redirect after success
            }, 2000);
          } catch (error) {
            console.error("Client registration failed:", error);
          } finally {
            setSubmitting(false); // Always stop loading
          }
        }}
      >
        <Form className="py-1">
          <div className="grid grid-cols-3 gap-3  uppercase">
            {/* Category Field */}
            {[
              {
                type: "text",
                name: "client",
                placeholder: "Enter Client name",
                label: "Client Name",
              },
              {
                type: "text",
                name: "address",
                placeholder: "Enter Company address",
                label: "Company address",
              },
              {
                type: "text",
                name: "contact_person",
                placeholder: "Enter contact",
                label: "contact person",
              },
              {
                type: "text",
                name: "position",
                placeholder: "Enter Position",
                label: "Position",
              },
              {
                type: "text",
                name: "contact_number",
                placeholder: "Enter Contact Number",
                label: "Contact Number",
              },
              {
                type: "text",
                name: "email",
                placeholder: "Enter Email",
                label: "Email",
              },
            ].map((item) => (
              <div key={item.name} className="space-y-4">
                <label className=" block mb-2 text-sm font-bold text-gray-900 dark:text-white">
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
            {/* <button type="submit" className="btn">
              Submit
            </button> */}
            {/* <button className="btn" onClick={() => setShowRegisterModal(false)}>
              Close
            </button> */}
            <Link className="btn text-black uppercase" href="/erp-v2/clients/">
              {" "}
              back
            </Link>
            <button type="submit" className="btn uppercase">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddClients;
