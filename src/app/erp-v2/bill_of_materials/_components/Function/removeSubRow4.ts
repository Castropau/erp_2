import { Dispatch, SetStateAction } from "react";

interface SubRowss {
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  srp: string;
  amount: string | number;
}

interface DeviceRows12345 {
  subrows: SubRowss[];
  description: string;
  quantity: number;
  unit_of_measurement: string;
  amount: string | number;
  srp: number | string;
  total_amount: string;
  item: string;
}

export const removeSubRow4 = (
  rowIndex: number,
  subRowIndex: number,
  deviceRows4: DeviceRows12345[],
  setDeviceRows4: Dispatch<SetStateAction<DeviceRows12345[]>>
) => {
  const updatedRows = [...deviceRows4];
  const currentSubRows = updatedRows[rowIndex].subrows || [];

  const newSubRows = currentSubRows.filter((_, i) => i !== subRowIndex);

  updatedRows[rowIndex] = {
    ...updatedRows[rowIndex],
    subrows: newSubRows,
  };

  setDeviceRows4(updatedRows);
};
