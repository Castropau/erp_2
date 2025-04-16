
import { getCookies } from "@/server/getToken";
interface Items{
    id: number,
    order: string,
    quantity: string,
    description: string,

}
interface Salesman{
    id: number,
    username: string,
    full_name: string,
    role: string,
    department: string,
    contact_number: string,
}

interface ApprovedBy{
    id: number,
    username: string,
    full_name: string,
    role: string,
    department: string,
    contact_number: string,

}
interface ReleasedBy{
     id: number,
    username: string,
    full_name: string,
    role: string,
    department: string,
    contact_number: string,
}
interface CreatedBy{
     id: number,
    username: string,
    full_name: string,
    role: string,
    department: string,
    contact_number: string,
}
export interface FetchReceiptId {
    id: number | string,
    items: Items,
    date: string,
    date_released: string,
    date_created: string,
    salesman: Salesman,
    approved_by: ApprovedBy,
    released_by: ReleasedBy,
    created_by: CreatedBy,
    delivered_to: string,
    tin: string,
    business_style: string,
    address: string,
    note: string,
    terms: string,
    po_no: string,
    or_no: string,
   

}

export async function fetchReceiptById(id: number): Promise<FetchReceiptId> {
  const token = await getCookies("token");
  const response = await fetch(
    `http://192.168.0.249:8001/api/v1/delivery_receipts/${id}/`,
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







