// import { User } from "@/interfaces/User";
// import { getCookies } from "@/server/getToken";
import { api } from "../api";
 interface Userd {
  id: number; // id as an integer
  full_name: string; // full_name as a string
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  birth_date: string;
  sex: boolean;
  email: string;
  contact_number: string;
  address: string;
  department: Department; // department as a string
  role: Role;
  username: string;
  is_active: boolean;
  is_superuser: boolean;
}
interface Role{
  id: number;
  role: string;

}
interface Department{
  id: number;
  department: string;
}
export async function fetchUserDataById(id: number | string): Promise<Userd> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/users/${id}/`,
//     {
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//       },
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
try {
    const response = await api.get<Userd>(`/api/v1/users/${id}/`, {
    //   headers: {
    //     Authorization: `Bearer ${token?.value}`,
    //   },
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch BOM with ID ${id}:`, error);
    throw new Error("Failed to fetch BOM details.");
  }
}
export interface UpdateUser {
   id: number,
  //  full_name: string; // full_name as a string
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  birth_date: string;
  sex: string;
  email: string;
  contact_number: string;
  address: string;
  department: number; // department as a string
  role: number;
  username: string;

  
}

export async function updateUser(id: number, userData: UpdateUser ): Promise<UpdateUser> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/users/${id}/`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not okkk");
//   }
//   return response.json();
// }

  try {
    const response = await api.put<UpdateUser>(`/api/v1/users/${id}/`, userData, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      //   "Content-Type": "application/json",
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update BOM:", error);
    throw new Error("Failed to update BOM data.");
  }
}


