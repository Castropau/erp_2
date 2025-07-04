"use client";
// import { updateView } from "@/api/delivery_receipt/updateDelivery";
import { fetchPurchaseId } from "@/api/purchase-order/fetchPurchaseId";
import { UpdateView, updateView } from "@/api/purchase-order/updatePurchase";
import { fetchVendorsList } from "@/api/vendor/fetchVendor";
// import users from "@/app/erp-v2/dashboard/users";
import NotFound from "@/components/Error/NotFound";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { Formik, Form, Field, FieldArray } from "formik";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const EditPurchase = () => {
  const pathname = usePathname();
  const [isEditMode, setIsEditMode] = useState(false); // New state to toggle between edit and view mode
  // const [selectedProject, setSelectedProject] = useState("");
  // const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<string>(""); // project ID as string
  const [selectedVendor, setSelectedVendor] = useState<Project | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);

  const id = pathname?.split("/").pop();
  const { data: projects } = useQuery({
    queryKey: ["vendor"],
    queryFn: fetchVendorsList, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });
  const {
    data: PurchaseData,
    isLoading: Rloading,
    // isError: ReceiptError,
    error: rerror,
  } = useQuery({
    queryKey: ["purchase", id],
    queryFn: () => fetchPurchaseId(id as string),
    enabled: !!id,
  });

  interface Project {
    id: number;
    vendor: string;
    address?: string;
    contact_number?: string;
    tin?: string;
  }

  if (Rloading) {
    return <LoadingSpinner />;
  }

  if (rerror) {
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
        <Link
          className="btn text-black uppercase"
          href="/erp-v2/purchase-order"
        >
          back to purchase order
        </Link>
        {isEditMode ? (
          <button
            onClick={() => setIsEditMode(!isEditMode)} // Switch to readonly mode
            className="btn text-black uppercase"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setIsEditMode(true)} // Switch to editable mode
            className="btn text-black uppercase"
          >
            Edit
          </button>
        )}
        {/* <Link
          className="btn text-black uppercase"
          href="/erp-v2/purchase-order"
        >
          back
        </Link> */}
      </div>
      <Formik
        initialValues={{
          project: PurchaseData?.to_vendor?.vendor || "",

          address: PurchaseData?.to_vendor?.address || "",
          contact_number: PurchaseData?.to_vendor?.contact_number || "",
          tin: PurchaseData?.to_vendor?.tin || "",
          vendor: PurchaseData?.to_vendor.id || "",
          terms: PurchaseData?.terms || "",
          discount: PurchaseData?.discount || 0,
          vat_percentage: PurchaseData?.vat_percentage || 0,
          sub_total: PurchaseData?.sub_total || "",
          tableRows: PurchaseData?.items || [
            {
              item: "",
              description: "",
              unit_price: 0,
              quantity: 0,
            },
          ],
          notesRows: [{ note: "" }],
        }}
        enableReinitialize={true}
        // onSubmit={(values) => {
        //   // const updatedData = {
        //   //   id,
        //   //   vendor: values.vendor,
        //   //   project: values.project,
        //   //   address: values.address,
        //   //   tin: values.tin,
        //   //   terms: values.terms,
        //   //   contact_number: values.contact_number,
        //   //   items: values.tableRows.map((item) => ({
        //   //     ...item,
        //   //     unit_price: item.unit_price,
        //   //     quantity: item.quantity,
        //   //   })),
        //   // };
        //   const updatedData: UpdateView = {
        //     vendor: Number(values.vendor),
        //     to_vendor: values.project,
        //     terms: values.terms,
        //     discount: values.discount,
        //     vat_percentage: values.vat_percentage,
        //     items: values.tableRows.map((item) => ({
        //       ...item,
        //       unit_price: Number(item.unit_price),
        //       quantity: item.quantity,
        //     })),
        //     // address: PurchaseData?.to_vendor?.address || "",
        //   };

        //   updateView(id as string, updatedData)
        //     .then((res) => {
        //       console.log("Successfully updated:", res);
        //       // setShowRegisterModal(false); // Close modal
        //     })
        //     .catch((err) => {
        //       console.error("Update failed:", err);
        //     });

        //   console.log("Updated data to send:", updatedData);
        // }}
        onSubmit={async (values, { setSubmitting }) => {
          const updatedData: UpdateView = {
            vendor: Number(values.vendor),
            to_vendor: values.project,
            terms: values.terms,
            discount: values.discount,
            vat_percentage: values.vat_percentage,
            items: values.tableRows.map((item) => ({
              ...item,
              unit_price: Number(item.unit_price),
              quantity: item.quantity,
            })),
          };

          try {
            const res = await updateView(id as string, updatedData);
            console.log("Successfully updated:", res);

            setShowSuccess(true); // ✅ Show success alert
            setTimeout(() => {
              window.location.href = "/erp-v2/purchase-order"; // 🔁 Optional redirect
            }, 2000);
          } catch (err) {
            console.error("Update failed:", err);
            // Optional: show error alert here
          } finally {
            setSubmitting(false);
          }

          console.log("Updated data sent:", updatedData);
        }}
      >
        {({ values, setFieldValue }) => {
          // Calculate total expenses and cash from accounting
          const totalExpenses = values.tableRows.reduce(
            (acc, row) => acc + (row.unit_price * row.quantity || 0),
            0
          );
          // const totalCashFromAccounting = values.tableRows.reduce(
          //   (acc, row) => acc + ((row.balance) || 0),
          //   0
          // );
          // const totalCashFromBalance = values.tableRows.reduce(
          //   (acc, row) => acc + ((row.balance) || 0),
          //   0
          // );

          return (
            <Form className="py-1">
              {/* Dropdown for Project Selection */}
              {!isEditMode && (
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {isEditMode && selectedVendor && (
                    <div className="mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Company
                      </label>
                      {/* <Field
                    as="select"
                    name="project"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    disabled={!isEditMode} // Disable when not in edit mode
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const vendorId = e.target.value;
                      setSelectedProject(vendorId);
                      setFieldValue("project", vendorId);

                      // Find vendor info based on selected value
                      const selected = projects?.find(
                        (v) => v.id.toString() === vendorId
                      );
                      setSelectedVendor(selected);

                      // Auto-fill address, contact, and tin (assuming those fields exist in vendor)
                      if (selected) {
                        setFieldValue("address", selected.address || "");
                        setFieldValue(
                          "contact_number",
                          selected.contact_number || ""
                        );
                        setFieldValue("tin", selected.tin || ""); // Only if vendor has TIN
                      }
                    }}
                  >
                    <option value="">Select a Project</option>
                    {projects?.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.vendor}
                      </option>
                    ))}
                  </Field> */}
                      {/* <Field
                        as="select"
                        name="project"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        disabled={!isEditMode}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const vendorId = e.target.value;
                          setSelectedProject(vendorId);
                          setFieldValue("project", vendorId);
                          setFieldValue("vendor", vendorId); // update vendor ID

                          const selected = projects?.find(
                            (v) => v.id.toString() === vendorId
                          );
                          setSelectedVendor(selected || null);

                          if (selected) {
                            setFieldValue("address", selected.address || "");
                            setFieldValue(
                              "contact_number",
                              selected.contact_number || ""
                            );
                            setFieldValue("tin", selected.tin || "");
                          }
                        }}
                      >
                        <option value="">Select a Project</option>
                        {projects?.map((project) => (
                          <option
                            key={project.id}
                            value={project.id.toString()}
                          >
                            {project.vendor}
                          </option>
                        ))}
                      </Field> */}
                      <Field
                        as="select"
                        name="project"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        disabled={!isEditMode}
                        value={selectedProject} // <-- use selectedProject here as the select's current value
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const vendorId = e.target.value;
                          setSelectedProject(vendorId); // update selectedProject state
                          setFieldValue("project", vendorId);
                          setFieldValue("vendor", vendorId);

                          const selected =
                            projects?.find(
                              (v) => v.id.toString() === vendorId
                            ) || null;
                          setSelectedVendor(selected);

                          if (selected) {
                            setFieldValue("address", selected.address || "");
                            setFieldValue(
                              "contact_number",
                              selected.contact_number || ""
                            );
                            setFieldValue("tin", selected.tin || "");
                          }
                        }}
                      >
                        <option value="">Select a Project</option>
                        {projects?.map((project) => (
                          <option
                            key={project.id}
                            value={project.id.toString()}
                          >
                            {project.vendor}
                          </option>
                        ))}
                      </Field>
                    </div>
                  )}
                  {[
                    {
                      label: "Vendor",
                      name: "project",
                    },
                    {
                      label: "Address",
                      name: "address",
                    },
                    {
                      label: "Contact Number",
                      name: "contact_number",
                    },
                    // {
                    //   label: "Terms & Conditions",
                    //   name: "terms",
                    // },
                  ].map((item) => (
                    <div key={item.name}>
                      <label className=" text-sm font-medium">
                        {item.label}
                      </label>
                      <Field
                        type="text"
                        name={item.name}
                        className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        disabled={!isEditMode} // Disable when not in edit mode
                      />
                    </div>
                  ))}
                  <div className="">
                    <label className="">Terms & Conditions</label>
                    <Field
                      type="text"
                      name="terms"
                      // disabled={!isEditMode}
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      placeholder="Enter terms and conditions for this quotation"
                    />
                  </div>
                </div>
              )}
              {/* <div className="mt-1">
                <h4 className="font-semibold">Terms & Conditions</h4>
                <Field
                  as="textarea"
                  name="terms"
                  disabled={!isEditMode}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2 dark:bg-gray-dark dark:text-white"
                  placeholder="Enter terms and conditions for this quotation"
                />
              </div> */}

              {/* {isEditMode && (
                <div className="mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Company
                  </label> */}
              {/* <Field
                    as="select"
                    name="project"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    disabled={!isEditMode} // Disable when not in edit mode
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const vendorId = e.target.value;
                      setSelectedProject(vendorId);
                      setFieldValue("project", vendorId);

                      // Find vendor info based on selected value
                      const selected = projects?.find(
                        (v) => v.id.toString() === vendorId
                      );
                      setSelectedVendor(selected);

                      // Auto-fill address, contact, and tin (assuming those fields exist in vendor)
                      if (selected) {
                        setFieldValue("address", selected.address || "");
                        setFieldValue(
                          "contact_number",
                          selected.contact_number || ""
                        );
                        setFieldValue("tin", selected.tin || ""); // Only if vendor has TIN
                      }
                    }}
                  >
                    <option value="">Select a Project</option>
                    {projects?.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.vendor}
                      </option>
                    ))}
                  </Field> */}
              {/* <Field
                    as="select"
                    name="project"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    disabled={!isEditMode}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const vendorId = e.target.value;
                      setSelectedProject(vendorId);
                      setFieldValue("project", vendorId);
                      setFieldValue("vendor", vendorId); // update vendor ID

                      const selected = projects?.find(
                        (v) => v.id.toString() === vendorId
                      );
                      setSelectedVendor(selected || null);

                      if (selected) {
                        setFieldValue("address", selected.address || "");
                        setFieldValue(
                          "contact_number",
                          selected.contact_number || ""
                        );
                        setFieldValue("tin", selected.tin || "");
                      }
                    }}
                  >
                    <option value="">Select a Project</option>
                    {projects?.map((project) => (
                      <option key={project.id} value={project.id.toString()}>
                        {project.vendor}
                      </option>
                    ))}
                  </Field>
                </div>
              )} */}

              {/* Project Details */}
              {/* {isEditMode && selectedProject && ( */}
              {isEditMode && (
                <div className="space-y-4">
                  {/* <h4 className="font-semibold">Project Details</h4> */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    {[
                      {
                        label: "company",
                        name: "project",
                        type: "select",
                        placeholder: "enter terms_conditions",
                      },
                      {
                        label: "Address",
                        name: "address",
                        type: "text",
                        placeholder: "Address",
                      },
                      {
                        label: "TIN",
                        name: "tin",
                        type: "text",
                        placeholder: "TIN",
                      },
                      {
                        label: "Contact Number",
                        name: "contact_number",
                        type: "text",
                        placeholder: "Contact Number",
                      },
                    ].map((item) => (
                      <div key={item.name}>
                        <label className="block mb-2 text-sm text-center uppercase font-medium ">
                          {item.label}
                        </label>
                        {item.type === "select" ? (
                          <Field
                            as="select"
                            name="project"
                            className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                            // onChange={(e) => {
                            //   setSelectedProject(e.target.value);
                            //   setFieldValue("project", e.target.value);
                            // }}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const selectedId = e.target.value;
                              setSelectedProject(selectedId);
                              setFieldValue("project", selectedId);

                              const selectedVendor = projects?.find(
                                (proj) => proj.id.toString() === selectedId
                              );

                              if (selectedVendor) {
                                setFieldValue(
                                  "address",
                                  selectedVendor.address || ""
                                );
                                setFieldValue("tin", selectedVendor.tin || "");
                                setFieldValue(
                                  "contact_number",
                                  selectedVendor.contact_number || ""
                                );
                              }
                            }}
                          >
                            <option value="">Select a Project</option>
                            {projects?.map((project) => (
                              <option key={project.id} value={project.id}>
                                {project.vendor}
                              </option>
                            ))}
                          </Field>
                        ) : (
                          <Field
                            type={item.type}
                            name={item.name}
                            placeholder={item.placeholder}
                            className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                            required
                            disabled={!isEditMode} // Disable when not in edit mode
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Table for Adding Expenses */}
              <div className="space-y-1 mt-4">
                {/* <h4 className="font-semibold">Expenses</h4> */}
                <FieldArray
                  name="tableRows"
                  render={(arrayHelpers) => (
                    <>
                      <>
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({
                                item: "",
                                particulars: "",
                                unit_price: 0,
                                quantity: 0,
                                total: 0,
                              })
                            }
                            className="btn bg-white border border-black text-black uppercase mb-4"
                            disabled={!isEditMode} // Disable when not in edit mode
                          >
                            Add Row
                          </button>
                        )}
                      </>
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
                                "Unit price",
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
                            {values.tableRows.map((row, index) => (
                              <tr key={index} className="relative">
                                <td className="p-2 ">
                                  <Field
                                    type="text"
                                    name={`tableRows[${index}].item`}
                                    className="text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                                    disabled={!isEditMode} // Disable when not in edit mode
                                  />
                                </td>
                                <td className="p-2 ">
                                  <Field
                                    type="text"
                                    name={`tableRows[${index}].description`}
                                    className="text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                                    disabled={!isEditMode} // Disable when not in edit mode
                                  />
                                </td>
                                <td className="p-2 ">
                                  <Field
                                    type="number"
                                    name={`tableRows[${index}].unit_price`}
                                    className="text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                                    disabled={!isEditMode} // Disable when not in edit mode
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      // const unit_price = e.target.value || 0;
                                      const unit_price =
                                        parseFloat(e.target.value) || 0;
                                      const quantity =
                                        values.tableRows[index].quantity || 0;
                                      const total = unit_price * quantity;

                                      setFieldValue(
                                        `tableRows[${index}].unit_price`,
                                        unit_price
                                      );
                                      setFieldValue(
                                        `tableRows[${index}].total`,
                                        total
                                      ); // for display only
                                    }}
                                  />
                                </td>
                                <td className="p-2 ">
                                  <Field
                                    type="number"
                                    name={`tableRows[${index}].quantity`}
                                    className="text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      // const quantity = e.target.value || 0;
                                      const quantity =
                                        parseFloat(e.target.value) || 0;
                                      const unit_price =
                                        values.tableRows[index].unit_price || 0;
                                      const total = unit_price * quantity;

                                      setFieldValue(
                                        `tableRows[${index}].quantity`,
                                        quantity
                                      );
                                      setFieldValue(
                                        `tableRows[${index}].total`,
                                        total
                                      ); // for display only
                                    }}
                                  />
                                </td>
                                <td className="p-2">
                                  <Field
                                    type="number"
                                    name={`tableRows[${index}].total`}
                                    readOnly
                                    className="text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white"
                                  />
                                </td>
                                {/* <td className="p-2 flex justify-center"> */}
                                {/* {isEditMode && (
                                  <div className="flex justify-center">
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      className="text-xs text-red-700 hover:cursor-pointer hover:underline uppercase"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                )} */}
                                {isEditMode && (
                                  <td className="p-2">
                                    <div className="flex justify-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                        className="text-xs text-red-700 hover:cursor-pointer hover:underline uppercase"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </td>
                                )}

                                {/* </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {/* {isEditMode && (
      <button
        type="button"
        onClick={() =>
          arrayHelpers.push({
            item: "",
            particulars: "",
            srp: "",
            quantity: "",
            total: 0,
          })
        }
        className="btn bg-white mt-2 border border-black text-black uppercase mb-4"
        disabled={!isEditMode} // Disable when not in edit mode
      >
        Add Row
      </button>
    )} */}
                        {/* <div className="flex justify-between py-2 border-t border-gray-300">
                          <div className="ml-auto flex space-x-4 w-full">
                            <div className="flex flex-col w-1/4">
                              {" "}
                              <label className="font-semibold">Discount</label>
                              <Field
                                type="number"
                                name="discount"
                                className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const discount =
                                    parseFloat(e.target.value) || 0;
                                  setFieldValue("discount", discount);
                                }}
                                disabled={!isEditMode}
                              />
                            </div>

                            <div className="flex flex-col w-1/4">
                              {" "}
                              <label className="font-semibold">VAT (%)</label>
                              <Field
                                type="number"
                                name="vat_percentage"
                                className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const vat_percentage = parseFloat(
                                    e.target.value
                                  );
                                  setFieldValue(
                                    "vat_percentage",
                                    vat_percentage
                                  );
                                }}
                                disabled={!isEditMode}
                              />
                            </div>

                            <div className="flex flex-col w-1/4">
                              {" "}
                              <label className="font-semibold">Sub Total</label>
                              <input
                                type="text"
                                name="sub_total"
                                value={PurchaseData?.sub_total}
                                readOnly
                                className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                disabled={!isEditMode}
                              />
                            </div>

                            <div className="flex flex-col w-1/4">
                              {" "}
                              <label className="font-semibold">VAT Value</label>
                              <input
                                type="number"
                                value={(() => {
                                  const vatPercentage =
                                    (values.vat_percentage || 0) / 100;
                                  return totalExpenses * vatPercentage;
                                })()}
                                readOnly
                                className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                disabled={!isEditMode}
                              />
                            </div>
                            <div className="flex flex-col w-1/4">
                              {" "}
                              <label className="font-semibold">
                                Grand Total
                              </label>
                              <input
                                type="number"
                                // value={(() => {
                                //   const discountAmount =
                                //     totalExpenses * (values.discount / 100) || 0;
                                //   const vatAmount =
                                //     totalExpenses * (values.vat / 100) || 0;
                                //   return totalExpenses - discountAmount + vatAmount;
                                // })()}
                                value={PurchaseData?.grand_total}
                                readOnly
                                className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                                disabled={!isEditMode}
                              />
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </>
                  )}
                />
              </div>
              <div className="flex justify-between py-2 border-t border-gray-300">
                <div className="ml-auto flex space-x-4 w-full">
                  <div className="flex flex-col w-1/4">
                    {" "}
                    <label className="font-semibold">Discount</label>
                    <Field
                      type="number"
                      name="discount"
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const discount = parseFloat(e.target.value) || 0;
                        setFieldValue("discount", discount);
                      }}
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="flex flex-col w-1/4">
                    {" "}
                    <label className="font-semibold">VAT (%)</label>
                    <Field
                      type="number"
                      name="vat_percentage"
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const vat_percentage = parseFloat(e.target.value);
                        setFieldValue("vat_percentage", vat_percentage);
                      }}
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="flex flex-col w-1/4">
                    {" "}
                    <label className="font-semibold">Sub Total</label>
                    <input
                      type="text"
                      name="sub_total"
                      value={PurchaseData?.sub_total}
                      readOnly
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="flex flex-col w-1/4">
                    {" "}
                    <label className="font-semibold">VAT Value</label>
                    <input
                      type="number"
                      value={(() => {
                        const vatPercentage =
                          (values.vat_percentage || 0) / 100;
                        return totalExpenses * vatPercentage;
                      })()}
                      readOnly
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="flex flex-col w-1/4">
                    {" "}
                    <label className="font-semibold">Grand Total</label>
                    <input
                      type="number"
                      // value={(() => {
                      //   const discountAmount =
                      //     totalExpenses * (values.discount / 100) || 0;
                      //   const vatAmount =
                      //     totalExpenses * (values.vat / 100) || 0;
                      //   return totalExpenses - discountAmount + vatAmount;
                      // })()}
                      value={PurchaseData?.grand_total}
                      readOnly
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="flex justify-between py-2 border-t border-gray-300">
                <div className="ml-auto flex space-x-4 w-full">
                  <div className="flex flex-col w-1/4">
                    <label className="font-semibold">Discount</label>
                    <Field
                      type="number"
                      name="discount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-dark dark:text-white"
                      onChange={(e) => {
                        const discount = parseFloat(e.target.value) || 0;
                        setFieldValue("discount", discount);
                      }}
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="font-semibold">VAT (%)</label>
                    <Field
                      type="number"
                      name="vat"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-dark dark:text-white"
                      onChange={(e) => {
                        const vat = parseFloat(e.target.value);
                        setFieldValue("vat", vat);
                      }}
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="font-semibold">Sub Total</label>
                    <input
                      type="text"
                      name="sub_total"
                      value={PurchaseData?.sub_total}
                      readOnly
                      className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="flex flex-col w-1/4">
                    <label className="font-semibold">VAT Value</label>
                    <input
                      type="number"
                      value={(() => {
                        const vatPercentage =
                          (parseFloat(values.vat) || 0) / 100;
                        return totalExpenses * vatPercentage;
                      })()}
                      readOnly
                      className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="flex flex-col w-1/4">
                    <label className="font-semibold">Grand Total</label>
                    <input
                      type="number"
                      // value={(() => {
                      //   const discountAmount =
                      //     totalExpenses * (values.discount / 100) || 0;
                      //   const vatAmount =
                      //     totalExpenses * (values.vat / 100) || 0;
                      //   return totalExpenses - discountAmount + vatAmount;
                      // })()}
                      value={PurchaseData?.grand_total}
                      readOnly
                      className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                      disabled={!isEditMode}
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
                                // value={(() => {
                                //   const discountAmount =
                                //     totalExpenses * (values.discount / 100) || 0;
                                //   const vatAmount =
                                //     totalExpenses * (values.vat / 100) || 0;
                                //   return totalExpenses - discountAmount + vatAmount;
                                // })()}
                                value={PurchaseData?.grand_total}
                                readOnly
                                className="bg-gray-200 p-2 rounded-md w-full dark:bg-gray-dark dark:border border-white"
                                disabled={!isEditMode}
                              />
                            </div> */}
                </div>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="modal-action">
                {isEditMode ? (
                  <>
                    <button type="submit" className="btn uppercase">
                      update
                    </button>
                    {/* <button
                      type="button"
                      className="btn  text-black"
                      onClick={() => setShowRegisterModal(false)}
                    >
                      Cancel
                    </button> */}
                  </>
                ) : (
                  //   <button
                  //     type="button"
                  //     className="btn bg-white border border-black text-black"
                  //     onClick={() => setShowRegisterModal(false)}
                  //   >
                  //     Cancel
                  //   </button>
                  <Link
                    className="btn text-black uppercase"
                    href="/erp-v2/purchase-order"
                  >
                    back
                  </Link>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditPurchase;
