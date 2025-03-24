/** server actions */
import { getCookies } from "@/server/getToken";

/** interfaces */
export interface CreateCategory {
  // photos: string;
  
  category: string;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateCategory(NewCategory: CreateCategory): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/items/categories/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewCategory),
    }
  );
  if (!response.ok) {
    // throw new Error("Registration failed");
    console.log("error submit");
  }
  return response.json();
}