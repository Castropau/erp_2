
import { getCookies } from "@/server/getToken";


export interface UpdateWithdraw {
    id: number,
  name_of_requestor: string;
  created_by: number;
  date_of_request: string;
  date_needed: string;
  purpose: string;
  material_items: Material[];
}

interface Material{
    id: number,
     inventory_item: Inventories;
    quantity: number;

}

interface Inventories{
    id: number,
    item: string,
    quantity: number,
    unit_of_measurement: string,
    specification: string,
    description: string,
    serial: string,
}

export async function updateWithdraw(id: number, viewData: UpdateWithdraw ): Promise<UpdateWithdraw> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/requisitions/material/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(viewData),
  });
  if (!response.ok) {
    throw new Error("Network response was not okkk");
  }
  return response.json();
}




