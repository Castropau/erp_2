// import { fetchBomList } from "@/api/bom-quotation/fetchBom";
import { fetchlaborId } from "@/api/labor_of_computation/FetchLaborId";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
interface DeviceRow {
  item: string;
  description: string;
  quantity: string;
  unit_of_measurement: string;
  amount: string;
  srp: number;
}
interface BomIds {
  id: number | string;
}
const ActiveNav5 = (props: BomIds) => {
  const [activeNav] = useState(5);

  const [deviceRows5, setDeviceRows5] = useState<DeviceRow[]>([]);

  // const [newHeaders5, setNewHeaders5] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  const [newHeaders5, setNewHeaders5] = useState<MappedHeader[]>([]);

  // const [headers5, setHeaders5] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);

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

  // const [newHeaders, setNewHeaders] = useState([]);

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
  //     const quantity = parseFloat(row.quantity) || 0;
  //     const unit_of_measurement = parseFloat(row.unit_of_measurement) || 0;
  //     return total + quantity * unit_of_measurement;
  //   }, 0);
  // };

  //   useEffect(() => {
  //     if (LaborData?.roughing_ins && Array.isArray(LaborData.roughing_ins)) {
  //       const headersFromData = LaborData.roughing_ins.map((headerBlock) => {
  //         const rows: DeviceRow[] = [];

  //         headerBlock.sub_headers?.forEach((subHeader) => {
  //           subHeader.items?.forEach((item) => {
  //             rows.push({
  //               item: item.item || "",
  //               ratio: item.ratio || "",
  //               unit: item.unit || "",
  //               quantity: item.quantity.toString() || "0",
  //               manpower: item.manpower?.toString() || "0",
  //               no_of_days: item.no_of_days?.toString() || "0",
  //               labor_cost: item.labor_cost?.toString() || "0",
  //               per_unit_cost: item.per_unit_cost?.toString() || "0",
  //             });
  //           });
  //         });

  //         return {
  //           title: headerBlock.header || "Untitled Header",
  //           rows,
  //         };
  //       });

  //       setNewHeaders(headersFromData);
  //     }
  //   }, [LaborData]);
  //   useEffect(() => {
  //     if (LaborData?.roughing_ins && Array.isArray(LaborData.roughing_ins)) {
  //       const subHeadersMapped = LaborData.roughing_ins.flatMap((headerBlock) => {
  //         return headerBlock.sub_headers.map((subHeader) => {
  //           const rows: DeviceRow[] = subHeader.items.map((item) => ({
  //             item: item.item || "",
  //             ratio: item.ratio || "",
  //             unit: item.unit || "",
  //             quantity: item.quantity.toString() || "0",
  //             manpower: item.manpower?.toString() || "0",
  //             no_of_days: item.no_of_days?.toString() || "0",
  //             labor_cost: item.labor_cost?.toString() || "0",
  //             per_unit_cost: item.per_unit_cost?.toString() || "0",
  //           }));

  //           return {
  //             title: subHeader.sub_header || "Untitled Subheader",
  //             rows,
  //           };
  //         });
  //       });

  //       setNewHeaders(subHeadersMapped);
  //     }
  //   }, [LaborData]);
  //   useEffect(() => {
  //     if (LaborData?.roughing_ins && Array.isArray(LaborData.roughing_ins)) {
  //       const flattenedHeaders = LaborData.roughing_ins.flatMap((header) =>
  //         header.sub_headers.map((subHeader) => ({
  //           mainTitle: header.header || "", // <-- top-level header
  //           title: subHeader.sub_header || "", // <-- subheader title
  //           rows: subHeader.items.map((item) => ({
  //             item: item.item || "",
  //             ratio: item.ratio || "",
  //             unit: item.unit || "",
  //             quantity: item.quantity.toString(),
  //             manpower: item.manpower?.toString() || "",
  //             no_of_days: item.no_of_days?.toString() || "",
  //             labor_cost: item.labor_cost?.toString() || "",
  //             per_unit_cost: item.per_unit_cost?.toString() || "",
  //           })),
  //         }))
  //       );
  //       setNewHeaders(flattenedHeaders);
  //     }
  //   }, [LaborData]);
  //   useEffect(() => {
  //     if (LaborData?.roughing_ins && Array.isArray(LaborData.roughing_ins)) {
  //       const allHeaders = LaborData.roughing_ins.flatMap((section) => {
  //         const headerTitle = section.header || "";

  //         // If section has sub_headers, loop through them
  //         if (section.sub_headers && section.sub_headers.length > 0) {
  //           return section.sub_headers.map((sub) => ({
  //             mainTitle: headerTitle,
  //             title: sub.sub_header || "",
  //             rows: sub.items.map((item) => ({
  //               item: item.item || "",
  //               ratio: item.ratio || "",
  //               unit: item.unit || "",
  //               quantity: item.quantity?.toString() || "",
  //               manpower: item.manpower?.toString() || "",
  //               no_of_days: item.no_of_days?.toString() || "",
  //               labor_cost: item.labor_cost?.toString() || "",
  //               per_unit_cost: item.per_unit_cost?.toString() || "",
  //             })),
  //           }));
  //         }

  //         // Otherwise, just use the items at the top level
  //         return [
  //           {
  //             mainTitle: headerTitle,
  //             title: "", // no sub-header
  //             rows: section.items.map((item) => ({
  //               item: item.item || "",
  //               ratio: item.ratio || "",
  //               unit: item.unit || "",
  //               quantity: item.quantity?.toString() || "",
  //               manpower: item.manpower?.toString() || "",
  //               no_of_days: item.no_of_days?.toString() || "",
  //               labor_cost: item.labor_cost?.toString() || "",
  //               per_unit_cost: item.per_unit_cost?.toString() || "",
  //             })),
  //           },
  //         ];
  //       });

  //       setNewHeaders(allHeaders);
  //     }
  //   }, [LaborData]);
  //   useEffect(() => {
  //     if (LaborData?.roughing_ins && Array.isArray(LaborData.roughing_ins)) {
  //       const allHeaders = LaborData.roughing_ins.flatMap((section) => {
  //         const headerTitle = section.header || "";

  //         // If section has sub_headers
  //         if (section.sub_headers && section.sub_headers.length > 0) {
  //           return section.sub_headers.map((sub) => {
  //             const hasSubHeader = !!sub.sub_header?.trim(); // Check if sub_header has a value

  //             const headerObject: any = {
  //               mainTitle: headerTitle,
  //               rows: sub.items.map((item) => ({
  //                 item: item.item || "",
  //                 ratio: item.ratio || "",
  //                 unit: item.unit || "",
  //                 quantity: item.quantity?.toString() || "",
  //                 manpower: item.manpower?.toString() || "",
  //                 no_of_days: item.no_of_days?.toString() || "",
  //                 labor_cost: item.labor_cost?.toString() || "",
  //                 per_unit_cost: item.per_unit_cost?.toString() || "",
  //               })),
  //             };

  //             // Only assign the title if there's a sub_header
  //             if (hasSubHeader) {
  //               headerObject.title = sub.sub_header;
  //             }

  //             return headerObject;
  //           });
  //         }

  //         // No sub_headers, handle top-level items
  //         return [
  //           {
  //             mainTitle: headerTitle,
  //             rows: section.items.map((item) => ({
  //               item: item.item || "",
  //               ratio: item.ratio || "",
  //               unit: item.unit || "",
  //               quantity: item.quantity?.toString() || "",
  //               manpower: item.manpower?.toString() || "",
  //               no_of_days: item.no_of_days?.toString() || "",
  //               labor_cost: item.labor_cost?.toString() || "",
  //               per_unit_cost: item.per_unit_cost?.toString() || "",
  //             })),
  //           },
  //         ];
  //       });

  //       setNewHeaders(allHeaders);
  //     }
  //   }, [LaborData]);
  //   useEffect(() => {
  //     if (LaborData?.roughing_ins && Array.isArray(LaborData.roughing_ins)) {
  //       const allHeaders = LaborData.roughing_ins.flatMap((section) => {
  //         if (
  //           Array.isArray(section.sub_headers) &&
  //           section.sub_headers.length > 0
  //         ) {
  //           return section.sub_headers.map((sub) => {
  //             const hasSubHeader = !!sub.sub_header?.trim();

  //             const headerObject: any = {
  //               mainTitle: headerTitle,
  //               rows: sub.items.map((item) => ({
  //                 item: item.item || "",
  //                 ratio: item.ratio || "",
  //                 unit: item.unit || "",
  //                 quantity: item.quantity?.toString() || "",
  //                 manpower: item.manpower?.toString() || "",
  //                 no_of_days: item.no_of_days?.toString() || "",
  //                 labor_cost: item.labor_cost?.toString() || "",
  //                 per_unit_cost: item.per_unit_cost?.toString() || "",
  //               })),
  //             };

  //             if (hasSubHeader) {
  //               headerObject.title = sub.sub_header;
  //             }

  //             return headerObject;
  //           });
  //         }
  //         if (section.items && section.items.length > 0) {
  //           return [
  //             {
  //               mainTitle: headerTitle,
  //               rows: section.items.map((item) => ({
  //                 item: item.item || "",
  //                 ratio: item.ratio || "",
  //                 unit: item.unit || "",
  //                 quantity: item.quantity?.toString() || "",
  //                 manpower: item.manpower?.toString() || "",
  //                 no_of_days: item.no_of_days?.toString() || "",
  //                 labor_cost: item.labor_cost?.toString() || "",
  //                 per_unit_cost: item.per_unit_cost?.toString() || "",
  //               })),
  //             },
  //           ];
  //         }

  //         return []; // 🧹 Nothing to add if both sub_headers and items are empty
  //       });

  //       setNewHeaders(allHeaders);
  //     }
  //   }, [LaborData]);
  // useEffect(() => {
  //   if (LaborData?.roughing_ins && Array.isArray(LaborData.roughing_ins)) {
  //     const allHeaders = LaborData.roughing_ins.flatMap((section) => {
  //       const headerObject: any = {
  //         header: section.header, // Main Title or Header from "roughing_ins"
  //         rows: [],
  //       };

  //       // If there are sub_headers, process them
  //       if (
  //         Array.isArray(section.sub_headers) &&
  //         section.sub_headers.length > 0
  //       ) {
  //         section.sub_headers.forEach((sub) => {
  //           const hasSubHeader = !!sub.sub_header?.trim();
  //           const subHeaderObject = {
  //             title: sub.sub_header || "",
  //             rows: sub.items.map((item) => ({
  //               item: item.item || "",
  //               ratio: item.ratio || "",
  //               unit: item.unit || "",
  //               quantity: item.quantity?.toString() || "",
  //               manpower: item.manpower?.toString() || "",
  //               no_of_days: item.no_of_days?.toString() || "",
  //               labor_cost: item.labor_cost?.toString() || "",
  //               per_unit_cost: item.per_unit_cost?.toString() || "",
  //             })),
  //           };
  //           headerObject.rows.push(subHeaderObject);
  //         });
  //       }

  //       // If no sub_headers but items exist, just process the items
  //       if (section.items && section.items.length > 0) {
  //         headerObject.rows.push({
  //           rows: section.items.map((item) => ({
  //             item: item.item || "",
  //             ratio: item.ratio || "",
  //             unit: item.unit || "",
  //             quantity: item.quantity?.toString() || "",
  //             manpower: item.manpower?.toString() || "",
  //             no_of_days: item.no_of_days?.toString() || "",
  //             labor_cost: item.labor_cost?.toString() || "",
  //             per_unit_cost: item.per_unit_cost?.toString() || "",
  //           })),
  //         });
  //       }

  //       return headerObject;
  //     });

  //     setNewHeaders(allHeaders);
  //   }
  // }, [LaborData]);
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

  // const [deviceRows2, setDeviceRows2] = useState<DeviceRow[]>([]);
  // const [newHeaders2, setNewHeaders2] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  // const [headers2, setHeaders2] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);

  // useEffect(() => {
  //   if (LaborData?.wiring_ins && Array.isArray(LaborData.wiring_ins)) {
  //     const allHeaders = LaborData.wiring_ins.flatMap((section) => {
  //       const headerObject = {
  //         header: section.header || "",
  //         rows: [],
  //       };

  //       if (
  //         Array.isArray(section.sub_headers) &&
  //         section.sub_headers.length > 0
  //       ) {
  //         section.sub_headers.forEach((sub) => {
  //           const subHeaderObject = {
  //             title: sub.sub_header || "",
  //             manuallyAdded: false, // fetched = not manually added
  //             rows: sub.items.map((item) => ({
  //               item: item.item || "",
  //               ratio: item.ratio || "",
  //               unit: item.unit || "",
  //               quantity: item.quantity?.toString() || "",
  //               manpower: item.manpower?.toString() || "",
  //               no_of_days: item.no_of_days?.toString() || "",
  //               labor_cost: item.labor_cost?.toString() || "",
  //               per_unit_cost: item.per_unit_cost?.toString() || "",
  //             })),
  //           };
  //           headerObject.rows.push(subHeaderObject);
  //         });
  //       }

  //       // Fallback: Items without sub-headers
  //       if (section.items && section.items.length > 0) {
  //         headerObject.rows.push({
  //           title: "", // no title
  //           manuallyAdded: false,
  //           rows: section.items.map((item) => ({
  //             item: item.item || "",
  //             ratio: item.ratio || "",
  //             unit: item.unit || "",
  //             quantity: item.quantity?.toString() || "",
  //             manpower: item.manpower?.toString() || "",
  //             no_of_days: item.no_of_days?.toString() || "",
  //             labor_cost: item.labor_cost?.toString() || "",
  //             per_unit_cost: item.per_unit_cost?.toString() || "",
  //           })),
  //         });
  //       }

  //       return headerObject;
  //     });

  //     setNewHeaders2(allHeaders); // <- update your newHeaders2 state
  //   }
  // }, [LaborData]);
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
    if (LaborData?.wiring_ins && Array.isArray(LaborData.wiring_ins)) {
      const allHeaders: MappedHeader[] = LaborData.wiring_ins.map((section) => {
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
      });

      setNewHeaders5(allHeaders);
    }
  }, [LaborData]);
  // const addHeader2 = () => {
  //   setNewHeaders2([
  //     ...newHeaders2,
  //     {
  //       title: "",
  //       rows: [
  //         {
  //           item: "",
  //           description: "",
  //           quantity: "",
  //           unitPrice: "",
  //           amount: "",
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

  //   const updateNewHeaderRow2 = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     key: keyof DeviceRow,
  //     value: string
  //   ) => {
  //     const updated = [...newHeaders2];
  //     const row = updated[headerIndex].rows[rowIndex];
  //     row[key] = value;

  //     const quantity = parseFloat(row.quantity);
  //     const unitPrice = parseFloat(row.unitPrice);
  //     row.amount =
  //       !isNaN(quantity) && !isNaN(unitPrice)
  //         ? (quantity * unitPrice).toFixed(2)
  //         : "";

  //     setNewHeaders2(updated);
  //   };
  // const updateNewHeaderRow2 = (
  //   headerIndex: number,
  //   subIndex: number,
  //   rowIndex: number,
  //   key: keyof DeviceRow,
  //   value: string
  // ) => {
  //   const updated = [...newHeaders2];
  //   const row = updated[headerIndex].rows[subIndex].rows[rowIndex];

  //   row[key] = value;

  //   const quantity = parseFloat(row.quantity || "0");
  //   const unitPrice = parseFloat(row.unitPrice || "0");

  //   row.amount =
  //     !isNaN(quantity) && !isNaN(unitPrice)
  //       ? (quantity * unitPrice).toFixed(2)
  //       : "";

  //   setNewHeaders2(updated);
  // };

  // const addRowToNewHeader2 = (headerIndex, subIndex) => {
  //   const updatedHeaders2 = [...newHeaders2];
  //   updatedHeaders2[headerIndex].rows[subIndex].rows.push({
  //     item: "",
  //     ratio: "",
  //     unit: "",
  //     quantity: "",
  //     manpower: "",
  //     no_of_days: "",
  //     labor_cost: "",
  //     per_unit_cost: "",
  //   });
  //   setNewHeaders2(updatedHeaders2);
  // };

  //   const removeRowFromNewHeader2 = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...newHeaders2];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setNewHeaders2(updated);
  //   };
  // const removeRowFromNewHeader2 = (headerIndex, subIndex, rowIndex) => {
  //   const updatedHeaders2 = [...newHeaders2];
  //   updatedHeaders2[headerIndex].rows[subIndex].rows.splice(rowIndex, 1);
  //   setNewHeaders2(updatedHeaders2);
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
  // const getNewHeaderSubtotal2 = (rows: DeviceRow[]) => {
  //   return rows.reduce((sum, row) => {
  //     const amount = parseFloat(row.amount);
  //     return sum + (isNaN(amount) ? 0 : amount);
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

  // useEffect(() => {
  //   if (LaborData?.material_header) {
  //     const headersFromMaterial = LaborData.material_header.map((header) => ({
  //       title: header.header || "Untitled Header",
  //       rows: header.items.map((item) => ({
  //         item: item.item,
  //         description: item.description,
  //         quantity: item.quantity.toString(),
  //         unit_of_measurement: item.unit_of_measurement,
  //         srp: item.srp.toString(),
  //         amount: item.total_amount.toString(),
  //       })),
  //     }));

  //     setNewHeaders2(headersFromMaterial);
  //   }
  // }, [LaborData]);

  // const [deviceRows3, setDeviceRows3] = useState<DeviceRow[]>([]);
  // const [newHeaders3, setNewHeaders3] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  // const [headers3, setHeaders3] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);

  // useEffect(() => {
  //   if (
  //     LaborData?.device_installations &&
  //     Array.isArray(LaborData.device_installations)
  //   ) {
  //     const allHeaders = LaborData.device_installations.flatMap((section) => {
  //       const headerObject = {
  //         header: section.header || "",
  //         rows: [],
  //       };

  //       if (
  //         Array.isArray(section.sub_headers) &&
  //         section.sub_headers.length > 0
  //       ) {
  //         section.sub_headers.forEach((sub) => {
  //           const subHeaderObject = {
  //             title: sub.sub_header || "",
  //             manuallyAdded: false, // fetched = not manually added
  //             rows: sub.items.map((item) => ({
  //               item: item.item || "",
  //               ratio: item.ratio || "",
  //               unit: item.unit || "",
  //               quantity: item.quantity?.toString() || "",
  //               manpower: item.manpower?.toString() || "",
  //               no_of_days: item.no_of_days?.toString() || "",
  //               labor_cost: item.labor_cost?.toString() || "",
  //               per_unit_cost: item.per_unit_cost?.toString() || "",
  //             })),
  //           };
  //           headerObject.rows.push(subHeaderObject);
  //         });
  //       }

  //       // Fallback: Items without sub-headers
  //       if (section.items && section.items.length > 0) {
  //         headerObject.rows.push({
  //           title: "", // no title
  //           manuallyAdded: false,
  //           rows: section.items.map((item) => ({
  //             item: item.item || "",
  //             ratio: item.ratio || "",
  //             unit: item.unit || "",
  //             quantity: item.quantity?.toString() || "",
  //             manpower: item.manpower?.toString() || "",
  //             no_of_days: item.no_of_days?.toString() || "",
  //             labor_cost: item.labor_cost?.toString() || "",
  //             per_unit_cost: item.per_unit_cost?.toString() || "",
  //           })),
  //         });
  //       }

  //       return headerObject;
  //     });

  //     setNewHeaders3(allHeaders); // <- update your newHeaders2 state
  //   }
  // }, [LaborData]);
  // const addHeader3 = () => {
  //   setNewHeaders3([
  //     ...newHeaders3,
  //     {
  //       title: "",
  //       rows: [
  //         {
  //           item: "",
  //           description: "",
  //           quantity: "",
  //           unitPrice: "",
  //           amount: "",
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
  // const updateNewHeaderRow3 = (
  //   headerIndex: number,
  //   subIndex: number,
  //   rowIndex: number,
  //   key: keyof DeviceRow,
  //   value: string
  // ) => {
  //   const updated = [...newHeaders3];
  //   const row = updated[headerIndex].rows[subIndex].rows[rowIndex];

  //   row[key] = value;

  //   const quantity = parseFloat(row.quantity || "0");
  //   const unitPrice = parseFloat(row.unitPrice || "0");

  //   row.amount =
  //     !isNaN(quantity) && !isNaN(unitPrice)
  //       ? (quantity * unitPrice).toFixed(2)
  //       : "";

  //   setNewHeaders3(updated);
  // };
  //   const addRowToNewHeader3 = (headerIndex: number) => {
  //     const updated = [...newHeaders3];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: "",
  //       unitPrice: "",
  //       amount: "",
  //     });
  //     setNewHeaders3(updated);
  //   };
  // const addRowToNewHeader3 = (headerIndex, subIndex) => {
  //   const updatedHeaders3 = [...newHeaders3];
  //   updatedHeaders3[headerIndex].rows[subIndex].rows.push({
  //     item: "",
  //     ratio: "",
  //     unit: "",
  //     quantity: "",
  //     manpower: "",
  //     no_of_days: "",
  //     labor_cost: "",
  //     per_unit_cost: "",
  //   });
  //   setNewHeaders3(updatedHeaders3);
  // };

  //   const removeRowFromNewHeader3 = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...newHeaders3];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setNewHeaders3(updated);
  //   };
  // const removeRowFromNewHeader3 = (headerIndex, subIndex, rowIndex) => {
  //   const updatedHeaders3 = [...newHeaders3];
  //   updatedHeaders3[headerIndex].rows[subIndex].rows.splice(rowIndex, 1);
  //   setNewHeaders3(updatedHeaders3);
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
  // const getNewHeaderSubtotal3 = (rows: DeviceRow[]) => {
  //   return rows.reduce((sum, row) => {
  //     const amount = parseFloat(row.amount);
  //     return sum + (isNaN(amount) ? 0 : amount);
  //   }, 0);
  // };

  // const getTotalAmountIncludingNew3 = () => {
  //   const savedTotal = headers3.reduce((sum, header) => {
  //     return sum + getHeaderSubtotal(header.rows);
  //   }, 0);

  //   const newHeadersTotal = newHeaders3.reduce((sum, newHeader) => {
  //     return sum + getNewHeaderSubtotal3(newHeader.rows);
  //   }, 0);

  //   return savedTotal + newHeadersTotal;
  // };
  // const removeDeviceRow3 = (index: number) => {
  //   const updated = [...deviceRows3];
  //   updated.splice(index, 1);
  //   setDeviceRows3(updated);
  // };
  // useEffect(() => {
  //   if (LaborData?.labor_header) {
  //     const headersFromLabor = LaborData.labor_header.map((header) => ({
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
  // }, [LaborData]);

  // useEffect(() => {
  //   if (LaborData?.labor_items) {
  //     const laborItemsFormatted: DeviceRow[] = LaborData.labor_items.map(
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
  // }, [LaborData]);

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

  // const [deviceRows4, setDeviceRows4] = useState<DeviceRow[]>([]);

  // const [newHeaders4, setNewHeaders4] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  // const [headers4, setHeaders4] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);

  // useEffect(() => {
  //   if (LaborData?.configurations && Array.isArray(LaborData.configurations)) {
  //     const allHeaders = LaborData.configurations.flatMap((section) => {
  //       const headerObject = {
  //         header: section.header || "",
  //         rows: [],
  //       };

  //       if (
  //         Array.isArray(section.sub_headers) &&
  //         section.sub_headers.length > 0
  //       ) {
  //         section.sub_headers.forEach((sub) => {
  //           const subHeaderObject = {
  //             title: sub.sub_header || "",
  //             manuallyAdded: false, // fetched = not manually added
  //             rows: sub.items.map((item) => ({
  //               item: item.item || "",
  //               ratio: item.ratio || "",
  //               unit: item.unit || "",
  //               quantity: item.quantity?.toString() || "",
  //               manpower: item.manpower?.toString() || "",
  //               no_of_days: item.no_of_days?.toString() || "",
  //               labor_cost: item.labor_cost?.toString() || "",
  //               per_unit_cost: item.per_unit_cost?.toString() || "",
  //             })),
  //           };
  //           headerObject.rows.push(subHeaderObject);
  //         });
  //       }

  //       // Fallback: Items without sub-headers
  //       if (section.items && section.items.length > 0) {
  //         headerObject.rows.push({
  //           title: "", // no title
  //           manuallyAdded: false,
  //           rows: section.items.map((item) => ({
  //             item: item.item || "",
  //             ratio: item.ratio || "",
  //             unit: item.unit || "",
  //             quantity: item.quantity?.toString() || "",
  //             manpower: item.manpower?.toString() || "",
  //             no_of_days: item.no_of_days?.toString() || "",
  //             labor_cost: item.labor_cost?.toString() || "",
  //             per_unit_cost: item.per_unit_cost?.toString() || "",
  //           })),
  //         });
  //       }

  //       return headerObject;
  //     });

  //     setNewHeaders4(allHeaders); // <- update your newHeaders2 state
  //   }
  // }, [LaborData]);

  // const updateDeviceRow4 = (
  //   rowIndex: number,
  //   key: keyof DeviceRow,
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
  // const addHeader4 = () => {
  //   setNewHeaders4([
  //     ...newHeaders4,
  //     {
  //       title: "",
  //       rows: [
  //         {
  //           item: "",
  //           description: "",
  //           quantity: "",
  //           unit_of_measurement: "",
  //           amount: "",
  //         },
  //       ],
  //     },
  //   ]);
  // };

  // const updateNewHeaderTitle4 = (index: number, value: string) => {
  //   const updated = [...newHeaders4];
  //   updated[index].title = value;
  //   setNewHeaders4(updated);
  // };

  //   const updateNewHeaderRow4 = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     key: keyof DeviceRow,
  //     value: string
  //   ) => {
  //     const updated = [...newHeaders4];
  //     const row = updated[headerIndex].rows[rowIndex];
  //     row[key] = value;

  //     const quantity = parseFloat(row.quantity);
  //     const unitPrice = parseFloat(row.unit_of_measurement);
  //     row.amount =
  //       !isNaN(quantity) && !isNaN(unitPrice)
  //         ? (quantity * unitPrice).toFixed(2)
  //         : "";

  //     setNewHeaders4(updated);
  //   };
  // const updateNewHeaderRow4 = (
  //   headerIndex: number,
  //   subIndex: number,
  //   rowIndex: number,
  //   key: keyof DeviceRow,
  //   value: string
  // ) => {
  //   const updated = [...newHeaders4];
  //   const row = updated[headerIndex].rows[subIndex].rows[rowIndex];

  //   row[key] = value;

  //   const quantity = parseFloat(row.quantity || "0");
  //   const unitPrice = parseFloat(row.unitPrice || "0");

  //   row.amount =
  //     !isNaN(quantity) && !isNaN(unitPrice)
  //       ? (quantity * unitPrice).toFixed(2)
  //       : "";

  //   setNewHeaders4(updated);
  // };
  //   const addRowToNewHeader4 = (headerIndex: number) => {
  //     const updated = [...newHeaders4];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: "",
  //       unit_of_measurement: "",
  //       amount: "",
  //     });
  //     setNewHeaders4(updated);
  //   };
  // const addRowToNewHeader4 = (headerIndex, subIndex) => {
  //   const updatedHeaders4 = [...newHeaders4];
  //   updatedHeaders4[headerIndex].rows[subIndex].rows.push({
  //     item: "",
  //     ratio: "",
  //     unit: "",
  //     quantity: "",
  //     manpower: "",
  //     no_of_days: "",
  //     labor_cost: "",
  //     per_unit_cost: "",
  //   });
  //   setNewHeaders4(updatedHeaders4);
  // };

  //   const removeRowFromNewHeader4 = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...newHeaders4];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setNewHeaders4(updated);
  //   };
  // const removeRowFromNewHeader4 = (headerIndex, subIndex, rowIndex) => {
  //   const updatedHeaders4 = [...newHeaders4];
  //   updatedHeaders4[headerIndex].rows[subIndex].rows.splice(rowIndex, 1);
  //   setNewHeaders4(updatedHeaders4);
  // };
  // const saveNewHeader4 = (index: number) => {
  //   const headerToSave = newHeaders4[index];
  //   if (!headerToSave.title.trim()) return;
  //   setHeaders4([...headers4, headerToSave]);
  //   const updated = [...newHeaders4];
  //   updated.splice(index, 1);
  //   setNewHeaders4(updated);
  // };

  // const cancelNewHeader4 = (index: number) => {
  //   const updated = [...newHeaders4];
  //   updated.splice(index, 1);
  //   setNewHeaders4(updated);
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
  //   useEffect(() => {
  //     if (LaborData?.general_header) {
  //       const headersFromGeneral = LaborData.general_header.map((header) => ({
  //         title: header.item || "General Header",
  //         rows: [
  //           {
  //             item: header.item || "",
  //             description: header.description || "",
  //             unit_of_measurement: header.unit_of_measurement || "",
  //             quantity: header.quantity || 0,
  //             srp: header.srp || 0,
  //             amount: header.header_sub_total?.toString() || "0",
  //           },
  //         ],
  //       }));

  //       setNewHeaders4(headersFromGeneral);
  //     }
  //   }, [LaborData]);
  // useEffect(() => {
  //   if (LaborData?.labor_items) {
  //     const laborItemsFormatted: DeviceRow[] = LaborData.labor_items.map(
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
  // }, [LaborData]);
  //   useEffect(() => {
  //     if (LaborData?.general_header) {
  //       // Flatten the general_header data to populate deviceRows4
  //       const rowsFromGeneral = LaborData.general_header.flatMap((header) =>
  //         header.items.map((item) => ({
  //           item: item.item || "",
  //           description: item.description || "",
  //           quantity: item.quantity?.toString() || "", // Ensure this is a string for input
  //           unit_of_measurement: item.unit_of_measurement || "",
  //           amount: (item.quantity * item.srp).toFixed(2),
  //         }))
  //       );

  //       // Update deviceRows4 with the extracted rows
  //       setDeviceRows4(rowsFromGeneral);
  //     }
  //   }, [LaborData]);
  //   useEffect(() => {
  //     if (LaborData?.general_header) {
  //       setDeviceRows4((prevRows) => {
  //         const rowsFromGeneral = LaborData.general_header.flatMap(
  //           (header, hIndex) =>
  //             header.items.map((item, iIndex) => {
  //               const existing = prevRows.find(
  //                 (row) =>
  //                   row.item === item.item &&
  //                   row.description === item.description &&
  //                   row.quantity === item.quantity?.toString()
  //               );

  //               return {
  //                 item: item.item || "",
  //                 description: item.description || "",
  //                 quantity: item.quantity?.toString() || "",
  //                 unit_of_measurement: item.unit_of_measurement || "",
  //                 amount: (item.quantity * item.srp).toFixed(2),
  //                 subrows: existing?.subrows || [], // 🛠 Preserve existing subrows
  //               };
  //             })
  //         );

  //         return rowsFromGeneral;
  //       });
  //     }
  //   }, [LaborData]);
  // useEffect(() => {
  //   if (LaborData?.general_header) {
  //     const rowsFromGeneral = LaborData.general_header.map((header) => {
  //       return {
  //         item: header.item || "",
  //         description: header.description || "",
  //         quantity: header.quantity?.toString() || "",
  //         unit_of_measurement: header.unit_of_measurement || "",
  //         amount: ((header.quantity || 0) * (header.srp || 0)).toFixed(2),
  //         srp: header.srp?.toString() || "0",
  //         subrows:
  //           header.items?.map((item) => ({
  //             item: item.item || "",
  //             description: item.description || "",
  //             quantity: item.quantity?.toString() || "",
  //             unit_of_measurement: item.unit_of_measurement || "",
  //             amount: ((item.quantity || 0) * (item.srp || 0)).toFixed(2),
  //           })) || [],
  //       };
  //     });

  //     setDeviceRows4(rowsFromGeneral);
  //   }
  // }, [LaborData]);

  //   useEffect(() => {
  //     if (LaborData?.general_header) {
  //       const generalRowsFormatted: DeviceRow[] = LaborData.general_header.map(
  //         (general) => ({
  //           item: general.item || "",
  //           description: general.description || "",
  //           quantity: general.quantity?.toString() || "0",
  //           unitPrice: general.description?.toString() || "0",
  //           amount:
  //             (parseFloat(general.quantity) * parseFloat(general.srp)).toFixed(
  //               2
  //             ) || "0",
  //         })
  //       );

  //       setDeviceRows4(generalRowsFormatted);
  //     }
  //   }, [LaborData]);

  // const addSubRow4 = (rowIndex: number) => {
  //   const updatedRows = [...deviceRows4];
  //   const currentRow = updatedRows[rowIndex];

  //   const newSubRow = {
  //     item: "",
  //     description: "",
  //     quantity: "",
  //     unit_of_measurement: "",
  //     amount: "",
  //   };

  //   if (!currentRow.subrows) {
  //     currentRow.subrows = [];
  //   }

  //   currentRow.subrows.push(newSubRow);
  //   setDeviceRows4(updatedRows);
  // };

  // const updateSubRow4 = (
  //   rowIndex: number,
  //   subRowIndex: number,
  //   key: keyof SubRow,
  //   value: string
  // ) => {
  //   setDeviceRows4((prevRows) => {
  //     const updatedRows = [...prevRows];
  //     const subrow = updatedRows[rowIndex].subrows?.[subRowIndex];
  //     if (subrow) {
  //       subrow[key] = value;

  //       // Update amount if quantity or unit price changed
  //       const quantity = parseFloat(subrow.quantity || "0");
  //       const unitPrice = parseFloat(subrow.unit_of_measurement || "0");
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

  // 5

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
    if (
      LaborData?.testing_and_commissionings &&
      Array.isArray(LaborData.testing_and_commissionings)
    ) {
      const allHeaders: MappedHeader[] =
        LaborData.testing_and_commissionings.map((section) => {
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
        });

      setNewHeaders5(allHeaders);
    }
  }, [LaborData]);

  const updateDeviceRow5 = (
    rowIndex: number,
    key: keyof DeviceRow,
    value: string | number
  ) => {
    setDeviceRows5((prevRows) => {
      const updated = [...prevRows];
      updated[rowIndex] = {
        ...updated[rowIndex],
        [key]: value,
      };
      return updated;
    });
  };
  // const addHeader5 = () => {
  //   setNewHeaders5([
  //     ...newHeaders5,
  //     {
  //       title: "",
  //       rows: [
  //         {
  //           item: "",
  //           description: "",
  //           quantity: "",
  //           unit_of_measurement: "",
  //           amount: "",
  //         },
  //       ],
  //     },
  //   ]);
  // };

  // const updateNewHeaderTitle5 = (index: number, value: string) => {
  //   const updated = [...newHeaders4];
  //   updated[index].title = value;
  //   setNewHeaders4(updated);
  // };

  //   const updateNewHeaderRow5 = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     key: keyof DeviceRow,
  //     value: string
  //   ) => {
  //     const updated = [...newHeaders4];
  //     const row = updated[headerIndex].rows[rowIndex];
  //     row[key] = value;

  //     const quantity = parseFloat(row.quantity);
  //     const unitPrice = parseFloat(row.unit_of_measurement);
  //     row.amount =
  //       !isNaN(quantity) && !isNaN(unitPrice)
  //         ? (quantity * unitPrice).toFixed(2)
  //         : "";

  //     setNewHeaders4(updated);
  //   };
  // const updateNewHeaderRow5 = (
  //   headerIndex: number,
  //   subIndex: number,
  //   rowIndex: number,
  //   key: keyof DeviceRow,
  //   value: string
  // ) => {
  //   const updated = [...newHeaders5];
  //   const row = updated[headerIndex].rows[subIndex].rows[rowIndex];

  //   row[key] = value;

  //   const quantity = parseFloat(row.quantity || "0");
  //   const unitPrice = parseFloat(row.unitPrice || "0");

  //   row.amount =
  //     !isNaN(quantity) && !isNaN(unitPrice)
  //       ? (quantity * unitPrice).toFixed(2)
  //       : "";

  //   setNewHeaders5(updated);
  // };
  type RowItemField = keyof MappedRowItem;
  const updateSubHeaderTitle5 = (
    headerIndex: number,
    subIndex: number,
    title: string
  ) => {
    const updatedHeaders = [...newHeaders5];
    if (updatedHeaders[headerIndex]?.rows[subIndex]) {
      updatedHeaders[headerIndex].rows[subIndex].title = title;
      setNewHeaders5(updatedHeaders);
    }
  };
  const updateNewHeaderRow5 = (
    headerIndex: number,
    subIndex: number,
    rowIndex: number,
    field: RowItemField,
    value: string
  ) => {
    const updatedHeaders = [...newHeaders5];
    if (
      updatedHeaders[headerIndex] &&
      updatedHeaders[headerIndex].rows[subIndex] &&
      updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex]
    ) {
      updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex][field] = value;
      setNewHeaders5(updatedHeaders);
    }
  };
  //   const addRowToNewHeader5 = (headerIndex: number) => {
  //     const updated = [...newHeaders4];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: "",
  //       unit_of_measurement: "",
  //       amount: "",
  //     });
  //     setNewHeaders4(updated);
  //   };
  // const addRowToNewHeader5 = (headerIndex, subIndex) => {
  //   const updatedHeaders5 = [...newHeaders5];
  //   updatedHeaders5[headerIndex].rows[subIndex].rows.push({
  //     item: "",
  //     ratio: "",
  //     unit: "",
  //     quantity: "",
  //     manpower: "",
  //     no_of_days: "",
  //     labor_cost: "",
  //     per_unit_cost: "",
  //   });
  //   setNewHeaders5(updatedHeaders5);
  // };
  const addRowToNewHeader5 = (headerIndex: number, subIndex: number) => {
    const updatedHeaders: MappedHeader[] = [...newHeaders5];

    // Ensure safety before mutating
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

      setNewHeaders5(updatedHeaders);
    }
  };

  const removeRowFromNewHeader5 = (
    headerIndex: number,
    subIndex: number,
    rowIndex: number
  ) => {
    const updatedHeaders = [...newHeaders5];
    if (
      updatedHeaders[headerIndex] &&
      updatedHeaders[headerIndex].rows[subIndex] &&
      updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex]
    ) {
      updatedHeaders[headerIndex].rows[subIndex].rows.splice(rowIndex, 1);
      setNewHeaders5(updatedHeaders);
    }
  };
  // const removeRowFromNewHeader5 = (headerIndex, subIndex, rowIndex) => {
  //   const updatedHeaders5 = [...newHeaders5];
  //   updatedHeaders5[headerIndex].rows[subIndex].rows.splice(rowIndex, 1);
  //   setNewHeaders(updatedHeaders5);
  // };

  // const saveNewHeader5 = (index: number) => {
  //   const headerToSave = newHeaders4[index];
  //   if (!headerToSave.title.trim()) return;
  //   setHeaders4([...headers4, headerToSave]);
  //   const updated = [...newHeaders4];
  //   updated.splice(index, 1);
  //   setNewHeaders4(updated);
  // };

  // const cancelNewHeader5 = (index: number) => {
  //   const updated = [...newHeaders4];
  //   updated.splice(index, 1);
  //   setNewHeaders4(updated);
  // };
  // const getNewHeaderSubtotal5 = (rows: DeviceRow[]) => {
  //   return rows.reduce((sum, row) => {
  //     const amount = parseFloat(row.amount);
  //     return sum + (isNaN(amount) ? 0 : amount);
  //   }, 0);
  // };

  // const getTotalAmountIncludingNew5 = () => {
  //   const savedTotal = headers4.reduce((sum, header) => {
  //     return sum + getHeaderSubtotal(header.rows);
  //   }, 0);

  //   const newHeadersTotal = newHeaders4.reduce((sum, newHeader) => {
  //     return sum + getNewHeaderSubtotal5(newHeader.rows);
  //   }, 0);

  //   return savedTotal + newHeadersTotal;
  // };
  const updateNewHeaderMainTitle5 = (headerIndex: number, value: string) => {
    const updatedHeaders = [...newHeaders5];
    if (updatedHeaders[headerIndex]) {
      updatedHeaders[headerIndex].header = value;
      setNewHeaders5(updatedHeaders);
    }
  };
  const removeDeviceRow5 = (index: number) => {
    const updated = [...deviceRows5];
    updated.splice(index, 1);
    setDeviceRows5(updated);
  };
  //   useEffect(() => {
  //     if (LaborData?.general_header) {
  //       const headersFromGeneral = LaborData.general_header.map((header) => ({
  //         title: header.item || "General Header",
  //         rows: [
  //           {
  //             item: header.item || "",
  //             description: header.description || "",
  //             unit_of_measurement: header.unit_of_measurement || "",
  //             quantity: header.quantity || 0,
  //             srp: header.srp || 0,
  //             amount: header.header_sub_total?.toString() || "0",
  //           },
  //         ],
  //       }));

  //       setNewHeaders4(headersFromGeneral);
  //     }
  //   }, [LaborData]);
  // useEffect(() => {
  //   if (LaborData?.labor_items) {
  //     const laborItemsFormatted: DeviceRow[] = LaborData.labor_items.map(
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
  // }, [LaborData]);
  //   useEffect(() => {
  //     if (LaborData?.general_header) {
  //       // Flatten the general_header data to populate deviceRows4
  //       const rowsFromGeneral = LaborData.general_header.flatMap((header) =>
  //         header.items.map((item) => ({
  //           item: item.item || "",
  //           description: item.description || "",
  //           quantity: item.quantity?.toString() || "", // Ensure this is a string for input
  //           unit_of_measurement: item.unit_of_measurement || "",
  //           amount: (item.quantity * item.srp).toFixed(2),
  //         }))
  //       );

  //       // Update deviceRows4 with the extracted rows
  //       setDeviceRows4(rowsFromGeneral);
  //     }
  //   }, [LaborData]);
  //   useEffect(() => {
  //     if (LaborData?.general_header) {
  //       setDeviceRows4((prevRows) => {
  //         const rowsFromGeneral = LaborData.general_header.flatMap(
  //           (header, hIndex) =>
  //             header.items.map((item, iIndex) => {
  //               const existing = prevRows.find(
  //                 (row) =>
  //                   row.item === item.item &&
  //                   row.description === item.description &&
  //                   row.quantity === item.quantity?.toString()
  //               );

  //               return {
  //                 item: item.item || "",
  //                 description: item.description || "",
  //                 quantity: item.quantity?.toString() || "",
  //                 unit_of_measurement: item.unit_of_measurement || "",
  //                 amount: (item.quantity * item.srp).toFixed(2),
  //                 subrows: existing?.subrows || [], // 🛠 Preserve existing subrows
  //               };
  //             })
  //         );

  //         return rowsFromGeneral;
  //       });
  //     }
  //   }, [LaborData]);
  // useEffect(() => {
  //   if (LaborData?.general_header) {
  //     const rowsFromGeneral = LaborData.general_header.map((header) => {
  //       return {
  //         item: header.item || "",
  //         description: header.description || "",
  //         quantity: header.quantity?.toString() || "",
  //         unit_of_measurement: header.unit_of_measurement || "",
  //         amount: ((header.quantity || 0) * (header.srp || 0)).toFixed(2),
  //         srp: header.srp?.toString() || "0",
  //         subrows:
  //           header.items?.map((item) => ({
  //             item: item.item || "",
  //             description: item.description || "",
  //             quantity: item.quantity?.toString() || "",
  //             unit_of_measurement: item.unit_of_measurement || "",
  //             amount: ((item.quantity || 0) * (item.srp || 0)).toFixed(2),
  //           })) || [],
  //       };
  //     });

  //     setDeviceRows5(rowsFromGeneral);
  //   }
  // }, [LaborData]);

  //   useEffect(() => {
  //     if (LaborData?.general_header) {
  //       const generalRowsFormatted: DeviceRow[] = LaborData.general_header.map(
  //         (general) => ({
  //           item: general.item || "",
  //           description: general.description || "",
  //           quantity: general.quantity?.toString() || "0",
  //           unitPrice: general.description?.toString() || "0",
  //           amount:
  //             (parseFloat(general.quantity) * parseFloat(general.srp)).toFixed(
  //               2
  //             ) || "0",
  //         })
  //       );

  //       setDeviceRows4(generalRowsFormatted);
  //     }
  //   }, [LaborData]);

  // const addSubRow5 = (rowIndex: number) => {
  //   const updatedRows = [...deviceRows4];
  //   const currentRow = updatedRows[rowIndex];

  //   const newSubRow = {
  //     item: "",
  //     description: "",
  //     quantity: "",
  //     unit_of_measurement: "",
  //     amount: "",
  //   };

  //   if (!currentRow.subrows) {
  //     currentRow.subrows = [];
  //   }

  //   currentRow.subrows.push(newSubRow);
  //   setDeviceRows4(updatedRows);
  // };

  // const updateSubRow5 = (
  //   rowIndex: number,
  //   subRowIndex: number,
  //   key: keyof SubRow,
  //   value: string
  // ) => {
  //   setDeviceRows5((prevRows) => {
  //     const updatedRows = [...prevRows];
  //     const subrow = updatedRows[rowIndex].subrows?.[subRowIndex];
  //     if (subrow) {
  //       subrow[key] = value;

  //       // Update amount if quantity or unit price changed
  //       const quantity = parseFloat(subrow.quantity || "0");
  //       const unitPrice = parseFloat(subrow.unit_of_measurement || "0");
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
  // const removeSubRow5 = (rowIndex: number, subRowIndex: number) => {
  //   setDeviceRows5((prevRows) => {
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
  return (
    <>
      {activeNav === 5 && (
        <>
          <div className="space-y-1">
            {/* <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() =>
                  setDeviceRows5([
                    ...deviceRows5,
                    {
                      item: "",
                      description: "",
                      quantity: "",
                      unit_of_measurement: "",
                      amount: "",
                      subrows: [], // Add this!
                    },
                  ])
                }
              >
                Add Row
              </button>
            </div> */}

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm text-left border">
                <thead className="bg-gray-100 dark:bg-gray-dark">
                  <tr>
                    <th className="px-4 py-2">Item4</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Unit Price</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceRows5.map((row, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={row.item}
                            onChange={(e) =>
                              updateDeviceRow5(index, "item", e.target.value)
                            }
                            className="w-full border p-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={row.description}
                            onChange={(e) =>
                              updateDeviceRow5(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full border p-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            value={row.quantity}
                            onChange={(e) => {
                              const quantity = e.target.value;
                              const amount = (
                                parseFloat(quantity) *
                                parseFloat(row.unit_of_measurement || "0")
                              ).toFixed(2);
                              updateDeviceRow5(index, "quantity", quantity);
                              updateDeviceRow5(index, "amount", amount);
                            }}
                            className="w-full border p-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={row.unit_of_measurement || ""}
                            onChange={(e) => {
                              const unitPrice = e.target.value;
                              const amount = (
                                parseFloat(row.quantity || "0") *
                                parseFloat(unitPrice)
                              ).toFixed(2);
                              updateDeviceRow5(
                                index,
                                "unit_of_measurement",
                                unitPrice
                              );
                              updateDeviceRow5(index, "amount", amount);
                            }}
                            className="w-full border p-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={row.amount}
                            readOnly
                            className="w-full border p-1 rounded bg-gray-100 text-gray-700"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex flex-col gap-1">
                            <button
                              type="button"
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => removeDeviceRow5(index)}
                            >
                              Remove
                            </button>
                            {/* <button
                              type="button"
                              className="bg-blue-500 text-white px-2 py-1 rounded"
                              onClick={() => addSubRow5(index)}
                            >
                              + Subrow
                            </button> */}
                          </div>
                        </td>
                      </tr>

                      {/* Subrows (if any) */}
                      {/* {row.subrows?.map((subrow, subIndex) => (
                        <tr key={subIndex}>
                          <td className="px-4 py-2 pl-10">
                            <input
                              type="text"
                              value={subrow.item}
                              onChange={(e) =>
                                updateSubRow5(
                                  index,
                                  subIndex,
                                  "item",
                                  e.target.value
                                )
                              }
                              className="w-full border p-1 rounded"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={subrow.description}
                              onChange={(e) =>
                                updateSubRow5(
                                  index,
                                  subIndex,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="w-full border p-1 rounded"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={subrow.quantity}
                              onChange={(e) => {
                                const quantity = e.target.value;
                                const amount = (
                                  parseFloat(quantity) *
                                  parseFloat(subrow.unit_of_measurement || "0")
                                ).toFixed(2);
                                updateSubRow5(
                                  index,
                                  subIndex,
                                  "quantity",
                                  quantity
                                );
                                updateSubRow5(
                                  index,
                                  subIndex,
                                  "amount",
                                  amount
                                );
                              }}
                              className="w-full border p-1 rounded"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={subrow.unit_of_measurement || ""}
                              onChange={(e) => {
                                const unitPrice = e.target.value;
                                const amount = (
                                  parseFloat(subrow.quantity || "0") *
                                  parseFloat(unitPrice)
                                ).toFixed(2);
                                updateSubRow5(
                                  index,
                                  subIndex,
                                  "unit_of_measurement",
                                  unitPrice
                                );
                                updateSubRow5(
                                  index,
                                  subIndex,
                                  "amount",
                                  amount
                                );
                              }}
                              className="w-full border p-1 rounded"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={subrow.amount}
                              readOnly
                              className="w-full border p-1 rounded bg-gray-100 text-gray-700"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <button
                              type="button"
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => removeSubRow5(index, subIndex)}
                            >
                              Remove Subrow
                            </button>
                          </td>
                        </tr>
                      ))} */}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              {newHeaders5.map((header, headerIndex) => (
                <div key={headerIndex} className="mb-8">
                  {/* Main Header Title & First Sub Header Title in a single line */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    {/* Main Header Title */}
                    <input
                      type="text"
                      placeholder="Main Header Title"
                      value={header.header || ""}
                      onChange={(e) =>
                        updateNewHeaderMainTitle5(headerIndex, e.target.value)
                      }
                      // onChange={(e) =>
                      //   updateNewHeaderMainTitle(headerIndex, e.target.value)
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
                            updateSubHeaderTitle5(
                              headerIndex,
                              0,
                              e.target.value
                            ) // ✅ use index 0
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
                                updateSubHeaderTitle5(
                                  headerIndex,
                                  subIndex,
                                  e.target.value
                                )
                              }
                              className="flex-1 min-w-[200px] p-2 border-2 border-blue-500 rounded text-center font-semibold"
                            />
                          </div>
                        )}

                      {/* Table */}
                      <div className="mt-2 text-left">
                        <button
                          type="button"
                          className="bg-white uppercase text-black border border-black px-4 py-2 rounded"
                          onClick={() =>
                            addRowToNewHeader5(headerIndex, subIndex)
                          }
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
                                        updateNewHeaderRow5(
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
                                      removeRowFromNewHeader5(
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
                          onClick={() =>
                            addRowToNewHeader5(headerIndex, subIndex)
                          }
                        >
                          Add Row
                        </button>
                      </div> */}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="text-right text-xl font-bold mt-6">
              {/* Total Amount: ₱{getTotalAmountIncludingNew5().toFixed(2)} */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ActiveNav5;
