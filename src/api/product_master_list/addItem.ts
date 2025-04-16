import { getCookies } from "@/server/getToken";

export interface Item{
  
 vendor: number,
 category: number,
 item: string,
 brand: string,
 model: string,
 unit_of_measurement: string,
 unit_price: number,
 srp: number,
 vat_percentage: number,
 vat_exempted: boolean,
 description: string,
}

export async function CreateItem(NewItem: Item): Promise<Item> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/items/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewItem),
    }
  );
  if (!response.ok) {
    // throw new Error("Registration failed");
    console.log("error submit");
  }
  return response.json();
}