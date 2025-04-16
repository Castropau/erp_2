import { getCookies } from "@/server/getToken";

interface Quatations{
    id: number;
    order: number;
    item: string;
    description: string;
    quantity: number;
    srp: number;
}

interface Client{
    id: number;
    client: string;
    address: string;
    position: string;
    contact_person: string;
    contact_number: string;
    email: string;
}


export interface AddQuo{
    id: number;
    quotation_items: Quatations[];
    liquidation_no: string;
    photos: string;
    project_name: string;
    // task_notes: string;
    //  task_notes: { task_notes: string, items: string; description: string }[];
    // client: string;
    client: Client;
    status: string;
    created_by: string;
    date_created: string;

    // date: string;
    // remitted_by: string;
    // total: string;
    notes_assumptions: string;
    terms_conditions: string;
    delivery_address: string;
}




export async function CreateQuo(NewQuo: AddQuo): Promise<AddQuo> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/quotations/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewQuo),
    }
  );
  if (!response.ok) {
    // throw new Error("Registration failed");
    console.log("error submit");
  }
  return response.json();
}