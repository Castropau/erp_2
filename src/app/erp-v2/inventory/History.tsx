"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
// import { FetchInventories, Inventories } from "@/api/inventory/Inventory";
// import InventoryCard from "./_components/Card";
// import AddLocation from "./_components/Modal/AddLocation";
import { AllLocation } from "@/api/inventory/fetchLocations";

export default function History() {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [isClicked, setIsClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  // const { isLoading, error, data } = useQuery<Inventories[]>({
  //   queryKey: ["inventory"],
  //   queryFn: FetchInventories,
  // });
  const {
    isLoading: isLocationLoading,
    // error: locationError,
    data: location,
  } = useQuery({
    queryKey: ["asd"],
    queryFn: AllLocation,
    // refetchInterval: 1000,
  });

  const handleExcel = () => {
    console.log("test");
  };
  // if (isLoading) return <div>Loading...</div>;
  // if (error instanceof Error)
  //   return <div>An error has occurred: {error.message}</div>;

  return (
    // <button
    //   className={`btn ${
    //     isClicked ? "bg-blue-500 text-white" : "bg-transparent text-blue-500"
    //   }`}
    //   onClick={() => setIsClicked(!isClicked)}
    // >
    //   Historysss
    // </button>
    <div className="bg-white p-4 rounded-lg dark:bg-gray-700 dark:text-white">
      {/* <AddLocation /> */}
      <button
        onClick={handleExcel}
        // className="btn bg-blue-700 text-white uppercase"
        className="btn bg-green-600 mb-2 hover:bg-green-700 text-white font-semibold uppercase"
      >
        export to excels
      </button>
      {isLocationLoading ? (
        <div>Loading locations...</div>
      ) : (
        <table className="table-zebra w-full border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-white text-black  border-b-gray-400">
            <tr className="text-sm font-medium text-center uppercase">
              <th className="p-2 text-center">Location</th>
              <th className="p-2 text-center">action</th>
              <th className="p-2 text-center">action</th>
              <th className="p-2 text-center">action</th>
              <th className="p-2 text-center">action</th>
              <th className="p-2 text-center">action</th>
              <th className="p-2 text-center">action</th>
            </tr>
          </thead>
          <tbody>
            {location?.map((location) => (
              <tr key={location.id} className="">
                <td className="p-2 text-center">{location.location}</td>
                <td className="p-2 text-center">{location.location}</td>
                <td className="p-2 text-center">{location.location}</td>
                <td className="p-2 text-center">{location.location}</td>
                <td className="p-2 text-center">{location.location}</td>
                <td className="p-2 text-center">{location.location}</td>

                <td className="p-2 text-center">
                  <button
                    className="text-blue-600 hover:cursor-pointer hover:underline hover:text-blue-700 text-xs uppercase font-medium"
                    onClick={() => {
                      setSelectedItem(location);
                      setIsItemModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
