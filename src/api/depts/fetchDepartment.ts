/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

/** interfaces */
export interface DepartmentL{
    id: number,
    department: string,
}
export async function fetchDepartmentData(): Promise<DepartmentL[]> {
//     const token = await getCookies("token");
//     const response = await fetch(
//       `${process.env.baseUrl}/api/v1/users/departments/`,
//       {
//         headers: {
//           Authorization: `Bearer ${token?.value}`,
//         },
//       }
//     );
  
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   }

try {
    const response = await api.get<DepartmentL[]>("/api/v1/users/departments/", {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    throw new Error("Failed to fetch client list.");
  }
}