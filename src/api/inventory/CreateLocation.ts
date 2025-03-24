/** server actions */
import { getCookies } from "@/server/getToken";

/** interfaces */
export interface CreateLocation {
  // photos: string;
  
  location: string;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateLocation(NewLocation: CreateLocation): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/inventories/location/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewLocation),
    }
  );
  if (!response.ok) {
    // throw new Error("Registration failed");
    console.log("error submit");
  }
  return response.json();
}