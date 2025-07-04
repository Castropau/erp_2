/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

/** interfaces */
export interface CreateCategory {
  // photos: string;
  
  category: string;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateCategory(NewCategory: CreateCategory): Promise<any> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/items/categories/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(NewCategory),
//     }
//   );
//   if (!response.ok) {
//     // throw new Error("Registration failed");
//     console.log("error submit");
//   }
//   return response.json();
// }

try {
    const response = await api.post(`/api/v1/items/categories/`, NewCategory, {
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