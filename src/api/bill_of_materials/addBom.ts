// import { getCookies } from "@/server/getToken";
// import axios from "axios";
import { api } from "../api";
interface DeviceItems{
    id?: number;
    order?: number;
    item?: string;
    description?: string;
    quantity?: number;
    srp?: number;
    unit_of_measurement?: string;
    // total_amount?: number;

}
// interface ItemsHeader{
//     id?: number,
//     order?: number,
//     item?: string,
//     description?: string,
//     quantity?: number,
//     unit_of_measurement?: string,
//     srp?: number,
// }
interface ItemsHeader {
  id?: number;
  order: number;
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  srp: number;
  total_amount: number; // ✅ include this if it's in the payload
}

// interface DeviceHeader{
//     // id: number,
//     items: ItemsHeader,
//     header: string,


// }
interface DeviceHeader {
  // id?: number; // optional if not used
  items: ItemsHeader[]; // ❗️this was wrong before (should be an array)
  header: string;
  header_sub_total: number; // ✅ You are including this in the payload, so it must be typed
}

interface MaterialsItem{
    // id: number,
    order: number,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,
}
// interface MaterialHeader{
//     id: number,
//     items: MaterialsItem,
//     header: string,

// }

interface MaterialHeader {
  // id?: number;
  items: MaterialsItem[]; // ✅ Should be an array
  header: string;
  header_sub_total: number; // ✅ If used
}

interface LaborItems{
    // id: number,
    order: number,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,

}
interface LaborHeaderItems{
    // id: number,
    // order: number,
    // item: string,
    // description: string,
    // quantity: number,
    // unit_of_measurement: string,
    // srp: number,
     id?: number;
  order: number;
  item: string;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  srp: number;
  total_amount: number; // ✅ needed for matching payload

}
interface LaborHeader{
    // id: number,
    items: LaborHeaderItems[],
    header: string,
      header_sub_total: number; // ✅ required since it's in your payload

}

interface GeneralHeaderItems{
id: number,
order: string,
item: string,
description: string,
quantity: number,
unit_of_measurement: string,
srp: number,
}

interface GeneralHeader{
      // id: number,
    order: number,
    items: GeneralHeaderItems,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,
}

// interface Eic{
// full_name: string;
// }
export interface AddBoms{
// id: number,
device_items: DeviceItems[],
device_header: DeviceHeader[],
material_header: MaterialHeader[],
labor_items: LaborItems[],
labor_header: LaborHeader[],
general_header: GeneralHeader[],
// eic: string,
// sic: number,
project_name: string,
project_site: string,
date: string,
// vat_percentage: number,
first_header: string,
status: string,
// date_noted: string,
// date_approved: string,
// date_cancelled: string,
// client: number,
// lead: number,
// checked_by: number,
// cancelled_by: number,
}
export async function registerBom(bomData: AddBoms): Promise<AddBoms> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/boms/`,
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
// const token = await getCookies("token");

  try {
    const response = await api.post(`/api/v1/boms/`, bomData, {
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
// export async function registerBom(bomData: AddBoms): Promise<AddBoms> {
//   const token = await getCookies("token");

//   try {
//     const response = await axios.post<AddBoms>(
//       `${process.env.baseUrl}/api/v1/boms/`,
//       bomData,
//       {
//         headers: {
//           Authorization: `Bearer ${token?.value}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error submitting BOM:", error);
//     throw error; // Re-throw so it can be handled by the calling function
//   }
// }