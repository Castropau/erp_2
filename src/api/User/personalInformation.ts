import { User } from "@/interfaces/User";
import { getCookies } from "@/server/getToken";

export async function fetchUserDataById(id: number): Promise<User> {
  const token = await getCookies("token");
  const response = await fetch(
    `http://192.168.0.249:8001/api/v1/users/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export interface UpdateUser {
   id: number | string,
   first_name: string,
   middle_name: string,
   last_name: string,
   suffix: string,
   birth_date: string
   sex: boolean,
   address: string,
   is_active: boolean,
   role: number,
   department: number,
   contact_number: string,
   email: string,
   username: string,
}

export async function updateUser(id: number, userData: UpdateUser ): Promise<User> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/users/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Network response was not okkk");
  }
  return response.json();
}




