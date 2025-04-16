import { getCookies } from "@/server/getToken";


interface Items{
    id: number;
    order: string;
    quantity: string;
    description: string,
    
}

export interface AddDelivery{
  id: number; 
  items: Items[],
  date: string,
  date_released: string,
  created_by: string,
  delivered_to: string,
  tin: string,
  business_style: string,
  address: string,
  note: string,
  terms: string,
  po_no: string,
  or_no: string,
  salesman: number,
  approved_by: number,
  released_by: number,
}



export async function AddDelivery(deliveryData: AddDelivery): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/delivery_receipts/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryData),
    }
  );
  if (!response.ok) {
    // throw new Error("Registration failed");
    console.log("error submit");
  }
  return response.json();
}