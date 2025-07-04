// "use client";

// import React, { useState } from "react";
// import { FaCirclePlus } from "react-icons/fa6";
// import { Field, Form, Formik, FieldArray } from "formik";
// import { CiCirclePlus, CiEdit } from "react-icons/ci";
// import { FaBan, FaEdit } from "react-icons/fa"; // Import Edit Icon

// /** api */
// import { CreateCategory } from "@/api/inventory/CreateCategory";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// /** interfaces */
// import { fetchDepartmentsList } from "@/api/User/fetchDepartmentList";
// import { fetchUserList } from "@/api/User/fetchUserList";
// import { fetchQuotationDataById } from "@/api/quotation/viewQuotation";
// import { fetchClientsList } from "@/api/quotation/fetchClients";
// import { UpdateView, updateView } from "@/api/quotation/updateView";
// import { fetchQuotationById } from "@/api/clients/viewQuo";

// interface QuotationId {
//   id: number;
// }

// export default function ViewQuo(props: QuotationId) {
//   const { id } = props;
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [selectedProject, setSelectedProject] = useState("");
//   const [isEditable, setIsEditable] = useState(false); // State to control if inputs are editable or not
//   const [selectedClient, setSelectedClient] = useState<any>(null); // To store selected client details

//   const queryClient = useQueryClient();

//   // const {
//   //   mutate: registerCategory,
//   //   isError,
//   //   error,
//   // } = useMutation({
//   //   mutationFn: (data: CreateCategory) => CreateCategory(data),
//   //   onSuccess: () => {
//   //     console.log("category registered successfully");
//   //     queryClient.invalidateQueries({ queryKey: ["category"] });
//   //     setShowRegisterModal(false);
//   //   },
//   //   onError: (error: any) => {
//   //     console.error("Registration error:", error);
//   //   },
//   // });

//   // Fetch project data based on dropdown selection
//   const { data: projects } = useQuery({
//     queryKey: ["clients"],
//     queryFn: fetchClientsList, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
//   });

//   const {
//     data: QuotationData,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["quotation", id],
//     queryFn: () => fetchQuotationById(id),
//     enabled: !!id,
//   });
//   // Handle form submission
//   const { mutate: updatedView } = useMutation({
//     mutationFn: (data: UpdateView) => updateView(id, data),
//     onSuccess: () => {
//       console.log("quotations updated successfully");
//       queryClient.invalidateQueries({ queryKey: ["quotations", id] });
//       setShowRegisterModal(false); // Close the modal after successful update
//     },
//     onError: (error) => {
//       console.error("Error updating quotation:", error);
//     },
//   });

//   const handleCompanyChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//     setFieldValue: any
//   ) => {
//     const value = e.target.value;
//     setSelectedProject(value); // Update the local state with the selected project

//     // Find the selected client based on its ID and set the details (contact_person and delivery_address)
//     const client = projects?.find((project) => project.id === parseInt(value));
//     if (client) {
//       setSelectedClient(client); // Update the selected client in local state
//       setFieldValue("project", client); // Update Formik with the selected project
//       setFieldValue("contact_person", client.contact_person); // Update Formik with the contact person
//       setFieldValue("address", client.address); // Update Formik with the delivery address
//     }
//   };

//   const handleSubmit = (values: any) => {
//     console.log(values);
//   };

//   return (
//     <>
//       <div className="flex justify-start">
//         <button
//           className="btn bg-white border border-blue-800 text-blue-800 uppercase"
//           onClick={() => setShowRegisterModal(true)}
//         >
//           {/* <CiCirclePlus className="w-6 h-6 btn-info" /> */}
//           View
//         </button>
//       </div>

//       {/* Registration Modal */}
//       {showRegisterModal && (
//         <dialog open className="modal backdrop-blur-sm mt-10">
//           <div className="modal-box w-11/12 max-w-7xl overflow-y-auto max-h-[90vh] dark:bg-gray-dark">
//             <div className="flex justify-between">
//               <h3 className="font-bold text-lg">View Quotations</h3>
//               {/* Toggle between CiEdit and CiCircleBan based on editability */}
//               {isEditable ? (
//                 <FaBan
//                   onClick={() => setIsEditable(false)} // Switch to readonly mode
//                   className="w-6 h-6 cursor-pointer"
//                 />
//               ) : (
//                 <CiEdit
//                   onClick={() => setIsEditable(true)} // Switch to editable mode
//                   className="w-6 h-6 cursor-pointer"
//                 />
//               )}
//             </div>

