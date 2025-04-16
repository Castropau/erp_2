/** server actions */
import { getCookies } from "@/server/getToken";

export interface Client {
  id: number; // id as an integer
  client: string;
  address: string;
//   client: string;
  position: string;
  contact_person: string;
  contact_number: string;
  email: string;
  
}

export async function fetchClientsList(): Promise<Client[]> {
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/clients/", {
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