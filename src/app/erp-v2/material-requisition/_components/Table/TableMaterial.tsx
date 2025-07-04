import React from "react";
import { ChequeLists } from "@/api/cheque-request/fetchCheque";

type ChequeTableProps = {
  data: ChequeLists[];
  onViewClick: (id: string) => void;
  onDeleteClick: (id: number) => void;
  loadingId: string | null;
};

const TableMaterial: React.FC<ChequeTableProps> = ({
  data,
  onViewClick,
  onDeleteClick,
  loadingId,
}) => {
  return (
    <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
      <table className="table table-xs w-full border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-white text-black  border-b-gray-400">
          <tr className="text-sm font-medium text-center uppercase">
            <th className="px-4 py-2">Serial No</th>
            <th className="px-4 py-2">Purpose</th>
            <th className="px-4 py-2">Requested By</th>
            <th className="px-4 py-2">Date Requested</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center text-gray-500 py-4 dark:bg-gray-dark dark:text-white"
              >
                No records found.
              </td>
            </tr>
          ) : (
            data.map((cheque, index) => (
              <tr
                key={cheque.id}
                className={`transition-colors duration-300 ease-in-out ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                } text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                <td className="text-xs text-center">{cheque.serial_no}</td>
                <td className="px-4 py-2 text-center">
                  {cheque.purpose.length > 17
                    ? `${cheque.purpose.slice(0, 17)}...`
                    : cheque.purpose}
                </td>
                <td className="text-xs text-center">{cheque.requested_by}</td>
                <td className="text-xs text-center">{cheque.date_requested}</td>
                <td className="text-xs text-center">
                  <span
                    className={`text-black text-xs font-semibold px-3 py-1 rounded-full ${
                      cheque.status ? "text-black" : "text-black"
                    }`}
                  >
                    {cheque.status ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="text-xs flex gap-2 text-center justify-center py-1 px-4">
                  <button
                    onClick={() => onViewClick(cheque.id as string)}
                    className="hover:underline hover:cursor-pointer flex items-center gap-2   text-blue-800  px-4 py-2 transition duration-200 uppercase"
                    disabled={loadingId === cheque.id}
                  >
                    {loadingId === cheque.id ? (
                      <span className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "View"
                    )}
                  </button>
                  <button
                    onClick={() => onDeleteClick(cheque.id as number)}
                    className="hover:underline hover:cursor-pointer flex items-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                  >
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

export default TableMaterial;
