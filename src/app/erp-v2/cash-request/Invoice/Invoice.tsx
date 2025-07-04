// "use client";

// import {
//   Page,
//   Text,
//   View,
//   Document,
//   PDFViewer,
//   PDFDownloadLink,
// } from "@react-pdf/renderer";
// import { styles } from "./style";

// import { tableData, totalData } from "./data";

// export default function Invoice2() {
//   const InvoicePDF = () => (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <View>
//             <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
//             <Text>Invoice #INV-2024-001</Text>
//           </View>
//           <View style={styles.spaceY}>
//             <Text style={styles.textBold}>Company Name</Text>
//             <Text>123 Business Street</Text>
//             <Text>City, State 12345</Text>
//           </View>
//         </View>

//         <View style={styles.spaceY}>
//           <Text style={[styles.billTo, styles.textBold]}>Bill To:</Text>
//           <Text>Client Name</Text>
//           <Text>Client Address</Text>
//           <Text>City, State ZIP</Text>
//         </View>

//         {/* Render the table */}
//         <table style={styles.table}>
//           <th style={[styles.tableHeader, styles.textBold]}>
//             <td style={styles.td}>Description</td>
//             <td style={styles.td}>Quantity</td>
//             <td style={styles.td}>Unit Price</td>
//             <td style={styles.td}>Total</td>
//           </th>
//           {tableData.map((item, index) => (
//             <tr key={index}>
//               <td style={styles.td}>{item.description}</td>
//               <td style={styles.td}>{item.quantity}</td>
//               <td style={styles.td}>${item.unitPrice.toFixed(2)}</td>
//               <td style={styles.td}>${item.total.toFixed(2)}</td>
//             </tr>
//           ))}
//         </table>

//         <View style={styles.totals}>
//           <View
//             style={{
//               minWidth: "256px",
//             }}
//           >
//             {totalData.map((item) => (
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginBottom: "8px",
//                 }}
//               >
//                 <Text style={item.label === "Total" ? styles.textBold : {}}>
//                   {item.label}
//                 </Text>
//                 <Text style={item.label === "Total" ? styles.textBold : {}}>
//                   {item.value}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
//   return (
//     <div className="max-w-2xl mx-auto my-10">
//       <div className="w-full h-[500px]">
//         <PDFViewer width="100%" height="100%">
//           <InvoicePDF />
//         </PDFViewer>
//       </div>
//       <div className="mt-6 flex justify-center">
//         <PDFDownloadLink document={<InvoicePDF />} fileName="invoice.pdf">
//           <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
//             Download PDF
//           </button>
//         </PDFDownloadLink>
//       </div>
//     </div>
//   );
// }
