// import { getCookies } from "@/server/getToken";
import { api } from "../api";


interface Items{
    // id: number;
    order: string;
    quantity: string;
    description: string,
    
}

export interface AddDelivery{
  // id: number; 
  items: Items[],
  date: string,
  date_released: string,
  created_by: string,
  delivered_to: string,
  tin: string,
  business_style: string,
  address: string,
  note: string,
  terms: string,
  po_no: string,
  or_no: string,
  salesman: number,
  approved_by: number,
  released_by: number,
}



export async function AddDelivery(deliveryData: AddDelivery): Promise<any> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/delivery_receipts/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(deliveryData),
//     }
//   );
//   if (!response.ok) {
//     // throw new Error("Registration failed");
//     console.log("error submit");
//   }
//   return response.json();
// }

try {
    const response = await api.post(`/api/v1/delivery_receipts/`, deliveryData, {
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