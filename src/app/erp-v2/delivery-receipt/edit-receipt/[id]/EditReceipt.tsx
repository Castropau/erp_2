"use client";
import { fetchApprovedBy } from "@/api/delivery_receipt/fetchApproved";
import { fetchReceiptById } from "@/api/delivery_receipt/fetchReceipt";
import { fetchReleasedBy } from "@/api/delivery_receipt/fetchReleased";
import { fetchSalesmanBy } from "@/api/delivery_receipt/fetchSalesman";
import { UpdateView, updateView } from "@/api/delivery_receipt/updateDelivery";
// import { fetchDepartmentsList } from "@/api/User/fetchDepartmentList";
// import { fetchUserList } from "@/api/User/fetchUserList";
import NotFound from "@/components/Error/NotFound";
// import ServerError from "@/components/Error/ServerError";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, FieldArray } from "formik";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
// import { CiEdit } from "react-icons/ci";
// import { FaBan } from "react-icons/fa6";

const EditReceipt = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const id = pathname?.split("/").pop();

  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    data: ReceiptData,
    isLoading: Rloading,
    isError: ReceiptError,
    // error: rerror,
  } = useQuery({
    queryKey: ["deliveryId", id],
    queryFn: () => fetchReceiptById(id as string),
    enabled: !!id,
  });
  const { mutate: updateDeliveryReceipt } = useMutation({
    mutationFn: (data: UpdateView) => updateView(id as string, data),
    onSuccess: () => {
      console.log("delivery updated successfully");
      queryClient.invalidateQueries({ queryKey: ["delivery", id] });
      //   setShowRegisterModal(false); // Close the modal after successful update
    },
    onError: (error) => {
      console.error("Error updating quotation:", error);
    },
  });
  const { data: SalesmanData } = useQuery({
    queryKey: ["salesman"],
    queryFn: fetchSalesmanBy, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });
  const { data: ReleasedData } = useQuery({
    queryKey: ["released"],
    queryFn: fetchReleasedBy, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });
  const { data: ApprovedData } = useQuery({
    queryKey: ["approve"],
    queryFn: fetchApprovedBy, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  });
  // Fetch project data based on dropdown selection
  // const { data: projects } = useQuery({
  //   queryKey: ["projects"],
  //   queryFn: fetchDepartmentsList, // Assume fetchDepartmentsList is an API call to fetch departments (projects)
  // });

  // Fetch user list for 'remittedBy' dropdown
  // const { data: users } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: fetchUserList, // Assume fetchUserList is an API call to fetch users
  // });

  if (Rloading) {
    return <LoadingSpinner />;
  }
  if (ReceiptError) {
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
          href="/erp-v2/delivery-receipt"
        >
          back to delivery receipt
        </Link>
        {isEditable ? (
          <button
            onClick={() => setIsEditable(false)} // Switch to readonly mode
            className="btn  cursor-pointer uppercase"
          >
            cancel
          </button>
        ) : (
          <button
            onClick={() => setIsEditable(true)} // Switch to editable mode
            className="btn cursor-pointer uppercase"
          >
            edit
          </button>
        )}
        {/* <Link
          className="btn text-black uppercase"
          href="/erp-v2/delivery-receipt"
        >
          back
        </Link> */}
      </div>
      <Formik
        initialValues={{
          // projectName: ReceiptData?.released_by.id || "",
          date_released: ReceiptData?.date_released || "",
          created_by: ReceiptData?.created_by.full_name || "",
          // receivedBy: "",
          terms: ReceiptData?.terms || "",
          po_no: ReceiptData?.po_no || "",
          salesman: ReceiptData?.salesman?.id || "",
          approved_by: ReceiptData?.approved_by?.id || "",
          delivered_to: ReceiptData?.delivered_to || "",
          tin: ReceiptData?.tin || "",
          business_style: ReceiptData?.business_style || "",
          address: ReceiptData?.address || "",
          note: ReceiptData?.note || "",
          // items: ReceiptData?.items || [
          //   {
          //     quantity: "",
          //     description: "",
          //   },
          // ],
          items: ReceiptData?.items || [
            {
              quantity: 0,
              description: "",
              order: 1.0, // Add order field to initial item, if not present
            },
          ],
          notesRows: [{ note: "" }],
          released_by: ReceiptData?.released_by?.id || "",
          date: ReceiptData?.date || "",
        }}
        enableReinitialize={true}
        // onSubmit={(values) => {
        //   const updatedData = {
        //     ...ReceiptData,
        //     ...values,
        //     items: values.items.map((item, index) => ({
        //       ...item,
        //       no: index + 1,
        //     })),

        //     // items: values.items.map((item, index) => ({
        //     //   ...item,
        //     //   id: ReceiptData?.id || 0,
        //     //   no: index + 1,
        //     //   order:
        //     //     typeof item.order === "string"
        //     //       ? parseInt(item.order, 10)
        //     //       : item.order,
        //     // })),

        //     // id: ReceiptData?.id || "",
        //     // date: ReceiptData?.date || "",
        //     // date_released: ReceiptData?.date_released || "",
        //     // date_created: ReceiptData?.date_created || "",
        //     // // salesman: ReceiptData?.salesman || 0,
        //     // // salesman: ReceiptData?.salesman ?? {
        //     // //   id: ReceiptData?.salesman.id,
        //     // //   // username: "",
        //     // //   // full_name: "",
        //     // //   // role: "",
        //     // //   // department: "",
        //     // //   // contact_number: "",
        //     // // },
        //     // salesman: ReceiptData?.salesman.id,
        //     // // salesman: ReceiptData?.salesman ?? {
        //     // //   id: 0,
        //     // //   username: "",
        //     // //   full_name: "",
        //     // //   role: "",
        //     // //   department: "",
        //     // //   contact_number: "",
        //     // // },
        //     // // approved_by: ReceiptData?.approved_by ?? {
        //     // //   id: 0,
        //     // //   username: "",
        //     // //   full_name: "",
        //     // //   role: "",
        //     // //   department: "",
        //     // //   contact_number: "",
        //     // // },
        //     // approved_by: ReceiptData?.approved_by.id,
        //     // // released_by: ReceiptData?.released_by ?? {
        //     // //   id: ReceiptData?.released_by.id,
        //     // //   username: "",
        //     // //   full_name: "",
        //     // //   role: "",
        //     // //   department: "",
        //     // //   contact_number: "",
        //     // // },
        //     // released_by: ReceiptData?.released_by.id,
        //     // // created_by: ReceiptData?.created_by ?? {
        //     // //   id: 0,
        //     // //   username: "",
        //     // //   full_name: "",
        //     // //   role: "",
        //     // //   department: "",
        //     // //   contact_number: "",
        //     // // },
        //     // created_by: ReceiptData?.created_by.id,

        //     // delivered_to: ReceiptData?.delivered_to || "",
        //     // or_no: ReceiptData?.or_no || "",

        //     // date: "",
        //     // date_released: "",
        //     // date_created: "",
        //     // salesman: {
        //     //   id: 0,
        //     //   username: "",
        //     //   full_name: "",
        //     //   role: "",
        //     //   department: "",
        //     //   contact_number: "",
        //     // },
        //     // approved_by: {
        //     //   id: 0,
        //     //   username: "",
        //     //   full_name: "",
        //     //   role: "",
        //     //   department: "",
        //     //   contact_number: "",
        //     // },
        //     // released_by: {
        //     //   id: 0,
        //     //   username: "",
        //     //   full_name: "",
        //     //   role: "",
        //     //   department: "",
        //     //   contact_number: "",
        //     // },
        //     // created_by: {
        //     //   id: 0,
        //     //   username: "",
        //     //   full_name: "",
        //     //   role: "",
        //     //   department: "",
        //     //   contact_number: "",
        //     // },
        //     // delivered_to: "",
        //     // or_no: "",
        //   };

        //   // Call your mutation here
        //   updateDeliveryReceipt(updatedData); // <-- replace this with your mutation logic

        //   console.log("Updated data to send:", updatedData);
        //   console.log(ReceiptData?.released_by.id);
        // }}
        onSubmit={async (values, { setSubmitting }) => {
          const updatedData = {
            ...ReceiptData,
            ...values,
            items: values.items.map((item, index) => ({
              ...item,
              no: index + 1,
            })),
          };

          try {
            await updateDeliveryReceipt(updatedData); // 🛠️ Await the async call
            console.log("Updated data sent:", updatedData);

            setShowSuccess(true); // ✅ Optional success alert
            setTimeout(() => {
              setShowSuccess(false);
              window.location.href = "/erp-v2/delivery-receipt"; // 🔁 Optional redirect
            }, 2000);
          } catch (error) {
            console.error("Update failed:", error);
            // You can show an error alert here
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values }) => {
          // Array for "From" and "To" fields
          const fromFields = [
            { label: "Date Released", name: "date_released", type: "date" },
            {
              label: "Terms",
              name: "terms",
              type: "text",
              placeholder: "Enter terms",
            },
            {
              label: "PO No.",
              name: "po_no",
              type: "text",
              placeholder: "Enter PO No.",
            },
            {
              label: "Salesman",
              name: "salesman",
              type: "select",
              options:
                SalesmanData?.map((user) => ({
                  value: user.id.toString(),
                  label: user.full_name,
                })) || [],
            },
            {
              label: "Approved By",
              name: "approved_by",
              type: "select",
              // options: ["Approver 1", "Approver 2"],
              options:
                ApprovedData?.map((user) => ({
                  value: user.id.toString(),
                  label: user.full_name,
                })) || [],
            },
            {
              label: "Delivered To",
              name: "delivered_to",
              type: "text",
              placeholder: "Enter delivered to",
            },
            {
              label: "TIN",
              name: "tin",
              type: "text",
              placeholder: "Enter TIN",
            },
            {
              label: "Business Style",
              name: "business_style",
              type: "text",
              placeholder: "Enter business style",
            },
            {
              label: "Address",
              name: "address",
              type: "text",
              placeholder: "Enter address",
            },
            {
              label: "Note",
              name: "note",
              type: "text",
              placeholder: "Enter note",
            },
            {
              label: "Released By",
              name: "released_by",
              type: "select",
              options:
                ReleasedData?.map((user) => ({
                  value: user.id.toString(),
                  label: user.full_name,
                })) || [],
            },
            { label: "Date", name: "date", type: "date" },
          ];

          // const toFields = [
          // {
          //   label: "Delivered To",
          //   name: "delivered_to",
          //   type: "text",
          //   placeholder: "Enter delivered to",
          // },
          // {
          //   label: "TIN",
          //   name: "tin",
          //   type: "text",
          //   placeholder: "Enter TIN",
          // },
          // {
          //   label: "Business Style",
          //   name: "business_style",
          //   type: "text",
          //   placeholder: "Enter business style",
          // },
          // {
          //   label: "Address",
          //   name: "address",
          //   type: "text",
          //   placeholder: "Enter address",
          // },
          // {
          //   label: "Note",
          //   name: "note",
          //   type: "text",
          //   placeholder: "Enter note",
          // },
          // ];
          // const warehouseReleasedFields = [
          // {
          //   label: "Released By",
          //   name: "released_by",
          //   type: "select",
          //   options:
          //     ReleasedData?.map((user) => ({
          //       value: user.id.toString(),
          //       label: user.full_name,
          //     })) || [],
          // },
          // { label: "Date", name: "date", type: "date" },
          // ];

          return (
            <Form className="py-1">
              {/* Warehouse Released Section */}

              {/* "From" and "To" Sections with borders */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                {/* "From" Section with Border */}
                {/* <h4 className="font-bold text-lg uppercase">From</h4> */}
                {fromFields.map((field) => (
                  <div key={field.name}>
                    <label className="uppercase block mb-2 text-sm font-medium ">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <Field
                        as="select"
                        name={field.name}
                        className={`${
                          isEditable ? "" : "bg-gray-200 cursor-not-allowed"
                        } bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm`}
                        disabled={!isEditable}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    ) : (
                      <Field
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        className={`${
                          isEditable ? "" : "bg-gray-200 cursor-not-allowed"
                        } bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm`}
                        disabled={!isEditable}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Table Section */}
              <div className="my-6">
                <FieldArray name="items">
                  {({ remove, push }) => (
                    <>
                      {/* {isEditable && (
                        <div className="mb-4 flex justify-start">
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                no: values.items.length + 1,
                                quantity: "",
                                description: "",
                                order: (values.items.length + 1).toFixed(1),
                              })
                            }
                            className="bg-white text-black border border-black px-4 py-2 rounded flex items-center space-x-2 uppercase"

                          >
                            Add Item
                          </button>
                        </div>
                      )} */}
                      {isEditable && (
                        <div className="mb-2 flex justify-start">
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                no: values.items.length + 1,
                                quantity: 0,
                                description: "",
                                order: (values.items.length + 1).toFixed(1),
                              })
                            }
                            className="bg-white text-black border border-black px-4 py-2 rounded flex items-center space-x-2 uppercase"
                          >
                            Add row
                          </button>
                        </div>
                      )}
                      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <table
                          style={{ width: "100%" }}
                          className="table table-xs w-full border border-gray-200 rounded-lg shadow-lg"
                        >
                          <thead className="bg-white text-black  border-b-gray-400">
                            <tr className="text-sm font-medium text-center uppercase">
                              <th className=" px-4 py-2">No.</th>

                              <th className=" px-4 py-2">Quantity</th>
                              <th className=" px-4 py-2">Description</th>
                              {isEditable && (
                                <th className=" px-4 py-2">Action</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {values.items.map((item, index) => (
                              <tr key={index}>
                                <td className="text-xs text-center px-4 py-2">
                                  {index + 1}
                                </td>

                                <td className=" px-4 py-2">
                                  <Field
                                    type="number"
                                    name={`items[${index}].quantity`}
                                    className={`text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white ${
                                      !isEditable &&
                                      "bg-gray-100 cursor-not-allowed dark:bg-gray-dark"
                                    }`}
                                    disabled={!isEditable}
                                  />
                                </td>

                                <td className=" px-4 py-2">
                                  <Field
                                    type="text"
                                    name={`items[${index}].description`}
                                    className={`text-center text-xs w-full border border-gray-200 p-1 rounded dark:border-white dark:text-white ${
                                      !isEditable &&
                                      "bg-gray-100 cursor-not-allowed dark:bg-gray-dark"
                                    }`}
                                    disabled={!isEditable}
                                  />
                                </td>

                                {isEditable && (
                                  <td className=" flex justify-center">
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      // className="text-red-600 hover:text-red-800"
                                      className="text-xs text-red-700 hover:cursor-pointer hover:underline uppercase"
                                    >
                                      {/* <FaTrash className="inline mr-1" /> */}
                                      Remove
                                    </button>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* {isEditable && (
                        <div className="mt-4 flex justify-start">
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                no: values.items.length + 1,
                                quantity: 0,
                                description: "",
                                order: (values.items.length + 1).toFixed(1),
                              })
                            }
                            className="bg-white text-black border border-black px-4 py-2 rounded flex items-center space-x-2 uppercase"
                          >
                            Add Item
                          </button>
                        </div>
                      )} */}
                    </>
                  )}
                </FieldArray>

                {/* {isEditable && (
                              <div className="flex justify-start mt-4">
                                <button
                                  type="button"
                                  onClick={handleAddRow}
                                  className="bg-white text-black border border-black px-4 py-2 rounded flex items-center space-x-2 uppercase"
                                >
                                  <span>Add Row</span>
                                </button>
                              </div>
                            )} */}
              </div>

              {/* <div className="modal-action">
                            <button type="submit" className="btn">
                              {isEditable ? "Update" : "Submit"}{" "}
                            </button>
                            <button
                              type="button"
                              className="btn"
                              onClick={() => setShowRegisterModal(false)}
                            >
                              Cancel
                            </button>
                          </div> */}
              <div className="modal-action">
                <Link
                  className="btn text-black uppercase"
                  href="/erp-v2/delivery-receipt"
                >
                  back
                </Link>
                {/* Show Update if in edit mode, else show nothing */}
                {isEditable && (
                  <button type="submit" className="btn uppercase">
                    update
                  </button>
                )}

                {/* Show Cancel button */}
                {/* <button
                  type="button"
                  className="btn"
                  onClick={() => setShowRegisterModal(false)} // Close the modal on Cancel
                >
                  back
                </button> */}
                {/* <Link
                  className="btn text-black uppercase"
                  href="/erp-v2/delivery-receipt"
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

export default EditReceipt;
