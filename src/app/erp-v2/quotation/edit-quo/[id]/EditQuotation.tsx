"use client";
import { fetchClientsList } from "@/api/quotation/fetchClients";
import { UpdateView, updateView } from "@/api/quotation/updateView";
import { fetchQuotationDataById } from "@/api/quotation/viewQuotation";
import NotFound from "@/components/Error/NotFound";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, FieldArray } from "formik";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const EditQuotation = () => {
  const pathname = usePathname();
  const [isEditable, setIsEditable] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  // const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedClient, setSelectedClient] = useState<Project | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);

  const queryClient = useQueryClient();

  const id = pathname?.split("/").pop();

  const { mutate: updatedView } = useMutation({
    mutationFn: (data: UpdateView) => updateView(id as string, data),
    onSuccess: () => {
      console.log("quotations updated successfully");
      queryClient.invalidateQueries({ queryKey: ["quotations", id] });
      //   setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Error updating quotation:", error);
    },
  });

  const {
    data: QuotationData,
    isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["quotation", id],
    queryFn: () => fetchQuotationDataById(id as string),
    enabled: !!id,
  });
  const { data: projects } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClientsList,
  });
  // const handleCompanyChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  //   setFieldValue: any
  // ) => {
  //   const value = e.target.value;
  //   setSelectedProject(value);

  //   const client = projects?.find((project) => project.id === parseInt(value));
  //   if (client) {
  //     setSelectedClient(client);
  //     setFieldValue("project", client);
  //     setFieldValue("contact_person", client.contact_person);
  //     setFieldValue("delivery_address", client.address);
  //     setFieldValue("client", client.client);
  //   }
  // };
  // const handleCompanyChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  //   setFieldValue: any
  // ) => {
  //   const value = e.target.value;
  //   setSelectedProject(value);

  //   const client = projects?.find((project) => project.id === parseInt(value));
  //   if (client) {
  //     setSelectedClient(client);

  //     // This sets the ID (used for backend submission)
  //     setFieldValue("clients", client.client); // For backend submission
  //     setFieldValue("client_name", client.client); // For display purposes

  //     setFieldValue("contact_person", client.contact_person);
  //     setFieldValue("delivery_address", client.address);
  //   }
  // };
  // const handleCompanyChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  //   setFieldValue: any
  // ) => {
  //   const value = e.target.value;
  //   setSelectedProject(value);

  //   const client = projects?.find((project) => project.id === parseInt(value));
  //   if (client) {
  //     setSelectedClient(client);

  //     setFieldValue("client", client.id); // backend ID
  //     setFieldValue("client_name", client.client); // human-readable name
  //     setFieldValue("contact_person", client.contact_person);
  //     setFieldValue("delivery_address", QuotationData?.delivery_address);
  //     setFieldValue("address", client.address);
  //   }
  // };
  interface Project {
    id: number;
    client: string;
    contact_person: string;
    address: string;
  }

  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (
      field: string,
      value: string | number,
      shouldValidate?: boolean
    ) => void,
    projects: Project[] | undefined,
    setSelectedProject: (value: string) => void,
    setSelectedClient: (project: Project) => void,
    deliveryAddress?: string
  ): void => {
    const value = e.target.value;
    setSelectedProject(value);

    const client = projects?.find((project) => project.id === parseInt(value));
    if (client) {
      setSelectedClient(client);

      setFieldValue("client", client.id);
      setFieldValue("client_name", client.client);
      setFieldValue("contact_person", client.contact_person);
      setFieldValue("delivery_address", deliveryAddress || "");
      setFieldValue("address", client.address);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // if (isError) {
  //   return <NotFound />;
  // }
  if (!QuotationData) {
    // Example: if id is '404', simulate not found
    return <NotFound />;
  }
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
          <span>Updated successfully!</span>
        </div>
      )}
      <div className="flex justify-start gap-2">
        <Link className="btn text-black uppercase" href="/erp-v2/quotation">
          back to quotation list
        </Link>
        {isEditable ? (
          <button
            onClick={() => setIsEditable(false)} // Switch to readonly mode
            className="btn text-black cursor-pointer uppercase"
          >
            cancel
          </button>
        ) : (
          <button
            onClick={() => setIsEditable(true)} // Switch to editable mode
            className="btn text-black cursor-pointer uppercase"
          >
            edit
          </button>
        )}
        {/* <Link className="btn text-black uppercase" href="/erp-v2/quotation">
          back to quotation list
        </Link> */}
      </div>
      <Formik
        initialValues={{
          project: QuotationData?.client.id,
          client_id: QuotationData?.client?.id || "",
          client: QuotationData?.client?.id || 0,
          // delivery_address: QuotationData?.delivery_address || "",
          address: QuotationData?.client.address || "",
          // project: {
          //   id: QuotationData?.id,
          //   client: QuotationData?.client,
          // },
          // client: QuotationData?.client.id || "", // ID for backend
          // client_name: QuotationData?.client.client || "", // Name for display
          clients: QuotationData?.client.client || "", // For submission
          client_name: QuotationData?.client.client || "", // For UI
          project_name: QuotationData?.project_name || "",
          // remittedBy: QuotationData?.created_by.full_name,
          receivedBy: "",
          contact_person: QuotationData?.client.contact_person || "", // Initially populate if available
          delivery_address: QuotationData?.delivery_address || "",
          // client: QuotationData?.client || "",
          // quotation_items: QuotationData?.quotation_items.map((item) => ({
          //   item: item.item || "",
          //   description: item.description || "",
          //   srp: item.srp || 0,
          //   quantity: item.quantity || 0, // Ensure quantity is initialized as 0
          //   total: item.srp * (item.quantity || 0),
          //   // balance: "",

          //   // date: particular.date || "",
          //   // particulars: particular.particulars || "",
          //   // expenses: particular.expenses || 0, // Default to 0 if not available
          //   // cashFromAccounting: particular.cash_from_accounting || 0, // Default to 0 if not available
          //   // balance: particular.balance || 0, // Default to 0 if not available
          //   // vatIncluded: particular.vat_inclusive || false,
          // })),
          quotation_items: QuotationData?.quotation_items?.map((item) => ({
            item: item.item ?? "",
            description: item.description ?? "",
            srp: item.srp ?? 0,
            quantity: item.quantity ?? 0,
            total: (item.srp ?? 0) * (item.quantity ?? 0),
          })) ?? [
            {
              item: "",
              description: "",
              srp: 0,
              quantity: 0,
              total: 0,
            },
          ],

          // notesRows: [{ note: QuotationData?.notes_assumptions }],
          notes_assumptions: QuotationData?.notes_assumptions || "", // Set initial value for notes
          terms_conditions: QuotationData?.terms_conditions || "",
          discount: QuotationData?.discount || 0,
          vat_value: QuotationData?.vat_value || 0,
          // vat_value: QuotationData?.vat_total || 0,
        }}
        // onSubmit={async (values, { setSubmitting }) => {
        //   // Trigger update mutation when form is submitted
        //   const updatedData: UpdateView = {
        //     ...values,
        //     // quotation_item: values.quotation_items?.map((row) => ({
        //     //   ...row,
        //     //   total: row.srp * row.quantity, // Recalculate total if needed
        //     // })),
        //     quotation_items:
        //       values.quotation_items?.map((row) => ({
        //         ...row,
        //         total: row.srp * row.quantity, // Recalculate total
        //       })) || [], // ✅ Provide a fallback to avoid undefined

        //     // id: QuotationData?.id || 0,
        //     // quotation_item: {
        //     //   id: 0,
        //     //   total: "",
        //     //   order: 0,
        //     //   item: "",
        //     //   description: "",
        //     //   quantity: 0,
        //     //   srp: 0,
        //     // },
        //     // created_by: QuotationData?.created_by || 0,
        //     // date_created: QuotationData?.date_created || "",
        //   };

        //   // Call the mutation function to update the quotation
        //   // updatedView(updatedData);
        //   // console.log(updatedData);
        //   try {
        //     await updatedView(updatedData);
        //     setTimeout(() => {
        //       window.location.href = "/erp-v2/quotation";
        //     }, 2000);
        //   } catch (error) {
        //     console.error("Failed to register quotation:", error);
        //   } finally {
        //     setSubmitting(false); // Always stop spinner/loading
        //   } // Wait for API response
        // }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Prepare the data for update
            const updatedData: UpdateView = {
              ...values,
              quotation_items:
                values.quotation_items?.map((row) => ({
                  ...row,
                  total: row.srp * row.quantity, // Ensure total is recalculated
                })) ?? [], // Safe fallback if quotation_items is undefined
            };

            // Perform the update mutation
            await updatedView(updatedData);
            setShowSuccess(true);

            // Redirect after a short delay
            setTimeout(() => {
              window.location.href = "/erp-v2/quotation";
            }, 2000);
          } catch (error) {
            console.error("Failed to update quotation:", error);
            // Optionally, show a toast or error message here
          } finally {
            setSubmitting(false); // Always stop form submission state
          }
        }}
      >
        {({ values, setFieldValue }) => {
          // Calculate total expenses and cash from accounting
          const totalExpenses = values.quotation_items?.reduce(
            (acc, row) => acc + (row.srp * row.quantity || 0),
            0
          );
          // const totalCashFromAccounting = values.quotation_items?.reduce(
          //   (acc, row) => acc + ((row.balance) || 0),
          //   0
          // );
          // const totalCashFromBalance = values.quotation_items?.reduce(
          //   (acc, row) => acc + ((row.balance) || 0),
          //   0
          // );

          return (
            <Form className="py-1 uppercase">
              {/* Project and Address Inputs */}
              {/* {[
                {
                  label: "Project",
                  name: "project_name",
                  type: "text",
                  placeholder: "Enter project name",
                },
              ].map((item) => (
                <div key={item.name}>
                  <label className="block mb-2 text-sm text-gray-700 dark:text-white">
                    {item.label}
                  </label>
                  <Field
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    disabled={!isEditable}
                  />
                </div>
              ))} */}

              {/* Dropdown for Project Selection */}
              <div className="mb-1">
                {/* <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Companys
                </label> */}
                {/* <Field
                  as="select"
                  name="project"
                  className="mt-1 block w-full dark:bg-gray-dark border border-gray-300 rounded-md shadow-sm p-2"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleCompanyChange(e, setFieldValue)
                  }
                  // value={values.project?.id || ""}
                  disabled={!isEditable}
                >
                  <option value="">Select a Project</option>
                  {projects?.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.client}
                    </option>
                  ))}
                </Field> */}
                {/* <Field
                  as="select"
                  name="client"
                  className="mt-1 block w-full dark:bg-gray-dark border border-gray-300 rounded-md shadow-sm p-2"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleCompanyChange(e, setFieldValue)
                  }
                  value={values.client || ""} // Make sure Formik knows the selected value
                  disabled={!isEditable}
                >
                  <option value="">Select a Project</option>
                  {projects?.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.client}
                    </option>
                  ))}
                </Field> */}
              </div>
              {/* Project Details */}
              {/* {selectedProject && ( */}
              {
                <div className="space-y-1">
                  {/* <h4 className="font-semibold">Project Details</h4> */}
                  <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
                    {/* <div className="mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Companys
                      </label>
                      <Field
                        as="select"
                        name="client"
                        className="mt-1 max-h-80 block w-full dark:bg-gray-dark border border-gray-300 rounded-md shadow-sm p-2"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleCompanyChange(e, setFieldValue)
                        }
                        value={values.client || ""} // Make sure Formik knows the selected value
                        disabled={!isEditable}
                      >
                        <option value="">Select a Project</option>
                        {projects?.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.client}
                          </option>
                        ))}
                      </Field>
                    </div> */}
                    {/* {selectedClient && (
                      <div className="mt-4 p-3 border rounded bg-gray-100 dark:bg-gray-800">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">
                          Selected Client Details:
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <strong>Client:</strong> {selectedClient.client}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <strong>Contact Person:</strong>{" "}
                          {selectedClient.contact_person}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <strong>Address:</strong> {selectedClient.address}
                        </p>
                      </div>
                    )} */}

                    <div className="mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Companys
                      </label>

                      <Field
                        as="select"
                        name="client"
                        className="mt-1 max-h-80 block w-full dark:bg-gray-dark border border-gray-300 rounded-md shadow-sm p-2"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleCompanyChange(
                            e,
                            setFieldValue,
                            projects,
                            setSelectedProject,
                            setSelectedClient,
                            QuotationData?.delivery_address // optional
                          )
                        }
                        value={values.client || ""}
                        disabled={!isEditable}
                      >
                        <option value="">Select a Project</option>
                        {projects?.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.client}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                        Contact person
                      </label>
                      <Field
                        type="text"
                        name="contact_person"
                        placeholder="Owner"
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        // className="bg-gray-50 dark:bg-gray-dark dark:text-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={values.contact_person || ""} // Use Formik value
                        required
                        disabled={!isEditable} // Conditionally disable field based on edit mode
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                        Delivery address
                      </label>
                      <Field
                        type="text"
                        name="delivery_address"
                        placeholder="Enter delivery address"
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        // className="bg-gray-50 dark:bg-gray-dark dark:text-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={values.delivery_address || ""} // Use Formik value
                        required
                        disabled={!isEditable} // Conditionally disable field based on edit mode
                      />
                    </div>
                    {isEditable && selectedClient && selectedProject && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                          Address edit
                        </label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Enter delivery address"
                          className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                          // className="bg-gray-50 dark:bg-gray-dark dark:text-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          value={values.address || ""} // Access directly if client is a string
                          required
                          disabled={!isEditable}
                        />
                      </div>
                    )}
                    {!isEditable && (
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                          Address1
                        </label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Enter delivery address"
                          className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                          // className="bg-gray-50 dark:bg-gray-dark dark:text-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          value={QuotationData?.client.address} // Access directly if client is a string
                          required
                          disabled={!isEditable}
                        />
                      </div>
                    )}

                    {/* Displaying the client name (read-only or editable) */}
                    {/* <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                        Client Name
                      </label>
                      <Field
                        type="text"
                        name="client_name"
                        placeholder="Client name"
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={values.client_name} // name shown to the user
                        disabled={!isEditable} // editable if in edit mode
                        readOnly={!isEditable} // safe fallback
                      />
                    </div> */}

                    {/* Hidden client ID for submission */}
                    <Field type="hidden" name="client" value={values.clients} />

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                        project name
                      </label>
                      <Field
                        type="text"
                        name="project_name"
                        placeholder="Enter delivery address"
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        // className="bg-gray-50 dark:bg-gray-dark dark:text-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required
                        disabled={!isEditable} // Conditionally disable field based on edit mode
                      />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                        Notes & Assumptions
                      </label>
                      <Field
                        type="text"
                        name="notes_assumptions"
                        disabled={!isEditable}
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        // className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white  rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 "
                        placeholder="Enter any notes or assumptions regarding this quotation"
                      />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                        Terms & Conditions
                      </label>
                      <Field
                        type="text"
                        name="terms_conditions"
                        disabled={!isEditable}
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        // className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5"
                        placeholder="Enter terms and conditions for this quotation"
                      />
                    </div>
                  </div>
                </div>
              }

              {/* Table for Adding Expenses */}
              <div className="space-y-5 mt-4">
                {/* <h4 className="font-semibold">Expenses</h4> */}
                <FieldArray
                  name="quotation_items"
                  render={(arrayHelpers) => (
                    <div>
                      {isEditable && (
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              // date: "",
                              // particulars: "",
                              // srp: "",
                              // quantity: "",
                              // total: 0,
                              // balance: "",
                              item: "",
                              description: "",
                              srp: 0,
                              quantity: 0,
                              total: 0,
                            })
                          }
                          className="btn mb-2 bg-white border border-black  text-black uppercase text-xs"
                        >
                          Add Row
                        </button>
                      )}
                      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <table
                          style={{ width: "100%" }}
                          className="table table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg"
                        >
                          <thead className="bg-white text-black  border-b-gray-400">
                            <tr className="text-sm font-medium text-center uppercase">
                              {[
                                "# ITEM",
                                "Description",
                                "SRP",
                                "Quantity",
                                "Total",
                              ].map((header) => (
                                <th key={header} className="p-1 text-center">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {values.quotation_items?.map((row, index) => (
                              <tr key={index}>
                                <td className=" p-[2px]">
                                  {/* <Field
                                    type="text"
                                    name={`quotation_items[${index}].item`}
                                    disabled={!isEditable}
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                  /> */}
                                  <Field
                                    as="select"
                                    name={`quotation_items[${index}].item`} // Name it as client
                                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      const selectedItemId = e.target.value;
                                      setFieldValue(
                                        `quotation_items[${index}].item`,
                                        selectedItemId
                                      );

                                      // Fetch the selected item details and update form fields
                                      const selectedItem = projects?.find(
                                        (project) =>
                                          project.id ===
                                          parseInt(selectedItemId)
                                      );

                                      if (selectedItem) {
                                        // Set the description and SRP from selected item
                                        setFieldValue(
                                          `quotation_items[${index}].description`,
                                          selectedItem.client || "" // Set description from client name
                                        );
                                        setFieldValue(
                                          `quotation_items[${index}].srp`,
                                          selectedItem.contact_number || 0 // Set SRP (assuming contact_number is SRP)
                                        );
                                        setFieldValue(
                                          `quotation_items[${index}].quantity`,
                                          1
                                        ); // Set initial quantity to 1

                                        // setFieldValue(
                                        //   `quotation_items[${index}].total`,
                                        //   (selectedItem.contact_number || "") * 1 // Calculate total based on SRP and quantity
                                        // );
                                        setFieldValue(
                                          `quotation_items[${index}].total`,
                                          Number(
                                            selectedItem.contact_number || 0
                                          ) * 1
                                        );
                                      }
                                    }}
                                  >
                                    <option value="">Select Item</option>
                                    {projects?.map((client) => (
                                      <option key={client.id} value={client.id}>
                                        {client.client}
                                        {/* Display client name */}
                                      </option>
                                    ))}
                                  </Field>
                                </td>
                                <td className="p-[2px] ">
                                  <Field
                                    type="text"
                                    name={`quotation_items[${index}].description`}
                                    disabled={!isEditable}
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                  />
                                </td>
                                <td className="p-[2px]">
                                  <Field
                                    type="number"
                                    name={`quotation_items[${index}].srp`}
                                    disabled={!isEditable}
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                  />
                                </td>
                                <td className="p-[2px] ">
                                  <Field
                                    type="number"
                                    name={`quotation_items[${index}].quantity`}
                                    disabled={!isEditable}
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      const quantity = parseFloat(
                                        e.target.value
                                      );
                                      const srp =
                                        values.quotation_items![index].srp || 0;
                                      const total = srp * quantity;
                                      setFieldValue(
                                        `quotation_items[${index}].quantity`,
                                        quantity
                                      );
                                      setFieldValue(
                                        `quotation_items[${index}].total`,
                                        total
                                      );
                                    }}
                                  />
                                </td>
                                <td className="p-[2px]">
                                  <Field
                                    type="number"
                                    name={`quotation_items[${index}].total`}
                                    readOnly
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                  />
                                </td>

                                {/* {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    // className="btn btn-danger uppercase"
                                    className="ml-2 text-xs text-red-700 hover:underline uppercase"

                                    // className="flex items-center   text-red-800 px-3 py-1.5  text-xs hover:underline hover:cursor-pointer transition duration-200 uppercase"
                                  >
                                    Remove
                                  </button>
                                )} */}
                                {/* {isEditable && (
                                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      className="text-xs text-red-700 hover:underline uppercase"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                )} */}
                                {isEditable && (
                                  <td className="p-[2px] text-center">
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      className="text-xs text-red-700 hover:underline uppercase"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* <table className="table-zebra w-full border-collapse border border-gray-200 text-sm">
                        <thead>
                          <tr className="dark:text-white">
                            {[
                              "# ITEM",
                              "Description",
                              "SRP",
                              "Quantity",
                              "Total",
                            ].map((header) => (
                              <th key={header} className="p-1 text-center">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {values.quotation_items?.map((row, index) => (
                            <tr key={index}>
                              {[
                                "item",
                                "description",
                                "srp",
                                "quantity",
                                "total",
                              ].map((field, i) => (
                                <td key={i} className="p-[2px]">
                                  <Field
                                    type={
                                      field === "srp" ||
                                      field === "quantity" ||
                                      field === "total"
                                        ? "number"
                                        : "text"
                                    }
                                    name={`quotation_items[${index}].${field}`}
                                    disabled={!isEditable || field === "total"}
                                    readOnly={field === "total"}
                                    // className="w-20 p-[4px] text-xs text-center bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white rounded"
                                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                    onChange={
                                      field === "quantity"
                                        ? (
                                            e: React.ChangeEvent<HTMLInputElement>
                                          ) => {
                                            const quantity = parseFloat(
                                              e.target.value
                                            );
                                            const srp =
                                              values.quotation_items![index]
                                                .srp || 0;
                                            const total = srp * quantity;
                                            setFieldValue(
                                              `quotation_items[${index}].quantity`,
                                              quantity
                                            );
                                            setFieldValue(
                                              `quotation_items[${index}].total`,
                                              total
                                            );
                                          }
                                        : undefined
                                    }
                                  />
                                </td>
                              ))}
                              <td className="p-[2px] text-center">
                                {isEditable && (
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    className="text-xs text-red-700 hover:underline uppercase"
                                  >
                                    Remove
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table> */}

                      <div className="flex justify-between py-2  border-gray-300">
                        <div className="ml-auto flex space-x-4 w-full">
                          {/* {isEditable && (
                            <button
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({
                                  date: "",
                                  particulars: "",
                                  srp: "",
                                  quantity: "",
                                  total: 0,
                                  balance: "",
                                })
                              }
                              className="btn bg-white border border-black  text-black uppercase text-xs"
                            >
                              Add Row
                            </button>
                          )} */}
                          <div className="flex  gap-2 w-full text-xs">
                            <div className="flex flex-col w-1/4 text-center">
                              <label className="font-semibold">Discount</label>
                              <Field
                                type="number"
                                name="discount"
                                disabled={!isEditable}
                                className="bg-gray-100 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded block w-full p-[4px] text-xs"
                                // className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const discount =
                                    parseFloat(e.target.value) || 0;
                                  setFieldValue("discount", discount);
                                }}
                              />
                            </div>
                            {isEditable && (
                              <div className="flex flex-col w-1/4 text-center">
                                <label className="font-semibold">VAT (%)</label>
                                <Field
                                  type="number"
                                  name="vat_value"
                                  // disabled={!isEditable}
                                  className="bg-gray-100 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded block w-full p-[4px] text-xs"
                                  // className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const vat = parseFloat(e.target.value);
                                    setFieldValue("vat_value", vat);
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex flex-col w-1/4 text-center">
                              <label className="font-semibold">Sub Total</label>
                              <input
                                type="number"
                                value={totalExpenses}
                                readOnly
                                className="bg-gray-100 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded block w-full p-[4px] text-xs"

                                // className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:text-white dark:border border-white "
                              />
                            </div>

                            <div className="flex flex-col w-1/4 text-center">
                              <label className="font-semibold">VAT Value</label>
                              {/* <input
                              type="number"
                              value={(() => {
                                const vat = (values.vat_value || 0) / 100;
                                return totalExpenses! * vat;
                              })()}
                              readOnly
                              className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:text-white dark:border border-white "
                            /> */}
                              <input
                                type="number"
                                value={(() => {
                                  const discount = Number(values.discount) || 0;
                                  const vat = Number(values.vat_value) || 0;

                                  const discountAmount =
                                    totalExpenses! * (discount / 100);
                                  const vatAmount =
                                    totalExpenses! * (vat / 100);

                                  return (
                                    totalExpenses! - discountAmount + vatAmount
                                  );
                                })()}
                                readOnly
                                className="bg-gray-100 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded block w-full p-[4px] text-xs"

                                // className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:text-white dark:border border-white"
                              />
                            </div>
                            <div className="flex flex-col w-1/4 text-center">
                              <label className="font-semibold">
                                Grand Total
                              </label>
                              <input
                                type="number"
                                value={(() => {
                                  const discount = Number(values.discount) || 0;

                                  const discountAmount =
                                    totalExpenses! * (discount / 100) || 0;
                                  const vatAmount =
                                    totalExpenses! * (values.vat_value / 100) ||
                                    0;
                                  return (
                                    totalExpenses! - discountAmount + vatAmount
                                  );
                                })()}
                                readOnly
                                className="bg-gray-100 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded block w-full p-[4px] text-xs"

                                // className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:text-white dark:border border-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>

              {/* Total Row */}
              {/* <div className="flex justify-between py-2 border-t border-gray-300">
                <div className="ml-auto flex space-x-4 w-full">
                  <div className="flex flex-col w-1/4">
                    <label className="font-semibold">Discount</label>
                    <Field
                      type="number"
                      name="discount"
                      disabled={!isEditable}
                      className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      onChange={(e) => {
                        const discount = parseFloat(e.target.value) || 0;
                        setFieldValue("discount", discount);
                      }}
                    />
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="font-semibold">VAT (%)</label>
                    <Field
                      type="number"
                      name="vat_value"
                      disabled={!isEditable}
                      className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      onChange={(e) => {
                        const vat = parseFloat(e.target.value);
                        setFieldValue("vat", vat);
                      }}
                    />
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="font-semibold">Sub Total</label>
                    <input
                      type="number"
                      value={totalExpenses}
                      readOnly
                      className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:text-white dark:border border-white "
                    />
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="font-semibold">VAT Value</label>
                    <input
                      type="number"
                      value={(() => {
                        const vat = (parseFloat(values.vat) || 0) / 100;
                        return totalExpenses * vat;
                      })()}
                      readOnly
                      className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:text-white dark:border border-white "
                    />
                  </div>
                  <div className="flex flex-col w-1/4">
                    <label className="font-semibold">Grand Total</label>
                    <input
                      type="number"
                      value={(() => {
                        const discountAmount =
                          totalExpenses * (values.discount / 100) || 0;
                        const vatAmount =
                          totalExpenses * (values.vat / 100) || 0;
                        return totalExpenses - discountAmount + vatAmount;
                      })()}
                      readOnly
                      className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:text-white dark:border border-white"
                    />
                  </div>
                </div>
              </div> */}

              {/* Grand Total */}
              <div className="flex justify-between py-2 border-t border-gray-300">
                <div className="ml-auto flex space-x-4 w-full">
                  {/* Grand Total */}
                  {/* <div className="flex flex-col w-1/4">
                                <label className="font-semibold">Grand Total</label>
                                <input
                                  type="number"
                                  value={(() => {
                                    const discountAmount =
                                      totalExpenses * (values.discount / 100) || 0;
                                    const vatAmount =
                                      totalExpenses * (values.vat / 100) || 0;
                                    return totalExpenses - discountAmount + vatAmount;
                                  })()}
                                  readOnly
                                  className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:text-white dark:border border-white"
                                />
                              </div> */}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {/* Notes & Assumptions */}
                {/* <div className="mt-1">
                  <h4 className="font-semibold">Notes & Assumptions</h4>
                  <Field
                    as="textarea"
                    name="notes_assumptions"
                    disabled={!isEditable}
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2"
                    placeholder="Enter any notes or assumptions regarding this quotation"
                  />
                </div> */}

                {/* Terms & Conditions */}
                {/* <div className="mt-1">
                  <h4 className="font-semibold">Terms & Conditions</h4>
                  <Field
                    as="textarea"
                    name="terms_conditions"
                    disabled={!isEditable}
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-dark dark:text-white text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2"
                    placeholder="Enter terms and conditions for this quotation"
                  />
                </div> */}
              </div>
              {/* Submit and Cancel Buttons */}
              <div className="modal-action">
                <Link
                  className="btn text-black uppercase"
                  href="/erp-v2/quotation"
                >
                  back
                </Link>
                {isEditable && (
                  <button type="submit" className="btn uppercase">
                    update
                  </button>
                )}
                {/* {isEditable ? "Update" : "Submit"} */}
                {/* <button
                  type="button"
                  className="btn"
                  onClick={() => setShowRegisterModal(false)}
                >
                  Cancel
                </button> */}
                {/* <Link
                  className="btn text-black uppercase"
                  href="/erp-v2/quotation"
                >
                  back
                </Link> */}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditQuotation;