//             <Formik
//               initialValues={{
//                 project: QuotationData?.client.id,
//                 // project: {
//                 //   id: QuotationData?.id,
//                 //   client: QuotationData?.client,
//                 // },
//                 delivery_address: QuotationData?.delivery_address,
//                 project_name: QuotationData?.project_name,
//                 remittedBy: QuotationData?.created_by.full_name,
//                 receivedBy: "",
//                 contact_person: QuotationData?.client.contact_person || "", // Initially populate if available
//                 address: QuotationData?.client.address || "",
//                 quotation_items: QuotationData?.quotation_items.map((item) => ({
//                   item: item.item || "",
//                   description: item.description || "",
//                   srp: item.srp || 0,
//                   quantity: item.quantity || 0, // Ensure quantity is initialized as 0
//                   total: item.srp * (item.quantity || 0),
//                   balance: 0,

//                   // date: particular.date || "",
//                   // particulars: particular.particulars || "",
//                   // expenses: particular.expenses || 0, // Default to 0 if not available
//                   // cashFromAccounting: particular.cash_from_accounting || 0, // Default to 0 if not available
//                   // balance: particular.balance || 0, // Default to 0 if not available
//                   // vatIncluded: particular.vat_inclusive || false,
//                 })),
//                 // notesRows: [{ note: QuotationData?.notes_assumptions }],
//                 notes_assumptions: QuotationData?.notes_assumptions || "", // Set initial value for notes
//                 terms_conditions: QuotationData?.terms_conditions || "",
//                 discount: QuotationData?.discount || 0,
//                 vat_value: QuotationData?.vat_value || 0,
//                 vat: 0,
//                 // vat_value: QuotationData?.vat_total || 0,
//               }}
//               onSubmit={(values) => {
//                 // Trigger update mutation when form is submitted
//                 const updatedData = {
//                   ...values,
//                   tableRows: values.quotation_items?.map((row) => ({
//                     ...row,
//                     total: row.srp * row.quantity, // Recalculate total if needed
//                   })),
//                   // id: "",
//                   // quotation: "",
//                   // // client: [
//                   // //   {
//                   // //     id: 0,
//                   // //     client: "",
//                   // //     address: "",
//                   // //     position: "",
//                   // //     contact_person: "",
//                   // //     contact_number: "",
//                   // //     email: "",
//                   // //   },
//                   // // ],
//                   // created_by: {
//                   //   id: 0,
//                   //   username: "",
//                   //   full_name: "",
//                   //   role: "",
//                   //   department: "",
//                   //   contact_number: "",
//                   // },
//                   // sub_total: "",
//                   // discount: 0,
//                   // total: "",
//                   // vat_value: 0,
//                   // vat_total: "",
//                   // grand_total: "",
//                   // notes_assumptions: "",
//                   // terms_conditions: "",
//                   // // created_by: [
//                   // //   {
//                   // //     id: 0,
//                   // //     username: "",
//                   // //     full_name: "",
//                   // //     role: "",
//                   // //     department: "",
//                   // //     contact_number: "",
//                   // //   },
//                   // // ],
//                   // client: {
//                   //   id: 0,
//                   //   client: "",
//                   //   address: "",
//                   //   position: "",
//                   //   contact_person: "",
//                   //   contact_number: "",
//                   //   email: "",
//                   // },

//                   // date_created: "",
//                   // project_name: "",
//                   // delivery_address: "",
//                   // quotation_item: "",
//                 };

//                 // Call the mutation function to update the quotation

//                 updatedView(updatedData);
//                 console.log(updatedData);
//               }}
//             >
//               {({ values, setFieldValue }) => {
//                 // Calculate total expenses and cash from accounting
//                 const totalExpenses = values.quotation_items?.reduce(
//                   (acc, row) => acc + (row.srp * row.quantity || 0),
//                   0
//                 );
//                 const totalCashFromAccounting = values.quotation_items?.reduce(
//                   (acc, row) => acc + (row.balance || 0),
//                   0
//                 );
//                 const totalCashFromBalance = values.quotation_items?.reduce(
//                   (acc, row) => acc + (row.balance || 0),
//                   0
//                 );

