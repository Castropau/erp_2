import React from "react";
import { Vendor } from "@/api/vendor/fetchVendor";

type Props = {
  vendors: Vendor[]; // <-- Already paginated!
  currentPage: number;
  rowsPerPage: number;
  onView: (id: number) => void;
  handleDelete: (id: number) => void;
  redirectingId: number | null;
  handlePrev: () => void;
  handleNext: () => void;
};

const TableVendor: React.FC<Props> = ({
  vendors,
  // currentPage,
  // rowsPerPage,
  onView,
  handleDelete,
  redirectingId,
  // handlePrev,
  // handleNext,
}) => {
  return (
    <>
      <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
        <table className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-white text-black  border-b-gray-400">
            <tr className="text-sm font-medium text-center uppercase">
              <th className="px-4 py-2">Vendor</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              vendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className={`
                    
                    
                   text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <td className="text-xs text-center">{vendor.vendor}</td>
                  <td className="text-xs text-center">
                    {vendor.contact_number}
                  </td>
                  <td className="text-xs text-center">{vendor.email}</td>
                  <td className="text-xs flex gap-2 justify-center py-1 px-4">
                    <button
                      onClick={() => onView(vendor.id)}
                      className="hover:underline hover:cursor-pointer flex items-center gap-2   text-blue-800  px-4 py-2 transition duration-200 uppercase"
                    >
                      {redirectingId === vendor.id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        "View"
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(vendor.id)}
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
    </>
  );
};

export default TableVendor;
