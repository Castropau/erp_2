import { Formik, Form, Field } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import ActiveNav3 from "../AddComponents/ActiveNav3";

import TableSection from "../Table/TableSection";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddBoms, registerBom } from "@/api/bill_of_materials/addBom";
import {
  ClientUser,
  fetchbomClient,
} from "@/api/bill_of_materials/fetchClients";
import { EicUser, fetchEicUser } from "@/api/bill_of_materials/fetchEic";
import { SicUser, fetchSicUser } from "@/api/bill_of_materials/fetchSic";
import ActiveNav1 from "../AddComponents/ActiveNav1";
import ActiveNav2 from "../AddComponents/ActiveNav2";
import ActiveNav4 from "../AddComponents/ActiveNav4";
import { cancelNewHeader } from "../AddFunction/cancelNewHeader";
import { removeRowFromNewHeader } from "../AddFunction/removeRowFromNewHeader";
// import { addRowToNewHeader } from "./addRowHeader";
// import { updateNewHeaderRow } from "../AddFunction/updateNewHeader";
import { updateNewHeaderTitle } from "../AddFunction/updateNewHeaderTitle";
import { updateNewHeaderRow } from "../AddFunction/updateNewHeaderRow";
import { addHeader } from "../AddFunction/addHeader";
import { addRowToNewHeader } from "../AddFunction/addRowToNewHeader";
import { cancelNewHeader2 } from "../AddFunction/cancelNewHeader2";
import { removeRowFromNewHeader2 } from "../AddFunction/removeRowFromNewHeader2";
import { addRowToNewHeader2 } from "../AddFunction/addRowToNewHeader2";
import { updateNewHeaderRow2 } from "../AddFunction/updateNewHeaderRow2";
import { updateNewHeaderTitle2 } from "../AddFunction/updateNewHeaderTitle2";
import { addHeader2 } from "../AddFunction/addHeader2";
import { cancelNewHeader3 } from "../AddFunction/cancelNewHeader3";
import { removeRowFromNewHeader3 } from "../AddFunction/removeRowFromNewHeader3";
import { addRowToNewHeader3 } from "../AddFunction/addRowToNewHeader3";
import { updateNewHeaderRow3 } from "../AddFunction/updateNewHeaderRow3";
import { updateNewHeaderTitle3 } from "../AddFunction/updateNewHeaderTitle3";
import { addHeader3 } from "../AddFunction/addHeader3";
import { cancelNewHeader4 } from "../AddFunction/cancelNewHeader4";
import { removeRowFromNewHeader4 } from "../AddFunction/removeRowFromNewHeader4";
import { addRowToNewHeader4 } from "../AddFunction/addRowToNewHeader4";
import { updateNewHeaderRow4 } from "../AddFunction/updateNewHeaderRow4";
import { updateNewHeaderTitle4 } from "../AddFunction/updateNewHeaderTitle4";
import { addHeader4 } from "../AddFunction/addHeader4";

