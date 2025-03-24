import { getCookies } from "@/server/getToken";



export interface UpdateLocation {
  id: number;  // ID of the location
  unit_of_measurement: string;  // Location name
}

export async function updateLocation(id: number, locationData: UpdateLocation): Promise<UpdateLocation> {
  const token = await getCookies("token");
  const response = await fetch(`http://192.168.0.249:8001/api/v1/requisitions/units/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(locationData),
  });

  if (!response.ok) {
    throw new Error("Failed to update the location");
  }

  return response.json();
}
