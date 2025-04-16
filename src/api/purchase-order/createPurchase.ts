/** server actions */
import { getCookies } from "@/server/getToken";

/** interfaces */
interface Items{

    item: string,
    description: string,
    unit_price: number,
    quantity: number,
}
export interface CreatePurchase {
  // photos: string;
  
  items: Items[],
  terms: string,
  discount: number,
  vat_percentage: number,
  vendor: number,
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreatePurchase(NewPurchase: CreatePurchase): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/purchase_orders/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewPurchase),
    }
  );
  if (!response.ok) {
    // throw new Error("Registration failed");
    console.log("error submit");
  }
  return response.json();
}