/** server actions */
import { getCookies } from "@/server/getToken";

export interface Bom {
  id: number; // id as an integer
  bom_no: string;
  project_name: string;
  client: string;
  date: string;
  date_created: string;
  status: string;
  created_by: string;
  
}

export async function fetchBomList(): Promise<Bom[]> {
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/boms/", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// const sampleData: Pick<DepartmentsList, 'department'> = {
//     department: ''
// }