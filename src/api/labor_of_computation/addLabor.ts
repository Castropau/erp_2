// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface AddLabor{

}

export async function registerLabor(bomData: AddLabor): Promise<any> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/labor_computations/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(bomData ),
//     }
//   );
//   if (!response.ok) {
//     // throw new Error("Registration failed");
//     console.log("error submit");
//   }
//   return response.json();
// }
try {
    const response = await api.post(`/api/v1/labor_computations/`, bomData, {
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