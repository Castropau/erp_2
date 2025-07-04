/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface RequisitionCash {
  id: number | string; // id as an integer
  serial_no: string;
  special_instructions: string;
  grand_total: string;
  requested_by: string;
  date_requested: string;
  status: string;
}

export async function fetchCashRequest(): Promise<RequisitionCash[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/requisitions/cash/`, {
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
//  const token = await getCookies("token");

  try {
    const response = await api.get<RequisitionCash[]>("/api/v1/requisitions/cash/", {
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



