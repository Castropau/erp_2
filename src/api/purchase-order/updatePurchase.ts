
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

// Reusable user-type structure for salesman, approved_by, etc.

interface Items{
    // id: number,
    item: string,
    description: string,
    unit_price: number,
    quantity: number,
}
export interface UpdateView {
  // id: number | string,
  items: Items[],
  to_vendor: string,
  // address: string,
  // tin: string,
  // contact_number: string,
  terms: string,
  discount: number,
  vat_percentage: number,
  vendor: number,


}


export async function updateView(id: number | string, viewData: UpdateView ): Promise<UpdateView> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/purchase_orders/${id}/`, {
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
    const response = await api.put<UpdateView>(`/api/v1/purchase_orders/${id}/`, viewData, {
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



