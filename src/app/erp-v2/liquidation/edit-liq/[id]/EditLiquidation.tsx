"use client";
import { fetchLiquidationDataById } from "@/api/liquidations/fetchView";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik, Field, FieldArray } from "formik";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { UpdateView, updateView } from "@/api/liquidations/updateView";
import { fetchUserList } from "@/api/User/fetchUserList";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import Link from "next/link";
import NotFound from "@/components/Error/NotFound";
import Image from "next/image";
import Images from "../../../../images/logo.png";

const EditLiquidation = () => {
  const pathname = usePathname();
  const [isEditable, setIsEditable] = useState(false);

  const id = pathname?.split("/").pop();
  const queryClient = useQueryClient();
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserList,
  });
  const {
    data: liquidationData,
    isLoading,
    // isError,
    error,
  } = useQuery({
    queryKey: ["liquidation", id],
    queryFn: () => fetchLiquidationDataById(id as string),
    enabled: !!id,
  });

  const { mutate: updatedView } = useMutation({
    mutationFn: (data: UpdateView) => updateView(id as string, data),
    onSuccess: () => {
      console.log("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["liquidation", id] });
      //   setShowRegisterModal(false); // Close the modal after successful update
    },
    onError: (error) => {
      console.error("Error updating liquidation:", error);
    },
  });
  interface Photos {
    id: number;
    photo: string;
  }

  interface TaskNotess {
    // id: number;
    order: number;
    description: string;
  }

  interface Notes {
    // id: number;
    items: TaskNotess[];
    description: string;
  }

  // interface Liquidation {
  //   // cashFromAccounting: number;
  //   // // id: number;
  //   // balance: string;
  //   // date: string;
  //   // particulars: string;
  //   // expenses: number;
  //   // cash_from_accounting: number;
  //   // vat_inclusive: boolean;
  //   date: string;
  //   particulars: string;
  //   expenses: number; // Accept string from form
  //   cashFromAccounting: number | string;
  //   balance: number;
  //   vat_inclusive: boolean;
  // }

  interface RemmittedBy {
    id: number;
    username: string;
    full_name: string;
    role: string;
    department: string;
    contact_number: string;
  }

  interface ReceivedBy {
    id: number;
    username: string;
    full_name: string;
    role: string;
    department: string;
    contact_number: string;
  }
  // interface FetchLiqId {
  //   notesRows: Noted[];
  //   // tableRows: any;
  //   id: number | string;
  //   liquidation_no: string;
  //   date_created: string;
  //   photos: Photos;
  //   task_notes: Notes[];
  //   liquidation_particulars: Liquidation[];
  //   created_by: string;
  //   remitted_by: RemmittedBy;
  //   received_by: ReceivedBy;
  //   total: string;
  //   project_name: string;
  //   date: string;
  //   cash_requisition: string;
  // }

  // order: note?.order ?? "", // Add this if your schema supports it
  //         description: note?.description ?? "",
  //         items: (note?.items || []).map((item) => ({
  //           order: item?.order ?? 0,
  //           description: item?.description ?? "",
  //         })),
  // interface Noted {
  //   order: number;
  //   description: string;
  //   items: TaskNotess[];
  // }
  // interface FetchLiqId {
  //   notesRows: Notes[];
  //   tableRows: Liquidation[];
  //   id: number | string;
  //   liquidation_no: string;
  //   date_created: string;
  //   photos: Photos;
  //   task_notes: Notes[];
  //   liquidation_particulars: Liquidation[];
  //   created_by: string;
  //   remitted_by: RemmittedBy;
  //   received_by: ReceivedBy;
  //   total: string;
  //   project_name: string;
  //   date: string;
  //   cash_requisition: string;
  // }
  // For each row in liquidation_particulars
  // interface Liquidations {
  //   date: string;
  //   particulars: string;
  //   expenses: number;
  //   cashFromAccounting: number; // Accept string during input, cast later
  //   balance: string; // Accept string during input, cast later
  //   // vatIncluded: boolean;
  // }

  // For each item inside a task note
  // interface TaskNotess1 {
  //   order: number;
  //   description: string;
  // }

  // For each task note
  // interface TaskNotes {
  //   order: number;
  //   description: string;
  //   items: TaskNotess[];
  // }
  interface LiquidationParticular {
    id?: string;
    date: string;
    particulars: string;
    expenses: number;
    cash_from_accounting: number;
    balance: number;
    vat_inclusive: boolean;
  }
  interface FormLiquidation {
    // date: string;
    // particulars: string;
    // expenses: number | string;
    // cashFromAccounting: number | string;
    // balance: number | string;
    // vat_inclusive: boolean;
    date: string;
    particulars: string;
    expenses: number;
    cashFromAccounting: number;
    balance: number;
    vat_inclusive: boolean;
    cash_from_accounting: number;
  }
  // Root interface for form values
  interface FetchLiqIds {
    tableRows: FormLiquidation[]; // Form version
    liquidation_no: string;
    date_created: string;
    photos: Photos;
    task_notes: Notes[];
    liquidation_particulars: LiquidationParticular[]; // API version
    created_by: string;
    remitted_by: RemmittedBy;
    received_by: ReceivedBy;
    total: string;
    project_name: string;
    date: string;
    cash_requisition: string;
  }

  // const handleSubmit = (values: FetchLiqIds) => {
  //   const updatedLiquidationData = {
  //     ...values,
  //     liquidation_no: liquidationData!.liquidation_no, // reassign if needed

  //     // task_notes: values.notesRows.map((note) => ({
  //     //   ...note,
  //     //   items: note.items.map((item: TaskNotess1) => ({
  //     //     ...item,
  //     //     order: item.order || 0, // cast to integer
  //     //   })),
  //     // })),

  //     // liquidation_particulars: values.tableRows.map((row: Liquidation) => ({
  //     //   ...row,
  //     //   expenses: row.expenses || 0, // already a number in Liquidation type
  //     //   cash_from_accounting: row.cashFromAccounting || 0,
  //     //   balance: row.balance || 0,
  //     // })),
  //     liquidation_particulars: values.tableRows.map(
  //       (row): LiquidationParticular => ({
  //         date: row.date,
  //         particulars: row.particulars,
  //         expenses: Number(row.expenses) || 0,
  //         cash_from_accounting: Number(row.cashFromAccounting) || 0,
  //         balance: String(row.balance ?? 0),
  //         vat_inclusive: row.vat_inclusive,
  //       })
  //     ),
  //   };

  //   updatedView(updatedLiquidationData); // Call mutation
  //   console.log(updatedLiquidationData);
  // };
  const handleSubmit = (values: FetchLiqIds) => {
    // Simple date validation function (YYYY-MM-DD)
    const isValidDate = (dateStr: string) =>
      /^\d{4}-\d{2}-\d{2}$/.test(dateStr);

    // Check for invalid dates in tableRows
    const invalidDates = values.tableRows.filter(
      (row) => !isValidDate(row.date)
    );

    if (invalidDates.length > 0) {
      alert(
        "Please fix date format to YYYY-MM-DD in all liquidation particulars."
      );
      return; // Stop submit
    }

    const updatedLiquidationData = {
      ...values,
      liquidation_no: liquidationData!.liquidation_no, // reassign if needed

      liquidation_particulars: values.tableRows.map(
        (row): LiquidationParticular => ({
          date: row.date,
          particulars: row.particulars,
          expenses: Number(row.expenses) || 0,
          cash_from_accounting: Number(row.cashFromAccounting) || 0,
          balance: Number(row.balance ?? 0),
          vat_inclusive: row.vat_inclusive,
        })
      ),
    };

    updatedView(updatedLiquidationData); // Call mutation
    console.log(updatedLiquidationData);
  };

  // const handleSubmit = (values: FetchLiqId) => {
  //   // Prepare the form data for submission
  //   const updatedLiquidationData = {
  //     ...values,
  //     liquidation_no: liquidationData!.liquidation_no, // Ensure you're passing all necessary fields
  //     task_notes: values.notesRows.map((note: Notes) => ({
  //       ...note,
  //       items: note.items.map((item: any) => ({
  //         ...item,
  //         order: parseInt(item.order, 10), // Ensure order is an integer
  //       })),
  //     })),
  //     liquidation_particulars: values.tableRows.map((row: Liquidation) => ({
  //       ...row,
  //       // expenses: parseFloat(row.expenses),
  //       // cash_from_accounting: parseFloat(row.cashFromAccounting),
  //       // balance: parseFloat(row.balance),
  //       expenses: row.expenses || 0, // Ensure it's a number, default to 0
  //       cash_from_accounting: parseFloat(row.cashFromAccounting) || 0, // Ensure it's a number, default to 0
  //       balance: parseFloat(row.balance) || 0, // Ensure it's a number, default to 0
  //     })),
  //   };
  //   updatedView(updatedLiquidationData); // Call mutation
  //   console.log(updatedLiquidationData);
  // };
  // const handleRowFieldChange = (
  //   index: number,
  //   field: string,
  //   value: string,
  //   setFieldValue: any,
  //   values: any
  // ) => {
  //   setFieldValue(`tableRows[${index}].${field}`, value);

  //   if (field === "expenses" || field === "cash_from_accounting") {
  //     const expenses = parseFloat(values.tableRows[index].expenses) || 0;
  //     const cashFromAccounting =
  //       parseFloat(values.tableRows[index].cash_from_accounting) || 0;

  //     const balance = expenses - cashFromAccounting;
  //     setFieldValue(`tableRows[${index}].balance`, balance.toString());
  //   }
  // };
  interface TableRow {
    balance: number;
    date: string;
    particulars: string;
    expenses: number;
    cash_from_accounting: number;
    vat_inclusive: boolean;
    // [key: string]: string; // for other dynamic fields in a row
  }

  interface Values {
    tableRows: TableRow[];
  }

  type SetFieldValue = (field: string, value: string | number) => void;

  const handleRowFieldChange = (
    index: number,
    field: keyof TableRow,
    value: string,
    setFieldValue: SetFieldValue,
    values: Values
  ) => {
    setFieldValue(`tableRows[${index}].${field}`, value);

    if (field === "expenses" || field === "cash_from_accounting") {
      const expenses = values.tableRows[index].expenses || 0;
      const cashFromAccounting =
        values.tableRows[index].cash_from_accounting || 0;

      const balance = expenses - cashFromAccounting;
      setFieldValue(`tableRows[${index}].balance`, balance.toString());
    }
  };

  // const fetchLiquidationDataById = async (id: string) => {
  //   const res = await fetch(`${process.env.baseUrl}/api/v1/liquidations/${id}`);
  //   if (!res.ok) {
  //     if (res.status === 404) {
  //       throw new Error("Not Found");
  //     }
  //     throw new Error("Failed to fetch");
  //   }
  //   return res.json();
  // };

  // if (isError && error.message === "Not Found") {
  //   return <NotFound />;
  // }
  // if (!liquidationData) {
  //   return <NotFound />;
  // }

  interface TableRow {
    date: string;
    particulars: string;
    expenses: number;
    cashFromAccounting: number;
    balance: number;
    cash_from_accounting: number;
    // vatIncluded: boolean;
  }
  // interface Notes {
  //   note: string;
  // }
  interface Notes {
    order: number;
    description: string;
  }

  // interface SubItem {
  //   order: number | string;
  //   description: string;
  // }
  // interface TaskNote {
  //   order: number | string;
  //   description: string;
  //   items: SubItem[];
  // }

  // interface FormValues {
  //   task_notes: TaskNote[];
  // }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <NotFound />;
  }
  return (
    <Formik
      initialValues={{
        // projectName: liquidationData?.project_name || "",
        photos: liquidationData!.photos || "",
        project_name: liquidationData?.project_name || "",
        projectDate: liquidationData?.date || "",
        remmitted_by: liquidationData?.remitted_by?.id || "",
        receivedBy: liquidationData?.received_by?.id || "",
        // tableRows: liquidationData?.liquidation_particulars.map(
        //   (particular) => ({
        //     date: particular.date || "",
        //     particulars: particular.particulars || "",
        //     expenses: particular.expenses || "",
        //     cashFromAccounting: particular.cash_from_accounting || "",
        //     balance: particular.balance || "",
        //     vatIncluded: particular.vat_inclusive || false,
        //   })
        // ),
        // tableRows: liquidationData?.liquidation_particulars.map(
        //   (particular) => ({
        //     date: particular.date || "",
        //     particulars: particular.particulars || "",
        //     expenses: particular.expenses || 0, // Default to 0 if not available
        //     cashFromAccounting: particular.cash_from_accounting || 0, // Default to 0 if not available
        //     balance: particular.balance || "", // Default to 0 if not available
        //     vat_inclusive: particular.vat_inclusive || false,
        //   })
        // ),
        // tableRows: liquidationData?.liquidation_particulars.map(
        //   (particular) => ({
        //     date: particular.date || "",
        //     particulars: particular.particulars || "",
        //     expenses: Number(particular.expenses) || 0,
        //     cashFromAccounting: Number(particular.cash_from_accounting) || 0,
        //     balance: particular.balance || 0,
        //     vat_inclusive: particular.vat_inclusive || false,
        //   })
        // ),
        // tableRows: liquidationData?.liquidation_particulars.map(
        //   (particular) => ({
        //     date: particular.date || "",
        //     particulars: particular.particulars || "",
        //     expenses: Number(particular.expenses) || 0,
        //     cashFromAccounting: Number(particular.cash_from_accounting) || 0,
        //     balance: Number(particular.balance) || 0,
        //     vat_inclusive: particular.vat_inclusive || false,
        //   })
        // ),
        tableRows:
          liquidationData?.liquidation_particulars?.map(
            (particular): FormLiquidation => ({
              date: particular.date || "",
              particulars: particular.particulars || "",
              expenses: Number(particular.expenses) || 0,
              cashFromAccounting: Number(particular.cash_from_accounting) || 0,
              balance: Number(particular.balance) || 0,
              vat_inclusive: particular.vat_inclusive || false,
              cash_from_accounting: 0,
            })
          ) || [],

        // notesRows: liquidationData?.task_notes,
        // notesRowss: liquidationData?.task_notes?.map((note) => ({
        //   order: note?.order ?? 0, // Add this if your schema supports it
        //   description: note?.description ?? "",
        //   items: (note?.items || []).map((item) => ({
        //     order: item?.order ?? 0,
        //     description: item?.description ?? "",
        //   })),
        // })),
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        // Calculate total expenses, cash from accounting, and balance
        // const totalExpenses = values.tableRows?.reduce(
        //   (acc: number, row: { expenses: number }) => acc + (row.expenses || 0),
        //   0
        // );
        const totalExpenses = values.tableRows?.reduce(
          (acc: number, row: { expenses: number | string }) =>
            acc + (Number(row.expenses) || 0),
          0
        );

        // const totalCashFromAccounting = values.tableRows.reduce(
        //   (acc, row) => acc + (parseFloat(row.cashFromAccounting) || 0),
        //   0
        // );
        // const totalCashFromAccounting = values.tableRows?.reduce(
        //   (acc: number, row: { cash_from_accounting: number }) =>
        //     acc + (row.cash_from_accounting || 0), // Correct the key to match 'cash_from_accounting'
        //   0
        // );
        // Inside form, use camelCase keys:
        const totalCashFromAccounting = values.tableRows?.reduce(
          (acc: number, row) => acc + (Number(row.cashFromAccounting) || 0),
          0
        );

        // const totalCashFromBalance = values.tableRows.reduce(
        //   (acc, row) => acc + (parseFloat(row.balance) || 0),
        //   0
        // );
        // const totalCashFromBalance = values.tableRows?.reduce(
        //   (
        //     acc: number,
        //     row: { expenses: number; cash_from_accounting: number }
        //   ) => {
        //     const balance =
        //       (row.expenses || 0) - (row.cash_from_accounting || 0);
        //     return acc + balance;
        //   },
        //   0
        // );
        const totalCashFromBalance = values.tableRows?.reduce(
          (acc: number, row) => {
            const expenses = Number(row.expenses) || 0;
            const cash = Number(row.cashFromAccounting) || 0;
            const balance = expenses - cash;
            return acc + balance;
          },
          0
        );

        return (
          <Form className="py-4 uppercase">
            <div className="flex justify-start gap-2">
              <Link className="btn  text-black" href="/erp-v2/liquidation/">
                Back to liquidation
              </Link>
              {isEditable ? (
                <span
                  onClick={() => setIsEditable(false)} // Switch to readonly mode
                  className="btn  text-black uppercase"
                >
                  Cancel
                </span>
              ) : (
                <span
                  onClick={() => setIsEditable(true)} // Switch to editable mode
                  className="btn uppercase"
                >
                  Edit
                </span>
              )}
              {/* <Link className="btn  text-black" href="/erp-v2/liquidation/">
                Back
              </Link> */}
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-1/3">
                <Image
                  src={liquidationData?.photos?.photo || Images} // Ensure the photo URL is correct
                  alt="Project Image"
                  width={50}
                  height={50}
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="w-2/3">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  {[
                    {
                      label: "Project Name",
                      name: "project_name",
                      type: "text",
                      placeholder: "Enter project name",
                    },
                    {
                      label: "Date",
                      name: "projectDate",
                      type: "date",
                      placeholder: "",
                    },
                    {
                      label: "Remitted By",
                      name: "remmitted_by",
                      type: "select",
                      placeholder: "Select remitted by",
                    },
                    {
                      label: "Received By",
                      name: "receivedBy",
                      type: "select",
                      placeholder: "Enter who received",
                    },
                  ].map((item) => (
                    <div key={item.name}>
                      <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
                        {item.label}
                      </label>
                      {item.type === "select" ? (
                        <Field
                          as="select"
                          name={item.name}
                          className={`${
                            isEditable ? "" : "bg-gray-200 cursor-not-allowed"
                          } w-full border border-gray-200  text-center p-1 rounded`}
                          disabled={!isEditable}
                          required
                        >
                          <option value="">Select {item.label}</option>
                          {users?.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.full_name}
                            </option>
                          ))}
                        </Field>
                      ) : (
                        <Field
                          type={item.type}
                          name={item.name}
                          placeholder={item.placeholder}
                          className={`${
                            isEditable ? "" : "bg-gray-200 cursor-not-allowed"
                          } w-full border border-gray-200  text-center p-1 rounded`}
                          disabled={!isEditable}
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Table for Adding Expenses */}
            <div className="space-y-4">
              <h4 className="font-semibold">Liquidations</h4>
              <FieldArray
                name="tableRows"
                render={(arrayHelpers) => (
                  <>
                    <>
                      {isEditable && (
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              date: "",
                              particulars: "",
                              expenses: 0,
                              cash_from_accounting: 0,
                              balance: "",
                              vat_inclusive: false,
                            })
                          }
                          className="btn bg-white mt-4 mb-1 text-black border border-black uppercase"
                        >
                          Add Row
                        </button>
                      )}
                    </>
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                      <table
                        style={{ width: "100%" }}
                        className="table table-xs w-full border border-gray-200 rounded-lg shadow-lg"
                      >
                        <thead className="bg-white text-black  border-b-gray-400">
                          <tr className="text-sm font-medium text-center uppercase">
                            {[
                              "Date",
                              "Particulars",
                              "Expenses",
                              "Cash From Accounting",
                              "Balance",
                              "VAT Inc",
                            ].map((header) => (
                              <th key={header} className="p-2 text-center">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        {/* <tbody>
      {values.tableRows?.map((row, index) => (
        <tr key={index}>
          {[
            {
              name: `tableRows[${index}].date`,
              type: "date",
            },
            {
              name: `tableRows[${index}].particulars`,
              type: "text",
            },
            {
              name: `tableRows[${index}].expenses`,
              type: "number",
            },
            {
              name: `tableRows[${index}].cash_from_accounting`,
              type: "number",
            },
            {
              name: `tableRows[${index}].balance`,
              type: "number",
              value: (
                parseFloat(row.expenses || "0") -
                parseFloat(row.cash_from_accounting || "0")
              ).toFixed(2),
            },
          ].map((field) => (
            <td key={field.name} className="p-2">
              <Field
                type={field.type}
                name={field.name}
                value={
                  field.value ||
                  row[field.name.split(".")[1]] ||
                  ""
                }
                onChange={(e) =>
                  handleRowFieldChange(
                    index,
                    field.name.split(".")[1],
                    e.target.value,
                    setFieldValue,
                    values // Pass values for proper context
                  )
                }
                className={`${
                  isEditable
                    ? ""
                    : "bg-gray-200 cursor-not-allowed"
                } border border-gray-300 dark:bg-gray-dark dark:text-white text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                disabled={!isEditable}
              />
            </td>
          ))}
          <td className="p-2">
            <Field
              type="checkbox"
              name={`tableRows[${index}].vatIncluded`}
              className="checkbox border-gray-300 dark:border-gray-600 dark:bg-gray-800  dark:checked:bg-white"
            />
          </td>
        </tr>
      ))}
    </tbody> */}
                        <tbody>
                          {values.tableRows?.map(
                            (row: TableRow, index: number) => {
                              const calculatedBalance = (
                                (row.expenses || 0) -
                                (row.cash_from_accounting || 0)
                              ).toFixed(2);

                              // const fields = [
                              //   { name: "date", type: "date" },
                              //   { name: "particulars", type: "text" },
                              //   { name: "expenses", type: "number" },
                              //   { name: "cashFromAccounting", type: "number" },
                              // ];
                              const fields: {
                                name: keyof TableRow;
                                type: string;
                              }[] = [
                                { name: "date", type: "date" },
                                { name: "particulars", type: "text" },
                                { name: "expenses", type: "number" },
                                { name: "cashFromAccounting", type: "number" },
                              ];

                              return (
                                <tr key={index}>
                                  {fields.map((field) => (
                                    <td key={field.name} className="p-2">
                                      <Field
                                        type={field.type}
                                        name={`tableRows[${index}].${field.name}`}
                                        value={
                                          row[field.name as keyof TableRow] ||
                                          ""
                                        }
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                          handleRowFieldChange(
                                            index,
                                            field.name,
                                            e.target.value,
                                            setFieldValue,
                                            values
                                          )
                                        }
                                        className={`${
                                          isEditable
                                            ? ""
                                            : "bg-gray-200 cursor-not-allowed"
                                        } w-full border border-gray-200  text-center p-1 rounded`}
                                        disabled={!isEditable}
                                      />
                                    </td>
                                  ))}

                                  {/* Display calculated balance (read-only) */}
                                  <td className="p-2">
                                    <input
                                      type="text"
                                      value={calculatedBalance}
                                      readOnly
                                      className="w-full border border-gray-200  text-center p-1 rounded"
                                    />
                                  </td>

                                  <td className="p-2 flex justify-center">
                                    <Field
                                      type="checkbox"
                                      name={`tableRows[${index}].vat_inclusive`}
                                      checked={row.vat_inclusive}
                                      className="checkbox border-gray-300 dark:border-gray-600 dark:bg-gray-800  dark:checked:bg-white"
                                      disabled={!isEditable}
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>

                      {/* Conditionally render "Add Row" button */}
                      {/* {isEditable && (
      <button
        type="button"
        onClick={() =>
          arrayHelpers.push({
            date: "",
            particulars: "",
            expenses: 0,
            cash_from_accounting: 0,
            balance: "",
            vatIncluded: false,
          })
        }
        className="btn bg-white mt-1 mb-1 text-black border border-black uppercase"
      >
        Add Row
      </button>
    )} */}
                      <div className="ml-auto flex justify-between">
                        {/* {isEditable && (
      <button
        type="button"
        onClick={() =>
          arrayHelpers.push({
            date: "",
            particulars: "",
            expenses: 0,
            cash_from_accounting: 0,
            balance: "",
            vatIncluded: false,
          })
        }
        className="btn bg-white mt-4 mb-1 text-black border border-black uppercase"
      >
        Add Row
      </button>
    )} */}
                        <div className="flex justify-center gap-2 mt-2">
                          <div className="">
                            <div className="font-semibold">Total Expenses</div>
                            <input
                              type="number"
                              value={totalExpenses}
                              readOnly
                              className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                            />
                          </div>
                          <div className="">
                            <div className="font-semibold">
                              Cash from Accounting
                            </div>
                            <input
                              type="number"
                              value={totalCashFromAccounting}
                              readOnly
                              className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                            />
                          </div>
                          <div className="">
                            <div className="font-semibold">
                              Cash from Balance
                            </div>
                            <input
                              type="number"
                              value={totalCashFromBalance}
                              readOnly
                              className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              />
            </div>

            {/* Total Row */}
            {/* <div className="flex justify-between py-2 border-t border-gray-300">
                          <div className="ml-auto flex space-x-4">
                            <div className="font-semibold">Total</div>
                            <div className="w-1/4">
                              <input
                                type="number"
                                value={totalExpenses}
                                readOnly
                                className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                              />
                            </div>
                            <div className="w-1/4">
                              <input
                                type="number"
                                value={totalCashFromAccounting}
                                readOnly
                                className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                              />
                            </div>
                            <div className="w-1/4">
                              <input
                                type="number"
                                value={totalCashFromBalance}
                                readOnly
                                className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                              />
                            </div>
                          </div>
                        </div> */}
            {/* <div className="flex justify-between py-2  border-gray-300">
              <div className="mb-4">
                <h4 className="font-semibold">Take Notes</h4>
                <FieldArray
                  name="notesRows"
                  render={(arrayHelpers) => (
                    <div>
                      {values.notesRows?.map(
                        (noteRow: Notes, index: number) => (
                          <div key={index} className="mb-2">
                            <Field
                              type="text"
                              name={`notesRows[${index}].note`}
                              className="input dark:bg-gray-dark dark:text-white dark:border border-black"
                              placeholder="Enter note"
                              disabled={!isEditable}
                              readOnly={!isEditable}
                            />

                            {isEditable && (
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                                className="bg-white  text-red-800 border border-red-800 px-3 py-1.5 rounded-md text-xs shadow transition duration-200 uppercase"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        )
                      )}

                      {isEditable && (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push({ note: "" })}
                          className="btn bg-white border border-black mt-1 text-black uppercase"
                        >
                          Add Note
                        </button>
                      )}
                    </div>
                  )}
                />
              </div>
             
            </div> */}

            <div className="mb-4">
              <h4 className="font-semibold">Take Notes</h4>
              <FieldArray
                name="task_notes"
                // render={(arrayHelpers) => (
                //   <div>
                //     {(values as FormValues).task_notes.map(
                //       (noteRow: TaskNote, index: number) => (
                //         <div key={index} className="mb-4 rounded-md">
                //           {/* Main Row: Order + Description */}
                //           <div className="flex gap-3">
                //             <Field
                //               type="number"
                //               name={`task_notes[${index}].order`}
                //               className="input w-20 dark:bg-gray-dark dark:text-white dark:border-white"
                //               placeholder="Order"
                //             />
                //             <Field
                //               type="text"
                //               name={`task_notes[${index}].description`}
                //               className="input flex-1 dark:bg-gray-dark dark:text-white dark:border-white"
                //               placeholder="Main description"
                //             />
                //           </div>

                //           {/* Subrows under Description */}
                //           <FieldArray
                //             name={`task_notes[${index}].items`}
                //             render={(descHelpers) => (
                //               <div className="mt-3">
                //                 <label className="block font-semibold">
                //                   Subrows
                //                 </label>
                //                 {(noteRow.items || []).map(
                //                   (sub: SubItem, subIndex: number) => (
                //                     <div
                //                       key={subIndex}
                //                       className="flex items-center gap-2 mt-1 ml-5"
                //                     >
                //                       <Field
                //                         type="number"
                //                         name={`task_notes[${index}].items[${subIndex}].order`}
                //                         className="input w-20 dark:bg-gray-dark dark:text-white dark:border-white"
                //                         placeholder="Sub #"
                //                       />
                //                       <Field
                //                         type="text"
                //                         name={`task_notes[${index}].items[${subIndex}].description`}
                //                         className="input flex-1 dark:bg-gray-dark dark:text-white dark:border-white"
                //                         placeholder="Sub description"
                //                       />
                //                       <button
                //                         type="button"
                //                         onClick={() =>
                //                           descHelpers.remove(subIndex)
                //                         }
                //                         className="text-red-600 text-sm"
                //                       >
                //                         Remove
                //                       </button>
                //                     </div>
                //                   )
                //                 )}
                //                 <button
                //                   type="button"
                //                   onClick={() =>
                //                     descHelpers.push({
                //                       order: "",
                //                       description: "",
                //                     })
                //                   }
                //                   className="btn bg-white text-black border border-black text-xs mt-2 uppercase"
                //                 >
                //                   Add Subrow
                //                 </button>
                //               </div>
                //             )}
                //           />

                //           {/* Remove main row */}
                //           <button
                //             type="button"
                //             onClick={() => arrayHelpers.remove(index)}
                //             className="btn flex items-center gap-1 mt-3 bg-white text-xs uppercase"
                //           >
                //             Remove Note
                //           </button>
                //         </div>
                //       )
                //     )}

                //     {/* Add new main row */}
                //     <button
                //       type="button"
                //       onClick={() =>
                //         arrayHelpers.push({
                //           order: "",
                //           description: "",
                //           items: [
                //             {
                //               order: "",
                //               description: "",
                //             },
                //           ],
                //         })
                //       }
                //       className="btn bg-white mt-1 text-black border border-black uppercase"
                //     >
                //       Add Note
                //     </button>
                //   </div>
                // )}
              />
            </div>

            <div className="modal-action">
              <Link className="btn  text-black" href="/erp-v2/liquidation/">
                Back
              </Link>
              <button type="submit" className="btn uppercase">
                Submit
              </button>
              {/* <button
                type="button"
                className="btn"
                onClick={() => setShowRegisterModal(false)}
              >
                Cancel
              </button> */}
              {/* <Link className="btn  text-black" href="/erp-v2/liquidation/">
                Back
              </Link> */}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditLiquidation;
