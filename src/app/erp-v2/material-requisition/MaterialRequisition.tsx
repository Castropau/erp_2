"use client";
import React, { useState } from "react";
import TableMaterial from "./_components/Table/TableMaterial";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchChequesLists } from "@/api/cheque-request/fetchCheque";
import { deleteCashRequest } from "@/api/cash-request/deleteCash";
import Search from "./_components/Search/Search";
import Link from "next/link";
import LoadingPage from "@/components/Loading/LoadingPage";

const MaterialRequisition = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  // const [showSuccess, setShowSuccess] = useState(false);

  const rowsPerPage = 10;
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: datas,
    isLoading,
    // error,
  } = useQuery({
    queryKey: ["cheque"],
    queryFn: fetchChequesLists,
  });
  const handleViewClick = (id: string) => {
    setLoadingId(id);
    setTimeout(
      () => router.push(`/erp-v2/material-requisition/detail/${id}`),
      300
    );
  };
  const { mutate: deleteCash } = useMutation({
    mutationFn: deleteCashRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cash"] });
      // setShowSuccess(true);
      // setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (err) => {
      console.error("Failed to delete:", err);
    },
  });
  const filteredData =
    datas?.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) ?? [];
  const handleDelete = (id: number | string) => {
    if (confirm("Are you sure you want to delete this cash request?")) {
      deleteCash(id as number);
    }
  };
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <div>
        <div className="flex items-center mb-2 gap-4 relative">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          />
          <Link href="/erp-v2/cash-request/add-cash-request">
            <button className="btn bg-blue-500 text-white uppercase">
              Add material request
            </button>
          </Link>
          {/* <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-gray-800 mb-1 uppercase tracking-wide dark:text-white"> */}
          <h1 className="text-2xl ml-50 font-semibold text-gray-800 mb-1 uppercase tracking-wide dark:text-white">
            Material Requisition
          </h1>

          <div className="flex gap-2">
            {/* <Link href="/erp-v2/cash-request/requisition-list">
      <button className="btn bg-white text-black border border-black uppercase">
        Selection Config
      </button>
    </Link> */}
            {/* <Link href="/erp-v2/cash-request/add-cash-request">
              <button className="btn bg-white text-black border border-black uppercase">
                Add material request
              </button>
            </Link> */}
          </div>
        </div>
        <TableMaterial
          data={paginatedData}
          onViewClick={handleViewClick}
          onDeleteClick={handleDelete}
          loadingId={loadingId}
        />
      </div>
      <div className="flex justify-end items-center gap-3 mt-6 text-sm">
        <button
          onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage((p) => p + 1)
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MaterialRequisition;
