// // components/TablePurchase.tsx
// import { deleteClients } from "@/api/clients/deleteClients";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import React from "react";
// import ViewPurchase from "../Modal/ViewPurchase";
// import { deletePurchases } from "@/api/delivery_receipt/deletePurchaseOrder";
import { PurchaseOrder } from "@/api/purchase-order/fetchPurchase";

type Column<PurchaseOrder> = {
  header: string;
  accessor: keyof PurchaseOrder;
};

type Props<Purchase> = {
  data: PurchaseOrder[];
  columns: Column<Purchase>[];
  currentPage: number;
  rowsPerPage: number;
  // onView: (id: number) => void;
  // onDelete: (id: number) => void;
  redirectingId: number | null;
  onViewClick: (id: string) => void;
  loadingId: string | null;
  deletePurchase: (id: number) => void;
};

function TablePurchase<T extends { id: number }>({
  data,
  // columns,
  // currentPage,
  // rowsPerPage,
  loadingId,
  onViewClick,
  // onView,
  // onDelete,
  // redirectingId,
  deletePurchase,
}: Props<T>) {
  // const paginatedData = data.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );
  // const queryClient = useQueryClient();
  // const { mutate: deletePurchase } = useMutation({
  //   mutationFn: (id: number) => deletePurchases(id),
  //   onSuccess: () => {
  //     console.log("Deleted successfully");
  //     queryClient.invalidateQueries({ queryKey: ["cash"] });
  //     setShowSuccess(true); // show alert
  //     setTimeout(() => setShowSuccess(false), 3000);
  //   },
  //   onError: (error) => {
  //     console.error("Error deleting cash:", error);
  //   },
  // });
  // const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
      <table className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-white text-black  border-b-gray-400">
          <tr className="text-sm font-medium text-center uppercase">
            <th className="px-4 py-2">PO No.</th>
            <th className="px-4 py-2">To</th>
            <th className="px-4 py-2">Grand Total</th>
            <th className="px-4 py-2">Created By</th>
            <th className="px-4 py-2">Date Created</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td
                colSpan={6}
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
                <td className="text-xs text-center">{user.po_no}</td>
                <td className="text-xs text-center">{user.vendor}</td>
                <td className="text-xs text-center">
                  ₱ {user.grand_total.toLocaleString()}
                </td>
                <td className="text-xs text-center">{user.created_by}</td>
                <td className="text-xs text-center">{user.date_created}</td>
                {/* <td className="px-4 py-2  justify-center flex gap-2"> */}
                <td className=" text-xs flex gap-2 justify-center py-1 px-4">
                  {/* <ViewPurchase id={user.id} />
                   */}
                  {/* <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs shadow transition duration-200">
                        <FaTrash /> Delete
                      </button> */}
                  <button
                    onClick={() => onViewClick(user.id as string)}
                    className="hover:underline hover:cursor-pointer flex items-center gap-2   text-blue-800  px-4 py-2 transition duration-200 uppercase"
                    disabled={loadingId === user.id}
                  >
                    {loadingId === user.id ? (
                      <span className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "View"
                    )}
                  </button>
                  <button
                    // onClick={() => {
                    //   if (
                    //     confirm(
                    //       "Are you sure you want to delete this cash request?"
                    //     )
                    //   ) {
                    //     deletePurchase(user.id as number);
                    //   }
                    // }}
                    onClick={() => deletePurchase(user.id as number)}
                    className="hover:underline hover:cursor-pointer flex items-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"

                    // className="uppercase flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs shadow transition duration-200"
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
}

export default TablePurchase;
