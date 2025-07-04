// import { User } from "@/interfaces/User";
// import { getCookies } from "@/server/getToken";
import { api } from "../api";




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
   cash_requisition_items: CashItems[];
   cancelled_by: number;
   special_instructions: string;
   project_name: string;
   delivery_address: string;
   date_requested: string;
   date_noted: string;
   date_approved: string;
   status: string;
   discount: number;
   vat_percentage: number;
   less_ewt: number;
//    noted_by: number;
//    approved_by: number;
   


}

export async function updateCashId(id: number, CashDataId: updateCashId ): Promise<updateCashId> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/requisitions/cash/${id}/`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(CashDataId),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not okkk");
//   }
//   return response.json();
// }
// const token = await getCookies("token");

  try {
    const response = await api.put<updateCashId>(`/api/v1/requisitions/cash/${id}/`, CashDataId, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      //   "Content-Type": "application/json",
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update BOM:", error);
    throw new Error("Failed to update BOM data.");
  }
}