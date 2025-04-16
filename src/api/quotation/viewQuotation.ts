
import { getCookies } from "@/server/getToken";

interface Quotations{
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

interface Client{
    id: number,
    address: string,
    contact_person: string,
    client: string,
}

export interface FetchQuoId {
    id: number | string,
    quotation_no: string,
   project_name: string,
   delivery_address: string,
   client: Client,
   quotation_items: Quotations[],
   sub_total: string,
   discount: string,
   total: string,
   vat_value: number,
   vat_total: string,
   grand_total: string,
   notes_assumptions: string,
   terms_conditions: string,
   created_by: CreatedBy,
   date_created: string,

    
}

export async function fetchQuotationDataById(id: number): Promise<FetchQuoId> {
  const token = await getCookies("token");
  const response = await fetch(
    `http://192.168.0.249:8001/api/v1/quotations/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}







