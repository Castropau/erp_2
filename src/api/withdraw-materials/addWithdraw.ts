import { getCookies } from "@/server/getToken";

/** interfaces */
export interface RegisterWithdraw{
// id: number,
name_of_requestor: number,
material_items: Items,
date_of_request: string,
date_needed: string,
purpose: string,
// created_by: number,
}
interface Items{
    id: number,
    inventory_item: number,
    quantity: number,

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerUser(userData: RegisterWithdraw): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/requisitions/material/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
  if (!response.ok) {
    // throw new Error("Registration failed");
    console.log("error submit");
  }
  return response.json();
}