//                 return (
//                   <Form className="py-4">
//                     {/* Project and Address Inputs */}
//                     {[
//                       {
//                         label: "Project",
//                         name: "project_name",
//                         type: "text",
//                         placeholder: "Enter project name",
//                       },
//                     ].map((item) => (
//                       <div key={item.name}>
//                         <label className="block mb-2 text-sm font-medium ">
//                           {item.label}
//                         </label>
//                         <Field
//                           type={item.type}
//                           name={item.name}
//                           placeholder={item.placeholder}
//                           className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                           required
//                           disabled={!isEditable} // Conditionally disable field based on edit mode
//                         />
//                       </div>
//                     ))}

//                     {/* Dropdown for Project Selection */}
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium ">
//                         Company
//                       </label>
//                       <Field
//                         as="select"
//                         name="project"
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                         onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
//                           handleCompanyChange(e, setFieldValue)
//                         }
//                         // value={values.project?.id || ""}
//                         disabled={!isEditable}
//                       >
//                         <option value="">Select a Project</option>
//                         {projects?.map((project) => (
//                           <option key={project.id} value={project.id}>
//                             {project.client}
//                           </option>
//                         ))}
//                       </Field>
//                     </div>
//                     {/* Project Details */}
//                     {/* {selectedProject && ( */}
//                     {
//                       <div className="space-y-4">
//                         <h4 className="font-semibold">Project Details</h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                           <div>
//                             <label className="block mb-2 text-sm font-medium ">
//                               Contact person
//                             </label>
//                             <Field
//                               type="text"
//                               name="contact_person"
//                               placeholder="Owner"
//                               className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                               value={values.contact_person || ""} // Use Formik value
//                               required
//                               disabled={!isEditable} // Conditionally disable field based on edit mode
//                             />
//                           </div>
//                           <div>
//                             <label className="block mb-2 text-sm font-medium ">
//                               Delivery address
//                             </label>
//                             <Field
//                               type="text"
//                               name="delivery_address"
//                               placeholder="Enter delivery address"
//                               className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                               value={values.delivery_address || ""} // Use Formik value
//                               required
//                               disabled={!isEditable} // Conditionally disable field based on edit mode
//                             />
//                           </div>
//                           <div>
//                             <label className="block mb-2 text-sm font-medium ">
//                               address
//                             </label>
//                             <Field
//                               type="text"
//                               name="address"
//                               placeholder="Enter address"
//                               className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                               value={values.address || ""} // Use Formik value
//                               required
//                               disabled={!isEditable} // Conditionally disable field based on edit mode
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     }

//                     {/* Table for Adding Expenses */}
//                     <div className="space-y-4">
//                       <h4 className="font-semibold">Expenses</h4>
//                       <FieldArray
//                         name="quotation_items"
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
//                                 {values.quotation_items?.map((row, index) => (
//                                   <tr key={index}>
//                                     <td className="p-2">
//                                       <Field
//                                         type="text"
//                                         name={`quotation_items[${index}].item`}
//                                         disabled={!isEditable}
//                                         className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                       />
//                                     </td>
//                                     <td className="p-2">
//                                       <Field
//                                         type="text"
//                                         name={`quotation_items[${index}].description`}
//                                         disabled={!isEditable}
//                                         className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                       />
//                                     </td>
//                                     <td className="p-2">
//                                       <Field
//                                         type="number"
//                                         name={`quotation_items[${index}].srp`}
//                                         disabled={!isEditable}
//                                         className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                       />
//                                     </td>
//                                     {/* <td className="p-2">
//                                       <Field
//                                         type="number"
//                                         name={`quotation_items[${index}].quantity`}
//                                         disabled={!isEditable}
//                                         className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                         onChange={(
//                                           e: React.ChangeEvent<HTMLInputElement>
//                                         ) => {
//                                           const quantity = e.target.value;
//                                           const srp =
//                                             values.quotation_items![index]
//                                               .srp || 0;
//                                           const total = srp * quantity;
//                                           setFieldValue(
//                                             `quotation_items[${index}].quantity`,
//                                             quantity
//                                           );
//                                           setFieldValue(
//                                             `quotation_items[${index}].total`,
//                                             total
//                                           );
//                                         }}
//                                       />
//                                     </td> */}
//                                     <td className="p-2">
//                                       <Field
//                                         type="number"
//                                         name={`quotation_items[${index}].quantity`}
//                                         disabled={!isEditable}
//                                         className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                         onChange={(
//                                           e: React.ChangeEvent<HTMLInputElement>
//                                         ) => {
//                                           const quantity = parseFloat(
//                                             e.target.value
//                                           );
//                                           const srp =
//                                             values.quotation_items![index]
//                                               .srp || 0;
//                                           const total = srp * quantity;

