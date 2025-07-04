import { Dispatch, SetStateAction } from "react";

interface DeviceRows2 {
  subrows: any;
//   unitPrice: string;
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  srp: number;
  total_amount: string;
  amount: string;
  unitPrice: string;
}

interface HeaderType {
  title: string;
  rows: DeviceRows2[];
}

export const cancelNewHeader = (
  index: number,
  newHeaders: HeaderType[],
  setNewHeaders: Dispatch<SetStateAction<HeaderType[]>>
) => {
  const updated = [...newHeaders];
  updated.splice(index, 1);
  setNewHeaders(updated);
};
