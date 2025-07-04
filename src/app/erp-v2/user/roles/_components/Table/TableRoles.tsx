"use client";

// import { RequisitionCash } from "@/api/cash-request/fetchCashRequest";
import { Role } from "@/interfaces/Role";
import EditRole from "../Modal/EditRole";

type Props = {
  data: Role[];
  currentPage: number;
  rowsPerPage: number;
  onViewClick: (id: string) => void;
  loadingId: string | null;

  handleDelete: (id: number | string) => void;
  handlePrev: () => void;
  handleNext: () => void;
};

const TableRoles: React.FC<Props> = ({
  data,
  currentPage,
  rowsPerPage,
  // loadingId,
  // onViewClick,
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
              {/* <th className="px-4 py-2">Serial #</th> */}
              <th className="px-4 py-2">Role</th>

              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">
                  No records found
                </td>
              </tr>
            ) : (
              paginatedData.map((user) => (
                <tr
                  key={user.id}
                  className={`transition-colors duration-300 ease-in-out 
                   
                   text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  {/* <td className="text-xs text-center">{user.id}</td> */}

                  <td className="text-xs text-center">{user.role}</td>
                  <td className="text-xs flex gap-2 justify-center">
                    {/* <EditCashRequest id={user.id} /> */}
                    <EditRole id={user.id} />
                    {/* <button
                      onClick={() => onViewClick(user.id as string)}
                      className="hover:underline hover:cursor-pointer flex items-center gap-2   text-blue-800  px-4 py-2 transition duration-200 uppercase"
                      disabled={loadingId === (user.id as string)}
                    >
                      {loadingId === (user.id as string) ? (
                        <span className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        "View"
                      )}
                    </button> */}
                    <button
                      className="hover:underline hover:cursor-pointer flex items-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                      onClick={() => handleDelete(user.id)}
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

      <div className="flex justify-end items-center gap-1 mt-2 text-sm">
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

export default TableRoles;
