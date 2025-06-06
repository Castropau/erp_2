/** server actions */
import { getCookies } from "@/server/getToken";

export interface DepartmentsList {
  id: number; // id as an integer
  department: string;
}

export async function fetchDepartmentsList(): Promise<DepartmentsList[]> {
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/users/departments", {
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