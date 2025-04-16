
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
 category: string,
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


export async function updateView(id: number, viewData: UpdateView ): Promise<UpdateView> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/items/${id}/`, {
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