//                                           setFieldValue(
//                                             `quotation_items[${index}].quantity`,
//                                             quantity
//                                           );
//                                           setFieldValue(
//                                             `quotation_items[${index}].total`,
//                                             total.toFixed(2)
//                                           );
//                                         }}
//                                       />
//                                     </td>

//                                     <td className="p-2">
//                                       <Field
//                                         type="number"
//                                         name={`quotation_items[${index}].total`}
//                                         readOnly
//                                         className="bg-gray-50 border border-gray-300 dark:text-white dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                                       />
//                                     </td>
//                                     <td className="p-2">
//                                       {isEditable && (
//                                         <button
//                                           type="button"
//                                           onClick={() =>
//                                             arrayHelpers.remove(index)
//                                           }
//                                           className="btn btn-danger"
//                                         >
//                                           Remove
//                                         </button>
//                                       )}
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                             {isEditable && (
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   arrayHelpers.push({
//                                     date: "",
//                                     particulars: "",
//                                     srp: "",
//                                     quantity: "",
//                                     total: 0,
//                                     balance: "",
//                                   })
//                                 }
//                                 className="btn btn-info mt-4"
//                               >
//                                 Add Row
//                               </button>
//                             )}
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
//                             disabled={!isEditable}
//                             className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                             onChange={(
//                               e: React.ChangeEvent<HTMLInputElement>
//                             ) => {
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
//                             name="vat_value"
//                             disabled={!isEditable}
//                             className="bg-gray-50 border border-gray-300 dark:bg-gray-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                             onChange={(
//                               e: React.ChangeEvent<HTMLInputElement>
//                             ) => {
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
//                             className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-gray"
//                           />
//                         </div>

//                         {/* VAT Value */}
//                         <div className="flex flex-col w-1/4">
//                           <label className="font-semibold">VAT Value</label>
//                           <input
//                             type="number"
//                             value={(() => {
//                               const vat = (values.vat || 0) / 100;
//                               return totalExpenses! * vat;
//                             })()}
//                             readOnly
//                             className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-gray"
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
//                                 totalExpenses! * (values.discount / 100) || 0;
//                               const vatAmount =
//                                 totalExpenses! * (values.vat / 100) || 0;
//                               return (
//                                 totalExpenses! - discountAmount + vatAmount
//                               );
//                             })()}
//                             readOnly
//                             className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-gray"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Notes & Assumptions */}
//                     <div className="mt-6">
//                       <h4 className="font-semibold">Notes & Assumptions</h4>
//                       <Field
//                         as="textarea"
//                         name="notes_assumptions"
//                         disabled={!isEditable}
//                         className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:border border-gray rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2"
//                         placeholder="Enter any notes or assumptions regarding this quotation"
//                       />
//                     </div>

//                     {/* Terms & Conditions */}
//                     <div className="mt-6">
//                       <h4 className="font-semibold">Terms & Conditions</h4>
//                       <Field
//                         as="textarea"
//                         name="terms_conditions"
//                         disabled={!isEditable}
//                         className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:border border-gray rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2"
//                         placeholder="Enter terms and conditions for this quotation"
//                       />
//                     </div>

//                     {/* Submit and Cancel Buttons */}
//                     <div className="modal-action">
//                       <button type="submit" className="btn">
//                         {isEditable ? "Update" : "Submit"}{" "}
//                         {/* Conditionally change the button text */}
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
