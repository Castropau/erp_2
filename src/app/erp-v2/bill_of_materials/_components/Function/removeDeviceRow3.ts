import { Dispatch, SetStateAction } from "react";

interface DeviceRows123 {
   description: string;
    quantity: number; // <-- STRING, not number
    unit_of_measurement: number;
    amount: string;
    srp: number | string;
    total_amount: string;
    item: string;
}

export const removeDeviceRow3 = (
  index: number,
  deviceRows2: DeviceRows123[],
  setDeviceRows3: Dispatch<SetStateAction<DeviceRows123[]>>
) => {
  const updated = [...deviceRows2];
  updated.splice(index, 1);
  setDeviceRows3(updated);
};
