
    

  import { Dispatch, SetStateAction } from "react";
  
  interface DeviceRows2 {
    total_amount: string;
    unitPrice: string;
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: number;
    amount: string;
    srp: number;
  }
  
  interface HeaderType {
    title: string;
    rows: DeviceRows2[];
  }
  
  export const cancelNewHeader3 = (
    index: number,
    newHeaders: HeaderType[],
    setNewHeaders3: Dispatch<SetStateAction<HeaderType[]>>
  ) => {
    const updated = [...newHeaders];
    updated.splice(index, 1);
    setNewHeaders3(updated);
  };
  