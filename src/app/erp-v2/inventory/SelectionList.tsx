"use client";

import { useQuery } from "@tanstack/react-query";
/**state */
import React, { useState } from "react";

/** api */
import { FetchCategories } from "@/api/inventory/FetchCategory";
import { FetchLocation } from "@/api/inventory/FetchLocation";
import InventoryCard from "./_components/Card";
import AddCategory from "./_components/Modal/AddCategory";
import AddLocation from "./_components/Modal/AddLocation";

/** components */
export default function SelectionList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Categories Data
  const {
    isLoading: isCategoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: FetchCategories,
  });

  // Fetch Location Data
  const {
    isLoading: isLocationLoading,
    error: locationError,
    data: locationData,
  } = useQuery({
    queryKey: ["location"],
    queryFn: FetchLocation,
  });

  if (isCategoriesLoading && isLocationLoading)
    return <div>Loading categories and locations...</div>;

  if (categoriesError instanceof Error)
    return (
      <div>
        An error occurred while fetching categories: {categoriesError.message}
      </div>
    );

  if (locationError instanceof Error)
    return (
      <div>
        An error occurred while fetching locations: {locationError.message}
      </div>
    );

  return (
    <div className="p-4">
      {/* Two-column table layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Table 1 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <AddCategory />
          {isCategoriesLoading ? (
            <div>Loading categories...</div>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="text-blue-500">
                  <th className="p-2 text-left">Category</th>
                </tr>
              </thead>
              <tbody>
                {categoriesData?.map((category) => (
                  <tr key={category.id} className="border-b">
                    <td className="p-2">{category.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Table 2 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <AddLocation />
          {isLocationLoading ? (
            <div>Loading locations...</div>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="text-blue-500">
                  <th className="p-2 text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                {locationData?.map((location) => (
                  <tr key={location.id} className="border-b">
                    <td className="p-2">{location.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
