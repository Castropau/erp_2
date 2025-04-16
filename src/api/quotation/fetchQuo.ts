/** server actions */
import { getCookies } from "@/server/getToken";

export interface Quatations {
  id: number; // id as an integer
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
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/quotations/", {
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