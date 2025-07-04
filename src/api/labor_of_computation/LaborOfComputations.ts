/** server actions */
// import { getCookies } from "@/server/getToken";

/** interfaces */
// import { Role } from "@/interfaces/Role";
import { api } from "../api";



export interface LaborComputation {
  id: number | string; // id as an integer
  lc_no: string;
  bom: string;
  project_name: string;
  project_duration: string;
  system: string
}

export async function FetchLaborComputation(): Promise<LaborComputation[]> {
  //   const token = await getCookies("token");
  //   const response = await fetch(
  //     `${process.env.baseUrl}/api/v1/labor_computations/`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token?.value}`,
  //       },
  //     }
  //   );
  
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json();
  // }

  try {
      const response = await api.get<LaborComputation[]>("/api/v1/labor_computations/", {
        // headers: {
        //   Authorization: `Bearer ${token?.value}`,
        // },
      });
  
      return response.data;
    } catch (error) {
      console.error("Failed to fetch BOM list:", error);
      throw new Error("Failed to fetch BOM list");
    }
  }