// import { useMutation } from "@tanstack/react-query";
// import { Formik, Form, Field } from "formik";
// import React from "react";

// const AddDelivery = () => {
//   const {
//     mutate: registerQuotation,
//     isError,
//     error,
//   } = useMutation({
//     mutationFn: (data: AddDelivery) => AddDelivery(data),
//     onSuccess: () => {
//       console.log("delivery registered successfully");
//       queryClient.invalidateQueries({ queryKey: ["delivery"] });
//       setShowRegisterModal(false);
//     },
//     onError: (error: any) => {
//       console.error("Registration error:", error);
//     },
//   });
//   return (
//     <div>
//       <Formik
//         initialValues={{
//           terms: "",
//           po_no: "",
//           or_no: "",
//           salesman: "",
//           approved_by: "",
//           released_by: "",
//           date: "",
//           date_released: "",
//           delivered_to: "",
//           tin: "",
//           business_style: "",
//           address: "",
//           note: "",
//         }}
//         onSubmit={(values, { resetForm }) => {
//           const deliveryPayload = {
//             items: rows.map((row, index) => ({
//               order: `${index + 1}.0`,
//               quantity: row.quantity,
//               description: row.description,
//             })),
//             date: values.date,
//             date_released: values.date_released,
//             created_by: "",
//             delivered_to: values.delivered_to,
//             tin: values.tin,
//             business_style: values.business_style,
//             address: values.address,
//             note: values.note,
//             terms: values.terms,
//             po_no: values.po_no,
//             or_no: values.or_no,
//             salesman: parseInt(values.salesman),
//             approved_by: parseInt(values.approved_by),
//             released_by: parseInt(values.released_by),
//           };

//           registerQuotation(deliveryPayload);
//           console.log(deliveryPayload);
//           resetForm(); // ✅ This clears all form fields
//           setRows([{ no: 1, quantity: "", description: "" }]);
//         }}
//       >
//         <Form className="py-1 uppercase">
//           {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
//           <label htmlFor="">Date</label>
//           <Field
//             type="date"
//             id="date"
//             name="date"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             required
//           />
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
//             {[
//               {
//                 type: "text",
//                 name: "terms",
//                 placeholder: "Enter Terms",
//                 label: "Terms:",
//               },
//               {
//                 type: "text",
//                 name: "or_no",
//                 placeholder: "Enter O.R no.",
//                 label: "O.R No. ",
//               },
//               {
//                 type: "text",
//                 name: "po_no",
//                 placeholder: "Enter P.O no.",
//                 label: "P.O No. ",
//               },
//               {
//                 type: "select",
//                 name: "salesman",
//                 label: "Sales man",
//                 options:
//                   SalesmanData?.map((user) => ({
//                     value: user.id.toString(),
//                     label: user.full_name,
//                   })) || [],
//               },
//               {
//                 type: "select",
//                 name: "approved_by",
//                 label: "Approved by",
//                 options:
//                   ReleasedData?.map((user) => ({
//                     value: user.id.toString(),
//                     label: user.full_name,
//                   })) || [],
//               },
//               {
//                 type: "select",
//                 name: "released_by",
//                 placeholder: "",
//                 label: "Released by",
//                 options:
//                   ReleasedData?.map((user) => ({
//                     value: user.id.toString(),
//                     label: user.full_name,
//                   })) || [],
//               },
//             ].map((item) => (
//               <div key={item.name} className="mb-1">
//                 <label
//                   htmlFor={item.name}
//                   className="block text-sm font-medium "
//                 >
//                   {item.label}
//                 </label>
//                 {item.type === "select" ? (
//                   <Field
//                     as="select"
//                     name={item.name}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   >
//                     <option value="">Select {item.label}</option>

