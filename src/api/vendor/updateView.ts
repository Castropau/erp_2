
// import { getCookies } from "@/server/getToken";
import { api } from "../api";


export interface UpdateView {
    // id: number | string,
    
   vendor: string,
   address: string,
   country: string,
   contact_person: string,
   contact_number: string,
   email: string,
   tin: string,
   bank_details: string,
   description: string,

}

export async function updateView(id: number, viewData: UpdateView ): Promise<UpdateView> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/vendors/${id}/`, {
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
  // const token = await getCookies("token");

  try {
    const response = await api.put<UpdateView>(`/api/v1/vendors/${id}/`, viewData, {
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




