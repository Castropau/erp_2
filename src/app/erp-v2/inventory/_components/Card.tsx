import { FetchInventories, Inventories } from "@/api/inventory/Inventory";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { IoGrid, IoGridOutline } from "react-icons/io5";
import AddInventory from "./Modal/AddInventory";
import Export from "./Modal/Export";

const InventoryCard = () => {
  const { isLoading, error, data } = useQuery<Inventories[]>({
    queryKey: ["inventory"],
    queryFn: FetchInventories,
  });

  const [isDropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleDropdown = (id: number) => {
    setDropdownOpen((prevId) => (prevId === id ? null : id));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  const toggleView = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  const renderGridView = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.map((inventory) => (
          <div
            key={inventory.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative"
          >
            <img
              src={inventory.photos}
              alt={inventory.item}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h4 className="text-lg font-medium">{inventory.item}</h4>
            <p className="text-sm text-gray-500">{inventory.specification}</p>
            <div className="mt-2">
              <span className="text-sm font-semibold">Category:</span>{" "}
              {inventory.category}
            </div>
            <div className="mt-1">
              <span className="text-sm font-semibold">Quantity:</span>{" "}
              {inventory.quantity}
            </div>
            <div className="mt-1">
              <span className="text-sm font-semibold">Unit:</span>{" "}
              {inventory.unit_of_measurement}
            </div>

            {/* Dropdown button */}
            <div className="absolute top-2 right-2">
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(inventory.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12h12M6 6h12M6 18h12"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen === inventory.id && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10">
                  <div className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    View
                  </div>
                  <div className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Delete
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderListView = () => (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="text-blue-500">
          <th>Item</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((inventory) => (
          <tr key={inventory.id} className="border-b">
            <td className="p-2">{inventory.item}</td>
            <td className="p-2">{inventory.category}</td>
            <td className="p-2">{inventory.quantity}</td>
            <td className="p-2">{inventory.unit_of_measurement}</td>
            <td className="p-2 flex justify-center gap-2">
              <button className="text-blue-500">View</button>
              <button className="text-red-500">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <div>
        <div className="flex justify-start mb-4 gap-2">
          <AddInventory />
          <Export />
          <button className="btn bg-blue-500 text-white" onClick={toggleView}>
            {viewMode === "grid" ? (
              <>
                <IoGrid className="mr-2" />
                Switch to List View
              </>
            ) : (
              <>
                <FaListAlt className="mr-2" />
                Switch to Grid View
              </>
            )}
          </button>
        </div>

        {viewMode === "grid" && renderGridView()}
        {viewMode === "list" && renderListView()}
      </div>
      {/* <AddInventory /> */}
    </>
  );
};

export default InventoryCard;
