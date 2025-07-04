/** server actions */
// import { getCookies } from "@/server/getToken";

/** interfaces */
// import { Role } from "@/interfaces/Role";
import { api } from "../api";



export interface CashUnits {
    id: number;
    unit_of_measurement: string;
}

export async function CashUnits(): Promise<CashUnits[]> {
  //   const token = await getCookies("token");
  //   const response = await fetch(
  //     `${process.env.baseUrl}/api/v1/requisitions/units/`,
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
    // const token = await getCookies("token");
    
      try {
        const response = await api.get<CashUnits[]>("/api/v1/requisitions/units/", {
          // headers: {
          //   Authorization: `Bearer ${token?.value}`,
          // },
        });
    
        return response.data;
      } catch (error) {
        console.error("Failed to fetch cash units:", error);
        throw new Error("Failed to fetch cash units list.");
      }
    }