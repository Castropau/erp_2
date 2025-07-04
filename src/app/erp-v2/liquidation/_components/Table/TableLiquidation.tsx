"use client";

import { Liquidations } from "@/api/liquidations/fetchLiq";
// import ViewLiquidation from "../Modal/ViewLiquidation";

type Props = {
  data: Liquidations[];
  currentPage: number;
  rowsPerPage: number;
  handleDelete: (id: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  onViewClick: (id: string) => void;
  loadingId: string | null;
};

const TableLiquidation: React.FC<Props> = ({
  data,
  currentPage,
  rowsPerPage,
  loadingId,
  onViewClick,
  handleDelete,
  handlePrev,
  handleNext,
}) => {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
        <table className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-white text-black  border-b-gray-400">
            <tr className="text-sm font-medium text-center uppercase">
              <th className="py-2 px-4">LIQ</th>
              <th className="py-2 px-4">Project Name</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Remitted By</th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-4 text-gray-500 dark:bg-gray-dark dark:text-white"
                >
                  No records found
                </td>
              </tr>
            ) : (
              paginatedData.map((user) => (
                <tr
                  key={user.id}
                  className={`transition-colors duration-300 ease-in-out text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <td className="text-xs text-center">{user.liquidation_no}</td>
                  <td className="text-xs text-center">
                    {user.project_name.length > 17
                      ? `${user.project_name.slice(0, 17)}...`
                      : user.project_name}
                  </td>
                  <td className="text-xs text-center">{user.date}</td>
                  <td className="text-xs text-center">{user.remitted_by}</td>
                  <td className="text-xs text-center">{user.total}</td>
                  <td className="text-xs flex gap-2 justify-center py-1 px-4">
                    {/* <ViewLiquidation id={user.id} /> */}
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
                      onClick={() =>
                        confirm(
                          "Are you sure you want to delete this cash request?"
                        ) && handleDelete(user.id as number)
                      }
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

      <div className="flex justify-end items-center gap-3 mt-6 text-sm">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TableLiquidation;
