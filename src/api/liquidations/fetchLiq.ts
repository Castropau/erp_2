/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface Liquidations {
  id: number | string; // id as an integer
  liquidation_no: string; // full_name as a string
  photos: string; // department as a string
  project_name: string;
  date: string;
  remitted_by: string;
  total: string;
}

export async function fetchLiqList(): Promise<Liquidations[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/liquidations/`, {
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
    const response = await api.get<Liquidations[]>("/api/v1/liquidations/", {
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


