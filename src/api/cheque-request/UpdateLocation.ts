// import { getCookies } from "@/server/getToken";
import { api } from "../api";



export interface UpdateLocation {
  id: number;  // ID of the location
  unit_of_measurement: string;  // Location name
}

export async function updateLocation(id: number, locationData: UpdateLocation): Promise<UpdateLocation> {
//   const token = await getCookies("token");
//   const response = await fetch(`${process.env.baseUrl}/api/v1/requisitions/units/${id}/`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(locationData),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to update the location");
//   }

//   return response.json();
// }
try {
    const response = await api.put<UpdateLocation>(`/api/v1/requisitions/units/${id}/`, locationData, {
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