/** server actions */
import { getCookies } from "@/server/getToken";

export interface PurchaseOrder {
  id: number; // id as an integer
  po_no: string;
  vendor: string;
  grand_total: string;
  created_by: string;
  date_created: string;
//   email: string;
  
}

export async function fetchPurchaseList(): Promise<PurchaseOrder[]> {
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/purchase_orders/", {
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