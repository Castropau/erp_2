// import { useState } from "react";

  interface DeviceRows12 {
    description: string;
    quantity: number; // <-- STRING, not number
    unit_of_measurement: string;
    amount: string;
    srp: number;
    total_amount: number;
    item: string;
  }
  
//   export const removeDeviceRow1 = (index: number) => {
//       const [deviceRows, setDeviceRows] = useState<DeviceRows12[]>([]);
    
//     const updated = [...deviceRows];
//     updated.splice(index, 1);
//     setDeviceRows(updated);
//   };
export const removeDeviceRow1 = (
  index: number,
  deviceRows: DeviceRows12[],
  setDeviceRows: React.Dispatch<React.SetStateAction<DeviceRows12[]>>
) => {
  const updated = [...deviceRows];
  updated.splice(index, 1);
  setDeviceRows(updated);
};