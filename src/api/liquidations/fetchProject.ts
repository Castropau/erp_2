/** server actions */
import { getCookies } from "@/server/getToken";

export interface CashLists {
  total_price: number;
  id: number; // id as an integer
  noted_by: string | null,
  date_noted: string | null,
  approved_by: string | null,
  date_approved: string | null,
  requested_by: RequestedBy,
  date_requested: Date | string,
  created_by: string | null,
  date_created: Date,
  date_cancelled: Date | null | string,
  cancelled_by: string | null,
  cash_requisition_items: CashRequesitionItems[],
  cheque_request_ref: {
    id: number,
    cheque_no: string
  }[],
  serial_no: string,
  sub_total: number,
  total: number,
  vat_value: number,
  ewt_value: number,
  grand_total: number,
  special_instructions: string,
  project_name: string,
  delivery_address: string,
  status: string,
  discount: number,
  vat_percentage: number,
  less_ewt: number
}

interface CashRequesitionItems {
    id: number,
    total_price: number,
    item: string,
    supplies: string,
    unit_of_measurement: string,
    quantity: number,
    unit_price: number,
    cashFromAccounting: number | 0,
    description: string,
}

interface RequestedBy {
    id: number,
    username: string,
    full_name: string,
    role: string,
    department: string,
    contact_number: string
}

export async function fetchCashDetailsById(id: number): Promise<CashLists> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/requisitions/cash/${id}`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
