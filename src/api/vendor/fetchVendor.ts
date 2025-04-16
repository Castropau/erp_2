/** server actions */
import { getCookies } from "@/server/getToken";

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
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/vendors/", {
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