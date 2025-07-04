/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface CategoryList {
  id: number; // id as an integer
  category: string;
}

export async function fetchCategoryList(): Promise<CategoryList[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/items/categories`, {
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
    const response = await api.get<CategoryList[]>("/api/v1/items/categories/", {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch BOM list:", error);
    throw new Error("Failed to fetch BOM list");
  }
}

// const sampleData: Pick<DepartmentsList, 'department'> = {
//     department: ''
// }