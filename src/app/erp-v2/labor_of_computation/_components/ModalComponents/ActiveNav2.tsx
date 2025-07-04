import { fetchlaborId } from "@/api/labor_of_computation/FetchLaborId";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
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
const ActiveNav2 = (props: BomIds) => {
  const [activeNav] = useState(2);

  const [deviceRows2, setDeviceRows2] = useState<DeviceRow[]>([]);
  // const [newHeaders2, setNewHeaders2] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  const [newHeaders2, setNewHeaders2] = useState<MappedHeader[]>([]);

  // const [headers2, setHeaders2] = useState<
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

      setNewHeaders2(allHeaders);
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
  // const updateNewHeaderTitle2 = (headerIndex: number, value: string) => {
  //   const updatedHeaders = [...newHeaders2];
  //   if (updatedHeaders[headerIndex]) {
  //     updatedHeaders[headerIndex].header = value;
  //     setNewHeaders2(updatedHeaders);
  //   }
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
  type RowItemField = keyof MappedRowItem;

  const updateNewHeaderRow2 = (
    headerIndex: number,
    subIndex: number,
    rowIndex: number,
    field: RowItemField,
    value: string
  ) => {
    const updatedHeaders = [...newHeaders2];
    if (
      updatedHeaders[headerIndex] &&
      updatedHeaders[headerIndex].rows[subIndex] &&
      updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex]
    ) {
      updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex][field] = value;
      setNewHeaders2(updatedHeaders);
    }
  };
  const updateSubHeaderTitle2 = (
    headerIndex: number,
    subIndex: number,
    title: string
  ) => {
    const updatedHeaders = [...newHeaders2];
    if (updatedHeaders[headerIndex]?.rows[subIndex]) {
      updatedHeaders[headerIndex].rows[subIndex].title = title;
      setNewHeaders2(updatedHeaders);
    }
  };
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
  const addRowToNewHeader2 = (headerIndex: number, subIndex: number) => {
    const updatedHeaders: MappedHeader[] = [...newHeaders2];

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

      setNewHeaders2(updatedHeaders);
    }
  };
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
  const removeRowFromNewHeader2 = (
    headerIndex: number,
    subIndex: number,
    rowIndex: number
  ) => {
    const updatedHeaders = [...newHeaders2];
    if (
      updatedHeaders[headerIndex] &&
      updatedHeaders[headerIndex].rows[subIndex] &&
      updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex]
    ) {
      updatedHeaders[headerIndex].rows[subIndex].rows.splice(rowIndex, 1);
      setNewHeaders2(updatedHeaders);
    }
  };

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
  const removeDeviceRow2 = (index: number) => {
    const updated = [...deviceRows2];
    updated.splice(index, 1);
    setDeviceRows2(updated);
  };

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
  // type RowItemField = keyof MappedRowItem;

  const updateNewHeaderMainTitle2 = (headerIndex: number, value: string) => {
    const updatedHeaders = [...newHeaders2];
    if (updatedHeaders[headerIndex]) {
      updatedHeaders[headerIndex].header = value;
      setNewHeaders2(updatedHeaders);
    }
  };
  return (
    <>
      {activeNav === 2 && (
        <>
          <div className="space-y-1">
            {/* <div className="flex justify-end gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() =>
                  setDeviceRows2([
                    ...deviceRows2,
                    {
                      item: "",
                      description: "",
                      quantity: "",
                      unit_of_measurement: "",
                      srp: 0,
                    },
                  ])
                }
              >
                Add Row
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={addHeader2}
              >
                Add Header
              </button>
            </div> */}

            {/* Device Table */}
            <table className="table-auto w-full text-sm text-left  border ">
              <thead className="bg-gray-100 dark:bg-gray-dark">
                <tr>
                  <th className="px-4 py-2">Item2</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Unit Price</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {deviceRows2.map((row, idx) => (
                  <tr key={idx}>
                    {Object.keys(row).map((field) => (
                      <td key={field} className="px-4 py-2">
                        {row[field as keyof DeviceRow]}
                      </td>
                    ))}
                    <td className="px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => removeDeviceRow2(idx)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* New Header Forms */}
            {newHeaders2.map((header, headerIndex) => (
              <div key={headerIndex} className="mb-8">
                {/* Main Header Title & First Sub Header Title in a single line */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  {/* Main Header Title */}
                  <input
                    type="text"
                    placeholder="Main Header Title"
                    value={header.header || ""}
                    // onChange={(e) =>
                    //   updateNewHeaderMainTitle(headerIndex, e.target.value)
                    // }
                    onChange={(e) =>
                      updateNewHeaderMainTitle2(headerIndex, e.target.value)
                    }
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
                          updateSubHeaderTitle2(headerIndex, 0, e.target.value) // ✅ use index 0
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
                              updateSubHeaderTitle2(
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
                          addRowToNewHeader2(headerIndex, subIndex)
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
                                      updateNewHeaderRow2(
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
                                    removeRowFromNewHeader2(
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
                          addRowToNewHeader2(headerIndex, subIndex)
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
          {/* <div className="text-right text-xl font-bold mt-6">
            Total Amount: ₱{getTotalAmountIncludingNew2().toFixed(2)}
          </div> */}
        </>
      )}
    </>
  );
};

export default ActiveNav2;
