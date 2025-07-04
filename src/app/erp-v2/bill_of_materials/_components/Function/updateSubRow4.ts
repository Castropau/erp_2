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

export const updateSubRow4 = (
  rowIndex: number,
  subRowIndex: number,
  key: keyof SubRowss,
  value: string,
  deviceRows4: DeviceRows12345[],
  setDeviceRows4: Dispatch<SetStateAction<DeviceRows12345[]>>
) => {
  const updatedRows = [...deviceRows4];
  const subrow = updatedRows[rowIndex]?.subrows?.[subRowIndex];

  if (subrow) {
    if (key === "quantity") {
      subrow[key] = Number(value) as any;
    } else {
      subrow[key] = value as any;
    }

    const quantity = subrow.quantity;
    const srp = parseFloat(subrow.srp || "0");
    subrow.amount = (quantity * srp).toFixed(2);
  }

  setDeviceRows4(updatedRows);
};
