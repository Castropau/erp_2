// import { User } from "@/interfaces/User";
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface DeleteCash {
   id: number,
   
}

export async function deleteCashRequest(id: number): Promise<void> {
//   const token = await getCookies("token");

//   const response = await fetch(`${process.env.baseUrl}/api/v1/requisitions/cash/${id}/`, {
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
  // const token = await getCookies("token");

  try {
    await api.delete(`/api/v1/requisitions/cash/${id}/`, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      //   "Content-Type": "application/json",
      // },
    });
  } catch (error) {
    console.error("Failed to delete cash:", error);
    throw new Error("Failed to delete cash");
  }
}




