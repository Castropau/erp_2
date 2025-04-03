/** server actions */
import { getCookies } from "@/server/getToken";

export interface ChequeLists {
  special_instructions: string;
  id: number; // id as an integer
  serial_no: string; // serial number as a string
  purpose: string; // purpose of the cheque as a string
  grand_total: string;
  requested_by: string;
  date_requested: string;
  status: boolean;
}

export async function fetchChequesLists(): Promise<ChequeLists[]> {
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/requisitions/cheque/", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// Fetch single cheque by ID

