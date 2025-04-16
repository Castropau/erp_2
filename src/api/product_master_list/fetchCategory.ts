/** server actions */
import { getCookies } from "@/server/getToken";

export interface CategoryList {
  id: number; // id as an integer
  category: string;
}

export async function fetchCategoryList(): Promise<CategoryList[]> {
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/items/categories", {
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