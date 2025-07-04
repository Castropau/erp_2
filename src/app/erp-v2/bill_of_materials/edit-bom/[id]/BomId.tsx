"use client";
import { fetchbomId } from "@/api/bill_of_materials/fetchBomId";
// import {
//   ClientUser,
//   fetchbomClient,
// } from "@/api/bill_of_materials/fetchClients";
// import { BomUser, fetchbomUser } from "@/api/bill_of_materials/fetchUsers";
// import { updateBomId, updatebomId } from "@/api/bill_of_materials/updateBomId";
import { useQuery } from "@tanstack/react-query";
// import { Formik, Field, Form } from "formik";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
// import ActiveNav1 from "../../_components/EditComponents/ActiveNav1";
// import ActiveNav2 from "../../_components/EditComponents/ActiveNav2";
// import ActiveNav3 from "../../_components/EditComponents/ActiveNav3";
// import ActiveNav4 from "../../_components/EditComponents/ActiveNav4";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import Link from "next/link";
// import * as XLSX from "xlsx";
import * as XLSX from "xlsx-js-style";

import NotFound from "@/components/Error/NotFound";
import EditForm from "../../_components/Function/EditForm";
// interface DeviceRows {
//   subrows: string | number;
//   unitPrice: string;
//   item: string;
//   description: string;
//   quantity: number;
//   unit_of_measurement: string;
//   srp: number;
//   total_amount: string;
//   amount: string;
// }
interface DeviceRow {
  total_amount: string;
  unitPrice: string;
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: number;
  amount: string;
  srp: number; // <-- change from number to string
  // subrows: DeviceRow[];
}

