/** server actions */
// import { getCookies } from "@/server/getToken";

/** interfaces */
// import { Role } from "@/interfaces/Role";
import { api } from "../api";



export interface Supplier {
    id: number;
    vendor: string;
}

export async function Supplier(): Promise<Supplier[]> {
  //   const token = await getCookies("token");
  //   const response = await fetch(
  //     `${process.env.baseUrl}/api/v1/vendors/`,
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
  // const token = await getCookies("token");
  
    try {
      const response = await api.get<Supplier[]>("/api/v1/vendors/", {
        // headers: {
        //   Authorization: `Bearer ${token?.value}`,
        // },
      });
  
      return response.data;
    } catch (error) {
      console.error("Failed to fetch vendor:", error);
      throw new Error("Failed to fetch vendor list.");
    }
  }