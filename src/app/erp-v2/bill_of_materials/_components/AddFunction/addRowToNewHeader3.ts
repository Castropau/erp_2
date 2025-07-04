// Type definitions
export interface DeviceRow5 {
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  srp: number;
  total_amount: string;
  amount: string;
  subrows: any;
  unitPrice: string;
}

export interface Header5 {
  title: string;
  rows: DeviceRow5[];
}

// Function to add a row to a specific header
export const addRowToNewHeader3 = (
  headerIndex: number,
  newHeaders: Header5[],
  setNewHeaders3: React.Dispatch<React.SetStateAction<Header5[]>>
) => {
  const updated = [...newHeaders];
  updated[headerIndex].rows.push({
    item: "",
    description: "",
    quantity: 0,
    unit_of_measurement: "",
    srp: 0,
    amount: "",
    subrows: undefined,
    total_amount: "",
    unitPrice: "",
  });
  setNewHeaders3(updated);
};
