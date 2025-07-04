
// import { getCookies } from "@/server/getToken";
import { api } from "../api";


interface Photos{
    id: number,
    photo: string,
}

interface TaskNotes{
    // id: number,
    order: number,
    description: string,
}


interface Notes{
    // id: number,
    items:  TaskNotes[],
    description: string,
    order: number,
}

interface Liquidation{
    // id: number,
    balance: number,
    date: string,
    particulars: string,
    expenses: number,
    cash_from_accounting: number,
    // vat_inclusive: boolean,
}


interface RemmittedBy{
    // id: number,
    username: string,
    full_name: string,
    role: string,
    department: string,
    contact_number: string,

}

interface ReceivedBy{
    // id: number,
    username: string,
    full_name: string,
    role: string,
    department: string,
    contact_number: string,
}
export interface UpdateView {
    // id: number | string,
    // liquidation_no: string,
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

export async function updateView(id: number | string, viewData: UpdateView ): Promise<UpdateView> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/liquidations/${id}/`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(viewData),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not okkk");
//   }
//   return response.json();
// }
 try {
    const response = await api.put<UpdateView>(`/api/v1/liquidations/${id}/`, viewData, {
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



