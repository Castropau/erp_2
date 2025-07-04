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

export const updateNewHeaderTitle2 = (
  headerIndex: number,
  newTitle: string,
  newHeaders: HeaderType[],
  setNewHeaders2: Dispatch<SetStateAction<HeaderType[]>>
) => {
  const updatedHeaders = [...newHeaders];
  updatedHeaders[headerIndex].title = newTitle;
  setNewHeaders2(updatedHeaders);
};
