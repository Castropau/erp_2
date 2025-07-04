"use client";

import { useQuery } from "@tanstack/react-query";

/** api */
import { fetchUserList } from "@/api/User/fetchUserList";
import { fetchRoleData } from "@/api/Roles/Roles";
import {
  fetchCashRequest,
  RequisitionCash,
} from "@/api/cash-request/fetchCashRequest";
// import { FetchItems, Items } from "@/api/inventory/Items";

/** components */
import DashboardCard from "./_components/Card/card";
// import StatisticsChart from "./_components/Chart/StatisticsChart";
import ServerError from "@/components/Error/ServerError";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import React from "react";
import Link from "next/link";
import { FaBox, FaBullhorn, FaUsers } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import {
  ChequeLists,
  fetchChequesLists,
} from "@/api/cheque-request/fetchCheque";
import { fetchQuoList, Quatations } from "@/api/quotation/fetchQuo";
import {
  fetchPurchaseList,
  PurchaseOrder,
} from "@/api/purchase-order/fetchPurchase";
// import { FetchItemInventory, Item } from "@/api/inventory/fetchItemNumber";
import { FetchInventories, Inventories } from "@/api/inventory/Inventory";
import { useRouter } from "next/navigation";

export default function User() {
  const {
    isLoading,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserList,
  });

  const { data: roleList, error: rolerror } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoleData,
  });

  const { data: cashRequests, error: casherror } = useQuery<RequisitionCash[]>({
    queryKey: ["cash"],
    queryFn: fetchCashRequest,
  });

  const { data: items, error: inventoryerror } = useQuery<Inventories[]>({
    queryKey: ["inventory"],
    queryFn: FetchInventories,
  });

  const { data: cheque } = useQuery<ChequeLists[]>({
    queryKey: ["item"],
    queryFn: fetchChequesLists,
  });
  const { data: quotation, error: quotationError } = useQuery<Quatations[]>({
    queryKey: ["quotation"],
    queryFn: fetchQuoList,
  });

  const { data: purchase, error: purchaseerror } = useQuery<PurchaseOrder[]>({
    queryKey: ["purchase"],
    queryFn: fetchPurchaseList,
  });
  // const [selectedValue, setSelectedValue] = useState("");

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedValue(e.target.value);
  // };

  // Handle loading and error
  // if (isLoading) return <LoadingSpinner />;
  // if (
  //   error &&
  //   rolerror &&
  //   casherror &&
  //   inventoryerror &&
  //   quotationError &&
  //   purchaseerror
  // )
  //   return <ServerError />;

  // Greeting
  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good morning"
      : hours >= 18
      ? "Good evening"
      : "Good afternoon";

  // User stats
  const usersCount = users?.filter((u) => u.id).length || 0;
  const departmentCount = new Set(users?.map((u) => u.department)).size;
  const roleCount = new Set(roleList?.map((r) => r.role)).size;

  // Inventory stats
  const totalInventory = items?.length || 0;
  const outOfStockCount = items?.filter((item) => item.id === 0).length || 0;
  const returnCount = items?.filter((item) => item.id).length || 0;

  // Cash request stats
  const cashCount = cashRequests?.length || 0;

  const quotationCount = quotation?.filter((item) => item.id).length || 0;
  // const quotationCountNow = quotation?.filter((item) => item.date_created).length || 0;
  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // e.g., "2025-06-25"

  const quotationCountNow =
    quotation?.filter((item) => {
      const itemDate = new Date(item.date_created).toISOString().split("T")[0];
      return itemDate === todayString;
    }).length || 0;
  const now = new Date();
  const startOfWeek = new Date(now);
  const endOfWeek = new Date(now);

  // Set start of week (Monday)
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  // Set end of week (Sunday)
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const quotationCountThisWeek =
    quotation?.filter((item) => {
      const itemDate = new Date(item.date_created);
      return itemDate >= startOfWeek && itemDate <= endOfWeek;
    }).length || 0;

  const purchaseCountNow =
    purchase?.filter((item) => {
      const itemDate = new Date(item.date_created).toISOString().split("T")[0];
      return itemDate === todayString;
    }).length || 0;

  const purchaseCountThisWeek =
    purchase?.filter((item) => {
      const itemDate = new Date(item.date_created);
      return itemDate >= startOfWeek && itemDate <= endOfWeek;
    }).length || 0;
  const purchaseCount = purchase?.length || 0;
  // const chequeCount = new Set(cheque?.map((r) => r.id)).size;
  // const chequeCount = cheque?.filter((u) => u.id).length || 0;

  const chequeCount = cheque?.filter((item) => item.id).length || 0;

  const chequeCountPending =
    cheque?.filter((item) => item.status == "Pending").length || 0;
  const chequeCountRevised =
    cheque?.filter((item) => item.status == "Revised").length || 0;
  const chequeCountApproved =
    cheque?.filter((item) => item.status == "Approved").length || 0;
  // const chequeCountNoted =
  //   cheque?.filter((item) => item.status == "Noted").length || 0;
  const chequeCountCancelled =
    cheque?.filter((item) => item.status == "Cancelled").length || 0;

  const cashPendingCount =
    cashRequests?.filter((item) => item.status == "Pending").length || 0;
  const cashRevisedCount =
    cashRequests?.filter((item) => item.status == "Revised").length || 0;

  const cashApprovedCount =
    cashRequests?.filter((item) => item.status == "Approved").length || 0;

  const cashCancelledCount =
    cashRequests?.filter((item) => item.status == "Cancelled").length || 0;
  // const uniqueCheque = new Set(cheque?.map((user) => user.id));
  // const chequeCount = uniqueCheque.size;
  // const router = useRouter();

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const id = e.target.value;
  //   setSelectedValue(id);
  //   if (id) {
  //     router.push(`/erp-v2/cash-request/edit-cash/${id}`);
  //   }
  // };
  if (isLoading) return <LoadingSpinner />;
  if (
    error ||
    rolerror ||
    casherror ||
    inventoryerror ||
    quotationError ||
    purchaseerror
  )
    return <ServerError />;
  return (
    <div className=" min-h-screen dark:bg-gray-dark">
      <span className="text-gray-500 dark:text-white">{greeting}</span>
      <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white">
        Dashboard
      </h1>

      {/* User, Orders, Sales, Marketing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
        <DashboardCard
          title={`Total of ${usersCount} Users`}
          name="Users"
          url="/erp-v2/user"
          icon={<FaUsers size="2em" />}
        />
        <DashboardCard
          title={`Total of ${departmentCount} Orders`}
          name="Orders"
          url="/erp-v2/sales"
          icon={<FaBox size="2em" />}
        />
        <DashboardCard
          title={`Total of ${roleCount} Sales`}
          name="Sales"
          url="/erp-v2/sales"
          icon={<FaShoppingCart size="2em" />}
        />
        <DashboardCard
          title={`Total of ${roleCount} Marketing`}
          name="Marketing"
          url="/erp-v2/sales"
          icon={<FaBullhorn size="2em" />}
        />
      </div>
      <div className="mb-2">
        <span className="text-gray-500 break-all font-medium dark:text-white">
          This page is summary of ERP, you can click any box to view more
          details
        </span>
      </div>
      {/* Cash Request Summary */}
      {/* <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white uppercase">
          Cash Request
        </h1>
        <div className="card bg-base-100 w-96 shadow-sm mb-2 p-6 rounded-lg hover:translate-y-2 hover:shadow-xl transition-all duration-300 dark:bg-gray-900 border border-black">
          <Link href="/erp-v2/cash-request/" className="hover:cursor-pointer">
            <div className="card-body">
              <h2 className="card-title">{`Total of ${cashCount} cash request${
                cashCount !== 1 ? "s" : ""
              }`}</h2>
            </div>
          </Link>
          {/* <select
            id="cash-select"
            value={selectedValue}
            onChange={handleChange}
          >
            <option value="">Select the serial no.</option>
            {cashRequests?.map((option) => (
              <option key={option.id} value={option.id}>
                <Link
                  className="hover:cursor-pointer"
                  href={`/erp-v2/cash-request/edit-cash/{options.id}`}
                >
                  {option.serial_no}
                </Link>
              </option>
            ))}
          </select> */}
      {/* 
          <select
            id="cash-select"
            value={selectedValue}
            onChange={handleChange}
          >
            <option value="">Select the serial no.</option>
            {cashRequests?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.serial_no}
              </option>
            ))}
          </select>

          {selectedValue && <p>You selected: {selectedValue}</p>}
        </div>
      </div>  */}
      <div className="grid sm:grid-cols-5 md:grid-cols-5 gap-1 mb-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white col-span-full uppercase">
          cash request
        </h1>
        <InventoryCard
          title="cash request"
          path="/erp-v2/cash-request/"
          count={cashCount}
        />
        <InventoryCard
          title="Pending requests"
          path="/erp-v2/cash-request/"
          count={cashPendingCount}
        />
        <InventoryCard
          title="Revised requests"
          path="/erp-v2/cash-request/"
          count={cashRevisedCount}
        />
        <InventoryCard
          title="approved requests"
          path="/erp-v2/cash-request/"
          count={cashApprovedCount}
        />
        <InventoryCard
          title="cancelled requests"
          path="/erp-v2/cash-request/"
          count={cashCancelledCount}
        />
        {/* <InventoryCard
          title="closed requests"
          path="/erp-v2/cash-requests/"
          count={returnCount}
        /> */}
      </div>

      {/* Inventory Summary */}
      <div className="grid sm:grid-cols-5 md:grid-cols-5 gap-1 mb-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white col-span-full uppercase">
          Inventory Summary
        </h1>

        <InventoryCard
          title="inventory items"
          path="/erp-v2/inventory/"
          count={totalInventory}
        />
        <InventoryCard
          title="out-of-stock items"
          path="/erp-v2/inventory/"
          count={outOfStockCount}
        />
        <InventoryCard
          title="returned items"
          path="/erp-v2/inventory/"
          count={returnCount}
        />
      </div>
      <div className="grid sm:grid-cols-5 md:grid-cols-5 gap-1 mb-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white col-span-full uppercase">
          material requisition
        </h1>

        <InventoryCard
          title="Pending requests"
          path="/erp-v2/material-requisition/"
          count={totalInventory}
        />
        <InventoryCard
          title="Revised requests"
          path="/erp-v2/material-requisition/"
          count={outOfStockCount}
        />
        <InventoryCard
          title="approved requests"
          path="/erp-v2/material-requisition/"
          count={returnCount}
        />
        <InventoryCard
          title="cancelled requests"
          path="/erp-v2/material-requisition/"
          count={returnCount}
        />
        <InventoryCard
          title="closed requests"
          path="/erp-v2/material-requisition/"
          count={returnCount}
        />
      </div>
      <div className="grid sm:grid-cols-5 md:grid-cols-5 gap-1 mb-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white col-span-full uppercase">
          cheque requisition
        </h1>
        <InventoryCard
          title="cheque"
          path="/erp-v2/cheque-request/"
          count={chequeCount}
        />
        <InventoryCard
          title="Pending requests"
          path="/erp-v2/cheque-request/"
          count={chequeCountPending}
        />
        <InventoryCard
          title="Revised requests"
          path="/erp-v2/cheque-request/"
          count={chequeCountRevised}
        />
        <InventoryCard
          title="approved requests"
          path="/erp-v2/cheque-request/"
          count={chequeCountApproved}
        />
        <InventoryCard
          title="cancelled requests"
          path="/erp-v2/cheque-request/"
          count={chequeCountCancelled}
        />
        {/* <InventoryCard
          title="closed requests"
          path="/erp-v2/purchase-order/"
          count={returnCount}
        /> */}
      </div>
      <div className="grid sm:grid-cols-5 md:grid-cols-5 gap-1 mb-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white col-span-full uppercase">
          quotation summary
        </h1>

        <InventoryCard
          title=" quotation"
          path="/erp-v2/quotation/"
          count={quotationCount}
        />
        <InventoryCard
          title="quotation  this day"
          path="/erp-v2/quotation/"
          count={quotationCountNow}
        />
        <InventoryCard
          title="quotation  this week"
          path="/erp-v2/quotation/"
          count={quotationCountThisWeek}
        />
        {/* <InventoryCard
          title="cancelled requests"
          path="/erp-v2/purchase-order/"
          count={returnCount}
        />
        <InventoryCard
          title="closed requests"
          path="/erp-v2/purchase-order/"
          count={returnCount}
        /> */}
      </div>
      <div className="grid sm:grid-cols-5 md:grid-cols-5 gap-1 mb-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white col-span-full uppercase">
          purchase order summary
        </h1>

        <InventoryCard
          title=" purchase order"
          path="/erp-v2/purchase-order/"
          count={purchaseCount}
        />
        <InventoryCard
          title="  this day"
          count={purchaseCountNow}
          path="/erp-v2/purchase-order/"
        />
        <InventoryCard
          title="  this week"
          path="/erp-v2/purchase-order/"
          count={purchaseCountThisWeek}
        />
        {/* <InventoryCard
          title="cancelled requests"
          path="/erp-v2/purchase-order/"
          count={returnCount}
        />
        <InventoryCard
          title="closed requests"
          path="/erp-v2/purchase-order/"
          count={returnCount}
        /> */}
      </div>

      {/* Charts */}
      {/* <div className="flex gap-2">
        <div className="flex-1/2">
          <StatisticsChart />
        </div>
        <div className="flex-1/2">
          <StatisticsChart />
        </div>
      </div> */}
    </div>
  );
}

// Inline InventoryCard component (could be extracted separately)
const InventoryCard = ({
  title,
  count,
  path,
}: {
  title: string;
  count: number | string;
  path: string;
}) => (
  <Link href={path} className="hover:cursor-pointer">
    <div className="card bg-base-100 shadow-sm mb-2 rounded-lg hover:translate-y-2 hover:shadow-xl transition-all duration-300 dark:bg-gray-900 border border-black">
      <div className="card-body">
        <h2 className="card-title dark:text-white">
          Total of {count} {title}
        </h2>
      </div>
    </div>
  </Link>
);
