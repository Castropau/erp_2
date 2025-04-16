
import { getCookies } from "@/server/getToken";

interface Client{
    id: number,
    client: string,
    address: string,
    position: string,
    contact_person: string,
    contact_number: string,
    email: string,

}
interface Quatations{
        id: number,
        total: string,
        order: number,
        item: string,
        description: string,
        quantity: number,
        srp: number,
}

interface CreatedBy{
    id: number,
    username: string,
    full_name: string,
    role: string,
    department: string,
    contact_number: string,
}
export interface UpdateView {
    id: number | string,
  quotation: string,
  project_name: string,
  delivery_address: string,
  client: Client,
  quotation_items: Quatations,
  sub_total: string,
  discount: number,
  total: string,
  vat_value: number,
  vat_total: string,
  grand_total: string,
  notes_assumptions: string,
  terms_conditions: string,
  created_by: CreatedBy,
  date_created: string,
}

export async function updateView(id: number, viewData: UpdateView ): Promise<UpdateView> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/quotations/${id}/`, {
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




