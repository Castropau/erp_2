// components/TableClients.tsx
// import { deleteClients } from "@/api/clients/deleteClients";
import { Clientss } from "@/api/clients/fetchClients";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// type Column<T> = {
//   header: string;
//   accessor: keyof T;
// };

type Props = {
  data: Clientss[];
  // columns: Column<Clients>[];
  currentPage: number;
  rowsPerPage: number;
  // onView: (id: number) => void;
  deleteClientss: (id: number) => void;
  redirectingId: number | null;
};

const TableClients: React.FC<Props> = ({
  data,
  // columns,
  // currentPage,
  // rowsPerPage,
  // onView,
  deleteClientss,
  // redirectingId,
}) => {
  // const totalPages = Math.ceil(data.length / rowsPerPage);
  // const paginatedData = data.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );
  // const queryClient = useQueryClient();
  // const [showSuccess, setShowSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState<number | null>(null); // null when not redirecting
  const router = useRouter();

  // const { mutate: deleteClient } = useMutation({
  //   mutationFn: (id: number) => deleteClients(id),
  //   onSuccess: () => {
  //     console.log("Deleted successfully");
  //     queryClient.invalidateQueries({ queryKey: ["client"] });
  //     setShowSuccess(true); // show alert
  //     setTimeout(() => setShowSuccess(false), 3000);
  //   },
  //   onError: (error) => {
  //     console.error("Error deleting:", error);
  //   },
  // });
  return (
    <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
      <table className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-white text-black  border-b-gray-400">
          <tr className="text-sm font-medium text-center uppercase">
            <th className="px-4 py-2">Client Name</th>
            <th className="px-4 py-2">Contact Person</th>
            <th className="px-4 py-2">Contact Number</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 py-4">
                No records found
              </td>
            </tr>
          ) : (
            data?.map((user) => (
              <tr
                key={user.id}
                className={`transition-colors duration-300 ease-in-out
    
    text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                <td className="text-xs text-center">{user.client}</td>
                <td className="text-xs text-center">{user.contact_person}</td>
                <td className="text-xs text-center">{user.contact_number}</td>
                {/* <td className="px-4 py-2 text-center justify-center flex gap-2"> */}
                <td className=" text-xs flex gap-2 text-center justify-center py-1 px-4">
                  {/* <Link href={`/erp-v2/clients/view/${user.id}`}>
                      <button className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
                        View
                      </button>
                    </Link> */}
                  <button
                    onClick={() => {
                      setRedirecting(user.id);
                      setTimeout(() => {
                        router.push(`/erp-v2/clients/view/${user.id}`);
                      }, 500); // Optional delay to show the spinner
                    }}
                    className="hover:underline hover:cursor-pointer flex items-center gap-2   text-blue-800  px-4 py-2 transition duration-200 uppercase"
                  >
                    {redirecting === user.id ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "View"
                    )}
                  </button>

                  {/* <Link href="/erp-v2/vendors/view">
                      <button className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition">
                        Delete
                      </button>
                    </Link> */}
                  <button
                    className="hover:underline hover:cursor-pointer flex items-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                    // className="uppercase flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs shadow transition duration-200"
                    // onClick={() => {
                    //   if (
                    //     confirm("Are you sure you want to delete this clients?")
                    //   ) {
                    //     deleteClient(user.id);
                    //   }
                    // }}
                    onClick={() => deleteClientss(user.id as number)}
                  >
                    {/* <FaTrash /> */}
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableClients;
