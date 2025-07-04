// components/TableDelivery.tsx
// import { deleteClients } from "@/api/clients/deleteClients";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import React from "react";
// import ViewDeliveryReceipt from "../ViewDeliveryReceipt";
// import { deleteReceipt } from "@/api/delivery_receipt/deleteReceipt";
import { Delivery } from "@/api/delivery_receipt/fetchDelivery";

type Column<Delivery> = {
  header: string;
  accessor: keyof Delivery;
};

type Props = {
  data: Delivery[];
  columns: Column<Delivery>[];
  currentPage: number;
  rowsPerPage: number;
  redirectingId: number | null;
  onViewClick: (id: string) => void;
  loadingId: string | null;
  handleDelete: (id: number) => void;
};

const TableDelivery: React.FC<Props> = ({
  data,
  // columns,
  // currentPage,
  // rowsPerPage,
  loadingId,
  onViewClick,
  // onView,
  // onDelete,
  // redirectingId,
  handleDelete,
}) => {
  // const paginatedData = data.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );
  // const queryClient = useQueryClient();
  // const [deletingId, setDeletingId] = useState<number | null>(null);

  // const [showSuccess, setShowSuccess] = useState(false);
  // const [redirecting, setRedirecting] = useState<number | null>(null); // null when not redirecting
  // const router = useRouter();

  // const { mutate: deleteReceipts } = useMutation({
  //   mutationFn: (id: number) => deleteReceipt(id),
  //   onMutate: (id) => {
  //     setDeletingId(id); // Set loading for specific row
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["delivery_delete"] });
  //     setShowSuccess(true);
  //     setTimeout(() => setShowSuccess(false), 3000);
  //     setDeletingId(null); // Reset loading
  //   },
  //   onError: (error) => {
  //     console.error("Error deleting:", error);
  //     setDeletingId(null); // Reset loading on error too
  //   },
  // });
  return (
    <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
      <table className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-white text-black  border-b-gray-400">
          <tr className="text-sm font-medium text-center uppercase">
            <th className="px-4 py-2 ">Date</th>
            <th className="px-4 py-2 ">Delivered To</th>
            <th className="px-4 py-2 ">Address</th>
            <th className="px-4 py-2 ">PO No.</th>
            <th className="px-4 py-2 ">OR No.</th>
            <th className="px-4 py-2 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-4">
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
                <td className="text-xs text-center">{user.date}</td>
                <td className="text-xs text-center">{user.delivered_to}</td>
                <td className="text-xs text-center">{user.address}</td>
                <td className="text-xs text-center">{user.po_no}</td>
                <td className="text-xs text-center">{user.or_no}</td>
                {/* <td className="px-4 py-2 text-center flex justify-center gap-2"> */}
                <td className=" text-xs flex gap-2 text-center justify-center py-1 px-4">
                  {/* <ViewDeliveryReceipt id={user.id} /> */}
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
                  {/* <button className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition">
                         Delete
                       </button> */}
                  <button
                    className="hover:underline hover:cursor-pointer flex items-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                    // className="uppercase flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs shadow transition duration-200"
                    // onClick={() => {
                    //   if (
                    //     confirm("Are you sure you want to delete this client?")
                    //   ) {
                    //     deleteReceipts(user.id as number);
                    //   }
                    // }}
                    // disabled={deletingId === user.id}
                    onClick={() => handleDelete(user.id as number)}
                  >
                    {/* {deletingId === user.id ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <>Delete</>
                    )} */}
                    delete
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

export default TableDelivery;
