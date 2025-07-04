import React, { useState } from "react";
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

interface Header {
  title: string;
  rows: DeviceRow[];
}

interface ActiveNav1Props {
  deviceRows: DeviceRow[];
  setDeviceRows: React.Dispatch<React.SetStateAction<DeviceRow[]>>;
  newHeaders: Header[];
  addHeader: () => void;
  updateNewHeaderTitle: (headerIndex: number, newTitle: string) => void;
  updateNewHeaderRow: (
    headerIndex: number,
    rowIndex: number,
    field: keyof DeviceRow,
    newValue: string
  ) => void;
  addRowToNewHeader: (headerIndex: number) => void;
  removeRowFromNewHeader: (headerIndex: number, rowIndex: number) => void;
  cancelNewHeader: (headerIndex: number) => void;
  getNewHeaderSubtotal: (rows: DeviceRow[]) => number;
}

const ActiveNav1 = ({
  deviceRows,
  setDeviceRows,
  newHeaders,
  addHeader,
  updateNewHeaderTitle,
  updateNewHeaderRow,
  addRowToNewHeader,
  removeRowFromNewHeader,
  cancelNewHeader,
}: // getNewHeaderSubtotal,
ActiveNav1Props) => {
  const [activeNav] = useState(1);
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  // const [headers, setHeaders] = useState<
  //   { title: string; rows: DeviceRow[] }[]
  // >([]);
  //   const [newHeaders, setNewHeaders] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);
  //   const [newHeaders, setNewHeaders] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);

  //   const [deviceRows, setDeviceRows] = useState<DeviceRow[]>([]);

  // const handleSave = () => {
  //   console.log("Form Data:", formData);
  //   console.log("Device Rows:", deviceRows);
  //   console.log("Headers:", headers);
  //   setShowEditModal(false);
  // };

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

  //   const saveNewHeader = (index: number) => {
  //     const headerToSave = newHeaders[index];
  //     if (!headerToSave.title.trim()) return;
  //     setHeaders([...headers, headerToSave]);
  //     const updated = [...newHeaders];
  //     updated.splice(index, 1);
  //     setNewHeaders(updated);
  //   };

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
  return (
    <>
      {activeNav === 1 && (
        <>
          <div className="space-y-1">
            <div className="flex justify-start gap-4">
              <button
                type="button"
                className="bg-white text-xs text-black border border-black px-4 py-2 rounded uppercase"
                onClick={() =>
                  setDeviceRows([
                    ...deviceRows,
                    {
                      item: "",
                      description: "",
                      quantity: 0,
                      unit_of_measurement: "",
                      srp: 0,
                      total_amount: "",
                      subrows: undefined,
                      amount: "",
                    },
                  ])
                }
              >
                Add Row
              </button>
              <div>
                <button
                  type="button"
                  className="bg-white text-xs text-black border border-black px-4 py-2 rounded uppercase"
                  onClick={addHeader}
                >
                  Add Header
                </button>
              </div>
              {/* <button
                type="button"
                className="bg-white text-black border border-black px-4 py-2 rounded uppercase"
                onClick={() =>
                  setDeviceRows([
                    ...deviceRows,
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
                onClick={addHeader}
              >
                Add Header
              </button> */}
            </div>

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
                  {deviceRows.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={row.item}
                          onChange={(e) =>
                            updateDeviceRow(index, "item", e.target.value)
                          }
                          className="w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={row.description}
                          onChange={(e) =>
                            updateDeviceRow(
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
                            updateDeviceRow(index, "quantity", updatedQuantity);
                            updateDeviceRow(
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
                            updateDeviceRow(
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
                            updateDeviceRow(index, "srp", updatedSrp);
                            updateDeviceRow(
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
                          onClick={() => removeDeviceRow(index)}
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
              className="bg-white text-xs text-black border border-black px-4 py-2 rounded uppercase"
              onClick={() =>
                setDeviceRows([
                  ...deviceRows,
                  {
                    item: "",
                    description: "",
                    quantity: 0,
                    unit_of_measurement: "",
                    srp: 0,
                    total_amount: "",
                    subrows: undefined,
                    amount: "",
                  },
                ])
              }
            >
              Add Row
            </button> */}
            {newHeaders.map((header, headerIndex) => (
              <div
                key={headerIndex}
                className="w-full border p-2 bg-white rounded mt-4 text-xs dark:bg-gray-dark"
              >
                {/* Header Controls */}
                <div className="flex justify-between items-center gap-2 mb-2">
                  <button
                    type="button"
                    className="bg-white border border-black text-black text-[10px] px-3 py-[4px] rounded uppercase"
                    onClick={() => addRowToNewHeader(headerIndex)}
                  >
                    Add Row
                  </button>
                  <input
                    type="text"
                    placeholder="Header Title"
                    value={header.title}
                    onChange={(e) =>
                      updateNewHeaderTitle(headerIndex, e.target.value)
                    }
                    className="p-[4px] border rounded text-xs text-center w-60"
                  />
                  <button
                    type="button"
                    className="bg-white border border-black text-black text-[10px] px-3 py-[4px] rounded uppercase"
                    onClick={() => cancelNewHeader(headerIndex)}
                  >
                    Remove Header
                  </button>
                </div>

                {/* Table for Header Rows */}
                <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                  <table className="table table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
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
                            <td key={field} className="">
                              <input
                                type={
                                  field === "quantity" || field === "srp"
                                    ? "number"
                                    : "text"
                                }
                                placeholder={field}
                                value={row[field as keyof DeviceRow]}
                                onChange={(e) =>
                                  updateNewHeaderRow(
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
                                removeRowFromNewHeader(headerIndex, rowIndex)
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

                {/* Subtotal */}
                <div className="text-right mt-2">
                  <span className="text-xs font-semibold">
                    Subtotal: ₱
                    {/* {getNewHeaderSubtotal(header.rows).toFixed(2)} */}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* <button
            type="button"
            className="bg-white text-black px-4 py-2 mt-2 rounded border border-black uppercase"
            onClick={addHeader}
          >
            Add Header
          </button> */}

          <div className="text-right text-xl font-bold mt-6 dark:text-white">
            {/* Total Amount: ₱{getTotalAmountIncludingNew().toFixed(2)} */}
          </div>
        </>
      )}
    </>
  );
};

export default ActiveNav1;
