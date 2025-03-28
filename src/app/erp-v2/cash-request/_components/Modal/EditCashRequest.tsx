"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCirclePlus } from "react-icons/fa6";
import { Formik, Field, Form, FieldArray } from "formik";
import { registerUser } from "@/api/User/registerUser";
import { RegisterEmployee } from "@/interfaces/RegisterEmployee";
import { fetchUserLists } from "@/api/cash-request/fetchUsers";
import {
  fetchCashRequestId,
  RequisitionCashId,
} from "@/api/cash-request/fetchCashRequestId";
import { CashUnits } from "@/api/cash-request/fetchUnit";
import { updateCashId } from "@/api/cash-request/updateCashRequestId";
import { ChequeItems, Items } from "@/api/cheque-request/fetchItems";

interface CashId {
  id: number;
}

export default function EditCashRequest(props: CashId) {
  const { id } = props;
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updatedUserCash } = useMutation({
    mutationFn: (data: RequisitionCashId) => updateCashId(data!.id, data),
    onSuccess: () => {
      console.log("cash updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cashid", id] });
      queryClient.invalidateQueries({ queryKey: ["cash"] });
      setShowRegisterModal(false); // Close the modal after success
    },
    onError: (error: Error) => {
      console.error("Error updating cash request:", error);
    },
  });

  // units fetcj

  const {
    isLoading: CULoading,
    error: CUerror,
    data: unitsList,
  } = useQuery<CashUnits[]>({
    queryKey: ["units"],
    queryFn: CashUnits,
  });

  // fetch items
  const {
    isLoading: ItemLoading,
    error: Itemerror,
    data: ItemList,
  } = useQuery<Items[]>({
    queryKey: ["items"],
    queryFn: ChequeItems,
  });

  // users fetch
  const {
    data: cashRequestData,
    isLoading: isCashLoading,
    error: cashRequestError,
    isPending,
  } = useQuery({
    queryKey: ["cash", id],
    queryFn: () => fetchCashRequestId(id), // Fetching cash data
    enabled: !!id, // Only fetch when ID is available
  });

  const {
    isLoading: DisLoading,
    error: Derror,
    data: usersList,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserLists,
  });

  const handleSubmit = (values: any) => {
    updatedUserCash(values); // Submit the form data when submitted
    console.log(values);
  };
  if (isPending) return <div className="div">loading..</div>;

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn btn-info"
          onClick={() => setShowRegisterModal(true)}
        >
          <FaCirclePlus className="w-6 h-5 btn-info" />
          View
        </button>
      </div>

      {showRegisterModal && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-7xl">
            <h3 className="font-bold text-lg">Detail</h3>

            <Formik
              initialValues={{
                id: cashRequestData?.id || 0,
                // noted_by: cashRequestData?.noted_by || {
                //   id: 2,
                //   username: "",
                //   full_name: "",
                //   role: "",
                //   department: "",
                //   contact_number: "",
                // },
                date_noted: cashRequestData?.date_noted || null,
                // approved_by: cashRequestData?.approved_by || {
                //   id: 2,
                //   username: "",
                //   full_name: "",
                //   role: "",
                //   department: "",
                //   contact_number: "",
                // },
                date_approved: cashRequestData?.date_approved || null,
                requested_by: cashRequestData?.requested_by?.id || "",
                date_requested: cashRequestData?.date_requested || "",
                created_by: cashRequestData?.created_by || "",
                date_created: cashRequestData?.date_created || "",
                date_cancelled: cashRequestData?.date_cancelled || "",
                cancelled_by: cashRequestData?.cancelled_by || {
                  username: "",
                  full_name: "",
                  role: "",
                  department: "",
                  contact_number: "",
                },
                cash_requisition_items:
                  cashRequestData?.cash_requisition_items || [
                    {
                      total_price: "",
                      item: "",
                      supplier: "",
                      unit_of_measurement: "",
                      quantity: 0,
                      unit_price: 0,
                      description: "",
                      discount: "",
                      vat_percentage: "",
                      less_ewt: "",
                      total: "",
                      vat_value: "",
                      ewt_value: "",
                      grand_total: "",
                    },
                  ],
                cheque_request_ref: cashRequestData?.cheque_request_ref || "",
                serial_no: cashRequestData?.serial_no || "",
                sub_total: cashRequestData?.sub_total || "",
                total: cashRequestData?.total || "",
                vat_value: cashRequestData?.vat_value || "",
                ewt_value: cashRequestData?.ewt_value || "",
                grand_total: cashRequestData?.grand_total || "",
                special_instructions:
                  cashRequestData?.special_instructions || "",
                project_name: cashRequestData?.project_name || "",
                delivery_address: cashRequestData?.delivery_address || "",
                status: cashRequestData?.status || "",
                discount: cashRequestData?.discount || 0,
                vat_percentage: cashRequestData?.vat_percentage || 0,
                less_ewt: cashRequestData?.less_ewt || 0,
              }}
              enableReinitialize={true}
              onSubmit={handleSubmit} // Submit data on form submission
            >
              {({ values, setFieldValue }) => (
                <Form className="py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Heading for Special Information */}
                    {[
                      {
                        type: "heading",
                        level: 2,
                        text: "Special Information",
                      },
                    ].map((item) => (
                      <div
                        key="special-info-heading"
                        className="col-span-2 mb-4"
                      >
                        {item.type === "heading" && item.level === 2 && (
                          <h2 className="font-bold text-lg">{item.text}</h2>
                        )}
                      </div>
                    ))}

                    {/* Form Fields */}
                    {[
                      {
                        type: "textarea",
                        name: "special_instructions",
                        placeholder: "Enter special instructions",
                        label: "Special Instructions",
                        value: values.special_instructions,
                      },
                      {
                        type: "text",
                        name: "project_name",
                        placeholder: "Enter project name",
                        label: "Project Name",
                        value: values.project_name,
                      },
                      {
                        type: "text",
                        name: "delivery_address",
                        placeholder: "Enter delivery address",
                        label: "Delivery Address",
                        value: values.delivery_address,
                      },
                      {
                        type: "select",
                        name: "requested_by",
                        label: "Requested By",
                        options:
                          usersList?.map((user) => ({
                            value: user.id.toString(),
                            label: user.full_name,
                          })) || [],
                      },

                      {
                        type: "date",
                        name: "date_requested",
                        placeholder: "Select date",
                        label: "Date Requested",
                        value: values.date_requested,
                      },
                    ].map((item) => (
                      <div key={item.name} className="mb-4 col-span-2">
                        <label
                          htmlFor={item.name}
                          className="block text-sm font-medium text-gray-700"
                        >
                          {item.label}
                        </label>
                        {item.type === "text" ||
                        item.type === "date" ||
                        item.type === "textarea" ? (
                          <Field
                            as={item.type === "textarea" ? "textarea" : "input"}
                            type={item.type === "textarea" ? null : item.type}
                            id={item.name}
                            name={item.name}
                            value={item.value}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder={item.placeholder}
                          />
                        ) : item.type === "select" ? (
                          <Field
                            as="select"
                            id={item.name}
                            name={item.name}
                            value={values.requested_by}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            onChange={(e: any) =>
                              setFieldValue(item.name, e.target.value)
                            }
                          >
                            <option value=""></option>
                            {item.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        ) : null}
                      </div>
                    ))}

                    {/* Dynamic Items Table */}
                    <div>
                      {[{ type: "heading", level: 2, text: "Items" }].map(
                        (item) => (
                          <div key="items-heading" className="col-span-2 mb-4">
                            {item.type === "heading" && item.level === 2 && (
                              <h2 className="font-bold text-lg">{item.text}</h2>
                            )}
                          </div>
                        )
                      )}
                      <FieldArray name="cash_requisition_items">
                        {({ insert, remove, push }) => (
                          <div>
                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  item: "", // Dropdown for users
                                  quantity: "",
                                  unit: "",
                                  description: "",
                                  supplier: "",
                                  unit_price: "",
                                  total: 0,
                                  discount: 0,
                                  vat_percentage: 0,
                                  less_ewt: 0,
                                  vat_value: 0,
                                  ewt_value: 0,
                                  grand_total: 0,
                                })
                              }
                              className="btn btn-info mt-4"
                            >
                              Add Item
                            </button>

                            {/* Table to display items */}
                            <table
                              className="w-full table-auto border-collapse text-sm"
                              style={{ width: "200%" }}
                            >
                              <thead>
                                <tr>
                                  <th className="border p-2">Item</th>
                                  <th className="border p-2">Quantity</th>
                                  <th className="border p-2">Unit</th>
                                  <th className="border p-2">Description</th>
                                  <th className="border p-2">Supplier</th>
                                  <th className="border p-2">Unit Price</th>
                                  <th className="border p-2">Total</th>
                                  <th className="border p-2">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* Render each row of items */}
                                {values.cash_requisition_items.map(
                                  (item, index) => (
                                    <tr key={index}>
                                      <td className="border p-2">
                                        {DisLoading ? (
                                          <div>Loading users...</div>
                                        ) : Derror ? (
                                          <div>Error loading users</div>
                                        ) : (
                                          <div>
                                            <input
                                              type="text"
                                              name={`cash_requisition_items[${index}].item`}
                                              list={`ItemList-${index}`}
                                              className="w-full p-2 border"
                                              placeholder="Search or type user"
                                              value={item.item}
                                              onChange={(e) =>
                                                setFieldValue(
                                                  `cash_requisition_items[${index}].item`,
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <datalist id={`ItemList-${index}`}>
                                              {ItemList?.map((user) => (
                                                <option
                                                  key={user.id}
                                                  value={user.item}
                                                />
                                              ))}
                                            </datalist>
                                          </div>
                                        )}
                                      </td>
                                      <td className="border p-2">
                                        <Field
                                          type="number"
                                          name={`cash_requisition_items[${index}].quantity`}
                                          className="w-full p-2 border"
                                          placeholder="Quantity"
                                          onChange={(e) =>
                                            setFieldValue(
                                              `cash_requisition_items[${index}].quantity`,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td className="border p-2">
                                        <Field
                                          as="select"
                                          name={`cash_requisition_items[${index}].unit`}
                                          className="w-full p-2 border"
                                        >
                                          <option value="">Select unit</option>
                                          {CULoading ? (
                                            <option value="">Loading...</option>
                                          ) : CUerror ? (
                                            <option value="">
                                              Error loading units
                                            </option>
                                          ) : (
                                            unitsList?.map((unit, idx) => (
                                              <option
                                                key={unit.id}
                                                name="unit_of_measurement"
                                                value={unit.unit_of_measurement}
                                                selected={
                                                  unit.unit_of_measurement ===
                                                  values.cash_requisition_items[
                                                    index
                                                  ].unit_of_measurement
                                                }
                                              >
                                                {unit.unit_of_measurement}
                                              </option>
                                            ))
                                          )}
                                        </Field>
                                      </td>

                                      <td className="border p-2">
                                        <Field
                                          type="text"
                                          name={`cash_requisition_items[${index}].description`}
                                          className="w-full p-2 border"
                                          placeholder="Description"
                                        />
                                      </td>
                                      <td className="border p-2">
                                        {DisLoading ? (
                                          <div>Loading users...</div>
                                        ) : Derror ? (
                                          <div>Error loading users</div>
                                        ) : (
                                          <div>
                                            <input
                                              type="text"
                                              name={`cash_requisition_items[${index}].supplier`}
                                              list={`usersList-${index}`}
                                              className="w-full p-2 border"
                                              placeholder="Search or type user"
                                              value={item.supplier}
                                              onChange={(e) =>
                                                setFieldValue(
                                                  `cash_requisition_items[${index}].supplier`,
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <datalist id={`usersList-${index}`}>
                                              {usersList?.map((user) => (
                                                <option
                                                  key={user.id}
                                                  value={user.full_name}
                                                />
                                              ))}
                                            </datalist>
                                          </div>
                                        )}
                                      </td>
                                      <td className="border p-2">
                                        <Field
                                          type="number"
                                          name={`cash_requisition_items[${index}].unit_price`}
                                          className="w-full p-2 border"
                                          placeholder="Unit Price"
                                          onChange={(e) =>
                                            setFieldValue(
                                              `cash_requisition_items[${index}].unit_price`,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td className="border p-2">
                                        <Field
                                          type="number"
                                          name={`cash_requisition_items[${index}].total`}
                                          className="w-full p-2 border"
                                          placeholder="Total"
                                          disabled
                                          value={
                                            item.quantity * item.unit_price || 0
                                          } // Calculate total
                                        />
                                      </td>
                                      <td className="border p-2">
                                        <button
                                          type="button"
                                          onClick={() => remove(index)}
                                          className="btn btn-error"
                                        >
                                          Remove
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>

                            {/* Discount, VAT %, and Less EWT input fields */}
                            <div className="mt-4 grid grid-cols-3 gap-4">
                              <div>
                                <strong>Discount:</strong>
                                <Field
                                  type="number"
                                  name="discount"
                                  className="w-full p-2 border"
                                  placeholder="Discount"
                                  onChange={(e) =>
                                    setFieldValue("discount", e.target.value)
                                  }
                                />
                              </div>

                              <div>
                                <strong>VAT %:</strong>
                                <Field
                                  type="number"
                                  name="vat_percentage"
                                  className="w-full p-2 border"
                                  placeholder="VAT %"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "vat_percentage",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              <div>
                                <strong>Less EWT %:</strong>
                                <Field
                                  type="number"
                                  name="less_ewt"
                                  className="w-full p-2 border"
                                  placeholder="EWT %"
                                  onChange={(e) =>
                                    setFieldValue("less_ewt", e.target.value)
                                  }
                                />
                              </div>
                            </div>

                            {/* Display Total Information */}
                            <div className="mt-4 grid grid-cols-3 gap-4">
                              <div>
                                <strong>Discount:</strong>
                                <div className="w-full p-2 border">
                                  {/* ₱
                                  {values.cash_requisition_items
                                    .reduce(
                                      (acc, item) =>
                                        acc +
                                        (item.quantity * item.unit_price || 0),
                                      0
                                    )
                                    .toFixed(2)} */}
                                  ₱
                                  {values.discount
                                    ? parseFloat(values.discount).toFixed(2)
                                    : "0.00"}
                                </div>
                              </div>

                              {/* <div>
                                <strong>VAT %:</strong>
                                <div className="w-full p-2 border">
                                  {values.cash_requisition_items
                                    .reduce(
                                      (acc, item) =>
                                        acc +
                                        (parseFloat(
                                          item.vat_percentage || "0"
                                        ) /
                                          100) *
                                          (item.quantity * item.unit_price ||
                                            0),
                                      0
                                    )
                                    .toFixed(2)}{" "}
                                  ₱
                                </div>
                              </div> */}
                              <div>
                                <strong>VAT %:</strong>
                                <div className="w-full p-2 border">
                                  ₱
                                  {(() => {
                                    // Calculate the total before discount
                                    const totalBeforeDiscount =
                                      values.cash_requisition_items.reduce(
                                        (acc, item) =>
                                          acc +
                                          (item.quantity * item.unit_price ||
                                            0),
                                        0
                                      );

                                    // Subtract the discount from the total
                                    const discountAmount = parseFloat(
                                      values.discount || "0"
                                    );
                                    const discountedTotal =
                                      totalBeforeDiscount - discountAmount;

                                    // Apply VAT from the input field to the discounted total
                                    const vatPercentage = parseFloat(
                                      values.vat_percentage || "0"
                                    );
                                    const vatAmount =
                                      (vatPercentage / 100) * discountedTotal;

                                    return vatAmount.toFixed(2); // Display VAT amount
                                  })()}{" "}
                                </div>
                              </div>

                              <div>
                                <strong>Less EWT %:</strong>
                                <div className="w-full p-2 border">
                                  {/* {values.cash_requisition_items
                                    .reduce(
                                      (acc, item) =>
                                        acc +
                                        (parseFloat(
                                          item.less_ewt || "0"
                                        ) /
                                          100) *
                                          (item.quantity * item.unit_price ||
                                            0),
                                      0
                                    )
                                    .toFixed(2)}{" "}
                                  ₱ */}
                                  ₱
                                  {(() => {
                                    // Calculate the total before discount
                                    const totalBeforeDiscount =
                                      values.cash_requisition_items.reduce(
                                        (acc, item) =>
                                          acc +
                                          (item.quantity * item.unit_price ||
                                            0),
                                        0
                                      );

                                    // Subtract the discount from the total
                                    const discountAmount = parseFloat(
                                      values.discount || "0"
                                    );
                                    const discountedTotal =
                                      totalBeforeDiscount - discountAmount;

                                    // Apply EWT from the input field to the discounted total
                                    const ewtPercentage = parseFloat(
                                      values.less_ewt || "0"
                                    );
                                    const ewtAmount =
                                      (ewtPercentage / 100) * discountedTotal;

                                    return ewtAmount.toFixed(2); // Display EWT amount
                                  })()}{" "}
                                </div>
                              </div>

                              <div>
                                <strong>Total:</strong>
                                <div className="w-full p-2 border">
                                  ₱
                                  {values.cash_requisition_items
                                    .reduce(
                                      (acc, item) =>
                                        acc +
                                        (item.quantity * item.unit_price || 0),
                                      0
                                    )
                                    .toFixed(2)}
                                </div>
                              </div>

                              <div>
                                <strong>Grand Total:</strong>
                                <div className="w-full p-2 border">
                                  {/* ₱
                                  {(() => {
                                    
                                    const totalBeforeDiscount =
                                      values.cash_requisition_items.reduce(
                                        (acc, item) =>
                                          acc +
                                          (item.quantity * item.unit_price ||
                                            0),
                                        0
                                      );

                                   
                                    const discountAmount = parseFloat(
                                      values.discount || "0"
                                    );

                                    const discountedTotal =
                                      totalBeforeDiscount - discountAmount;

                                   
                                    const vatAmount =
                                      values.cash_requisition_items.reduce(
                                        (acc, item) =>
                                          acc +
                                          (parseFloat(
                                            item.vat_percentage || "0"
                                          ) /
                                            100) *
                                            (item.quantity * item.unit_price ||
                                              0),
                                        0
                                      );

                                    const ewtAmount =
                                      values.cash_requisition_items.reduce(
                                        (acc, item) =>
                                          acc +
                                          (parseFloat(
                                            item.less_ewt || "0"
                                          ) /
                                            100) *
                                            (item.quantity * item.unit_price ||
                                              0),
                                        0
                                      );

                                  
                                    return (
                                      discountedTotal +
                                      vatAmount -
                                      ewtAmount
                                    ).toFixed(2);
                                  })()} */}
                                  {/* ₱
                                  {(() => {
                                   
                                    const totalBeforeDiscount =
                                      values.cash_requisition_items.reduce(
                                        (acc, item) =>
                                          acc +
                                          (item.quantity * item.unit_price ||
                                            0),
                                        0
                                      );

                                  
                                    const discountAmount = parseFloat(
                                      values.discount || "0"
                                    );
                                    const discountedTotal =
                                      totalBeforeDiscount - discountAmount;

                                    
                                    const vatPercentage = parseFloat(
                                      values.vat_percentage || "0"
                                    );
                                    const vatAmount =
                                      (vatPercentage / 100) * discountedTotal;

                                    
                                    const ewtAmount =
                                      values.cash_requisition_items.reduce(
                                        (acc, item) =>
                                          acc +
                                          (parseFloat(
                                            item.less_ewt || "0"
                                          ) /
                                            100) *
                                            (item.quantity * item.unit_price ||
                                              0),
                                        0
                                      );

                                   
                                    return (
                                      discountedTotal +
                                      vatAmount -
                                      ewtAmount
                                    ).toFixed(2);
                                  })()} */}
                                  ₱
                                  {(() => {
                                    // calculate the total before discount
                                    const totalBeforeDiscount =
                                      values.cash_requisition_items.reduce(
                                        (acc, item) =>
                                          acc +
                                          (item.quantity * item.unit_price ||
                                            0),
                                        0
                                      );

                                    // subtract the discount from the total
                                    const discountAmount = parseFloat(
                                      values.discount || "0"
                                    );
                                    const discountedTotal =
                                      totalBeforeDiscount - discountAmount;

                                    // vat from the input field to the discounted total
                                    const vatPercentage = parseFloat(
                                      values.vat_percentage || "0"
                                    );
                                    const vatAmount =
                                      (vatPercentage / 100) * discountedTotal;

                                    // apply ewt from the input field to the discounted total
                                    const ewtPercentage = parseFloat(
                                      values.less_ewt || "0"
                                    );
                                    const ewtAmount =
                                      (ewtPercentage / 100) * discountedTotal;

                                    // grand Total after discount, VAT, and EWT
                                    const grandTotal =
                                      discountedTotal + vatAmount - ewtAmount;

                                    return grandTotal.toFixed(2); // Display Grand Total
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>

                  <div className="modal-action">
                    <button type="submit" className="btn">
                      Submit
                    </button>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setShowRegisterModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </dialog>
      )}
    </>
  );
}
