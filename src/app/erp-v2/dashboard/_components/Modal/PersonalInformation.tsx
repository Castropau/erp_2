// import React, { useState, useEffect } from "react";

// /** api */
// import { fetchUserDataById, updateUser } from "@/api/User/personalInformation";

// /** components */
// import TextField from "@/components/Input/TextField";

// /** interfaces */
// import { UpdateUser } from "@/api/User/personalInformation";
// // import { User } from "@/interfaces/User";

// /**query */

// import {
//   // QueryClient,
//   useMutation,
//   useQueryClient,
//   useQuery,
// } from "@tanstack/react-query";

// interface PersonalInformationProps {
//   id: number;
// }

// function PersonalInformation(props: PersonalInformationProps) {
//   const { id } = props;

//   const queryClient = useQueryClient();

//   const {
//     data: userData,
//     isLoading: isUserLoading,
//     error: userError,
//   } = useQuery({
//     queryKey: ["user", id],
//     queryFn: () => fetchUserDataById(id),
//     enabled: !!id,
//   });

//   const [showEditModal, setShowEditModal] = useState(false);

//   const { mutate: updatedUser } = useMutation({
//     mutationFn: (data: UpdateUser) => updateUser(userData!.id, data),
//     onSuccess: () => {
//       console.log("User updated successfully");
//       queryClient.invalidateQueries({ queryKey: ["user", id] });
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       setShowEditModal(false);
//     },
//     onError: (error) => {
//       console.error("Error updating user:", error);
//     },
//   });

//   // if (isUserLoading) return "Loading...";

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "radio" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updatedUser(formData);
//     console.log(formData);
//   };

//   const [formData, setFormData] = useState<UpdateUser>({
//     first_name: "",
//     middle_name: "",
//     last_name: "",
//     sex: false,
//     contact_number: "",
//     email: "",
//     address: "",
//     is_active: false,
//     role: 1,
//     department: 1,
//     username: "",
//     suffix: "",
//     birth_date: "",
//     id: "",
//   });

//   useEffect(() => {
//     setFormData({
//       first_name: userData?.first_name || "",
//       middle_name: userData?.middle_name || "",
//       last_name: userData?.last_name || "",
//       sex: userData?.sex || false,
//       contact_number: userData?.contact_number || "",
//       email: userData?.email || "",
//       address: userData?.address || "",
//       is_active: userData?.is_active || false,
//       role: userData?.role.id || 1,
//       department: userData?.department.id || 1,
//       username: userData?.username || "",
//       suffix: userData?.suffix || "",
//       birth_date: userData?.birth_date || "",
//       id: userData?.id || "",
//     });
//   }, [userData]);

//   return (
//     <div>
//       <button className="btn btn-xs" onClick={() => setShowEditModal(true)}>
//         Personal Information
//       </button>
//       {showEditModal && (
//         <dialog open className="modal">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg">Edit User</h3>
//             {isUserLoading ? (
//               <p>Loading user data...</p>
//             ) : userError instanceof Error ? (
//               <p>An error occurred: {userError.message}</p>
//             ) : (
//               <form className="py-4" onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="edit_user_id"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     User ID
//                   </label>
//                   <input
//                     type="text"
//                     id="edit_user_id"
//                     value={formData?.id}
//                     readOnly
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="first_name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Birth Date
//                   </label>
//                   <TextField
//                     type="date"
//                     id="birth_date"
//                     name="birth_date"
//                     defaultValue={formData?.birth_date}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="first_name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Firstname
//                   </label>
//                   <TextField
//                     type="text"
//                     id="first_name"
//                     name="first_name"
//                     defaultValue={formData?.first_name}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="last_name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Lastname
//                   </label>
//                   <TextField
//                     type="text"
//                     id="last_name"
//                     name="last_name"
//                     defaultValue={formData?.last_name}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="middle_name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Middlename
//                   </label>
//                   <TextField
//                     type="text"
//                     id="middle_name"
//                     name="middle_name"
//                     defaultValue={formData?.middle_name}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="sex"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Sex
//                   </label>
//                   <div className="flex items-center space-x-4">
//                     <div>
//                       <input
//                         type="radio"
//                         id="male"
//                         name="sex"
//                         value="true"
//                         className="radio"
//                         onChange={handleChange}
//                         checked={formData.sex === true}
//                       />
//                       <label htmlFor="male" className="text-sm">
//                         Male
//                       </label>
//                     </div>
//                     <div>
//                       <input
//                         type="radio"
//                         id="female"
//                         name="sex"
//                         value="false"
//                         className="radio"
//                         onChange={handleChange}
//                         checked={formData.sex === false}
//                       />
//                       <label htmlFor="female" className="text-sm">
//                         Female
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="edit_first_name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Contact number
//                   </label>
//                   <TextField
//                     type="text"
//                     id="contact_number"
//                     name="contact_number"
//                     defaultValue={formData?.contact_number}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="edit_first_name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Email
//                   </label>
//                   <TextField
//                     type="text"
//                     id="email"
//                     name="email"
//                     defaultValue={formData?.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="edit_first_name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     address
//                   </label>
//                   <TextField
//                     type="text"
//                     id="address"
//                     name="address"
//                     defaultValue={formData?.address}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <h1>User details</h1>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="is_active"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Active
//                   </label>
//                   <TextField
//                     type="text"
//                     id="is_active"
//                     name="is_active"
//                     defaultValue={formData?.is_active.toString()}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 {/* <div className="mb-4">
//                   <label
//                     htmlFor="role"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Role
//                   </label>
//                   <TextField
//                     type="text"
//                     id="role"
//                     name="role"
//                     defaultValue={formData?.role.role}
//                     onChange={handleChange}
//                   />
//                 </div> */}
//                 <div className="mb-4">
//                   <label
//                     htmlFor="role"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     role
//                   </label>
//                   <select
//                     id="role"
//                     name="role"
//                     defaultValue={formData?.role || "1"} // Default to 'HR' (value '1')
//                     className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="1">HR</option>
//                     <option value="2">Engineering</option>
//                     <option value="3">Marketing</option>
//                     <option value="4">Sales</option>
//                     <option value="5">Finance</option>
//                     <option value="6">IT</option>
//                   </select>
//                 </div>
//                 {/* <div className="mb-4">
//                   <label
//                     htmlFor="department"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Department
//                   </label>
//                   <TextField
//                     type="text"
//                     id="department"
//                     name="department"
//                     defaultValue={userData?.department.department}
//                     onChange={handleChange}
//                   />
//                 </div> */}
//                 <div className="mb-4">
//                   <label
//                     htmlFor="department"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Department
//                   </label>
//                   <select
//                     id="department"
//                     name="department"
//                     defaultValue={userData?.department.department || "1"}
//                     className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="1">HR</option>
//                     <option value="2">Engineering</option>
//                     <option value="3">Marketing</option>
//                     <option value="4">Sales</option>
//                     <option value="5">Finance</option>
//                     <option value="6">IT</option>
//                   </select>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="edit_first_name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Username
//                   </label>
//                   <TextField
//                     type="text"
//                     id="username"
//                     name="username"
//                     defaultValue={formData?.username}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="modal-action">
//                   <button
//                     type="button"
//                     className="btn"
//                     onClick={() => setShowEditModal(false)}
//                   >
//                     Close
//                   </button>
//                   <button type="submit" className="btn">
//                     Save
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </dialog>
//       )}
//     </div>
//   );
// }

// export default PersonalInformation;