const AddForm = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [deviceRows, setDeviceRows] = useState<DeviceRowss[]>([]);
  interface DeviceRowss {
    subrows: any;
    amount: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    //   amount: string;
    srp: number;
    total_amount: string;
  }
  interface DeviceRow0 {
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    amount: string;
    srp: number;
    subrows: any;
    total_amount: string;
    // unitPrice: string;
  }
  const [deviceRows2, setDeviceRows2] = useState<DeviceRowss[]>([]);
  const [deviceRows4, setDeviceRows4] = useState<DeviceRowss2[]>([]);

  const [newHeaders2, setNewHeaders2] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);
  const [newHeaders, setNewHeaders] = useState<Header5[]>([]);

  const [deviceRows3, setDeviceRows3] = useState<DeviceRowss2[]>([]);
  const [newHeaders3, setNewHeaders3] = useState<
    { title: string; rows: DeviceRow7[] }[]
  >([]);
  const [newHeaders4, setNewHeaders4] = useState<
    { title: string; rows: DeviceRow0[] }[]
  >([]);
  const [headers4, setHeaders4] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);
  //   const [isEditing, setIsEditing] = useState(false); // New state to track edit mode

  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);
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
  //             amount: "",
  //             subrows: undefined,
  //             total_amount: "",
  //             unitPrice: "",
  //           },
  //         ],
  //       },
  //     ]);
  //   };
  //   const updateNewHeaderTitle = (headerIndex: number, newTitle: string) => {
  //     setNewHeaders((prevHeaders) => {
  //       const updatedHeaders = [...prevHeaders];
  //       updatedHeaders[headerIndex].title = newTitle;
  //       return updatedHeaders;
  //     });
  //   };
  //   const updateNewHeaderRow = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     field: keyof DeviceRow,
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
  //   const updateNewHeaderRow3 = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     key: keyof DeviceRow9,
  //     value: string
  //   ) => {
  //     const updated = [...newHeaders3];
  //     const row = updated[headerIndex].rows[rowIndex];

  //     // Type coercion based on key
  //     if (key === "quantity" || key === "srp") {
  //       (row[key] as number) = parseFloat(value);
  //     } else {
  //       (row[key] as string) = value;
  //     }

  //     const quantity = row.quantity;
  //     const unitPrice = parseFloat(row.unit_of_measurement); // still assuming unit_of_measurement is a price string?

  //     row.amount =
  //       !isNaN(quantity) && !isNaN(unitPrice)
  //         ? (quantity * unitPrice).toFixed(2)
  //         : "";

  //     setNewHeaders3(updated);
  //   };
  //   const addRowToNewHeader3 = (headerIndex: number) => {
  //     const updated = [...newHeaders3];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: 0,
  //       unit_of_measurement: "",
  //       amount: "",
  //       srp: 0,
  //       total_amount: "",
  //       subrows: undefined,
  //       unitPrice: "",
  //     });
  //     setNewHeaders3(updated);
  //   };

  //   const removeRowFromNewHeader3 = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...newHeaders3];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setNewHeaders3(updated);
  //   };
  // const saveNewHeader3 = (index: number) => {
  //   const headerToSave = newHeaders3[index];
  //   if (!headerToSave.title.trim()) return;
  //   setHeaders3([...headers3, headerToSave]);
  //   const updated = [...newHeaders3];
  //   updated.splice(index, 1);
  //   setNewHeaders3(updated);
  // };

  //   const cancelNewHeader3 = (index: number) => {
  //     const updated = [...newHeaders3];
  //     updated.splice(index, 1);
  //     setNewHeaders3(updated);
  //   };
  //   const addRowToNewHeader = (headerIndex: number) => {
  //     const updated = [...newHeaders];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: 0,
  //       unit_of_measurement: "",
  //       srp: 0,
  //       amount: "",
  //       subrows: undefined,
  //       total_amount: "",
  //     });
  //     setNewHeaders(updated);
  //   };
  //   const removeRowFromNewHeader = (headerIndex: number, rowIndex: number) => {
  //     setNewHeaders((prevHeaders) => {
  //       const updatedHeaders = [...prevHeaders];
  //       updatedHeaders[headerIndex].rows.splice(rowIndex, 1);
  //       return updatedHeaders;
  //     });
  //   };
  //   const cancelNewHeader = (index: number) => {
  //     const updated = [...newHeaders];
  //     updated.splice(index, 1);
  //     setNewHeaders(updated);
  //   };
  const getNewHeaderSubtotal = (rows: DeviceRow[]) => {
    return rows.reduce((total, row) => {
      const quantity = row.quantity || 0;
      const unit_of_measurement = parseFloat(row.unit_of_measurement) || 0;
      return total + quantity * unit_of_measurement;
    }, 0);
  };

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
  //             amount: "",
  //             srp: 0,
  //             subrows: undefined,
  //             total_amount: "",
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
  //   interface UpdateNewHeader2 {
  //     item: string;
  //     description: string;
  //     quantity: number;
  //     unit_of_measurement: string;
  //     srp: number;
  //     amount?: string; // Add this since you're calculating it
  //   }

  //   const updateNewHeaderRow2 = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     key: keyof DeviceRow,
  //     value: string
  //   ) => {
  //     const updated = [...newHeaders2];
  //     const row = updated[headerIndex].rows[rowIndex];

  //     // Type coercion based on key
  //     if (key === "quantity" || key === "srp") {
  //       (row[key] as number) = parseFloat(value);
  //     } else {
  //       (row[key] as string) = value;
  //     }

  //     const quantity = row.quantity;
  //     const unitPrice = parseFloat(row.unit_of_measurement); // still assuming unit_of_measurement is a price string?

  //     row.amount =
  //       !isNaN(quantity) && !isNaN(unitPrice)
  //         ? (quantity * unitPrice).toFixed(2)
  //         : "";

  //     setNewHeaders2(updated);
  //   };
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
  //             unit_of_measurement: "",
  //             amount: "",
  //             srp: 0,
  //             subrows: undefined,
  //             total_amount: "",
  //             unitPrice: "",
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
  //   const addRowToNewHeader2 = (headerIndex: number) => {
  //     const updated = [...newHeaders2];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: 0,
  //       unit_of_measurement: "",
  //       amount: "",
  //       srp: 0,
  //       subrows: undefined,
  //       total_amount: "",
  //     });
  //     setNewHeaders2(updated);
  //   };

  //   const removeRowFromNewHeader2 = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...newHeaders2];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setNewHeaders2(updated);
  //   };
  //   const cancelNewHeader2 = (index: number) => {
  //     const updated = [...newHeaders2];
  //     updated.splice(index, 1);
  //     setNewHeaders2(updated);
  //   };
  //   const addHeader4 = () => {
  //     setNewHeaders4([
  //       ...newHeaders4,
  //       {
  //         title: "",
  //         rows: [
  //           {
  //             item: "",
  //             description: "",
  //             quantity: 0,
  //             unit_of_measurement: "",
  //             amount: "",
  //             srp: 0,
  //             subrows: undefined,
  //             total_amount: "",
  //             unitPrice: "",
  //           },
  //         ],
  //       },
  //     ]);
  //   };
  //   const updateNewHeaderTitle4 = (index: number, value: string) => {
  //     const updated = [...newHeaders4];
  //     updated[index].title = value;
  //     setNewHeaders4(updated);
  //   };
  //   const updateNewHeaderRow4 = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     key: keyof UpdateNewHeader4,
  //     value: string
  //   ) => {
  //     const updated = [...newHeaders4];
  //     const row = updated[headerIndex].rows[rowIndex];

  //     // Type coercion based on key
  //     if (key === "quantity" || key === "srp") {
  //       (row[key] as number) = parseFloat(value);
  //     } else {
  //       (row[key] as string) = value;
  //     }

  //     const quantity = row.quantity;
  //     const unitPrice = parseFloat(row.unit_of_measurement); // still assuming unit_of_measurement is a price string?

  //     row.amount =
  //       !isNaN(quantity) && !isNaN(unitPrice)
  //         ? (quantity * unitPrice).toFixed(2)
  //         : "";

  //     setNewHeaders4(updated);
  //   };
  //   const addRowToNewHeader4 = (headerIndex: number) => {
  //     const updated = [...newHeaders4];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: 0,
  //       unit_of_measurement: "",
  //       amount: "",
  //       srp: 0,
  //       subrows: undefined,
  //       total_amount: "",
  //       unitPrice: "",
  //     });
  //     setNewHeaders4(updated);
  //   };

  //   const removeRowFromNewHeader4 = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...newHeaders4];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setNewHeaders4(updated);
  //   };
  //   const cancelNewHeader4 = (index: number) => {
  //     const updated = [...newHeaders4];
  //     updated.splice(index, 1);
  //     setNewHeaders4(updated);
  //   };
  const getNewHeaderSubtotal4 = (rows: DeviceRow[]) => {
    return rows.reduce((sum, row) => {
      const amount = parseFloat(row.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };
  const [headers, setHeaders] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);
  const removeHeaderRow = (headerIndex: number, rowIndex: number) => {
    const updated = [...headers];
    updated[headerIndex].rows.splice(rowIndex, 1);
    setHeaders(updated);
  };
  const getHeaderSubtotal = (rows: DeviceRow[]) => {
    return rows.reduce((sum, row) => {
      const amount = parseFloat(row.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };
  //   interface UpdateNewHeader4 {
  //     subrows: any;
  //     amount: string;
  //     item: string;
  //     description: string;
  //     quantity: number;
  //     unit_of_measurement: string;
  //     srp: number;
  //     total_amount: string;
  //     unitPrice: number; // if this is actually needed
  //   }
  //   interface DeviceRow9 {
  //     subrows: any;
  //     amount: string;
  //     item: string;
  //     description: string;
  //     quantity: number;
  //     unit_of_measurement: string;
  //     srp: number;
  //     total_amount: string;
  //     unitPrice: number; // if this is actually needed
  //   }

  interface DeviceRow7 {
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    amount: string;
    srp: number;
    subrows: any;
    total_amount: string;
    unitPrice: string;
  }
  interface DeviceRowss2 {
    subrows: any;
    amount: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    //   amount: string;
    srp: number;
    total_amount: string;
    // unitPrice: string;
  }

  interface DeviceRow {
    subrows: any;
    amount: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    //   amount: string;
    srp: number;
    total_amount: string;
  }
  interface DeviceRow5 {
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    srp: number;
    total_amount: string;
    amount: string;
    subrows: any;
    unitPrice: string;
  }

  interface Header5 {
    title: string;
    rows: DeviceRow5[];
  }

  interface DeviceRowss {
    subrows: any;
    amount: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    //   amount: string;
    srp: number;
    total_amount: string;
  }
  const {
    // isLoading: Uloading,
    // error: uerror,
    data: udata,
  } = useQuery<SicUser[]>({
    queryKey: ["users_sic"],
    queryFn: fetchSicUser,
  });

  const {
    // isLoading: Eicloading,
    // error: Eicerror,
    data: eicData,
  } = useQuery<EicUser[]>({
    queryKey: ["users_eic"],
    queryFn: fetchEicUser,
  });
  const {
    // isLoading: Clientloading,
    // error: clienterror,
    data: clientdata,
  } = useQuery<ClientUser[]>({
    queryKey: ["client"],
    queryFn: fetchbomClient,
  });
  const {
    mutate: registerbom,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (bomData: AddBoms) => registerBom(bomData),
    onSuccess: () => {
      console.log("bom registered successfully");
      queryClient.invalidateQueries({ queryKey: ["bom"] });
      //   setShowEditModal(false);
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
    },
  });
  return (
    <div>
      {showSuccess && (
        <div role="alert" className="alert alert-success">
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
          <span>submitted successfully!</span>
        </div>
      )}
      <Formik
        initialValues={{
          input1: "",
          input2: "",
          input3: "",
          input4: "",
          input5: "",
          input6: "",
          input7: "",
          input8: "",
          input9: "",
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
              // item: row.item,
              // description: row.description,
              // quantity: Number(row.quantity),
              // srp: Number(row.srp),
              // unit_of_measurement: row.unit_of_measurement || "",
              // total_amount: Number(row.amount),
              // order: index + 1,
              // id: row.id ?? index + 1, // or however you get the ID
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
            // labor_header: newHeaders3.map((header, hIndex) => ({
            //   header: header.title,
            //   header_sub_total: header.rows.reduce((sum, row) => {
            //     const quantity = Number(row.quantity) || 0;
            //     const unitPrice = Number(row.srp) || 0;
            //     return sum + quantity * unitPrice;
            //   }, 0),
            //   items: header.rows.map((row, rIndex) => {
            //     const quantity = Number(row.quantity) || 0;
            //     const unitPrice = Number(row.srp) || 0;
            //     return {
            //       item: row.item,
            //       description: row.description,
            //       quantity,
            //       srp: unitPrice,
            //       unit_of_measurement: row.unit_of_measurement || "",
            //       total_amount: quantity * unitPrice,
            //       order: rIndex + 1,
            //     };
            //   }),
            // })),
            labor_header: newHeaders3.map((header) => ({
              header: header.title,
              header_sub_total: header.rows.reduce((sum, row) => {
                const quantity = Number(row.quantity) || 0;
                const unitPrice = Number(row.srp) || 0;
                return sum + quantity * unitPrice;
              }, 0),
              items: header.rows
                .filter((row) => row.description?.trim()) // <--- this ensures no blank descriptions
                .map((row, rIndex) => {
                  const quantity = Number(row.quantity) || 0;
                  const unitPrice = Number(row.srp) || 0;
                  return {
                    item: row.item || `Item ${rIndex + 1}`, // fallback to avoid blanks
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
              header_sub_total:
                (Number(row.quantity) || 0) * (Number(row.srp) || 0),
              items:
                row.subrows?.map(
                  (
                    sub: {
                      item: string;
                      description: string;
                      quantity: number;
                      unit_of_measurement: string;
                    },
                    subIndex: number
                  ) => ({
                    // id: subIndex + 1,
                    order: subIndex + 1,
                    item: sub.item,
                    description: sub.description,
                    quantity: Number(sub.quantity),
                    unit_of_measurement: sub.unit_of_measurement,
                    srp: 0, // or assign the actual SRP if available
                    total_amount: (Number(sub.quantity) || 0) * 0, // update if subrow has srp
                  })
                ) || [],
              // id: 0,
            })),
          };

          // console.log(payload);
          // registerbom(payload);
          try {
            await registerbom(payload);
            console.log(payload);

            // setIsEditing(false);
            setShowSuccess(true); // Show the success alert

            // setTimeout(() => {
            //   window.location.href = "/erp-v2/bill_of_materials/"; // 🔁 Redirect to dashboard
            // }, 2000);
          } catch (error) {
            console.error("Submission failed:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            {/* <div className="grid grid-cols-2 gap-3 mb-1 uppercase"> */}
            <div className="grid grid-cols-1  md:grid-cols-9 mb-1 gap-1">
              {Object.keys(values).map((key, index) => {
                const labelText = (() => {
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
                      return "Header";
                    default:
                      return `Input ${index + 1}`;
                  }
                })();

                return (
                  <div key={key} className="flex flex-col">
                    <label className="text-sm font-bold mb-1 dark:text-white">
                      {labelText}
                    </label>

                    {key === "input2" ? (
                      <Field
                        type="date"
                        name={key}
                        value={values[key]}
                        onChange={handleChange}
                        className="input input-bordered w-full p-3 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white"
                      />
                    ) : ["input3", "input4", "input5", "input6"].includes(
                        key
                      ) ? (
                      <select
                        name={key}
                        // value={values[key]}
                        onChange={handleChange}
                        className="input input-bordered w-full rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white"
                      >
                        <option value="">
                          {key === "input3"
                            ? "Select SIC"
                            : key === "input4"
                            ? "Select Client"
                            : key === "input5"
                            ? "Select Status"
                            : "Select EIC"}
                        </option>

                        {key === "input3"
                          ? udata?.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.full_name}
                              </option>
                            ))
                          : key === "input6"
                          ? eicData?.map((eic) => (
                              <option key={eic.id} value={eic.id}>
                                {eic.full_name}
                              </option>
                            ))
                          : key === "input4"
                          ? clientdata?.map((client) => (
                              <option key={client.id} value={client.id}>
                                {client.client}
                              </option>
                            ))
                          : [
                              "Pending",
                              "Approved",
                              "Revise",
                              "Noted",
                              "Cancelled",
                            ].map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                      </select>
                    ) : (
                      <Field
                        type="text"
                        name={key}
                        // value={values[key]}
                        onChange={handleChange}
                        className="input input-bordered w-full rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white"
                        placeholder={`Enter ${labelText}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {/* <button
                          type="submit"
                          className="bg-blue-600 text-white px-6 py-2 rounded-md"
                        >
                          Save
                        </button> */}
            {/* Navigation */}
            <div className="flex justify-between gap-2 mb-2">
              {["Devices", "Materials", "Labor", "General"].map(
                (label, index) => (
                  <button
                    type="button"
                    key={label}
                    onClick={() => setActiveNav(index + 1)}
                    className={`flex-1 py-2 rounded-md font-medium transition-all ${
                      activeNav === index + 1
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
            {/* Devices Section */}
            {activeNav === 1 && (
              <ActiveNav1
                deviceRows={deviceRows}
                setDeviceRows={setDeviceRows}
                newHeaders={newHeaders}
                // addHeader={addHeader}
                addHeader={() => addHeader(newHeaders, setNewHeaders)}
                updateNewHeaderTitle={(headerIndex, newTitle) =>
                  updateNewHeaderTitle(
                    headerIndex,
                    newTitle,
                    newHeaders,
                    setNewHeaders
                  )
                }
                // updateNewHeaderTitle={updateNewHeaderTitle}
                // updateNewHeaderRow={updateNewHeaderRow}
                updateNewHeaderRow={(headerIndex, rowIndex, field, newValue) =>
                  updateNewHeaderRow(
                    headerIndex,
                    rowIndex,
                    field,
                    newValue,
                    newHeaders,
                    setNewHeaders
                  )
                }
                // addRowToNewHeader={addRowToNewHeader}
                addRowToNewHeader={(headerIndex) =>
                  addRowToNewHeader(headerIndex, newHeaders, setNewHeaders)
                }
                // removeRowFromNewHeader={removeRowFromNewHeader}
                removeRowFromNewHeader={(headerIndex, rowIndex) =>
                  removeRowFromNewHeader(
                    headerIndex,
                    rowIndex,
                    newHeaders,
                    setNewHeaders
                  )
                }
                // cancelNewHeader={cancelNewHeader}
                cancelNewHeader={(index) =>
                  cancelNewHeader(index, newHeaders, setNewHeaders)
                }
                getNewHeaderSubtotal={getNewHeaderSubtotal}
              />
            )}
            {activeNav === 2 && (
              <ActiveNav2
                deviceRows2={deviceRows2}
                setDeviceRows2={setDeviceRows2}
                newHeaders2={newHeaders2}
                addHeader2={() => addHeader2(newHeaders2, setNewHeaders2)}
                // addHeader2={addHeader2}
                updateNewHeaderTitle2={(headerIndex, newTitle) =>
                  updateNewHeaderTitle2(
                    headerIndex,
                    newTitle,
                    newHeaders2,
                    setNewHeaders2
                  )
                }
                // updateNewHeaderTitle2={updateNewHeaderTitle2}
                updateNewHeaderRow2={(headerIndex, rowIndex, field, newValue) =>
                  updateNewHeaderRow2(
                    headerIndex,
                    rowIndex,
                    field,
                    newValue,
                    newHeaders2,
                    setNewHeaders2
                  )
                }
                // updateNewHeaderRow2={updateNewHeaderRow2}
                addRowToNewHeader2={(headerIndex) =>
                  addRowToNewHeader2(headerIndex, newHeaders2, setNewHeaders2)
                }
                // addRowToNewHeader2={addRowToNewHeader2}
                removeRowFromNewHeader2={(headerIndex, rowIndex) =>
                  removeRowFromNewHeader2(
                    headerIndex,
                    rowIndex,
                    newHeaders2,
                    setNewHeaders2
                  )
                }
                // removeRowFromNewHeader2={removeRowFromNewHeader2}
                // cancelNewHeader2={cancelNewHeader2}
                cancelNewHeader2={(index) =>
                  cancelNewHeader2(index, newHeaders2, setNewHeaders2)
                }
                getNewHeaderSubtotal={getNewHeaderSubtotal}
              />
            )}
            {activeNav === 3 && (
              <ActiveNav3
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
                // updateNewHeaderRow3={updateNewHeaderRow3}
                updateNewHeaderRow3={(headerIndex, rowIndex, field, newValue) =>
                  updateNewHeaderRow3(
                    headerIndex,
                    rowIndex,
                    field,
                    newValue,
                    newHeaders3,
                    setNewHeaders3
                  )
                }
                addRowToNewHeader3={(headerIndex) =>
                  addRowToNewHeader3(headerIndex, newHeaders3, setNewHeaders3)
                }
                // addRowToNewHeader3={addRowToNewHeader3}
                removeRowFromNewHeader3={(headerIndex, rowIndex) =>
                  removeRowFromNewHeader3(
                    headerIndex,
                    rowIndex,
                    newHeaders3,
                    setNewHeaders3
                  )
                }
                // removeRowFromNewHeader3={removeRowFromNewHeader3}
                cancelNewHeader3={(index) =>
                  cancelNewHeader3(index, newHeaders3, setNewHeaders3)
                }
                // cancelNewHeader3={cancelNewHeader3}
                getNewHeaderSubtotal={getNewHeaderSubtotal}
              />
            )}
            {/* Unit Price{" "} */}
            {activeNav === 4 && (
              <ActiveNav4
                deviceRows4={deviceRows4}
                setDeviceRows4={setDeviceRows4}
                newHeaders4={newHeaders4}
                // addHeader4={addHeader4}
                addHeader4={() => addHeader4(newHeaders4, setNewHeaders4)}
                // updateNewHeaderTitle4={updateNewHeaderTitle4}
                updateNewHeaderTitle4={(headerIndex, newTitle) =>
                  updateNewHeaderTitle4(
                    headerIndex,
                    newTitle,
                    newHeaders4,
                    setNewHeaders4
                  )
                }
                // updateNewHeaderRow4={updateNewHeaderRow4}
                updateNewHeaderRow4={(headerIndex, rowIndex, field, newValue) =>
                  updateNewHeaderRow4(
                    headerIndex,
                    rowIndex,
                    field,
                    newValue,
                    newHeaders4,
                    setNewHeaders4
                  )
                }
                // addRowToNewHeader4={addRowToNewHeader4}
                addRowToNewHeader4={(headerIndex) =>
                  addRowToNewHeader4(headerIndex, newHeaders4, setNewHeaders4)
                }
                // removeRowFromNewHeader4={removeRowFromNewHeader4}
                removeRowFromNewHeader4={(headerIndex, rowIndex) =>
                  removeRowFromNewHeader4(
                    headerIndex,
                    rowIndex,
                    newHeaders,
                    setNewHeaders
                  )
                }
                // cancelNewHeader4={cancelNewHeader4}
                cancelNewHeader4={(index) =>
                  cancelNewHeader4(index, newHeaders4, setNewHeaders4)
                }
                getNewHeaderSubtotal4={getNewHeaderSubtotal4}
              />
            )}
            {/* Render Saved Headers */}
            {/* <div className="mt-6 space-y-4">
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
                               
                                className="p-2 border rounded"
                              />
                            </td>
                          ))}
                          <td className="px-4 py-2">
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="text-right text-sm font-semibold text-gray-700 mt-2">
                  </div>

                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded mt-2"
                  >
                    Add Row
                  </button>
                </div>
              ))}
            </div> */}
            <div className="mt-6 space-y-4">
              {headers4.map((header, hIdx) => (
                // <TableSection
                //   key={hIdx}
                //   title={header.title}
                //   rows={header.rows}
                //   onChange={(rIdx, field, value) =>
                //     updateNewHeaderRow4(hIdx, rIdx, field, value)
                //   }
                //   onRemoveRow={(rIdx) => removeHeaderRow(hIdx, rIdx)}
                //   onAddRow={() => addRowToNewHeader4(hIdx)}
                //   getSubtotal={() => getHeaderSubtotal(header.rows)}
                // />
                <TableSection
                  key={hIdx}
                  title={header.title}
                  rows={header.rows}
                  onChange={(rIdx, field, value) =>
                    updateNewHeaderRow4(
                      hIdx,
                      rIdx,
                      field,
                      value,
                      headers4,
                      setHeaders4
                    )
                  }
                  onRemoveRow={(rIdx) => removeHeaderRow(hIdx, rIdx)}
                  //   onAddRow={() => addRowToNewHeader4(hIdx)}
                  onAddRow={() =>
                    addRowToNewHeader4(hIdx, headers4, setHeaders4)
                  } // ✅ FIXED
                  getSubtotal={() => getHeaderSubtotal(header.rows)}
                />
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
                href="/erp-v2/bill_of_materials/"
              >
                cancel
              </Link>
              <button
                className="btn text-black uppercase"
                //   onClick={handleSave}
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddForm;
