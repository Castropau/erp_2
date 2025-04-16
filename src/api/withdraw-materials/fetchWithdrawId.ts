
import { getCookies } from "@/server/getToken";

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
  const token = await getCookies("token");
  const response = await fetch(
    `http://192.168.0.249:8001/api/v1/requisitions/material/${id}/`,
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







