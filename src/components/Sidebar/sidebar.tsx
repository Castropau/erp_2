"use client";
import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowDown, IoMdCard, IoMdCart } from "react-icons/io";
import { FaMoneyBillAlt, FaRegUserCircle } from "react-icons/fa";
// import { IoMdCard } from "react-icons/io";
import { HiOutlineCalculator, HiDocumentCurrencyDollar } from "react-icons/hi2";
import { BsPersonFillGear, BsPersonVcard } from "react-icons/bs";
import { MdReceiptLong, MdOutlineInventory } from "react-icons/md";
import { PiHandWithdraw } from "react-icons/pi";
import { HiClipboardDocumentList } from "react-icons/hi2";

import { FaStore } from "react-icons/fa6";

function Sidebar() {
  const [isRequisitionDropdownOpen, setIsRequisitionDropdownOpen] =
    useState(false);
  const [isQuotationDropdownOpen, setIsQuotationDropdownOpen] = useState(false);

  const toggleRequisitionDropdown = () => {
    setIsRequisitionDropdownOpen(!isRequisitionDropdownOpen);
  };

  const toggleQuotationDropdown = () => {
    setIsQuotationDropdownOpen(!isQuotationDropdownOpen);
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="text-xs">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdDashboard className="w-6 h-6 text-xs" />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <div className="text-xs font-extrabold text-neutral-400 tracking-wider whitespace-nowrap ml-3 py-3 MuiBox-root css-0">
              Accounting
            </div>

            {/* Requisition Dropdown */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleRequisitionDropdown}
              >
                <IoMdCard className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Requisition
                </span>
                <span className="items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium">
                  <IoIosArrowDown />
                </span>
              </a>
              {isRequisitionDropdownOpen && (
                <ul className="pl-8 mt-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="block p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Cash Request
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Cheque Request
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiOutlineCalculator className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Liquidation
                </span>
              </a>
            </li>

            <div className="text-xs font-extrabold text-neutral-400 tracking-wider whitespace-nowrap ml-3 py-3 MuiBox-root css-0">
              Account Management
            </div>

            {/* Quotation Dropdown */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={toggleQuotationDropdown}
              >
                <HiDocumentCurrencyDollar className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">Quotation</span>
                <span className="items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium">
                  <IoIosArrowDown />
                </span>
              </a>
              {isQuotationDropdownOpen && (
                <ul className="pl-8 mt-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="block p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Quotation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      BOM Quotation
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a
                href="/erp-v2/vendors"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaStore className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">Vendors</span>
              </a>
            </li>
            <li>
              <a
                href="/erp-v2/clients"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsPersonVcard className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">Clients</span>
              </a>
            </li>

            <li>
              <a
                href="/erp-v2/delivery-receipt"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdReceiptLong className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Delivery Receipt
                </span>
              </a>
            </li>

            <div className="text-xs font-extrabold text-neutral-400 tracking-wider whitespace-nowrap ml-3 py-3 MuiBox-root css-0">
              Account Management
            </div>

            <li>
              <a
                href="/erp-v2/purchase-order"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoMdCart className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Purchase Order
                </span>
              </a>
            </li>

            <div className="text-xs font-extrabold text-neutral-400 tracking-wider whitespace-nowrap ml-3 py-3 MuiBox-root css-0">
              Account Management
            </div>

            <li>
              <a
                href="/erp-v2/inventory"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdOutlineInventory className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">Inventory</span>
              </a>
            </li>

            <li>
              <a
                href="/erp-v2/withdraw_materials"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <PiHandWithdraw className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Withdraw Materials
                </span>
              </a>
            </li>

            <li>
              <a
                href="/erp-v2/product_master_list"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiClipboardDocumentList className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Product Master List
                </span>
              </a>
            </li>

            <div className="text-xs font-extrabold text-neutral-400 tracking-wider whitespace-nowrap ml-3 py-3 MuiBox-root css-0">
              Account Management
            </div>

            <li>
              <a
                href="/erp-v2/bill_of_materials"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaMoneyBillAlt className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Bill of Materials
                </span>
              </a>
            </li>

            <li>
              <a
                href="/erp-v2/labor_of_computation"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsPersonFillGear className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Labor of Computation
                </span>
              </a>
            </li>

            <div className="text-xs font-extrabold text-neutral-400 tracking-wider whitespace-nowrap ml-3 py-3 MuiBox-root css-0">
              Account Management
            </div>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaRegUserCircle className="w-6 h-6 text-xs" />
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
