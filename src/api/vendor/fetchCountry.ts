/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

export interface CountryList {
  id: string;  
  name: string; 
}

// export async function fetchCountryList(): Promise<CountryList[]> {
//   const token = await getCookies("token");

//   if (!token?.value) {
//     throw new Error("Token not found");
//   }

//   const response = await fetch(`${process.env.baseUrl}/api/v1/vendors/countries/`, {
//     headers: {
//       Authorization: `Bearer ${token.value}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   const countryData: Record<string, string> = await response.json();
//   const countries = Object.entries(countryData).map(([id, name]) => ({
//     id,      
//     name,    
//   }));
//   return countries;
// }
export async function fetchCountryList(): Promise<CountryList[]> {
  // const token = await getCookies("token");

 

  try {
    // Assuming the correct endpoint is /api/v1/vendors/countries/
    const response = await api.get<Record<string, string>>("/api/v1/vendors/countries/", {
      // headers: {
      //   Authorization: `Bearer ${token.value}`,
      // },
    });

    // If API returns { id: name, ... }, convert to array of objects
    const countryData = response.data;
    const countries = Object.entries(countryData).map(([id, name]) => ({
      id,
      name,
    }));

    return countries;
  } catch (error) {
    console.error("Failed to fetch country list:", error);
    throw new Error("Failed to fetch country list.");
  }
}

// const sampleData: Pick<DepartmentsList, 'department'> = {
//     department: ''
// }
