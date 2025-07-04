"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bom, fetchBomList } from "@/api/bom-quotation/fetchBom";
import { deleteBoms } from "@/api/bom-quotation/deleteBom";
// import AddBom from "./Modal/AddBom";
import TableBom from "./_components/Table/TableBom";
import SearchInput from "./_components/Search/SearchInput";
import LoadingPage from "@/components/Loading/LoadingPage";
import ServerError from "@/components/Error/ServerError";
import Link from "next/link";

export default function BomQuotation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const rowsPerPage = 10;

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Bom[]>({
    queryKey: ["bom"],
    queryFn: fetchBomList,
  });

  // const filteredData = useMemo(() => {
  //   return (
  //     data?.filter((item) =>
  //       [item.bom_no, item.project_name, item.client].some((val) =>
  //         val.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     ) || []
  //   );
  // }, [searchTerm, data]);

  // const deleteBomQuo = (id: number | string) => {
  //   if (confirm("Are you sure you want to delete this bom quotation?")) {
  //     deleteBom(id as number);
  //   }
  // };
  const handleDeleteBom = (id: number | string) => {
    if (confirm("Are you sure you want to delete this BOM?")) {
      deleteBom(id as number); // ✅ This uses the mutation with cache invalidation & success alert
    }
  };

  const { mutate: deleteBom } = useMutation({
    mutationFn: (id: number) => deleteBoms(id),
    onSuccess: () => {
      console.log("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bom"] });
      setShowSuccess(true); // show alert
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      console.error("Error deleting:", error);
    },
  });
  // const { mutate: deleteBom } = useMutation({
  //   mutationFn: (id: number) => deleteBoms(id),
  //   onSuccess: () => {
  //     console.log("Deleted successfully");
  //     queryClient.invalidateQueries({ queryKey: ["bom"] }); // ✅ match useQuery key
  //     setShowSuccess(true);
  //     setTimeout(() => setShowSuccess(false), 3000);
  //   },
  //   onError: (error) => {
  //     console.error("Error deleting:", error);
  //   },
  // });

  // const { mutate: deleteBom } = useMutation({
  //   mutationFn: (id: number) => deleteBoms(id), // assuming deleteBoms is an API call
  //   onSuccess: () => {
  //     console.log("Deleted successfully");
  //     queryClient.invalidateQueries({ queryKey: ["bom-quotation"] }); // Refresh data
  //     setShowSuccess(true); // Show success alert
  //     setTimeout(() => setShowSuccess(false), 3000); // Auto-hide alert
  //   },
  //   onError: (error) => {
  //     console.error("Error deleting BOM:", error);
  //   },
  // });

  const filteredData =
    data?.filter((item) =>
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
  // const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // const { mutate: deleteBom } = useMutation({
  //   mutationFn: (id: number) => deleteBoms(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["bom"] });
  //     setShowSuccess(true);
  //     setTimeout(() => setShowSuccess(false), 3000);
  //   },
  // });

  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () =>
    setCurrentPage((prev) =>
      prev + 1 <= Math.ceil(filteredData.length / rowsPerPage) ? prev + 1 : prev
    );

  if (isLoading) return <LoadingPage />;
  // if (error instanceof Error) return <div>Error: {error.message}</div>;
  if (error instanceof Error) return <ServerError />;

  return (
    <div className="bg-white dark:bg-gray-dark  rounded-lg">
      {/* Success Alert */}
      {showSuccess && (
        <div className="alert alert-success mb-4 bg-green-100 text-green-800 px-4 py-2 rounded-md">
          BOM successfully deleted.
        </div>
      )}

      {/* Header */}

      {/* <div className="flex flex-col md:flex-row justify-between items-center gap-4"> */}
      <div className="flex flex-col md:flex-row justify-start items-center gap-2 mb-2">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
        />
        <Link
          className="btn text-white bg-blue-500 uppercase"
          href="/erp-v2/bom-quotation/add-bom-quo"
        >
          add quotation
        </Link>
        {/* <AddBom /> */}
        <h1 className=" text-2xl ml-40 font-semibold text-gray-800 mb-1 uppercase tracking-wide dark:text-white">
          BOM Quotation
        </h1>
        {/* <Link
          className="btn text-black uppercase"
          href="/erp-v2/bom-quotation/add-bom-quo"
        >
          add quotation
        </Link> */}
      </div>
      {/* </div> */}

      {/* <h1 className="text-2xl font-bold text-gray-800 dark:text-white uppercase">
        BOM Quotation
      </h1> */}

      <TableBom
        data={paginatedData}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        // handleDelete={deleteBom}
        handlePrev={handlePrev}
        handleNext={handleNext}
        deleteBomQuo={handleDeleteBom}
      />
    </div>
  );
}
