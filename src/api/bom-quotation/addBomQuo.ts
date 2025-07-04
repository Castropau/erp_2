// import { getCookies } from "@/server/getToken";
import { api } from "../api";

// interface Quatations{
//     id: number;
//     order: number;
//     item: string;
//     description: string;
//     quantity: number;
//     srp: number;
// }

// interface Client{
//     id: number;
//     client: string;
//     address: string;
//     position: string;
//     contact_person: string;
//     contact_number: string;
//     email: string;
// }


// export interface AddBomQuos{
//     id: number;
//     quotation_items: Quatations[];
//     liquidation_no: string;
//     photos: string;
//     project_name: string;
//     // task_notes: string;
//     //  task_notes: { task_notes: string, items: string; description: string }[];
//     // client: string;
//     client: Client;
//     status: string;
//     created_by: string;
//     date_created: string;

//     // date: string;
//     // remitted_by: string;
//     // total: string;
//     notes_assumptions: string;
//     terms_conditions: string;
//     delivery_address: string;
// }
export interface AddBomQuos {
  id?: number;
  liquidation_no?: string;
  photos?: string[];
  status?: string;
  created_by?: string;

  project: string;
  project_name: string;
  contactPerson: string;
  delivery_address: string;
  client: number;
  // date_created: string;
  // remittedBy: string;
  // receivedBy: string;
  // tableRows: {
  //   date: string;
  //   description: string;
  //   srp: string;
  //   quantity: string;
  //   total: number;
  //   balance: string;
  // }[];
  quotation_items: {
    item: string;
    description: string;
    srp: string;
    quantity: string;
    total: number;
    balance: string;
  }[];
  vat: number;
  discount: number;
  notes_assumptions: string;
  terms_conditions: string;
  date: string; // ✅ Add this
  first_header: string; // ✅ Add this
  eic: string; // ✅ Add this
  sic: string; // ✅ Add this

}




export async function CreateBomQuo(NewQuo: AddBomQuos): Promise<AddBomQuos> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/quotations/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(NewQuo),
//     }
//   );
//   if (!response.ok) {
//     // throw new Error("Registration failed");
//     console.log("error submit");
//   }
//   return response.json();
// }
try {
    const response = await api.post(`/api/v1/boms/`, NewQuo, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      //   "Content-Type": "application/json",
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw new Error("Failed to create vendor");
  }
}