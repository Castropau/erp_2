/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface Item {
  id: number | string; // id as an integer
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
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/items/`, {
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
try {
    const response = await api.get<Item[]>("/api/v1/items/", {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch BOM list:", error);
    throw new Error("Failed to fetch BOM list");
  }
}

// const sampleData: Pick<DepartmentsList, 'department'> = {
//     department: ''
// }