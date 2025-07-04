
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

// interface Client{
//     id: number,
//     client: string,
//     address: string,
//     position: string,
//     contact_person: string,
//     contact_number: string,
//     email: string,

// }
interface Quatations{
        // id: number,
        // total: string,
        // order: number,
        // item: string,
        // description: string,
        // quantity: number,
        // srp: number,
}

// interface CreatedBy{
//     id: number,
//     username: string,
//     full_name: string,
//     role: string,
//     department: string,
//     contact_number: string,
// }
export interface UpdateView {
    // id: number | string,
  // quotation: string,
  // project_name: string,
  delivery_address: string,
  // client: Client,
  // client: string,
  // quotation_items: Quatations,
  quotation_items: Quatations[],
  // sub_total: string,
  discount: number,
  // total: strinsg,
  vat_value: number,
  // vat_total: string,
  // grand_total: string,
  notes_assumptions: string,
  terms_conditions: string,
  // created_by: number,
  // date_created: string,
  
}

export async function updateView(id: number | string, viewData: UpdateView ): Promise<UpdateView> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/quotations/${id}/`, {
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
    const response = await api.put<UpdateView>(`/api/v1/quotations/${id}/`, viewData, {
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




