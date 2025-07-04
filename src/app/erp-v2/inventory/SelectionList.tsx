"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/**state */
import React, { useState } from "react";

/** api */
import { FetchCategories } from "@/api/inventory/FetchCategory";
// import { FetchLocation } from "@/api/inventory/FetchLocation";
// import InventoryCard from "./_components/Card";
import AddCategory from "./_components/Modal/AddCategory";
import AddLocation from "./_components/Modal/AddLocation";
import { Form, Formik, Field } from "formik";
// import { deleteLocation } from "@/api/inventory/deleteLocation";
import {
  UpdateInventory,
  updateLocation,
} from "@/api/inventory/updateLocation";
import { updateCategory, UpdateCategory } from "@/api/inventory/updateCategory";
import { AllLocation } from "@/api/inventory/fetchLocations";

/** components */
export default function SelectionList() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPages, setCurrentPages] = useState(1);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const queryClient = useQueryClient();

  // Fetch Categories Data
  // interface Location {
  //   id: number;
  // }
  const {
    isLoading: isCategoriesLoading,
    // error: categoriesError,
    data: categoriesData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: FetchCategories,
    // refetchInterval: 1000,
  });

  // Fetch Location Data
  const {
    isLoading: isLocationLoading,
    // error: locationError,
    data: location,
  } = useQuery({
    queryKey: ["asd"],
    queryFn: AllLocation,
    // refetchInterval: 1000,
  });

  console.log("location data", location);

  const { mutate: updatedItem } = useMutation({
    mutationFn: (viewData: UpdateInventory) =>
      updateLocation(viewData.id, viewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setIsItemModalOpen(false);
    },
  });

  const { mutate: updatedCategories } = useMutation({
    mutationFn: (viewData: UpdateCategory) =>
      updateCategory(viewData.id, viewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setIsCategoryModalOpen(false);
    },
  });
  const ITEMS_PER_PAGE = 5;

  // Ensure categoriesData is always defined
  const safeCategoriesData = categoriesData || [];

  const totalPages = Math.ceil(safeCategoriesData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = safeCategoriesData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  //
  const perpages = 5; // Items per page

  // Ensure location is safe
  const safeLocations = location || [];

  const totalPagess = Math.ceil(safeLocations.length / perpages);
  const startIndexs = (currentPages - 1) * perpages;
  const paginatedLocations = safeLocations.slice(
    startIndexs,
    startIndexs + perpages
  );

  const next = () => {
    if (currentPages < totalPagess) setCurrentPages((prev) => prev + 1);
  };

  const prevs = () => {
    if (currentPages > 1) setCurrentPages((prev) => prev - 1);
  };

  // if (isCategoriesLoading && isLocationLoading) {
  //   return (
  //     <div className="p-4 flex justify-center items-center min-h-screen">
  //       <div className="flex flex-col items-center space-y-4">
  //         {/* Loading Spinner */}
  //         <div className="w-16 h-16 border-4 border-t-4 border-gray-800 border-dashed rounded-full animate-spin"></div>

  //         <span className="text-lg text-gray-700">
  //           Loading categories and locations...
  //         </span>
  //       </div>
  //     </div>
  //   );
  // }
  // if (categoriesError instanceof Error)
  //   return (
  //     <div>
  //       An error occurred while fetching categories: {categoriesError.message}
  //     </div>
  //   );

  // if (locationError instanceof Error)
  //   return (
  //     <div>
  //       An error occurred while fetching locations: {locationError.message}
  //     </div>
  //   );

  return (
    <div className="p-4">
      {/* Two-column table layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4  dark:bg-gray-700 dark:text-white">
          <AddCategory />
          {isCategoriesLoading ? (
            <div>Loading categories...</div>
          ) : (
            <>
              <table className="table-zebra w-full border border-gray-200 rounded-lg shadow-lg">
                <thead className="bg-white text-black  border-b-gray-400">
                  <tr className="text-sm font-medium text-center uppercase">
                    <th className="p-2 text-center">Category</th>
                    <th className="p-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData?.map((category) => (
                    <tr key={category.id} className="">
                      <td className="p-2 text-center">{category.category}</td>
                      <td className="p-2 text-center">
                        <button
                          className="text-blue-600 hover:cursor-pointer hover:underline hover:text-blue-700 text-xs uppercase font-medium"
                          onClick={() => {
                            setSelectedItem(category);
                            setIsCategoryModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end items-center gap-2 mt-3 text-sm">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-800 transition"
                >
                  Previous
                </button>

                <span className="text-gray-700 dark:text-white">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-800 transition"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        {/* Table 2 */}
        <div className="bg-white p-4 rounded-lg dark:bg-gray-700 dark:text-white">
          <AddLocation />
          {isLocationLoading ? (
            <div>Loading locations...</div>
          ) : (
            <>
              <table className="table-zebra w-full border border-gray-200 rounded-lg shadow-lg">
                <thead className="bg-white text-black  border-b-gray-400">
                  <tr className="text-sm font-medium text-center uppercase">
                    <th className="p-2 text-center">Location</th>
                    <th className="p-2 text-center">action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLocations?.map((location) => (
                    <tr key={location.id} className="">
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
              <div className="flex justify-end items-center gap-2 mt-3 text-sm">
                <button
                  onClick={prevs}
                  disabled={currentPages === 1}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-800 transition"
                >
                  Previous
                </button>

                <span className="text-gray-700 dark:text-white">
                  Page {currentPages} of {totalPagess}
                </span>

                <button
                  onClick={next}
                  disabled={currentPages === totalPagess}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-800 transition"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {isItemModalOpen && selectedItem && (
        <div className="fixed inset-0 flex justify-center items-center ">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Edit Location</h3>
            <Formik
              initialValues={{
                location: selectedItem.location || "",
              }}
              onSubmit={(values) => {
                updatedItem({ id: selectedItem.id, location: values.location });
                console.log(values.location);
              }}
            >
              <Form>
                <div className="mb-4">
                  <label htmlFor="item" className="block text-sm font-medium">
                    location
                  </label>
                  <Field
                    type="text"
                    id="item"
                    name="location"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="btn btn-secondary mr-4"
                    onClick={() => setIsItemModalOpen(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      {isCategoryModalOpen && selectedItem && (
        <div className="fixed inset-0 flex justify-center items-center ">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Edit category</h3>
            <Formik
              initialValues={{
                category: selectedItem.category || "",
              }}
              onSubmit={(values) => {
                updatedCategories({
                  id: selectedItem.id,
                  category: values.category,
                });
                console.log(values.category);
              }}
            >
              <Form>
                <div className="mb-4">
                  <label htmlFor="item" className="block text-sm font-medium">
                    category
                  </label>
                  <Field
                    type="text"
                    id="item"
                    name="category"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="btn btn-secondary mr-4"
                    onClick={() => setIsCategoryModalOpen(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
