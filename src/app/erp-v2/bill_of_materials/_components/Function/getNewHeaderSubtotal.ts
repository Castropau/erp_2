//  interface DeviceRows57 {
//     total_amount: number;
//     // unitPrice: string;
//     item: string;
//     description: string;
//     quantity: number;
//     unit_of_measurement: string;
//     amount: string;
//     srp: number; // <-- change from number to string
//   }
// export const getNewHeaderSubtotal = (rows: DeviceRows57[]) => {
//     return rows.reduce((total, row) => {
//       const srp = parseFloat(row.srp as any) || 0;
//       const quantity = parseFloat(row.quantity as any) || 0;
//       return total + quantity * srp;
//     }, 0);
//   };
interface DeviceRows57 {
  total_amount: number;
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  amount: string;
  srp: string; // <-- changed from number to string
}

export const getNewHeaderSubtotal = (rows: DeviceRows57[]): number => {
  return rows.reduce((total, row) => {
    const srp = parseFloat(row.srp) || 0;
    const quantity = Number(row.quantity) || 0;
    return total + quantity * srp;
  }, 0);
};
