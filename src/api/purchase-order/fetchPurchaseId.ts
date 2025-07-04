// import { getCookies } from "@/server/getToken";
import { api } from "../api";

interface Items{
    id: number,
    item: string,
    description: string,
    unit_price: number,
    quantity: number,
}
interface Vendors{
    id: number,
    vendor: string,
    address: string,
    contact_number: string,
    tin: string,

}
export interface FetchPurchase{
     id: number,
   items: Items[],
   terms: string,
   discount: number,
   vat_percentage: number,
   to_vendor: Vendors,
   sub_total: string,
   grand_total: string,
}


export async function fetchPurchaseId(id: number | string): Promise<FetchPurchase> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/purchase_orders/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//       },
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }
try {
    const response = await api.get<FetchPurchase>(`/api/v1/purchase_orders/${id}/`, {
    //   headers: {
    //     Authorization: `Bearer ${token?.value}`,
    //   },
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch BOM with ID ${id}:`, error);
    throw new Error("Failed to fetch BOM details.");
  }
}
