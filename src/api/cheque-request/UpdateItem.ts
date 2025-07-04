import { getCookies } from "@/server/getToken";
import { api } from "../api";


export interface UpdateItem {
  id: number; // id as an integer
  item: string;

}

export async function fetchItemDataById(id: number): Promise<UpdateItem> {
  const token = await getCookies("token");
  const response = await fetch(
    `${process.env.baseUrl}/api/v1/requisitions/items/${id}/`,
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



export interface UpdateItems {
   id: number,
   item: string;
}



export async function updateItems(id: number, itemsData: UpdateItems ): Promise<UpdateItems> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/requisitions/items/${id}/`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(itemsData),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not okkk");
//   }
//   return response.json();
// }
try {
    const response = await api.put<UpdateItems>(`/api/v1/requisitions/items/${id}/`, itemsData, {
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







