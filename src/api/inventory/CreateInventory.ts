/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

/** interfaces */




export interface CreateInventories {
  // photos: string;
  item: string;
  brand: string;
  serial: string;
  model: string;
  specification: string;
  unit_of_measurement: string;
  srp: number;
  quantity: number;
  description: string;
  // item_reference: number;
  location: number;
  category: number;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateInventory(NewInventory: CreateInventories): Promise<any> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/inventories/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(NewInventory),
//     }
//   );
//   if (!response.ok) {
//     // throw new Error("Registration failed");
//     console.log("error submit");
//   }
//   return response.json();
// }


try {
    const response = await api.post(`/api/v1/inventories/`, NewInventory, {
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