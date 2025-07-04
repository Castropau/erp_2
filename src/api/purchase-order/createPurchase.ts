/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

/** interfaces */
interface Items{

    item: string,
    description: string,
    unit_price: number,
    quantity: number,
}
export interface CreatePurchase {
  // photos: string;
  
  items: Items[],
  terms: string,
  discount: number,
  vat_percentage: number,
  vendor: number,
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreatePurchase(NewPurchase: CreatePurchase): Promise<any> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/purchase_orders/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(NewPurchase),
//     }
//   );
//   if (!response.ok) {
//     // throw new Error("Registration failed");
//     console.log("error submit");
//   }
//   return response.json();
// }
try {
    const response = await api.post(`/api/v1/purchase_orders/`, NewPurchase, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      //   "Content-Type": "application/json",
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw new Error("Failed to create vendor");
  }
}