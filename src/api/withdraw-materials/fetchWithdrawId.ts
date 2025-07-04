
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

interface NameOfReq{
    id: number,
    full_name: string,

}

interface InventorySystem{
    id: number,
    item: string,
    quantity: string,
    unit_of_measurement: string,
    specification: string,
description: string,
serial: string,

}
interface MaterialItems{
    id: number,
    inventory_item: InventorySystem,
    quantity: number,
    status: string
    
}

export interface FetchInventoryId {
    id: number,
    material_items: MaterialItems[],
   name_of_requestor: NameOfReq
date_of_request: string,
date_needed: string,
purpose: string,
    serial_no: string,
}

export async function fetchWithdrawDataById(id: number): Promise<FetchInventoryId> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/requisitions/material/${id}/`,
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
    const response = await api.get<FetchInventoryId>(`/api/v1/requisitions/material/${id}/`, {
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






