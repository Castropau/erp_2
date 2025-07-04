// import { User } from "@/interfaces/User";
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface DeleteRole {
   id: number,
   
}

export async function DeleteRole(id: number): Promise<void> {
//   const token = await getCookies("token");

//   const response = await fetch(`${process.env.baseUrl}/api/v1/users/roles/${id}/`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to delete cash requisition.");
//   }
// }
try {
    await api.delete(`/api/v1/users/roles/${id}/`, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      //   "Content-Type": "application/json",
      // },
    });
  } catch (error) {
    console.error("Failed to delete BOM:", error);
    throw new Error("Failed to delete BOM");
  }
}




