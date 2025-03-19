'use client';

import { useQuery } from "@tanstack/react-query";

/** api */
import { fetchUserList } from "@/api/User/fetchUserList";

interface User {
    id: number; // id as an integer
    full_name: string; // full_name as a string
    department: string; // department as a string
    role: string;
    is_active: boolean;
    is_superuser: boolean;
  }

export default function UserList() {
    const { isLoading, error, data } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUserList,
    });

    if (isLoading) return <div>Loading...</div>;

    if (error instanceof Error) return <div>An error has occurred: {error.message}</div>;

    return (
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
                        <td>{user.department}</td>
                        <td>{user.role}</td>
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
    )
}
