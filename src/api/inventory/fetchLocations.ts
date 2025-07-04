// /** server actions */
// import { getCookies } from "@/server/getToken";

// /** interfaces */
// import { Role } from "@/interfaces/Role";



// export interface Location {
//     id: number;
//     location: string;
// }

// export async function fetchingLocations(): Promise<Location[]> {
//     const token = await getCookies("token");
//     const response = await fetch(
//       "http://192.168.0.249:8001/api/v1/inventories/location/",
//       {
//         headers: {
//           Authorization: `Bearer ${token?.value}`,
//         },
//       }
//     );
  
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }





//     // return response.json();
//      const data = await response.json();
//   console.log("FETCHED LOCATIONS DATA:", data);
//   return data;
    
//   }

/** server actions */
// import { getCookies } from "@/server/getToken";

/** interfaces */
// import { Role } from "@/interfaces/Role";
import { api } from "../api";



export interface Locations {
    id: number;
    location: string;
}

export async function AllLocation(): Promise<Locations[]> {
  //   const token = await getCookies("token");
  //   const response = await fetch(
  //      `${process.env.baseUrl}/api/v1/inventories/location/`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token?.value}`,
  //       },
  //     }
  //   );
  
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json();
  // }
   try {
      const response = await api.get<Locations[]>("/api/v1/inventories/location/", {
        // headers: {
        //   Authorization: `Bearer ${token?.value}`,
        // },
      });
  
      return response.data;
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      throw new Error("Failed to fetch client list.");
    }
  }