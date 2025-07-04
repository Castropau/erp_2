// import { User } from "@/interfaces/User";
// import { getCookies } from "@/server/getToken";
import { api } from "../api";


// interface Client{
//     id: number,
//     client: string,
// }
// interface Sic{
//     id: number,
//     full_name: string,
// }

// interface Eic{
//     id: number,
//    full_name: string,
// }

// interface DeviceItem{
//     id?: number;
//     item?: string,
//     description?: string,
//     quantity?: number,
//     srp?: number,
//     unit_of_measurement?: string,
//     total_amount?: number,
//     order?: number,
// }
// export interface updateBomId{
//   //  id: number,
//    project_name: string,
//    project_site: string,
//    date: string,
//    client: number | string,

//    sic: number | string,
//    eic: number | string,
//     status: string,
//     first_header: string,

//     device_items: DeviceItem,
// }
// interface Client {
//     id: number;
//     client: string;
// }
// interface Sic {
//     id: number;
//     full_name: string;
// }
// interface Eic {
//     id: number;
//     full_name: string;
// }
interface DeviceItem {
    id?: number;
  item?: string; // expects string
    description?: string;
    quantity?: number;
    srp?: number;
    unit_of_measurement?: string;
    total_amount?: number;
    order?: number;
}
export interface updateBomId {
   project_name: string;
   project_site: string;
   date: string;
   client: number | string;  // id only
   sic: number | string;     // id only
   eic: number | string;     // id only
   status: string;
   first_header: string;
   device_items: DeviceItem[];  // array of items
}

// export async function updatebomId(id: number | string, bomDataId: updateBomId ): Promise<updateBomId> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/boms/${id}/`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(bomDataId),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not okkk");
//   }
//   return response.json();
// }

export async function updatebomId(id: number | string, bomDataId: updateBomId): Promise<updateBomId> {
  // const token = await getCookies("token");

  try {
    const response = await api.put<updateBomId>(`/api/v1/boms/${id}/`, bomDataId, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      //   "Content-Type": "application/json",
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update BOM:", error);
    throw new Error("Failed to update BOM data.");
  }
}