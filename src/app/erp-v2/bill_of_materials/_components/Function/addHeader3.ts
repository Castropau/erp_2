import { Dispatch, SetStateAction } from "react";

interface DeviceRows2 {
  subrows?: any;
  unitPrice: string;
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: number;
  srp: number;
  total_amount: string;
  amount: string;
}

interface HeaderType {
  title: string;
  rows: DeviceRows2[];
}

export const addHeader3 = (
  newHeaders3: HeaderType[],
  setNewHeaders3: Dispatch<SetStateAction<HeaderType[]>>
) => {
  setNewHeaders3([
    ...newHeaders3,
    {
      title: "",
      rows: [
        {
          item: "",
          description: "",
          quantity: 0,
          unit_of_measurement: 0,
          srp: 0,
          unitPrice: "",
          amount: "",
          total_amount: "",
          subrows: "", // optional now
        },
      ],
    },
  ]);
};
