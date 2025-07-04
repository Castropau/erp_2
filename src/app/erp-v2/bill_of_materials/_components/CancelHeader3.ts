// hooks/useHeaderManager.ts
import { useState } from "react";

export interface DeviceRow {
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  srp: number;
  amount: string;
  total_amount: string;
  subrows: any;
}

export interface Header {
  title: string;
  rows: DeviceRow[];
}

export const useHeaderManager = () => {
  const [newHeaders, setNewHeaders] = useState<Header[]>([]);

  const addHeader = () => {
    setNewHeaders([
      ...newHeaders,
      {
        title: "",
        rows: [
          {
            item: "",
            description: "",
            quantity: 0,
            unit_of_measurement: "",
            srp: 0,
            amount: "",
            total_amount: "",
            subrows: undefined,
          },
        ],
      },
    ]);
  };

  const cancelNewHeader = (index: number) => {
    const updated = [...newHeaders];
    updated.splice(index, 1);
    setNewHeaders(updated);
  };

  const updateNewHeaderRow = (
    headerIndex: number,
    rowIndex: number,
    field: keyof DeviceRow,
    newValue: string
  ) => {
    const updatedHeaders = [...newHeaders];
    const row = updatedHeaders[headerIndex].rows[rowIndex];

    if (field === "quantity" || field === "srp") {
      row[field] = parseFloat(newValue) as any;
    } else {
      row[field] = newValue as any;
    }

    const quantity = row.quantity;
    const srp = row.srp;
    row.amount = !isNaN(quantity) && !isNaN(srp) ? (quantity * srp).toFixed(2) : "";
    row.total_amount = row.amount;

    setNewHeaders(updatedHeaders);
  };

  return {
    newHeaders,
    setNewHeaders,
    addHeader,
    cancelNewHeader,
    updateNewHeaderRow,
  };
};
