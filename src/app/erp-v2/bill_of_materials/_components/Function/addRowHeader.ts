import { Dispatch, SetStateAction } from "react";

interface DeviceRow {
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

interface Header {
  title: string;
  rows: DeviceRow[];
}

export const addRowToNewHeader = (
  headerIndex: number,
  newHeaders: Header[],
  setNewHeaders: Dispatch<SetStateAction<Header[]>>
) => {
  const updated = [...newHeaders];
  updated[headerIndex].rows.push({
    item: "",
    description: "",
    quantity: 0,
    unit_of_measurement: "",
    srp: 0,
    amount: "",
    total_amount: "",
    subrows: [],
    unitPrice: "",
  });
  setNewHeaders(updated);
};
