/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

/** interfaces */
export interface CreateUnits {
  
  unit_of_measurement: string;
}

export async function CreateUnits(NewItems: CreateUnits): Promise<any> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/requisitions/units/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(NewItems),
//     }
//   );
//   if (!response.ok) {
//     console.log("error");
//     throw new Error("Registration failed");
//   }
//   return response.json();
// }
try {
    const response = await api.post(`/api/v1/requisitions/units/`, NewItems, {
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