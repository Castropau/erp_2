// import { getCookies } from "@/server/getToken";
import { api } from "../api";

interface requestedBy{
    id: number;
    username: string;
    full_name: string;
    role: string;
    department: string;
    contact_number: string;

}
interface ChequeItems{
    id: number;
    cash_requisition: number;
    serial_no: string;
    date_of_purchase: string;
    description: string;
    amount: number;
    cheque_number: string;
    remarks: string;
}
export interface ChequeId {
  special_instructions: string;
  id: number; // id as an integer
  serial_no: string; // serial number as a string
  purpose: string; // purpose of the cheque as a string
  grand_total: string;
  requested_by: requestedBy;
  date_requested: string;
  status: boolean;
  cheque_requisition_items: ChequeItems[];
  name_of_organization: string;
  payable_to: string;
  address: string;
  date_of_purchase: string;
  remarks: string;
  sub_total: string;
  discount: number;
  vat_value: number;
  ewt_value: number;
  cheque_no: string;
  
} 

export async function fetchChequeById(id: string): Promise<ChequeId> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/requisitions/cheque/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
try {
    const response = await api.get<ChequeId>(`/api/v1/requisitions/cheque/${id}/`, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      // },
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch cash with ID ${id}:`, error);
    throw new Error("Failed to fetch cash details.");
  }
}