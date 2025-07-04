"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchQuoList, Quatations } from "@/api/quotation/fetchQuo";
import { deleteQuo } from "@/api/quotation/deleteQuo";

// import AddQuotations from "./_components/Modal/AddQuotations";
import Config from "./_components/Modal/Config";

import LoadingPage from "@/components/Loading/LoadingPage";
import SearchInput from "./_components/Search/SearchInput";
import TableQuotation from "./_components/Table/TableQuotation";
import ServerError from "@/components/Error/ServerError";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import useRouter from "next/navigation";

export default function QuotationDropdown() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const { data, isLoading, error } = useQuery<Quatations[]>({
    queryKey: ["quotations"],
    queryFn: fetchQuoList,
  });
  const handleViewClick = (id: string) => {
    setLoadingId(id);
    setTimeout(() => router.push(`/erp-v2/quotation/edit-quo/${id}`), 300);
  };

  // const filteredData = useMemo(() => {
  //   return (
  //     data?.filter((item) => {
  //       const quote = item.quotation_no?.toLowerCase() || "";
  //       const project = item.project_name?.toLowerCase() || "";
  //       return (
  //         quote.includes(searchTerm.toLowerCase()) ||
  //         project.includes(searchTerm.toLowerCase())
  //       );
  //     }) || []
  //   );
  // }, [searchTerm, data]);
  const filteredData = useMemo(() => {
    return (
      data?.filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) ?? []
    );
  }, [searchTerm, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const deleteQuotation = (id: number | string) => {
    if (confirm("Are you sure you want to delete this quotation?")) {
      deleteQuotations(id as number);
    }
  };
  const { mutate: deleteQuotations } = useMutation({
    mutationFn: (id: number) => deleteQuo(id),
    onSuccess: () => {
      console.log("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["quotations"] });
      setShowSuccess(true); // show alert
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      console.error("Error deleting:", error);
    },
  });
  // const { mutate: deleteQuotation } = useMutation({
  //   mutationFn: (id: number) => deleteQuo(id),
  //   onMutate: async (id: number) => {
  //     await queryClient.cancelQueries({ queryKey: ["quotations"] });
  //     const previousData = queryClient.getQueryData<Quatations[]>([
  //       "quotations",
  //     ]);
  //     queryClient.setQueryData<Quatations[]>(["quotations"], (old) =>
  //       old?.filter((q) => q.id !== id)
  //     );
  //     return { previousData };
  //   },
  //   onSuccess: () => {
  //     setShowSuccess(true);
  //     setTimeout(() => setShowSuccess(false), 3000);
  //   },
  //   onError: (_err, _id, context) => {
  //     if (context?.previousData) {
  //       queryClient.setQueryData(["quotations"], context.previousData);
  //     }
  //   },
  // });

  if (isLoading) return <LoadingPage />;
  // if (error instanceof Error) return <div>Error: {error.message}</div>;
  if (error instanceof Error) return <ServerError />;

  return (
    <>
      {showSuccess && (
        <div className="alert alert-success mb-4 bg-green-100 text-green-800 px-4 py-2 rounded-md">
          Quotation successfully deleted.
        </div>
      )}

      <div className="bg-white rounded-md dark:bg-gray-dark dark:text-white">
        <div className="flex flex-col md:flex-row justify-start items-center gap-2 mb-2">
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          />
          {/* <Link
            className="btn uppercase bg-blue-500 text-white"
            href="/erp-v2/quotation/add-quo"
          >
            Add quotation
          </Link> */}
          <Config />
          <Link
            className="btn uppercase bg-blue-500 text-white"
            href="/erp-v2/quotation/add-quo"
          >
            Add quotation
          </Link>
          <h1 className="transform  ml-50 text-2xl font-semibold text-gray-800 mb-1 uppercase tracking-wide dark:text-white">
            Quotation
          </h1>
          <div className="flex items-center gap-4">
            {/* <AddQuotations /> */}
            {/* <Link
              className="btn uppercase text-black"
              href="/erp-v2/quotation/add-quo"
            >
              Add quotation
            </Link> */}
            {/* <Config /> */}
          </div>
        </div>

        {/* <h1 className="text-2xl font-semibold text-gray-800 mb-1 uppercase tracking-wide dark:text-white">
          Quotation
        </h1> */}

        <TableQuotation
          onViewClick={handleViewClick}
          loadingId={loadingId}
          data={paginatedData}
          totalPages={totalPages}
          currentPage={currentPage}
          handleDelete={deleteQuotation}
          handlePrev={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          handleNext={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
        />

        {/* <div className="flex justify-end items-center gap-3 mt-6 text-sm">
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
        </div> */}
      </div>
    </>
  );
}
