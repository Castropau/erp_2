"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// import {
//   IoMdArrowBack,
//   IoMdCreate,
//   IoMdMore,
//   IoMdPrint,
//   IoMdCloseCircle,
// } from "react-icons/io";
import Link from "next/link";

import {
  // QueryClient,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { ChequeId, fetchChequeById } from "@/api/cheque-request/fetchChequeId";

import { fetchUserLists } from "@/api/cheque-request/fetchUsersCheque";
import {
  fetchCashRequest,
  RequisitionCashOptions,
} from "@/api/cheque-request/fetchCashRequest";
import { ChequeUpdate, updateCheque } from "@/api/cheque-request/updateCheque";
// import LoadingPage from "@/components/Loading/LoadingPage";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import NotFound from "@/components/Error/NotFound";

// interface PageProps {}

function Detail() {
  const [cheque, setCheque] = useState<ChequeId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [selectedCashRecord, setSelectedCashRecord] =
    useState<RequisitionCashOptions | null>(null);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (id) {
      fetchChequeById(id as string)
        .then((data) => {
          setCheque(data);
          setLoading(false);
        })
        .catch(() => {
          // setError("Error fetching cheque details.");
          setLoading(false);
        });
    }
  }, [id]);

  const {
    isLoading,
    // error: userError,
    data,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserLists,
  });

  const { isLoading: isCashLoading, data: cashRecords } = useQuery({
    queryKey: ["cashRecords"],
    queryFn: fetchCashRequest,
  });

  // const { mutate: updatedCheque } = useMutation({
  //   mutationFn: (data: UpdateCheque) => updateCheque(cheque!.id, data),
  //   onSuccess: () => {
  //     console.log("cheque updated successfully");
  //     queryClient.invalidateQueries({ queryKey: ["cheque", id] });
  //     queryClient.invalidateQueries({ queryKey: ["cheque"] });
  //     setShowEditModal(false);
  //   },
  //   onError: (error) => {
  //     console.error("Error updating cheque:", error);
  //   },
  // });

  const { mutate: updatedCheque } = useMutation({
    mutationFn: (data: ChequeUpdate) => updateCheque(cheque!.id, data),
    onSuccess: () => {
      console.log("cheque updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cheque", id] });
      queryClient.invalidateQueries({ queryKey: ["cheque"] });
      // setShowEditModal(false);
    },
    onError: (error) => {
      console.error("Error updating cheque:", error);
    },
  });

  // const handleAddRow = (cashId: number) => {
  //   const selectedCash = cashRecords?.find((cash) => cash.id === cashId);
  //   if (selectedCash) {
  //     setRows((prevRows) => [
  //       ...prevRows,
  //       {
  //         id: selectedCash.id,
  //         cash_record: selectedCash,
  //       },
  //     ]);
  //   }
  // };
  const handleAddRow = (cashRequisitionId: number) => {
    const selectedCashRecord = cashRecords?.find(
      (item: RequisitionCashOptions) => item.id === cashRequisitionId
    );

    if (selectedCashRecord) {
      setRows((prevRows) => [
        ...prevRows,
        {
          id: selectedCashRecord.id,
          cash_requisition: selectedCashRecord.id,
          serial_no: selectedCashRecord.serial_no,
          date_of_purchase: selectedCashRecord.date_requested,
          date_requested: selectedCashRecord.date_requested,
          description: selectedCashRecord.special_instructions,
          amount: selectedCashRecord.grand_total,
          requested_by: selectedCashRecord.requested_by,
          cheque_number: "",
          remarks: "",

          // cheque_number: selectedCashRecord.serial_no,
          // remarks: selectedCashRecord.special_instructions,
        },
      ]);
      setSelectedCashRecord(selectedCashRecord);
    }
  };

  // const handleRemoveRow = (rowId: number) => {
  //   setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
  // };
  // const handleRemoveRow = (rowId: number) => {
  //   // Remove from the rows state
  //   setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));

  //   // Optionally, you can also remove it from cheque.cheque_requisition_items (if needed)
  //   setCheque((prevCheque) => ({
  //     ...prevCheque,
  //     cheque_requisition_items: prevCheque.cheque_requisition_items.filter(
  //       (item) => item.id !== rowId
  //     ),
  //   }));
  // };
  const handleRemoveRow = (rowId: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
    setCheque((prevCheque) => {
      if (!prevCheque) return null;

      return {
        ...prevCheque,
        cheque_requisition_items: prevCheque.cheque_requisition_items.filter(
          (item) => item.id !== rowId
        ),
      };
    });
  };
  const openPdfWindow = () => {
    const newWindow = window.open(`/print-cheque/${id}`, "_blank");
    if (newWindow) {
      newWindow.focus();
    }
  };
  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  if (!cheque) return <NotFound />;

  // Calculate total amount of cheque requisition items
  // const totalAmount =
  //   cheque.cheque_requisition_items?.reduce(
  //     (total, item) => total + item.amount,
  //     0
  //   ) || 0;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="">
      {showSuccess && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Updated successfully!</span>
        </div>
      )}
      <div className="flex gap-2">
        <Link href="/erp-v2/cheque-request">
          <button className="btn  text-black uppercase">
            {/* <IoMdArrowBack /> */}
            Back to Cheque List
          </button>
        </Link>
        <button
          className="btn   text-white bg-blue-500 cursor-pointer uppercase px-2 py-2"
          onClick={openPdfWindow}
        >
          print
        </button>
        {/* <button onClick={handleEditToggle}>
          {isEditing ? (
            // <IoMdCloseCircle
            //   className="cursor-pointer text-lg"
            //   title="Cancel Edit"
            // />
            <button className="btn  uppercase ">cancel</button>
          ) : (
            // <button className="btn bg-white border-black text-black uppercase">
            //   edit
            // </button>
            // <IoMdCreate className="cursor-pointer text-lg" title="Edit" />
            <button className="btn  text-black uppercase">edit</button>
          )}
        </button> */}
        <button
          onClick={handleEditToggle}
          className={`btn uppercase ${isEditing ? "" : "text-black"}`}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Formik Form */}
      <div className="bg-white p-4 rounded-lg dark:bg-gray-dark dark:text-white">
        <div className="flex justify-between items-center mb-1">
          <h3 className=" font-semibold mb-1 dark:bg-gray-dark dark:text-white">
            {cheque.serial_no}
          </h3>
          <div className="flex gap-4">
            {/* <IoMdPrint className="cursor-pointer text-lg" title="Print" /> */}
            {/* <button
              className="btn   text-white bg-blue-500 cursor-pointer uppercase px-2 py-2"
              onClick={openPdfWindow}
            >
              print
            </button> */}
            {/* <button onClick={handleEditToggle}>
              {isEditing ? (
                // <IoMdCloseCircle
                //   className="cursor-pointer text-lg"
                //   title="Cancel Edit"
                // />
                <button className="btn bg-white border-black text-black uppercase">
                  cancel
                </button>
              ) : (
                // <button className="btn bg-white border-black text-black uppercase">
                //   edit
                // </button>
                // <IoMdCreate className="cursor-pointer text-lg" title="Edit" />
                <button className="btn  text-black uppercase">edit</button>
              )}
            </button> */}
            {/* <IoMdMore className="cursor-pointer text-lg" title="More options" /> */}
          </div>
        </div>

        <Formik
          initialValues={{
            serial_no: cheque.serial_no || "",
            // date_of_purchase: cheque.date_of_purchase || "",
            purpose: cheque.purpose || "",
            address: cheque.address || "",
            payable_to: cheque.payable_to || "",
            name_of_organization: cheque.name_of_organization || "",
            requested_by: cheque.requested_by?.id || 0,
            date_requested: cheque.date_requested || "",
            // status: cheque.status || "",
            remarks: cheque.remarks || "",
            cheque_requisition_items: cheque.cheque_requisition_items,
          }}
          enableReinitialize={true}
          // onSubmit={(values) => {
          //   // const updatedChequeItems = rows.map((row) => ({
          //   //   ...row,
          //   //   cheque_number: row.cheque_number,
          //   //   remarks: row.remarks,
          //   //   date_of_purchase: row.date_requested,
          //   // }));
          //   // const updatedChequeItems = [
          //   //   ...cheque.cheque_requisition_items, // Include existing items
          //   //   ...rows, // Include new rows
          //   // ];
          //   const updatedChequeItems = [
          //     ...cheque.cheque_requisition_items,
          //     ...rows.map((row) => ({
          //       ...row,
          //       date_of_purchase: row.date_of_purchase || row.date_requested,
          //       cheque_number: row.cheque_number,
          //       remarks: row.remarks,
          //     })), // Include new rows
          //   ];

          //   // const updatedValues = {
          //   //   ...values,
          //   //   cheque_requisition_items: updatedChequeItems,
          //   // };
          //   // const updatedValues = {
          //   //   ...values,
          //   //   cheque_requisition_items: updatedChequeItems.map((row) => ({
          //   //     ...row,
          //   //     cheque_number: row.cheque_number, // Ensure cheque number is updated
          //   //     remarks: row.remarks, // Ensure remarks are updated
          //   //     date_of_purchase: row.date_requested, // Update date_of_purchase to date_requested
          //   //   })),
          //   // };
          //   const updatedValues = {
          //     ...values,
          //     cheque_no: cheque.cheque_no,
          //     cheque_requisition_items: updatedChequeItems,
          //   };

          //   updatedCheque(updatedValues);
          //   console.log(updatedValues);
          // }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              // Prepare updatedChequeItems with merged rows
              const updatedChequeItems = [
                ...cheque.cheque_requisition_items,
                ...rows.map((row) => ({
                  ...row,
                  date_of_purchase: row.date_of_purchase || row.date_requested,
                  cheque_number: row.cheque_number,
                  remarks: row.remarks,
                })),
              ];

              // Prepare final values to submit
              const updatedValues = {
                ...values,
                cheque_no: cheque.cheque_no,
                cheque_requisition_items: updatedChequeItems,
              };

              // Await async update call
              await updatedCheque(updatedValues);
              console.log("Cheque updated:", updatedValues);

              // Optionally show success alert
              setShowSuccess(true);

              // Redirect after 2 seconds
              setTimeout(() => {
                window.location.href = "/erp-v2/cheque-request";
              }, 2000);
            } catch (error) {
              console.error("Update failed:", error);
            } finally {
              // Stop the submitting spinner
              setSubmitting(false);
            }
          }}
        >
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-8  gap-4 uppercase">
              {/* Form Fields for Cheque Details */}
              {isEditing && (
                <div className="space-y-4">
                  <label className="block mb-1 text-sm font-bold text-gray-900 dark:bg-gray-dark dark:text-white">
                    Serial#
                  </label>
                  <Field
                    as="select"
                    name="serial_no"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    // disabled={!isEditing}
                  >
                    <option value="">Select Serial No</option>
                    {[...cheque.cheque_requisition_items, ...rows].map(
                      (item) => (
                        <option key={item.id} value={item.serial_no}>
                          {item.serial_no}
                        </option>
                      )
                    )}
                  </Field>
                </div>
              )}
              {/* Requested By Field */}
              <div className="space-y-1">
                <label className="block mb-1 text-sm font-bold text-gray-900 dark:bg-gray-dark dark:text-white">
                  Requested By
                </label>
                {isEditing ? (
                  <Field
                    as="select"
                    name="requested_by"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  >
                    {isLoading ? (
                      <option value="">Loading users...</option>
                    ) : (
                      data?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.full_name}
                        </option>
                      ))
                    )}
                  </Field>
                ) : (
                  <Field
                    type="text"
                    id="requested_by"
                    name="requested_by"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    value={cheque.requested_by?.full_name || ""}
                    readOnly
                  />
                )}
              </div>

              {/* Input fields for Purpose, Date Requested, Organization, Payable to, Address */}
              {[
                {
                  type: "text",
                  name: "purpose",
                  label: "Purpose",
                  placeholder: "Enter the purpose",
                },
                {
                  type: "date",
                  name: "date_requested",
                  label: "Date Requested",
                },
                {
                  type: "text",
                  name: "name_of_organization",
                  label: "Name of Organization",
                  placeholder: "Organization",
                },
                {
                  type: "text",
                  name: "payable_to",
                  label: "Payable To",
                  placeholder: "Payee",
                },
                {
                  type: "text",
                  name: "address",
                  label: "Address",
                  placeholder: "Organization Address",
                },
              ].map((field) => (
                <div key={field.name} className="space-y-1 uppercase ">
                  <label className="block mb-1 text-sm font-bold text-gray-900 dark:bg-gray-dark dark:text-white">
                    {field.label}
                  </label>
                  <Field
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    placeholder={field.placeholder}
                    readOnly={!isEditing} // Toggle read-only based on isEditing
                  />
                </div>
              ))}
              {isEditing && (
                <select
                  className="mt-6 h-7 bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  // className="bg-gray-50 border dark:bg-gray-dark dark:text-white border-gray-300 text-gray-900 rounded focus:ring-primary-600 focus:border-primary-600 block p-[4px] text-xs"
                  onChange={(e) => handleAddRow(Number(e.target.value))}
                >
                  <option value="">Select Cash Record</option>
                  {isCashLoading ? (
                    <option value="">Loading cash records...</option>
                  ) : (
                    cashRecords?.map((cash: any) => (
                      <option key={cash.id} value={cash.id}>
                        {cash.serial_no}
                      </option>
                    ))
                  )}
                </select>
              )}
              {/* Discount Field */}
              <div className="space-y-4">
                {/* <label className="block mb-2 text-sm font-medium text-gray-900">
                  Discount
                </label>
                <Field
                  type="number"
                  name="discount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  readOnly={!isEditing} // Disable when not in edit mode
                /> */}
              </div>

              {/* Show the Update button only if in editing mode */}
              {/* {isEditing && (
                <button
                  type="submit"
                  className="w-full text-white bg-info focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center mt-4 hover:shadow-lg transition-all duration-200 ease-in-out"
                >
                  Update
                </button>
              )} */}
            </div>
            {/* {isEditing && (
              <button
                type="submit"
                className="btn mt-1 uppercase text-black bg-white border border-black   rounded-lg text-center"
              >
                Update
              </button>
            )} */}
            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn mt-2 uppercase text-black  rounded-lg text-center"
                >
                  Update
                </button>
              </div>
            )}
          </Form>
        </Formik>
      </div>

      {/* Table to display cheque items */}
      {/* Table to display cheque items */}
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        <table
          style={{ width: "100%" }}
          className="table table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg"
        >
          <thead className="bg-white text-black  border-b-gray-400">
            <tr className="text-sm font-medium text-center uppercase">
              <th className="px-4 py-2">Serial No</th>
              <th className="px-4 py-2">Date of Purchase</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Cheque Number</th>
              <th className="px-4 py-2">Remark</th>
              {isEditing && <th className="px-4 py-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            {cheque.cheque_requisition_items?.map((item) => (
              <tr key={item.id} className="text-center ">
                <td className="text-sm text-center">{item.serial_no}</td>
                <td className="text-sm text-center">{item.date_of_purchase}</td>
                <td className="text-sm text-center">{item.description}</td>
                <td className="text-sm text-center">{item.amount}</td>
                <td className="text-sm text-center">{item.cheque_number}</td>
                <td className="text-sm text-center">{item.remarks}</td>
                {/* <td className="p-2">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveRow(item.id)}
                  >
                    Remove
                  </button>
                </td> */}
                {isEditing && ( // Conditionally render Remove button
                  <td className="text-xs flex gap-2 justify-center">
                    <button
                      className="hover:underline flex items-center gap-1  hover:cursor-pointer text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                      // className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveRow(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                )}
              </tr>
            ))}

            {/* Loop through added rows */}
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="text-sm text-center">{row.serial_no}</td>
                <td className="text-sm text-center">
                  <input
                    type="date"
                    value={row.date_requested}
                    onChange={(e) => {
                      const updatedRow = {
                        ...row,
                        date_requested: e.target.value,
                      };
                      setRows((prevRows) =>
                        prevRows.map((r) => (r.id === row.id ? updatedRow : r))
                      );
                    }}
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    readOnly={!isEditing}
                  />
                </td>
                <td className="text-sm text-center">{row.description}</td>
                <td className="text-sm text-center">{row.amount}</td>
                <td className="text-sm text-center">
                  <input
                    type="text"
                    value={row.cheque_number}
                    onChange={(e) => {
                      const updatedRow = {
                        ...row,
                        cheque_number: e.target.value,
                      };
                      setRows((prevRows) =>
                        prevRows.map((r) => (r.id === row.id ? updatedRow : r))
                      );
                    }}
                    className="text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                    readOnly={!isEditing}
                  />
                </td>
                <td className="text-sm text-center">
                  <input
                    type="text"
                    value={row.remarks}
                    onChange={(e) => {
                      const updatedRow = { ...row, remarks: e.target.value };
                      setRows((prevRows) =>
                        prevRows.map((r) => (r.id === row.id ? updatedRow : r))
                      );
                    }}
                    className="text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                    readOnly={!isEditing}
                  />
                </td>
                {isEditing && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleRemoveRow(row.id)}
                      className="hover:underline hover:cursor-pointer flex items-center gap-1   text-red-700  px-3 py-1.5 text-xs  transition duration-200 uppercase"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between">
          {/* Only show the Select Cash Record dropdown if in editing mode */}
          {/* {isEditing && (
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-dark dark:text-white"
              onChange={(e) => handleAddRow(Number(e.target.value))}
            >
              <option value="">Select Cash Record</option>
              {isCashLoading ? (
                <option value="">Loading cash records...</option>
              ) : (
                cashRecords?.map((cash: any) => (
                  <option key={cash.id} value={cash.id}>
                    {cash.serial_no}
                  </option>
                ))
              )}
            </select>
          )} */}
        </div>
        {/* {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn mt-2 uppercase text-black  rounded-lg text-center"
            >
              Update
            </button>
          </div>
        )} */}

        {/* Total Display */}
        <div className="mt-4 flex justify-end">
          <span className="font-semibold text-lg">
            Total: ₱{/* {totalAmount.toFixed(2)} */}
            {Number(cheque?.grand_total || 0).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Detail;
