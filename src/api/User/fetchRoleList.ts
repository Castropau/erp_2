/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface DepartmentsList {
  id: number; // id as an integer
  role: string;
}

export async function fetchRoleList(): Promise<DepartmentsList[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/users/roles`, {
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
try {
    const response = await api.get<DepartmentsList[]>("/api/v1/users/roles/", {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch BOM list:", error);
    throw new Error("Failed to fetch BOM list");
  }
}

