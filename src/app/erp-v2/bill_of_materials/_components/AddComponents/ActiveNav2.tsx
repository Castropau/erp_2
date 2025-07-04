import React, { useState } from "react";

interface DeviceRow {
  // item: string;
  // description: string;
  // quantity: string;
  // unit_of_measurement: string;
  // srp: number;
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

interface Header {
  title: string;
  rows: DeviceRow[];
}

interface ActiveNav2Props {
  deviceRows2: DeviceRow[];
  setDeviceRows2: React.Dispatch<React.SetStateAction<DeviceRow[]>>;
  newHeaders2: Header[];
  addHeader2: () => void;
  updateNewHeaderTitle2: (headerIndex: number, newTitle: string) => void;
  updateNewHeaderRow2: (
    headerIndex: number,
    rowIndex: number,
    field: keyof DeviceRow,
    newValue: string
  ) => void;
  addRowToNewHeader2: (headerIndex: number) => void;
  removeRowFromNewHeader2: (headerIndex: number, rowIndex: number) => void;
  cancelNewHeader2: (headerIndex: number) => void;
  getNewHeaderSubtotal: (rows: DeviceRow[]) => number;
}

const ActiveNav2 = ({
  deviceRows2,
  setDeviceRows2,
  newHeaders2,
  addHeader2,
  updateNewHeaderTitle2,
  updateNewHeaderRow2,
  addRowToNewHeader2,
  removeRowFromNewHeader2,
  cancelNewHeader2,
}: // getNewHeaderSubtotal,
ActiveNav2Props) => {
  const [activeNav] = useState(2);
  //   const [deviceRows2, setDeviceRows2] = useState<DeviceRow[]>([]);
  //   const [newHeaders2, setNewHeaders2] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);
  // const [headers2, setHeaders2] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  //   const addHeader2 = () => {
  //     setNewHeaders2([
  //       ...newHeaders2,
  //       {
  //         title: "",
  //         rows: [
  //           {
  //             item: "",
  //             description: "",
  //             quantity: "",
  //             unitPrice: "",
  //             amount: "",
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
  //   const addRowToNewHeader2 = (headerIndex: number) => {
  //     const updated = [...newHeaders2];
  //     updated[headerIndex].rows.push({
  //       item: "",
  //       description: "",
  //       quantity: "",
  //       unitPrice: "",
  //       amount: "",
  //     });
  //     setNewHeaders2(updated);
  //   };

  //   const removeRowFromNewHeader2 = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...newHeaders2];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setNewHeaders2(updated);
  //   };
  //   const saveNewHeader2 = (index: number) => {
  //     const headerToSave = newHeaders2[index];
  //     if (!headerToSave.title.trim()) return;
  //     setHeaders2([...headers2, headerToSave]);
  //     const updated = [...newHeaders2];
  //     updated.splice(index, 1);
  //     setNewHeaders2(updated);
  //   };

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

  // const getTotalAmountIncludingNew2 = () => {
  //   const savedTotal = headers2.reduce((sum, header) => {
  //     return sum + getHeaderSubtotal(header.rows);
  //   }, 0);

  //   const newHeadersTotal = newHeaders2.reduce((sum, newHeader) => {
  //     return sum + getNewHeaderSubtotal(newHeader.rows);
  //   }, 0);

  //   return savedTotal + newHeadersTotal;
  // };
  const removeDeviceRow2 = (index: number) => {
    const updated = [...deviceRows2];
    updated.splice(index, 1);
    setDeviceRows2(updated);
  };
  return (
    <>
      {activeNav === 2 && (
        <>
          <div className="space-y-6">
            <div className="flex justify-end gap-4">
              {/* <button
                            type="button"
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
                          </button> */}
              {/* <button
                type="button"
                className="bg-white border border-black text-black uppercase px-4 py-2 rounded hover:bg-blue-600"
                onClick={addHeader2}
              >
                Add Header
              </button> */}
            </div>

            {/* Device Table */}

            <table className="table-auto w-full text-sm text-left  border">
              <thead className="bg-gray-100 dark:bg-gray-dark dark:text-white uppercase">
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
                        className="bg-white border border-red-800 text-red-800  px-3 py-1 rounded"
                        onClick={() => removeDeviceRow2(idx)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="bg-white border text-xs border-black mt-2 text-black uppercase px-4 py-2 rounded"
              onClick={addHeader2}
            >
              Add Header
            </button>

            {/* New Header Forms */}
            {newHeaders2.map((header, headerIndex) => (
              <div
                key={headerIndex}
                className="w-full border p-2 bg-white rounded mt-4 text-xs dark:bg-gray-dark"
              >
                {/* Header Controls */}
                <div className="flex justify-between items-center gap-2 mb-2">
                  <div className="flex-1">
                    <button
                      type="button"
                      className="bg-white border border-black text-black text-[10px] px-3 py-[4px] rounded uppercase"
                      onClick={() => addRowToNewHeader2(headerIndex)}
                    >
                      Add Row
                    </button>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <input
                      type="text"
                      placeholder="Header Title"
                      value={header.title}
                      onChange={(e) =>
                        updateNewHeaderTitle2(headerIndex, e.target.value)
                      }
                      className="p-[4px] border border-gray-200 rounded text-xs text-center w-60"
                    />
                  </div>

                  <div className="flex-1" />
                </div>

                {/* Table for Rows */}
                <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                  <table
                    style={{ width: "100%" }}
                    className="table table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg"
                  >
                    <thead className="bg-white text-black border-b-gray-400">
                      <tr className="text-sm font-medium text-center uppercase">
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Unit</th>
                        <th className="px-4 py-2">Unit Price</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {header.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {[
                            "item",
                            "description",
                            "quantity",
                            "unit_of_measurement",
                            "srp",
                          ].map((field) => (
                            <td key={field}>
                              <input
                                type={
                                  field === "quantity" || field === "srp"
                                    ? "number"
                                    : "text"
                                }
                                placeholder={field}
                                value={row[field as keyof DeviceRow]}
                                onChange={(e) =>
                                  updateNewHeaderRow2(
                                    headerIndex,
                                    rowIndex,
                                    field as keyof DeviceRow,
                                    e.target.value
                                  )
                                }
                                className="w-full p-2 text-center rounded-md"
                              />
                            </td>
                          ))}
                          <td className="p-2 flex justify-center">
                            <button
                              type="button"
                              className="text-red-700 hover:underline text-[10px] uppercase"
                              onClick={() =>
                                removeRowFromNewHeader2(headerIndex, rowIndex)
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

                {/* Subtotal and Remove Header */}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-semibold">
                    Subtotal: ₱
                    {/* {getNewHeaderSubtotal2(header.rows).toFixed(2)} */}
                  </span>
                  <button
                    type="button"
                    className="bg-white border border-black text-black text-[10px] px-3 py-[4px] rounded uppercase"
                    onClick={() => cancelNewHeader2(headerIndex)}
                  >
                    Remove Header
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* <button
            type="button"
            className="bg-white border border-black mt-2 text-black uppercase px-4 py-2 rounded"
            onClick={addHeader2}
          >
            Add Header
          </button> */}
          <div className="text-right text-xl font-bold mt-6">
            {/* Total Amount: ₱{getTotalAmountIncludingNew2().toFixed(2)} */}
          </div>
        </>
      )}
    </>
  );
};

export default ActiveNav2;
