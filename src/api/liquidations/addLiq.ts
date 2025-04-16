import { getCookies } from "@/server/getToken";


export interface AddLiq{
    id: number;
    liquidation_no: string;
    photos: string;
    project_name: string;
    // task_notes: string;
     task_notes: { task_notes: string, items: string; description: string }[];
    date: string;
    remitted_by: string;
    total: string;
}




export async function CreateLiq(NewLiq: AddLiq): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/liquidations/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewLiq),
    }
  );
  if (!response.ok) {
    // throw new Error("Registration failed");
    console.log("error submit");
  }
  return response.json();
}