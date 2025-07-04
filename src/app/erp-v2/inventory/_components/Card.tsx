import { FetchInventories, Inventories } from "@/api/inventory/Inventory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
// import { FaListAlt } from "react-icons/fa";
// import { IoGrid, IoGridOutline } from "react-icons/io5";
// import AddInventory from "./Modal/AddInventory";
// import Export from "./Modal/Export";
import Link from "next/link";
import ServerError from "@/components/Error/ServerError";
import * as XLSX from "xlsx-js-style";
import { deleteInventories } from "@/api/inventory/deleteInventor";
import { useRouter } from "next/navigation";

const InventoryCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessdeleted, setShowSuccessDeleted] = useState(false);
  const queryClient = useQueryClient();
  // const [showSuccess, setShowSuccess] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const router = useRouter();

  const rowsPerPage = 10;

  const { isLoading, error, data } = useQuery<Inventories[]>({
    queryKey: ["inventory"],
    queryFn: FetchInventories,
  });

  const [isDropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleDropdown = (id: number) => {
    setDropdownOpen((prevId) => (prevId === id ? null : id));
  };

  const filteredData = useMemo(() => {
    return data?.filter(
      (user) =>
        (user.item || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.category || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (user.description || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  // const handleExcel = () => {
  //   console.log(data);
  //   var wb = XLSX.utils.book_new(),
  //     ws = XLSX.utils.json_to_sheet(data!);
  //   XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
  //   const date = new Date().toLocaleDateString();
  //   XLSX.writeFile(wb, `Inventory_Items_${date}.xlsx`);
  // };
  // const handleExcel = () => {
  //   console.log(data);
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet(data!);

  //   // Set column widths (assuming 9 columns)
  //   ws["!cols"] = Array(9).fill({ wch: 30 });

  //   // Set all row heights to 30pt dynamically
  //   const numRows = data!.length;
  //   ws["!rows"] = Array(numRows).fill({ hpt: 30 });

  //   XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

  //   const date = new Date().toLocaleDateString();
  //   XLSX.writeFile(wb, `Inventory_Items_${date}.xlsx`);
  // };
  // const handleExcel = () => {
  //   if (!data || data.length === 0) return;

  //   const title = [["Inventory Report"]];

  //   const headers = [Object.keys(data[0])];

  //   const values = data.map((obj) => Object.values(obj));

  //   const sheetData = [...title, [], ...headers, ...values, []];

  //   // Create worksheet
  //   const ws = XLSX.utils.aoa_to_sheet(sheetData);

  //   // Set column widths
  //   const wscols = [
  //     { wch: 5 }, // ID
  //     { wch: 20 }, // Photos
  //     { wch: 30 }, // Item
  //     { wch: 30 }, // Specification
  //     { wch: 20 }, // Category
  //     { wch: 20 }, // Unit of Measurement
  //     { wch: 10 }, // Quantity
  //     { wch: 15 }, // Item No
  //     { wch: 40 }, // Description
  //   ];
  //   ws["!cols"] = wscols;

  //   // Set row heights (optional)
  //   ws["!rows"] = [
  //     { hpt: 30 }, // Title
  //     {}, // Empty row
  //     { hpt: 30 }, // Header
  //     ...values.map(() => ({ hpt: 30 })),
  //     {}, // Empty row
  //     { hpt: 30 }, // Last row
  //   ];

  //   // Create workbook and append sheet
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

  //   // Save file with date
  //   const date = new Date().toLocaleDateString().replace(/\//g, "-");
  //   XLSX.writeFile(wb, `Inventory_Items_${date}.xlsx`);
  // };
  const handleExcel = () => {
    if (!data || data.length === 0) return;

    const title = [["Inventory Report"]];
    const headers = [Object.keys(data[0])];
    const values = data.map((obj) => Object.values(obj));
    const lastRow = [["", "", "", "", "", "", "", "", "End of Report"]];

    const sheetData = [...title, [], ...headers, ...values, [], ...lastRow];

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // Merge title cells (A1 to I1)
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 8 } }];

    // Column widths
    ws["!cols"] = [
      { wch: 5 }, // ID
      { wch: 20 }, // Photos
      { wch: 30 }, // Item
      { wch: 30 }, // Specification
      { wch: 20 }, // Category
      { wch: 30 }, // Unit of Measurement
      { wch: 10 }, // Quantity
      { wch: 15 }, // Item No
      { wch: 40 }, // Description
    ];

    // Row heights
    ws["!rows"] = [
      { hpt: 30 }, // Title
      {}, // Empty row
      { hpt: 25 }, // Header
      ...values.map(() => ({ hpt: 20 })),
      {}, // Empty row
      { hpt: 25 }, // Last row
    ];

    // Apply styles
    const range = XLSX.utils.decode_range(ws["!ref"] || "");
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellRef]) continue;
        const cell = ws[cellRef];

        cell.s = {
          font: {
            name: "Arial",
            sz: R === 0 ? 16 : 12,
            bold: R === 0 || R === 2,
          },
          alignment: {
            vertical: "center",
            horizontal: R === 0 ? "center" : "left",
            wrapText: true,
          },
          fill:
            R === 2
              ? { fgColor: { rgb: "D9E1F2" } } // Header background
              : R === range.e.r
              ? { fgColor: { rgb: "E2EFDA" } } // Last row background
              : undefined,
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
    }

    // Create workbook and append sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");

    // Export
    const date = new Date().toLocaleDateString().replace(/\//g, "-");
    XLSX.writeFile(wb, `Inventory_Items_${date}.xlsx`);
  };
  const { mutate: deleteInventory } = useMutation({
    mutationFn: deleteInventories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      setShowSuccessDeleted(true);
      // setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (err) => {
      console.error("Failed to delete:", err);
    },
  });
  const handleDeleteClick = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteInventory(id);
      setShowSuccessDeleted(true);
      setTimeout(() => {
        setShowSuccessDeleted(false);
        // Optional: refresh or redirect
        // window.location.href = "/erp-v2/inventory/";
      }, 2000);
    }
  };
  const handleViewClick = (id: number) => {
    setLoadingId(id);
    setTimeout(() => router.push(`/erp-v2/inventory/view/${id}`), 300);
  };
  if (isLoading)
    return (
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-100 p-4 rounded-lg shadow-md relative"
            >
              {/* Image skeleton */}
              <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>

              {/* Title */}
              <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>

              {/* Description */}
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>

              {/* Category */}
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>

              {/* Quantity */}
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>

              {/* Unit */}
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>

              {/* Dropdown Icon */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );

  // if (error instanceof Error)
  //   return <div>An error has occurred: {error.message}</div>;
  if (error instanceof Error) return <ServerError />;

  const toggleView = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  const renderGridView = () => (
    <>
      {showSuccessdeleted && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mb-4"
          role="alert"
        >
          <strong className="font-bold">Deleted!</strong>
          <span className="block sm:inline ml-2">
            Item deleted successfully.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            // onClick={() => setShowSuccessDeleted(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 00-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
            </svg>
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
        {data?.map((inventory) => (
          <div
            key={inventory.id}
            className="bg-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative"
          >
            {/* <img
              src={inventory.photos}
              alt={inventory.item}
              className="aspect-square rounded-full w-48"
            /> */}
            {/* <img
              className="w-[100px] h-[100px] rounded-full object-cover"
              src={inventory.photos || inventory.item}
              alt={inventory.item}
            ></img> */}
            {/* {inventory.photos && inventory.photos.length > 0 ? ( */}
            <img
              className="w-[50px] h-[50px] rounded-full object-cover"
              // src={inventory.photos[0] || inventory.item}
              src="/images/logo.png"
              alt={inventory.item || "Default image"}
            />
            {/* ) : ( */}
            {/* <div className="w-[50px] h-[50px] rounded-full bg-gray-400 text-white flex items-center justify-center  font-bold"> */}
            {/* {inventory.item?.charAt(0).toUpperCase() || "?"} */}
            {/* {`/images/logo.png`} */}
            {/* </div>
            )} */}

            <h4 className="text-lg font-medium">{inventory.item}</h4>
            <p className="text-sm text-gray-700">{inventory.specification}</p>
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
                  toggleDropdown(inventory.id as number);
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
                  {/* <Link
                    href={`/erp-v2/inventory/view/${inventory.id}`}
                    className="hover:underline uppercase text-center block py-2 px-4 text-sm text-blue-500 hover:bg-gray-100 cursor-pointer"
                  >
                    View
                  </Link> */}
                  <button
                    onClick={() => handleViewClick(inventory.id as number)}
                    className="hover:underline uppercase w-full text-center py-2 px-4 text-sm text-blue-500 hover:bg-gray-100 cursor-pointer"
                    disabled={loadingId === inventory.id}
                  >
                    {loadingId === inventory.id ? (
                      <span className="loading loading-spinner text-blue-500"></span>
                    ) : (
                      "View"
                    )}
                  </button>
                  <div
                    onClick={() => handleDeleteClick(Number(inventory.id))}
                    className="hover:underline uppercase w-full text-center py-2 px-4 text-sm text-red-700 hover:bg-gray-100 cursor-pointer"
                  >
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
    <>
      <div className="p-6">
        <label className="relative w-full max-w-sm">
          {/* Search Input */}
          <input
            type="search"
            className="dark:text-white w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          {/* Search Icon (left) */}
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>

          {/* {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              ×
            </button>
          )} */}
        </label>
      </div>
      {showSuccessdeleted && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Deleted!</strong>
          <span className="block sm:inline ml-2">
            Item deleted successfully.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            // onClick={() => setShowSuccessDeleted(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 00-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
            </svg>
          </span>
        </div>
      )}
      <div className="overflow-auto rounded-lg  dark:bg-gray-dark">
        <table className="table-zebra table-xs w-full  border-gray-200 rounded-lg shadow-lg">
          <thead className=" text-black  border-b-gray-400">
            <tr className="text-sm font-medium text-center uppercase">
              <th className="py-2 px-4 text-center">Item</th>
              <th className="py-2 px-4 text-center">Category</th>
              <th className="py-2 px-4 text-center">Quantity</th>
              <th className="py-2 px-4 text-center">Unit</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-gray-500 py-4 font-semi-bold dark:text-white dark:bg-gray-dark"
                >
                  No records found
                </td>
              </tr>
            ) : (
              currentRows?.map((inventory) => (
                <tr
                  key={inventory.id}
                  className={`transition-colors duration-300 ease-in-out
               
                text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <td className=" text-lg text-center">{inventory.item}</td>
                  <td className=" text-lg text-center ">
                    {inventory.category}
                  </td>
                  <td className=" text-lg text-center ">
                    {inventory.quantity}
                  </td>
                  <td className=" text-lg text-center">
                    {inventory.unit_of_measurement}
                  </td>
                  <td className=" text-xs text-center">
                    <div className="inline-flex gap-2 justify-center">
                      <Link href={`/erp-v2/inventory/view/${inventory.id}`}>
                        <button
                          onClick={() =>
                            handleViewClick(inventory.id as number)
                          }
                          className="hover:underline hover:cursor-pointer flex items-center gap-2   text-blue-800  px-4 py-2 transition duration-200 uppercase"
                          disabled={loadingId === (inventory.id as number)}
                        >
                          {loadingId === (inventory.id as number) ? (
                            <span className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></span>
                          ) : (
                            "View"
                          )}
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(Number(inventory.id))} // ← correct
                        // className="text-red-600 hover:underline"
                        className="hover:underline hover:cursor-pointer flex items-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-end items-center gap-3 p-4  border-t dark:bg-gray-dark dark:text-white">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-800 disabled:bg-gray-400 transition"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-800 disabled:bg-gray-400 transition"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div>
        <div className="flex justify-start mb-1 gap-2">
          {/* <AddInventory /> */}
          <Link
            className="btn bg-blue-500 text-white uppercase"
            href={`/erp-v2/inventory/add-inventory/`}
          >
            add inventory
          </Link>
          {/* <Export /> */}
          <button
            onClick={handleExcel}
            // className="btn bg-blue-700 text-white uppercase"
            className="btn bg-green-600 hover:bg-green-700 text-white font-semibold uppercase"
          >
            export to excel
          </button>
          <button
            className="btn bg-white text-black border border-black"
            onClick={toggleView}
          >
            {viewMode === "grid" ? (
              <>
                {/* <IoGrid className="mr-2" /> */}
                Switch to List View
              </>
            ) : (
              <>
                {/* <FaListAlt className="mr-2" /> */}
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
