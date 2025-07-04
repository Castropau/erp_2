"use client";

import { Quatations } from "@/api/quotation/fetchQuo";
// import View from "../Modal/View";

type Props = {
  data: Quatations[];
  totalPages: number;
  currentPage: number;
  handleDelete: (id: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  onViewClick: (id: string) => void;
  loadingId: string | null;
};

const TableQuotation: React.FC<Props> = ({
  data,
  totalPages,
  currentPage,
  loadingId,
  onViewClick,
  handleDelete,
  handlePrev,
  handleNext,
}) => {
  return (
    <>
      <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
        <table className="table table-xs w-full border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-white text-black  border-b-gray-400">
            <tr className="text-sm font-medium text-center uppercase">
              <th className="py-2 px-4 ">Quotation</th>
              <th className="py-2 px-4 ">Project</th>
              <th className="py-2 px-4 ">To</th>
              <th className="py-2 px-4 ">Created by</th>
              <th className="py-2 px-4 ">Date created</th>
              <th className="py-2 px-4 ">Status</th>
              <th className="py-2 px-4 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              data.map((user, index) => (
                <tr
                  key={user.id}
                  className={`transition-colors duration-300 ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  } text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <td className="text-xs text-center">{user.quotation_no}</td>
                  <td className="text-xs text-center">{user.project_name}</td>
                  <td className="text-xs text-center">{user.client}</td>
                  <td className="text-xs text-center">{user.created_by}</td>
                  <td className="text-xs text-center">{user.date_created}</td>
                  <td className="text-xs text-center">
                    <span
                      className={`${
                        user.status ? "text-black" : "text-black"
                      } text-black py-1 px-3 rounded-full`}
                    >
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-xs flex gap-2 justify-center">
                    {/* <View id={user.id} /> */}
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
                      className="hover:underline hover:cursor-pointer flex items-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                      // onClick={() => {
                      //   if (confirm("Are you sure you want to delete this?")) {
                      //     handleDelete(user.id as number);
                      //   }
                      // }}
                      onClick={() => handleDelete(user.id as number)}
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

export default TableQuotation;
