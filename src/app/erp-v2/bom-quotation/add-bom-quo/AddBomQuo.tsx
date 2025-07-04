"use client";
// import { AddQuo, CreateQuo } from "@/api/quotation/addQuotation";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Formik, Form, Field, FieldArray } from "formik";
import React, { useEffect, useState } from "react";
// import users from "../../dashboard/users";
import { fetchClientsList } from "@/api/quotation/fetchClients";
import Link from "next/link";
import { CreateBomQuo, AddBomQuos } from "@/api/bom-quotation/addBomQuo";
// import { fetchEicUser } from "@/api/bill_of_materials/fetchEic";
import { fetchEicUsers } from "@/api/bom-quotation/fetchEic";
// import { fetchSicUser } from "@/api/bill_of_materials/fetchSic";
import { fetchSicUsers } from "@/api/bom-quotation/fetchSic";

const AddBomQuo = () => {
  const [selectedProject, setSelectedProject] = useState<string>(""); // Client ID
  const [projectName, setProjectName] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [id, setClient] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const queryClient = useQueryClient();
  const {
    mutate: registerQuotation,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (data: AddBomQuos) => CreateBomQuo(data),
    onSuccess: () => {
      console.log("quotation registered successfully");
      queryClient.invalidateQueries({ queryKey: ["bom-quotation"] });
      //   setShowRegisterModal(false);
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
    },
  });
  const { data: projects } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClientsList, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });

  const { data: eic } = useQuery({
    queryKey: ["eic"],
    queryFn: fetchEicUsers, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });
  const { data: sic } = useQuery({
    queryKey: ["sic"],
    queryFn: fetchSicUsers, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });
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
        initialValues={{
          discount: 0,
          vat: 0,
          project: "",
          // projectName: "",
          project_name: projectName || "",
          contactPerson: contactPerson || "",
          delivery_address: address || "", // Ensure address is passed
          client: id || 0,
          projectDate: "",
          remittedBy: "",
          receivedBy: "",
          tableRows: [
            {
              date: "",
              description: "",
              srp: "",
              quantity: "",
              total: 0,
              balance: "",
            },
          ],
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
          // notesRows: [{ note: "" }],
          date: "",
          first_header: "",
          eic: "",
          sic: "",
          notes_assumptions: "",
          terms_conditions: "",
          project_site: "",
        }}
        // onSubmit={handleSubmit}
        // onSubmit={(values, { resetForm }) => {
        //   registerQuotation(values);
        //   resetForm({
        //     values: {
        //       discount: 0,
        //       vat: 0,
        //       project: "",
        //       project_name: "",
        //       contactPerson: "",
        //       delivery_address: "",
        //       client: 0,
        //       projectDate: "",
        //       remittedBy: "",
        //       receivedBy: "",
        //       tableRows: [
        //         {
        //           date: "",
        //           description: "",
        //           srp: "",
        //           quantity: "",
        //           total: 0,
        //           balance: "",
        //         },
        //       ],
        //       quotation_items: [
        //         {
        //           item: "",
        //           description: "",
        //           srp: "",
        //           quantity: "",
        //           total: 0,
        //           balance: "",
        //         },
        //       ],
        //       notes_assumptions: "",
        //       terms_conditions: "",
        //     },
        //   });
        //   setProjectName("");
        //   setContactPerson("");
        //   setAddress("");
        //   setSelectedProject("");
        //   setClient(0);
        //   console.log(values);
        // }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await registerQuotation(values); // Wait for API response
            console.log("Quotation submitted:", values);

            setShowSuccess(true); // Show a success message (optional)

            resetForm({
              values: {
                discount: 0,
                vat: 0,
                project: "",
                project_name: "",
                contactPerson: "",
                delivery_address: "",
                client: 0,
                projectDate: "",
                remittedBy: "",
                receivedBy: "",
                tableRows: [
                  {
                    date: "",
                    description: "",
                    srp: "",
                    quantity: "",
                    total: 0,
                    balance: "",
                  },
                ],
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
                // date: "", // use format "YYYY-MM-DD" if pre-filled

                notes_assumptions: "",
                terms_conditions: "",
                date: "",
                first_header: "",
                eic: "",
                sic: "",
                project_site: "",
              },
            });

            // Reset local states
            setProjectName("");
            setContactPerson("");
            setAddress("");
            setSelectedProject("");
            setClient(0);

            // Optional redirect
            setTimeout(() => {
              window.location.href = "/erp-v2/bom-quotation";
            }, 2000);
          } catch (error) {
            console.error("Failed to register quotation:", error);
          } finally {
            setSubmitting(false); // Always stop spinner/loading
          }
        }}
      >
        {({ values, setFieldValue }) => {
          useEffect(() => {
            if (selectedProject) {
              const selectedClientDetails = projects?.find(
                (project) => project.id === parseInt(selectedProject)
              );
              if (selectedClientDetails) {
                setProjectName(selectedClientDetails.client); // Set project name
                setContactPerson(selectedClientDetails.contact_person); // Set contact person
                setAddress(selectedClientDetails.address); // Set address
                setClient(selectedClientDetails.id); // Set address
                // Update Formik form field for delivery_address
                setFieldValue(
                  "delivery_address",
                  selectedClientDetails.address || ""
                );
                setFieldValue(
                  "contactPerson",
                  selectedClientDetails.contact_person || ""
                );
                setFieldValue("client", selectedClientDetails.id || "");
              }
            }
          }, [selectedProject, projects, setFieldValue]);
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

              {/* <div className="mb-1">
                <label className="block text-sm font-bold uppercase text-gray-700 dark:text-white">
                  Companys
                </label>
                <Field
                  as="select"
                  name="project"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-gray-dark"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const projectId = e.target.value;
                    setSelectedProject(projectId); // Set selected project
                    setFieldValue("project", projectId);
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

              {/* Project Details */}
              {/* {selectedProject && ( */}
              <div className="space-y-4 ">
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 mb-2">
                  {[
                    {
                      label: "Company",
                      name: "project",
                      type: "select",
                      placeholder: "Company",
                    },
                    {
                      label: "Contact Person",
                      name: "contactPerson",
                      type: "text",
                      placeholder: "Contact Person",
                    },
                    {
                      label: "Address",
                      name: "delivery_address",
                      type: "text",
                      placeholder: "Address",
                    },
                    // {
                    //   name: "project_site",
                    //   type: "text",
                    //   label: "Project site",
                    //   placeholder: "Contact Person",
                    // },
                    // {
                    //   name: "notes_assumptions",
                    //   type: "text",
                    //   label: "Notes & Assumptions",
                    // },
                    // {
                    //   name: "terms_conditions",
                    //   type: "text",
                    //   label: "Terms & Conditions",
                    // },
                    // {
                    //   name: "project_name",
                    //   type: "text",
                    //   label: "Project Name",
                    // },
                    // {
                    //   name: "project_site",
                    //   type: "text",
                    //   label: "Project site",
                    //   placeholder: "Contact Person",
                    // },
                    // {
                    //   name: "date",
                    //   type: "date",
                    //   label: "date",
                    // },
                    // {
                    //   name: "first_header",
                    //   type: "text",
                    //   label: "first header",
                    //   placeholder: "Contact Person",
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
                            e: React.ChangeEvent<HTMLSelectElement>
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
                              setClient(selectedClientDetails.id);

                              setFieldValue("project", projectId);
                              setFieldValue(
                                "delivery_address",
                                selectedClientDetails.address || ""
                              );
                              setFieldValue(
                                "contactPerson",
                                selectedClientDetails.contact_person || ""
                              );
                              setFieldValue("client", selectedClientDetails.id);
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
                          className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                          readOnly
                        />
                      )}
                    </div>
                  ))}

                  <div>
                    <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                      project site
                    </label>
                    <Field
                      placeholder="enter project site"
                      type="text"
                      name="project_site"
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    ></Field>
                  </div>
                  <div>
                    <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                      date
                    </label>
                    <Field
                      type="date"
                      name="date"
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    ></Field>
                  </div>
                  <div>
                    <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                      Notes & Assumptions
                    </label>
                    <Field
                      placeholder="enter Notes & Assumptions"
                      type="text"
                      name="notes_assumptions"
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    ></Field>
                  </div>
                  <div>
                    <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                      terms & conditions
                    </label>
                    <Field
                      placeholder="enter terms & conditions"
                      type="text"
                      name="terms_conditions"
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    ></Field>
                  </div>
                  <div>
                    <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                      project name
                    </label>
                    <Field
                      type="text"
                      name="project_name"
                      placeholder="project name"
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    ></Field>
                  </div>
                  <div>
                    <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                      first header
                    </label>
                    <Field
                      type="text"
                      name="first_header"
                      placeholder="first header"
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    ></Field>
                  </div>
                  <div>
                    <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                      EIC
                    </label>
                    <Field
                      as="select"
                      name="eic"
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    >
                      <option value="">Select EIC</option>
                      {eic?.map((person) => (
                        <option key={person.id} value={person.id}>
                          {person.full_name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div>
                    <label className="uppercase block mb-2 text-sm font-bold text-gray-700">
                      EIC
                    </label>
                    <Field
                      as="select"
                      name="sic"
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    >
                      <option value="">Select SIC</option>
                      {sic?.map((person) => (
                        <option key={person.id} value={person.id}>
                          {person.full_name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
              </div>
              {/* )} */}
              <input type="hidden" name="client" />

              {/* Table for Adding Expenses */}
              <div className="space-y-4">
                {/* <h4 className="font-semibold">Expenses</h4> */}
                <FieldArray
                  name="quotation_items"
                  render={(arrayHelpers) => (
                    <>
                      <>
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
                          className="btn bg-white border border-black ml-2 mt-6 mb-1 text-black uppercase"
                        >
                          Add Row
                        </button>
                      </>
                      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <table
                          style={{ width: "100%" }}
                          className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg"
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
                                <th key={header} className="p-2 text-center">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {values.quotation_items.map((row, index) => (
                              <tr key={index}>
                                <td className="p-2">
                                  <Field
                                    as="select"
                                    name={`quotation_items[${index}].item`} // Name it as client
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLSelectElement>
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
                                        setFieldValue(
                                          `quotation_items[${index}].total`,
                                          parseFloat(
                                            selectedItem.contact_number || "0"
                                          ) * 1 // Calculate total based on SRP and quantity
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

                                <td className="p-2">
                                  <Field
                                    type="text"
                                    name={`quotation_items[${index}].description`}
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                    readOnly
                                  />
                                </td>

                                <td className="p-2">
                                  <Field
                                    type="number"
                                    name={`quotation_items[${index}].srp`}
                                    className="w-full border border-gray-200  text-center p-1 rounded"
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

                                <td className="p-2">
                                  <Field
                                    type="number"
                                    name={`quotation_items[${index}].quantity`}
                                    className="w-full border border-gray-200  text-center p-1 rounded"
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

                                <td className="p-2">
                                  <Field
                                    type="number"
                                    name={`quotation_items[${index}].total`}
                                    readOnly
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                  />
                                </td>

                                <td className="p-2">
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    // className="btn btn-danger uppercase"
                                    className="flex items-center gap-1  text-red-800  px-3 py-1.5  text-xs hover:underline hover:cursor-pointer transition duration-200 uppercase"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

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
      className="btn bg-white border border-black mt-1 mb-1 text-black uppercase"
    >
      Add Row
    </button> */}
                      </div>
                    </>
                  )}
                />
              </div>

              {/* Total Row */}
              <div className="flex justify-between py-2  border-gray-300">
                <div className="ml-auto flex gap-2 w-full uppercase">
                  {/* <div>
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
        className="btn bg-white border border-black ml-2 mt-6 mb-1 text-black uppercase"
      >
        Add Row
      </button>
    </div> */}
                  <div className="flex flex-col w-1/4 text-center">
                    <label className="font-semibold">Discount</label>
                    <Field
                      type="number"
                      name="discount"
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const discount = parseFloat(e.target.value) || 0;
                        setFieldValue("discount", discount);
                      }}
                    />
                  </div>

                  <div className="flex flex-col w-1/4 text-center">
                    <label className="font-semibold">VAT (%)</label>
                    <Field
                      type="number"
                      name="vat"
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const vat = parseFloat(e.target.value);
                        setFieldValue("vat", vat);
                      }}
                    />
                  </div>

                  <div className="flex flex-col w-1/4 text-center">
                    <label className="font-semibold">Sub Total</label>
                    <input
                      type="number"
                      value={totalExpenses}
                      readOnly
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    />
                  </div>

                  <div className="flex flex-col w-1/4 text-center">
                    <label className="font-semibold">VAT Value</label>
                    <input
                      type="number"
                      value={(() => {
                        const vat = (values.vat || 0) / 100;
                        return totalExpenses * vat;
                      })()}
                      readOnly
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-1/4 text-center">
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
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    />
                  </div>
                </div>
              </div>

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
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="mt-1">
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
              {/* Submit and Cancel Buttons */}
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
                  href="/erp-v2/bom-quotation"
                >
                  back
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

export default AddBomQuo;
