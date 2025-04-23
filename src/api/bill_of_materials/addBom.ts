import { getCookies } from "@/server/getToken";
interface DeviceItems{
    id: number,
    order: number,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,

}
interface ItemsHeader{
    id: number,
    order: number,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,
}
interface DeviceHeader{
    id: number,
    items: ItemsHeader,
    header: string,


}
interface MaterialsItem{
    id: number,
    order: number,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,
}
interface MaterialHeader{
    id: number,
    items: MaterialsItem,
    header: string,

}


interface LaborItems{
    id: number,
    order: number,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,

}
interface LaborHeaderItems{
    id: number,
    order: number,
    item: string,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,

}
interface LaborHeader{
    id: number,
    items: LaborHeaderItems,
    header: string,
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
      id: number,
    order: number,
    items: GeneralHeaderItems,
    description: string,
    quantity: number,
    unit_of_measurement: string,
    srp: number,
}
export interface AddBom{
id: number,
device_items: DeviceItems,
device_header: DeviceHeader,
material_header: MaterialHeader,
labor_items: LaborItems,
labor_header: LaborHeader,
general_header: GeneralHeader,
eic: number,
sic: number,
project_name: string,
project_site: string,
date: string,
vat_percentage: number,
first_header: string,
status: string,
date_noted: string,
date_approved: string,
date_cancelled: string,
client: number,
lead: number,
checked_by: number,
cancelled_by: number,
}


export async function registerBom(bomData: AddBom): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/boms/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bomData ),
    }
  );
  if (!response.ok) {
    // throw new Error("Registration failed");
    console.log("error submit");
  }
  return response.json();
}