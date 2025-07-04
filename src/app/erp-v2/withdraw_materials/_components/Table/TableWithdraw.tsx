import React, { useState } from "react";
// import { ChequeLists } from "@/api/cheque-request/fetchCheque";
import { useRouter } from "next/navigation";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteMaterial } from "@/api/withdraw-materials/deleteMaterials";
import { Withdraw } from "@/api/withdraw-materials/fetchWithdraw";

type TableWithdrawProps = {
  data: Withdraw[];
  // onViewClick: (id: string) => void;
  // onDeleteClick: (id: number) => void;
  loadingId: string | null;
  deleteMaterials: (id: number) => void;
};

const TableWithdraw: React.FC<TableWithdrawProps> = ({
  data,
  // onViewClick,
  // onDeleteClick,
  // loadingId,
  deleteMaterials,
}) => {
  // const [isLoadings, setIsLoading] = useState(false);
  const router = useRouter();
  // const queryClient = useQueryClient();
  // const [showSuccess, setShowSuccess] = useState(false);

  const [redirecting, setRedirecting] = useState<number | null>(null); // null when not redirecting
  // const handleRedirect = () => {
  //   setIsLoading(true);
  //   router.push("/erp-v2/withdraw_materials/add-material-request");
  // };
  // const { mutate: deleteMaterials } = useMutation({
  //   mutationFn: (id: number) => deleteMaterial(id),
  //   onSuccess: () => {
  //     console.log("Deleted successfully");
  //     queryClient.invalidateQueries({ queryKey: ["vendor"] });
  //     setShowSuccess(true); // show alert
  //     setTimeout(() => setShowSuccess(false), 3000);
  //   },
  //   onError: (error) => {
  //     console.error("Error deleting cash:", error);
  //   },
  // });
  return (
    <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
      <table className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-white text-black  border-b-gray-400">
          <tr className="text-sm font-medium text-center uppercase">
            <th className="px-4 py-2">Serial #</th>
            <th className="px-4 py-2">Purpose</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date Needed</th>
            <th className="px-4 py-2">Requested by</th>
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
   
    text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                <td className="text-xs text-center">{user.serial_no}</td>
                <td className="text-xs text-center">{user.purpose}</td>
                <td className="text-xs text-center">{user.status}</td>
                <td className="text-xs text-center">{user.date_needed}</td>
                <td className="text-xs text-center">
                  {user.name_of_requestor.full_name}
                </td>
                {/* <td className="text-xs text-center px-4 py-2"> */}
                <td className=" text-xs flex gap-2 text-center justify-center py-1 px-4">
                  {/* <div className="flex items-center gap-2 justify-center"> */}
                  {/* View Button */}
                  {/* <Link
                        href={`/erp-v2/withdraw_materials/view/${user.id}`}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm shadow transition"
                      >
                        <FaEye className="w-4 h-4" />
                        View
                      </Link> */}
                  <button
                    onClick={() => {
                      setRedirecting(user.id);
                      setTimeout(() => {
                        router.push(
                          `/erp-v2/withdraw_materials/view/${user.id}`
                        );
                      }, 500); // Optional delay to show the spinner
                    }}
                    className="hover:underline hover:cursor-pointer flex items-center gap-2   text-blue-800  px-4 py-2 transition duration-200 uppercase"

                    // className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition flex items-center gap-2"
                  >
                    {redirecting === user.id ? (
                      <span className="loading loading-spinner loading-xs  "></span>
                    ) : (
                      "View"
                    )}
                  </button>

                  {/* Delete Button */}
                  {/* <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm shadow transition">
                        <FaTrash className="w-4 h-4" />
                        Delete
                      </button> */}
                  <button
                    className="hover:underline hover:cursor-pointer flex items-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                    // className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs shadow transition duration-200 uppercase"
                    // className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs shadow transition duration-200"
                    // onClick={() => {
                    //   if (
                    //     confirm(
                    //       "Are you sure you want to delete this cash request?"
                    //     )
                    //   ) {
                    //     deleteMaterials(user.id);
                    //   }
                    // }}
                    onClick={() => deleteMaterials(user.id as number)}
                  >
                    {/* <FaTrash /> */}
                    Delete
                  </button>
                  {/* </div> */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithdraw;
