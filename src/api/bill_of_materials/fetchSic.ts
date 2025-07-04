/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface SicUser {
  id: number; // id as an integer
  full_name: string;
}

// export async function fetchSicUser(): Promise<SicUser[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/users/sales/`, {
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
export async function fetchSicUser(): Promise<SicUser[]> {
  // const token = await getCookies("token");

  try {
    const response = await api.get<SicUser[]>("/api/v1/users/sales/", {
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
