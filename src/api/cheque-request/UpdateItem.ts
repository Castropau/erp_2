import { getCookies } from "@/server/getToken";


export interface UpdateItem {
  id: number; // id as an integer
  item: string;

}

export async function fetchItemDataById(id: number): Promise<UpdateItem> {
  const token = await getCookies("token");
  const response = await fetch(
    `http://192.168.0.249:8001/api/v1/requisitions/items/${id}/`,
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
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/requisitions/items/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemsData),
  });
  if (!response.ok) {
    throw new Error("Network response was not okkk");
  }
  return response.json();
}







