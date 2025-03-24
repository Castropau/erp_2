/** server actions */
import { getCookies } from "@/server/getToken";

/** interfaces */
import { Role } from "@/interfaces/Role";



export interface Units {
    id: number;
    unit_of_measurement: string;
}

export async function ChequeUnits(): Promise<Units[]> {
    const token = await getCookies("token");
    const response = await fetch(
      "http://192.168.0.249:8001/api/v1/requisitions/units",
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