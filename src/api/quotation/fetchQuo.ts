/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface Quatations {
  id: number | string; // id as an integer
  quotation_no: string;
  project_name: string;
  client: string;
  status: string;
  created_by: string;
  date_created: string;
}


// interface Client{
//   id: number;
//   client: string;
//   address: string;
//   position: string;
//   contact_person: string;
//   contact_number: string;
//   email: string;
// }
export async function fetchQuoList(): Promise<Quatations[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/quotations/`, {
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
    const response = await api.get<Quatations[]>("/api/v1/quotations/", {
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