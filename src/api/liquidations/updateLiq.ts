import { getCookies } from "@/server/getToken";

interface Items{
    id: number;
    order: string;
    description: string;
    
}


interface TakeNotes{
    id: number;
    items: Items;
    description: string;
}
interface Liquidations{
    id: number;
    balance: string;
    date: string;
    particulars: string;
    expenses: string;
    cash_from_accounting: string;
    vat_inclusive: boolean;

}

interface RemittedBy{
    id: number;
    username: string;
    full_name: string;
    role: string;
    department: string;
    contact_number: string;

}

interface ReceivedBy{
    id: number;
     username: string;
    full_name: string;
    role: string;
    department: string;
    contact_number: string;
}
export interface Liq{
   id: number;
   liquidation_no: string;
   date_created: string;
   photos: string;
   take_notes: TakeNotes;
   liquidation_particulars: Liquidations;
   created_by: string;
   remitted_by: RemittedBy;
   received_by: ReceivedBy;
   total: string;
   project_name: string;
   date: string;
   cash_requisition: string;



}

export async function updateLiqById(id: number): Promise<Liq> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/liquidations/${id}`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}