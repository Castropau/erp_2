// "use client";

// import React, { useState } from "react";
// import { FaCirclePlus } from "react-icons/fa6";
// import { Field, Form, Formik, FieldArray } from "formik";
// import { CiCirclePlus } from "react-icons/ci";

// /** api */
// import { CreateCategory } from "@/api/inventory/CreateCategory";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// /** interfaces */
// import { fetchDepartmentsList } from "@/api/User/fetchDepartmentList";
// import { fetchUserList } from "@/api/User/fetchUserList";

// export default function AddQuotationClients() {
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [selectedProject, setSelectedProject] = useState("");

//   const queryClient = useQueryClient();

//   const {
//     mutate: registerCategory,
//     isError,
//     error,
//   } = useMutation({
//     mutationFn: (data: CreateCategory) => CreateCategory(data),
//     onSuccess: () => {
//       console.log("category registered successfully");
//       queryClient.invalidateQueries({ queryKey: ["category"] });
//       setShowRegisterModal(false);
//     },
//     onError: (error: any) => {
//       console.error("Registration error:", error);
//     },
//   });

//   // Fetch project data based on dropdown selection
//   const { data: projects } = useQuery({
//     queryKey: ["projects"],
//     queryFn: fetchDepartmentsList, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
//   });

//   // Fetch user list for 'remittedBy' dropdown
//   const { data: users } = useQuery({
//     queryKey: ["users"],
//     queryFn: fetchUserList, // Assume fetchUserList is an API call to fetch users
//   });

//   // Handle form submission
//   const handleSubmit = (values: any) => {
//     console.log(values);
//   };

//   return (
//     <>
//       <div className="flex justify-start">
//         <button
//           className="btn btn-info"
//           onClick={() => setShowRegisterModal(true)}
//         >
//           <CiCirclePlus className="w-6 h-6 btn-info" />
//           Add Quotations
//         </button>
//       </div>

//       {/* Registration Modal */}
//       {showRegisterModal && (
//         <dialog open className="modal">
//           <div className="modal-box w-11/12 max-w-7xl">
//             <h3 className="font-bold text-lg">Create New Quotations</h3>
//             <Formik
//               initialValues={{
//                 project: "",
//                 projectName: "",
//                 projectDate: "",
//                 remittedBy: "",
//                 receivedBy: "",
//                 tableRows: [
//                   {
//                     date: "",
//                     particulars: "",
//                     srp: "",
//                     quantity: "",
//                     total: 0,
//                     balance: "",
//                   },
//                 ],
//                 notesRows: [{ note: "" }],
//               }}
//               onSubmit={handleSubmit}
//             >
//               {({ values, setFieldValue }) => {
//                 // Calculate total expenses and cash from accounting
//                 const totalExpenses = values.tableRows.reduce(
//                   (acc, row) =>
//                     acc + (parseFloat(row.srp) * parseFloat(row.quantity) || 0),
//                   0
//                 );
//                 const totalCashFromAccounting = values.tableRows.reduce(
//                   (acc, row) => acc + (parseFloat(row.balance) || 0),
//                   0
//                 );
//                 const totalCashFromBalance = values.tableRows.reduce(
//                   (acc, row) => acc + (parseFloat(row.balance) || 0),
//                   0
//                 );

//                 return (
//                   <Form className="py-4">
//                     {/* Project and Address Inputs */}
//                     {[
//                       {
//                         label: "Project",
//                         name: "projectName",
//                         type: "text",
//                         placeholder: "Enter project name",
//                       },
//                     ].map((item) => (
//                       <div key={item.name}>
//                         <label className="block mb-2 text-sm font-medium text-gray-700">
//                           {item.label}
//                         </label>
//                         <Field
//                           type={item.type}
//                           name={item.name}
//                           placeholder={item.placeholder}
//                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                           required
//                         />
//                       </div>
//                     ))}

