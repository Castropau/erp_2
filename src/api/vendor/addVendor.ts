/** server actions */
// import { getCookies } from "@/server/getToken";
import { api } from "../api";

/** interfaces */
export interface CreateVendor {
  // photos: string;
  
  vendor: string;
  address: string;
  contact_number: string;
  contact_person: string;
  tin: string;
  email: string;
  country: string;
  bank_details: string;

}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateVendor(NewVendor: CreateVendor): Promise<any> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/vendors/create/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(NewVendor),
//     }
//   );
//   if (!response.ok) {
//     // throw new Error("Registration failed");
//     console.log("error submit");
//   }
//   return response.json();
// }
//  const token = await getCookies("token");

  try {
    const response = await api.post(`/api/v1/vendors/create/`, NewVendor, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      //   "Content-Type": "application/json",
      // },
    }
  );

    return response.data;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw new Error("Failed to create vendor");
  }
}