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

interface DeviceRow57 {
  subrows: SubRowss[];
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  srp: string | number;
  amount: string | number;
  total_amount: string;
}

export const updateDeviceRow4 = (
  rowIndex: number,
  key: keyof DeviceRow57,
  value: string | number,
  deviceRows4: DeviceRows12345[],
  setDeviceRows4: Dispatch<SetStateAction<DeviceRows12345[]>>
) => {
  const updated = [...deviceRows4];

  updated[rowIndex] = {
    ...updated[rowIndex],
    [key]: value,
  };

  setDeviceRows4(updated);
};
