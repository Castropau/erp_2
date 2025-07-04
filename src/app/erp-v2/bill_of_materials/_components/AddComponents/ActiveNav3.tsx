import React, { useState } from "react";

// ====================
// Types & Interfaces
// ====================

interface DeviceRow {
  // unitPrice: string;
  subrows: any;
  amount: string;
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  srp: number;
  total_amount: string;
}

interface Header {
  title: string;
  rows: DeviceRow[];
}

interface ActiveNav3Props {
  deviceRows3: DeviceRow[];
  setDeviceRows3: React.Dispatch<React.SetStateAction<DeviceRow[]>>;
  newHeaders3: Header[];
  addHeader3: () => void;
  updateNewHeaderTitle3: (headerIndex: number, newTitle: string) => void;
  updateNewHeaderRow3: (
    headerIndex: number,
    rowIndex: number,
    field: keyof DeviceRow,
    newValue: string
  ) => void;
  addRowToNewHeader3: (headerIndex: number) => void;
  removeRowFromNewHeader3: (headerIndex: number, rowIndex: number) => void;
  cancelNewHeader3: (headerIndex: number) => void;
  getNewHeaderSubtotal: (rows: DeviceRow[]) => number;
}

// =====================
// Utility Function
// =====================

// export const cancelNewHeader = (
//   index: number,
//   headers: Header[],
//   setHeaders: React.Dispatch<React.SetStateAction<Header[]>>
// ) => {
//   const updated = [...headers];
//   updated.splice(index, 1);
//   setHeaders(updated);
// };

// =====================
// Component
// =====================

