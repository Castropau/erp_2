
// import { getCookies } from "@/server/getToken";
import { api } from "../api";
interface Quotations{
  created_by: string,
    id: number,
    quotation_no: string,
    project_name: string,

}

export interface FetchClientId {
    id: number | string,
    
   created_by: string,
   date_created: string,

   quotations: Quotations[],
   client: string,
   address: string,
   contact_person: string,
   position: string,
   contact_number: string,
   email: string,
   

}

export async function fetchClientDataById(id: number | string): Promise<FetchClientId> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/clients/${id}/`,
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
    const response = await api.get<FetchClientId>(`/api/v1/clients/${id}/`, {
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






