"use client";

import React, { useEffect, useState } from "react";
// import { FaArrowLeft, FaPen, FaBan } from "react-icons/fa"; // Import edit and ban icons
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchWithdrawDataById } from "@/api/withdraw-materials/fetchWithdrawId";
import { Field, Form, Formik } from "formik";

import {
  FetchInventoriesData,
  Inventoriess,
} from "@/api/withdraw-materials/fetchInventory";
import {
  updateWithdraw,
  UpdateWithdraw,
} from "@/api/withdraw-materials/updateWithdraw";
// import { User } from "@/interfaces/User";
import { fetchUserList, User } from "@/api/User/fetchUserList";
// import NotFoundPage from "@/app/not-found";
// import { AxiosError } from "axios";
import NotFound from "@/components/Error/NotFound";

// Simulated data for the table (replace with actual data as needed)

function View() {
  // const [requestor, setRequestor] = useState("");
  // const [dateRequested, setDateRequested] = useState("");
  // const [dateNeeded, setDateNeeded] = useState("");
  // const [purpose, setPurpose] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<MaterialItems[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false); // New state to track edit mode
  const params = useParams();
  const [showSuccess, setShowSuccess] = useState(false);

  //   const id = Number(params?.id);
  const id = typeof params?.id === "string" ? Number(params.id) : undefined;
  const queryClient = useQueryClient();

  // Handle input changes
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (name === "requestor") setRequestor(value);
  //   if (name === "dateRequested") setDateRequested(value);
  //   if (name === "dateNeeded") setDateNeeded(value);
  //   if (name === "purpose") setPurpose(value);
  // };

  // Handle modal opening/closing
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  // interface UpdateWithdraw {
  //   // id: number,
  //   name_of_requestor: number;
  //   created_by: number;
  //   date_of_request: string;
  //   date_needed: string;
  //   purpose: string;
  //   material_items: Material[];
  // }

  // interface Material {
  //   // id: number,
  //   inventory_item: Inventories;
  //   quantity: number;
  // }

  // interface Inventories {
  //   id: number;
  //   item: string;
  //   quantity: number;
  //   unit_of_measurement: string;
  //   specification: string;
  //   description: string;
  //   serial: string;
  // }
  // interface NameOfReq {
  //   id: number;
  //   full_name: string;
  // }

  interface InventorySystem {
    id: number;
    item: string;
    quantity: number;
    unit_of_measurement: string;
    specification: string;
    description: string;
    // serial: string;
  }
  interface MaterialItems {
    id: number;
    inventory_item: InventorySystem;
    quantity: number;
    // status: string;
  }

  // interface FetchInventoryId {
  //   id: number;
  //   material_items: MaterialItems[];
  //   name_of_requestor: NameOfReq;
  //   date_of_request: string;
  //   date_needed: string;
  //   purpose: string;
  //   serial_no: string;
  // }
  interface SelectableInventoryRow {
    id: number;
    quantity: number;
    // status?: string;
    item: string;
    unit_of_measurement: string;
    specification: string;
    description: string;
    inventory_item: InventorySystem;
    serial?: string;
  }

  // Handle selecting a row from the modal
  const handleSelectRow = (row: SelectableInventoryRow) => {
    const exists = selectedRows.some((item) => item.id === row.id);
    if (!exists) {
      setSelectedRows((prev) => [
        ...prev,
        {
          id: row.id, // This is the correct ID for the material withdrawal row
          quantity: row.quantity,
          // status: row.status || "pending",

          inventory_item: {
            id: row.id, // Ensure we are using the correct inventory item ID
            item: row.item,
            unit_of_measurement: row.unit_of_measurement,
            specification: row.specification,
            description: row.description,
            quantity: row.quantity, // ✅ required field
            serial: row.serial || "",
          },
        },
      ]);
      toggleModal();
    }
  };

  // Handle the table search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter table data based on search term
  //   const filteredTableData = tableData.filter((row) => {
  //     const normalizedRowName = row.name.replace(/\s+/g, "").toLowerCase();
  //     const normalizedSearchTerm = searchTerm.replace(/\s+/g, "").toLowerCase();
  //     return normalizedRowName.includes(normalizedSearchTerm);
  //   });

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted with values:", {
  //     requestor,
  //     dateRequested,
  //     dateNeeded,
  //     purpose,
  //     selectedRows,
  //   });
  // };

  // Handle cancel action (reset form)
  // const handleCancel = () => {
  //   setRequestor("");
  //   setDateRequested("");
  //   setDateNeeded("");
  //   setPurpose("");
  //   setSelectedRows([]);
  // };
  const {
    data: WithdrawData,
    isLoading,
    // isError,
    error,
  } = useQuery({
    queryKey: ["withdraw", id],
    queryFn: () => fetchWithdrawDataById(id!),
    enabled: !!id,
  });
  //   const {
  //     isLoading: InventoriesL,
  //     error: Lerror,
  //     data,
  //   } = useQuery<Inventories[]>({
  //     queryKey: ["inventory"],
  //     queryFn: FetchInventoriesData,
  //   });
  const {
    // isLoading: inventoriesLoading,
    // error: inventoriesError,
    data: inventoriesData,
  } = useQuery<Inventoriess[]>({
    queryKey: ["inventory"],
    queryFn: FetchInventoriesData,
  });
  useEffect(() => {
    if (WithdrawData?.material_items) {
      // setSelectedRows(WithdrawData.material_items);
      setSelectedRows(
        WithdrawData.material_items as unknown as MaterialItems[]
      );
    }
  }, [WithdrawData]);

  const { mutate: updatedView } = useMutation({
    mutationFn: (viewData: UpdateWithdraw) =>
      updateWithdraw(id as number, viewData),
    onSuccess: () => {
      console.log("withdraw updated successfully");
      queryClient.invalidateQueries({ queryKey: ["inventory", id] });
      //   setShowRegisterModal(false); // Close the modal after successful update
    },
    onError: (error) => {
      console.error("Error updating quotation:", error);
    },
  });
  const {
    // isLoading: loading,
    // error: errors,
    data: UserList,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUserList,
  });
  // The payload sent on update expects material_items with inventory_item as an ID (number)
  // Full inventory item with details
  // interface InventoryDetail {
  //   id: number;
  //   item: string;
  //   unit_of_measurement: string;
  //   specification: string;
  //   description: string;
  //   quantity: number;
  //   serial?: string;
  // }

  // Material with full InventoryDetail object (used in fetched data/state)
  // interface MaterialFull {
  //   inventory_item: InventoryDetail;
  //   quantity: number;
  //   status?: string;
  // }

  // Material item for submission — only sending inventory_item ID
  // interface MaterialPayload {
  //   inventory_item: number; // just ID
  //   quantity: number;
  // }

  // Full update data with nested objects
  // interface UpdateWithdrawFull {
  //   name_of_requestor: number;
  //   created_by: number;
  //   date_of_request: string;
  //   date_needed: string;
  //   purpose: string;
  //   material_items: MaterialFull[];
  // }

  // Payload type for update submission (only IDs)
  // interface UpdateWithdrawPayload {
  //   name_of_requestor: number;
  //   created_by: number;
  //   date_of_request: string;
  //   date_needed: string;
  //   purpose: string;
  //   material_items: MaterialPayload[];
  // }
  // interface UpdateWithdraws {
  //   // id: number,
  //   name_of_requestor: number;
  //   created_by: number;
  //   date_of_request: string;
  //   date_needed: string;
  //   purpose: string;
  //   material_items: Material[];
  // }

  // Represents a single inventory item with full details
  // interface InventoryData {
  //   id: number;
  //   item: string;
  //   unit_of_measurement: string;
  //   specification: string;
  //   description: string;
  //   quantity: number;
  //   serial?: string;
  // }

  // Represents one material row from the UI/state (before payload)
  // interface SelectedMaterial {
  //   inventory_item: InventoryData;
  //   quantity: number;
  //   status?: string;
  // }

  // This is the shape of the material item being sent to the API
  // interface MaterialSubmission {
  //   inventory_item: number;
  //   item: string;
  //   unit_of_measurement: string;
  //   specification: string;
  //   description: string;
  //   quantity: number;
  //   serial?: string;
  // }

  // Final payload shape expected by backend (used in `onSubmit`)
  interface SubmitWithdrawPayload {
    name_of_requestor: number;
    created_by: number;
    date_of_request: string;
    date_needed: string;
    purpose: string;
    material_items: {
      inventory_item: number;
      item: string;
      unit_of_measurement: string;
      specification: string;
      description: string;
      quantity: number;
      serial?: string;
    }[];
  }

  // Formik form values (input values in the form)
  interface WithdrawFormFields {
    requestor: number;
    dateRequested: string;
    dateNeeded: string;
    purpose: string;
  }

  if (error) {
    return <NotFound />;
  }
  if (!id) return <div>Loading route params...</div>;
  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          {/* Loading Spinner */}
          <div className="w-16 h-16 border-4 border-t-4 border-gray-800 border-dashed rounded-full animate-spin"></div>

          <span className="text-lg text-gray-700">Please wait...</span>
        </div>
      </div>
    );
  }
  // if (isError) return <div>Error fetching data: {error.message}</div>;

  return (
    <>
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

      <h3 className="font-bold">Withdraw Materials</h3>
      <div className="flex justify-start gap-2">
        <Link href="/erp-v2/withdraw_materials">
          <button className="btn  text-black uppercase">
            {/* <FaArrowLeft /> */}
            back to withdaw materials
          </button>
        </Link>
        {isEditing && (
          <div className="">
            <button
              type="button"
              onClick={toggleModal}
              className="btn text-black uppercase"
            >
              Select Items
            </button>
          </div>
        )}
        {/* <button
          type="button"
          onClick={() => setIsEditing(!isEditing)} 
        >
          {isEditing ? (
            <button className="btn text-black uppercase">Cancel</button>
          ) : (
            <button className="btn text-black uppercase">edit</button>
          )}
        </button> */}
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="btn text-black uppercase"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>

        {/* {isEditing && (
          <div className="">
            <button
              type="button"
              onClick={toggleModal}
              className="btn text-black uppercase"
            >
              Select Items
            </button>
          </div>
        )} */}
      </div>
      <div className="p-6  dark:bg-gray-dark dark:text-white">
        <h2 className="text-xl font-bold mb-1">{WithdrawData?.serial_no}</h2>

        {/* Edit/Cancel Icon */}

        {/* Form Inputs */}
        {/* <Formik
          initialValues={{
            requestor: WithdrawData?.name_of_requestor.id || 0,
            dateRequested: WithdrawData?.date_of_request || "",
            dateNeeded: WithdrawData?.date_needed || "",
            purpose: WithdrawData?.purpose || "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            const payload = {
              name_of_requestor: values.requestor,
              created_by: 1,
              date_of_request: values.dateRequested,
              date_needed: values.dateNeeded,
              purpose: values.purpose,
              material_items: selectedRows.map((item: MaterialItems) => ({
                inventory_item: item.inventory_item.id,
                quantity: item.quantity,
              })),
            };

            updatedView(payload);
            console.log(payload);
            setSubmitting(false);
            setIsEditing(false);
          }}
        > */}
        <Formik<WithdrawFormFields>
          initialValues={{
            requestor: WithdrawData?.name_of_requestor.id || 0,
            dateRequested: WithdrawData?.date_of_request || "",
            dateNeeded: WithdrawData?.date_needed || "",
            purpose: WithdrawData?.purpose || "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const payload: SubmitWithdrawPayload = {
              name_of_requestor: values.requestor,
              created_by: 1,
              date_of_request: values.dateRequested,
              date_needed: values.dateNeeded,
              purpose: values.purpose,
              material_items: selectedRows.map((item) => ({
                inventory_item: item.inventory_item.id,
                item: item.inventory_item.item,
                unit_of_measurement: item.inventory_item.unit_of_measurement,
                specification: item.inventory_item.specification,
                description: item.inventory_item.description,
                quantity: item.inventory_item.quantity,
                // serial: item.inventory_item. || "",
              })),
            };

            // updatedView(payload);
            // setSubmitting(false);
            // setIsEditing(false);
            try {
              await updatedView(payload);
              setIsEditing(false);
              setShowSuccess(true); // Show the success alert

              setTimeout(() => {
                window.location.href = "/erp-v2/withdraw_materials/"; // 🔁 Redirect to dashboard
              }, 2000);
            } catch (error) {
              console.error("Submission failed:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {/* your form fields here */}

          <Form>
            <div className="grid grid-cols-2  md:grid-cols-4 mb-2 gap-2">
              {/* Name of Requestor */}
              <div className="">
                <label className="block text-sm font-medium">
                  Name of Requestor
                </label>
                <Field
                  as="select"
                  name="requestor"
                  className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  disabled={!isEditing}
                >
                  <option value="" disabled>
                    Select Requestor
                  </option>
                  {UserList?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name}
                    </option>
                  ))}
                </Field>
              </div>

              {/* Date of Request */}
              <div className="">
                <label className="block text-sm font-medium">
                  Date of Request
                </label>
                <Field
                  name="dateRequested"
                  type="date"
                  className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  readOnly={!isEditing}
                />
              </div>

              {/* Date Needed */}
              <div className="">
                <label className="block text-sm font-medium">Date Needed</label>
                <Field
                  name="dateNeeded"
                  type="date"
                  className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Purpose</label>
                <Field
                  name="purpose"
                  type="text"
                  className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* Purpose */}
            {/* <div className="mb-4">
              <label className="block text-sm font-medium">Purpose</label>
              <Field
                name="purpose"
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                readOnly={!isEditing}
              />
            </div> */}

            {/* Button to open Modal */}
            {/* {isEditing && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="btn text-black uppercase"
                >
                  Select Items
                </button>
              </div>
            )} */}

            {/* Display Selected Rows */}
            <div className="mb-4">
              <h3 className="font-bold uppercase mb-2">Selected Items:</h3>
              <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
                <table className="table table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
                  <thead className="bg-white text-black  border-b-gray-400">
                    <tr className="text-sm font-medium text-center uppercase">
                      <th className=" px-4 py-2 ">ID</th>
                      <th className=" px-4 py-2 ">Name</th>
                      <th className=" px-4 py-2 ">Quantity</th>
                      <th className=" px-4 py-2 ">Unit</th>
                      <th className=" px-4 py-2 ">Specification</th>
                      <th className=" px-4 py-2 ">Description</th>
                      {isEditing && <th className=" px-4 py-2 ">Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRows.map((item, index) => (
                      <tr key={index}>
                        <td className=" text-xs text-center">
                          {item.inventory_item.id}
                        </td>
                        <td className=" text-xs text-center">
                          {item.inventory_item.item}
                        </td>
                        <td className=" text-xs text-center">
                          {item.quantity}
                        </td>
                        <td className=" text-xs text-center">
                          {item.inventory_item.unit_of_measurement}
                        </td>
                        <td className=" text-xs text-center">
                          {item.inventory_item.specification}
                        </td>
                        <td className=" text-xs text-center">
                          {item.inventory_item.description}
                        </td>
                        {isEditing && (
                          <td className="text-xs flex gap-2 justify-center">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedRows((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }
                              className="hover:underline hover:cursor-pointer flex justify-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
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
            </div>

            {/* Submit & Cancel */}
            {isEditing && (
              <div className="flex justify-end gap-4">
                {/* <button type="submit" className="btn uppercase text-black">
                  Update
                </button> */}
                <Link
                  className="btn uppercase text-black"
                  href="/erp-v2/withdraw_materials"
                >
                  back
                </Link>
                {/* <button type="submit" className="btn uppercase text-black">
                  Update
                </button> */}
                <button type="submit" className="btn uppercase text-black">
                  update
                </button>
              </div>
            )}
          </Form>
        </Formik>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-2/4">
              <h3 className="text-lg font-semibold mb-4 uppercase">
                Select Items
              </h3>

              {/* Search input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table
                  style={{ width: "100%" }}
                  className="table table-xs w-full border border-gray-200 rounded-lg shadow-lg"
                >
                  <thead className="bg-white text-black  border-b-gray-400">
                    <tr className="text-sm font-medium text-center uppercase">
                      <th className=" px-4 py-2">ID</th>
                      <th className=" px-4 py-2">Name</th>
                      <th className=" px-4 py-2">Quantity</th>
                      <th className=" px-4 py-2">Unit</th>
                      <th className=" px-4 py-2">Specification</th>
                      <th className=" px-4 py-2">Description</th>
                      <th className=" px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoriesData?.map((row) => (
                      <tr key={row.id}>
                        <td className="text-xs text-center">{row.id}</td>
                        <td className="text-xs text-center">{row.item}</td>
                        <td className="text-xs text-center">{row.quantity}</td>
                        <td className="text-xs text-center">
                          {row.unit_of_measurement}
                        </td>
                        <td className="text-xs text-center">
                          {row.specification}
                        </td>
                        <td className="text-xs text-center">
                          {row.description}
                        </td>
                        <td className="text-xs text-center">
                          {/* <button
                            type="button"
                            onClick={() => handleSelectRow(row)}
                            disabled={selectedRows.some(
                              (selected) => selected.id === row.id
                            )}
                            className={`${
                              selectedRows.some(
                                (selected) => selected.id === row.id
                              )
                                ? "bg-gray-300 cursor-not-allowed"
                                : "hover:underline hover:cursor-pointer text-black"
                            } text-blue-500 uppercase py-1 px-2 rounded-md`}
                          >
                            Select
                          </button> */}
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectRow({
                                ...row,
                                inventory_item: {
                                  id: row.id,
                                  item: row.item,
                                  unit_of_measurement: row.unit_of_measurement,
                                  specification: row.specification,
                                  description: row.description,
                                  quantity: row.quantity, // or whatever the correct field is
                                },
                              })
                            }
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Close Modal */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={toggleModal}
                  className="btn  uppercase text-black"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default View;
