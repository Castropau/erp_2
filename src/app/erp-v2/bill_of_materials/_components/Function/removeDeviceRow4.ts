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

export const removeDeviceRow4 = (
  index: number,
  deviceRows4: DeviceRows12345[],
  setDeviceRows4: Dispatch<SetStateAction<DeviceRows12345[]>>
) => {
  const updated = [...deviceRows4];
  updated.splice(index, 1);
  setDeviceRows4(updated);
};
