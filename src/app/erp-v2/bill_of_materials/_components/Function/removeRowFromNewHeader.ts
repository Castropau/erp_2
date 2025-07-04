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

export const removeRowFromNewHeader1 = (
  headerIndex: number,
  rowIndex: number,
  newHeaders: HeaderType[],
  setNewHeaders: Dispatch<SetStateAction<HeaderType[]>>
) => {
  setNewHeaders((prevHeaders) => {
    const updatedHeaders = [...prevHeaders];
    updatedHeaders[headerIndex].rows.splice(rowIndex, 1);
    return updatedHeaders;
  });
};
