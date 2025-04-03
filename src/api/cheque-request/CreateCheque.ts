import { getCookies } from "@/server/getToken";

/** interfaces */
import { RegisterEmployee } from "@/interfaces/RegisterEmployee";



interface ChequeFk{
    id: number;
    cash_requisition: string;
    serial_no: string;
    date_purchase: string;
    description: string;
    amount: number;
    cheque_number: string;
    remarks: string;

}

export interface AddCheque{
   cheque_requisition_items: ChequeFk[];
   cheque_no: string;
   name_of_organization: string;
   payable_to: string;
   address: string;
   purpose: string;
//    discount: string;
date_requested: string;
// date_noted: string;
requested_by: number;

}

export async function registerCheque(chequeData: AddCheque): Promise<any> {
  const token = await getCookies("token");
  const response = await fetch(
    "http://192.168.0.249:8001/api/v1/requisitions/cheque/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chequeData),
    }
  );
  if (!response.ok) {
    console.log("error submit");
  }
  return response.json();
}