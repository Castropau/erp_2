"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  fetchCashRequestId,
  RequisitionCashId,
} from "@/api/cash-request/fetchCashRequestId";
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
    fontSize: 12,
    // padding: 8,
    padding: 1,
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
// interface Table {
//   item: string;
//   quantity: number;
//   unit_of_measurement: string;
//   supplier: string;
//   unit_price: number;
//   total_price: number;
// }
const OpenFile = () => {
  const [cashRequestData, setCashRequestData] =
    useState<RequisitionCashId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchCashRequestId(id as string)
        .then((data) => {
          setCashRequestData(data);
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

  if (!cashRequestData) {
    return <div>No data available</div>;
  }

  const CashRequestDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src="/images/logo.png" alt="logo" />
          <Text style={styles.title}>
            Payment/Purchase Request {cashRequestData.serial_no}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, { width: "27%" }]}>ITEM</Text>
              <Text style={[styles.tableCell, { width: "25%" }]}>QUANTITY</Text>
              <Text style={[styles.tableCell, { width: "13%" }]}>UNIT</Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>SUPPLIER</Text>
              <Text style={[styles.tableCell, { width: "25%" }]}>
                UNIT PRICE
              </Text>
              <Text style={[styles.tableCell, { width: "15%" }]}>TOTAL</Text>
            </View>

            {cashRequestData.cash_requisition_items.map(
              (item, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    index % 2 === 0 ? styles.zebraRowEven : styles.zebraRowOdd,
                  ]}
                >
                  <Text style={[styles.tableCell, { width: "27%" }]}>
                    {item.item}
                  </Text>
                  <Text style={[styles.tableCell, { width: "25%" }]}>
                    {item.quantity}
                  </Text>
                  <Text style={[styles.tableCell, { width: "13%" }]}>
                    {item.unit_of_measurement}
                  </Text>
                  <Text style={[styles.tableCell, { width: "20%" }]}>
                    {item.supplier}
                  </Text>
                  <Text style={[styles.tableCell, { width: "25%" }]}>
                    {/* {item.unit_price} */}
                    {Number(item.unit_price || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                  <Text style={[styles.tableCell, { width: "15%" }]}>
                    {/* {item.total_price} */}
                    {Number(item.total_price || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Discount:</Text>
            <Text style={styles.value}>
              {cashRequestData.discount || "N/A"}%
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>VAT:</Text>
            <Text style={styles.value}>
              {cashRequestData.vat_value || "N/A"}%
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>EWT:</Text>
            <Text style={styles.value}>
              {cashRequestData.ewt_value || "N/A"}%
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={[styles.label, styles.totalLabel]}>Total:</Text>
            <Text style={[styles.value, styles.totalValue]}>
              {/* {cashRequestData.total || "0.00"} */}
              {Number(cashRequestData?.total || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            Special Instructions:
          </Text>
          <Text>{cashRequestData.special_instructions || "N/A"}</Text>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <Text style={{ fontWeight: "bold" }}>Requested By</Text>
            <Text>{cashRequestData.requested_by?.full_name || "N/A"}</Text>
            {/* <Text style={{ marginTop: 20 }}>______________________</Text> */}
          </View>
          <View style={styles.signature}>
            <Text style={{ fontWeight: "bold" }}>Date Noted</Text>
            <Text style={{ marginTop: 40 }}>______________________</Text>
          </View>
        </View>
        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <Text style={{ fontWeight: "bold" }}>Date Requested</Text>
            <Text>{cashRequestData?.date_requested || "N/A"}</Text>
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
            {/* <Text>{cashRequestData.requested_by?.full_name || "N/A"}</Text> */}
            <Text style={{ marginTop: 40 }}>______________________</Text>
          </View>
          <View style={styles.signature}>
            <Text style={{ fontWeight: "bold" }}>Date Approved</Text>
            <Text style={{ marginTop: 40 }}>______________________</Text>
          </View>
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
          Payment/Purchase Request Voucher {cashRequestData.serial_no}
        </h1>
      </div>

      <div className="flex justify-end mb-6">
        <PDFDownloadLink
          document={<CashRequestDocument />}
          fileName={`${cashRequestData.serial_no}.pdf`}
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

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-600 text-white uppercase">
            <tr>
              <th className="px-4 py-3 text-center">Item</th>
              <th className="px-4 py-3 text-center">Quantity</th>
              <th className="px-4 py-3 text-center">Unit</th>
              <th className="px-4 py-3 text-center">Supplier</th>
              <th className="px-4 py-3 text-center">Unit Price</th>
              <th className="px-4 py-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {cashRequestData.cash_requisition_items.map(
              (item, index: number) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } text-center`}
                >
                  <td className="px-4 py-2">{item.item}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.unit_of_measurement}</td>
                  <td className="px-4 py-2">{item.supplier}</td>
                  <td className="px-4 py-2">{item.unit_price}</td>
                  <td className="px-4 py-2">{item.total_price}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-2 mb-8">
        <p>
          {/* <strong>Sub total:</strong> {cashRequestData.sub_total || "N/A"}
           */}
          <strong>Sub total:</strong>

          {Number(cashRequestData?.sub_total || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p>
          <strong>Discount:</strong> {cashRequestData.discount || "N/A"}
        </p>
        <p>
          <strong>Total:</strong> {cashRequestData.total || "0.00"}
        </p>
        <p>
          <strong>VAT:</strong> {cashRequestData.vat_value || "N/A"}%
        </p>
        <p>
          <strong>EWT:</strong> {cashRequestData.ewt_value || "N/A"}%
        </p>
        <p>
          <strong>Grand Total:</strong>{" "}
          {/* <strong>{cashRequestData.grand_total.ToFixed() || "0.00"}</strong> */}
          {/* <strong>
            {cashRequestData?.grand_total != null
              ? Number(cashRequestData.grand_total).toFixed(2)
              : "0.00"}
          </strong> */}
          <strong>
            {Number(cashRequestData?.grand_total || 0).toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </strong>
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8 break-all">
        <p>
          <strong>Special Instructions:</strong>
          {cashRequestData.special_instructions || "N/A"}
        </p>
      </div>

      {/* <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <p className="font-semibold mb-2">Requested By:</p>
          <p>{cashRequestData.requested_by?.full_name || "N/A"}</p>
          <div className="border-t border-gray-300 mt-6 pt-2 text-center">
            ______________________
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <p className="font-semibold mb-2 ">Approved By:</p>
          <p>{cashRequestData.requested_by?.full_name || "N/A"}</p>
          <div className="border-t border-gray-300 mt-6 pt-2 text-center">
            ______________________
          </div>
        </div>
      </div> */}

      <p className="text-xs text-center text-gray-500 mt-10">
        Generated on: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default OpenFile;
