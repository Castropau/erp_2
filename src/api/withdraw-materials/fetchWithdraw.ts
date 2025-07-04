/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";


interface User{
    id: number;
    username: string;
    full_name: string;
    role: string;
    department: string;
    contact_number: string;
}

export interface Withdraw {
  id: number; // id as an integer
  serial_no: string;
  purpose: string;
  status: string;
  date_needed: string;
  name_of_requestor: User;
//   email: string;
  
}

export async function fetchWithdrawList(): Promise<Withdraw[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/requisitions/material/`, {
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
    const response = await api.get<Withdraw[]>("/api/v1/requisitions/material/", {
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