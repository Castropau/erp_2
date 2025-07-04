/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface EicUser {
  id: number; // id as an integer
  full_name: string;
}

// export async function fetchEicUser(): Promise<EicUser[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/users/display/engineers/`, {
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
export async function fetchEicUser(): Promise<EicUser[]> {
  // const token = await getCookies("token");

  try {
    const response = await api.get<EicUser[]>("/api/v1/users/display/engineers/", {
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
