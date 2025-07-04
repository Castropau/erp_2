"use client";
// import Link from "next/link";
import React, { useState } from "react";
import TableRoles from "./_components/Table/TableRoles";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   fetchCashRequest,
//   RequisitionCash,
// } from "@/api/cash-request/fetchCashRequest";
// import { deleteCashRequest } from "@/api/cash-request/deleteCash";
import SearchInput from "../_components/Search/SearchInput";
import { Role } from "@/interfaces/Role";
import { fetchRoleData } from "@/api/Roles/Roles";
import LoadingPage from "@/components/Loading/LoadingPage";
import AddRole from "./_components/Modal/AddRole";
import { DeleteRole } from "@/api/Roles/DeleteRole";

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const queryClient = useQueryClient();
  const handleViewClick = (id: string) => {
    setLoadingId(id);
    setTimeout(() => router.push(`/erp-v2/cash-request/edit-cash/${id}`), 300);
  };
  const {
    data: datas,
    isLoading,
    // error,
  } = useQuery<Role[]>({
    queryKey: ["role"],
    queryFn: fetchRoleData,
  });

  const filteredData = datas?.filter((data) =>
    Object.values(data).some(
      (val) =>
        typeof val == "string" &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id: number | string) => {
    if (confirm("Are you sure you want to delete this role?")) {
      deleterole(id as number);
    }
  };

  const { mutate: deleterole } = useMutation({
    mutationFn: DeleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role"] });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (err) => {
      console.error("Failed to delete:", err);
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="overflow-x-auto">
      {showSuccess && (
        <div className="alert alert-success mb-4 bg-green-100 text-green-800 px-4 py-2 rounded-md">
          role successfully deleted.
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-start items-center gap-2 mb-2">
        {/* Left: Search */}
        <div className="w-full md:w-auto">
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="flex gap-2">
          {/* <Link href="/erp-v2/cash-request/requisition-list">
            <button className="btn bg-blue-700  text-white uppercase whitespace-nowrap">
              Selection Config
            </button>
          </Link> */}
          {/* <Link href="/erp-v2/cash-request/add-cash-request">
            <button className="btn bg-blue-500  text-white uppercase whitespace-nowrap">
              Add role
            </button>
          </Link> */}
          <AddRole />
        </div>

        {/* Center: Title */}
        <h1 className="text-xl ml-50 md:text-2xl font-semibold text-gray-800 dark:text-white text-center uppercase tracking-wide">
          Roles
        </h1>

        {/* Right: Buttons */}
        {/* <div className="flex gap-2">
          <Link href="/erp-v2/cash-request/requisition-list">
            <button className="btn bg-white text-black border border-black uppercase whitespace-nowrap">
              Selection Config
            </button>
          </Link>
          <Link href="/erp-v2/cash-request/add-cash-request">
            <button className="btn bg-white text-black border border-black uppercase whitespace-nowrap">
              Add Cash
            </button>
          </Link>
        </div> */}
      </div>

      {/* <h1 className="text-2xl font-semibold text-gray-800 mb-1 uppercase tracking-wide dark:text-white">
        Cash Requests
      </h1> */}
      {/* <p>asd2</p> */}
      <div className="flex items-start gap-2 mb-4 text-gray-500">
        <span className="font-semibold">NOTE:</span>
        <p className="text-gray-500 break-all">
          LoreLoremLoremLoremLoremLoreLoreLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremmLoremLoremLoremLoLoreLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremremLoremLoremLoremLoremLoremLoremLoremLoremLorem...
        </p>
      </div>
      <TableRoles
        onViewClick={handleViewClick}
        loadingId={loadingId}
        data={filteredData!}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDelete}
        handlePrev={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
        handleNext={() =>
          currentPage < Math.ceil(filteredData!.length / rowsPerPage) &&
          setCurrentPage((p) => p + 1)
        }
      />
    </div>
  );
};

export default Roles;
