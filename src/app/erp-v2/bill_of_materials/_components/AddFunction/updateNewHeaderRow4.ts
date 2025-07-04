// updateNewHeaderRow.ts
import { Dispatch, SetStateAction } from "react";

interface DeviceRoww2 {

  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  amount: string;
  srp: number;
  total_amount: string;
    subrows: any; // 👈 Add this line

}

interface HeaderType {
  title: string;
  rows: DeviceRoww2[];
}

export const updateNewHeaderRow4 = (
  headerIndex: number,
  rowIndex: number,
  field: keyof DeviceRoww2,
  newValue: string,
  newHeaders: HeaderType[],
  setNewHeaders4: Dispatch<SetStateAction<HeaderType[]>>
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

  row.amount =
    !isNaN(quantity) && !isNaN(srp) ? (quantity * srp).toFixed(2) : "";

  row.total_amount = row.amount;

  setNewHeaders4(updatedHeaders);
};
