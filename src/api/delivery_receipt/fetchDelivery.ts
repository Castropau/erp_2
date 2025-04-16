/** server actions */
import { getCookies } from "@/server/getToken";

export interface Delivery {
  id: number; // id as an integer
  date: string;
  delivered_to: string;
//   client: string;
  address: string;
  po_no: string;
  or_no: string;
  email: string;
  
}

export async function fetchDeliveryList(): Promise<Delivery[]> {
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/delivery_receipts/", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// const sampleData: Pick<DepartmentsList, 'department'> = {
//     department: ''
// }