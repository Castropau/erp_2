// addrownewheader.ts
import { Dispatch, SetStateAction } from "react";

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

interface HeaderType {
  title: string;
  rows: DeviceRows2[];
}

export const addRowToNewHeader2 = (
  headerIndex: number,
  newHeaders: HeaderType[],
  setNewHeaders: Dispatch<SetStateAction<HeaderType[]>>
) => {
  const updated = [...newHeaders];
  updated[headerIndex].rows.push({
    item: "",
    description: "",
    quantity: 0,
    unit_of_measurement: "",
    srp: 0,
    unitPrice: "",
    total_amount: "",
    amount: "",
    subrows: "",
  });
  setNewHeaders(updated);
};