const BomId = () => {
  // const queryClient = useQueryClient();
  const pathname = usePathname();
  // const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
  const [showSuccess] = useState(false);
  // const id = pathname?.split("/").pop();
  const rawId = pathname?.split("/").pop();
  const id = rawId ?? ""; // Ensures it's always a string (never undefined)

  const {
    data: BomData,
    isLoading: Rloading,
    // isError: ReceiptError,
    error: rerror,
  } = useQuery({
    queryKey: ["bom", id],
    queryFn: () => fetchbomId(id as string),
    enabled: !!id,
  });
  // const { mutate: updateBom } = useMutation({
  //   mutationFn: (data: updateBomId) => updatebomId(id as string, data),
  //   onSuccess: () => {
  //     console.log("delivery updated successfully");
  //     queryClient.invalidateQueries({ queryKey: ["bom", id] });
  //   },
  //   onError: (error) => {
  //     console.error("Error updating quotation:", error);
  //   },
  // });
  // const [activeNav, setActiveNav] = useState(1);
  // const [showEditModal, setShowEditModal] = useState(false);
  // interface DeviceRows1 {
  //   item: string; // instead of string
  //   description: string;
  //   quantity: string; // <-- STRING, not number
  //   unit_of_measurement: string;
  //   amount: string;
  //   srp: number;
  //   total_amount: string;
  //   // subrows: DeviceRow[];
  // }
  // interface Item {
  //   id: number;
  //   item: string;
  //   // name: string;
  //   // maybe other properties...
  // }
  interface DeviceRows12 {
    description: string;
    quantity: number; // <-- STRING, not number
    unit_of_measurement: string;
    amount: string;
    srp: number;
    total_amount: number;
    item: string;
  }
  // interface Items {
  //   id: number;
  //   item: string;
  //   // name: string;
  //   // maybe other properties...
  // }
  const [deviceRows, setDeviceRows] = useState<DeviceRows12[]>([]);

  const [formData, setFormData] = useState({
    input1: BomData?.bom_no || "",
    input2: BomData?.date_created || "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
  });
  // const {
  //   isLoading: Uloading,
  //   error: uerror,
  //   data: udata,
  // } = useQuery<BomUser[]>({
  //   queryKey: ["users"],
  //   queryFn: fetchbomUser,
  // });
  // const {
  //   isLoading: Clientloading,
  //   error: clienterror,
  //   data: clientdata,
  // } = useQuery<ClientUser[]>({
  //   queryKey: ["client"],
  //   queryFn: fetchbomClient,
  // });

  useEffect(() => {
    if (BomData && BomData.device_header) {
      const headersFromData = BomData.device_header.map((header) => ({
        title: header.header || "",
        rows: header.items.map((item) => ({
          item: item.item,
          description: item.description,
          quantity: item.quantity,
          unit_of_measurement: item.unit_of_measurement.toString(),
          srp: item.srp,
          subrows: [],
          amount: (item.quantity * item.srp).toFixed(2), // or item.amount if already exists
          unitPrice: item.unit_of_measurement,
          total_amount: item.total_amount,
        })),
      }));

      setNewHeaders(headersFromData);
    }
  }, [BomData]);

  useEffect(() => {
    if (BomData?.device_items) {
      // If device_items is an array:
      const devices = Array.isArray(BomData.device_items)
        ? BomData.device_items
        : [BomData.device_items]; // fallback for single item

      const formattedDevices = devices.map((device) => ({
        item: device.item || "",
        description: device.description || "",
        quantity: device.quantity || 0,
        unit_of_measurement: device.unit_of_measurement || "", // or you can hardcode a default
        // srp: device.item.srp || 0,
        srp: device.srp || 0,

        // total_amount: device.total_amount || 0, // Fetching the total_amount
        // total_amount: device.srp * device.quantity || 0,
        // total_amount: (device.srp || 0) * (device.quantity || 0), // ✅ computed from srp * quantity
        total_amount: device.total_amount,
        amount: device.amount,
      }));
      // const formattedDevices: DeviceRows1[] = devices.map((device) => {
      //   const quantity = Number(device.quantity) || 0;
      //   const srp = Number(device.srp) || 0;
      //   const total = srp * quantity;

      //   return {
      //     item: device.item || "",
      //     description: device.description || "",
      //     quantity: quantity.toString(),
      //     unit_of_measurement: device.unit_of_measurement || "",
      //     srp,
      //     amount: total.toFixed(2),
      //     total_amount: device.total_amount,
      //     // subrows: [],
      //   };
      // });

      setDeviceRows(formattedDevices);
    }
  }, [BomData]);

  useEffect(() => {
    if (BomData) {
      setFormData({
        input1: BomData.bom_no || "",
        input2: BomData.date_created || "", // Add any other default values as needed
        input3: BomData.sic.full_name || "",
        input4: BomData.client.client || "",
        input5: BomData.status || "",
        input6: BomData.eic.full_name || "",
        input7: BomData.project_name || "",
        input8: BomData.project_site || "",
      });
    }
  }, [BomData]);

  // Handle changes in input fields
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  // const [headers, setHeaders] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  interface DeviceRows2 {
    subrows: any;
    unitPrice: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    srp: number;
    total_amount: string;
    amount: string;
  }
  const [newHeaders, setNewHeaders] = useState<
    { title: string; rows: DeviceRows2[] }[]
  >([]);

  // const handleSave = () => {
  //   console.log("Form Data:", formData);
  //   console.log("Device Rows:", deviceRows);
  //   console.log("Headers:", headers);
  //   setShowEditModal(false);
  // };

  // const removeDeviceRow = (index: number) => {
  //   const updated = [...deviceRows];
  //   updated.splice(index, 1);
  //   setDeviceRows(updated);
  // };

  // const addHeader = () => {
  //   setNewHeaders([
  //     ...newHeaders,
  //     {
  //       title: "",
  //       rows: [
  //         {
  //           item: "",
  //           description: "",
  //           quantity: 0,
  //           unit_of_measurement: "",
  //           srp: 0,
  //           // subrows: undefined,
  //           unitPrice: "",
  //           // total_amount: "",
  //           amount: "",
  //           total_amount: "",
  //           subrows: "",
  //         },
  //       ],
  //     },
  //   ]);
  // };
  // const updateDeviceRow = (
  //   rowIndex: number,
  //   key: keyof DeviceRow,
  //   value: string | number
  // ) => {
  //   setDeviceRows((prevRows) => {
  //     const updatedRows = [...prevRows];
  //     updatedRows[rowIndex] = {
  //       ...updatedRows[rowIndex],
  //       [key]: value,
  //     };
  //     return updatedRows;
  //   });
  // };

  //   const addHeader = (e?: React.MouseEvent<HTMLButtonElement>) => {
  //     e?.preventDefault(); // prevent default form behavior if event passed

  //     setNewHeaders((prev) => [
  //       ...prev,
  //       {
  //         title: "",
  //         rows: [
  //           {
  //             item: "",
  //             description: "",
  //             quantity: "",
  //             unit_of_measurement: "",
  //             amount: "",
  //           },
  //         ],
  //       },
  //     ]);
  //   };

  //   const updateNewHeaderTitle = (index: number, value: string) => {
  //     const updated = [...newHeaders];
  //     updated[index].title = value;
  //     setNewHeaders(updated);
  //   };
  // const updateNewHeaderTitle = (headerIndex: number, newTitle: string) => {
  //   setNewHeaders((prevHeaders) => {
  //     const updatedHeaders = [...prevHeaders];
  //     updatedHeaders[headerIndex].title = newTitle;
  //     return updatedHeaders;
  //   });
  // };

  // const updateNewHeaderRow = (
  //   headerIndex: number,
  //   rowIndex: number,
  //   key: keyof DeviceRow,
  //   value: string
  // ) => {
  //   const updated = [...newHeaders];
  //   const row = updated[headerIndex].rows[rowIndex];
  //   row[key] = value;

  //   const quantity = row.quantity;
  //   const unitPrice = parseFloat(row.unitPrice);
  //   row.amount =
  //     !isNaN(quantity) && !isNaN(unitPrice)
  //       ? (quantity * unitPrice).toFixed(2)
  //       : "";

  //   setNewHeaders(updated);
  // };
  // interface DeviceRoww2 {
  //   unitPrice: string;
  //   item: string;
  //   description: string;
  //   quantity: number;
  //   unit_of_measurement: string;
  //   amount: string;
  //   srp: number; // <-- change from number to string
  //   // subrows: DeviceRow[];
  //   total_amount: string;
  // }
  // const updateNewHeaderRow = (
  //   headerIndex: number,
  //   rowIndex: number,
  //   field: keyof DeviceRoww2,
  //   newValue: string
  // ) => {
  //   const updatedHeaders = [...newHeaders];
  //   const row = updatedHeaders[headerIndex].rows[rowIndex];

  //   // If the field is a number type, convert string input to number
  //   if (field === "quantity" || field === "srp") {
  //     row[field] = parseFloat(newValue) as any; // Type assertion because of TS restrictions
  //   } else {
  //     // Otherwise treat it as string or any type compatible with your interface
  //     row[field] = newValue as any;
  //   }

  //   // Example recalculation of amount or total_amount, adjust as needed
  //   const quantity = row.quantity;
  //   const srp = row.srp;

  //   row.amount =
  //     !isNaN(quantity) && !isNaN(srp) ? (quantity * srp).toFixed(2) : "";

  //   // You may want to update total_amount similarly
  //   row.total_amount = row.amount;

  //   setNewHeaders(updatedHeaders);
  // };
  // const updateNewHeaderRow = (
  //   headerIndex: number,
  //   rowIndex: number,
  //   field: keyof DeviceRow,
  //   newValue: string
  // ) => {
  //   setNewHeaders((prevHeaders) => {
  //     const updatedHeaders = [...prevHeaders];
  //     updatedHeaders[headerIndex].rows[rowIndex][field] = newValue;
  //     return updatedHeaders;
  //   });
  // };

  // const addRowToNewHeader = (headerIndex: number) => {
  //   const updated = [...newHeaders];
  //   updated[headerIndex].rows.push({
  //     item: "",
  //     description: "",
  //     quantity: 0,
  //     unit_of_measurement: "",
  //     srp: 0,
  //     // subrows: undefined,
  //     unitPrice: "",
  //     total_amount: "",
  //     amount: "",
  //     subrows: "",
  //   });
  //   setNewHeaders(updated);
  // };

  //   const addRowToNewHeader = (headerIndex: number) => {
  //     setNewHeaders((prevHeaders) => {
  //       const updatedHeaders = [...prevHeaders];
  //       updatedHeaders[headerIndex].rows.push({
  //         item: "",
  //         description: "",
  //         quantity: "",
  //         unit_of_measurement: "",
  //         amount: "",
  //       });
  //       return updatedHeaders;
  //     });
  //   };
  //   const addRowToNewHeader = (headerIndex: number) => {
  //     setNewHeaders((prevHeaders) => {
  //       const updatedHeaders = [...prevHeaders];

  //       // Ensure that we are adding only one row and not multiple
  //       updatedHeaders[headerIndex].rows = [
  //         ...updatedHeaders[headerIndex].rows,
  //         {
  //           item: "",
  //           description: "",
  //           quantity: "",
  //           unit_of_measurement: "",
  //           amount: "",
  //         },
  //       ];

  //       return updatedHeaders;
  //     });
  //   };

  //   const removeRowFromNewHeader = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...newHeaders];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setNewHeaders(updated);
  //   };
  // const removeRowFromNewHeader = (headerIndex: number, rowIndex: number) => {
  //   setNewHeaders((prevHeaders) => {
  //     const updatedHeaders = [...prevHeaders];
  //     updatedHeaders[headerIndex].rows.splice(rowIndex, 1);
  //     return updatedHeaders;
  //   });
  // };

  // const saveNewHeader = (index: number) => {
  //   const headerToSave = newHeaders[index];
  //   if (!headerToSave.title.trim()) return;
  //   setHeaders([...headers, headerToSave]);
  //   const updated = [...newHeaders];
  //   updated.splice(index, 1);
  //   setNewHeaders(updated);
  // };

  // const cancelNewHeader = (index: number) => {
  //   const updated = [...newHeaders];
  //   updated.splice(index, 1);
  //   setNewHeaders(updated);
  // };

  // const addRowToHeader = (headerIndex: number) => {
  //   const updated = [...headers];
  //   updated[headerIndex].rows.push({
  //     item: "",
  //     description: "",
  //     quantity: 0,
  //     unit_of_measurement: "",
  //     amount: "",
  //     // subrows: undefined,
  //     unitPrice: "",
  //     srp: 0,
  //     total_amount: "",
  //   });
  //   setHeaders(updated);
  // };

  // const updateHeaderRow = (
  //   headerIndex: number,
  //   rowIndex: number,
  //   key: keyof DeviceRow,
  //   value: string
  // ) => {
  //   const updated = [...headers];
  //   const row = updated[headerIndex].rows[rowIndex];
  //   row[key] = value;

  //   const quantity = parseFloat(row.quantity);
  //   const unit_of_measurement = parseFloat(row.unit_of_measurement);
  //   row.amount =
  //     !isNaN(quantity) && !isNaN(unit_of_measurement)
  //       ? (quantity * unit_of_measurement).toFixed(2)
  //       : "";

  //   setHeaders(updated);
  // };

  // const removeHeaderRow = (headerIndex: number, rowIndex: number) => {
  //   const updated = [...headers];
  //   updated[headerIndex].rows.splice(rowIndex, 1);
  //   setHeaders(updated);
  // };
  // const getHeaderSubtotal = (rows: DeviceRow[]) => {
  //   return rows.reduce((sum, row) => {
  //     const amount = parseFloat(row.amount);
  //     return sum + (isNaN(amount) ? 0 : amount);
  //   }, 0);
  // };

  // const getTotalAmountIncludingNew = () => {
  //   const savedTotal = deviceRows.reduce((sum, row) => {
  //     return sum + row.total_amount || 0;
  //   }, 0);

  //   const newHeadersTotal = newHeaders.reduce((sum, newHeader) => {
  //     return sum + getNewHeaderSubtotal(newHeader.rows);
  //   }, 0);

  //   return savedTotal + newHeadersTotal;
  // };

  //   const getNewHeaderSubtotal = (rows: DeviceRow[]) => {
  //     return rows.reduce((sum, row) => {
  //       const amount = parseFloat(row.amount);
  //       return sum + (isNaN(amount) ? 0 : amount);
  //     }, 0);
  //   };
  //   const getNewHeaderSubtotal = (rows: DeviceRow[]) => {
  //     return rows.reduce((total, row) => {
  //       const quantity = parseFloat(row.quantity) || 0;
  //       const unit_of_measurement = parseFloat(row.unit_of_measurement) || 0;
  //       return total + quantity * unit_of_measurement;
  //     }, 0);
  //   };
  //   const getNewHeaderSubtotal = (rows: DeviceRow[]) => {
  //     return rows.reduce((total, row) => {
  //       const srp = parseFloat(row.srp) || 0; // Ensure srp is treated as a number
  //       return total + srp; // Sum all srp values
  //     }, 0);
  //   };
  // interface DeviceRows57 {
  //   total_amount: number;
  //   // unitPrice: string;
  //   item: string;
  //   description: string;
  //   quantity: number;
  //   unit_of_measurement: string;
  //   amount: string;
  //   srp: number; // <-- change from number to string
  // }
  // const getNewHeaderSubtotal = (rows: DeviceRows57[]) => {
  //   return rows.reduce((total, row) => {
  //     const srp = parseFloat(row.srp as any) || 0;
  //     const quantity = parseFloat(row.quantity as any) || 0;
  //     return total + quantity * srp;
  //   }, 0);
  // };
  // interface DeviceRows123 {
  //   description: string;
  //   quantity: number; // <-- STRING, not number
  //   unit_of_measurement: string;
  //   amount: string;
  //   srp: number;
  //   total_amount: string;
  //   item: string;
  // }
  // const [deviceRows2, setDeviceRows2] = useState<DeviceRows123[]>([]);
  const [newHeaders2, setNewHeaders2] = useState<
    { title: string; rows: DeviceRows2[] }[]
  >([]);
  // const [headers2, setHeaders2] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  // const addHeader2 = () => {
  //   setNewHeaders2([
  //     ...newHeaders2,
  //     {
  //       title: "",
  //       rows: [
  //         {
  //           item: "",
  //           description: "",
  //           quantity: 0,
  //           unit_of_measurement: "",
  //           srp: 0,
  //           amount: "",
  //           total_amount: "",
  //           unitPrice: "",
  //           subrows: undefined,
  //         },
  //       ],
  //     },
  //   ]);
  // };
  // const updateNewHeaderTitle2 = (index: number, value: string) => {
  //   const updated = [...newHeaders2];
  //   updated[index].title = value;
  //   setNewHeaders2(updated);
  // };

  // const addRowToNewHeader2 = (headerIndex: number) => {
  //   const updated = [...newHeaders2];
  //   updated[headerIndex].rows.push({
  //     item: "",
  //     description: "",
  //     quantity: 0,
  //     unit_of_measurement: "",
  //     srp: 0,
  //     total_amount: "",
  //     unitPrice: "",
  //     amount: "",
  //     subrows: undefined,
  //   });
  //   setNewHeaders2(updated);
  // };

  // const saveNewHeader2 = (index: number) => {
  //   const headerToSave = newHeaders2[index];
  //   if (!headerToSave.title.trim()) return;
  //   setHeaders2([...headers2, headerToSave]);
  //   const updated = [...newHeaders2];
  //   updated.splice(index, 1);
  //   setNewHeaders2(updated);
  // };

  // const cancelNewHeader2 = (index: number) => {
  //   const updated = [...newHeaders2];
  //   updated.splice(index, 1);
  //   setNewHeaders2(updated);
  // };
  //   const getNewHeaderSubtotal2 = (rows: DeviceRow[]) => {
  //     return rows.reduce((sum, row) => {
  //       const amount = parseFloat(row.amount);
  //       return sum + (isNaN(amount) ? 0 : amount);
  //     }, 0);
  //   };
  //   const getNewHeaderSubtotal2 = (rows: DeviceRow[]) => {
  //     return rows.reduce((total, row) => {
  //       const srp = parseFloat(row.srp) || 0; // Ensure srp is treated as a number
  //       return total + srp; // Sum all srp values
  //     }, 0);
  //   };
  // interface DeviceRows571 {
  //   total_amount: string;
  //   // unitPrice: string;
  //   item: string;
  //   description: string;
  //   quantity: number;
  //   unit_of_measurement: string;
  //   amount: string;
  //   srp: number; // <-- change from number to string
  // }
  // const getNewHeaderSubtotal2 = (rows: DeviceRows571[]) => {
  //   return rows.reduce((total, row) => {
  //     const srp = parseFloat(row.srp as any) || 0;
  //     const quantity = parseFloat(row.quantity as any) || 0;
  //     return total + quantity * srp;
  //   }, 0);
  // };

  // const getTotalAmountIncludingNew2 = () => {
  //   const savedTotal = headers2.reduce((sum, header) => {
  //     return sum + getHeaderSubtotal(header.rows);
  //   }, 0);

  //   const newHeadersTotal = newHeaders2.reduce((sum, newHeader) => {
  //     return sum + getNewHeaderSubtotal2(newHeader.rows);
  //   }, 0);

  //   return savedTotal + newHeadersTotal;
  // };
  // const removeDeviceRow2 = (index: number) => {
  //   const updated = [...deviceRows2];
  //   updated.splice(index, 1);
  //   setDeviceRows2(updated);
  // };

  interface Material {
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    srp: string;
    amount: string;
    total_amount: string;
  }
  interface MaterialHeader {
    items: Material[];
    header: string;
  }
  useEffect(() => {
    if (BomData?.material_header) {
      const headersFromMaterial = BomData.material_header.map(
        (header: MaterialHeader) => ({
          title: header.header || "Untitled Header",
          rows: header.items.map((item) => ({
            item: item.item,
            description: item.description,
            quantity: item.quantity.toString(),
            unit_of_measurement: item.unit_of_measurement,
            srp: item.srp.toString(),
            amount: item.total_amount.toString(),
          })),
        })
      );

      setNewHeaders2(headersFromMaterial);
    }
  }, [BomData]);

  // const updateNewHeaderRow2 = (
  //   headerIndex: number,
  //   rowIndex: number,
  //   key: keyof DeviceRow,
  //   value: string
  // ) => {
  //   const updated = [...newHeaders2];
  //   const row = updated[headerIndex].rows[rowIndex];
  //   row[key] = value;

  //   const quantity = parseFloat(row.quantity);
  //   const unitPrice = parseFloat(row.unit_of_measurement);
  //   row.amount =
  //     !isNaN(quantity) && !isNaN(unitPrice)
  //       ? (quantity * unitPrice).toFixed(2)
  //       : "";

  //   setNewHeaders2(updated);
  // };
  // const updateNewHeaderRow2 = (
  //   headerIndex: number,
  //   rowIndex: number,
  //   field: keyof DeviceRow,
  //   newValue: string
  // ) => {
  //   const updatedHeaders = [...newHeaders2];
  //   const row = updatedHeaders[headerIndex].rows[rowIndex];

  //   // If the field is a number type, convert string input to number
  //   if (field === "quantity" || field === "srp") {
  //     row[field] = parseFloat(newValue) as any; // Type assertion because of TS restrictions
  //   } else {
  //     // Otherwise treat it as string or any type compatible with your interface
  //     row[field] = newValue as any;
  //   }

  //   // Example recalculation of amount or total_amount, adjust as needed
  //   const quantity = row.quantity;
  //   const srp = row.srp;

  //   row.amount =
  //     !isNaN(quantity) && !isNaN(srp) ? (quantity * srp).toFixed(2) : "";

  //   // You may want to update total_amount similarly
  //   row.total_amount = row.amount;

  //   setNewHeaders2(updatedHeaders);
  // };
  // const removeRowFromNewHeader2 = (headerIndex: number, rowIndex: number) => {
  //   const updated = [...newHeaders2];
  //   updated[headerIndex].rows.splice(rowIndex, 1);
  //   setNewHeaders2(updated);
  // };

  interface DeviceRows5 {
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: number;
    amount: string;
    srp: number;
    total_amount: string;
    unitPrice: string;
    subrows: DeviceRow9[]; // if present
  }
  interface DeviceRow9 {
    total_amount: string;
    unitPrice: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    amount: string;
    srp: number; // <-- change from number to string
    // subrows: DeviceRow[];
  }
  interface DeviceRows1234 {
    description: string;
    quantity: number; // <-- STRING, not number
    unit_of_measurement: number;
    amount: string;
    srp: number | string;
    total_amount: string;
    item: string;
  }
  const [deviceRows3, setDeviceRows3] = useState<DeviceRows1234[]>([]);

  interface Devices {
    total_amount: string;
    unitPrice: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: number;
    amount: string;
    srp: number;
  }

  const [newHeaders3, setNewHeaders3] = useState<
    { title: string; rows: Devices[] }[]
  >([]);
  // const [headers3, setHeaders3] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);

  // const addHeader3 = () => {
  //   setNewHeaders3([
  //     ...newHeaders3,
  //     {
  //       title: "",
  //       rows: [
  //         {
  //           item: "",
  //           description: "",
  //           quantity: 0,
  //           unitPrice: "",
  //           amount: "",
  //           total_amount: "",
  //           unit_of_measurement: 0,
  //           srp: 0,
  //         },
  //       ],
  //     },
  //   ]);
  // };
  // const updateNewHeaderTitle3 = (index: number, value: string) => {
  //   const updated = [...newHeaders3];
  //   updated[index].title = value;
  //   setNewHeaders3(updated);
  // };

  //   const updateNewHeaderRow3 = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     key: keyof DeviceRow,
  //     value: string
  //   ) => {
  //     const updated = [...newHeaders3];
  //     const row = updated[headerIndex].rows[rowIndex];
  //     row[key] = value;

  //     const quantity = parseFloat(row.quantity);
  //     const unitPrice = parseFloat(row.unitPrice);
  //     row.amount =
  //       !isNaN(quantity) && !isNaN(unitPrice)
  //         ? (quantity * unitPrice).toFixed(2)
  //         : "";

  //     setNewHeaders3(updated);
  //   };
  //   const updateNewHeaderRow3 = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     key: keyof DeviceRow,
  //     value: string
  //   ) => {
  //     const updated = [...newHeaders3];
  //     const row = updated[headerIndex].rows[rowIndex];
  //     row[key] = value;

  //     // Only recalculate if quantity or unitPrice was changed
  //     if (key === "quantity" || key === "unitPrice") {
  //       const quantity = parseFloat(row.quantity);
  //       const unitPrice = parseFloat(row.unitPrice);
  //       row.amount =
  //         !isNaN(quantity) && !isNaN(unitPrice)
  //           ? (quantity * unitPrice).toFixed(2)
  //           : "";
  //     }

  //     setNewHeaders3(updated);
  //   };
  // const updateNewHeaderRow3 = (
  //   headerIndex: number,
  //   rowIndex: number,
  //   field: keyof DeviceRow,
  //   newValue: string
  // ) => {
  //   const updatedHeaders = [...newHeaders3];
  //   const row = updatedHeaders[headerIndex].rows[rowIndex];

  //   // If the field is a number type, convert string input to number
  //   if (field === "quantity" || field === "srp") {
  //     row[field] = parseFloat(newValue) as any; // Type assertion because of TS restrictions
  //   } else {
  //     // Otherwise treat it as string or any type compatible with your interface
  //     row[field] = newValue as any;
  //   }

  //   // Example recalculation of amount or total_amount, adjust as needed
  //   const quantity = row.quantity;
  //   const srp = row.srp;

  //   row.amount =
  //     !isNaN(quantity) && !isNaN(srp) ? (quantity * srp).toFixed(2) : "";

  //   // You may want to update total_amount similarly
  //   row.total_amount = row.amount;

  //   setNewHeaders3(updatedHeaders);
  // };
  // const updateNewHeaderRow3 = (
  //   headerIndex: number,
  //   rowIndex: number,
  //   field: keyof DeviceRow,
  //   newValue: string
  // ) => {
  //   const updatedHeaders = [...newHeaders3];
  //   const row = updatedHeaders[headerIndex].rows[rowIndex];

  //   // Parse number fields
  //   if (
  //     field === "quantity" ||
  //     field === "srp" ||
  //     field === "unit_of_measurement"
  //   ) {
  //     row[field] = parseFloat(newValue) as any;
  //   } else {
  //     row[field] = newValue as any;
  //   }

  //   const quantity = row.quantity;
  //   const srp = row.srp;

  //   // Compute amount and total
  //   row.amount =
  //     !isNaN(quantity) && !isNaN(srp) ? (quantity * srp).toFixed(2) : "";
  //   row.total_amount = row.amount;

  //   setNewHeaders3(updatedHeaders);
  // };

  // const addRowToNewHeader3 = (headerIndex: number) => {
  //   const updated = [...newHeaders3];
  //   updated[headerIndex].rows.push({
  //     item: "",
  //     description: "",
  //     quantity: 0,
  //     unit_of_measurement: 0,
  //     srp: 0,
  //     amount: "",
  //     total_amount: "",
  //     unitPrice: "",
  //   });
  //   setNewHeaders3(updated);
  // };

  // const removeRowFromNewHeader3 = (headerIndex: number, rowIndex: number) => {
  //   const updated = [...newHeaders3];
  //   updated[headerIndex].rows.splice(rowIndex, 1);
  //   setNewHeaders3(updated);
  // };
  // const saveNewHeader3 = (index: number) => {
  //   const headerToSave = newHeaders3[index];
  //   if (!headerToSave.title.trim()) return;
  //   setHeaders3([...headers3, headerToSave]);
  //   const updated = [...newHeaders3];
  //   updated.splice(index, 1);
  //   setNewHeaders3(updated);
  // };

  // const cancelNewHeader3 = (index: number) => {
  //   const updated = [...newHeaders3];
  //   updated.splice(index, 1);
  //   setNewHeaders3(updated);
  // };
  //   const getNewHeaderSubtotal3 = (rows: DeviceRow[]) => {
  //     return rows.reduce((sum, row) => {
  //       const amount = parseFloat(row.amount);
  //       return sum + (isNaN(amount) ? 0 : amount);
  //     }, 0);
  //   };
  //   const getNewHeaderSubtotal3 = (rows: DeviceRow[]) => {
  //     return rows.reduce((total, row) => {
  //       const unitPrice = parseFloat(row.unitPrice as any) || 0;
  //       const quantity = parseFloat(row.quantity as any) || 0;
  //       return total + quantity * unitPrice;
  //     }, 0);
  //   };
  //   const getNewHeaderSubtotal3 = (rows: DeviceRow[]) => {
  //     return rows.reduce((total, row) => {
  //       const quantity = parseFloat(row.quantity as string) || 0;

  //       const amount = parseFloat(row.amount as string);
  //       //   const unitPrice = parseFloat(row.unitPrice as string) || 0;
  //       return total + quantity * amount;
  //     }, 0);
  //   };
  // interface DeviceRows5712 {
  //   total_amount: string;
  //   // unitPrice: string;
  //   item: string;
  //   description: string;
  //   quantity: number;
  //   unit_of_measurement: number;
  //   amount: string;
  //   srp: number | string; // <-- change from number to string
  // }
  // const getNewHeaderSubtotal3 = (rows: DeviceRows5712[]) => {
  //   return rows.reduce((total, row) => {
  //     const srp = parseFloat(row.amount as any) || 0;
  //     const quantity = parseFloat(row.quantity as any) || 0;
  //     return total + quantity * srp;
  //   }, 0);
  // };
  //   const getNewHeaderSubtotal3 = (rows: DeviceRow[]) => {
  //     return rows.reduce((total, row) => {
  //       const quantity = parseFloat(row.quantity as string) || 0;
  //       const unitPrice = parseFloat(row.unitPrice as string) || 0;
  //       return total + quantity * unitPrice;
  //     }, 0);
  //   };

  //   const getTotalAmountIncludingNew3 = () => {
  //     const savedTotal = headers3.reduce((sum, header) => {
  //       return sum + getHeaderSubtotal(header.rows);
  //     }, 0);

  //     const newHeadersTotal = newHeaders3.reduce((sum, newHeader) => {
  //       return sum + getNewHeaderSubtotal3(newHeader.rows);
  //     }, 0);

  //     return savedTotal + newHeadersTotal;
  //   };
  //   const getTotalAmountIncludingNew3 = () => {
  //     const savedTotal = headers2.reduce((sum, header) => {
  //       return sum + getHeaderSubtotal(header.rows);
  //     }, 0);

  //     const newHeadersTotal = newHeaders3.reduce((sum, newHeader) => {
  //       return sum + getNewHeaderSubtotal3(newHeader.rows);
  //     }, 0);

  //     return savedTotal + newHeadersTotal;
  //   };
  // const getTotalAmountIncludingNew3 = () => {
  //   // Subtotal from saved headers
  //   const savedTotal = headers2.reduce((sum, header) => {
  //     return sum + getHeaderSubtotal(header.rows);
  //   }, 0);

  //   // Subtotal from new editable headers
  //   const newHeadersTotal = newHeaders3.reduce((sum, newHeader) => {
  //     return sum + getNewHeaderSubtotal3(newHeader.rows);
  //   }, 0);

  //   // Subtotal from the main device rows table
  //   const deviceRowsTotal = deviceRows3.reduce((sum, row) => {
  //     return sum + (parseFloat(row.amount) || 0);
  //   }, 0);

  //   // Grand total
  //   return savedTotal + newHeadersTotal + deviceRowsTotal;
  // };

  // const removeDeviceRow3 = (index: number) => {
  //   const updated = [...deviceRows3];
  //   updated.splice(index, 1);
  //   setDeviceRows3(updated);
  // };

  // useEffect(() => {
  //   if (BomData?.labor_header) {
  //     const headersFromLabor = BomData.labor_header.map((header) => ({
  //       title: header.header || "Labor Header",
  //       rows: Array.isArray(header.items)
  //         ? header.items.map((item) => ({
  //             item: item.item,
  //             description: item.description || "",
  //             quantity: item.quantity?.toString() || "0",
  //             unit_of_measurement: item.unit_of_measurement || "",
  //             amount: item.total_amount?.toString() || "0",
  //           }))
  //         : [],
  //     }));

  //     setNewHeaders3(headersFromLabor);
  //   }
  // }, [BomData]);
  // useEffect(() => {
  //   if (BomData?.labor_header) {
  //     const headersFromLabor = BomData.labor_header.map((header) => ({
  //       title: header.header || "Labor Header",
  //       rows: Array.isArray(header.items)
  //         ? header.items.map((item) => {
  //             const quantity = Number(item.quantity) || 0;
  //             const srp = Number(item.srp) || 0;
  //             const amount = quantity * srp;

  //             return {
  //               item: item.item || "",
  //               description: item.description || "",
  //               quantity,
  //               unit_of_measurement: item.unit_of_measurement || 0,
  //               amount: amount.toFixed(2),
  //               srp,
  //               total_amount: amount.toFixed(2),
  //               unitPrice: srp.toString(),
  //             };
  //           })
  //         : [],
  //     }));

  //     setNewHeaders3(headersFromLabor);
  //   }
  // }, [BomData]);
  useEffect(() => {
    if (BomData?.labor_header) {
      const headersFromLabor = BomData.labor_header.map((header) => ({
        title: header.header || "Labor Header",
        rows: Array.isArray(header.items)
          ? header.items.map((item) => {
              const quantity = Number(item.quantity) || 0;
              const srp = Number(item.srp) || 0;
              const amount = quantity * srp;

              return {
                item: item.item || "",
                description: item.description || "",
                quantity,
                unit_of_measurement: Number(item.unit_of_measurement) || 0, // ✅ Cast to number
                amount: amount.toFixed(2),
                srp,
                total_amount: amount.toFixed(2),
                unitPrice: srp.toString(),
              };
            })
          : [],
      }));

      setNewHeaders3(headersFromLabor);
    }
  }, [BomData]);

  // useEffect(() => {
  //   if (BomData?.labor_items) {
  //     const laborItemsFormatted: DeviceRow[] = BomData.labor_items.map(
  //       (labor) => ({
  //         item: labor.item || "",
  //         description: labor.description || "",
  //         quantity: labor.quantity?.toString() || "0",
  //         unit_of_measurement: labor.unit_of_measurement || "",
  //         amount: labor.total_amount?.toString() || "0",
  //       })
  //     );

  //     setDeviceRows3(laborItemsFormatted);
  //   }
  // }, [BomData]);
  useEffect(() => {
    if (BomData?.labor_items) {
      const laborItemsFormatted: DeviceRows5[] = BomData.labor_items.map(
        (labor) => {
          const quantity = Number(labor.quantity) || 0;
          const srp = Number(labor.srp) || 0;
          const total = quantity * srp;

          return {
            item: labor.item || "",
            description: labor.description || "",
            quantity: quantity,
            unit_of_measurement: labor.unit_of_measurement || 0,
            amount: total.toFixed(2),
            srp: srp,
            total_amount: total.toFixed(2),
            unitPrice: srp.toString(),
            subrows: [], // required by DeviceRows5; initialize empty or populate if you have sub-items
          };
        }
      );

      setDeviceRows3(laborItemsFormatted);
    }
  }, [BomData]);

  // const updateDeviceRow3 = (
  //   rowIndex: number,
  //   key: keyof DeviceRow,
  //   value: string | number
  // ) => {
  //   setDeviceRows3((prevRows) => {
  //     const updated = [...prevRows];
  //     updated[rowIndex] = {
  //       ...updated[rowIndex],
  //       [key]: value,
  //     };
  //     return updated;
  //   });
  // };
  interface DeviceRow12 {
    item: string;
    description: string;
    quantity: number; // it's a string in your mapping
    unit_of_measurement: string;
    amount: string;
    srp: string;
    total_amount: string;
    unitPrice: string;
    subrows: Subrow[]; // nested subrows (see below)
  }

  interface Subrow {
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    srp: string;
    amount: string;
  }

  interface SubRowss {
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    srp: string;
    amount: string | number;
  }
  interface DeviceRows12345 {
    subrows: SubRowss[];
    description: string;
    quantity: number; // <-- STRING, not number
    unit_of_measurement: string;
    amount: string | number;
    srp: number | string;
    total_amount: string;
    item: string;
  }
  const [deviceRows4, setDeviceRows4] = useState<DeviceRows12345[]>([]);

  // const [newHeaders4, setNewHeaders4] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  // const [headers4, setHeaders4] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  // types.ts (or similar)
  // interface DeviceRow57 {
  //   subrows: SubRows2asd[];
  //   item: string;
  //   description: string;
  //   quantity: number;
  //   unit_of_measurement: string;
  //   srp: string | number;
  //   amount: string | number;
  //   total_amount: string;
  // }

  // interface SubRows2asd {
  //   item: string;
  //   description: string;
  //   quantity: number;
  //   unit_of_measurement: string;
  //   amount: string | number;
  //   srp: string;
  // }

  // const updateDeviceRow4 = (
  //   rowIndex: number,
  //   key: keyof DeviceRow57,
  //   value: string | number
  // ) => {
  //   setDeviceRows4((prevRows) => {
  //     const updated = [...prevRows];
  //     updated[rowIndex] = {
  //       ...updated[rowIndex],
  //       [key]: value,
  //     };
  //     return updated;
  //   });
  // };
  // const getNewHeaderSubtotal4 = (rows: DeviceRow[]) => {
  //   return rows.reduce((sum, row) => {
  //     const amount = parseFloat(row.amount);
  //     return sum + (isNaN(amount) ? 0 : amount);
  //   }, 0);
  // };

  // const getTotalAmountIncludingNew4 = () => {
  //   const savedTotal = headers4.reduce((sum, header) => {
  //     return sum + getHeaderSubtotal(header.rows);
  //   }, 0);

  //   const newHeadersTotal = newHeaders4.reduce((sum, newHeader) => {
  //     return sum + getNewHeaderSubtotal4(newHeader.rows);
  //   }, 0);

  //   return savedTotal + newHeadersTotal;
  // };
  // const removeDeviceRow4 = (index: number) => {
  //   const updated = [...deviceRows4];
  //   updated.splice(index, 1);
  //   setDeviceRows4(updated);
  // };
  // const removeDeviceRow1 = (index: number) => {
  //   const updated = [...deviceRows];
  //   updated.splice(index, 1);
  //   setDeviceRows(updated);
  // };

  // useEffect(() => {
  //   if (BomData?.general_header) {
  //     const rowsFromGeneral = BomData.general_header.map((header) => {
  //       return {
  //         item: header.item || "",
  //         description: header.description || "",
  //         quantity: header.quantity?.toString() || "",
  //         unit_of_measurement: header.unit_of_measurement || "",
  //         //   amount: ((header.quantity || 0) * (header.srp || 0)).toFixed(2),
  //         amount: header.header_sub_total?.toString() || "", // ✅ Use this, not calculation

  //         srp: header.srp?.toString() || "0",
  //         subrows:
  //           header.items?.map((item) => ({
  //             item: item.item || "",
  //             description: item.description || "",
  //             quantity: item.quantity?.toString() || "",
  //             unit_of_measurement: item.unit_of_measurement || "",
  //             srp: item.srp?.toString() || "0", // ✅ this line is essential

  //             //   amount: ((item.quantity || 0) * (item.srp || 0)).toFixed(2),
  //             amount: item.total_amount?.toString() || "", // ⬅️ FIXED
  //           })) || [],
  //       };
  //     });

  //     setDeviceRows4(rowsFromGeneral);
  //   }
  // }, [BomData]);
  useEffect(() => {
    if (BomData?.general_header) {
      const rowsFromGeneral: DeviceRow12[] = BomData.general_header.map(
        (header) => {
          return {
            item: header.item || "",
            description: header.description || "",
            quantity: header.quantity || 0,
            unit_of_measurement: header.unit_of_measurement || "",
            amount: header.header_sub_total?.toString() || "0", // display-only amount

            srp: header.srp?.toString() || "0", // make sure it's string
            total_amount: header.header_sub_total?.toString() || "0",
            unitPrice: header.srp?.toString() || "0",
            subrows:
              header.items?.map((item) => ({
                item: item.item || "",
                description: item.description || "",
                quantity: item.quantity || 0,
                unit_of_measurement: item.unit_of_measurement || "",
                srp: item.srp?.toString() || "0",
                amount: item.total_amount?.toString() || "0",
              })) || [],
          };
        }
      );

      setDeviceRows4(rowsFromGeneral);
    }
  }, [BomData]);

  // const addSubRow4 = (rowIndex: number) => {
  //   const updatedRows = [...deviceRows4];
  //   const currentRow = updatedRows[rowIndex];

  //   const newSubRow = {
  //     item: "",
  //     description: "",
  //     quantity: 0,
  //     unit_of_measurement: "",
  //     srp: "",
  //     amount: "0.00",
  //   };

  //   if (!currentRow.subrows) {
  //     currentRow.subrows = [];
  //   }

  //   currentRow.subrows.push(newSubRow);
  //   setDeviceRows4(updatedRows);
  // };
  // interface SubRows {
  //   item: string;
  //   description: string;
  //   quantity: number;
  //   unit_of_measurement: string;
  //   srp: string;
  //   amount: string;
  // }

  // const updateSubRow4 = (
  //   rowIndex: number,
  //   subRowIndex: number,
  //   key: keyof SubRows,
  //   value: string
  // ) => {
  //   setDeviceRows4((prevRows) => {
  //     const updatedRows = [...prevRows];
  //     const subrow = updatedRows[rowIndex].subrows?.[subRowIndex];
  //     if (subrow) {
  //       subrow[key] = value;

  //       // Update amount if quantity or unit price changed
  //       const quantity = parseFloat(subrow.quantity || 0);
  //       const unitPrice = parseFloat(subrow.unit_of_measurement || "0");
  //       subrow.amount = (quantity * unitPrice).toFixed(2);
  //     }
  //     return updatedRows;
  //   });
  // };
  // const updateSubRow4 = (
  //   rowIndex: number,
  //   subRowIndex: number,
  //   key: keyof SubRows,
  //   value: string
  // ) => {
  //   setDeviceRows4((prevRows) => {
  //     const updatedRows = [...prevRows];
  //     const subrow = updatedRows[rowIndex].subrows?.[subRowIndex];

  //     if (subrow) {
  //       // If updating a numeric field, cast appropriately
  //       if (key === "quantity") {
  //         subrow[key] = Number(value) as any;
  //       } else {
  //         subrow[key] = value;
  //       }

  //       const quantity = subrow.quantity;
  //       const unitPrice = parseFloat(subrow.srp || "0");
  //       subrow.amount = (quantity * unitPrice).toFixed(2);
  //     }

  //     return updatedRows;
  //   });
  // };

  //   const removeSubRow4 = (rowIndex: number, subRowIndex: number) => {
  //     setDeviceRows4((prevRows) => {
  //       const updatedRows = [...prevRows];
  //       updatedRows[rowIndex].subrows?.splice(subRowIndex, 1);
  //       return updatedRows;
  //     });
  //   };
  // const removeSubRow4 = (rowIndex: number, subRowIndex: number) => {
  //   setDeviceRows4((prevRows) => {
  //     const updatedRows = [...prevRows];

  //     // Clone the subrows safely
  //     const currentSubRows = updatedRows[rowIndex].subrows || [];

  //     // Filter out the subrow at the specified index
  //     const newSubRows = currentSubRows.filter((_, i) => i !== subRowIndex);

  //     // Assign the filtered subrows back
  //     updatedRows[rowIndex] = {
  //       ...updatedRows[rowIndex],
  //       subrows: newSubRows,
  //     };

  //     return updatedRows;
  //   });
  // };
  //   const handleExcel = () => {
  //     console.log(BomData);
  //     var wb = XLSX.utils.book_new(),
  //       ws = XLSX.utils.json_to_sheet(BomData!);
  //     XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
  //     const date = new Date().toLocaleDateString();
  //     XLSX.writeFile(wb, `Inventory_Items_${date}.xlsx`);
  //   };
  //   const handleExcel = () => {
  //     if (!BomData) return;

  //     console.log(BomData);

  //     const wb = XLSX.utils.book_new();
  //     const ws = XLSX.utils.json_to_sheet([BomData]);

  //     XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

  //     const date = new Date().toLocaleDateString();
  //     XLSX.writeFile(wb, `Inventory_Items_${date}.xlsx`);
  //   };
  const handleExcel = () => {
    if (!BomData) return;

    const wb = XLSX.utils.book_new();

    const mainSheet = XLSX.utils.json_to_sheet([
      {
        bom_no: BomData.bom_no,
        project_name: BomData.project_name,
        project_site: BomData.project_site,
        date_created: BomData.date_created,
        date: BomData.date,
        sic: BomData.sic?.full_name,
        eic: BomData.eic?.full_name,
        client: BomData.client?.client,
        status: BomData.status,
        first_header: BomData.first_header,
      },
    ]);
    XLSX.utils.book_append_sheet(wb, mainSheet, "Overview");

    if (BomData.device_items) {
      const deviceItemsSheet = XLSX.utils.json_to_sheet(BomData.device_items);
      XLSX.utils.book_append_sheet(wb, deviceItemsSheet, "Device Items");
    }

    if (BomData.device_header?.length) {
      const flattenedDeviceHeaderItems = BomData.device_header.flatMap(
        (header) =>
          header.items.map((item) => ({
            header_id: header.id,
            header: header.header,
            header_sub_total: header.header_sub_total,
            ...item,
          }))
      );
      const deviceHeaderSheet = XLSX.utils.json_to_sheet(
        flattenedDeviceHeaderItems
      );
      XLSX.utils.book_append_sheet(
        wb,
        deviceHeaderSheet,
        "Device Header Items"
      );
    }
    interface MaterialHeader {
      id: number;
      header: string;
      header_sub_total: number;
      items: ExcelMaterialHeaderItem[];
    }

    interface ExcelMaterialHeaderItem {
      item: string;
      description: string;
      quantity: number;
      unit_of_measurement: string;
      amount: number;
      // add more props as needed
    }

    // if (BomData.material_header?.length) {
    //   const flattenedMaterialItems = BomData.material_header.flatMap((header) =>
    //     header.items.map((item) => ({
    //       header_id: header.id,
    //       header: header.header,
    //       header_sub_total: header.header_sub_total,
    //       ...item,
    //     }))
    //   );
    if (BomData.material_header?.length) {
      const flattenedMaterialItems = BomData.material_header.flatMap(
        (header: MaterialHeader) =>
          header.items.map((item: ExcelMaterialHeaderItem) => ({
            header_id: header.id,
            header: header.header,
            header_sub_total: header.header_sub_total,
            ...item,
          }))
      );
      const materialHeaderSheet = XLSX.utils.json_to_sheet(
        flattenedMaterialItems
      );
      XLSX.utils.book_append_sheet(
        wb,
        materialHeaderSheet,
        "Material Header Items"
      );
    }

    if (BomData.labor_items?.length) {
      const laborItemsSheet = XLSX.utils.json_to_sheet(BomData.labor_items);
      XLSX.utils.book_append_sheet(wb, laborItemsSheet, "Labor Items");
    }
    if (BomData.labor_header?.length) {
      const flattenedLaborItems = BomData.labor_header.flatMap((header) =>
        header.items.map((item) => ({
          ...item,
          header_id: header.id,
          header: header.header,
          header_sub_total: header.header_sub_total,
        }))
      );

      const laborHeaderSheet = XLSX.utils.json_to_sheet(flattenedLaborItems);
      XLSX.utils.book_append_sheet(wb, laborHeaderSheet, "Labor Header Items");
    }

    if (BomData.general_header?.length) {
      const generalHeaderSheet = XLSX.utils.json_to_sheet(
        BomData.general_header
      );
      XLSX.utils.book_append_sheet(wb, generalHeaderSheet, "General Headers");
    }

    const date = new Date().toLocaleDateString();
    XLSX.writeFile(wb, `${BomData.bom_no}-${date}.xlsx`);
  };
  //   const handleExcel = () => {
  //     if (!BomData) return;

  //     const wb = XLSX.utils.book_new();
  //     const overviewData = [
  //       ["Labor Computation"],
  //       [],
  //       ["Project Name:", BomData?.project_name],
  //       ["Project Site:", BomData?.project_site],
  //       ["Client name:", BomData?.client.client],
  //       ["Engineer Incharge:", BomData?.eic.full_name],
  //       ["Sales in charge:", BomData?.sic.full_name],
  //     ];

  //     const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);

  //     overviewSheet["A1"].s = {
  //       font: { bold: true, sz: 14 },
  //       alignment: { horizontal: "left" },
  //       fill: { fgColor: { rgb: "D9E1F2" } },
  //     };

  //     const labelCells = ["A3", "A4", "A5", "A6", "A7", "A8"];
  //     const valueCells = ["B3", "B4", "B5", "B6", "B7", "B8"];
  //     const headerCells = ["C3", "D3", "E3", "F3", "G3", "H3", "I3", "J3"];

  //     labelCells.forEach((cell) => {
  //       if (overviewSheet[cell]) {
  //         overviewSheet[cell].s = {
  //           font: { bold: true },
  //           alignment: { horizontal: "left" },
  //           fill: { fgColor: { rgb: "FCE4D6" } },
  //         };
  //       }
  //     });

  //     valueCells.forEach((cell) => {
  //       if (overviewSheet[cell]) {
  //         overviewSheet[cell].s = {
  //           alignment: { horizontal: "left" },
  //           fill: { fgColor: { rgb: "FFF2CC" } },
  //         };
  //       }
  //     });

  //     headerCells.forEach((cell) => {
  //       if (overviewSheet[cell]) {
  //         overviewSheet[cell].s = {
  //           font: { bold: true },
  //           alignment: { horizontal: "center" },
  //           fill: { fgColor: { rgb: "BDD7EE" } },
  //         };
  //       }
  //     });

  //     overviewSheet["!cols"] = [
  //       { wch: 20 },
  //       { wch: 35 },
  //       ...Array(8).fill({ wch: 15 }),
  //     ];

  //     XLSX.utils.book_append_sheet(wb, overviewSheet, "Overview");

  //     const borderStyle = {
  //       top: { style: "thin", color: { auto: 1 } },
  //       bottom: { style: "thin", color: { auto: 1 } },
  //       left: { style: "thin", color: { auto: 1 } },
  //       right: { style: "thin", color: { auto: 1 } },
  //     };

  //     const buildSectionSheet = (sectionName, sectionData) => {
  //       if (!sectionData) return;

  //       const colsCount = 9;
  //       let sheetData = [];
  //       let mergeRanges = [];
  //       let rowCounter = 1;
  //       let totalLabor = 0;
  //       let totalUnit = 0;

  //       if (Array.isArray(sectionData)) {
  //         sectionData.forEach((block) => {
  //           if (block.header) {
  //             let headerRow = Array(colsCount).fill("");
  //             headerRow[0] = block.header;
  //             sheetData.push(headerRow);
  //             mergeRanges.push(sheetData.length - 1);
  //           }

  //           if (block.sub_headers) {
  //             block.sub_headers.forEach((sub) => {
  //               if (sub.sub_header) {
  //                 let subHeaderRow = Array(colsCount).fill("");
  //                 subHeaderRow[0] = sub.sub_header;
  //                 sheetData.push(subHeaderRow);
  //                 mergeRanges.push(sheetData.length - 1);
  //               }

  //               if (sub.items && sub.items.length > 0) {
  //                 sheetData.push([
  //                   "#",
  //                   "ITEM",
  //                   "RATIO",
  //                   "UNIT",
  //                   "QUANTITY",
  //                   "MANPOWER",
  //                   "NO. OF DAYS",
  //                   "LABOR COST",
  //                   "PER UNIT COST",
  //                 ]);

  //                 sub.items.forEach((item) => {
  //                   const labor = Number(item.labor_cost || 0);
  //                   const unit = Number(item.per_unit_cost || 0);

  //                   sheetData.push([
  //                     rowCounter++,
  //                     item.item || "",
  //                     item.ratio || "",
  //                     item.unit || "",
  //                     item.quantity || "",
  //                     item.manpower || "",
  //                     item.no_of_days || "",
  //                     labor,
  //                     unit,
  //                   ]);

  //                   totalLabor += labor;
  //                   totalUnit += unit;
  //                 });
  //                 sheetData.push([]);
  //               }
  //             });
  //           }

  //           if (block.items && block.items.length > 0) {
  //             sheetData.push([
  //               "#",
  //               "ITEM",
  //               "RATIO",
  //               "UNIT",
  //               "QUANTITY",
  //               "MANPOWER",
  //               "NO. OF DAYS",
  //               "LABOR COST",
  //               "PER UNIT COST",
  //             ]);

  //             block.items.forEach((item) => {
  //               const labor = Number(item.labor_cost || 0);
  //               const unit = Number(item.per_unit_cost || 0);

  //               sheetData.push([
  //                 rowCounter++,
  //                 item.item || "",
  //                 item.ratio || "",
  //                 item.unit || "",
  //                 item.quantity || "",
  //                 item.manpower || "",
  //                 item.no_of_days || "",
  //                 labor,
  //                 unit,
  //               ]);

  //               totalLabor += labor;
  //               totalUnit += unit;
  //             });
  //             sheetData.push([]);
  //           }
  //         });
  //       }

  //       // Add subtotal & grand total rows if data exists
  //       if (rowCounter > 1) {
  //         sheetData.push([
  //           "",
  //           "Subtotal",
  //           "",
  //           "",
  //           "",
  //           "",
  //           "",
  //           totalLabor,
  //           totalUnit,
  //         ]);

  //         sheetData.push([
  //           "",
  //           "Grand Total",
  //           "",
  //           "",
  //           "",
  //           "",
  //           "",
  //           totalLabor,
  //           totalUnit,
  //         ]);
  //       }

  //       const sheet = XLSX.utils.aoa_to_sheet(sheetData);

  //       sheet["!merges"] = mergeRanges.map((rowIndex) => ({
  //         s: { r: rowIndex, c: 0 },
  //         e: { r: rowIndex, c: colsCount - 1 },
  //       }));

  //       Object.keys(sheet).forEach((key) => {
  //         if (!key.match(/^[A-Z]+\d+$/)) return;
  //         const cell = sheet[key];
  //         const rowNum = parseInt(key.match(/\d+/)[0]) - 1;
  //         const colLetter = key.match(/[A-Z]+/)[0];
  //         const rowArray = sheetData[rowNum];

  //         if (mergeRanges.includes(rowNum)) {
  //           if (colLetter === "A") {
  //             cell.s = {
  //               font: { bold: true, sz: 14, color: { rgb: "FFFFFF" } },
  //               fill: { fgColor: { rgb: "4F81BD" } },
  //               alignment: { horizontal: "center", vertical: "center" },
  //             };
  //           }
  //           return;
  //         }

  //         if (rowArray?.[1] === "ITEM") {
  //           cell.s = {
  //             font: { bold: true },
  //             fill: { fgColor: { rgb: "D9E1F2" } },
  //             alignment: { horizontal: "center" },
  //             border: borderStyle,
  //           };
  //         } else if (
  //           rowArray?.[1] === "Subtotal" ||
  //           rowArray?.[1] === "Grand Total"
  //         ) {
  //           cell.s = {
  //             font: { bold: true },
  //             fill: { fgColor: { rgb: "FFE699" } },
  //             alignment: { horizontal: "center" },
  //             border: borderStyle,
  //           };
  //         } else if (rowArray?.length > 0) {
  //           cell.s = {
  //             alignment: { horizontal: "center" },
  //             border: borderStyle,
  //           };
  //         }
  //       });

  //       sheet["!cols"] = [
  //         { wch: 5 },
  //         { wch: 25 },
  //         { wch: 10 },
  //         { wch: 10 },
  //         { wch: 15 },
  //         { wch: 15 },
  //         { wch: 15 },
  //         { wch: 15 },
  //         { wch: 15 },
  //       ];

  //       XLSX.utils.book_append_sheet(wb, sheet, sectionName);
  //     };

  //     // Apply to all sections
  //     buildSectionSheet("Roughing", BomData.device_items);
  //     buildSectionSheet("Wiring", BomData.device_header);
  //     buildSectionSheet("Device Installation", BomData.material_items);
  //     buildSectionSheet("Configuration", BomData.material_header);
  //     buildSectionSheet("Testing & Commissioning", BomData.labor_items);

  //     const date = new Date().toLocaleDateString().replace(/\//g, "-");
  //     XLSX.writeFile(wb, `${BomData.bom_no}-${date}.xlsx`);
  //   };

  if (Rloading) {
    return <LoadingSpinner />;
  }

  if (rerror) {
    return <NotFound />;
  }
  return (
    <div>
      {showSuccess && (
        <div role="alert" className="alert alert-success mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Updated successfully!</span>
        </div>
      )}
      <div className="flex justify-start gap-2">
        <Link
          className="btn text-black uppercase"
          href="/erp-v2/bill_of_materials"
        >
          back to bom
        </Link>
        <button
          onClick={handleExcel}
          className="btn bg-green-600 hover:bg-green-700 text-white font-semibold uppercase"
        >
          export to excel
        </button>
      </div>
      <EditForm id={id} />
    </div>
  );
};

export default BomId;
