// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface ItemDetails {
  
  id: string;
  item_name: string;
  description: string;
  brand: string;
  model: string;
  quantity: number;
  unit_of_measurement: string;
  srp: number;
}

export async function FetchItemDetails(id: string): Promise<ItemDetails> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/items/${id}`,  // Assuming your endpoint takes id as a parameter
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
    const response = await api.get<ItemDetails>(`/api/v1/items/${id}/`, {
    //   headers: {
    //     Authorization: `Bearer ${token?.value}`,
    //   },
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch BOM with ID ${id}:`, error);
    throw new Error("Failed to fetch BOM details.");
  }
}