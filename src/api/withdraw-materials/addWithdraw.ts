// import { getCookies } from "@/server/getToken";
import { api } from "../api";

/** interfaces */
export interface RegisterWithdraw2{
// id: number,
name_of_requestor: string,
material_items: Items[],
date_of_request: string,
date_needed: string,
purpose: string,
// created_by: number,
}
interface Items{
    // id: number,
    inventory_item: string,
    quantity: number,

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerUser(userData: RegisterWithdraw2): Promise<any> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/requisitions/material/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     }
//   );
//   if (!response.ok) {
//     // throw new Error("Registration failed");
//     console.log("error submit");
//   }
//   return response.json();
// }
try {
    const response = await api.post(`/api/v1/requisitions/material/`, userData, {
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