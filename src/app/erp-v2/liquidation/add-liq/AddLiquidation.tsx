"use client";
import { AddLiq, CreateLiq } from "@/api/liquidations/addLiq";
import { fetchCashList } from "@/api/liquidations/fetchCash";
import { fetchCashDetailsById } from "@/api/liquidations/fetchProject";
import { fetchUserList } from "@/api/User/fetchUserList";
// import LoadingModal from "@/components/Loading/LoadingModal";
// import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik, Field, FieldArray, FormikProps } from "formik";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const AddLiquidation = () => {
  const queryClient = useQueryClient();
  const [selectedProject, setSelectedProject] = useState("");
  const [showSuccess] = useState(false);
  const formikRef = useRef<FormikProps<FormValues>>(null);

  // const [projectName, setProjectName] = useState<string>("");
  // interface Projectname {
  //   project_name: string;
  // }
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserList,
  });
  const { data: projectDetails } = useQuery({
    queryKey: ["projectDetails", selectedProject],
    queryFn: () => fetchCashDetailsById(Number(selectedProject)),
    enabled: !!selectedProject, // Enable query only when selectedProject is truthy
  });
  const {
    data: projects,
    // isLoading,
    // isLoadingCash,
  } = useQuery({
    queryKey: ["cash"],
    queryFn: fetchCashList,
  });

  const {
    mutate: registerCategory,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (data: AddLiq) => CreateLiq(data),
    onSuccess: () => {
      console.log("liquidations registered successfully");
      queryClient.invalidateQueries({ queryKey: ["liquidations"] });
      //   setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  interface SubItem {
    order: number | string;
    description: string;
  }
  interface TaskNote {
    order: number | string;
    description: string;
    items: SubItem[];
  }

  // interface FormValues {
  //   task_notes: TaskNote[];
  //   date_requested?: string | Date;
  // }

  // const handleSubmit = (values: any, { resetForm }: { resetForm: any }) => {
  //   const mappedParticulars = values.tableRows.map((row: any) => ({
  //     date:
  //       row.date ||
  //       values.date_requested ||
  //       new Date().toISOString().split("T")[0],
  //     particulars: row.item || row.particulars,
  //     expenses: row.expenses,
  //     cash_from_accounting: row.cashFromAccounting,
  //     balance:
  //       parseFloat(row.expenses || "0") -
  //       parseFloat(row.cashFromAccounting || 0),
  //     vat_included: row.vatIncluded,
  //   }));

  //   // const liquidationData: AddLiq = {
  //   //   id: Number(values.project),
  //   //   liquidation_no: "LQ-" + Date.now(),
  //   //   photos: [],
  //   //   project_name: values.project_name,
  //   //   date: values.date,
  //   //   remitted_by: values.remittedBy,
  //   //   total: String(
  //   //     values.tableRows.reduce(
  //   //       (acc: string, row: number) => acc + parseFloat(row.balance || "0"),
  //   //       0
  //   //     )
  //   //   ),
  //   //   task_notes: values.task_notes,
  //   //   liquidation_particulars: mappedParticulars,

  //   // };
  //   const liquidationData: AddLiq = {
  //     id: Number(values.project),
  //     liquidation_no: "LQ-" + Date.now(),
  //     photos: [],
  //     project_name: values.project_name,
  //     date: values.date,
  //     remitted_by: values.remittedBy,
  //     total: String(
  //       values.tableRows.reduce(
  //         (acc: number, row: { balance: string }) =>
  //           acc + parseFloat(row.balance || "0"),
  //         0
  //       )
  //     ),
  //     task_notes: values.task_notes,
  //     liquidation_particulars: mappedParticulars,
  //   };

  //   registerCategory(liquidationData);
  //   console.log(liquidationData);
  //   resetForm({
  //     values: {
  //       project: "",
  //       photos: [],
  //       id: "",
  //       project_name: "",
  //       date: "",
  //       date_requested: "",
  //       liquidation_particulars: [],
  //       cash_requisition: "",
  //       remitted_by: "",
  //       received_by: "",
  //       tableRows: [
  //         {
  //           date: "",
  //           item: "",
  //           particulars: "",
  //           expenses: "",
  //           cashFromAccounting: 0,
  //           balance: "",
  //           vatIncluded: false,
  //         },
  //       ],
  //       // task_notes: [{ task_notes: "", items: "", description: "" }],
  //       task_notes: [
  //         {
  //           order: "",
  //           description: "",
  //           items: [
  //             {
  //               order: "",
  //               description: "",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   });

  //   // setShowRegisterModal(false);
  // };
  // interface LiquidationRow {
  //   balance: number;
  //   // other fields if needed
  // }
  interface Liq {
    // date: string;
    // particulars: string;
    // expenses: number;
    // cashFromAccounting: number;
    // balance: number;
    // vatIncluded: boolean;
    date: string;
    particulars: string;
    expenses: number;
    cashFromAccounting: number;
    balance: number;
    vatIncluded: boolean;
  }

  interface TableRow {
    date: string;
    particulars: string;
    expenses: number;
    cashFromAccounting: number; // camelCase
    balance: number; // number
    vatIncluded: boolean;
    item: string; // optional if you use it
  }

  interface FormValues {
    project: string;
    project_name: string;
    date: string;
    date_requested: string | Date;
    remittedBy: string;
    tableRows: TableRow[];
    task_notes: TaskNote[];
  }
  const handleSubmit = async (
    values: FormValues,
    {
      resetForm,
      setSubmitting,
    }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      // const mappedParticulars: LiquidationRow[] = values.tableRows.map(
      //   (row) => ({
      //     date:
      //       row.date ||
      //       values.date_requested ||
      //       new Date().toISOString().split("T")[0],
      //     particulars: row.item || row.particulars || "",
      //     expenses: row.expenses,
      //     cash_from_accounting: row.cashFromAccounting,
      //     balance: (row.expenses || 0) - (row.cashFromAccounting || 0),
      //     vat_included: row.vatIncluded,
      //   })
      // );
      const mappedParticulars: Liq[] = values.tableRows.map((row) => ({
        // date:
        //   row.date ||
        //   values.date_requested ||
        //   new Date().toISOString().split("T")[0],
        date: row.date || "",
        particulars: row.item || row.particulars || "",
        expenses: row.expenses,
        cashFromAccounting: row.cashFromAccounting,
        balance: (row.expenses || 0) - (row.cashFromAccounting || 0),
        vatIncluded: row.vatIncluded,
      }));

      const total = mappedParticulars.reduce(
        (acc, row) => acc + (row.balance || 0),
        0
      );

      const liquidationData: AddLiq = {
        id: Number(values.project),
        liquidation_no: "LQ-" + Date.now(),
        photos: "",
        project_name: values.project_name,
        date: values.date,
        remitted_by: values.remittedBy,
        total: String(total),
        // task_notes: values.task_notes,
        liquidation_particulars: mappedParticulars,
      };

      await registerCategory(liquidationData);
      console.log("Successfully submitted:", liquidationData);
      // setTimeout(() => {
      //   window.location.href = "/erp-v2/liquidation";
      // }, 2000);

      resetForm();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // const handleSubmit = async (
  //   values: FormValues,
  //   {
  //     resetForm,
  //     setSubmitting,
  //   }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  // ) => {
  //   try {
  //     const mappedParticulars = values.tableRows.map((row: TableRow) => ({
  //       date:
  //         row.date ||
  //         values.date_requested ||
  //         new Date().toISOString().split("T")[0],
  //       particulars: row.item || row.particulars,
  //       expenses: row.expenses,
  //       cash_from_accounting: row.cashFromAccounting,
  //       balance: (row.expenses || 0) - (row.cashFromAccounting || 0),
  //       vat_included: row.vatIncluded,
  //     }));

  //     const total = mappedParticulars.reduce(
  //       (acc: number, row: LiquidationRow) => acc + (row.balance || 0),
  //       0
  //     );

  //     const liquidationData: AddLiq = {
  //       id: Number(values.project),
  //       liquidation_no: "LQ-" + Date.now(),
  //       photos: "",
  //       project_name: values.project_name,
  //       date: values.date,
  //       remitted_by: values.remittedBy,
  //       total: String(total),
  //       task_notes: values.task_notes,
  //       liquidation_particulars: mappedParticulars,
  //     };

  //     await registerCategory(liquidationData); // Await your API/mutation call
  //     console.log("Successfully submitted:", liquidationData);
  //     setTimeout(() => {
  //       window.location.href = "/erp-v2/liquidation";
  //     }, 2000);
  //     resetForm(); // Resets to initialValues, better than manually specifying all values
  //   } catch (error) {
  //     console.error("Submission failed:", error);
  //   } finally {
  //     setSubmitting(false); // Ends form spinner/loading
  //   }
  // };
  // const formikRef = useRef<FormikProps<any>>(null);

  useEffect(() => {
    if (projectDetails && formikRef.current) {
      formikRef.current.setFieldValue(
        "project_name",
        projectDetails.special_instructions || ""
      );
      formikRef.current.setFieldValue(
        "date_requested",
        projectDetails.date_requested || ""
      );

      formikRef.current.setFieldValue(
        "tableRows",
        projectDetails.cash_requisition_items?.map((item) => ({
          date: projectDetails.date_requested || "",
          item: item.item || "",
          expenses: item.total_price || 0,
          cashFromAccounting: 0,
          balance: "",
          vatIncluded: false,
        })) || []
      );
    }
  }, [projectDetails]);
  // if (isLoadingProjectDetails) {
  //   return <LoadingModal />;
  // }
  // interface TableRow2 {
  //   item: string;
  //   expenses: number;
  //   cashFromAccounting: number;
  // }
  return (
    <div>
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
          <span>submitted successfully!</span>
        </div>
      )}
      <Formik
        innerRef={formikRef}
        initialValues={{
          project: "",
          photos: [],
          id: projectDetails?.id || "",
          project_name: "",
          date: "",
          date_requested: projectDetails?.date_requested || "",
          liquidation_particulars: projectDetails?.cash_requisition_items || [], // Populate with fetched items
          cash_requisition: "",
          remitted_by: "",
          remittedBy: "",
          received_by: "",
          // tableRows: projectDetails?.cash_requisition_items || [
          //   {
          //     date: "",
          //     particulars: "",
          //     expenses: 0,
          //     cashFromAccounting: 0,
          //     balance: "",
          //     vatIncluded: false,
          //     item: "",
          //   },
          // ],
          tableRows: projectDetails?.cash_requisition_items
            ? projectDetails.cash_requisition_items.map((item) => ({
                date: "", // or map from item if you have a date property somewhere else
                particulars: item.description || "", // or item.item or whatever matches
                expenses: item.expenses,
                cashFromAccounting: item.cashFromAccounting,
                balance: item.expenses - item.cashFromAccounting, // calculate balance here
                vatIncluded: false, // or true if you have that info
                item: item.item,
              }))
            : [
                {
                  date: "",
                  particulars: "",
                  expenses: 0,
                  cashFromAccounting: 0,
                  balance: 0,
                  vatIncluded: false,
                  item: "",
                },
              ],

          // task_notes: [{ task_notes: "" }],
          // task_notes: [
          //   { task_notes: "", items: "", description: "" }, // Set initial task notes with item and description
          // ],
          task_notes: [
            {
              order: "",
              description: "",
              items: [
                {
                  order: "",
                  description: "",
                },
              ],
            },
          ],

          // task_notes: [],
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => {
          // useEffect(() => {
          //   if (projectDetails) {
          //     setFieldValue(
          //       "project_name",
          //       projectDetails.special_instructions || ""
          //     );
          //     setFieldValue(
          //       "date_requested",
          //       projectDetails.date_requested || ""
          //     );

          //     setFieldValue(
          //       "tableRows",
          //       projectDetails.cash_requisition_items?.map((item) => ({
          //         date: projectDetails.date_requested || "",
          //         item: item.item || "",
          //         // expenses: item.expenses || item.total_price || "",
          //         expenses: item.total_price || "",

          //         cashFromAccounting: 0,
          //         balance: "",
          //         vatIncluded: false,
          //       })) || []
          //     );
          //   }
          // }, [projectDetails, setFieldValue]);

          // const totalExpenses = values.tableRows.reduce(
          //   (acc, row) => acc + (parseFloat(row.expenses) || 0),
          //   0
          // );
          const totalCashFromAccounting = values.tableRows.reduce(
            (acc: number, row: { cashFromAccounting: number }) =>
              acc + (row.cashFromAccounting || 0),
            0
          );

          // const totalCashFromBalance = values.tableRows.reduce(
          //   (acc, row) => acc + (parseFloat(row.balance) || 0),
          //   0
          // );

          return (
            <Form className="py-1 uppercase">
              <Link className="btn mb-2 uppercase" href="/erp-v2/liquidation/">
                Back to liquidation list
              </Link>
              {/* Dropdown for Project Selection */}
              {/* <div className="mb-1">
                <label className="block text-sm  font-bold text-gray-700 dark:bg-gray-dark dark:text-white">
                  Select Project
                </label>
                <Field
                  as="select"
                  name="project"
                  className="mt-1 block w-100 border border-gray-300 rounded-md shadow-sm p-2 dark:bg-gray-dark dark:text-white"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    const projectId = e.target.value;
                    setSelectedProject(projectId); // Set selected project
                    setFieldValue("project", projectId); // Update Formik state
                    setFieldValue("liquidation_particulars", []); // Clear liquidation particulars when changing project
                    setFieldValue("project_name", ""); // Clear project name
                  }}
                >
                  <option value="">Select a Project</option>
                  {projects?.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.serial_no}
                    </option>
                  ))}
                </Field>
              </div> */}

              {/* Project Details */}
              {
                <div className="space-y-1">
                  {/* <h4 className="font-semibold">Project Details</h4> */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    <div className="">
                      <label className="block mb-1 text-sm font-bold text-gray-700 dark:bg-gray-dark dark:text-white">
                        Select Project
                      </label>
                      <Field
                        as="select"
                        name="project"
                        className="w-full border border-gray-200  text-center p-1 rounded"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          const projectId = e.target.value;
                          setSelectedProject(projectId); // Set selected project
                          setFieldValue("project", projectId); // Update Formik state
                          setFieldValue("liquidation_particulars", []); // Clear liquidation particulars when changing project
                          setFieldValue("project_name", ""); // Clear project name
                        }}
                      >
                        <option value="">Select a Project</option>
                        {projects?.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.serial_no}
                          </option>
                        ))}
                      </Field>
                    </div>
                    {/* <div className="">
                      <label className="block mb-1 text-sm font-bold text-gray-700 dark:bg-gray-dark dark:text-white">
                        Select Project
                      </label>
                      <Field
                        as="select"
                        name="project"
                        className="w-full border border-gray-200 text-center p-1 rounded"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          const projectId = e.target.value;
                          const selected = projects?.find(
                            (proj) => proj.id === projectId
                          );

                          setSelectedProject(projectId); // update state
                          setFieldValue("project", projectId);
                          setFieldValue("liquidation_particulars", []);
                          setFieldValue("project_name", selected?.name || ""); // optionally set name
                        }}
                      >
                        <option value="">Select a Project</option>
                        {projects?.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.serial_no}
                          </option>
                        ))}
                      </Field>

                      {selectedProject && (
                        <div className="mt-2 text-sm text-gray-600 dark:text-white">
                          Selected Project:&nbsp;
                          <span className="font-semibold">
                            {projects?.find(
                              (proj) => proj.id === selectedProject
                            )?.serial_no || "N/A"}
                          </span>
                        </div>
                      )}
                    </div> */}

                    {[
                      {
                        label: "Project Name",
                        name: "project_name",
                        type: "text",
                        placeholder: "Enter project name",
                        value: values.project_name || "", // Fetch from Formik values
                      },
                      {
                        label: "Date",
                        name: "date",
                        type: "date",
                        placeholder: "",
                      },
                      {
                        label: "Remitted By",
                        name: "remittedBy",
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
                        <label className="block mb-1 text-sm font-bold text-gray-700 dark:bg-gray-dark dark:text-white">
                          {item.label}
                        </label>
                        {item.type === "select" ? (
                          <Field
                            as="select"
                            name={item.name}
                            className="w-full border border-gray-200  text-center p-1 rounded"
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
                            className="w-full border border-gray-200  text-center p-1 rounded"
                            required
                            // value={item.value || values[item.name]}
                            value={
                              values[item.name as keyof typeof values] || ""
                            }
                          />
                        )}
                      </div>
                    ))}
                    {/* <div className="mb-1">
                      <label className="block text-sm  font-bold text-gray-700 dark:bg-gray-dark dark:text-white">
                        Select Project
                      </label>
                      <Field
                        as="select"
                        name="project"
                        className="mt-1 block w-100 border border-gray-300 rounded-md shadow-sm p-2 dark:bg-gray-dark dark:text-white"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          const projectId = e.target.value;
                          setSelectedProject(projectId); // Set selected project
                          setFieldValue("project", projectId); // Update Formik state
                          setFieldValue("liquidation_particulars", []); // Clear liquidation particulars when changing project
                          setFieldValue("project_name", ""); // Clear project name
                        }}
                      >
                        <option value="">Select a Project</option>
                        {projects?.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.serial_no}
                          </option>
                        ))}
                      </Field>
                    </div> */}
                  </div>
                </div>
              }

              {/* Table for Adding Expenses */}
              <div className="space-y-4 mt-3">
                {/* <h4 className="font-semibold">Expenses</h4> */}
                <FieldArray
                  name="tableRows"
                  render={(arrayHelpers) => (
                    <>
                      <>
                        <div className="flex justify-start">
                          <button
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({
                                date: "",
                                // date_requested: dateRequested || "",
                                particulars: "",
                                expenses: 0,
                                cashFromAccounting: 0,
                                balance: 0,
                                vatIncluded: false,
                              })
                            }
                            className="btn bg-white mt-4 mb-4 text-black border border-black uppercase"
                          >
                            Add Row
                          </button>
                        </div>
                      </>
                      <div>
                        <table className="table table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
                          <thead className="bg-white text-black  border-b-gray-400">
                            <tr className="text-sm font-medium text-center uppercase">
                              {[
                                "Date",
                                "Particulars",
                                "Expenses",
                                "Minus to balance",
                                "Balance",
                                "VAT Inc",
                                "Action",
                              ].map((header) => (
                                <th key={header} className="p-2 text-center ">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {values.tableRows.map(
                              (item: TableRow, index: number) => (
                                <tr key={index}>
                                  <td className="p-2">
                                    <Field
                                      name={`tableRows[${index}].date`}
                                      type="date"
                                      className="w-full border border-gray-200  text-center p-1 rounded"
                                    />
                                  </td>

                                  <td className="p-2">
                                    <Field
                                      name={`tableRows[${index}].item`}
                                      className="w-full border border-gray-200  text-center p-1 rounded"
                                      value={item.item || ""}
                                    />
                                  </td>
                                  <td className="p-2">
                                    <Field
                                      name={`tableRows[${index}].expenses`}
                                      className="w-full border border-gray-200  text-center p-1 rounded"
                                      value={item.expenses || 0}
                                    />
                                  </td>
                                  <td className="p-2">
                                    <Field
                                      name={`tableRows[${index}].cashFromAccounting`}
                                      className="w-full border border-gray-200  text-center p-1 rounded"
                                    />
                                  </td>
                                  <td className="p-2">
                                    <Field
                                      readOnly
                                      // name={`tableRows[${index}].total_price`}
                                      className="w-full border border-gray-200  text-center p-1 rounded"
                                      value={
                                        item.expenses -
                                          item.cashFromAccounting ||
                                        item.expenses
                                      }
                                    />
                                  </td>
                                  <td className="p-2 text-center">
                                    <Field
                                      type="checkbox"
                                      name={`tableRows[${index}].vatIncluded`}
                                      className="checkbox dark:bg-gray-dark border border-black dark:text-white  dark:checked:border-white"
                                    />
                                  </td>
                                  <td className="p-2 flex justify-center">
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      // className="btn btn-danger"
                                      className="hover:underline hover:cursor-pointer flex items-center gap-1 text-red-800  px-3 py-1.5  text-xs  transition duration-200 uppercase"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        {/* <button
      type="button"
      onClick={() =>
        arrayHelpers.push({
          date_requested: "",
          // date_requested: dateRequested || "",

          particulars: "",
          expenses: "",
          cashFromAccounting: "",
          balance: "",
          vatIncluded: false,
        })
      }
      className="btn bg-white mt-4 mb-4 text-black border border-black uppercase"
    >
      Add Row
    </button> */}
                        <div className="flex justify-between py-2 border-t border-gray-300">
                          {/* <div className="flex justify-start">
      <button
        type="button"
        onClick={() =>
          arrayHelpers.push({
            date_requested: "",
            // date_requested: dateRequested || "",

            particulars: "",
            expenses: "",
            cashFromAccounting: "",
            balance: "",
            vatIncluded: false,
          })
        }
        className="btn bg-white mt-4 mb-4 text-black border border-black uppercase"
      >
        Add Row
      </button>
    </div> */}
                          <div className="ml-auto flex space-x-4">
                            <div className="flex flex-col items-start">
                              <div className="font-semibold">
                                Total Expenses
                              </div>
                              <input
                                type="number"
                                value={projectDetails?.sub_total || 0}
                                readOnly
                                className="w-full border border-gray-200  text-center p-1 rounded"
                              />
                            </div>
                            <div className="flex flex-col items-start">
                              <div className="font-semibold">
                                Cash from Accounting
                              </div>
                              <input
                                type="number"
                                value={totalCashFromAccounting || 0}
                                readOnly
                                className="w-full border border-gray-200  text-center p-1 rounded"
                              />
                            </div>
                            <div className="flex flex-col items-start">
                              <div className="font-semibold">
                                Cash from Balance
                              </div>
                              <input
                                type="number"
                                value={projectDetails?.total || 0}
                                readOnly
                                className="w-full border border-gray-200  text-center p-1 rounded"
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
                            <div className="ml-auto flex space-x-4 ">
                              <div className="font-semibold">Total</div>
                              <div className="w-1/4">
                                <input
                                  type="number"
                                  value={projectDetails?.sub_total}
                                  readOnly
                                  className="bg-gray-200 p-2 rounded-md w-full border border-gray-300 dark:bg-gray-800 dark:text-white"
                                />
                              </div>
                              <div className="w-1/4">
                                <input
                                  type="number"
                                  value={totalCashFromAccounting}
                                  readOnly
                                  className="bg-gray-200 p-2 rounded-md w-full border border-gray-300 dark:bg-gray-dark dark:text-white "
                                />
                              </div>
                              <div className="w-1/4">
                                <input
                                  type="number"
                                  value={projectDetails?.total}
                                  readOnly
                                  className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:text-white border border-white"
                                />
                              </div>
                            </div>
                          </div> */}
              {/* <div className="flex justify-between py-2 border-t border-gray-300">
                <div className="ml-auto flex space-x-4">
                  <div className="flex flex-col items-start">
                    <div className="font-semibold">Total Expenses</div>
                    <input
                      type="number"
                      value={projectDetails?.sub_total}
                      readOnly
                      className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="font-semibold">Cash from Accounting</div>
                    <input
                      type="number"
                      value={totalCashFromAccounting}
                      readOnly
                      className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="font-semibold">Cash from Balance</div>
                    <input
                      type="number"
                      value={projectDetails?.total}
                      readOnly
                      className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                    />
                  </div>
                </div>
              </div> */}

              {/* Take Notes Section */}
              {/* <div className="mb-4">
                <h4 className="font-semibold">Take Notes</h4>
                <FieldArray
                  name="task_notes"
                  render={(arrayHelpers) => (
                    <div>
                      {values.task_notes.map((noteRow, index) => (
                        <div key={index} className="mb-2">
                          <Field
                            type="text"
                            name={`task_notes[${index}].task_notes`}
                            className="input dark:bg-gray-dark dark:text-white dark:border-white"
                            placeholder="Enter note"
                          />
                          <Field
                            type="text"
                            name={`task_notes[${index}].description`}
                            className="input dark:bg-gray-dark dark:text-white dark:border-white"
                            placeholder="Enter description"
                          />
                          <Field
                            type="text"
                            name={`task_notes[${index}].items`}
                            className="input dark:bg-gray-dark dark:text-white dark:border-white"
                            placeholder="Enter item"
                          />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            // className="btn btn-danger ml-2"
                            className="flex items-center gap-1 mt-2 bg-white border border-red-800 hover:bg-red-700 text-red-800 px-3 py-1.5 rounded-md text-xs shadow transition duration-200 uppercase"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          // arrayHelpers.push({ task_notes: "" })
                          arrayHelpers.push({
                            task_notes: "",
                            items: "",
                            description: "",
                          })
                        }
                        className="btn bg-white mt-1 text-black border border-black uppercase"
                      >
                        Add Note
                      </button>
                    </div>
                  )}
                />
              </div> */}
              {/* <div className="mb-4">
                <h4 className="font-semibold">Take Notes</h4>
                <FieldArray
                  name="task_notes"
                  render={(arrayHelpers) => (
                    <div>
                      {values.task_notes.map((noteRow, index) => (
                        <div key={index} className="mb-4  rounded-md">
                          <div className="flex gap-3">
                            <Field
                              type="number"
                              name={`task_notes[${index}].order`}
                              className="input w-20 dark:bg-gray-dark dark:text-white dark:border-white"
                              placeholder="Order"
                            />
                            <Field
                              type="text"
                              name={`task_notes[${index}].description`}
                              className="input flex-1 dark:bg-gray-dark dark:text-white dark:border-white"
                              placeholder="Main description"
                            />
                          </div>

                          <FieldArray
                            name={`task_notes[${index}].items`}
                            render={(descHelpers) => (
                              <div className="mt-3">
                                <label className="block font-semibold">
                                  Subrows
                                </label>
                                {(noteRow.items || []).map(
                                  (sub: number, subIndex: string) => (
                                    <div
                                      key={subIndex}
                                      className="flex items-center gap-2 mt-1 ml-5"
                                    >
                                      <Field
                                        type="number"
                                        name={`task_notes[${index}].items[${subIndex}].order`}
                                        className="input w-20 dark:bg-gray-dark dark:text-white dark:border-white"
                                        placeholder="Sub #"
                                      />
                                      <Field
                                        type="text"
                                        name={`task_notes[${index}].items[${subIndex}].description`}
                                        className="input flex-1 dark:bg-gray-dark dark:text-white dark:border-white"
                                        placeholder="Sub description"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          descHelpers.remove(subIndex)
                                        }
                                        className="text-red-600 text-sm"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  )
                                )}
                                <button
                                  type="button"
                                  onClick={() =>
                                    descHelpers.push({
                                      order: "",
                                      description: "",
                                    })
                                  }
                                  className="btn bg-white text-black border border-black text-xs mt-2 uppercase"
                                >
                                  Add Subrow
                                </button>
                              </div>
                            )}
                          />

                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="btn flex items-center gap-1 mt-3 bg-white   text-xs uppercase"
                          >
                            Remove Note
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            order: "",
                            description: "",
                          
                          })
                        }
                        className="btn bg-white mt-1 text-black border border-black uppercase"
                      >
                        Add Note
                      </button>
                    </div>
                  )}
                />
              </div> */}
              {/* <div className="mb-4">
                <h4 className="font-semibold">Take Notes</h4>
                <FieldArray
                  name="task_notes"
                  render={(arrayHelpers) => (
                    <div>
                      {(values as FormValues).task_notes.map(
                        (noteRow: TaskNote, index: number) => (
                          <div key={index} className="mb-4 rounded-md">
                            <div className="flex gap-3">
                              <Field
                                type="number"
                                name={`task_notes[${index}].order`}
                                className="input w-20 dark:bg-gray-dark dark:text-white dark:border-white"
                                placeholder="Order"
                              />
                              <Field
                                type="text"
                                name={`task_notes[${index}].description`}
                                className="input flex-1 dark:bg-gray-dark dark:text-white dark:border-white"
                                placeholder="Main description"
                              />
                            </div>

                            <FieldArray
                              name={`task_notes[${index}].items`}
                              render={(descHelpers) => (
                                <div className="mt-3">
                                  <label className="block font-semibold">
                                    Subrows
                                  </label>
                                  {(noteRow.items || []).map(
                                    (sub: SubItem, subIndex: number) => (
                                      <div
                                        key={subIndex}
                                        className="flex items-center gap-2 mt-1 ml-5"
                                      >
                                        <Field
                                          type="number"
                                          name={`task_notes[${index}].items[${subIndex}].order`}
                                          className="input w-20 dark:bg-gray-dark dark:text-white dark:border-white"
                                          placeholder="Sub #"
                                        />
                                        <Field
                                          type="text"
                                          name={`task_notes[${index}].items[${subIndex}].description`}
                                          className="input flex-1 dark:bg-gray-dark dark:text-white dark:border-white"
                                          placeholder="Sub description"
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            descHelpers.remove(subIndex)
                                          }
                                          className="text-red-600 text-sm"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    )
                                  )}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      descHelpers.push({
                                        order: "",
                                        description: "",
                                      })
                                    }
                                    className="btn bg-white text-black border border-black text-xs mt-2 uppercase"
                                  >
                                    Add Subrow
                                  </button>
                                </div>
                              )}
                            />

                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="btn flex items-center gap-1 mt-3 bg-white text-xs uppercase"
                            >
                              Remove Note
                            </button>
                          </div>
                        )
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            order: "",
                            description: "",
                            items: [
                              {
                                order: "",
                                description: "",
                              },
                            ],
                          })
                        }
                        className="btn bg-white mt-1 text-black border border-black uppercase"
                      >
                        Add Note
                      </button>
                    </div>
                  )}
                />
              </div> */}
              <div className="mb-2">
                <h4 className="font-semibold text-sm mb-1">Take Notes</h4>
                <FieldArray
                  name="task_notes"
                  render={(arrayHelpers) => (
                    <div className="space-y-2">
                      {(values as FormValues).task_notes.map(
                        (noteRow: TaskNote, index: number) => (
                          <div key={index} className=" rounded p-2 space-y-1">
                            <div className="flex items-center gap-2">
                              <Field
                                type="number"
                                name={`task_notes[${index}].order`}
                                className="input w-16 h-8 text-sm dark:bg-gray-dark dark:text-white dark:border-white"
                                placeholder="#"
                              />
                              <Field
                                type="text"
                                name={`task_notes[${index}].description`}
                                className="input flex-1 h-8 text-sm dark:bg-gray-dark dark:text-white dark:border-white"
                                placeholder="Main description"
                              />
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                                className="text-xs text-red-600"
                              >
                                ✕
                              </button>
                            </div>

                            <FieldArray
                              name={`task_notes[${index}].items`}
                              render={(descHelpers) => (
                                <div className="space-y-1 pl-5">
                                  {(noteRow.items || []).map(
                                    (sub: SubItem, subIndex: number) => (
                                      <div
                                        key={subIndex}
                                        className="flex items-center gap-2"
                                      >
                                        <Field
                                          type="number"
                                          name={`task_notes[${index}].items[${subIndex}].order`}
                                          className="input w-16 h-8 text-sm dark:bg-gray-dark dark:text-white dark:border-white"
                                          placeholder="#"
                                        />
                                        <Field
                                          type="text"
                                          name={`task_notes[${index}].items[${subIndex}].description`}
                                          className="input flex-1 h-8 text-sm dark:bg-gray-dark dark:text-white dark:border-white"
                                          placeholder="Sub description"
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            descHelpers.remove(subIndex)
                                          }
                                          className="text-xs text-red-600"
                                        >
                                          ✕
                                        </button>
                                      </div>
                                    )
                                  )}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      descHelpers.push({
                                        order: "",
                                        description: "",
                                      })
                                    }
                                    className="text-xs text-gray-600 hover:underline"
                                  >
                                    + Add Subrow
                                  </button>
                                </div>
                              )}
                            />
                          </div>
                        )
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            order: "",
                            description: "",
                            items: [{ order: "", description: "" }],
                          })
                        }
                        className="text-xs text-blue-600 hover:underline"
                      >
                        + Add Note
                      </button>
                    </div>
                  )}
                />
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="modal-action">
                {/* <button type="submit" className="btn uppercase">
                  Submit
                </button> */}
                <Link className="btn uppercase" href="/erp-v2/liquidation/">
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
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddLiquidation;
