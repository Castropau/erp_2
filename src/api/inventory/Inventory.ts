/** server actions */
// import { getCookies } from "@/server/getToken";

/** interfaces */
// import { Role } from "@/interfaces/Role";
import { api } from "../api";



export interface Inventories {
  id: number | string; // id as an integer
  photos: string;
  item: string;
  specification: string;
  category: string;
  unit_of_measurement: string;
  quantity: number;
  item_no: string;
  description: string;
}

export async function FetchInventories(): Promise<Inventories[]> {
  //   const token = await getCookies("token");
  //   const response = await fetch(
  //     `${process.env.baseUrl}/api/v1/inventories/`,
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
      const response = await api.get<Inventories[]>("/api/v1/inventories/", {
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