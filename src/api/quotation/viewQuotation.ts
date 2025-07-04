
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

interface Quotations{
    id: number,
    total: string,
    order: number,
    item: string,
    description: string,
    quantity: number,
    srp: number,
}

// interface CreatedBy{
//     id: number,
//  username: string,
//  full_name: string,
//  role: string,
//  department: string,
//  contact_number: string,

// }

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
   discount: number,
   total: string,
   vat_value: number,
   vat_total: string,
   grand_total: string,
   notes_assumptions: string,
   terms_conditions: string,
  //  created_by: CreatedBy,
   date_created: string,

    
}

export async function fetchQuotationDataById(id: number | string): Promise<FetchQuoId> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/quotations/${id}/`,
//     {
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//       },
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
try {
    const response = await api.get<FetchQuoId>(`/api/v1/quotations/${id}/`, {
    //   headers: {
    //     Authorization: `Bearer ${token?.value}`,
    //   },
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch BOM with ID ${id}:`, error);
    throw new Error("Failed to fetch BOM details.");
  }
}







