// import { getCookies } from "@/server/getToken";
import { api } from "../api";


export async function deleteLocation(id: number): Promise<void> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/requisitions/units/${id}/`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to delete the item");
//   }
// }

  try {
    await api.delete(`/api/v1/requisitions/units/${id}/`, {
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