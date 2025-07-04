/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface ClientUser {
  client: string;
  id: number; // id as an integer
  full_name: string; // full_name as a string
  department: string; // department as a string
  role: string;
  is_active: boolean;
  is_superuser: boolean;
}

// export async function fetchbomClient(): Promise<ClientUser[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/clients/`, {
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
export async function fetchbomClient(): Promise<ClientUser[]> {
  // const token = await getCookies("token");

  try {
    const response = await api.get<ClientUser[]>("/api/v1/clients/", {
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



