/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface Delivery {
  id: number | string; // id as an integer
  date: string;
  delivered_to: string;
//   client: string;
  address: string;
  po_no: string;
  or_no: string;
  email: string;
  
}

export async function fetchDeliveryList(): Promise<Delivery[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/delivery_receipts/`, {
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
try {
    const response = await api.get<Delivery[]>("/api/v1/delivery_receipts/", {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    throw new Error("Failed to fetch client list.");
  }
}
// const sampleData: Pick<DepartmentsList, 'department'> = {
//     department: ''
// }