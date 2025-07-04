/** server actions */
// import { getCookies } from "@/server/getToken";

/** interfaces */
// import { Role } from "@/interfaces/Role";
import { api } from "../api";



export interface Item {
    id: number;
    item_no: string;
    item: string,
    description: string,
    brand: string,
    model: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,
    
}

export async function FetchItemInventory(): Promise<Item[]> {
  //   const token = await getCookies("token");
  //   const response = await fetch(
  //     `${process.env.baseUrl}/api/v1/items/`,
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
      const response = await api.get<Item[]>("/api/v1/items/", {
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