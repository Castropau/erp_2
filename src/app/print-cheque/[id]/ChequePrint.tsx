"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// import { fetchCashRequestId } from "@/api/cash-request/fetchCashRequestId";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  // Image,
  Font,
} from "@react-pdf/renderer";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
// import { ChequeLists } from "@/api/cheque-request/fetchCheque";
import { ChequeId, fetchChequeById } from "@/api/cheque-request/fetchChequeId";

Font.register({
  family: "Helvetica",
  src: "https://fonts.googleapis.com/css2?family=Helvetica&display=swap",
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  section: {
    // marginBottom: 5,
    justifyContent: "flex-start",
    fontSize: 12,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    // marginBottom: 20,
    marginBottom: 5,
    backgroundColor: "#f9f9f9",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#555555",
    color: "#fff",
    // padding: 10,
    padding: 5,
    justifyContent: "space-between",
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
  },
  tableCell: {
    textAlign: "center",
    // fontSize: 12,
    fontSize: 8,
    // padding: 8,
    // padding: 1,
    // borderRight: "1px solid #ddd",
    // borderBottom: "1px solid #ddd",
  },
  tableCellNoBorder: {
    borderRight: "none",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
  },
  zebraRowEven: {
    backgroundColor: "#f2f2f2",
  },
  zebraRowOdd: {
    backgroundColor: "#ffffff",
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 20,
    marginTop: 1,
    fontSize: 12,
  },
  signature: {
    width: "45%",
    paddingTop: 10,
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: "center",
    color: "#888",
  },
  button: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: "bold",
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#218838",
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#111827",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: "#374151",
  },
  value: {
    fontSize: 12,
    color: "#111827",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    borderTopStyle: "solid",
  },
  totalLabel: {
    fontWeight: "bold",
  },
  totalValue: {
    fontWeight: "bold",
  },
});
interface Cheque {
  serial_no: string;
  date_of_purchase: string;
  description: string;
  amount: number;
  cheque_number: string;
  remarks: string;
}
const ChequePrint = () => {
  const [cheque, setcheque] = useState<ChequeId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchChequeById(id)
        .then((data) => {
          setcheque(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching cash request data.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!cheque) {
    return <div>No data available</div>;
  }

  const CashRequestDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src="/images/logo.png" alt="logo" />
          <Text style={styles.title}>
            Payment/Purchase Request {cheque.serial_no}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, { width: "25%" }]}>SERIAL #</Text>
              <Text style={[styles.tableCell, { width: "25%" }]}>
                DATE PURCHASE
              </Text>
              <Text style={[styles.tableCell, { width: "30%" }]}>
                DESCRIPTION
              </Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>AMOUNT</Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>
                CHEQUE NUMBER
              </Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>REMARKS</Text>
            </View>

            {cheque.cheque_requisition_items.map(
              (item: Cheque, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    index % 2 === 0 ? styles.zebraRowEven : styles.zebraRowOdd,
                  ]}
                >
                  <Text style={[styles.tableCell, { width: "25%" }]}>
                    {item.serial_no}
                  </Text>
                  <Text style={[styles.tableCell, { width: "25%" }]}>
                    {item.date_of_purchase}
                  </Text>
                  <Text style={[styles.tableCell, { width: "30%" }]}>
                    {item.description}
                  </Text>
                  <Text style={[styles.tableCell, { width: "20%" }]}>
                    {item.amount}
                  </Text>
                  <Text style={[styles.tableCell, { width: "20%" }]}>
                    {/* {item.unit_price} */}
                    {item.cheque_number}
                  </Text>
                  <Text style={[styles.tableCell, { width: "20%" }]}>
                    {/* {item.total_price} */}
                    {item.remarks}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        <View style={styles.section}>
          {/* <Text style={styles.summaryTitle}>Summary</Text> */}
          {/* <View style={styles.summaryRow}>
            <Text style={styles.label}>Discount:</Text>
            <Text style={styles.value}>{cheque.discount || "N/A"}%</Text>
          </View> */}
          {/* <View style={styles.summaryRow}>
            <Text style={styles.label}>VAT:</Text>
            <Text style={styles.value}>{cheque.vat_value || "N/A"}%</Text>
          </View> */}
          {/* <View style={styles.summaryRow}>
            <Text style={styles.label}>EWT:</Text>
            <Text style={styles.value}>{cheque.ewt_value || "N/A"}%</Text>
          </View> */}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={[styles.label, styles.totalLabel]}>Total:</Text>
            <Text style={[styles.value, styles.totalValue]}>
              {/* {cheque.total || "0.00"} */}
              {Number(cheque?.sub_total || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>

        {/* <View style={styles.section}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            Special Instructions:
          </Text>
          <Text>{cheque.special_instructions || "N/A"}</Text>
        </View> */}

        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <Text style={{ fontWeight: "bold" }}>Requested By</Text>
            <Text>{cheque.requested_by?.full_name || "N/A"}</Text>
            {/* <Text style={{ marginTop: 20 }}>______________________</Text> */}
          </View>
          {/* <View style={styles.signature}>
            <Text style={{ fontWeight: "bold" }}>Date Noted</Text>
            <Text style={{ marginTop: 40 }}>______________________</Text>
          </View> */}
        </View>
        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <Text style={{ fontWeight: "bold" }}>Date Requested</Text>
            <Text>{cheque?.date_requested || "N/A"}</Text>
            {/* <Text style={{ marginTop: 20 }}>______________________</Text> */}
          </View>
          <View style={styles.signature}>
            <Text style={{ fontWeight: "bold" }}>Approved By</Text>
            <Text style={{ marginTop: 40 }}>______________________</Text>
          </View>
        </View>
        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <Text style={{ fontWeight: "bold" }}>Noted By</Text>
            {/* <Text>{cheque.requested_by?.full_name || "N/A"}</Text> */}
            <Text style={{ marginTop: 40 }}>______________________</Text>
          </View>
          {/* <View style={styles.signature}>
            <Text style={{ fontWeight: "bold" }}>Date Approved</Text>
            <Text style={{ marginTop: 40 }}>______________________</Text>
          </View> */}
        </View>
        {/* <View style={{ alignItems: "center", marginTop: 5, fontSize: 12 }}>
          <Text style={{ fontWeight: "bold" }}>Approved By</Text>
          <Text style={{ marginTop: 40 }}>______________________</Text>
        </View> */}
        <View style={styles.footer}>
          <Text>Generated on: {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-center mb-10">
        {/* <img src="/images/logo.png" alt="Logo" className="h-12 w-12 mr-4" /> */}
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={48}
          height={48}
          className="h-12 w-12 mr-4"
        />
        <h1 className="text-2xl md:text-3xl font-bold uppercase text-center text-gray-800">
          cheque request Voucher {cheque.serial_no}
        </h1>
      </div>

      <div className="flex justify-end mb-6">
        <PDFDownloadLink
          document={<CashRequestDocument />}
          fileName={`${cheque.serial_no}.pdf`}
        >
          {({ loading }) => (
            <button
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white py-2 px-6 rounded-md font-semibold shadow-md transition`}
              disabled={loading}
            >
              {loading ? "Preparing PDF..." : "Download as PDF"}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-2 mb-8">
        <p>
          {/* <strong>Sub total:</strong> {cheque.sub_total || "N/A"}
           */}
          <strong>Name of organization:</strong>

          {cheque.name_of_organization}
        </p>
        <p>
          <strong>Payable to:</strong> {cheque.payable_to || "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {cheque.address || "N/A"}
        </p>
        <p>
          <strong>Purpose:</strong> {cheque.purpose || "N/A"}
        </p>
        <p>
          <strong>Date requested:</strong> {cheque.date_requested || "N/A"}
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-600 text-white uppercase">
            <tr>
              <th className="px-4 py-3 text-center">Serial #</th>
              <th className="px-4 py-3 text-center">Date of purchase</th>
              <th className="px-4 py-3 text-center">Description</th>
              <th className="px-4 py-3 text-center">Amount</th>
              <th className="px-4 py-3 text-center">Cheque Number</th>
              <th className="px-4 py-3 text-center">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {cheque.cheque_requisition_items.map((item, index: number) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } text-center`}
              >
                <td className="px-4 py-2">{item.serial_no}</td>
                <td className="px-4 py-2">{item.date_of_purchase}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.amount}</td>
                <td className="px-4 py-2">{item.cheque_number}</td>
                <td className="px-4 py-2">{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-2 mb-8">
        <p>
          {/* <strong>Sub total:</strong> {cheque.sub_total || "N/A"}
           */}
          <strong>Sub total:</strong>

          {Number(cheque?.sub_total || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p>
          <strong>Discount:</strong> {cheque.discount || "N/A"}
        </p>
        <p>
          <strong>Total:</strong>{" "}
          {Number(cheque?.sub_total || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p>
          <strong>VAT:</strong> {cheque.vat_value || "N/A"}%
        </p>
        <p>
          <strong>EWT:</strong> {cheque.ewt_value || "N/A"}%
        </p>
        <p>
          <strong>Grand Total:</strong>{" "}
          {/* <strong>{cheque.grand_total.ToFixed() || "0.00"}</strong> */}
          {/* <strong>
            {cheque?.grand_total != null
              ? Number(cheque.grand_total).toFixed(2)
              : "0.00"}
          </strong> */}
          <strong>
            {Number(cheque?.grand_total || 0).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>
        </p>
      </div>

      {/* <div className="bg-white p-6 rounded-lg shadow-md mb-8 break-all">
        <p>
          <strong>Special Instructions:</strong>
          {cheque.special_instructions || "N/A"}
        </p>
      </div> */}

      {/* <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <p className="font-semibold mb-2">Requested By:</p>
          <p>{cheque.requested_by?.full_name || "N/A"}</p>
          <div className="border-t border-gray-300 mt-6 pt-2 text-center">
            ______________________
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <p className="font-semibold mb-2 ">Approved By:</p>
          <p>{cheque.requested_by?.full_name || "N/A"}</p>
          <div className="border-t border-gray-300 mt-6 pt-2 text-center">
            ______________________
          </div>
        </div>
      </div> */}

      {/* <p className="text-xs text-center text-gray-500 mt-10">
        Generated on: {new Date().toLocaleDateString()}
      </p> */}
    </div>
  );
};

export default ChequePrint;
