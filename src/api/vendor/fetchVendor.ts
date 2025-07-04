/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface Vendor {
  id: number; // id as an integer
  vendor: string;
  address: string;
  contact_number: string;
  contact_person: string;
  tin: string;
  email: string;
  
}

export async function fetchVendorsList(): Promise<Vendor[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/vendors/`, {
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
    const response = await api.get<Vendor[]>("/api/v1/vendors/", {
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