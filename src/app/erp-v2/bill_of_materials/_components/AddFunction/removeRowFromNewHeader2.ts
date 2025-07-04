import { Dispatch, SetStateAction } from "react";

interface Header5 {
  title: string;
  rows: DeviceRow5[];
}

interface DeviceRow5 {
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  srp: number;
  total_amount: string;
  amount: string;
  subrows: any;
//   unitPrice: string;
}

export const removeRowFromNewHeader2 = (
  headerIndex: number,
  rowIndex: number,
  newHeaders: Header5[],
  setNewHeaders: Dispatch<SetStateAction<Header5[]>>
) => {
  const updatedHeaders = [...newHeaders];

  // Guard check: make sure the header exists
//   if (!updatedHeaders[headerIndex]) return;

  updatedHeaders[headerIndex].rows.splice(rowIndex, 1);
  setNewHeaders(updatedHeaders);
};
