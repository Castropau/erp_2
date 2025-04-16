
import { getCookies } from "@/server/getToken";

// Reusable user-type structure for salesman, approved_by, etc.

interface Items{
    id: number,
    item: string,
    description: string,
    unit_price: number,
    quantity: number,
}
export interface UpdateView {
  id: number | string;
  items: Items,
  to_vendor: string,
  address: string,
  tin: string,
  contact_number: string,


}


export async function updateView(id: number, viewData: UpdateView ): Promise<UpdateView> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/purchase_orders/${id}/`, {
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




