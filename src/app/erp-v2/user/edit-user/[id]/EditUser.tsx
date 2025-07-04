"use client";
import {
  fetchUserDataById,
  UpdateUser,
  updateUser,
} from "@/api/User/personalInformation";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

const EditUser = () => {
  const pathname = usePathname();
  const [showSuccess, setShowSuccess] = useState(false);
  // const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
  // const [selectedGender, setSelectedGender] = useState(userData?.sex); // Default selection

  const queryClient = useQueryClient();
  const id = pathname?.split("/").pop();

  const {
    data: userData,
    isLoading: isUserLoading,
    // error: userError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserDataById(id as string),
    enabled: !!id,
  });
  // const [selectedGender, setSelectedGender] = useState(userData?.sex); // Default selection

  // const [showEditModal, setShowEditModal] = useState(false);

  const { mutate: updatedUser } = useMutation({
    mutationFn: (data: UpdateUser) => updateUser(userData!.id, data),
    onSuccess: () => {
      console.log("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // setShowEditModal(false);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  if (isUserLoading) {
    return <LoadingSpinner />;
  }
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
          first_name: userData?.first_name || "",
          middle_name: userData?.middle_name || "",
          last_name: userData?.last_name || "",
          // sex: userData?.sex || false,
          // sex: userData?.sex ? true : false,
          sex: userData?.sex ? "true" : "false", // convert boolean to string here

          contact_number: userData?.contact_number || "",
          email: userData?.email || "",
          address: userData?.address || "",
          is_active: userData?.is_active || false,
          role: userData?.role.id || 0,
          department: userData?.department.id || 0,
          username: userData?.username || "",
          suffix: userData?.suffix || "",
          birth_date: userData?.birth_date || "",
          id: userData?.id || 0,
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          // updatedUser(values); // Submit data when Formik form is submitted
          // console.log(values);
          try {
            await updatedUser(values);
            console.log(values);

            // setIsEditing(false);
            setShowSuccess(true); // Show the success alert

            setTimeout(() => {
              window.location.href = "/erp-v2/user/"; // 🔁 Redirect to dashboard
            }, 2000);
          } catch (error) {
            console.error("Submission failed:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({}) => (
          <Form className="py-4 text-start grid grid-cols-1 md:grid-cols-2 gap-1">
            {/* <div className="mb-1">
                            <label
                              htmlFor="edit_user_id"
                              className="block text-sm font-medium text-gray-700"
                            >
                              User ID
                            </label>
                            <input
                              type="text"
                              id="edit_user_id"
                              value={values.id}
                              readOnly
                              className="input input-bordered w-full"
                            />
                          </div> */}

            <div className="mb-1">
              <label
                htmlFor="birth_date"
                className="block text-sm font-medium text-gray-700"
              >
                Birth Date
              </label>
              <Field
                type="date"
                id="birth_date"
                name="birth_date"
                // value={values.birth_date}
                // onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-1">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <Field
                type="text"
                id="first_name"
                name="first_name"
                // value={values.first_name}
                // onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-1">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <Field
                type="text"
                id="last_name"
                name="last_name"
                // value={values.last_name}
                // onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-1">
              <label
                htmlFor="middle_name"
                className="block text-sm font-medium text-gray-700"
              >
                Middle Name
              </label>
              <Field
                type="text"
                id="middle_name"
                name="middle_name"
                // value={values.middle_name}
                // onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            {/* <div className="mb-1">
                            <label
                              htmlFor="sex"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Sex
                            </label>
                            <div className="flex items-center space-x-4">
                              <div>
                                <Field
                                  type="radio"
                                  id="male"
                                  name="sex"
                                  value={true}
                                  checked={values.sex === true}
                                  onChange={handleChange}
                                  className="radio"
                                />
                                <label htmlFor="male" className="text-sm">
                                  Male
                                </label>
                              </div>
                              <div>
                                <Field
                                  type="radio"
                                  id="female"
                                  name="sex"
                                  value={false}
                                  checked={values.sex === false}
                                  onChange={handleChange}
                                  className="radio"
                                />
                                <label htmlFor="female" className="text-sm">
                                  Female
                                </label>
                              </div>
                            </div>
                          </div> */}

            <div className="mb-1">
              <label
                htmlFor="contact_number"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <Field
                type="text"
                id="contact_number"
                name="contact_number"
                // value={values.contact_number}
                // onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                // value={values.email}
                // onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                // value={values.address}
                // onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-1">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <Field
                as="select"
                id="role"
                name="role"
                className="input input-bordered w-full"
              >
                <option value="1">HR</option>
                <option value="2">Engineering</option>
                <option value="3">Marketing</option>
                <option value="4">Sales</option>
                <option value="5">Finance</option>
                <option value="6">IT</option>
              </Field>
            </div>

            <div className="mb-1">
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <Field
                as="select"
                id="department"
                name="department"
                className="input input-bordered w-full"
              >
                <option value="1">HR</option>
                <option value="2">Engineering</option>
                <option value="3">Marketing</option>
                <option value="4">Sales</option>
                <option value="5">Finance</option>
                <option value="6">IT</option>
              </Field>
            </div>

            <div className="mb-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                // value={values.username}
                // onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700"
              >
                Sex
              </label>
              {/* <div className="flex items-center space-x-4">
                <div>
                  <Field
                    type="radio"
                    id="male"
                    name="sex"
                    // value={true}
                    checked={values.sex === true}
                    onChange={handleChange}
                    className="radio"
                  />
                  <label htmlFor="male" className="text-sm ml-1">
                    Male
                  </label>
                </div>
                <div>
                  <Field
                    type="radio"
                    id="female"
                    name="sex"
                    // value={false}
                    checked={values.sex === false}
                    onChange={handleChange}
                    className="radio"
                  />
                  <label htmlFor="female" className="text-sm ml-1">
                    Female
                  </label>
                </div>
              </div> */}
              <div className="flex items-center space-x-4">
                <div>
                  <Field
                    type="radio"
                    id="male"
                    name="sex"
                    value="true" // string "true"
                    className="radio"
                  />
                  <label htmlFor="male" className="text-sm ml-1">
                    Male
                  </label>
                </div>
                <div>
                  <Field
                    type="radio"
                    id="female"
                    name="sex"
                    value="false" // string "false"
                    className="radio"
                  />
                  <label htmlFor="female" className="text-sm ml-1">
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-action">
              {/* <button
                type="button"
                className="btn"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </button> */}
              <Link className="btn text-black uppercase" href="/erp-v2/user">
                back
              </Link>
              <button type="submit" className="btn uppercase">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUser;
