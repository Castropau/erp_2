/** server actions */
import { getCookies } from "@/server/getToken";

/** interfaces */




export interface CreateInventories {
  // photos: string;
  item: string;
  brand: string;
  serial: string;
  model: string;
  specification: string;
  unit_of_measurement: string;
  srp: number;
  quantity: number;
  description: string;
  // item_reference: number;
  location: number;
  category: number;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateInventory(NewInventory: CreateInventories): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/inventories/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewInventory),
    }
  );
  if (!response.ok) {
    // throw new Error("Registration failed");
    console.log("error submit");
  }
  return response.json();
}