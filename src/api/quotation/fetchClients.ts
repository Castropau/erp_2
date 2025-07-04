/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface ClientsList {
  id: number; // id as an integer
  client: string;
  address: string;
  position: string;
  contact_person: string;
  contact_number: string;
  email: string;
}

export async function fetchClientsList(): Promise<ClientsList[]> {
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
try {
    const response = await api.get<ClientsList[]>("/api/v1/clients/", {
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

// const sampleData: Pick<DepartmentsList, 'department'> = {
//     department: ''
// }