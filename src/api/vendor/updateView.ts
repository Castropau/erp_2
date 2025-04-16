
import { getCookies } from "@/server/getToken";


export interface UpdateView {
    id: number | string,
    
   vendor: string,
   address: string,
   country: string,
   contact_person: string,
   contact_number: string,
   email: string,
   tin: string,
   bank_details: string,
   description: string,

}

export async function updateView(id: number, viewData: UpdateView ): Promise<UpdateView> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/vendors/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(viewData),
  });
  if (!response.ok) {
    throw new Error("Network response was not okkk");
  }
  return response.json();
}




