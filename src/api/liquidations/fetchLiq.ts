/** server actions */
import { getCookies } from "@/server/getToken";

export interface Liquidations {
  id: number; // id as an integer
  liquidation_no: string; // full_name as a string
  photos: string; // department as a string
  project_name: string;
  date: string;
  remitted_by: string;
  total: string;
}

export async function fetchLiqList(): Promise<Liquidations[]> {
  const token = await getCookies("token");
  const response = await fetch("http://192.168.0.249:8001/api/v1/liquidations/", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}



