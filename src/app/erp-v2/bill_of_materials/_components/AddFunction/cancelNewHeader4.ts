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
//   unitPrice: string;
}

interface HeaderType {
  title: string;
  rows: DeviceRows2[];
}

export const cancelNewHeader4 = (
  index: number,
  newHeaders: HeaderType[],
  setNewHeaders4: Dispatch<SetStateAction<HeaderType[]>>
) => {
  const updated = [...newHeaders];
  updated.splice(index, 1);
  setNewHeaders4(updated);
};
