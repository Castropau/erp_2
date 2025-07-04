"use client";
import { fetchDepartmentsList } from "@/api/User/fetchDepartmentList";
import { fetchRoleList } from "@/api/User/fetchRoleList";
import { registerUser } from "@/api/User/registerUser";
import { RegisterEmployee } from "@/interfaces/RegisterEmployee";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik, Field } from "formik";
import Link from "next/link";
import React, { useState } from "react";

const AddUser = () => {
  const queryClient = useQueryClient();
  // const [isEditing, setIsEditing] = useState(false); // New state to track edit mode

  const [showSuccess, setShowSuccess] = useState(false);
  const {
    mutate: registerEmployee,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (data: RegisterEmployee) => registerUser(data),
    onSuccess: () => {
      console.log("User registered successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      //   setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  // departments

  const {
    // isLoading: DisLoading,
    // error: Derror,
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
          <span>Updated successfully!</span>
        </div>
      )}
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
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          // registerEmployee(values);
          // resetForm();
          // console.log(values);
          try {
            await registerEmployee(values);
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
        <Form className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {[
              {
                type: "text",
                name: "first_name",
                placeholder: "Enter first name",
                label: "First Name",
              },
              {
                type: "text",
                name: "middle_name",
                placeholder: "Enter middle name",
                label: "Middle Name",
              },
              {
                type: "text",
                name: "last_name",
                placeholder: "Enter last name",
                label: "Last Name",
              },
              {
                type: "text",
                name: "suffix",
                placeholder: "Enter suffix",
                label: "Suffix",
              },
              {
                type: "radio",
                name: "sex",
                label: "Sex",
                options: [
                  { value: "false", label: "Male" },
                  { value: "true", label: "Female" },
                ],
              },
              {
                type: "date",
                name: "birth_date",
                placeholder: "Enter birth date",
                label: "Date of Birth",
              },
              {
                type: "text",
                name: "address",
                placeholder: "Enter address",
                label: "Address",
              },
              {
                type: "email",
                name: "email",
                placeholder: "Enter email",
                label: "Email",
              },
              {
                type: "text",
                name: "contact_number",
                placeholder: "Enter contact number",
                label: "Contact Number",
              },
              {
                type: "select",
                name: "department",
                label: "Department",
                options:
                  departmentList?.map((d) => ({
                    value: d.id.toString(),
                    label: d.department,
                  })) || [],
              },
              {
                type: "select",
                name: "role",
                label: "Role",
                options:
                  RoleList?.map((r) => ({
                    value: r.id.toString(),
                    label: r.role,
                  })) || [],
              },
              {
                type: "text",
                name: "username",
                placeholder: "Enter username",
                label: "Username",
              },
              {
                type: "password",
                name: "password",
                placeholder: "Enter password",
                label: "Password",
              },
              {
                type: "password",
                name: "password2",
                placeholder: "Confirm password",
                label: "Confirm Password",
              },
            ].map((item) => (
              <div key={item.name} className="space-y-1">
                <label
                  htmlFor={item.name}
                  className="text-sm font-medium block"
                >
                  {item.label}
                </label>

                {item.type === "select" ? (
                  <Field
                    as="select"
                    id={item.name}
                    name={item.name}
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    required
                  >
                    <option value="">Select {item.label}</option>
                    {item.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                ) : item.type === "radio" ? (
                  <div className="flex gap-4 mt-1">
                    {item.options?.map((option) => (
                      <label
                        key={option.value.toString()}
                        className="flex items-center"
                      >
                        <Field
                          type="radio"
                          name={item.name}
                          value={option.value}
                          className="mr-2"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                ) : (
                  <Field
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    placeholder={item.placeholder}
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    required={
                      item.name !== "middle_name" && item.type !== "password2"
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <div className="modal-action">
            {/* <button type="submit" className="btn">
              Submit
            </button> */}
            {/* <button className="btn" onClick={() => setShowRegisterModal(false)}>
              Close
            </button> */}
            <Link className="btn text-black uppercase" href="/erp-v2/user">
              back
            </Link>
            <button type="submit" className="btn  uppercase">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUser;
