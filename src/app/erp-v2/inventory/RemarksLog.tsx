"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FetchInventories, Inventories } from "@/api/inventory/Inventory";
import InventoryCard from "./_components/Card";

export default function RemarksLog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isClicked, setIsClicked] = useState(false);

  const { isLoading, error, data } = useQuery<Inventories[]>({
    queryKey: ["inventory"],
    queryFn: FetchInventories,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  return (
    <button
      className={`btn ${
        isClicked ? "bg-blue-500 text-white" : "bg-transparent text-blue-500"
      }`}
      onClick={() => setIsClicked(!isClicked)}
    >
      RemarksLogsss
    </button>
  );
}
