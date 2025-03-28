import { User } from "@/interfaces/User";
import { getCookies } from "@/server/getToken";




interface CashItems{
    id: number;
    item: string;
    supplier: string;
    unit_of_measurement: string;
    quantity: number;
    unit_price: number;
    description: string;
}

// interface CancelledBy{
//   id: number; 
//   username: string; 
//   full_name: string; 
//   role: string; 
//   department: string;
//   contact_number: string; 
// }


export interface updateCashId {
   requested_by: number;
   cash_requisition_items: CashItems;
   cancelled_by: string;
   special_instructions: string;
   project_name: string;
   delivery_address: string;
   date_requested: string;
   date_noted: string;
   date_approved: string;
   status: string;
   discount: string;
   vat_percentage: number;
   less_ewt: number;
//    noted_by: number;
//    approved_by: number;
   


}

export async function updateCashId(id: number, CashDataId: updateCashId ): Promise<updateCashId> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/requisitions/cash/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(CashDataId),
  });
  if (!response.ok) {
    throw new Error("Network response was not okkk");
  }
  return response.json();
}