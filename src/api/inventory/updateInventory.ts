
// import { getCookies } from "@/server/getToken";
import { api } from "../api";


export interface UpdateInventory {
    id: number,
    
   photos: string,
   item: string,
   brand: string,
   serial: string,
   model: string,
   specification: string,
   unit_of_measurement: string,
   srp: number,
   quantity: number,
   description: string,
   item_reference: number,
   location: number,
   category: number,
   

}

export async function updateInventory(id: number, viewData: UpdateInventory ): Promise<UpdateInventory> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/inventories/${id}/`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(viewData),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not okkk");
//   }
//   return response.json();
// }

try {
    const response = await api.put<UpdateInventory>(`/api/v1/inventories/${id}/`, viewData, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      //   "Content-Type": "application/json",
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update BOM:", error);
    throw new Error("Failed to update BOM data.");
  }
}




