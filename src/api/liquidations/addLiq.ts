// import { getCookies } from "@/server/getToken";
import { api } from "../api";

interface Liq{
    date: string,
    particulars: string,
    expenses:  number, // Default to 0 if not available
   cashFromAccounting:  number, // Default to 0 if not available
  balance: number, // Default to 0 if not available
  vatIncluded: boolean,
}
export interface AddLiq{
    id: number;
    liquidation_no: string;
    photos: string;
    project_name: string;
    // task_notes: string;
    //  task_notes: { task_notes: string, items: string; description: string }[];
    date: string;
    remitted_by: string;
    total: string;
    liquidation_particulars: Liq[]
}




export async function CreateLiq(NewLiq: AddLiq): Promise<any> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/liquidations/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(NewLiq),
//     }
//   );
//   if (!response.ok) {
//     // throw new Error("Registration failed");
//     console.log("error submit");
//   }
//   return response.json();
// }
try {
    const response = await api.post(`/api/v1/liquidations/`, NewLiq, {
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