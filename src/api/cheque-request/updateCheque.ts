// import { User } from "@/interfaces/User";
// import { getCookies } from "@/server/getToken";
import { api } from "../api";


export interface ChequeRequisitionItem {
  id: number;
  cash_requisition: number;
  serial_no: string;
  date_of_purchase: string;
  description: string;
  amount: number;
  cheque_number: string;
  remarks: string;
}

export interface ChequeUpdate {
  cheque_requisition_items: ChequeRequisitionItem[];
  cheque_no: string;
  name_of_organization: string;
  payable_to: string;
  address: string;
  purpose: string;
//   discount: number;
  date_requested: string | null;
//   date_noted: string | null;
//   date_approved: string | null;
//   status: string;
//   date_cancelled: string | null;
  requested_by: number;
//   noted_by: number | null;
//   approved_by: number | null;
//   cancelled_by: number | null;
}

export async function updateCheque(id: number, chequeData: ChequeUpdate ): Promise<ChequeUpdate> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/requisitions/cheque/${id}/`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(chequeData),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not okkk");
//   }
//   return response.json();
// }

try {
    const response = await api.put<ChequeUpdate>(`/api/v1/requisitions/cheque/${id}/`, chequeData, {
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


