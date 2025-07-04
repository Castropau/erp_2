// "use client";
// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// const Page = () => {
//   const [excelData, setExcelData] = useState([]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const arrayBuffer = event.target.result;
//         const workbook = XLSX.read(arrayBuffer, { type: "array" });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const data = XLSX.utils.sheet_to_json(worksheet);
//         setExcelData(data);
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
//       {excelData.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               {Object.keys(excelData[0]).map((key) => (
//                 <th key={key}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {excelData.map((row, index) => (
//               <tr key={index}>
//                 {Object.values(row).map((value, i) => (
//                   <td key={i}>{value}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Page;
