"use client";

import { useQuery } from "@tanstack/react-query";
/** state */
import React, { useState } from "react";

/** api */
import { Boms, fetchBomList } from "@/api/bill_of_materials/fetchBill";
// import AddLaborOfComputation from "../labor_of_computation/_compoments/Modal/AddLaborOfComputation";
// import PersonalInformation from "../user/_components/Modal/PersonalInformation";
// import ModuleAccess from "../user/_components/Modal/ModuleAccess";

/** interfaces */
// import { Bom } from "@/api/bom-quotation/fetchBom";
// import EditBom from "./_components/Modal/EditBom";
// import AddBom from "./_components/Modal/AddBom";
// import { deleteBom } from "@/api/bill_of_materials/deleteBom";
// import { FaTrash } from "react-icons/fa6";
import SearchInput from "./_components/Search/SearchInput";
import TableBom from "./_components/Table/TableBom";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import ServerError from "@/components/Error/ServerError";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import router, { useRouter } from "next/navigation";

export default function BillOfMaterials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccess] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();
  // const FileUpload = () => {
  // const [fileName, setFileName] = useState("Import");
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   setFileName(file ? file.name : "Import");
  // };
  // };
  const rowsPerPage = 10;
  // const queryClient = useQueryClient();
  const handleViewClick = (id: string) => {
    setLoadingId(id);
    setTimeout(
      () => router.push(`/erp-v2/bill_of_materials/edit-bom/${id}`),
      300
    );
  };
  // Fetch BOM list
  const {
    data: datas,
    isLoading,
    error,
  } = useQuery<Boms[]>({
    queryKey: ["bom"],
    queryFn: fetchBomList,
    // refetchInterval: 1000,
  });

  // Filter data based on search term
  const filteredData =
    datas?.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) ?? [];

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // const indexOfLastRow = currentPage * rowsPerPage;
  // const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  // const statusColorMap: Record<string, string> = {
  //   Pending: "bg-yellow-500 text-white",
  //   Approved: "bg-green-500 text-white",
  //   "Approved To Be Revised": "bg-blue-500 text-white",
  //   Revised: "bg-purple-500 text-white",
  //   Cancelled: "bg-red-500 text-white",
  //   Noted: "bg-gray-500 text-white",
  // };
  // const { mutate: deleteBoms } = useMutation({
  //   mutationFn: (id: number) => deleteBom(id),
  //   onSuccess: () => {
  //     console.log("Deleted successfully");
  //     queryClient.invalidateQueries({ queryKey: ["vendor"] });
  //     setShowSuccess(true); // show alert
  //     setTimeout(() => setShowSuccess(false), 3000);
  //   },
  //   onError: (error) => {
  //     console.error("Error deleting cash:", error);
  //   },
  // });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // if (error instanceof Error)
  //   return <div>An error has occurred: {error.message}</div>;
  if (error instanceof Error) return <ServerError />;

  return (
    <>
      {showSuccess && (
        <div
          role="alert"
          className="alert alert-success mb-4 flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-md transition-opacity duration-300"
        >
          <span>boms successfully deleted.</span>
        </div>
      )}
      <div className=" bg-white rounded-lg  dark:bg-gray-dark">
        {/* Top Section: Search + Add Button */}
        <div className="flex flex-col md:flex-row justify-start items-center gap-2 mb-2">
          {/* Search Input */}
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          />
          <Link
            className="btn text-white bg-blue-500 uppercase"
            href="/erp-v2/bill_of_materials/add-bom"
          >
            add bom
          </Link>
          {/* <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <span className="absolute ">Upload Excel</span>
            <input
              type="file"
              name="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </label> */}
          <div className="flex flex-col">
            {/* <label
              htmlFor="fileUpload"
              className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Upload Excel
            </label> */}
            <div className="flex justify-center">
              <input
                id="fileUpload"
                type="file"
                name="file"
                className=" file:type:file:color-red mt-2 text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button className="btn  uppercase" type="submit">
                Submit
              </button>
            </div>
          </div>
          <h1 className="ml-40 text-2xl font-semibold text-gray-800 mb-1 uppercase tracking-wide dark:text-white">
            bill of materials
          </h1>
          {/* Add Button */}
          <div className="ml-auto">
            {/* <AddBom /> */}
            {/* <Link
              className="btn text-black uppercase"
              href="/erp-v2/bill_of_materials/add-bom"
            >
              add bom
            </Link> */}
          </div>
        </div>

        {/* Table */}
        {/* <h1 className="text-2xl font-semibold text-gray-800 mb-1 uppercase tracking-wide dark:text-white">
          bill of materials
        </h1> */}
        <TableBom
          data={paginatedData}
          onViewClick={handleViewClick}
          loadingId={loadingId}
        />

        {/* Pagination */}
        <div className="flex justify-end items-center mt-6 gap-3 text-sm">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-800 transition"
          >
            Previous
          </button>
          <span className="text-gray-700">
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
      </div>
    </>
  );
}
