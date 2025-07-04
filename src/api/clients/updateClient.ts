
// import { getCookies } from "@/server/getToken";
import { api } from "../api";


export interface UpdateClient {
    id: number | string,
    
   created_by: string,
   date_created: string,
   client: string,
   address: string,
   contact_person: string,
   position: string,
   contact_number: string,
   email: string,
   

}

export async function updateClient(id: number, viewData: UpdateClient ): Promise<UpdateClient> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/clients/${id}/`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(viewData),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not okkk");
//   }
//   return response.json();
// }


try {
    const response = await api.put<UpdateClient>(`/api/v1/clients/${id}/`, viewData, {
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

