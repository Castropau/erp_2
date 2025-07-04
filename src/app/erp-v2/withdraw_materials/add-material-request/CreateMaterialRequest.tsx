import React, { useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  registerUser,
  // RegisterWithdraw2,
} from "@/api/withdraw-materials/addWithdraw";
import {
  fetchWithdrawList,
  Withdraw,
} from "@/api/withdraw-materials/fetchWithdraw";
import { FetchInventoriesData } from "@/api/withdraw-materials/fetchInventory";
import { Inventories } from "@/api/inventory/Inventory";
// import { User } from "@/interfaces/User";
import { fetchUserList, User } from "@/api/User/fetchUserList";

function CreateMaterialRequest() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const {
    // data: WithdrawData,
    isLoading: withdrawLoading,
    error: withdrawError,
  } = useQuery<Withdraw[]>({
    queryKey: ["withdraw"],
    queryFn: fetchWithdrawList,
  });
  const {
    // isLoading: inventoriesLoading,
    // error: inventoriesError,
    data: inventoriesData,
  } = useQuery<Inventories[]>({
    queryKey: ["inventory"],
    queryFn: FetchInventoriesData,
  });
  const {
    // isLoading: loading,
    // error: errors,
    data: UserList,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUserList,
  });

  const {
    mutate: registerWithdraw,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (data: RegisterWithdraw) => registerUser(data),
    onSuccess: () => {
      console.log("Registered successfully");
      queryClient.invalidateQueries({ queryKey: ["withdraw"] });
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
  interface Items {
    description: string;
    specification: string;
    unit_of_measurement: string;
    item: string;
    id: number | string;
    inventory_item?: string | number;
    quantity: number;
  }
  interface RegisterWithdraw {
    name_of_requestor: string;
    material_items: {
      inventory_item: string;
      quantity: number;
    }[];
    date_of_request: string;
    date_needed: string;
    purpose: string;
  }

  interface RegisterWithdraws {
    name_of_requestor: string;
    date_of_request: string;
    date_needed: string;
    purpose: string;
    material_items: Items[];
    created_by: number;
  }

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
          <span>submitted successfully!</span>
        </div>
      )}
      <h3 className="font-bold">Withdraw Materials</h3>
      <div className="flex justify-start gap-2 mb-2">
        <Link href="/erp-v2/withdraw_materials">
          <button className="btn uppercase text-black ">
            {/* <FaArrowLeft /> */}
            back to withdraw materials
          </button>
        </Link>
        <div className="mb-2">
          <button
            type="button"
            onClick={toggleModal}
            className="btn uppercase text-black "
          >
            Select Items
          </button>
        </div>
      </div>
      <div className="p-6  dark:bg-gray-dark dark:text-white">
        <h2 className="text-xl font-bold mb-1">Create Material Request</h2>

        <Formik<RegisterWithdraws>
          initialValues={{
            name_of_requestor: "",
            date_of_request: "",
            date_needed: "",
            purpose: "",
            material_items: [],
            created_by: 1,
          }}
          // onSubmit={async (values, { resetForm, setSubmitting }) => {
          //   registerWithdraw({
          //     ...values,
          //     material_items: values.material_items.map((item) => ({
          //       inventory_item: String(item.id),
          //       quantity: item.quantity,
          //     })),
          //   });
          //   resetForm();
          // }}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            try {
              await registerWithdraw({
                ...values,
                material_items: values.material_items.map((item) => ({
                  inventory_item: String(item.id),
                  quantity: item.quantity,
                })),
              });

              resetForm();
              setShowSuccess(true); // ✅ Show success alert

              setTimeout(() => {
                window.location.href = "/erp-v2/withdraw_materials/"; // ✅ Redirect after 2 seconds
              }, 2000);
            } catch (error) {
              console.error("Submission failed:", error); // ✅ Handle error
            } finally {
              setSubmitting(false); // ✅ Always stop submitting state
            }
          }}
        >
          {({ values, setFieldValue }) => {
            const handleSelectRow = (row: Items) => {
              if (!values.material_items.some((item) => item.id === row.id)) {
                setFieldValue("material_items", [
                  ...values.material_items,
                  row,
                ]);
                toggleModal();
              }
            };

            return (
              <Form>
                <div className="grid grid-cols-2  md:grid-cols-4 mb-2 gap-2">
                  <div className="">
                    <label className="block text-sm font-bold ">
                      Name of Requestor
                    </label>
                    <Field
                      as="select"
                      name="name_of_requestor"
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
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

                  <div className="">
                    <label className="block text-sm font-bold ">
                      Date of Request
                    </label>
                    <Field
                      type="date"
                      name="date_of_request"
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    />
                  </div>

                  <div className="">
                    <label className="block text-sm font-bold ">
                      Date Needed
                    </label>
                    <Field
                      type="date"
                      name="date_needed"
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-bold ">Purpose</label>
                    <Field
                      type="text"
                      name="purpose"
                      className="bg-gray-50  dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                    />
                  </div>
                </div>

                {/* <div className="mb-2">
                  <label className="block text-sm font-bold ">Purpose</label>
                  <Field
                    type="text"
                    name="purpose"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div> */}

                {/* <div className="mb-2">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className=" bg-white uppercase border border-blue-800 text-blue-800 py-2 rounded-md pr-3 pl-4"
                  >
                    Select Items
                  </button>
                </div> */}

                <div className="mb-2">
                  <h3 className="font-bold uppercase">Selected Items:</h3>
                  <div className="overflow-auto rounded-lg shadow-sm border border-gray-200 dark:bg-gray-dark">
                    <table className="table table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg">
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
                        {values.material_items.map((row, index) => (
                          <tr key={index}>
                            <td className=" text-xs text-center">{row.id}</td>
                            <td className=" text-xs text-center">{row.item}</td>
                            <td className=" text-xs text-center">
                              {row.quantity}
                            </td>
                            <td className=" text-xs text-center">
                              {row.unit_of_measurement}
                            </td>
                            <td className=" text-xs text-center">
                              {row.specification}
                            </td>
                            <td className=" text-xs text-center">
                              {row.description}
                            </td>
                            <td className="text-xs flex gap-2 justify-center">
                              <button
                                type="button"
                                onClick={() =>
                                  setFieldValue(
                                    "material_items",
                                    values.material_items.filter(
                                      (_, i) => i !== index
                                    )
                                  )
                                }
                                className="hover:underline hover:cursor-pointer flex justify-center gap-1   text-red-700 px-3 py-1.5  text-xs  transition duration-200 uppercase"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  {/* <button type="submit" className="btn uppercase text-black">
                    Submit
                  </button> */}
                  <Link
                    className="btn uppercase text-black"
                    href="/erp-v2/withdraw_materials"
                  >
                    back
                  </Link>
                  {/* <button type="submit" className="btn uppercase text-black">
                    Submit
                  </button> */}
                  <button type="submit" className="btn uppercase text-black">
                    Submit
                  </button>
                </div>

                {/* Modal */}
                {showModal && (
                  <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm ">
                    <div className="bg-white p-6 rounded-lg w-2/4 shadow-lg dark:bg-gray-dark">
                      <h3 className="text-lg font-semibold mb-4">
                        Select Items1
                      </h3>

                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="p-2 border border-gray-300 rounded w-full mb-4"
                      />

                      {withdrawLoading ? (
                        <p>Loading...</p>
                      ) : withdrawError ? (
                        <p className="text-red-500">{withdrawError.message}</p>
                      ) : (
                        <div className="max-h-[400px] overflow-y-auto">
                          <table className="table table-xs table-zebra min-w-full border-collapse table-auto">
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
                              {inventoriesData
                                ?.filter((row) =>
                                  row.item
                                    ?.replace(/\s+/g, "")
                                    .toLowerCase()
                                    .includes(
                                      searchTerm
                                        .replace(/\s+/g, "")
                                        .toLowerCase()
                                    )
                                )
                                .map((row) => (
                                  <tr key={row.id}>
                                    <td className=" text-xs text-center">
                                      {row.id}
                                    </td>
                                    <td className=" text-xs text-center">
                                      {row.item}
                                    </td>
                                    <td className=" text-xs text-center">
                                      {row.quantity}
                                    </td>
                                    <td className=" text-xs text-center">
                                      {row.unit_of_measurement}
                                    </td>
                                    <td className=" text-xs text-center">
                                      {row.specification}
                                    </td>
                                    <td className=" text-xs text-center">
                                      {row.description}
                                    </td>
                                    <td className=" text-xs text-center">
                                      <button
                                        type="button"
                                        onClick={() => handleSelectRow(row)}
                                        disabled={values.material_items.some(
                                          (selected) => selected.id === row.id
                                        )}
                                        className={`${
                                          values.material_items.some(
                                            (selected) => selected.id === row.id
                                          )
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "hover:underline hover:cursor-pointer text-black"
                                        } text-blue-500 uppercase py-1 px-2 rounded-md`}
                                      >
                                        Select
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      )}

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
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default CreateMaterialRequest;
