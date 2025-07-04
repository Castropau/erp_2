/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface ChequeLists {
  cash_requisition_items: any;
  special_instructions: string;
  id: number | string; // id as an integer
  serial_no: string; // serial number as a string
  purpose: string; // purpose of the cheque as a string
  grand_total: string;
  requested_by: string;
  date_requested: string;
  status: string;
}

export async function fetchChequesLists(): Promise<ChequeLists[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/requisitions/cheque/`, {
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
    const response = await api.get<ChequeLists[]>("/api/v1/requisitions/cheque/", {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch cash list:", error);
    throw new Error("Failed to fetch cash list");
  }
}

// Fetch single cheque by ID

