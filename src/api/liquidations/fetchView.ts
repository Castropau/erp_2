
import { getCookies } from "@/server/getToken";


interface Photos{
    id: number,
    photo: string,
}

interface TaskNotes{
    id: number,
    order: string,
    description: string,
}


interface Notes{
    id: number,
    items:  TaskNotes[],
    description: string,
}

interface Liquidation{
    id: number,
    balance: string,
    date: string,
    particulars: string,
    expenses: string,
    cash_from_accounting: number,
    vat_inclusive: boolean,
}


interface RemmittedBy{
    id: number,
    username: string,
    full_name: string,
    role: string,
    department: string,
    contact_number: string,

}

interface ReceivedBy{
    id: number,
    username: string,
    full_name: string,
    role: string,
    department: string,
    contact_number: string,
}
export interface FetchLiqId {
    id: number | string,
    liquidation_no: string,
    date_created: string,
    photos: Photos,
    task_notes: Notes[],
    liquidation_particulars: Liquidation[],
    created_by: string,
    remitted_by: RemmittedBy,
    received_by: ReceivedBy,
    total: string,
    project_name: string,
    date: string,
    cash_requisition: string,
}

export async function fetchLiquidationDataById(id: number): Promise<FetchLiqId> {
  const token = await getCookies("token");
  const response = await fetch(
    `http://192.168.0.249:8001/api/v1/liquidations/${id}/`,
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







