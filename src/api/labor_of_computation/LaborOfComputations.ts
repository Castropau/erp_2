/** server actions */
import { getCookies } from "@/server/getToken";

/** interfaces */
import { Role } from "@/interfaces/Role";



export interface LaborComputation {
  id: number; // id as an integer
  lc_no: string;
  bom: string;
  project_name: string;
  project_duration: string;
  system: string
}

export async function FetchLaborComputation(): Promise<LaborComputation[]> {
    const token = await getCookies("token");
    const response = await fetch(
      "http://192.168.0.249:8001/api/v1/labor_computations/",
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }