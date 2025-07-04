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

export const removeRowFromNewHeader3 = (
  headerIndex: number,
  rowIndex: number,
  newHeaders: HeaderType[],
  setNewHeaders3: Dispatch<SetStateAction<HeaderType[]>>
) => {
  setNewHeaders3((prevHeaders) => {
    const updatedHeaders = [...prevHeaders];
    updatedHeaders[headerIndex].rows.splice(rowIndex, 1);
    return updatedHeaders;
  });
};
