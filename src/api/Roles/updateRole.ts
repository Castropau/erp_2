
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface updateRole{
    id: number,
    role: string,
}

export async function Updaterole(id: number | string, viewData: updateRole ): Promise<updateRole> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/users/roles/${id}/`, {
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
    const response = await api.put<updateRole>(`/api/v1/users/roles/${id}/`, viewData, {
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




