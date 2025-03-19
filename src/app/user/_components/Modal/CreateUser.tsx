'use client'

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

/** components */
import { FaCirclePlus } from "react-icons/fa6";

/** api */
import { registerUser } from '@/api/User/registerUser';

/** interfaces */
import { RegisterEmployee } from '@/interfaces/RegisterEmployee';

export default function CreateUser() {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [formData, setFormData] = useState<RegisterEmployee>({
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        sex: "",
        date_of_birth: "",
        department: '',
        role: '',
        phone: "",
        address: "",
        email: "",
        organization_name: "",
        organization_address: "",
        username: "",
        password: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const { mutate: registerEmployee } = useMutation({
        mutationFn: (data: RegisterEmployee) => registerUser(data),
        onSuccess: () => {
            console.log("registered");
            // choice for modal
        },
        onError: (error) => {
            console.error("Registration error:", error);
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        registerEmployee(formData); // trigger the mutation with form data
    };
    

    return (
        <>
            <button
                className="btn btn-primary"
                onClick={() => setShowRegisterModal(true)}
            >
                <FaCirclePlus className="w-6 h-6" />
                Add User
            </button>
            <div>
                {/* Registration Modal */}
                {showRegisterModal && (
                    <dialog open className="modal">
                        <div className="modal-box w-11/12 max-w-7xl">
                            <h3 className="font-bold text-lg">Register User</h3>
                            <form className="py-4" onSubmit={handleSubmit}>
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
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
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
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
                                        placeholder="Enter your middle name"
                                        value={formData.middle_name}
                                        onChange={handleInputChange}
                                        required
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
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
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
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
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
                                            checked={formData.sex === "male"}
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
                                            checked={formData.sex === "female"}
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
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
                                        value={formData.date_of_birth}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <h3 className="font-bold text-lg mt-6">Contact Information</h3>
                                <div className="mb-4">
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
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
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
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
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <h3 className="font-bold text-lg mt-6">
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
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select department
                                        </option>
                                        <option value="Crimson">Crimson</option>
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
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select role
                                        </option>
                                        <option value="Developer">Developer</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Designer">Designer</option>
                                    </select>
                                </div>
                                <h3 className="font-bold text-lg mt-6">Account Information</h3>
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
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
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
                                        className="mt-1 block w-48 border border-gray-300 rounded-md shadow-sm p-2"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
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
    )
}
