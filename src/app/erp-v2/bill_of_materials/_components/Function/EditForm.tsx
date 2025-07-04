import { fetchbomId } from "@/api/bill_of_materials/fetchBomId";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import ActiveNav1 from "../EditComponents/ActiveNav1";
import ActiveNav2 from "../EditComponents/ActiveNav2";
import ActiveNav3 from "../EditComponents/ActiveNav3";
import ActiveNav4 from "../EditComponents/ActiveNav4";
import { updateBomId, updatebomId } from "@/api/bill_of_materials/updateBomId";
import { BomUser, fetchbomUser } from "@/api/bill_of_materials/fetchUsers";
import {
  ClientUser,
  fetchbomClient,
} from "@/api/bill_of_materials/fetchClients";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import NotFound from "@/app/not-found";
import { removeDeviceRow1 } from "./removeDevice1";
import { cancelNewHeader } from "./CancelNewHeader";
import { removeRowFromNewHeader1 } from "./removeRowFromNewHeader";
import { addRowToNewHeader } from "./addRowHeader";
import { updateNewHeaderRow } from "./updateNewHeader";
import { updateNewHeaderTitle } from "./updateNewHeaderTitle";
import { addHeader } from "./addHeader";
import { removeDeviceRow2 } from "./removeDevice2";
import { cancelNewHeader2 } from "./cancelNewHeader2";
import { removeRowFromNewHeader2 } from "./removeRowFromNewHeader2";
import { addRowToNewHeader2 } from "./addRowToNewHeader";
import { updateNewHeaderTitle2 } from "./updateNewHeaderTitle2";
import { addHeader2 } from "./addHeader2";
import { removeDeviceRow3 } from "./removeDeviceRow3";
import { cancelNewHeader3 } from "./cancelNewHeader3";
import { removeRowFromNewHeader3 } from "./removeRowFromNewHeader3";
import { addRowToNewHeader3 } from "./addRowToNewHeader3";
import { updateNewHeaderTitle3 } from "./updateNewHeaderTitle3";
import { addHeader3 } from "./addHeader3";
import { removeSubRow4 } from "./removeSubRow4";
import { updateSubRow4 } from "./updateSubRow4";
import { addSubRow4 } from "./addSubRow4";
import { removeDeviceRow4 } from "./removeDeviceRow4";
import { updateDeviceRow4 } from "./updateDeviceRow4";

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
interface EditFormsProps {
  id: string;
}
const EditForm = ({ id }: EditFormsProps) => {
  const queryClient = useQueryClient();
  //   const pathname = usePathname();
  //   const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
  const [showSuccess, setShowSuccess] = useState(false);
  // const id = pathname?.split("/").pop();

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
  const { mutate: updateBom } = useMutation({
    mutationFn: (data: updateBomId) => updatebomId(id as string, data),
    onSuccess: () => {
      console.log("delivery updated successfully");
      queryClient.invalidateQueries({ queryKey: ["bom", id] });
    },
    onError: (error) => {
      console.error("Error updating quotation:", error);
    },
  });
  const [activeNav, setActiveNav] = useState(1);
  //   const [showEditModal, setShowEditModal] = useState(false);
  //   interface DeviceRows1 {
  //     item: string; // instead of string
  //     description: string;
  //     quantity: string; // <-- STRING, not number
  //     unit_of_measurement: string;
  //     amount: string;
  //     srp: number;
  //     total_amount: string;
  //     // subrows: DeviceRow[];
  //   }
  //   interface Item {
  //     id: number;
  //     item: string;
  //     // name: string;
  //     // maybe other properties...
  //   }
  interface DeviceRows12 {
    description: string;
    quantity: number; // <-- STRING, not number
    unit_of_measurement: string;
    amount: string;
    srp: number;
    total_amount: number;
    item: string;
  }
  //   interface Items {
  //     id: number;
  //     item: string;
  //     // name: string;
  //     // maybe other properties...
  //   }
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
  const {
    // isLoading: Uloading,
    // error: uerror,
    data: udata,
  } = useQuery<BomUser[]>({
    queryKey: ["users"],
    queryFn: fetchbomUser,
  });
  const {
    // isLoading: Clientloading,
    // error: clienterror,
    data: clientdata,
  } = useQuery<ClientUser[]>({
    queryKey: ["client"],
    queryFn: fetchbomClient,
  });

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
  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };
  //   const [headers, setHeaders] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);
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

  //   const handleSave = () => {
  //     console.log("Form Data:", formData);
  //     console.log("Device Rows:", deviceRows);
  //     console.log("Headers:", headers);
  //     setShowEditModal(false);
  //   };

  //   const removeDeviceRow = (index: number) => {
  //     const updated = [...deviceRows];
  //     updated.splice(index, 1);
  //     setDeviceRows(updated);
  //   };

  //   const addHeader = () => {
  //     setNewHeaders([
  //       ...newHeaders,
  //       {
  //         title: "",
  //         rows: [
  //           {
  //             item: "",
  //             description: "",
  //             quantity: 0,
  //             unit_of_measurement: "",
  //             srp: 0,
  //             // subrows: undefined,
  //             unitPrice: "",
  //             // total_amount: "",
  //             amount: "",
  //             total_amount: "",
  //             subrows: "",
  //           },
  //         ],
  //       },
  //     ]);
  //   };
  //   const updateDeviceRow = (
  //     rowIndex: number,
  //     key: keyof DeviceRow,
  //     value: string | number
  //   ) => {
  //     setDeviceRows((prevRows) => {
  //       const updatedRows = [...prevRows];
  //       updatedRows[rowIndex] = {
  //         ...updatedRows[rowIndex],
  //         [key]: value,
  //       };
  //       return updatedRows;
  //     });
  //   };

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
  //   const updateNewHeaderTitle = (headerIndex: number, newTitle: string) => {
  //     setNewHeaders((prevHeaders) => {
  //       const updatedHeaders = [...prevHeaders];
  //       updatedHeaders[headerIndex].title = newTitle;
  //       return updatedHeaders;
  //     });
  //   };

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
  //   interface DeviceRoww2 {
  //     unitPrice: string;
  //     item: string;
  //     description: string;
  //     quantity: number;
  //     unit_of_measurement: string;
  //     amount: string;
  //     srp: number; // <-- change from number to string
  //     // subrows: DeviceRow[];
  //     total_amount: string;
  //   }
  //   const updateNewHeaderRow = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     field: keyof DeviceRoww2,
  //     newValue: string
  //   ) => {
  //     const updatedHeaders = [...newHeaders];
  //     const row = updatedHeaders[headerIndex].rows[rowIndex];

  //     // If the field is a number type, convert string input to number
  //     if (field === "quantity" || field === "srp") {
  //       row[field] = parseFloat(newValue) as any; // Type assertion because of TS restrictions
  //     } else {
  //       // Otherwise treat it as string or any type compatible with your interface
  //       row[field] = newValue as any;
  //     }

  //     // Example recalculation of amount or total_amount, adjust as needed
  //     const quantity = row.quantity;
  //     const srp = row.srp;

  //     row.amount =
  //       !isNaN(quantity) && !isNaN(srp) ? (quantity * srp).toFixed(2) : "";

  //     // You may want to update total_amount similarly
  //     row.total_amount = row.amount;

  //     setNewHeaders(updatedHeaders);
  //   };
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

  //   const addRowToNewHeader = (headerIndex: number) => {
  //     const updated = [...newHeaders];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: 0,
  //       unit_of_measurement: "",
  //       srp: 0,
  //       // subrows: undefined,
  //       unitPrice: "",
  //       total_amount: "",
  //       amount: "",
  //       subrows: "",
  //     });
  //     setNewHeaders(updated);
  //   };

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
  //   const removeRowFromNewHeader = (headerIndex: number, rowIndex: number) => {
  //     setNewHeaders((prevHeaders) => {
  //       const updatedHeaders = [...prevHeaders];
  //       updatedHeaders[headerIndex].rows.splice(rowIndex, 1);
  //       return updatedHeaders;
  //     });
  //   };

  // const saveNewHeader = (index: number) => {
  //   const headerToSave = newHeaders[index];
  //   if (!headerToSave.title.trim()) return;
  //   setHeaders([...headers, headerToSave]);
  //   const updated = [...newHeaders];
  //   updated.splice(index, 1);
  //   setNewHeaders(updated);
  // };

  //   const cancelNewHeader = (index: number) => {
  //     const updated = [...newHeaders];
  //     updated.splice(index, 1);
  //     setNewHeaders(updated);
  //   };

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

  //   const removeHeaderRow = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...headers];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setHeaders(updated);
  //   };
  const getHeaderSubtotal = (rows: DeviceRow[]) => {
    return rows.reduce((sum, row) => {
      const amount = parseFloat(row.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };

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
  interface DeviceRows57 {
    total_amount: number;
    // unitPrice: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    amount: string;
    srp: number; // <-- change from number to string
  }
  const getNewHeaderSubtotal = (rows: DeviceRows57[]) => {
    return rows.reduce((total, row) => {
      const srp = parseFloat(row.srp as any) || 0;
      const quantity = parseFloat(row.quantity as any) || 0;
      return total + quantity * srp;
    }, 0);
  };
  interface DeviceRows123 {
    description: string;
    quantity: number; // <-- STRING, not number
    unit_of_measurement: string;
    amount: string;
    srp: number;
    total_amount: string;
    item: string;
  }
  const [deviceRows2, setDeviceRows2] = useState<DeviceRows123[]>([]);
  const [newHeaders2, setNewHeaders2] = useState<
    { title: string; rows: DeviceRows2[] }[]
  >([]);
  //   const [headers2, setHeaders2] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);
  //   const addHeader2 = () => {
  //     setNewHeaders2([
  //       ...newHeaders2,
  //       {
  //         title: "",
  //         rows: [
  //           {
  //             item: "",
  //             description: "",
  //             quantity: 0,
  //             unit_of_measurement: "",
  //             srp: 0,
  //             amount: "",
  //             total_amount: "",
  //             unitPrice: "",
  //             subrows: undefined,
  //           },
  //         ],
  //       },
  //     ]);
  //   };
  //   const updateNewHeaderTitle2 = (index: number, value: string) => {
  //     const updated = [...newHeaders2];
  //     updated[index].title = value;
  //     setNewHeaders2(updated);
  //   };

  //   const addRowToNewHeader2 = (headerIndex: number) => {
  //     const updated = [...newHeaders2];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: 0,
  //       unit_of_measurement: "",
  //       srp: 0,
  //       total_amount: "",
  //       unitPrice: "",
  //       amount: "",
  //       subrows: undefined,
  //     });
  //     setNewHeaders2(updated);
  //   };

  // const saveNewHeader2 = (index: number) => {
  //   const headerToSave = newHeaders2[index];
  //   if (!headerToSave.title.trim()) return;
  //   setHeaders2([...headers2, headerToSave]);
  //   const updated = [...newHeaders2];
  //   updated.splice(index, 1);
  //   setNewHeaders2(updated);
  // };

  //   const cancelNewHeader2 = (index: number) => {
  //     const updated = [...newHeaders2];
  //     updated.splice(index, 1);
  //     setNewHeaders2(updated);
  //   };
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
  interface DeviceRows571 {
    total_amount: string;
    // unitPrice: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    amount: string;
    srp: number; // <-- change from number to string
  }
  const getNewHeaderSubtotal2 = (rows: DeviceRows571[]) => {
    return rows.reduce((total, row) => {
      const srp = parseFloat(row.srp as any) || 0;
      const quantity = parseFloat(row.quantity as any) || 0;
      return total + quantity * srp;
    }, 0);
  };

  // const getTotalAmountIncludingNew2 = () => {
  //   const savedTotal = headers2.reduce((sum, header) => {
  //     return sum + getHeaderSubtotal(header.rows);
  //   }, 0);

  //   const newHeadersTotal = newHeaders2.reduce((sum, newHeader) => {
  //     return sum + getNewHeaderSubtotal2(newHeader.rows);
  //   }, 0);

  //   return savedTotal + newHeadersTotal;
  // };
  //   const removeDeviceRow2 = (index: number) => {
  //     const updated = [...deviceRows2];
  //     updated.splice(index, 1);
  //     setDeviceRows2(updated);
  //   };

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
  const updateNewHeaderRow2 = (
    headerIndex: number,
    rowIndex: number,
    field: keyof DeviceRow,
    newValue: string
  ) => {
    const updatedHeaders = [...newHeaders2];
    const row = updatedHeaders[headerIndex].rows[rowIndex];

    // If the field is a number type, convert string input to number
    if (field === "quantity" || field === "srp") {
      row[field] = parseFloat(newValue) as any; // Type assertion because of TS restrictions
    } else {
      // Otherwise treat it as string or any type compatible with your interface
      row[field] = newValue as any;
    }

    // Example recalculation of amount or total_amount, adjust as needed
    const quantity = row.quantity;
    const srp = row.srp;

    row.amount =
      !isNaN(quantity) && !isNaN(srp) ? (quantity * srp).toFixed(2) : "";

    // You may want to update total_amount similarly
    row.total_amount = row.amount;

    setNewHeaders2(updatedHeaders);
  };
  //   const removeRowFromNewHeader2 = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...newHeaders2];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setNewHeaders2(updated);
  //   };

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
  //   const [headers3, setHeaders3] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);

  //   const addHeader3 = () => {
  //     setNewHeaders3([
  //       ...newHeaders3,
  //       {
  //         title: "",
  //         rows: [
  //           {
  //             item: "",
  //             description: "",
  //             quantity: 0,
  //             unitPrice: "",
  //             amount: "",
  //             total_amount: "",
  //             unit_of_measurement: 0,
  //             srp: 0,
  //           },
  //         ],
  //       },
  //     ]);
  //   };
  //   const updateNewHeaderTitle3 = (index: number, value: string) => {
  //     const updated = [...newHeaders3];
  //     updated[index].title = value;
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
  const updateNewHeaderRow3 = (
    headerIndex: number,
    rowIndex: number,
    field: keyof DeviceRow,
    newValue: string
  ) => {
    const updatedHeaders = [...newHeaders3];
    const row = updatedHeaders[headerIndex].rows[rowIndex];

    // Parse number fields
    if (
      field === "quantity" ||
      field === "srp" ||
      field === "unit_of_measurement"
    ) {
      row[field] = parseFloat(newValue) as any;
    } else {
      row[field] = newValue as any;
    }

    const quantity = row.quantity;
    const srp = row.srp;

    // Compute amount and total
    row.amount =
      !isNaN(quantity) && !isNaN(srp) ? (quantity * srp).toFixed(2) : "";
    row.total_amount = row.amount;

    setNewHeaders3(updatedHeaders);
  };

  //   const addRowToNewHeader3 = (headerIndex: number) => {
  //     const updated = [...newHeaders3];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: 0,
  //       unit_of_measurement: 0,
  //       srp: 0,
  //       amount: "",
  //       total_amount: "",
  //       unitPrice: "",
  //     });
  //     setNewHeaders3(updated);
  //   };

  //   const removeRowFromNewHeader3 = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...newHeaders3];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setNewHeaders3(updated);
  //   };
  //   const saveNewHeader3 = (index: number) => {
  //     const headerToSave = newHeaders3[index];
  //     if (!headerToSave.title.trim()) return;
  //     setHeaders3([...headers3, headerToSave]);
  //     const updated = [...newHeaders3];
  //     updated.splice(index, 1);
  //     setNewHeaders3(updated);
  //   };

  //   const cancelNewHeader3 = (index: number) => {
  //     const updated = [...newHeaders3];
  //     updated.splice(index, 1);
  //     setNewHeaders3(updated);
  //   };
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
  interface DeviceRows5712 {
    total_amount: string;
    // unitPrice: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: number;
    amount: string;
    srp: number | string; // <-- change from number to string
  }
  const getNewHeaderSubtotal3 = (rows: DeviceRows5712[]) => {
    return rows.reduce((total, row) => {
      const srp = parseFloat(row.amount as any) || 0;
      const quantity = parseFloat(row.quantity as any) || 0;
      return total + quantity * srp;
    }, 0);
  };
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
  //   const getTotalAmountIncludingNew3 = () => {
  //     // Subtotal from saved headers
  //     const savedTotal = headers2.reduce((sum, header) => {
  //       return sum + getHeaderSubtotal(header.rows);
  //     }, 0);

  //     // Subtotal from new editable headers
  //     const newHeadersTotal = newHeaders3.reduce((sum, newHeader) => {
  //       return sum + getNewHeaderSubtotal3(newHeader.rows);
  //     }, 0);

  //     // Subtotal from the main device rows table
  //     const deviceRowsTotal = deviceRows3.reduce((sum, row) => {
  //       return sum + (parseFloat(row.amount) || 0);
  //     }, 0);

  //     // Grand total
  //     return savedTotal + newHeadersTotal + deviceRowsTotal;
  //   };

  //   const removeDeviceRow3 = (index: number) => {
  //     const updated = [...deviceRows3];
  //     updated.splice(index, 1);
  //     setDeviceRows3(updated);
  //   };

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

  const [newHeaders4] = useState<{ title: string; rows: DeviceRow[] }[]>([]);
  const [headers4] = useState<{ title: string; rows: DeviceRow[] }[]>([]);
  // types.ts (or similar)
  //   interface DeviceRow57 {
  //     subrows: SubRows2asd[];
  //     item: string;
  //     description: string;
  //     quantity: number;
  //     unit_of_measurement: string;
  //     srp: string | number;
  //     amount: string | number;
  //     total_amount: string;
  //   }

  //   interface SubRows2asd {
  //     item: string;
  //     description: string;
  //     quantity: number;
  //     unit_of_measurement: string;
  //     amount: string | number;
  //     srp: string;
  //   }

  //   const updateDeviceRow4 = (
  //     rowIndex: number,
  //     key: keyof DeviceRow57,
  //     value: string | number
  //   ) => {
  //     setDeviceRows4((prevRows) => {
  //       const updated = [...prevRows];
  //       updated[rowIndex] = {
  //         ...updated[rowIndex],
  //         [key]: value,
  //       };
  //       return updated;
  //     });
  //   };
  const getNewHeaderSubtotal4 = (rows: DeviceRow[]) => {
    return rows.reduce((sum, row) => {
      const amount = parseFloat(row.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };

  const getTotalAmountIncludingNew4 = () => {
    const savedTotal = headers4.reduce((sum, header) => {
      return sum + getHeaderSubtotal(header.rows);
    }, 0);

    const newHeadersTotal = newHeaders4.reduce((sum, newHeader) => {
      return sum + getNewHeaderSubtotal4(newHeader.rows);
    }, 0);

    return savedTotal + newHeadersTotal;
  };
  //   const removeDeviceRow4 = (index: number) => {
  //     const updated = [...deviceRows4];
  //     updated.splice(index, 1);
  //     setDeviceRows4(updated);
  //   };
  //   const removeDeviceRow1 = (index: number) => {
  //     const updated = [...deviceRows];
  //     updated.splice(index, 1);
  //     setDeviceRows(updated);
  //   };

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

  //   const addSubRow4 = (rowIndex: number) => {
  //     const updatedRows = [...deviceRows4];
  //     const currentRow = updatedRows[rowIndex];

  //     const newSubRow = {
  //       item: "",
  //       description: "",
  //       quantity: 0,
  //       unit_of_measurement: "",
  //       srp: "",
  //       amount: "0.00",
  //     };

  //     if (!currentRow.subrows) {
  //       currentRow.subrows = [];
  //     }

  //     currentRow.subrows.push(newSubRow);
  //     setDeviceRows4(updatedRows);
  //   };
  //   interface SubRows {
  //     item: string;
  //     description: string;
  //     quantity: number;
  //     unit_of_measurement: string;
  //     srp: string;
  //     amount: string;
  //   }

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
  //   const updateSubRow4 = (
  //     rowIndex: number,
  //     subRowIndex: number,
  //     key: keyof SubRows,
  //     value: string
  //   ) => {
  //     setDeviceRows4((prevRows) => {
  //       const updatedRows = [...prevRows];
  //       const subrow = updatedRows[rowIndex].subrows?.[subRowIndex];

  //       if (subrow) {
  //         // If updating a numeric field, cast appropriately
  //         if (key === "quantity") {
  //           subrow[key] = Number(value) as any;
  //         } else {
  //           subrow[key] = value;
  //         }

  //         const quantity = subrow.quantity;
  //         const unitPrice = parseFloat(subrow.srp || "0");
  //         subrow.amount = (quantity * unitPrice).toFixed(2);
  //       }

  //       return updatedRows;
  //     });
  //   };

  //   const removeSubRow4 = (rowIndex: number, subRowIndex: number) => {
  //     setDeviceRows4((prevRows) => {
  //       const updatedRows = [...prevRows];
  //       updatedRows[rowIndex].subrows?.splice(subRowIndex, 1);
  //       return updatedRows;
  //     });
  //   };
  //   const removeSubRow4 = (rowIndex: number, subRowIndex: number) => {
  //     setDeviceRows4((prevRows) => {
  //       const updatedRows = [...prevRows];

  //       // Clone the subrows safely
  //       const currentSubRows = updatedRows[rowIndex].subrows || [];

  //       // Filter out the subrow at the specified index
  //       const newSubRows = currentSubRows.filter((_, i) => i !== subRowIndex);

  //       // Assign the filtered subrows back
  //       updatedRows[rowIndex] = {
  //         ...updatedRows[rowIndex],
  //         subrows: newSubRows,
  //       };

  //       return updatedRows;
  //     });
  //   };
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

  if (Rloading) {
    return <LoadingSpinner />;
  }

  if (rerror) {
    return <NotFound />;
  }
  return (
    <div>
      <Formik
        initialValues={{
          input1: BomData?.bom_no || "",
          input2: BomData?.date || "",
          input3: BomData?.sic.id || "",
          input4: BomData?.client.id || "",
          input5: BomData?.status || "",
          input6: BomData?.eic.id || "",
          input7: BomData?.project_name || "",
          input8: BomData?.project_site || "",
          input9: BomData?.first_header || "",
        }}
        enableReinitialize={true} // important to update if BomData changes
        onSubmit={async (values, { setSubmitting }) => {
          const payload = {
            bom_no: values.input1,
            date: values.input2,
            sic: values.input3,
            client: values.input4,
            status: values.input5,
            eic: values.input6,
            project_name: values.input7,
            project_site: values.input8,
            first_header: values.input9,

            // 👇 device
            device_items: deviceRows.map((row, index) => ({
              item: row.item,
              description: row.description,
              quantity: Number(row.quantity),
              srp: Number(row.srp),
              unit_of_measurement: row.unit_of_measurement || "",
              total_amount: Number(row.amount),
              order: index + 1,
            })),

            // 👇 Add device header
            device_header: newHeaders.map((header) => ({
              header: header.title,
              header_sub_total: header.rows.reduce(
                (sum, row) => sum + Number(row.amount),
                0
              ),
              items: header.rows.map((row, rIndex) => ({
                item: row.item,
                description: row.description,
                quantity: Number(row.quantity),
                srp: Number(row.srp),
                unit_of_measurement: row.unit_of_measurement || "",
                total_amount: Number(row.amount),
                order: rIndex + 1,
              })),
            })),
            // material
            material_items: deviceRows2.map((row, index) => ({
              item: row.item,
              description: row.description,
              quantity: Number(row.quantity),
              srp: Number(row.srp),
              unit_of_measurement: row.unit_of_measurement || "",
              total_amount: Number(row.amount),
              order: index + 1,
            })),

            material_header: newHeaders2.map((header) => ({
              header: header.title,
              header_sub_total: header.rows.reduce((sum, row) => {
                const quantity = Number(row.quantity) || 0;
                const srp = Number(row.srp) || 0;
                return sum + quantity * srp;
              }, 0),
              items: header.rows.map((row, rIndex) => {
                const quantity = Number(row.quantity) || 0;
                const srp = Number(row.srp) || 0;
                return {
                  item: row.item,
                  description: row.description,
                  quantity,
                  srp,
                  unit_of_measurement: row.unit_of_measurement || "",
                  total_amount: quantity * srp,
                  order: rIndex + 1,
                };
              }),
            })),

            // labor
            labor_items: deviceRows3.map((row, index) => ({
              item: row.item,
              description: row.description,
              quantity: row.quantity || 0,
              srp: row.srp || 0,
              unit_of_measurement: row.unit_of_measurement || "",
              total_amount: Number(row.total_amount),
              order: index + 1,
            })),
            labor_header: newHeaders3.map((header) => ({
              header: header.title,
              header_sub_total: header.rows.reduce((sum, row) => {
                const quantity = Number(row.quantity) || 0;
                const unitPrice = Number(row.srp) || 0;
                return sum + quantity * unitPrice;
              }, 0),
              items: header.rows.map((row, rIndex) => {
                const quantity = Number(row.quantity) || 0;
                const unitPrice = Number(row.srp) || 0;
                return {
                  item: row.item,
                  description: row.description,
                  quantity,
                  srp: unitPrice,
                  unit_of_measurement: row.unit_of_measurement || "",
                  total_amount: quantity * unitPrice,
                  order: rIndex + 1,
                };
              }),
            })),

            general_header: deviceRows4.map((row, index) => ({
              // id: index + 1,
              order: index + 1,
              item: row.item,
              description: row.description,
              quantity: Number(row.quantity) || 0,
              unit_of_measurement: row.unit_of_measurement,
              srp: Number(row.srp) || 0,
              // header_sub_total:
              //   (Number(row.quantity) || 0) * (Number(row.srp) || 0),
              items:
                row.subrows?.map((sub, subIndex) => ({
                  // id: subIndex + 1,
                  order: subIndex + 1,
                  item: sub.item,
                  description: sub.description,
                  quantity: Number(sub.quantity),
                  unit_of_measurement: sub.unit_of_measurement,
                  srp: sub.srp, // or assign the actual SRP if available
                  // total_amount: (Number(sub.quantity) || 0) * 0, // update if subrow has srp
                })) || [],
            })),
          };

          // console.log(payload);
          // updateBom(payload);
          try {
            await updateBom(payload);
            console.log(payload);

            // setIsEditing(false);
            setShowSuccess(true); // Show the success alert

            setTimeout(() => {
              window.location.href = "/erp-v2/bill_of_materials/"; // 🔁 Redirect to dashboard
            }, 2000);
          } catch (error) {
            console.error("Submission failed:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            {/* <div className="grid grid-cols-2 gap-3 mb-6 text-start"> */}
            <div className="grid grid-cols-1  md:grid-cols-9 mb-1 gap-1">
              {Object.keys(values).map((key, index) => (
                <div key={index} className="flex flex-col">
                  <label className="text-sm font-bold uppercase  mb-1">
                    {(() => {
                      switch (key) {
                        case "input1":
                          return "BOM No.";
                        case "input2":
                          return "Date Created";
                        case "input3":
                          return "SIC";
                        case "input4":
                          return "Client";
                        case "input5":
                          return "Status";
                        case "input6":
                          return "EIC";
                        case "input7":
                          return "Project Name";
                        case "input8":
                          return "Project Site";
                        case "input9":
                          return "First Header";
                        default:
                          return `Input ${index + 1}`;
                      }
                    })()}
                  </label>

                  {key === "input2" ? (
                    // 📅 Date Input
                    <Field
                      type="date"
                      name={key}
                      value={values[key]}
                      onChange={handleChange}
                      className="dark:bg-gray-dark input input-bordered w-full  rounded-md border border-gray-300"
                    />
                  ) : key === "input3" ? (
                    // 👤 SIC Dropdown
                    <select
                      name={key}
                      value={values[key]}
                      onChange={handleChange}
                      className="dark:bg-gray-dark input input-bordered w-full  rounded-md border border-gray-300"
                    >
                      <option value="">Select SIC</option>
                      {udata?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.full_name}
                        </option>
                      ))}
                    </select>
                  ) : key === "input4" ? (
                    // 👥 Client Dropdown
                    <select
                      name={key}
                      value={values[key]}
                      onChange={handleChange}
                      className="dark:bg-gray-dark input input-bordered w-full  rounded-md border border-gray-300"
                    >
                      <option value="">Select Client</option>
                      {clientdata?.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.client}
                        </option>
                      ))}
                    </select>
                  ) : key === "input5" ? (
                    // 🔄 Status Dropdown
                    <select
                      name={key}
                      value={values[key]}
                      onChange={handleChange}
                      className="dark:bg-gray-dark input input-bordered w-full  rounded-md border border-gray-300"
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Revise">Revise</option>
                      <option value="Noted">Noted</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : key === "input6" ? (
                    // 🧑‍💼 EIC Dropdown
                    <select
                      name={key}
                      value={values[key]}
                      onChange={handleChange}
                      className="dark:bg-gray-dark input input-bordered w-full  rounded-md border border-gray-300"
                    >
                      <option value="">Select EIC</option>
                      {udata?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.full_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    // 📝 Default Text Input (including input9 for first_header)
                    <Field
                      type="text"
                      name={key}
                      // value={values[key]}
                      onChange={handleChange}
                      className="dark:bg-gray-dark input input-bordered w-full p-3 rounded-md border border-gray-300"
                      placeholder={
                        key === "input9"
                          ? "Enter First Header"
                          : `Input ${index + 1}`
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            {/* <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-md"
                              >
                                Save
                              </button> */}
            {/* Navigation */}
            <div className="flex justify-between gap-2 mb-2">
              {[
                "Devices",
                "Materials",
                "Labor & instrument works",
                "General requirements",
              ].map((label, index) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => setActiveNav(index + 1)}
                  className={`uppercase flex-1 py-2 rounded-md font-medium transition-all ${
                    activeNav === index + 1
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* Devices Section */}
            <div className={activeNav === 1 ? "block" : "hidden"}>
              <ActiveNav1
                id={id}
                deviceRows1={deviceRows}
                setDeviceRows1={setDeviceRows}
                newHeaders1={newHeaders}
                // addHeader1={addHeader}
                addHeader1={() => addHeader(newHeaders, setNewHeaders)}
                updateNewHeaderTitle1={(headerIndex, newTitle) =>
                  updateNewHeaderTitle(
                    headerIndex,
                    newTitle,
                    newHeaders,
                    setNewHeaders
                  )
                }
                // updateNewHeaderTitle1={updateNewHeaderTitle}
                // updateNewHeaderRow1={updateNewHeaderRow}
                // updateNewHeaderRow1={updateNewHeaderRow}
                updateNewHeaderRow1={(headerIndex, rowIndex, field, newValue) =>
                  updateNewHeaderRow(
                    headerIndex,
                    rowIndex,
                    field,
                    newValue,
                    newHeaders,
                    setNewHeaders
                  )
                }
                // addRowToNewHeader1={addRowToNewHeader}
                addRowToNewHeader1={(headerIndex) =>
                  addRowToNewHeader(headerIndex, newHeaders, setNewHeaders)
                }
                // removeRowFromNewHeader1={removeRowFromNewHeader}

                removeRowFromNewHeader1={(headerIndex, rowIndex) =>
                  removeRowFromNewHeader1(
                    headerIndex,
                    rowIndex,
                    newHeaders,
                    setNewHeaders
                  )
                }
                // cancelNewHeader1={cancelNewHeader}
                cancelNewHeader1={(index) =>
                  cancelNewHeader(index, newHeaders, setNewHeaders)
                }
                getNewHeaderSubtotal1={getNewHeaderSubtotal}
                // removeDeviceRow1={removeDeviceRow1}
                removeDeviceRow1={(index) =>
                  removeDeviceRow1(index, deviceRows, setDeviceRows)
                } // updated line
              />
            </div>
            {activeNav === 2 && (
              <ActiveNav2
                id={id}
                setDeviceRows2={setDeviceRows2}
                newHeaders2={newHeaders2}
                // addHeader2={addHeader2}
                addHeader2={() => addHeader2(newHeaders2, setNewHeaders2)}
                // updateNewHeaderTitle2={updateNewHeaderTitle2}
                updateNewHeaderTitle2={(headerIndex, newTitle) =>
                  updateNewHeaderTitle2(
                    headerIndex,
                    newTitle,
                    newHeaders2,
                    setNewHeaders2
                  )
                }
                updateNewHeaderRow2={updateNewHeaderRow2}
                // addRowToNewHeader2={addRowToNewHeader2}
                addRowToNewHeader2={(headerIndex) =>
                  addRowToNewHeader2(headerIndex, newHeaders2, setNewHeaders2)
                }
                // removeRowFromNewHeader2={removeRowFromNewHeader2}
                removeRowFromNewHeader2={(headerIndex, rowIndex) =>
                  removeRowFromNewHeader2(
                    headerIndex,
                    rowIndex,
                    newHeaders2,
                    setNewHeaders2
                  )
                }
                // cancelNewHeader2={cancelNewHeader2}
                getNewHeaderSubtotal2={getNewHeaderSubtotal2}
                // removeDeviceRow2={removeDeviceRow2}
                cancelNewHeader2={(index) =>
                  cancelNewHeader2(index, newHeaders2, setNewHeaders2)
                }
                removeDeviceRow2={(index) =>
                  removeDeviceRow2(index, deviceRows2, setDeviceRows2)
                }
              />
            )}
            <div className={activeNav === 3 ? "block" : "hidden"}>
              <ActiveNav3
                id={id}
                deviceRows3={deviceRows3}
                setDeviceRows3={setDeviceRows3}
                newHeaders3={newHeaders3}
                // addHeader3={addHeader3}
                addHeader3={() => addHeader3(newHeaders3, setNewHeaders3)}
                // updateNewHeaderTitle3={updateNewHeaderTitle3}
                updateNewHeaderTitle3={(headerIndex, newTitle) =>
                  updateNewHeaderTitle3(
                    headerIndex,
                    newTitle,
                    newHeaders3,
                    setNewHeaders3
                  )
                }
                updateNewHeaderRow3={updateNewHeaderRow3}
                // addRowToNewHeader3={addRowToNewHeader3}
                addRowToNewHeader3={(headerIndex) =>
                  addRowToNewHeader3(headerIndex, newHeaders3, setNewHeaders3)
                }
                // removeRowFromNewHeader3={removeRowFromNewHeader3}
                removeRowFromNewHeader3={(headerIndex, rowIndex) =>
                  removeRowFromNewHeader3(
                    headerIndex,
                    rowIndex,
                    newHeaders3,
                    setNewHeaders3
                  )
                }
                // cancelNewHeader3={cancelNewHeader3}
                cancelNewHeader3={(index) =>
                  cancelNewHeader3(index, newHeaders3, setNewHeaders3)
                }
                getNewHeaderSubtotal3={getNewHeaderSubtotal3}
                // removeDeviceRow3={removeDeviceRow3}
                removeDeviceRow3={(index) =>
                  removeDeviceRow3(index, deviceRows3, setDeviceRows3)
                }
              />
            </div>
            <div className={activeNav === 4 ? "block" : "hidden"}>
              <ActiveNav4
                id={id}
                deviceRows4={deviceRows4}
                setDeviceRows4={setDeviceRows4}
                // updateDeviceRow4={updateDeviceRow4}
                updateDeviceRow4={(rowIndex, key, value) =>
                  updateDeviceRow4(
                    rowIndex,
                    key,
                    value,
                    deviceRows4,
                    setDeviceRows4
                  )
                }
                getTotalAmountIncludingNew4={getTotalAmountIncludingNew4}
                // removeDeviceRow4={removeDeviceRow4}
                removeDeviceRow4={(index) =>
                  removeDeviceRow4(index, deviceRows4, setDeviceRows4)
                }
                // addSubRow4={addSubRow4}
                addSubRow4={(rowIndex) =>
                  addSubRow4(rowIndex, deviceRows4, setDeviceRows4)
                }
                // updateSubRow4={updateSubRow4}
                updateSubRow4={(rowIndex, subRowIndex, key, value) =>
                  updateSubRow4(
                    rowIndex,
                    subRowIndex,
                    key,
                    value,
                    deviceRows4,
                    setDeviceRows4
                  )
                }
                // removeSubRow4={removeSubRow4}
                removeSubRow4={(rowIndex, subRowIndex) =>
                  removeSubRow4(
                    rowIndex,
                    subRowIndex,
                    deviceRows4,
                    setDeviceRows4
                  )
                }
              />
            </div>
            {/* Render Saved Headers */}
            <div className="mt-6 space-y-4">
              {headers4.map((header, hIdx) => (
                <div
                  key={hIdx}
                  className="border p-4 bg-gray-50 rounded space-y-2"
                >
                  <h3 className="text-xl font-semibold">{header.title}</h3>
                  <table className="table-auto w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Unit Price</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {header.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {[
                            "item",
                            "description",
                            "quantity",
                            "unitPrice",
                            "amount",
                          ].map((field) => (
                            <td key={field} className="px-4 py-2">
                              <input
                                type="text"
                                value={row[field as keyof DeviceRow]}
                                // onChange={(e) =>
                                //   updateHeaderRow4(
                                //     hIdx,
                                //     rIdx,
                                //     field as keyof DeviceRow,
                                //     e.target.value
                                //   )
                                // }
                                className="p-2 border rounded"
                              />
                            </td>
                          ))}
                          <td className="px-4 py-2">
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              // onClick={() => removeHeaderRow4(hIdx, rIdx)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Subtotal Display */}
                  <div className="text-right text-sm font-semibold text-gray-700 mt-2">
                    {/* Subtotal: ₱{getHeaderSubtotal4(header.rows).toFixed(2)} */}
                  </div>

                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded mt-2"
                    // onClick={() => addRowToHeader4(hIdx)}
                  >
                    Add Row
                  </button>
                </div>
              ))}
            </div>
            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              {/* <button
                      className="py-2 px-6 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button> */}
              <Link
                className="btn text-black uppercase"
                href="/erp-v2/bill_of_materials"
              >
                back
              </Link>
              <button
                className="btn text-black uppercase"
                //   onClick={handleSave}
                type="submit"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditForm;
