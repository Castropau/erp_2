// import { getCookies } from "@/server/getToken";
import { api } from "../api";




export interface AddDepartments{
    // id: number,
    department: string,
}

export async function CreateDepartment(NewDepartment: AddDepartments): Promise<AddDepartments> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/users/departments/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(NewDepartment),
//     }
//   );
//   if (!response.ok) {
//     // throw new Error("Registration failed");
//     console.log("error submit");
//   }
//   return response.json();
// }

try {
    const response = await api.post(`/api/v1/users/departments/`, NewDepartment, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      //   "Content-Type": "application/json",
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw new Error("Failed to create vendor");
  }
}