/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface VendorList {
  id: number; // id as an integer
  vendor: string;
}

export async function fetchVendorList(): Promise<VendorList[]> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/vendors`, {
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
    const response = await api.get<VendorList[]>("/api/v1/vendors/", {
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