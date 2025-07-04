
// import { getCookies } from "@/server/getToken";
import { api } from "../api";


export interface UpdateWithdraw {
    // id: number,
  name_of_requestor: number;
  // created_by: number;
  date_of_request: string;
  date_needed: string;
  purpose: string;
  material_items: Material[];
}

interface Material{
    // id: number,
     inventory_item: number;
    quantity: number;

}

// interface Inventories{
//     // id: number,
//     item: string,
//     quantity: number,
//     unit_of_measurement: string,
//     specification: string,
//     description: string,
//     serial: string,
// }

export async function updateWithdraw(id: number, viewData: UpdateWithdraw ): Promise<UpdateWithdraw> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/requisitions/material/${id}/`, {
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
    const response = await api.put<UpdateWithdraw>(`/api/v1/requisitions/material/${id}/`, viewData, {
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



