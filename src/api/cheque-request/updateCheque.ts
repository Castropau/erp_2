import { User } from "@/interfaces/User";
import { getCookies } from "@/server/getToken";


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
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/requisitions/cheque/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chequeData),
  });
  if (!response.ok) {
    throw new Error("Network response was not okkk");
  }
  return response.json();
}




