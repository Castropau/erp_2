/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface Bom {
  id: number; // id as an integer
  bom_no: string;
  project_name: string;
  client: string;
  date: string;
  date_created: string;
  status: string;
  created_by: string;
  checked_by: string;
  approved_by: string;
  
}

// export async function fetchBomList(): Promise<Bom[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/boms/`, {
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
export async function fetchBomList(): Promise<Bom[]> {
  // const token = await getCookies("token");

  try {
    const response = await api.get<Bom[]>("/api/v1/boms/", {
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