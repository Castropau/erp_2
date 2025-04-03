/** server actions */
import { getCookies } from "@/server/getToken";

export interface RequisitionCashOptions {
  
  id: number; // id as an integer
  serial_no: string;
  date_of_purchase: string;
  special_instructions: string;
  grand_total: string;
  requested_by: string;
  date_requested: string;
  status: string;
//   description: string;
//   date_of_purchase: string;
}

export async function fetchCashRequest(): Promise<RequisitionCashOptions[]> {
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/requisitions/cash/", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}