//                     {/* Dropdown for Project Selection */}
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Company
//                       </label>
//                       <Field
//                         as="select"
//                         name="project"
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                         onChange={(e) => {
//                           setSelectedProject(e.target.value);
//                           setFieldValue("project", e.target.value);
//                         }}
//                       >
//                         <option value="">Select a Project</option>
//                         {projects?.map((project) => (
//                           <option key={project.id} value={project.id}>
//                             {project.department}
//                           </option>
//                         ))}
//                       </Field>
//                     </div>

//                     {/* Project Details */}
//                     {selectedProject && (
//                       <div className="space-y-4">
//                         <h4 className="font-semibold">Project Details</h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                           {[
//                             {
//                               label: "Owner",
//                               name: "remittedBy",
//                               type: "text",
//                               placeholder: "Owner",
//                             },
//                             {
//                               label: "Owner",
//                               name: "receivedBy",
//                               type: "text",
//                               placeholder: "Owner",
//                             },
//                           ].map((item) => (
//                             <div key={item.name}>
//                               <label className="block mb-2 text-sm font-medium text-gray-700">
//                                 {item.label}
//                               </label>
//                               {item.type === "select" ? (
//                                 <Field
//                                   as="select"
//                                   name={item.name}
//                                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                   required
//                                 >
//                                   <option value="">Select {item.label}</option>
//                                   {users?.map((user) => (
//                                     <option key={user.id} value={user.id}>
//                                       {user.full_name}
//                                     </option>
//                                   ))}
//                                 </Field>
//                               ) : (
//                                 <Field
//                                   type={item.type}
//                                   name={item.name}
//                                   placeholder={item.placeholder}
//                                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                   required
//                                 />
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Table for Adding Expenses */}
//                     <div className="space-y-4">
//                       <h4 className="font-semibold">Expenses</h4>
//                       <FieldArray
//                         name="tableRows"
//                         render={(arrayHelpers) => (
//                           <div>
//                             <table className="table-auto w-full border-collapse">
//                               <thead>
//                                 <tr>
//                                   {[
//                                     "# ITEM",
//                                     "Description",
//                                     "SRP",
//                                     "Quantity",
//                                     "Total",
//                                   ].map((header) => (
//                                     <th key={header} className="p-2 text-left">
//                                       {header}
//                                     </th>
//                                   ))}
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {values.tableRows.map((row, index) => (
//                                   <tr key={index}>
//                                     <td className="p-2">
//                                       <Field
//                                         type="text"
//                                         name={`tableRows[${index}].item`}
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                       />
//                                     </td>
//                                     <td className="p-2">
//                                       <Field
//                                         type="text"
//                                         name={`tableRows[${index}].particulars`}
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                       />
//                                     </td>
//                                     <td className="p-2">
//                                       <Field
//                                         type="number"
//                                         name={`tableRows[${index}].srp`}
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                       />
//                                     </td>
//                                     <td className="p-2">
//                                       <Field
//                                         type="number"
//                                         name={`tableRows[${index}].quantity`}
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                         onChange={(e) => {
//                                           const quantity = parseFloat(
//                                             e.target.value
//                                           );
//                                           const srp =
//                                             parseFloat(
//                                               values.tableRows[index].srp
//                                             ) || 0;
//                                           const total = srp * quantity;
//                                           setFieldValue(
//                                             `tableRows[${index}].quantity`,
//                                             quantity
//                                           );
//                                           setFieldValue(
//                                             `tableRows[${index}].total`,
//                                             total
//                                           );
//                                         }}
//                                       />
//                                     </td>
//                                     <td className="p-2">
//                                       <Field
//                                         type="number"
//                                         name={`tableRows[${index}].total`}
//                                         readOnly
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                       />
//                                     </td>
//                                     <td className="p-2">
//                                       <button
//                                         type="button"
//                                         onClick={() =>
//                                           arrayHelpers.remove(index)
//                                         }
//                                         className="btn btn-danger"
//                                       >
//                                         Remove
//                                       </button>
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 arrayHelpers.push({
//                                   date: "",
//                                   particulars: "",
//                                   srp: "",
//                                   quantity: "",
//                                   total: 0,
//                                   balance: "",
//                                 })
//                               }
//                               className="btn btn-info mt-4"
//                             >
//                               Add Row
//                             </button>
//                           </div>
//                         )}
//                       />
//                     </div>

//                     {/* Total Row */}
//                     <div className="flex justify-between py-2 border-t border-gray-300">
//                       <div className="ml-auto flex space-x-4 w-full">
//                         {/* Discount Input */}
//                         <div className="flex flex-col w-1/4">
//                           <label className="font-semibold">Discount</label>
//                           <Field
//                             type="number"
//                             name="discount"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                             onChange={(e) => {
//                               const discount = parseFloat(e.target.value) || 0;
//                               setFieldValue("discount", discount);
//                             }}
//                           />
//                         </div>

//                         {/* VAT Input */}
//                         <div className="flex flex-col w-1/4">
//                           <label className="font-semibold">VAT (%)</label>
//                           <Field
//                             type="number"
//                             name="vat"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                             onChange={(e) => {
//                               const vat = parseFloat(e.target.value);
//                               setFieldValue("vat", vat);
//                             }}
//                           />
//                         </div>

//                         {/* Sub Total */}
//                         <div className="flex flex-col w-1/4">
//                           <label className="font-semibold">Sub Total</label>
//                           <input
//                             type="number"
//                             value={totalExpenses}
//                             readOnly
//                             className="bg-gray-200 p-2 rounded-md w-full"
//                           />
//                         </div>

//                         {/* VAT Value */}
//                         <div className="flex flex-col w-1/4">
//                           <label className="font-semibold">VAT Value</label>
//                           <input
//                             type="number"
//                             value={(() => {
//                               const vat = (parseFloat(values.vat) || 0) / 100;
//                               return totalExpenses * vat;
//                             })()}
//                             readOnly
//                             className="bg-gray-200 p-2 rounded-md w-full"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Grand Total */}
//                     <div className="flex justify-between py-2 border-t border-gray-300">
//                       <div className="ml-auto flex space-x-4 w-full">
//                         {/* Grand Total */}
//                         <div className="flex flex-col w-1/4">
//                           <label className="font-semibold">Grand Total</label>
//                           <input
//                             type="number"
//                             value={(() => {
//                               const discountAmount =
//                                 totalExpenses * (values.discount / 100) || 0;
//                               const vatAmount =
//                                 totalExpenses * (values.vat / 100) || 0;
//                               return totalExpenses - discountAmount + vatAmount;
//                             })()}
//                             readOnly
//                             className="bg-gray-200 p-2 rounded-md w-full"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     {/* Notes & Assumptions */}
//                     <div className="mt-6">
//                       <h4 className="font-semibold">Notes & Assumptions</h4>
//                       <Field
//                         as="textarea"
//                         name="notes"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2"
//                         placeholder="Enter any notes or assumptions regarding this quotation"
//                         value="default"
//                       />
//                     </div>

//                     {/* Terms & Conditions */}
//                     <div className="mt-6">
//                       <h4 className="font-semibold">Terms & Conditions</h4>
//                       <Field
//                         as="textarea"
//                         name="terms"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2"
//                         placeholder="Enter terms and conditions for this quotation"
//                         value="default"
//                       />
//                     </div>

//                     {/* Submit and Cancel Buttons */}
//                     <div className="modal-action">
//                       <button type="submit" className="btn">
//                         Submit
//                       </button>
//                       <button
//                         type="button"
//                         className="btn"
//                         onClick={() => setShowRegisterModal(false)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </Form>
//                 );
//               }}
//             </Formik>

//             {isError && (
//               <div className="text-red-500 mt-4">
//                 <p>Error: {error?.message || "An error occurred"}</p>
//               </div>
//             )}
//           </div>
//         </dialog>
//       )}
//     </>
//   );
// }
