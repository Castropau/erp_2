import React from "react";
// import { ChequeLists } from "@/api/cheque-request/fetchCheque";
// import PersonalInformation from "../Modal/PersonalInformation";
import ModuleAccess from "../Modal/ModuleAccess";
interface User {
  id: number | string; // id as an integer
  full_name: string; // full_name as a string
  department: string; // department as a string
  role: string;
  is_active: boolean;
  is_superuser: boolean;
}

type TableUsersProps = {
  data: User[];
  onViewClick: (id: string) => void;
  loadingId: string | null;
};

const TableUsers: React.FC<TableUsersProps> = ({
  data,
  loadingId,
  onViewClick,
}) => {
  return (
    <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
      <table className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-white text-black  border-b-gray-400">
          <tr className="text-sm font-medium text-center uppercase">
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Active</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center text-gray-500 py-4 dark:bg-gray-dark dark:text-white"
              >
                No records found
              </td>
            </tr>
          ) : (
            data?.map((user) => (
              <tr
                key={user.id}
                className={`transition-colors duration-300 ease-in-out
      
       text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-400`}
              >
                <td className="text-xs text-center">{user.full_name}</td>
                <td className="text-xs text-center">{user.department}</td>
                <td className="text-xs text-center">{user.role}</td>
                <td className="text-xs text-center">
                  <span
                    className={`${
                      user.is_active ? " text-black" : " text-black"
                    } py-1 px-3 rounded-full`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="text-xs flex gap-2 justify-center">
                  <div className="inline-flex gap-2 items-center justify-center">
                    {/* <PersonalInformation id={user.id} /> */}
                    <button
                      onClick={() => onViewClick(user.id as string)}
                      className="btn btn-xs bg-white"
                      disabled={loadingId === user.id}
                    >
                      {loadingId === user.id ? (
                        <span className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        "View"
                      )}
                    </button>
                    <ModuleAccess />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
