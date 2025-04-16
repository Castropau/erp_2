/** server actions */
import { getCookies } from "@/server/getToken";

export interface Item {
  id: number; // id as an integer
 vendor: string,
 category: string,
 item: string,
 brand: string,
 model: string,
 unit_of_measurement: string,
 unit_price: number,
 srp: number,
 vat_percentage: number,
 vat_exempted: boolean,
 description: string,
item_no: string,
  
}

export async function fetchItemList(): Promise<Item[]> {
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/items/", {
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