const ActiveNav3 = ({
  deviceRows3,
  setDeviceRows3,
  newHeaders3,
  addHeader3,
  updateNewHeaderTitle3,
  updateNewHeaderRow3,
  addRowToNewHeader3,
  removeRowFromNewHeader3,
  cancelNewHeader3,
}: // getNewHeaderSubtotal,
ActiveNav3Props) => {
  const [activeNav] = useState(3);

  // const [headers3, setHeaders3] = useState<Header[]>([]);

  //   const addHeader3 = () => {
  //     setNewHeaders3([
  //       ...newHeaders3,
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

  // const getTotalAmountIncludingNew3 = () => {
  //   const savedTotal = headers3.reduce((sum, header) => {
  //     return sum + getHeaderSubtotal(header.rows);
  //   }, 0);

  //   const newHeadersTotal = newHeaders3.reduce((sum, newHeader) => {
  //     return sum + getNewHeaderSubtotal(newHeader.rows);
  //   }, 0);

  //   return savedTotal + newHeadersTotal;
  // };
  const removeDeviceRow3 = (index: number) => {
    const updated = [...deviceRows3];
    updated.splice(index, 1);
    setDeviceRows3(updated);
  };

  const updateDeviceRow3 = (
    rowIndex: number,
    key: keyof DeviceRow,
    value: string | number
  ) => {
    setDeviceRows3((prevRows) => {
      const updated = [...prevRows];
      updated[rowIndex] = {
        ...updated[rowIndex],
        [key]: value,
      };
      return updated;
    });
  };

  return (
    <>
      {activeNav === 3 && (
        <>
          <div className="space-y-6">
            <div className="flex justify-start gap-4">
              <button
                type="button"
                className="bg-white text-xs border border-black text-black uppercase px-4 py-2 rounded"
                onClick={() =>
                  setDeviceRows3([
                    ...deviceRows3,
                    {
                      item: "",
                      description: "",
                      quantity: 0,
                      unit_of_measurement: "",
                      srp: 0,
                      // unitPrice: "",
                      amount: "",
                      subrows: undefined,
                      total_amount: "",
                    },
                  ])
                }
              >
                Add Row
              </button>
              <button
                type="button"
                className="bg-white text-xs border border-black text-black uppercase px-4 py-2 rounded"
                onClick={addHeader3}
              >
                Add Header
              </button>
              {/* <button
                type="button"
                className="bg-white border border-black text-black uppercase px-4 py-2 rounded"
                onClick={() =>
                  setDeviceRows3([
                    ...deviceRows3,
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
                className="bg-white text-black px-4 py-2 rounded border border-black uppercase"
                onClick={addHeader3}
              >
                Add Header
              </button> */}
            </div>
            {/* <button
              type="button"
              className="bg-white text-xs border border-black text-black uppercase px-4 py-2 rounded"
              onClick={() =>
                setDeviceRows3([
                  ...deviceRows3,
                  {
                    item: "",
                    description: "",
                    quantity: 0,
                    unit_of_measurement: "",
                    srp: 0,
                    unitPrice: "",
                    amount: "",
                    subrows: undefined,
                    total_amount: "",
                  },
                ])
              }
            >
              Add Row
            </button> */}
            {/* Device Table */}
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table
                style={{ width: "100%" }}
                className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg"
              >
                <thead className="bg-white text-black  border-b-gray-400">
                  <tr className="text-sm font-medium text-center uppercase">
                    <th className="px-4 py-2">Item</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Unit of measurement</th>
                    <th className="px-4 py-2">Unit Price</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceRows3.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={row.item}
                          onChange={(e) =>
                            updateDeviceRow3(index, "item", e.target.value)
                          }
                          className="w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={row.description}
                          onChange={(e) =>
                            updateDeviceRow3(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={row.quantity}
                          onChange={(e) => {
                            const updatedQuantity = parseFloat(e.target.value);
                            const updatedTotalAmount =
                              updatedQuantity * row.srp; // Recalculate total_amount based on updated quantity
                            updateDeviceRow3(
                              index,
                              "quantity",
                              updatedQuantity
                            );
                            updateDeviceRow3(
                              index,
                              "total_amount",
                              updatedTotalAmount
                            ); // Update the total_amount field
                          }}
                          className="w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={row.unit_of_measurement}
                          onChange={(e) =>
                            updateDeviceRow3(
                              index,
                              "unit_of_measurement",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={row.srp} // Fetch only the srp (unit price) value from your API data
                          onChange={(e) => {
                            const updatedSrp = parseFloat(e.target.value);
                            const updatedTotalAmount =
                              row.quantity * updatedSrp; // Recalculate total_amount based on updated SRP
                            updateDeviceRow3(index, "srp", updatedSrp);
                            updateDeviceRow3(
                              index,
                              "total_amount",
                              updatedTotalAmount
                            ); // Update total_amount
                          }}
                          className="w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
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
                          className="w-full border border-gray-200 p-1 rounded bg-gray-100 dark:bg-gray-dark dark:text-white"
                        />
                      </td>

                      <td className="px-4 py-2">
                        <button
                          className="hover:cursor-pointer ml-2 text-xs text-red-700 hover:underline uppercase"
                          onClick={() => removeDeviceRow3(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <button
              type="button"
              className="bg-white border border-black text-black uppercase px-4 py-2 rounded"
              onClick={() =>
                setDeviceRows3([
                  ...deviceRows3,
                  {
                    item: "",
                    description: "",
                    quantity: 0,
                    unit_of_measurement: "",
                    srp: 0,
                    unitPrice: "",
                    amount: "",
                    subrows: undefined,
                    total_amount: "",
                  },
                ])
              }
            >
              Add Row
            </button> */}
            {/* New Header Forms */}
            {newHeaders3.map((header, headerIndex) => (
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
                      onClick={() => addRowToNewHeader3(headerIndex)}
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
                        updateNewHeaderTitle3(headerIndex, e.target.value)
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
                                  updateNewHeaderRow3(
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
                                removeRowFromNewHeader3(headerIndex, rowIndex)
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
                    onClick={() => cancelNewHeader3(headerIndex)}
                  >
                    Remove Header
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* <button
            type="button"
            className="bg-white text-xs text-black px-4 py-2 mt-2 rounded border border-black uppercase"
            onClick={addHeader3}
          >
            Add Header
          </button> */}
          <div className="text-right text-xl font-bold mt-6 dark:text-white">
            {/* Total Amount: ₱{getTotalAmountIncludingNew3().toFixed(2)} */}
          </div>
        </>
      )}
    </>
  );
};

export default ActiveNav3;
