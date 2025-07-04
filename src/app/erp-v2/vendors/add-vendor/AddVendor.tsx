"use client";
// import { fetchRoleList } from "@/api/User/fetchRoleList";
import { CreateVendor } from "@/api/vendor/addVendor";
import { fetchCountryList } from "@/api/vendor/fetchCountry";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Formik, Form, Field, FieldProps } from "formik";
import Link from "next/link";
import React, { useState } from "react";

const AddVendor = () => {
  const [errorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State to control the dropdown visibility

  const [search, setSearch] = useState(""); // State to manage the search query
  const [showSuccess, setShowSuccess] = useState(false);
  const queryClient = useQueryClient();

  const {
    mutate: registerVendor,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (data: CreateVendor) => CreateVendor(data),
    onSuccess: () => {
      console.log("vendor registered successfully");
      queryClient.invalidateQueries({ queryKey: ["vendor"] });
      //   setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  const {
    // isLoading: DisLoading,
    // error: Derror,
    data: departmentList,
  } = useQuery({
    queryKey: ["country"],
    queryFn: fetchCountryList,
  });

  // roles
  // const { data: RoleList } = useQuery({
  //   queryKey: ["roles"],
  //   queryFn: fetchRoleList,
  // });

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
          vendor: "",
          contact_number: "",
          contact_person: "",
          tin: "",
          email: "",
          country: "",
          bank_details: "",
          address: "",
        }}
        // onSubmit={(values, { resetForm }) => {
        //   registerVendor(values);
        //   resetForm();
        //   setSearch("");
        //   console.log(values);
        // }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await registerVendor(values); // wait for the API call to finish
            console.log("Client registered:", values);
            setShowSuccess(true); // Optional success alert

            resetForm(); // clear the form only after successful submission
            setSearch("");

            setTimeout(() => {
              window.location.href = "/erp-v2/vendors"; // ✅ Redirect after success
            }, 2000);
          } catch (error) {
            console.error("vendors registration failed:", error);
          } finally {
            setSubmitting(false); // Always stop loading
          }
        }}
      >
        <Form className="py-4">
          <div style={{ color: "red" }}>{errorMessage}</div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-3  uppercase">
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
              // {
              //   type: "text",
              //   name: "country",
              //   placeholder: "Enter Country",
              //   label: "Country",
              // },
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
            {/* Country Field - Autocomplete Dropdown */}
            <div className="space-y-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Country
              </label>
              <Field name="country">
                {/* {({ field, form }) => { */}
                {({ field, form }: FieldProps) => {
                  const filteredCountries = departmentList?.filter((country) =>
                    country.name.toLowerCase().includes(search.toLowerCase())
                  );

                  return (
                    <div className="relative">
                      <input
                        type="text"
                        {...field}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                        placeholder="Search for a country..."
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />

                      {isOpen && (
                        <div className="absolute w-full mt-1 bg-white shadow-lg max-h-60 overflow-auto z-10">
                          {filteredCountries!.length > 0 ? (
                            filteredCountries?.map((country) => (
                              <div
                                key={country.id}
                                className="cursor-pointer p-2 hover:bg-gray-200"
                                onClick={() => {
                                  setSearch(country.name);
                                  form.setFieldValue("country", country.id);
                                  setIsOpen(false);
                                }}
                              >
                                {country.name}
                              </div>
                            ))
                          ) : (
                            <div className="p-2 text-gray-500">
                              No countries found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }}
              </Field>
            </div>
          </div>

          {/* Submit and Close Buttons */}
          <div className="modal-action">
            <Link className="btn text-black uppercase" href="/erp-v2/vendors/">
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

export default AddVendor;