//                     {item.options?.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </Field>
//                 ) : (
//                   <Field
//                     type={item.type}
//                     id={item.name}
//                     name={item.name}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                     placeholder={item.placeholder}
//                     required
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Column 2: Organization Information */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
//             {[
//               // {
//               //   type: "date",
//               //   name: "date",
//               //   //   placeholder: "Date:",
//               //   label: "Date:",
//               // },
//               {
//                 type: "text",
//                 name: "delivered_to",
//                 placeholder: "Delivered to",
//                 label: "Delivered to",
//               },
//               {
//                 type: "text",
//                 name: "tin",
//                 placeholder: "TIN:",
//                 label: "TIN",
//               },
//               {
//                 type: "text",
//                 name: "business_style",
//                 placeholder: "Business Style:",
//                 label: "Business Style",
//               },
//               {
//                 type: "text",
//                 name: "address",
//                 placeholder: "address:",
//                 label: "address",
//               },
//               {
//                 type: "text",
//                 name: "note",
//                 placeholder: "NOTE:",
//                 label: "NOTE",
//               },
//               {
//                 type: "date",
//                 name: "date_released",
//                 //   placeholder: "Date:",
//                 label: "Date Released:",
//               },
//             ].map((item) => (
//               <div key={item.name} className="mb-1">
//                 <label
//                   htmlFor={item.name}
//                   className="block text-sm font-medium "
//                 >
//                   {item.label}
//                 </label>
//                 {item.type === "select" ? (
//                   <Field
//                     as="select"
//                     name={item.name}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   >
//                     {item.options.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </Field>
//                 ) : (
//                   <Field
//                     type={item.type}
//                     id={item.name}
//                     name={item.name}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                     placeholder={item.placeholder}
//                     required
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* end of inputs */}
//           {/* notes */}
//           {/* Table for rows */}
//           <div className="my-5">
//             <table className="min-w-full table-zebra border-collapse border border-gray-300">
//               <thead>
//                 <tr className="border border-black bg-gray-200">
//                   <th className="border px-4 py-2">No.</th>
//                   <th className="border px-4 py-2">Quantity</th>
//                   <th className="border px-4 py-2">Description</th>
//                   <th className="border px-4 py-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, index) => (
//                   <tr key={index}>
//                     <td className="border px-4 py-2">{row.no}</td>
//                     <td className="border px-4 py-2">
//                       <input
//                         type="number"
//                         value={row.quantity}
//                         onChange={(e) => {
//                           const updatedRows = [...rows];
//                           updatedRows[index].quantity = e.target.value;
//                           setRows(updatedRows);
//                         }}
//                         className="w-full border p-2  border-gray-300 rounded-md shadow-sm"
//                       />
//                     </td>
//                     <td className="border px-4 py-2">
//                       <input
//                         type="text"
//                         value={row.description}
//                         onChange={(e) => {
//                           const updatedRows = [...rows];
//                           updatedRows[index].description = e.target.value;
//                           setRows(updatedRows);
//                         }}
//                         className="w-full border p-2   border-gray-300 rounded-md shadow-sm"
//                       />
//                     </td>
//                     <td className="border px-4 py-2">
//                       <div className="flex justify-center">
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveRow(index)}
//                           // className="uppercase flex text-red-600 hover:text-red-800"
//                           className="flex items-center gap-1 bg-white text-red-800 border border-red-800 px-3 py-1.5 rounded-md text-xs shadow transition duration-200 uppercase"
//                         >
//                           {/* <FaTrash /> */}
//                           Remove
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="flex justify-start mt-4">
//               <button
//                 type="button"
//                 onClick={handleAddRow}
//                 className="bg-white uppercase font-bold text-blue-800 border border-blue-800 px-4 py-2 rounded flex items-center space-x-2"
//               >
//                 {/* <FaPlusCircle /> */}
//                 <span>Add Row</span>
//               </button>
//             </div>
//           </div>
//           <div className="modal-action">
//             <button type="submit" className="btn">
//               Submit
//             </button>
//             <button className="btn" onClick={() => setShowRegisterModal(false)}>
//               Close
//             </button>
//           </div>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// export default AddDelivery;
