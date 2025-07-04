"use client";
import { fetchClientsList } from "@/api/clients/fetchClients";
import { AddQuo, CreateQuo } from "@/api/quotation/addQuotation";
// import { fetchUserList } from "@/api/User/fetchUserList";
// import NotFound from "@/components/Error/NotFound";
// import ServerError from "@/components/Error/ServerError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { AxiosError } from "axios";
import { Field, FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AddQuotation = () => {
  // const [setShowRegisterModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>(""); // Client ID
  const [projectName, setProjectName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");

  const [contactPerson, setContactPerson] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [id, setClient] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const queryClient = useQueryClient();

  const { data: projects } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClientsList, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });

  // Fetch user list for 'remittedBy' dropdown
  // const { data: users } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: fetchUserList, // Assume fetchUserList is an API call to fetch users
  // });

  const {
    mutate: registerQuotation,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (data: AddQuo) => CreateQuo(data),
    onSuccess: () => {
      console.log("quotation registered successfully");
      queryClient.invalidateQueries({ queryKey: ["quotation"] });
      // setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
      // if (error instanceof AxiosError) {
      //   if (error.code === "ERR_NETWORK") {
      //     return <ServerError />;
      //   } else if (error.status === 401) {
      //     // setErrorMessage("Username or password is incorrect.");
      //     return <NotFound />;
      //   } else {
      //     // setErrorMessage("Something went wrong. Try again.");
      //   }
      // }
    },
  });

  // if (error instanceof AxiosError) {
  //   if (error.code === "ERR_NETWORK") {
  //     return <ServerError />;
  //   } else if (error.status === 401) {
  //     // setErrorMessage("Username or password is incorrect.");
  //     return <NotFound />;
  //   } else {
  //     // setErrorMessage("Something went wrong. Try again.");
  //   }
  // }
  useEffect(() => {
    if (selectedProject) {
      const selectedClientDetails = projects?.find(
        (project) => project.id === parseInt(selectedProject)
      );

      if (selectedClientDetails) {
        setProjectName(selectedClientDetails.client);
        setContactPerson(selectedClientDetails.contact_person);
        setAddress(selectedClientDetails.address);
        setClient(selectedClientDetails.id);
        setClientName(selectedClientDetails.client);
      }
    }
  }, [selectedProject, projects]);

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
      <Link className="btn text-black uppercase" href="/erp-v2/quotation">
        back to quotation list
      </Link>
      <Formik
        initialValues={{
          project: "",
          clientName: "", // ✅ Add this

          // projectName: "",
          project_name: projectName || "",
          contactPerson: contactPerson || "",
          delivery_address: address || "", // Ensure address is passed
          client: id,
          projectDate: "",
          // remittedBy: "",
          // receivedBy: "",
          // tableRows: [
          //   {
          //     date: "",
          //     description: "",
          //     srp: "",
          //     quantity: "",
          //     total: 0,
          //     balance: "",
          //   },
          // ],
          quotation_items: [
            {
              item: "",
              description: "",
              srp: "",
              quantity: "",
              total: 0,
              balance: "",
            },
          ],
          vat: 0,
          discount: 0,
          // notesRows: [{ note: "" }],
          notes_assumptions: "",
          terms_conditions: "",
        }}
        // onSubmit={handleSubmit}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          // registerQuotation(values);
          try {
            await registerQuotation(values); // Wait for API response
            console.log("Quotation submitted:", values);

            setShowSuccess(true); // Show a success message (optional)
            resetForm({
              values: {
                clientName: "", // ✅ Add this

                project: "",
                project_name: "",
                contactPerson: "",
                delivery_address: "",
                client: 0,
                projectDate: "",
                // remittedBy: "",
                // receivedBy: "",
                // tableRows: [
                //   {
                //     date: "",
                //     description: "",
                //     srp: "",
                //     quantity: "",
                //     total: 0,
                //     balance: "",
                //   },
                // ],
                quotation_items: [
                  {
                    item: "",
                    description: "",
                    srp: "",
                    quantity: "",
                    total: 0,
                    balance: "",
                  },
                ],
                vat: 0,
                discount: 0,
                notes_assumptions: "",
                terms_conditions: "",
              },
            });
            setProjectName("");
            setContactPerson("");
            setAddress("");
            setSelectedProject("");
            setClient(0);
            console.log(values);
            setTimeout(() => {
              window.location.href = "/erp-v2/quotation";
            }, 2000);
          } catch (error) {
            console.error("Failed to register quotation:", error);
          } finally {
            setSubmitting(false); // Always stop spinner/loading
          }
        }}
      >
        {({ values, setFieldValue }) => {
          // useEffect(() => {
          //   if (selectedProject) {
          //     const selectedClientDetails = projects?.find(
          //       (project) => project.id === parseInt(selectedProject)
          //     );
          //     if (selectedClientDetails) {
          //       setProjectName(selectedClientDetails.client); // Set project name
          //       setContactPerson(selectedClientDetails.contact_person); // Set contact person
          //       setAddress(selectedClientDetails.address); // Set address
          //       setClient(selectedClientDetails.id); // Set address
          //       // Update Formik form field for delivery_address
          //       setFieldValue(
          //         "delivery_address",
          //         selectedClientDetails.address || ""
          //       );
          //       setFieldValue(
          //         "contactPerson",
          //         selectedClientDetails.contact_person || ""
          //       );
          //       setFieldValue("client", selectedClientDetails.client || "");
          //     }
          //   }
          // }, [selectedProject, projects, setFieldValue]);
          // useEffect(() => {
          //   if (selectedProject) {
          //     const selectedClientDetails = projects?.find(
          //       (project) => project.id === parseInt(selectedProject)
          //     );
          //     if (selectedClientDetails) {
          //       setProjectName(selectedClientDetails.client);
          //       setContactPerson(selectedClientDetails.contact_person);
          //       setAddress(selectedClientDetails.address);
          //       setClient(selectedClientDetails.id); // local state

          //       setFieldValue("client", selectedClientDetails.id); // Hidden input: client ID
          //       setFieldValue("clientName", selectedClientDetails.client); // Display input: client name
          //     }
          //   }
          // }, [selectedProject, projects, setFieldValue]);

          // Calculate total expenses and cash from accounting
          const totalExpenses = values.quotation_items.reduce(
            (acc, row) =>
              acc + (parseFloat(row.srp) * parseFloat(row.quantity) || 0),
            0
          );
          // const totalCashFromAccounting = values.quotation_items.reduce(
          //   (acc, row) => acc + (parseFloat(row.balance) || 0),
          //   0
          // );
          // const totalCashFromBalance = values.quotation_items.reduce(
          //   (acc, row) => acc + (parseFloat(row.balance) || 0),
          //   0
          // );

          return (
            <Form className="py-4">
              {/* Project and Address Inputs */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 mb-2 gap-2"> */}
              {/* {[
                  {
                    label: "Project",
                    name: "project_name",
                    type: "text",
                    placeholder: "Enter project name",
                    value: projectName || "",
                  },
                ].map((item) => (
                  <div key={item.name}>
                    <label className="uppercase block mb-2 text-sm font-bold text-gray-700 dark:text-white">
                      {item.label}
                    </label>
                    <Field
                      type={item.type}
                      name={item.name}
                      placeholder={item.placeholder}
                      className="bg-gray-50 border dark:placeholder:text-white dark:bg-gray-dark dark:text-white border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                ))} */}

              {/* Dropdown for Project Selection */}
              {/* <Field type="text" name="client" /> */}

              {/* Visible client name (readonly) */}
              {/* <Field
                type="text"
                name="clientName"
                readOnly
                className="readonly-input-class"
                placeholder="Client Name"
              /> */}
              {/* <div className="mb-1">
                <label className="block text-sm font-bold uppercase text-gray-700 dark:text-white">
                  Company
                </label>
                <Field
                  as="select"
                  name="project"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-gray-dark"
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  //   const projectId = e.target.value;
                  //   setSelectedProject(projectId); // Set selected project
                  //   setProjectName(projectId); // Set selected project
                  //   setContactPerson(projectId);
                  //   setAddress(projectId);
                  //   setFieldValue("project", projectId);
                  // }}

                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const projectId = e.target.value;
                    setSelectedProject(projectId);
                    const selectedClientDetails = projects?.find(
                      (project) => project.id === parseInt(projectId)
                    );
                    if (selectedClientDetails) {
                      setProjectName(selectedClientDetails.client);
                      setContactPerson(selectedClientDetails.contact_person);
                      setAddress(selectedClientDetails.address);
                      setClient(selectedClientDetails.id); // ✅ this should be a number

                      // ✅ Now update Formik with correct types
                      setFieldValue("project", projectId); // string is fine here
                      setFieldValue(
                        "delivery_address",
                        selectedClientDetails.address || ""
                      );
                      setFieldValue(
                        "contactPerson",
                        selectedClientDetails.contact_person || ""
                      );
                      setFieldValue("client", selectedClientDetails.id); // ✅ pass a number, not string
                    }
                  }}
                >
                  <option value="">Select a Company</option>
                  {projects?.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.client}
                    </option>
                  ))}
                </Field>
              </div> */}
              {/* </div> */}

              {/* Project Details */}
              {
                <div className="space-y-4 ">
                  <div className="grid grid-cols-1 sm:grid-cols-7 md:grid-cols-7 gap-2 mb-2">
                    {/* <h4 className="font-semibold">Project Details</h4> */}
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2"> */}
                    {/* <div className="flex flex-wrap gap-4"> */}
                    {[
                      {
                        label: "company",
                        name: "project",
                        type: "select",
                        placeholder: "enter terms_conditions",
                      },
                      {
                        label: "Contact Person",
                        name: "contactPerson",
                        type: "text",
                        placeholder: "Contact Person",
                      },
                      {
                        label: "client",
                        name: "clientName",
                        type: "text",
                        placeholder: "client",
                      },
                      {
                        label: "Address",
                        name: "delivery_address",
                        type: "text",
                        placeholder: "Address",
                        // value: address || "",
                        // value: values.delivery_address || address || "",
                      },
                      // {
                      //   label: "Project",
                      //   name: "project_name",
                      //   type: "text",
                      //   placeholder: "Enter project name",
                      //   // value: projectName || "",
                      // },
                      // {
                      //   label: "notes and assumptions",
                      //   name: "notes_assumptions",
                      //   type: "text",
                      //   placeholder: "enter notes & assumptions",
                      // },
                      // {
                      //   label: "terms conditions",
                      //   name: "terms_conditions",
                      //   type: "text",
                      //   placeholder: "enter terms_conditions",
                      // },
                      // {
                      //   label: "company",
                      //   name: "project",
                      //   type: "select",
                      //   placeholder: "enter terms_conditions",
                      // },
                    ].map((item) => (
                      <div key={item.name}>
                        <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                          {item.label}
                        </label>
                        {item.type === "select" ? (
                          <Field
                            as="select"
                            name={item.name}
                            className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const projectId = e.target.value;
                              setSelectedProject(projectId);
                              const selectedClientDetails = projects?.find(
                                (project) => project.id === parseInt(projectId)
                              );
                              if (selectedClientDetails) {
                                setProjectName(selectedClientDetails.client);
                                setContactPerson(
                                  selectedClientDetails.contact_person
                                );
                                setAddress(selectedClientDetails.address);
                                setClient(selectedClientDetails.id); // ✅ this should be a number
                                setClientName(selectedClientDetails.client);

                                // ✅ Now update Formik with correct types
                                setFieldValue("project", projectId); // string is fine here
                                setFieldValue(
                                  "delivery_address",
                                  selectedClientDetails.address || ""
                                );
                                setFieldValue(
                                  "contactPerson",
                                  selectedClientDetails.contact_person || ""
                                );
                                setFieldValue(
                                  "client",
                                  selectedClientDetails.id
                                ); // ✅ pass a number, not string
                                setFieldValue(
                                  "clientName",
                                  selectedClientDetails.client || ""
                                ); // ✅ pass a number, not string
                              }
                            }}
                          >
                            <option value="">Select a Company</option>
                            {projects?.map((project) => (
                              <option key={project.id} value={project.id}>
                                {project.client}
                              </option>
                            ))}
                          </Field>
                        ) : (
                          <Field
                            type={item.type}
                            name={item.name}
                            placeholder={item.placeholder}
                            className="bg-gray-50 hover:cursor-not-allowed dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                            required
                            readOnly
                            // value={
                            //   item.name === "contactPerson"
                            //     ? contactPerson
                            //     : address || values[item.name]
                            // }
                            // value={values[item.name] || ""}
                            // readOnly
                            // value={
                            //   item.name === "contactPerson"
                            //     ? contactPerson || values.contactPerson // For contactPerson, use the contactPerson value or Formik's value
                            //     : item.name === "delivery_address"
                            //     ? values.delivery_address || address || "" // For delivery_address, use Formik's value or fallback to address
                            //     : values[item.name] // For other fields, use Formik's state value
                            // }
                            // value={values[item.name] || address || ""}
                          />
                        )}
                      </div>
                    ))}
                    <div className="mt-1">
                      <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                        project name
                      </label>
                      <Field
                        type="text"
                        name="project_name"
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div className="mt-1">
                      <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                        Notes & Assumptions
                      </label>
                      <Field
                        type="text"
                        name="notes_assumptions"
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        placeholder="Enter notes or assumptions"
                      />
                    </div>

                    <div className="mt-1 uppercase">
                      <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                        Terms & Conditions
                      </label>
                      <Field
                        type="text"
                        name="terms_conditions"
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        placeholder="Enter terms and conditions"
                      />
                    </div>
                  </div>
                </div>
              }
              <input type="hidden" name="clients" value={clientName} />
              <input type="hidden" name="client" value={id} />
              {/* Table for Adding Expenses */}
              <div className="space-y-4">
                {/* <h4 className="font-semibold">Expenses</h4> */}
                <FieldArray
                  name="quotation_items"
                  render={(arrayHelpers) => (
                    <>
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              date: "",
                              description: "",
                              srp: "",
                              quantity: 1,
                              total: 0,
                              balance: "",
                            })
                          }
                          className="btn bg-white mt-5 text-black border border-black uppercase"
                        >
                          Add Row
                        </button>
                      </div>
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
                            {values.quotation_items.map((row, index) => (
                              <tr key={index}>
                                <td className=" p-[2px]">
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
                                        {client.client}{" "}
                                        {/* Display client name */}
                                      </option>
                                    ))}
                                  </Field>
                                </td>

                                <td className=" p-[2px]">
                                  <Field
                                    type="text"
                                    name={`quotation_items[${index}].description`}
                                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                    readOnly
                                  />
                                </td>

                                <td className=" p-[2px]">
                                  <Field
                                    type="number"
                                    name={`quotation_items[${index}].srp`}
                                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                    // Allow user to edit SRP
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      const srp = parseFloat(e.target.value);
                                      const quantity =
                                        parseFloat(
                                          values.quotation_items[index].quantity
                                        ) || 1;
                                      const total = srp * quantity;

                                      setFieldValue(
                                        `quotation_items[${index}].srp`,
                                        srp
                                      );
                                      setFieldValue(
                                        `quotation_items[${index}].total`,
                                        total
                                      );
                                    }}
                                  />
                                </td>

                                <td className=" p-[2px]">
                                  <Field
                                    type="number"
                                    name={`quotation_items[${index}].quantity`}
                                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      const quantity = parseFloat(
                                        e.target.value
                                      );
                                      const srp =
                                        parseFloat(
                                          values.quotation_items[index].srp
                                        ) || 0;
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

                                <td className=" p-[2px]">
                                  <Field
                                    type="number"
                                    name={`quotation_items[${index}].total`}
                                    readOnly
                                    className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                  />
                                </td>

                                <td className="text-xs flex gap-2 justify-center">
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    // className="btn btn-danger uppercase"
                                    className="hover:underline hover:cursor-pointer flex justify-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="flex justify-between py-2 border-gray-300">
                          <div className="ml-auto flex space-x-4 w-full uppercase">
                            {/* Discount Input */}
                            {/* <button
      type="button"
      onClick={() =>
        arrayHelpers.push({
          date: "",
          description: "",
          srp: "",
          quantity: 1,
          total: 0,
          balance: "",
        })
      }
      className="btn bg-white mt-5 text-black border border-black uppercase"
    >
      Add Row
    </button> */}
                            <div className="flex flex-col w-1/4">
                              <label className="font-semibold">Discount</label>
                              <Field
                                type="number"
                                name="discount"
                                className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const discount =
                                    parseFloat(e.target.value) || 0;
                                  setFieldValue("discount", discount);
                                }}
                              />
                            </div>

                            {/* VAT Input */}

                            <div className="flex flex-col w-1/4">
                              <label className="font-semibold">VAT (%)</label>
                              <Field
                                type="number"
                                name="vat"
                                className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const vat = parseFloat(e.target.value);
                                  setFieldValue("vat", vat);
                                }}
                              />
                            </div>

                            {/* Sub Total */}
                            <div className="flex flex-col w-1/4 ">
                              <label className="font-semibold">Sub Total</label>
                              <input
                                type="number"
                                value={totalExpenses}
                                readOnly
                                className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                              />
                            </div>

                            {/* VAT Value */}
                            <div className="flex flex-col w-1/4">
                              <label className="font-semibold">VAT Value</label>
                              <input
                                type="number"
                                value={(() => {
                                  const vat = (values.vat || 0) / 100;
                                  return totalExpenses * vat;
                                })()}
                                readOnly
                                className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                              />
                            </div>
                            <div className="flex flex-col w-1/4">
                              <label className="font-semibold">
                                Grand Total
                              </label>
                              <input
                                type="number"
                                value={(() => {
                                  const discountAmount =
                                    totalExpenses * (values.discount / 100) ||
                                    0;
                                  const vatAmount =
                                    totalExpenses * (values.vat / 100) || 0;
                                  return (
                                    totalExpenses - discountAmount + vatAmount
                                  );
                                })()}
                                readOnly
                                className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                              />
                            </div>
                          </div>
                        </div>
                        {/* <button
      type="button"
      onClick={() =>
        arrayHelpers.push({
          date: "",
          description: "",
          srp: "",
          quantity: 1,
          total: 0,
          balance: "",
        })
      }
      className="btn bg-white mt-2 mb-2 text-black border border-black uppercase"
    >
      Add Row
    </button> */}
                      </div>
                    </>
                  )}
                />
              </div>

              {/* Total Row */}
              {/* <div className="flex justify-between py-2 border-t border-gray-300">
                <div className="ml-auto flex space-x-4 w-full uppercase">
                  <div className="flex flex-col w-1/4">
                    <label className="font-semibold">Discount</label>
                    <Field
                      type="number"
                      name="discount"
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                      name="vat"
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      onChange={(e) => {
                        const vat = parseFloat(e.target.value);
                        setFieldValue("vat", vat);
                      }}
                    />
                  </div>

                  <div className="flex flex-col w-1/4 ">
                    <label className="font-semibold">Sub Total</label>
                    <input
                      type="number"
                      value={totalExpenses}
                      readOnly
                      className="bg-gray-200 border border-white dark:bg-gray-dark dark:text-white p-2 rounded-md w-full"
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
                      className="bg-gray-200 border border-white dark:bg-gray-dark dark:text-white p-2 rounded-md w-full"
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
                      className="bg-gray-200 border border-white dark:bg-gray-dark dark:text-white p-2 rounded-md w-full"
                    />
                  </div>
                </div>
              </div> */}

              {/* Grand Total */}
              <div className="flex justify-between py-2 border-t border-gray-300 uppercase">
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
                              className="bg-gray-200 border border-white dark:bg-gray-dark dark:text-white p-2 rounded-md w-full"
                            />
                          </div> */}
                </div>
              </div>
              {/* Notes & Assumptions */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-1"> */}
              {/* <div className="mt-1">
                  <h4 className="font-semibold uppercase">
                    Notes & Assumptions
                  </h4>
                  <Field
                    as="textarea"
                    name="notes_assumptions"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2"
                    placeholder="Enter any notes or assumptions regarding this quotation"
                  />
                </div>

                <div className="mt-1 uppercase">
                  <h4 className="font-semibold">Terms & Conditions</h4>
                  <Field
                    as="textarea"
                    name="terms_conditions"
                    className="bg-gray-50 dark:bg-gray-dark dark:text-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2"
                    placeholder="Enter terms and conditions for this quotation"
                  />
                </div>
              </div> */}

              <div className="modal-action">
                {/* <button type="submit" className="btn">
                  Submit
                </button> */}
                {/* <button
                  type="button"
                  className="btn"
                  onClick={() => setShowRegisterModal(false)}
                >
                  Cancel
                </button> */}
                <Link
                  className="btn text-black uppercase"
                  href="/erp-v2/quotation"
                >
                  back{" "}
                </Link>
                <button type="submit" className="btn uppercase">
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddQuotation;
