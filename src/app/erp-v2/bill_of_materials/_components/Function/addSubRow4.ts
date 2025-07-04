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

export const addSubRow4 = (
  rowIndex: number,
  deviceRows4: DeviceRows12345[],
  setDeviceRows4: Dispatch<SetStateAction<DeviceRows12345[]>>
) => {
  const updatedRows = [...deviceRows4];
  const currentRow = updatedRows[rowIndex];

  const newSubRow: SubRowss = {
    item: "",
    description: "",
    quantity: 0,
    unit_of_measurement: "",
    srp: "",
    amount: "0.00",
  };

  if (!currentRow.subrows) {
    currentRow.subrows = [];
  }

  currentRow.subrows.push(newSubRow);
  setDeviceRows4(updatedRows);
};
