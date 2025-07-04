/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface PermissionList {
  id: number; // id as an integer
  name: string;
  codename: string;
}

export async function fetchPermission(): Promise<PermissionList[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/users/permissions_list/`, {
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
    const response = await api.get<PermissionList[]>("/api/v1/users/permissions_list/", {
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
