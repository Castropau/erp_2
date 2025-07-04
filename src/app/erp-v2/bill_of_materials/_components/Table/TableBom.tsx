import React from "react";
// import { ChequeLists } from "@/api/cheque-request/fetchCheque";
// import EditBom from "../Modal/EditBom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBom } from "@/api/bill_of_materials/deleteBom";
import { Boms } from "@/api/bill_of_materials/fetchBill";

type TableBomProps = {
  data: Boms[];
  onViewClick: (id: string) => void;
  loadingId: string | null;
};

const TableBom: React.FC<TableBomProps> = ({
  data,
  loadingId,
  onViewClick,
}) => {
  const queryClient = useQueryClient();

  const { mutate: deleteBoms } = useMutation({
    mutationFn: (id: number) => deleteBom(id),
    onSuccess: () => {
      console.log("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bom"] });
      // setShowSuccess(true); // show alert
      // setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      console.error("Error deleting cash:", error);
    },
  });
  // const [showSuccess, setShowSuccess] = useState(false);
  const statusColorMap: Record<string, string> = {
    Pending: " text-black",
    Approved: " text-black",
    "Approved To Be Revised": " text-black",
    Revised: " text-black",
    Cancelled: " text-black",
    Noted: " text-black",
  };

  return (
    <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
      <table className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-white text-black  border-b-gray-400">
          <tr className="text-sm font-medium text-center uppercase">
            <th className="px-4 py-2">BOM No</th>
            <th className="px-4 py-2">Project Name</th>
            <th className="px-4 py-2">Client</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Prepared By</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center text-gray-500 py-6 dark:bg-gray-dark dark:text-white"
              >
                No records found
              </td>
            </tr>
          ) : (
            data?.map((bom) => (
              <tr
                key={bom.id}
                className={`transition-colors duration-300 ease-in-out
       
       text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                <td className="text-xs text-center">{bom.bom_no}</td>
                <td className="text-xs text-center">{bom.project_name}</td>
                <td className="text-xs text-center">{bom.client}</td>
                <td className="text-xs text-center">{bom.date_created}</td>
                <td className="text-xs text-center">{bom.created_by}</td>
                <td className="text-xs text-center">
                  <span
                    className={`inline-block text-xs font-medium py-1 px-3 rounded-full ${
                      statusColorMap[bom.status] || "bg-gray-300 text-black"
                    }`}
                  >
                    {bom.status}
                  </span>
                </td>
                {/* <td className="px-4 py-2 text-center"> */}
                <td className=" text-xs flex gap-2 text-center justify-center py-1 px-4">
                  {/* <div className="inline-flex items-center justify-center gap-2"> */}
                  {/* <EditBom id={bom.id} /> */}
                  <button
                    onClick={() => onViewClick(bom.id as string)}
                    className="hover:underline hover:cursor-pointer flex items-center gap-2   text-blue-800  px-4 py-2 transition duration-200 uppercase"
                    disabled={loadingId === bom.id}
                  >
                    {loadingId === bom.id ? (
                      <span className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "View"
                    )}
                  </button>
                  <button
                    className="hover:underline hover:cursor-pointer flex items-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                    // className="uppercase flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs shadow transition duration-200"
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to delete this cash request?"
                        )
                      ) {
                        deleteBoms(bom.id as number);
                      }
                    }}
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

export default TableBom;
