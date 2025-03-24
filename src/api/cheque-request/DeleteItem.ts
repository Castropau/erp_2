import { getCookies } from "@/server/getToken";


export async function deleteItem(id: number): Promise<void> {
  const token = await getCookies("token");
  const response = await fetch(
    `http://192.168.0.249:8001/api/v1/requisitions/items/${id}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete the item");
  }
}




