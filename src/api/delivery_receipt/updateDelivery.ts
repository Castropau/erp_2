
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

// Reusable user-type structure for salesman, approved_by, etc.
// interface User {
//   id: number;
//   username: string;
//   full_name: string;
//   role: string;
//   department: string;
//   contact_number: string;
// }

interface Item {
  // id: number | string;
  order: number;
  quantity: number;
  description: string;
}

export interface UpdateView {
  // id: number | string;
  // date: string;
  // date_released: string;
  // date_created: string;
  // salesman?: number;
  // approved_by?: number;
  // released_by?: number;
  // created_by?: number;
  // delivered_to: string;
  // tin: string;
  // business_style: string;
  // address: string;
  // note: string;
  // terms: string;
  // po_no: string;
  // or_no: string;
  // items: Item[];
  // projectName: number | string;
  date_released: string;
  created_by: string;
  // receivedBy: string;
  terms: string;
  po_no: string;
  salesman: number | string;
  approved_by: number | string;
  delivered_to: string;
  tin: string;
  business_style: string;
  address: string;
  note: string;
  items: Item[];
  // notesRows: NoteRow[];
  released_by: number | string;
  date: string;
}


export async function updateView(id: number | string, viewData: UpdateView ): Promise<UpdateView> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/delivery_receipts/${id}/`, {
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
    const response = await api.put<UpdateView>(`/api/v1/delivery_receipts/${id}/`, viewData, {
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


