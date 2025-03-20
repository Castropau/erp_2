"use client";

import React, { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

/** components */
import { FaCirclePlus } from "react-icons/fa6";

/** api */
import { registerUser } from "@/api/User/registerUser";

/** interfaces */
import { RegisterEmployee } from "@/interfaces/RegisterEmployee";

export default function AddLaborOfComputation() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [formData, setFormData] = useState<RegisterEmployee>({
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    birth_date: "",
    sex: false,
    address: "",
    email: "",
    contact_number: "",
    department: "",
    role: "",
    username: "",
    password: "",
    password2: "",
  });

  const queryClient = useQueryClient();

  const handleInputChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? checked : value,
    }));
  };

  const { mutate: registerEmployee } = useMutation({
    mutationFn: (data: RegisterEmployee) => registerUser(data),
    onSuccess: () => {
      console.log("registered");
      // choice for modal
      queryClient.invalidateQueries({ queryKey: ["users"] });

      setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form data to submit:", formData);
    registerEmployee(formData); // trigger the mutation with form data
    // reset form after submit
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      suffix: "",
      birth_date: "",
      sex: false,
      address: "",
      email: "",
      contact_number: "",
      department: "",
      role: "",
      username: "",
      password: "",
      password2: "",
    });
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-info"
          onClick={() => setShowRegisterModal(true)}
        >
          <FaCirclePlus className="w-6 h-6 btn-info" />
          Add User
        </button>
      </div>
      <div>
        {/* Registration Modal */}
        {showRegisterModal && (
          <dialog open className="modal">
            <div className="modal-box w-11/12 max-w-7xl">
              <h3 className="font-bold text-lg">Register User</h3>
              <form className="py-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Column 1: Personal Information and Contact Information */}
                  <div>
                    <h3 className="font-bold text-lg">Personal Information</h3>
                    <div className="mb-4">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your first name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="middle_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Middle Name
                      </label>
                      <input
                        type="text"
                        id="middle_name"
                        name="middle_name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your middle name"
                        value={formData.middle_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your last name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="suffix"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Suffix
                      </label>
                      <input
                        type="text"
                        id="suffix"
                        name="suffix"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your suffix"
                        value={formData.suffix}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Sex
                      </label>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="male"
                          name="sex"
                          value="male"
                          className="mr-2"
                          checked={formData.sex ? true : false}
                          onChange={handleInputChange}
                          required
                        />
                        <label htmlFor="male" className="mr-4">
                          Male
                        </label>
                        <input
                          type="radio"
                          id="female"
                          name="sex"
                          value="female"
                          className="mr-2"
                          checked={formData.sex ? false : true}
                          onChange={handleInputChange}
                          required
                        />
                        <label htmlFor="female">Female</label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="date_of_birth"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="birth_date"
                        name="birth_date"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.birth_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <h3 className="font-bold text-lg mt-6">
                      Contact Information
                    </h3>
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="contact_number"
                        name="contact_number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your phone number"
                        value={formData.contact_number}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Column 2: Organization Information */}
                  <div>
                    <h3 className="font-bold text-lg">
                      Organization Information
                    </h3>
                    <div className="mb-4">
                      <label
                        htmlFor="department"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Department
                      </label>
                      <select
                        id="department"
                        name="department"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.department}
                        onChange={handleInputChanged}
                        required
                      >
                        <option value="" disabled>
                          Select department
                        </option>
                        <option value="1">Crimson</option>
                        <option value="Amber">Amber</option>
                        <option value="Velvet">Velvet</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={formData.role}
                        onChange={handleInputChanged}
                        required
                      >
                        <option value="" disabled>
                          Select role
                        </option>
                        <option value="1">Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Designer">Designer</option>
                      </select>
                    </div>
                    {/* Account Information */}
                    <h3 className="font-bold text-lg mt-6">
                      Account Information
                    </h3>
                    <div className="mb-4">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="password2"
                        name="password2"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your password"
                        value={formData.password2}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

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
              </form>
            </div>
          </dialog>
        )}
      </div>
    </>
  );
}
