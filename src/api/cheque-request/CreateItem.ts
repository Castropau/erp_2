/** server actions */
import { getCookies } from "@/server/getToken";

/** interfaces */
export interface CreateItem {
  
  item: string;
}

export async function CreateItem(NewItems: CreateItem): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/requisitions/items/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewItems),
    }
  );
  if (!response.ok) {
    console.log("error");
    throw new Error("Registration failed");
  }
  return response.json();
}