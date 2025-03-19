"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCookies } from "@/server/getToken";
import { FaCirclePlus } from "react-icons/fa6";

interface User {
  id: number; // id as an integer
  full_name: string; // full_name as a string
  department: {
    id: number;
    department: string;
  };
  role: {
    id: number;
    role: string;
  };
  is_active: boolean;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
  contact_number: string;
  email: string;
  address: string;
}

interface RegisterEmployee {
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  sex: string;
  date_of_birth: string;
  phone: string;
  address: string;
  email: string;
  organization_name: string;
  organization_address: string;
  username: string;
  password: string;
}

async function fetchUserData(): Promise<User[]> {
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/users/", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function registerUser(userData: RegisterEmployee): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/users/register/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
}

function Users() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [formData, setFormData] = useState<RegisterEmployee>({
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    sex: "",
    date_of_birth: "",
    phone: "",
    address: "",
    email: "",
    organization_name: "",
    organization_address: "",
    username: "",
    password: "",
  });

  const { isLoading, error, data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUserData,
  });

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    registerEmployee(formData); // trigger the mutation with form data
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  return (
    <>
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

      <div className="overflow-x-auto">
        <button
          className="btn btn-primary"
          onClick={() => setShowRegisterModal(true)}
        >
          <FaCirclePlus className="w-6 h-6" />
          Add User
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td>{user.full_name}</td>
                <td>{user.department.department}</td>
                <td>{user.role.role}</td>
                <td>{user.is_active.toString()}</td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => console.log(`Edit user ${user.id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
