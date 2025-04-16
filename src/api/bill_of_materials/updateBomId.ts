import { User } from "@/interfaces/User";
import { getCookies } from "@/server/getToken";


interface Client{
    id: number,
    client: string,
}
interface Sic{
    id: number,
    full_name: string,
}

interface Eic{
    id: number,
   full_name: string,
}

interface DeviceItem{
    id: number;
    item: string,
    description: string,
    quantity: number,
    srp: number,
    unit_of_measurement: string,
    total_amount: number,
    order: number,
}
export interface updateBomId{
   id: number,
   project_name: string,
   project_site: string,
   date: string,
   client: Client,

   sic: Sic,
   eic: Eic,
    status: string,
    first_header: string,

    device_items: DeviceItem,
}

export async function updatebomId(id: number, bomDataId: updateBomId ): Promise<updateBomId> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/boms/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bomDataId),
  });
  if (!response.ok) {
    throw new Error("Network response was not okkk");
  }
  return response.json();
}