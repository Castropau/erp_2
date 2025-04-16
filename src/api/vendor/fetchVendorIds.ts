
import { getCookies } from "@/server/getToken";

export interface FetchVendorId {
   id: number;
  vendor: string;
  category: string;
  item_no: string;
  created_by: string;
  date_created: string;
  item: string;
  is_active: boolean;
  brand: string;
  model: string;
  unit_of_measurement: string;
  unit_price: number;
  srp: number;
  vat_percentage: number;
  vat_exempt: boolean;
  description: string;

    
}

export async function fetchVendorDataByIds(id: number): Promise<FetchVendorId> {
  const token = await getCookies("token");
  const response = await fetch(
    `http://192.168.0.249:8001/api/v1/items/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}







