// import { getCookies } from "@/server/getToken";

/** interfaces */
import { RegisterEmployee } from "@/interfaces/RegisterEmployee";
import { api } from "../api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerUser(userData: RegisterEmployee): Promise<any> {
//   const token = await getCookies("token");
//   const response = await fetch(
//     `${process.env.baseUrl}/api/v1/users/register/`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token?.value}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     }
//   );
//   if (!response.ok) {
//     // throw new Error("Registration failed");
//     console.log("error submit");
//   }
//   return response.json();
// }
try {
    const response = await api.post(`/api/v1/users/register/`, userData, {
      // headers: {
      //   Authorization: `Bearer ${token?.value}`,
      //   "Content-Type": "application/json",
      // },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw new Error("Failed to create vendor");
  }
}


//  export const registerUser = async (data: RegisterEmployee) => {
//   const token = await getCookies("token");
//   const response = await fetch("http://192.168.0.249:8001/api/v1/users/register/", {
//     method: "POST",
//     headers: {
//        Authorization: `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error("Registration failed");
//   }

//   return response.json();
// };

