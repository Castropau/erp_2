/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface Boms {
  bom_no: string; // full_name as a string
  project_name: string; // department as a string
  role: string;
  is_active: boolean;
  is_superuser: boolean;
  client: string;
  date_created: string;
  created_by: string;
  status: string;
  date: string;
  id: number | string;
}

// export async function fetchBomList(): Promise<Boms[]> {
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
export async function fetchBomList(): Promise<Boms[]> {
  // const token = await getCookies("token");

  try {
    const response = await api.get<Boms[]>("/api/v1/boms/", {
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



