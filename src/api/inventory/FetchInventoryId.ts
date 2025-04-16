
import { getCookies } from "@/server/getToken";

interface Location{
    id: number,
  location: string,

}
export interface FetchInventoryId {
    id: number,
   description: string,
   brand: string,
   serial: string,
   model: string,
   specification: string,
   quantity: number,
   unit_of_measurement: string,
   srp: number,
   category: string,
   location: Location,
   photos: string,

    
}

export async function fetchInventoryDataById(id: number): Promise<FetchInventoryId> {
  const token = await getCookies("token");
  const response = await fetch(
    `http://192.168.0.249:8001/api/v1/inventories/${id}/`,
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







