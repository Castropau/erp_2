/** server actions */
import { getCookies } from "@/server/getToken";

/** interfaces */
export interface CreateClient {
  // photos: string;
  
  client: string;
  address: string;
  contact_person: string;
  position: string;
  contact_number: string
  email: string;
 

}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateClient(NewClient: CreateClient): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/clients/create/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewClient),
    }
  );
  if (!response.ok) {
    // throw new Error("Registration failed");
    console.log("error submit");
  }
  return response.json();
}