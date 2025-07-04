/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";
interface Sic{
    id: number,
    full_name: string,
}
interface Client{
    id: number,
    client: string,
}
interface Eic{
id: number,
full_name: string,
}
interface Item{
    id: number,
    total_amount: string,
    order: string,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,
}
interface Device{
    amount: any;
    id: number,
    total_amount: number,
    order: string,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,
}

interface Header{
    id: number,
    items: Item[],
    header_sub_total: string,
    srp: number,
    header: string,
}

interface Items{
    id: number,
    total_amount: number,
    order: number,
    item: string,

}
interface MaterialHeader{
    flatMap: any;
    length: any;
    map: any;
    id: number,
    items: Items,
}

interface Labor{
    id: number,
    total_amount: string,
    order: string,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: number,
    srp: number,
}
interface LItem{
  srp: any;
  description: string;
  quantity: any;
 id: number,
    total_amount: number,
    order: number,
    item: string,
    unit_of_measurement: string,
}
interface GenItem{
 id: number,
    total_amount: number,
    order: number,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,
}
interface LaborHeader{
    header_sub_total: any;
    id: number,
    items: LItem[],
    header: string,
}

interface GenHeader{
    id: number,
    header: string,
    items: GenItem[],
    header_sub_total: string,
    order: string,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,
}
export interface BomId{
    id: number | string,
    bom_no: string,
    device_items: Device[],
    device_header: Header[],
    date_created: string,
    project_site: string,
    date: string,
    sic: Sic,
    client: Client,
    status: string,
   eic: Eic,
project_name: string,


material_header: MaterialHeader,

labor_items: Labor[],
labor_header: LaborHeader[],

general_header: GenHeader[],
first_header: string,

}

// export async function fetchbomId(id: number | string): Promise<BomId> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/boms/${id}/`,
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
export async function fetchbomId(id: number | string): Promise<BomId> {
//   const token = await getCookies("token");

  try {
    const response = await api.get<BomId>(`/api/v1/boms/${id}/`, {
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

