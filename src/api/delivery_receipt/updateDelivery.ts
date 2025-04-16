
import { getCookies } from "@/server/getToken";

// Reusable user-type structure for salesman, approved_by, etc.
interface User {
  id: number;
  username: string;
  full_name: string;
  role: string;
  department: string;
  contact_number: string;
}

interface Item {
  id: number;
  order: number;
  quantity: number;
  description: string;
}

export interface UpdateView {
  id: number | string;
  date: string;
  date_released: string;
  date_created: string;
  salesman: User;
  approved_by: User;
  released_by: User;
  created_by: User;
  delivered_to: string;
  tin: string;
  business_style: string;
  address: string;
  note: string;
  terms: string;
  po_no: string;
  or_no: string;
  items: Item[];
}


export async function updateView(id: number, viewData: UpdateView ): Promise<UpdateView> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/delivery_receipts/${id}/`, {
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




