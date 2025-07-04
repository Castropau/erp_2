// addrownewheader.ts
import { Dispatch, SetStateAction } from "react";

interface DeviceRows2 {
  total_amount: string;
    unitPrice: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: number;
    amount: string;
    srp: number;
}

interface HeaderType {
  title: string;
  rows: DeviceRows2[];
}

export const addRowToNewHeader3 = (
  headerIndex: number,
  newHeaders: HeaderType[],
  setNewHeaders3: Dispatch<SetStateAction<HeaderType[]>>
) => {
  const updated = [...newHeaders];
  updated[headerIndex].rows.push({
     item: "",
        description: "",
        quantity: 0,
        unit_of_measurement: 0,
        srp: 0,
        amount: "",
        total_amount: "",
        unitPrice: "",
  });
  setNewHeaders3(updated);
};
