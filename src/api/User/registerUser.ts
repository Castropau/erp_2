import { getCookies } from "@/server/getToken";

/** interfaces */
import { RegisterEmployee } from "@/interfaces/RegisterEmployee";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerUser(userData: RegisterEmployee): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/users/register/",
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
    throw new Error("Registration failed");
  }
  return response.json();
}