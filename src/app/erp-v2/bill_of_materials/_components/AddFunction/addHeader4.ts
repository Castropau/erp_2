import { Dispatch, SetStateAction } from "react";

interface DeviceRows2 {
  subrows: any;
//   unitPrice: string;
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  srp: number;
  total_amount: string;
  amount: string;
}

interface HeaderType {
  title: string;
  rows: DeviceRows2[];
}

export const addHeader4 = (
  newHeaders: HeaderType[],
  setNewHeaders4: Dispatch<SetStateAction<HeaderType[]>>
) => {
  setNewHeaders4([
    ...newHeaders,
    {
      title: "",
      rows: [
        {
          item: "",
          description: "",
          quantity: 0,
          unit_of_measurement: "",
          srp: 0,
        //   unitPrice: "",
          amount: "",
          total_amount: "",
          subrows: "",
        },
      ],
    },
  ]);
};
