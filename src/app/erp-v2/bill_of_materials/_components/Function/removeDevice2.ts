import { Dispatch, SetStateAction } from "react";

interface DeviceRows123 {
  description: string;
  quantity: number; // ⚠️ If this should be a string, change to `quantity: string`
  unit_of_measurement: string;
  amount: string;
  srp: number;
  total_amount: string;
  item: string;
}

export const removeDeviceRow2 = (
  index: number,
  deviceRows2: DeviceRows123[],
  setDeviceRows2: Dispatch<SetStateAction<DeviceRows123[]>>
) => {
  const updated = [...deviceRows2];
  updated.splice(index, 1);
  setDeviceRows2(updated);
};
