
// import { getCookies } from "@/server/getToken";
import { api } from "../api";


export interface UpdateCategory {
    id: number,
    
category: string,
   

}

export async function updateCategory(id: number, viewData: UpdateCategory ): Promise<UpdateCategory> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/items/categories/${id}/`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(viewData),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not okkk");
//   }
//   return response.json();
// }
try {
    const response = await api.put<UpdateCategory>(`/api/v1/boms/${id}/`, viewData, {
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



