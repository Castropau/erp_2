"use client";
import {
  AddRequisitionCash,
  registerCashRequest,
} from "@/api/cash-request/addCashRequest";
import { Supplier } from "@/api/cash-request/fetchSupplier";
import { CashUnits } from "@/api/cash-request/fetchUnit";
import { fetchUserLists } from "@/api/cash-request/fetchUsers";
import { ChequeItems, Items } from "@/api/cheque-request/fetchItems";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import React from "react";

const AddCashReq = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: DisLoading,
    error: Derror,
    data: usersList,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserLists,
  });

  //   const unitsList = ["kg", "unit", "box", "liter", "meter"];
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
    // isLoading: ItemLoading,
    // error: Itemerror,
    data: ItemList,
  } = useQuery<Items[]>({
    queryKey: ["items"],
    queryFn: ChequeItems,
  });

  const {
    // isLoading: SupplierLoading,
    // error: Supplierrrror,
    data: SupplierList,
  } = useQuery<Supplier[]>({
    queryKey: ["supplier"],
    queryFn: Supplier,
  });
  const { mutate: registerRequest } = useMutation({
    mutationFn: (data: AddRequisitionCash) => registerCashRequest(data),
    onSuccess: () => {
      console.log("registered");
      queryClient.invalidateQueries({ queryKey: ["request"] });
      //   setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
  const handleSubmit = (values: any) => {
    console.log("Form data to submit:", values);
    registerRequest(values);
  };

  return (
    <div>
      <div className="flex justify-start">
        <Link className="btn text-black uppercase" href="/erp-v2/cash-request">
          back to cash request list
        </Link>
      </div>
      <Formik
        initialValues={{
          requested_by: "",
          date_requested: "",
          created_by: "",
          date_created: "",
          date_cancelled: "",
          cancelled_by: {
            username: "",
            full_name: "",
            role: "",
            department: "",
            contact_number: "",
          },
          cash_requisition_items: [
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
          cheque_request_ref: "",
          serial_no: "",
          sub_total: "",
          total: "",
          vat_value: "",
          ewt_value: "",
          grand_total: "",
          special_instructions: "",
          project_name: "",
          delivery_address: "",
          // status: "",
          discount: 0,
          vat_percentage: 0,
          less_ewt: 0,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 uppercase mb-2">
              {[
                {
                  type: "text",
                  name: "special_instructions",
                  placeholder: "Enter special instructions",
                  label: "Special Instructions",
                },
                {
                  type: "text",
                  name: "project_name",
                  placeholder: "Enter project name",
                  label: "Project Name",
                },
                {
                  type: "text",
                  name: "delivery_address",
                  placeholder: "Enter delivery address",
                  label: "Delivery Address",
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
                  label: "Date requested",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className={item.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label
                    htmlFor={item.name}
                    className="block text-sm font-bold"
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
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      placeholder={item.placeholder}
                      required
                    />
                  ) : item.type === "select" ? (
                    <Field
                      as="select"
                      id={item.name}
                      name={item.name}
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      required
                    >
                      <option value="">Select a user</option>
                      {item.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  ) : null}
                </div>
              ))}
            </div>

            <FieldArray name="cash_requisition_items">
              {({ remove, push }) => (
                <div>
                  <div className="flex justify-start mr-2">
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
                      className="btn  bg-white border border-black mb-2 text-black uppercase"
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
                          <th className="px-4 py-2">Item</th>
                          <th className="px-4 py-2">Quantity</th>
                          <th className="px-4 py-2">Unit</th>
                          <th className="px-4 py-2">Description</th>
                          <th className="px-4 py-2">Supplier</th>
                          <th className="px-4 py-2">Unit Price</th>
                          <th className="px-4 py-2">Total</th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.cash_requisition_items.map((item, index) => (
                          <tr key={index}>
                            <td className=" p-2">
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
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                    placeholder="Search or type item"
                                    value={item.item}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `cash_requisition_items[${index}].item`,
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                  <datalist id={`ItemList-${index}`}>
                                    {ItemList?.map((user) => (
                                      <option key={user.id} value={user.item} />
                                    ))}
                                  </datalist>
                                </div>
                              )}
                            </td>
                            <td className=" p-2">
                              <Field
                                type="number"
                                name={`cash_requisition_items[${index}].quantity`}
                                className="w-full border border-gray-200  text-center p-1 rounded"
                                placeholder="Quantity"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setFieldValue(
                                    `cash_requisition_items[${index}].quantity`,
                                    e.target.value
                                  )
                                }
                                required
                              />
                            </td>
                            <td className=" p-2">
                              {/* <Field
                                as="select"
                                name={`cash_requisition_items[${index}].unit_of_measurement`}
                                className="w-full border border-gray-200  text-center p-1 rounded"
                                required
                              >
                                <option value="">Select unit</option>
                                {CULoading ? (
                                  <option value="">Loading...</option>
                                ) : CUerror ? (
                                  <option value="">Error loading units</option>
                                ) : (
                                  unitsList?.map((unit) => (
                                    <option
                                      key={unit.id}
                                      value={unit.unit_of_measurement}
                                      selected={
                                        unit.unit_of_measurement ===
                                        item.unit_of_measurement
                                      }
                                    >
                                      {unit.unit_of_measurement}
                                    </option>
                                  ))
                                )}
                              </Field> */}
                              <Field
                                as="select"
                                name={`cash_requisition_items[${index}].unit_of_measurement`}
                                className="w-full border border-gray-200 text-center p-1 rounded"
                                required
                              >
                                <option value="">Select unit</option>
                                {CULoading ? (
                                  <option value="">Loading...</option>
                                ) : CUerror ? (
                                  <option value="">Error loading units</option>
                                ) : (
                                  unitsList?.map((unit) => (
                                    <option
                                      key={unit.id}
                                      value={unit.unit_of_measurement}
                                    >
                                      {unit.unit_of_measurement}
                                    </option>
                                  ))
                                )}
                              </Field>
                            </td>

                            <td className=" p-2">
                              <Field
                                type="text"
                                name={`cash_requisition_items[${index}].description`}
                                className="w-full border border-gray-200  text-center p-1 rounded"
                                placeholder="Description"
                                required
                              />
                            </td>
                            <td className=" p-2">
                              {DisLoading ? (
                                <div>Loading users...</div>
                              ) : Derror ? (
                                <div>Error loading users</div>
                              ) : (
                                <div>
                                  <input
                                    type="text"
                                    name={`cash_requisition_items[${index}].supplier`}
                                    list={`supplierList-${index}`}
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                    placeholder="Search or type supplier"
                                    value={item.supplier}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `cash_requisition_items[${index}].supplier`,
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                  <datalist id={`supplierList-${index}`}>
                                    {SupplierList?.map((supplier) => (
                                      <option
                                        key={supplier.id}
                                        value={supplier.vendor}
                                      />
                                    ))}
                                  </datalist>
                                </div>
                              )}
                            </td>
                            <td className=" p-2">
                              <Field
                                type="number"
                                name={`cash_requisition_items[${index}].unit_price`}
                                className="w-full border border-gray-200  text-center p-1 rounded"
                                placeholder="Unit Price"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setFieldValue(
                                    `cash_requisition_items[${index}].unit_price`,
                                    e.target.value
                                  )
                                }
                                required
                              />
                            </td>
                            <td className=" p-2">
                              <Field
                                type="number"
                                name={`cash_requisition_items[${index}].total`}
                                className="w-full border border-gray-200  text-center p-1 rounded"
                                placeholder="Total"
                                disabled
                                value={item.quantity * item.unit_price || 0} // Calculate total
                              />
                            </td>
                            <td className="text-xs flex gap-2 justify-center">
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                // className="btn btn-error"
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
                  <div className="mt-4 grid grid-cols-1 text-center md:grid-cols-7 gap-2">
                    {/* First Row: Input Fields */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> */}
                    {/* <div>
                        <div className="mt-5">
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
                            className="btn  bg-white border border-black mb-2 text-black uppercase"
                          >
                            Add Row
                          </button>
                        </div>
                      </div> */}
                    <div>
                      <strong className="text-xs">Discount:</strong>
                      <Field
                        type="number"
                        name="discount"
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        placeholder="Discount"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("discount", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <strong className="text-xs">VAT %:</strong>
                      <Field
                        type="number"
                        name="vat_percentage"
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        placeholder="VAT %"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("vat_percentage", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <strong className="text-xs">Less EWT %:</strong>
                      <Field
                        type="number"
                        name="less_ewt"
                        className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                        placeholder="EWT %"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("less_ewt", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <strong className="text-xs">Discount:</strong>
                      <div className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm">
                        {/* ₱{(values.discount || 0).toFixed(2)} */}₱
                        {Number(values.discount || 0).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <strong className="text-xs">VAT Amount:</strong>
                      <div className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm">
                        ₱
                        {(() => {
                          const total = values.cash_requisition_items.reduce(
                            (acc, item) =>
                              acc + (item.quantity * item.unit_price || 0),
                            0
                          );
                          const discounted = total - (values.discount || 0);
                          const vat =
                            ((values.vat_percentage || 0) / 100) * discounted;
                          return vat.toFixed(2);
                        })()}
                      </div>
                    </div>
                    <div>
                      <strong className="text-xs">Less EWT Amount:</strong>
                      <div className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm">
                        ₱
                        {(() => {
                          const total = values.cash_requisition_items.reduce(
                            (acc, item) =>
                              acc + (item.quantity * item.unit_price || 0),
                            0
                          );
                          const discounted = total - (values.discount || 0);
                          const ewt =
                            ((values.less_ewt || 0) / 100) * discounted;
                          return ewt.toFixed(2);
                        })()}
                      </div>
                    </div>
                    <div>
                      <strong className="text-xs">Grand Total:</strong>
                      <div className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm">
                        ₱
                        {(() => {
                          const total = values.cash_requisition_items.reduce(
                            (acc, item) =>
                              acc + (item.quantity * item.unit_price || 0),
                            0
                          );
                          const discounted = total - (values.discount || 0);
                          const vat =
                            ((values.vat_percentage || 0) / 100) * discounted;
                          const ewt =
                            ((values.less_ewt || 0) / 100) * discounted;
                          return (discounted + vat - ewt).toFixed(2);
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Second Row: Calculated Results */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* <div>
                        <strong>Discount:</strong>
                        <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                          ₱{(values.discount || 0).toFixed(2)}
                        </div>
                      </div> */}

                    {/* <div>
                        <strong>VAT Amount:</strong>
                        <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                          ₱
                          {(() => {
                            const total = values.cash_requisition_items.reduce(
                              (acc, item) =>
                                acc + (item.quantity * item.unit_price || 0),
                              0
                            );
                            const discounted = total - (values.discount || 0);
                            const vat =
                              ((values.vat_percentage || 0) / 100) * discounted;
                            return vat.toFixed(2);
                          })()}
                        </div>
                      </div> */}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* <div>
                        <strong>Less EWT Amount:</strong>
                        <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                          ₱
                          {(() => {
                            const total = values.cash_requisition_items.reduce(
                              (acc, item) =>
                                acc + (item.quantity * item.unit_price || 0),
                              0
                            );
                            const discounted = total - (values.discount || 0);
                            const ewt =
                              ((values.less_ewt || 0) / 100) * discounted;
                            return ewt.toFixed(2);
                          })()}
                        </div>
                      </div> */}

                    {/* <div>
                        <strong>Grand Total:</strong>
                        <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                          ₱
                          {(() => {
                            const total = values.cash_requisition_items.reduce(
                              (acc, item) =>
                                acc + (item.quantity * item.unit_price || 0),
                              0
                            );
                            const discounted = total - (values.discount || 0);
                            const vat =
                              ((values.vat_percentage || 0) / 100) * discounted;
                            const ewt =
                              ((values.less_ewt || 0) / 100) * discounted;
                            return (discounted + vat - ewt).toFixed(2);
                          })()}
                        </div>
                      </div> */}
                  </div>
                  {/* </div> */}
                </div>
              )}
            </FieldArray>

            <div className="modal-action">
              {/* <button type="submit" className="btn text-black uppercase">
                Submit
              </button> */}
              <Link
                className="btn text-black uppercase"
                href="/erp-v2/cash-request"
              >
                back
              </Link>
              <button type="submit" className="btn text-black uppercase">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCashReq;
