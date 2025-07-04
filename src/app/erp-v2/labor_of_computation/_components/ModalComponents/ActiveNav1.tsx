// import { BomUser, fetchbomUser } from "@/api/bill_of_materials/fetchUsers";
// import { Bom, fetchBomList } from "@/api/bom-quotation/fetchBom";
import { fetchlaborId } from "@/api/labor_of_computation/FetchLaborId";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
interface MappedRowItem {
  item: string;
  ratio: string;
  unit: string;
  quantity: string;
  manpower: string;
  no_of_days: string;
  labor_cost: string;
  per_unit_cost: string;
}

interface MappedSubHeader {
  title: string;
  rows: MappedRowItem[];
}

// interface MappedHeader {
//   header: string;
//   rows: MappedSubHeader[];
// }
interface DeviceRow {
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  amount: string;
  total_amount: string;
  rows: MappedSubHeader[];
  srp: number;
}
interface BomIds {
  id: number | string;
}
const ActiveNav1 = (props: BomIds) => {
  const [activeNav] = useState(1);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [deviceRows, setDeviceRows] = useState<DeviceRow[]>([]);
  const { id } = props;
  const {
    data: LaborData,
    // isLoading: Rloading,
    // isError: ReceiptError,
    // error: rerror,
  } = useQuery({
    queryKey: ["labor", id],
    queryFn: () => fetchlaborId(id),
    enabled: !!id,
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
  // } = useQuery<Bom[]>({
  //   queryKey: ["bom"],
  //   queryFn: fetchBomList,
  // });

  // useEffect(() => {
  //   if (LaborData && LaborData.device_header) {
  //     const headersFromData = LaborData.device_header.map((header) => ({
  //       title: header.header || "",
  //       rows: header.items.map((item) => ({
  //         item: item.item,
  //         description: item.description,
  //         quantity: item.quantity.toString(),
  //         unit_of_measurement: item.unit_of_measurement.toString(),
  //         srp: item.srp,
  //       })),
  //     }));

  //     setNewHeaders(headersFromData);
  //   }
  // }, [LaborData]);

  // useEffect(() => {
  //   if (LaborData?.device_items) {
  //     // If device_items is an array:
  //     const devices = Array.isArray(LaborData.device_items)
  //       ? LaborData.device_items
  //       : [LaborData.device_items]; // fallback for single item

  //     const formattedDevices = devices.map((device) => ({
  //       item: device.item || "",
  //       description: device.description || "",
  //       quantity: device.quantity || 0,
  //       unit_of_measurement: device.unit_of_measurement || "", // or you can hardcode a default
  //       // srp: device.item.srp || 0,
  //       srp: device.srp || 0,

  //       // total_amount: device.total_amount || 0, // Fetching the total_amount
  //       // total_amount: device.srp * device.quantity || 0,
  //       // total_amount: (device.srp || 0) * (device.quantity || 0), // ✅ computed from srp * quantity
  //       total_amount: (device.srp || 0) * (device.quantity || 0), // ✅ computed from srp * quantity
  //     }));

  //     setDeviceRows(formattedDevices);
  //   }
  // }, [LaborData]);

  // Handle changes in input fields

  // const [headers, setHeaders] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  //   const [newHeaders, setNewHeaders] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);
  //   const [newHeaders, setNewHeaders] = useState<
  //     {
  //       mainTitle: string; // <-- new field for roughing_ins.header
  //       title: string; // <-- sub-header
  //       rows: RoughingRow[];
  //     }[]
  //   >([]);
  // const [newHeaders, setNewHeaders] = useState([]);
  const [newHeaders, setNewHeaders] = useState<MappedHeader[]>([]);

  const removeDeviceRow = (index: number) => {
    const updated = [...deviceRows];
    updated.splice(index, 1);
    setDeviceRows(updated);
  };

  //   const addHeader = () => {
  //     setNewHeaders([
  //       ...newHeaders,
  //       {
  //         title: "",
  //         rows: [
  //           {
  //             item: "",
  //             description: "",
  //             quantity: "",
  //             unit_of_measurement: "",
  //             srp: 0,
  //           },
  //         ],
  //       },
  //     ]);
  //   };
  //   const addHeader = () => {
  //     setNewHeaders([
  //       ...newHeaders,
  //       {
  //         mainTitle: "", // Initialize with an empty main title.
  //         title: "", // Initialize with an empty sub-header title.
  //         rows: [
  //           {
  //             item: "",
  //             description: "",
  //             quantity: "",
  //             unit_of_measurement: "",
  //             srp: 0,
  //           },
  //         ],
  //       },
  //     ]);
  //   };
  //   const addHeader = () => {
  //     const newHeader = {
  //       header: "", // Main title for the header, initially empty
  //       rows: [], // An empty array for rows
  //     };

  //     // Update the state with the new header
  //     setNewHeaders([...newHeaders, newHeader]);
  //   };
  // const addHeader = () => {
  //   const newHeader = {
  //     header: "", // Main title for the header
  //     rows: [
  //       {
  //         title: "", // Sub-header title
  //         manuallyAdded: true, // <-- Add this flag
  //         rows: [
  //           {
  //             item: "",
  //             ratio: "",
  //             unit: "",
  //             quantity: "",
  //             manpower: "",
  //             no_of_days: "",
  //             labor_cost: "",
  //             per_unit_cost: "",
  //           },
  //         ], // Initial row for the sub-header
  //       },
  //     ],
  //   };

  //   // Add the new header to the existing state
  //   setNewHeaders([...newHeaders, newHeader]);
  // };

  const updateDeviceRow = (
    rowIndex: number,
    key: keyof DeviceRow,
    value: string | number
  ) => {
    setDeviceRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        [key]: value,
      };
      return updatedRows;
    });
  };

  //   const updateNewHeaderTitle = (headerIndex: number, newTitle: string) => {
  //     setNewHeaders((prevHeaders) => {
  //       const updatedHeaders = [...prevHeaders];
  //       updatedHeaders[headerIndex].title = newTitle;
  //       return updatedHeaders;
  //     });
  //   };
  // const updateNewHeaderTitle = (headerIndex, subIndex, value) => {
  //   const updatedHeaders = [...newHeaders];
  //   updatedHeaders[headerIndex].rows[subIndex].title = value;
  //   setNewHeaders(updatedHeaders);
  // };

  //   const updateNewHeaderRow = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     field: keyof DeviceRow,
  //     newValue: string
  //   ) => {
  //     setNewHeaders((prevHeaders) => {
  //       const updatedHeaders = [...prevHeaders];
  //       updatedHeaders[headerIndex].rows[rowIndex][field] = newValue;
  //       return updatedHeaders;
  //     });
  //   };

  //   const addRowToNewHeader = (headerIndex: number) => {
  //     const updated = [...newHeaders];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: "",
  //       unit_of_measurement: "",
  //       srp: 0,
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
  //   const removeRowFromNewHeader = (headerIndex, subIndex, rowIndex) => {
  //     const updatedHeaders = [...newHeaders];

  //     // Remove the row from the correct sub-header's rows
  //     updatedHeaders[headerIndex].rows[subIndex].rows.splice(rowIndex, 1);

  //     // Update the state with the modified headers
  //     setNewHeaders(updatedHeaders);
  //   };

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
  //     quantity: "",
  //     unit_of_measurement: "",
  //     amount: "",
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
  //   const savedTotal = headers.reduce((sum, header) => {
  //     return sum + getHeaderSubtotal(header.rows);
  //   }, 0);

  //   const newHeadersTotal = newHeaders.reduce((sum, newHeader) => {
  //     return sum + getNewHeaderSubtotal(newHeader.rows);
  //   }, 0);

  //   return savedTotal + newHeadersTotal;
  // };

  // const getNewHeaderSubtotal = (rows: DeviceRow[]) => {
  //   return rows.reduce((total, row) => {
  //     const quantity = row.quantity || 0;
  //     const unit_of_measurement = parseFloat(row.unit_of_measurement) || 0;
  //     return total + quantity * unit_of_measurement;
  //   }, 0);
  // };
  interface MappedRowItem {
    item: string;
    ratio: string;
    unit: string;
    quantity: string;
    manpower: string;
    no_of_days: string;
    labor_cost: string;
    per_unit_cost: string;
  }

  interface MappedSubHeader {
    title: string;
    rows: MappedRowItem[];
  }

  interface MappedHeader {
    header: string;
    rows: MappedSubHeader[];
  }
  interface RoughingItems {
    // id: number,
    manpower: string;
    no_of_days: string;
    total: string;
    per_unit_cost: string;
    order: number;
    item: string;
    ratio: string;
    unit: string;
    quantity: number;
    labor_cost: number;
  }
  interface Roughing {
    // id: number,
    items: RoughingItems[];
    sub_headers: string;
    items_sub_total: string;
    sub_headers_total: string;
    total: string;
    header: string;
    sub_header: string;
  }

  useEffect(() => {
    if (LaborData?.roughing_ins && Array.isArray(LaborData.roughing_ins)) {
      const allHeaders: MappedHeader[] = LaborData.roughing_ins.map(
        (section) => {
          const subHeaders: MappedSubHeader[] = section.sub_headers.map(
            (sub: Roughing): MappedSubHeader => {
              return {
                title: sub.sub_header,
                rows: sub.items.map(
                  (item: RoughingItems): MappedRowItem => ({
                    item: item.item,
                    ratio: item.ratio,
                    unit: item.unit,
                    quantity: item.quantity.toString(),
                    manpower: item.manpower.toString(),
                    no_of_days: item.no_of_days.toString(),
                    labor_cost: item.labor_cost.toString(),
                    per_unit_cost: item.per_unit_cost.toString(),
                  })
                ),
              };
            }
          );

          const directItems: MappedSubHeader[] =
            section.items.length > 0
              ? [
                  {
                    title: "",
                    rows: section.items.map(
                      (item: RoughingItems): MappedRowItem => ({
                        item: item.item,
                        ratio: item.ratio,
                        unit: item.unit,
                        quantity: item.quantity.toString(),
                        manpower: item.manpower.toString(),
                        no_of_days: item.no_of_days.toString(),
                        labor_cost: item.labor_cost.toString(),
                        per_unit_cost: item.per_unit_cost.toString(),
                      })
                    ),
                  },
                ]
              : [];

          return {
            header: section.header,
            rows: [...subHeaders, ...directItems],
          };
        }
      );

      setNewHeaders(allHeaders);
    }
  }, [LaborData]);

  // const updateNewHeaderMainTitle = (headerIndex, value) => {
  //   const updatedHeaders = [...newHeaders];
  //   updatedHeaders[headerIndex].header = value;
  //   setNewHeaders(updatedHeaders);
  // };

  // const updateNewHeaderRow = (
  //   headerIndex,
  //   subIndex,
  //   rowIndex,
  //   field,
  //   value
  // ) => {
  //   const updatedHeaders = [...newHeaders];
  //   updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex][field] = value;
  //   setNewHeaders(updatedHeaders);
  // };

  // const removeRowFromNewHeader = (headerIndex, subIndex, rowIndex) => {
  //   const updatedHeaders = [...newHeaders];
  //   updatedHeaders[headerIndex].rows[subIndex].rows.splice(rowIndex, 1);
  //   setNewHeaders(updatedHeaders);
  // };
  type RowItemField = keyof MappedRowItem;

  const updateNewHeaderMainTitle = (headerIndex: number, value: string) => {
    const updatedHeaders = [...newHeaders];
    if (updatedHeaders[headerIndex]) {
      updatedHeaders[headerIndex].header = value;
      setNewHeaders(updatedHeaders);
    }
  };
  // const updateSubHeaderTitle = (
  //   headerIndex: number,
  //   subHeaderIndex: number,
  //   value: string
  // ) => {
  //   const updatedHeaders = [...newHeaders];
  //   if (
  //     updatedHeaders[headerIndex] &&
  //     updatedHeaders[headerIndex].rows[subHeaderIndex]
  //   ) {
  //     updatedHeaders[headerIndex].rows[subHeaderIndex].title = value;
  //     setNewHeaders(updatedHeaders);
  //   }
  // };
  const updateSubHeaderTitle = (
    headerIndex: number,
    subIndex: number,
    title: string
  ) => {
    const updatedHeaders = [...newHeaders];
    if (updatedHeaders[headerIndex]?.rows[subIndex]) {
      updatedHeaders[headerIndex].rows[subIndex].title = title;
      setNewHeaders(updatedHeaders);
    }
  };

  interface MappedRowItem {
    item: string;
    ratio: string;
    unit: string;
    quantity: string;
    manpower: string;
    no_of_days: string;
    labor_cost: string;
    per_unit_cost: string;
  }
  // interface MappedRowItems {
  //   item: string;
  //   ratio: string;
  //   unit: string;
  //   quantity: string;
  //   manpower: string;
  //   no_of_days: string;
  //   labor_cost: string;
  //   per_unit_cost: string;
  // }
  const updateNewHeaderRow = (
    headerIndex: number,
    subIndex: number,
    rowIndex: number,
    field: RowItemField,
    value: string
  ) => {
    const updatedHeaders = [...newHeaders];
    if (
      updatedHeaders[headerIndex] &&
      updatedHeaders[headerIndex].rows[subIndex] &&
      updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex]
    ) {
      updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex][field] = value;
      setNewHeaders(updatedHeaders);
    }
  };

  const removeRowFromNewHeader = (
    headerIndex: number,
    subIndex: number,
    rowIndex: number
  ) => {
    const updatedHeaders = [...newHeaders];
    if (
      updatedHeaders[headerIndex] &&
      updatedHeaders[headerIndex].rows[subIndex] &&
      updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex]
    ) {
      updatedHeaders[headerIndex].rows[subIndex].rows.splice(rowIndex, 1);
      setNewHeaders(updatedHeaders);
    }
  };
  // const addRowToNewHeader = (headerIndex, subIndex) => {
  //   const updatedHeaders = [...newHeaders];
  //   updatedHeaders[headerIndex].rows[subIndex].rows.push({
  //     item: "",
  //     ratio: "",
  //     unit: "",
  //     quantity: "",
  //     manpower: "",
  //     no_of_days: "",
  //     labor_cost: "",
  //     per_unit_cost: "",
  //   });
  //   setNewHeaders(updatedHeaders);
  // };

  const addRowToNewHeader = (headerIndex: number, subIndex: number) => {
    const updatedHeaders: MappedHeader[] = [...newHeaders];

    if (
      updatedHeaders[headerIndex] &&
      updatedHeaders[headerIndex].rows[subIndex]
    ) {
      updatedHeaders[headerIndex].rows[subIndex].rows.push({
        item: "",
        ratio: "",
        unit: "",
        quantity: "",
        manpower: "",
        no_of_days: "",
        labor_cost: "",
        per_unit_cost: "",
      });

      setNewHeaders(updatedHeaders);
    }
  };

  return (
    <>
      {activeNav === 1 && (
        <>
          <div className="space-y-1">
            {/* <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={addHeader}
              >
                Add Header
              </button>
            </div> */}

            {/* Device Table */}
            <table className="table-auto w-full text-sm text-left  border">
              <thead className="bg-gray-100 dark:bg-gray-dark uppercase">
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">ratio</th>
                  <th className="px-4 py-2">unit</th>
                  <th className="px-4 py-2">qty in manpower</th>
                  <th className="px-4 py-2">no of days</th>
                  <th className="px-4 py-2">labor cost total</th>
                  <th className="px-4 py-2">per unit cost</th>
                  <th className="px-4 py-2">action</th>
                </tr>
              </thead>
              <tbody>
                {deviceRows.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={row.item}
                        onChange={(e) =>
                          updateDeviceRow(index, "item", e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) =>
                          updateDeviceRow(index, "description", e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={row.quantity}
                        // onChange={(e) => {
                        //   const updatedQuantity = parseFloat(e.target.value);
                        //   const updatedTotalAmount = updatedQuantity * row.srp; // Recalculate total_amount based on updated quantity
                        //   updateDeviceRow(index, "quantity", updatedQuantity);
                        //   updateDeviceRow(
                        //     index,
                        //     "total_amount",
                        //     updatedTotalAmount
                        //   ); // Update the total_amount field
                        // }}
                        // onChange={(e) => {
                        //   const updatedQuantity = parseFloat(e.target.value);
                        //   updateDeviceRow(index, "quantity", updatedQuantity);
                        // }}
                        onChange={(e) => {
                          const value = e.target.value;
                          const updatedQuantity =
                            value === "" ? 0 : parseFloat(value);
                          const updatedTotal = updatedQuantity * row.srp;
                          updateDeviceRow(index, "quantity", updatedQuantity);
                          updateDeviceRow(index, "total_amount", updatedTotal);
                        }}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={row.unit_of_measurement}
                        onChange={(e) =>
                          updateDeviceRow(
                            index,
                            "unit_of_measurement",
                            e.target.value
                          )
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={row.srp} // Fetch only the srp (unit price) value from your API data
                        onChange={(e) => {
                          const updatedSrp = parseFloat(e.target.value);
                          const updatedTotalAmount = row.quantity * updatedSrp; // Recalculate total_amount based on updated SRP
                          updateDeviceRow(index, "srp", updatedSrp);
                          updateDeviceRow(
                            index,
                            "total_amount",
                            updatedTotalAmount
                          ); // Update total_amount
                        }}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={row.total_amount} // Display total_amount as calculated
                        // onChange={(e) => {
                        //   // If you want to allow reverse calculation, implement logic here
                        //   // Optionally: Recalculate quantity or srp based on the total amount
                        // }}
                        readOnly // Optional: Make it readonly or editable depending on your requirements
                        className="w-full border p-1 rounded bg-gray-100 text-gray-700"
                      />
                    </td>

                    <td className="px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => removeDeviceRow(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* {newHeaders.map((header, headerIndex) => (
                                 <tr key={headerIndex}>
                                   <td colSpan={8}>
                                     <div className="border p-4 bg-gray-50 rounded space-y-4 mt-4">
                                       <input
                                         type="text"
                                         placeholder="Main Header Title"
                                         value={header.mainTitle}
                                         onChange={(e) =>
                                           updateNewMainHeaderTitle(
                                             headerIndex,
                                             e.target.value
                                           )
                                         }
                                         className="w-full p-2 border border-blue-300 rounded font-bold bg-white"
                                       />
       
                                       <input
                                         type="text"
                                         placeholder="Sub Header Title"
                                         value={header.title}
                                         onChange={(e) =>
                                           updateNewHeaderTitle(
                                             headerIndex,
                                             e.target.value
                                           )
                                         }
                                         className="w-full p-2 border rounded"
                                       />
       
                                       {header.rows.map((row, rowIndex) => (
                                         <div
                                           key={rowIndex}
                                           className="grid grid-cols-8 gap-2"
                                         >
                                           {[
                                             "item",
                                             "ratio",
                                             "unit",
                                             "quantity",
                                             "manpower",
                                             "no_of_days",
                                             "labor_cost",
                                             "per_unit_cost",
                                           ].map((field) => (
                                             <input
                                               key={field}
                                               type="text"
                                               placeholder={field}
                                               value={row[field as keyof RoughingRow]}
                                               onChange={(e) =>
                                                 updateNewHeaderRow(
                                                   headerIndex,
                                                   rowIndex,
                                                   field as keyof RoughingRow,
                                                   e.target.value
                                                 )
                                               }
                                               className="p-2 border rounded"
                                             />
                                           ))}
       
                                           <button
                                             className="bg-red-400 text-white px-2 py-1 rounded"
                                             onClick={() =>
                                               removeRowFromNewHeader(
                                                 headerIndex,
                                                 rowIndex
                                               )
                                             }
                                           >
                                             Remove
                                           </button>
                                         </div>
                                       ))}
       
                                       <div className="flex justify-between items-center">
                                         <button
                                           type="button"
                                           className="bg-green-500 text-white px-4 py-2 rounded"
                                           onClick={() =>
                                             addRowToNewHeader(headerIndex)
                                           }
                                         >
                                           Add Row
                                         </button>
       
                                         <div className="space-x-2 flex items-center">
                                           <button
                                             className="bg-blue-600 text-white px-4 py-2 rounded"
                                             onClick={() => saveNewHeader(headerIndex)}
                                           >
                                             Save Header
                                           </button>
                                           <button
                                             className="bg-gray-500 text-white px-4 py-2 rounded"
                                             onClick={() =>
                                               cancelNewHeader(headerIndex)
                                             }
                                           >
                                             Cancel
                                           </button>
                                         </div>
                                       </div>
                                     </div>
                                   </td>
                                 </tr>
                               ))} */}
            {/* {newHeaders.map((header, headerIndex) => (
                                 <tr key={headerIndex}>
                                   <td colSpan={8}>
                                     <div className="border p-4 bg-gray-50 rounded space-y-4 mt-4">
                                       {header.mainTitle && (
                                         <input
                                           type="text"
                                           placeholder="Main Header Title"
                                           value={header.mainTitle}
                                           onChange={(e) =>
                                             updateNewHeaderMainTitle(
                                               headerIndex,
                                               e.target.value
                                             )
                                           }
                                           className="w-full p-2 border rounded"
                                         />
                                       )}
       
                                       {header.title && (
                                         <input
                                           type="text"
                                           placeholder="Sub Header Title"
                                           value={header.title}
                                           onChange={(e) =>
                                             updateNewHeaderTitle(
                                               headerIndex,
                                               e.target.value
                                             )
                                           }
                                           className="w-full p-2 border rounded"
                                         />
                                       )}
       
                                       {header.rows.map((row, rowIndex) => (
                                         <div
                                           key={rowIndex}
                                           className="grid grid-cols-8 gap-2"
                                         >
                                           {[
                                             "item",
                                             "ratio",
                                             "unit",
                                             "quantity",
                                             "manpower",
                                             "no_of_days",
                                             "labor_cost",
                                             "per_unit_cost",
                                           ].map((field) => (
                                             <input
                                               key={field}
                                               type="text"
                                               placeholder={field}
                                               value={row[field as keyof RoughingRow]}
                                               onChange={(e) =>
                                                 updateNewHeaderRow(
                                                   headerIndex,
                                                   rowIndex,
                                                   field as keyof RoughingRow,
                                                   e.target.value
                                                 )
                                               }
                                               className="p-2 border rounded"
                                             />
                                           ))}
       
                                           <button
                                             className="bg-red-400 text-white px-2 py-1 rounded"
                                             onClick={() =>
                                               removeRowFromNewHeader(
                                                 headerIndex,
                                                 rowIndex
                                               )
                                             }
                                           >
                                             Remove
                                           </button>
                                         </div>
                                       ))}
       
                                       <div className="flex justify-between items-center">
                                         <button
                                           type="button"
                                           className="bg-green-500 text-white px-4 py-2 rounded"
                                           onClick={() =>
                                             addRowToNewHeader(headerIndex)
                                           }
                                         >
                                           Add Row
                                         </button>
       
                                         <div className="space-x-2 flex items-center">
                                           <button
                                             className="bg-blue-600 text-white px-4 py-2 rounded"
                                             onClick={() => saveNewHeader(headerIndex)}
                                           >
                                             Save Header
                                           </button>
                                           <button
                                             className="bg-gray-500 text-white px-4 py-2 rounded"
                                             onClick={() =>
                                               cancelNewHeader(headerIndex)
                                             }
                                           >
                                             Cancel
                                           </button>
                                         </div>
                                       </div>
                                     </div>
                                   </td>
                                 </tr>
                               ))} */}
            {/* {newHeaders.map((header, headerIndex) => (
                                 <tr key={headerIndex}>
                                   <td colSpan={8}>
                                     <div className="border p-4 bg-gray-50 rounded space-y-4 mt-4">
                                      
                                       <input
                                         type="text"
                                         placeholder="Main Header Title"
                                         value={header.mainTitle}
                                         onChange={(e) =>
                                           updateNewHeaderMainTitle(
                                             headerIndex,
                                             e.target.value
                                           )
                                         }
                                         className="w-full p-2 border rounded"
                                       />
       
                                       
                                       {header.title || header.title === "" ? (
                                         <input
                                           type="text"
                                           placeholder="Sub Header Title"
                                           value={header.title}
                                           onChange={(e) =>
                                             updateNewHeaderTitle(
                                               headerIndex,
                                               e.target.value
                                             )
                                           }
                                           className="w-full p-2 border rounded"
                                         />
                                       ) : null}
       
                                      
                                       {header.rows.map((row, rowIndex) => (
                                         <div
                                           key={rowIndex}
                                           className="grid grid-cols-8 gap-2"
                                         >
                                           {[
                                             "item",
                                             "ratio",
                                             "unit",
                                             "quantity",
                                             "manpower",
                                             "no_of_days",
                                             "labor_cost",
                                             "per_unit_cost",
                                           ].map((field) => (
                                             <input
                                               key={field}
                                               type="text"
                                               placeholder={field}
                                               value={
                                                 row[field as keyof RoughingRow] || ""
                                               }
                                               onChange={(e) =>
                                                 updateNewHeaderRow(
                                                   headerIndex,
                                                   rowIndex,
                                                   field as keyof RoughingRow,
                                                   e.target.value
                                                 )
                                               }
                                               className="p-2 border rounded"
                                             />
                                           ))}
       
                                           <button
                                             className="bg-red-400 text-white px-2 py-1 rounded"
                                             onClick={() =>
                                               removeRowFromNewHeader(
                                                 headerIndex,
                                                 rowIndex
                                               )
                                             }
                                           >
                                             Remove
                                           </button>
                                         </div>
                                       ))}
       
                                      
                                       <div className="flex justify-between items-center">
                                         <button
                                           type="button"
                                           className="bg-green-500 text-white px-4 py-2 rounded"
                                           onClick={() =>
                                             addRowToNewHeader(headerIndex)
                                           }
                                         >
                                           Add Row
                                         </button>
       
                                       
                                         <div className="space-x-2 flex items-center">
                                           <button
                                             className="bg-blue-600 text-white px-4 py-2 rounded"
                                             onClick={() => saveNewHeader(headerIndex)}
                                           >
                                             Save Header
                                           </button>
                                           <button
                                             className="bg-gray-500 text-white px-4 py-2 rounded"
                                             onClick={() =>
                                               cancelNewHeader(headerIndex)
                                             }
                                           >
                                             Cancel
                                           </button>
                                         </div>
                                       </div>
                                     </div>
                                   </td>
                                 </tr>
                               ))} */}
            {/* {newHeaders.map((header, headerIndex) => (
                                 <tr key={headerIndex}>
                                   <td colSpan={8}>
                                     <div className="border p-4 bg-gray-50 rounded space-y-4 mt-4">
                                       <input
                                         type="text"
                                         placeholder="Main Header Title"
                                         value={header.mainTitle}
                                         onChange={(e) =>
                                           updateNewHeaderMainTitle(
                                             headerIndex,
                                             e.target.value
                                           )
                                         }
                                         className="w-full p-2 border-2 border-red-500 rounded"
                                       />
       
                                       {header.title || header.title === "" ? (
                                         <input
                                           type="text"
                                           placeholder="Sub Header Title"
                                           value={header.title}
                                           onChange={(e) =>
                                             updateNewHeaderTitle(
                                               headerIndex,
                                               e.target.value
                                             )
                                           }
                                           className="w-full p-2 border-2 border-blue-500 rounded"
                                         />
                                       ) : null}
       
                                       {header.rows.map((row, rowIndex) => (
                                         <div
                                           key={rowIndex}
                                           className="grid grid-cols-8 gap-2"
                                         >
                                           {[
                                             "item",
                                             "ratio",
                                             "unit",
                                             "quantity",
                                             "manpower",
                                             "no_of_days",
                                             "labor_cost",
                                             "per_unit_cost",
                                           ].map((field) => (
                                             <input
                                               key={field}
                                               type="text"
                                               placeholder={field}
                                               value={
                                                 row[field as keyof RoughingRow] || ""
                                               }
                                               onChange={(e) =>
                                                 updateNewHeaderRow(
                                                   headerIndex,
                                                   rowIndex,
                                                   field as keyof RoughingRow,
                                                   e.target.value
                                                 )
                                               }
                                               className="p-2 border rounded"
                                             />
                                           ))}
       
                                           <button
                                             className="bg-red-400 text-white px-2 py-1 rounded"
                                             onClick={() =>
                                               removeRowFromNewHeader(
                                                 headerIndex,
                                                 rowIndex
                                               )
                                             }
                                           >
                                             Remove
                                           </button>
                                         </div>
                                       ))}
                                       <div className="flex justify-between items-center">
                                         <button
                                           type="button"
                                           className="bg-green-500 text-white px-4 py-2 rounded"
                                           onClick={() =>
                                             addRowToNewHeader(headerIndex)
                                           }
                                         >
                                           Add Row
                                         </button>
       
                                         <div className="space-x-2 flex items-center">
                                           <button
                                             className="bg-blue-600 text-white px-4 py-2 rounded"
                                             onClick={() => saveNewHeader(headerIndex)}
                                           >
                                             Save Header
                                           </button>
                                           <button
                                             className="bg-gray-500 text-white px-4 py-2 rounded"
                                             onClick={() =>
                                               cancelNewHeader(headerIndex)
                                             }
                                           >
                                             Cancel
                                           </button>
                                         </div>
                                       </div>
                                     </div>
                                   </td>
                                 </tr>
                               ))} */}
            {/* {newHeaders.map((header, headerIndex) => (
                                 <React.Fragment key={headerIndex}>
                                   
                                   <tr>
                                     <td colSpan={8}>
                                       <div className="border p-4 bg-gray-50 rounded space-y-4 mt-4">
                                         <input
                                           type="text"
                                           placeholder="Main Header Title"
                                           value={header.header}
                                           onChange={(e) =>
                                             updateNewHeaderMainTitle(
                                               headerIndex,
                                               e.target.value
                                             )
                                           }
                                           className="w-full p-2 border-2 border-red-500 rounded"
                                         />
                                       </div>
                                     </td>
                                   </tr>
       
                                  
                                   {header.rows.map((subHeader, subIndex) => (
                                     <React.Fragment key={subIndex}>
                                       {subHeader.title && (
                                         <tr>
                                           <td colSpan={8}>
                                             <div className="border p-4 bg-gray-100 rounded space-y-4 mt-4">
                                               <input
                                                 type="text"
                                                 placeholder="Sub Header Title"
                                                 value={subHeader.title}
                                                 onChange={(e) =>
                                                   updateNewHeaderTitle(
                                                     headerIndex,
                                                     subIndex,
                                                     e.target.value
                                                   )
                                                 }
                                                 className="w-full p-2 border-2 border-blue-500 rounded"
                                               />
                                             </div>
                                           </td>
                                         </tr>
                                       )}
       
                                      
                                       {subHeader.rows.map((row, rowIndex) => (
                                         <tr key={rowIndex}>
                                           <td colSpan={8}>
                                             <div className="grid grid-cols-8 gap-2">
                                               {[
                                                 "item",
                                                 "ratio",
                                                 "unit",
                                                 "quantity",
                                                 "manpower",
                                                 "no_of_days",
                                                 "labor_cost",
                                                 "per_unit_cost",
                                               ].map((field) => (
                                                 <input
                                                   key={field}
                                                   type="text"
                                                   placeholder={field}
                                                   value={row[field] || ""}
                                                   onChange={(e) =>
                                                     updateNewHeaderRow(
                                                       headerIndex,
                                                       subIndex,
                                                       rowIndex,
                                                       field,
                                                       e.target.value
                                                     )
                                                   }
                                                   className="p-2 border rounded"
                                                 />
                                               ))}
       
                                               <button
                                                 className="bg-red-400 text-white px-2 py-1 rounded"
                                                 onClick={() =>
                                                   removeRowFromNewHeader(
                                                     headerIndex,
                                                     subIndex,
                                                     rowIndex
                                                   )
                                                 }
                                               >
                                                 Remove
                                               </button>
                                             </div>
                                           </td>
                                         </tr>
                                       ))}
                                     </React.Fragment>
                                   ))}
                                 </React.Fragment>
                               ))} */}
            {/* {newHeaders.map((header, headerIndex) => (
                                 <React.Fragment key={headerIndex}>
                                   <tr>
                                     <td colSpan={8}>
                                       <div className="border p-4 bg-gray-50 rounded space-y-4 mt-4">
                                         <input
                                           type="text"
                                           placeholder="Main Header Title"
                                           value={header.header}
                                           onChange={(e) =>
                                             updateNewHeaderMainTitle(
                                               headerIndex,
                                               e.target.value
                                             )
                                           }
                                           className="w-full p-2 border-2 border-red-500 rounded"
                                         />
                                       </div>
                                     </td>
                                   </tr>
       
                                   {header.rows.map((subHeader, subIndex) => (
                                     <React.Fragment key={subIndex}>
                                       {subHeader.title && (
                                         <tr>
                                           <td colSpan={8}>
                                             <div className="border p-4 bg-gray-100 rounded space-y-4 mt-4">
                                               <input
                                                 type="text"
                                                 placeholder="Sub Header Title"
                                                 value={subHeader.title}
                                                 onChange={(e) =>
                                                   updateNewHeaderTitle(
                                                     headerIndex,
                                                     subIndex,
                                                     e.target.value
                                                   )
                                                 }
                                                 className="w-full p-2 border-2 border-blue-500 rounded"
                                               />
                                             </div>
                                           </td>
                                         </tr>
                                       )}
       
                                       {subHeader.rows.map((row, rowIndex) => (
                                         <tr key={rowIndex}>
                                           <td colSpan={8}>
                                             <div className="grid grid-cols-8 gap-2">
                                               {[
                                                 "item",
                                                 "ratio",
                                                 "unit",
                                                 "quantity",
                                                 "manpower",
                                                 "no_of_days",
                                                 "labor_cost",
                                                 "per_unit_cost",
                                               ].map((field) => (
                                                 <input
                                                   key={field}
                                                   type="text"
                                                   placeholder={field}
                                                   value={row[field] || ""}
                                                   onChange={(e) =>
                                                     updateNewHeaderRow(
                                                       headerIndex,
                                                       subIndex,
                                                       rowIndex,
                                                       field,
                                                       e.target.value
                                                     )
                                                   }
                                                   className="p-2 border rounded"
                                                 />
                                               ))}
       
                                               <button
                                                 className="bg-red-400 text-white px-2 py-1 rounded"
                                                 onClick={() =>
                                                   removeRowFromNewHeader(
                                                     headerIndex,
                                                     subIndex,
                                                     rowIndex
                                                   )
                                                 }
                                               >
                                                 Remove
                                               </button>
                                             </div>
                                           </td>
                                         </tr>
                                       ))}
       
                                       <tr>
                                         <td colSpan={8}>
                                           <button
                                             className="bg-green-400 text-white px-4 py-2 rounded"
                                             onClick={() =>
                                               addRowToNewHeader(headerIndex, subIndex)
                                             }
                                           >
                                             Add Row
                                           </button>
                                         </td>
                                       </tr>
                                     </React.Fragment>
                                   ))}
                                 </React.Fragment>
                               ))} */}
            {newHeaders.map((header, headerIndex) => (
              <div key={headerIndex} className="mb-8">
                {/* Main Header Title & First Sub Header Title in a single line */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  {/* Main Header Title */}
                  <input
                    type="text"
                    placeholder="Main Header Title"
                    value={header.header || ""}
                    onChange={(e) =>
                      updateNewHeaderMainTitle(headerIndex, e.target.value)
                    }
                    // onChange={(e) =>
                    //   updateSubHeaderTitle(headerIndex, 0, e.target.value)
                    // }
                    className="flex-1 min-w-[200px] p-2 border-2 border-red-500 rounded text-center font-bold uppercase"
                  />

                  {/* Conditionally render Sub Header Title only if value exists */}
                  {header.rows[0]?.title?.trim() && (
                    <input
                      type="text"
                      placeholder="Sub Header Title"
                      value={header.rows[0].title}
                      // onChange={(e) =>
                      //   updateNewHeaderRow(
                      //     headerIndex,
                      //     0,
                      //     0,
                      //     "title",
                      //     e.target.value
                      //   )
                      // }
                      onChange={
                        (e) =>
                          updateSubHeaderTitle(headerIndex, 0, e.target.value) // ✅ use index 0
                      }
                      className="flex-1 min-w-[200px] p-2 border-2 border-blue-500 rounded text-center font-semibold"
                    />
                  )}
                </div>

                {/* Remaining Sub Header Rows */}
                {header.rows.map((subHeader, subIndex) => (
                  <div key={subIndex} className="mb-6">
                    {subIndex !== 0 &&
                      (subHeader.title?.trim() || "").length > 0 && (
                        <div className="mb-2 flex justify-center">
                          <input
                            type="text"
                            placeholder="Sub Header Title"
                            value={subHeader.title || ""}
                            // onChange={(e) =>
                            //   updateNewHeaderRow(
                            //     headerIndex,
                            //     subIndex,
                            //     0,
                            //     "title",
                            //     e.target.value
                            //   )
                            // }
                            onChange={(e) =>
                              updateSubHeaderTitle(
                                headerIndex,
                                subIndex,
                                e.target.value
                              )
                            }
                            // onChange={(e) =>
                            //   updateNewHeaderRow(
                            //     headerIndex,
                            //     subIndex,
                            //     0,
                            //     "title",
                            //     e.target.value
                            //   )
                            // }
                            className="flex-1 min-w-[200px] p-2 border-2 border-blue-500 rounded text-center font-semibold"
                          />
                        </div>
                      )}

                    {/* Table */}
                    <div className="mt-2 text-left">
                      <button
                        type="button"
                        className="bg-white uppercase text-black border border-black px-4 py-2 rounded"
                        onClick={() => addRowToNewHeader(headerIndex, subIndex)}
                      >
                        Add Row
                      </button>
                    </div>
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                      <table
                        style={{ width: "100%" }}
                        className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg"
                      >
                        <thead className="bg-white text-black  border-b-gray-400">
                          <tr className="text-sm font-medium text-center uppercase">
                            {[
                              "Item",
                              "Ratio",
                              "Unit",
                              "Quantity",
                              "Manpower",
                              "No. of Days",
                              "Labor Cost",
                              "Per Unit Cost",
                              "Actions",
                            ].map((title) => (
                              <th key={title} className="px-4 py-2">
                                {title}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {subHeader.rows.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              // className={`${
                              //   rowIndex % 2 === 0
                              //     ? "bg-gray-100 dark:bg-gray-800"
                              //     : "bg-white dark:bg-gray-700"
                              // }`}
                            >
                              {(
                                [
                                  "item",
                                  "ratio",
                                  "unit",
                                  "quantity",
                                  "manpower",
                                  "no_of_days",
                                  "labor_cost",
                                  "per_unit_cost",
                                ] as (keyof MappedRowItem)[]
                              ).map((field) => (
                                <td key={field} className="">
                                  <input
                                    type="text"
                                    value={row[field] || ""}
                                    placeholder={field}
                                    onChange={(e) =>
                                      updateNewHeaderRow(
                                        headerIndex,
                                        subIndex,
                                        rowIndex,
                                        field,
                                        e.target.value
                                      )
                                    }
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                  />
                                </td>
                              ))}
                              <td className="px-4 py-2">
                                <button
                                  type="button"
                                  className="hover:cursor-pointer ml-2 text-xs text-red-700 hover:underline uppercase"
                                  onClick={() =>
                                    removeRowFromNewHeader(
                                      headerIndex,
                                      subIndex,
                                      rowIndex
                                    )
                                  }
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Add Row Button */}
                    {/* <div className="mt-2 text-left">
                      <button
                        type="button"
                        className="bg-white uppercase text-black border border-black px-4 py-2 rounded"
                        onClick={() => addRowToNewHeader(headerIndex, subIndex)}
                      >
                        Add Row
                      </button>
                    </div> */}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* <div className="text-right text-xl font-bold mt-6">
            Total Amount: ₱{getTotalAmountIncludingNew().toFixed(2)}
          </div> */}
        </>
      )}
    </>
  );
};

export default ActiveNav1;
