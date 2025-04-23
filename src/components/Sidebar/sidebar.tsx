"use client";
import React, { useState } from "react";
import { useSidebar } from "../Context/SidebarContext"; // Import the useSidebar hook
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdOutlineInventory, MdReceiptLong } from "react-icons/md";
import { IoIosArrowForward, IoMdCard, IoMdCart } from "react-icons/io";
import { FaStore } from "react-icons/fa6";
import {
  HiOutlineCalculator,
  HiClipboardDocumentList,
  HiDocumentCurrencyDollar,
} from "react-icons/hi2";
import { PiHandWithdraw } from "react-icons/pi";
import { BsPersonVcard, BsPersonFillGear } from "react-icons/bs";
import { FaMoneyBillAlt, FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

// Icon wrapper to ensure consistent size everywhere
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-6 h-6 flex items-center justify-center text-xl">
    {children}
  </div>
);

const navSections = [
  {
    items: [
      {
        name: "Dashboard",
        icon: <MdDashboard />,
        path: "/erp-v2/dashboard",
      },
    ],
  },
  {
    title: "Accounting",
    items: [
      {
        name: "Requisition",
        icon: <IoMdCard />,
        subItems: [
          { name: "Cash Request", path: "/erp-v2/cash-request" },
          { name: "Cheque Request", path: "/erp-v2/cheque-request" },
        ],
      },
      {
        name: "Liquidation",
        icon: <HiOutlineCalculator />,
        path: "/erp-v2/liquidation",
      },
    ],
  },
  {
    title: "CRM",
    items: [
      {
        name: "Quotation",
        icon: <HiDocumentCurrencyDollar />,
        subItems: [
          { name: "Quotation", path: "/erp-v2/quotation" },
          { name: "BOM Quotation", path: "/erp-v2/bom-quotation" },
        ],
      },
      {
        name: "Vendors",
        icon: <FaStore />,
        path: "/erp-v2/vendors",
      },
      {
        name: "Clients",
        icon: <BsPersonVcard />,
        path: "/erp-v2/clients",
      },
      {
        name: "Delivery Receipt",
        icon: <MdReceiptLong />,
        path: "/erp-v2/delivery-receipt",
      },
    ],
  },
  {
    title: "SCM",
    items: [
      {
        name: "Purchase Order",
        icon: <IoMdCart />,
        path: "/erp-v2/purchase-order",
      },
    ],
  },
  {
    title: "Warehouse Management",
    items: [
      {
        name: "Inventory",
        icon: <MdOutlineInventory />,
        path: "/erp-v2/inventory",
      },
      {
        name: "Withdraw Materials",
        icon: <PiHandWithdraw />,
        path: "/erp-v2/withdraw_materials",
      },
      {
        name: "Product Master List",
        icon: <HiClipboardDocumentList />,
        path: "/erp-v2/product_master_list",
      },
    ],
  },
  {
    title: "Manufacturing Production",
    items: [
      {
        name: "Bill of Materials",
        icon: <FaMoneyBillAlt />,
        path: "/erp-v2/bill_of_materials",
      },
      {
        name: "Labor of Computation",
        icon: <BsPersonFillGear />,
        path: "/erp-v2/labor_of_computation",
      },
    ],
  },
  {
    title: "Account Management",
    items: [
      {
        name: "Users",
        icon: <FaRegUserCircle />,
        path: "/erp-v2/user",
      },
    ],
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar(); // Use the context's state and toggle function
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`fixed top-19 left-0 z-40 h-screen transition-all duration-300 bg-white dark:bg-gray-900 overflow-y-auto border-r border-gray-200 dark:border-gray-800 ${
        isCollapsed ? "w-16" : "w-64"
      } p-4`}
      onMouseEnter={() => {
        if (isCollapsed) {
          toggleSidebar(); // Expands the sidebar
        }
      }}
      onMouseLeave={() => {
        if (isCollapsed) {
          toggleSidebar(); // Collapses the sidebar
        }
      }} // Collapses the sidebar
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex-1 overflow-y-auto"></div>
        <ul className="text-sm font-medium space-y-2">
          {navSections.map((section, sectionIndex) => (
            <li key={section.title ?? `section-${sectionIndex}`}>
              {/* Section title */}
              {section.title && !isCollapsed && (
                <div className="text-xs font-extrabold text-neutral-400 tracking-wider ml-3 py-3">
                  {section.title}
                </div>
              )}
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <li key={`${item.name}-${section.title ?? sectionIndex}`}>
                    {item.subItems ? (
                      <>
                        {/* Dropdown button */}
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center justify-between w-full p-2 text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <IconWrapper>{item.icon}</IconWrapper>
                            {!isCollapsed && (
                              <span className="ms-3">{item.name}</span>
                            )}
                          </div>
                          {!isCollapsed && (
                            <IoIosArrowDown
                              className={`transition-transform duration-200 ${
                                openDropdown === item.name ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </button>

                        {openDropdown === item.name && !isCollapsed && (
                          <ul className="ml-9 mt-1 space-y-1">
                            {item.subItems.map((sub, subIndex) => (
                              <li key={`${sub.name}-${item.name}-${subIndex}`}>
                                <Link
                                  href={sub.path}
                                  className={`block p-2 rounded-lg ${
                                    isActive(sub.path)
                                      ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.path}
                        className={`flex items-center p-2 rounded-lg group ${
                          isActive(item.path)
                            ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                            : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <IconWrapper>{item.icon}</IconWrapper>
                        {!isCollapsed && (
                          <span className="ms-3 whitespace-nowrap">
                            {item.name}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
