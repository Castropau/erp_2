/** server actions */
// import { getCookies } from "@/server/getToken";

/** interfaces */
import { Role } from "@/interfaces/Role";
import { api } from "../api";

export async function fetchRoleData(): Promise<Role[]> {
  //   const token = await getCookies("token");
  //   const response = await fetch(
  //     `${process.env.baseUrl}/api/v1/users/roles/`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token?.value}`,
  //       },
  //     }
  //   );
  
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json();
  // }
  try {
      const response = await api.get<Role[]>("/api/v1/users/roles/", {
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