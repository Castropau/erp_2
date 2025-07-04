/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface CashList {
  id: number; // id as an integer
  serial_no: string;
  special_instructions: string;
  grand_total: string;
  requested_by: string;
  date_requested: string;
  status: string;
}

export async function fetchCashList(): Promise<CashList[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/requisitions/cash`, {
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
    const response = await api.get<CashList[]>("/api/v1/requisitions/cash/", {
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