import { User } from "@/interfaces/User";
import { getCookies } from "@/server/getToken";

export interface UpdateLabor {
   id: number,
   
}

export async function updateLabor(id: number, laborData: UpdateLabor ): Promise<UpdateLabor> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/labor_computations/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(laborData),
  });
  if (!response.ok) {
    throw new Error("Network response was not okkk");
  }
  return response.json();
}




