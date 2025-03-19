"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCookies } from "@/server/getToken";

interface User {
  id: number; // id as an integer
  full_name: string; // full_name as a string
  department: string; // department as a string
  role: string;
  is_active: boolean;
  is_superuser: boolean;
}

interface Role {
  id: number; // id as an integer
  role: string; // full_name as a string
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

async function fetchRoleData(): Promise<Role[]> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/users/roles/",
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function UsersList() {
  const { isLoading, error, data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUserData,
  });

  const {
    isLoading: isRoleLoading,
    error: isRoleError,
    data: roleList,
  } = useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: fetchRoleData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  const uniqueDepartments = new Set(data?.map((user) => user.department));
  const departmentCount = uniqueDepartments.size;

  const uniqueRoles = new Set(roleList?.map((user) => user.role));
  const roleCount = uniqueRoles.size;

  const uniqueUsers = new Set(data?.map((user) => user.id));
  const usersCount = uniqueUsers.size;

  return (
    <>
      <Card
        userCount={usersCount}
        departmentCount={departmentCount}
        roleCount={roleCount}
      />
    </>
  );
}

function Card({
  userCount,
  departmentCount,
  roleCount,
}: {
  userCount: number;
  departmentCount: number;
  roleCount: number;
}) {
  return (
    <>
      <h1>Users</h1>
      <div className="grid grid-cols-3 gap-2">
        <div className="card p-3 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h1 className="text-1xl font-bold text-gray-500 whitespace-nowrap h-11 flex items-center">
              Total of {userCount} Users
            </h1>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <p className="text-3xl"></p>
            <p className="text-1xl font-bold hover:underline cursor-pointer">
              Users
            </p>
          </div>
        </div>
        <div className="card p-3 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h1 className="text-1xl font-bold text-gray-500 whitespace-nowrap h-11 flex items-center">
              Total of {departmentCount} Departments
            </h1>
            <div></div>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <p className="text-3xl">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 640 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h89.9c-6.3-10.2-9.9-22.2-9.9-35.1c0-46.9 25.8-87.8 64-109.2V271.8 48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zM576 272a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM352 477.1c0 19.3 15.6 34.9 34.9 34.9H605.1c19.3 0 34.9-15.6 34.9-34.9c0-51.4-41.7-93.1-93.1-93.1H445.1c-51.4 0-93.1 41.7-93.1 93.1z"></path>
              </svg>
            </p>
            <p className="text-1xl font-bold hover:underline cursor-pointer">
              Departments
            </p>
          </div>
        </div>
        <div className="card p-3 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h1 className="text-1xl font-bold text-gray-500 whitespace-nowrap h-11 flex items-center">
              Total of {roleCount} Roles
            </h1>
            <div></div>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <p className="text-3xl">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M17 11c.34 0 .67.04 1 .09V6.27L10.5 3 3 6.27v4.91c0 4.54 3.2 8.79 7.5 9.82.55-.13 1.08-.32 1.6-.55-.69-.98-1.1-2.17-1.1-3.45 0-3.31 2.69-6 6-6z"></path>
                <path d="M17 13c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 1.38c.62 0 1.12.51 1.12 1.12s-.51 1.12-1.12 1.12-1.12-.51-1.12-1.12.5-1.12 1.12-1.12zm0 5.37c-.93 0-1.74-.46-2.24-1.17.05-.72 1.51-1.08 2.24-1.08s2.19.36 2.24 1.08c-.5.71-1.31 1.17-2.24 1.17z"></path>
              </svg>
            </p>
            <p className="text-1xl font-bold hover:underline cursor-pointer">
              Roles
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersList;
