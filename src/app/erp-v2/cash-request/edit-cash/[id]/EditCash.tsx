"use client";
import {
  fetchCashRequestId,
  RequisitionCashId,
} from "@/api/cash-request/fetchCashRequestId";
import { Supplier } from "@/api/cash-request/fetchSupplier";
import { CashUnits } from "@/api/cash-request/fetchUnit";
import { fetchUserLists } from "@/api/cash-request/fetchUsers";
import { updateCashId } from "@/api/cash-request/updateCashRequestId";
import { ChequeItems, Items } from "@/api/cheque-request/fetchItems";
// import NotFoundPage from "@/app/not-found";
import NotFound from "@/components/Error/NotFound";
// import ServerError from "@/components/Error/ServerError";
// import LoadingId from "@/components/Loading/LoadingId";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, FieldArray } from "formik";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const EditCash = () => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  //   const [cashRequestData, setCheque] = useState<RequisitionCashId | null>(null);
  const queryClient = useQueryClient();

  const id = pathname?.split("/").pop();

  // const { mutate: updatedUserCash } = useMutation({
  //   mutationFn: (data: RequisitionCashId) => updateCashId(data!.id, data),
  //   onSuccess: () => {
  //     console.log("cash updated successfully");
  //     queryClient.invalidateQueries({ queryKey: ["cashid", id] });
  //     queryClient.invalidateQueries({ queryKey: ["cash"] });
  //     //   setShowRegisterModal(false); // Close the modal after success
  //   },
  //   onError: (error: Error) => {
  //     console.error("Error updating cash request:", error);
  //   },
  // });
  const { mutate: updatedUserCash } = useMutation({
    mutationFn: (data: RequisitionCashId) =>
      updateCashId(data.id, {
        ...data,
        requested_by: data.requested_by.id,
        cancelled_by: data.cancelled_by.id,
        date_requested: data.date_requested || "",
        date_noted: data.date_noted || "",
        date_approved: data.date_approved || "",
        discount: data.discount || 0, // 👈 convert object to number
      }),
    onSuccess: () => {
      console.log("cash updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cashid", id] });
      queryClient.invalidateQueries({ queryKey: ["cash"] });
    },
    onError: (error: Error) => {
      console.error("Error updating cash request:", error);
    },
  });

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
  const {
    isLoading: CULoading,
    error: CUerror,
    data: unitsList,
  } = useQuery<CashUnits[]>({
    queryKey: ["units"],
    queryFn: CashUnits,
  });
  const {
    isLoading: DisLoading,
    error: Derror,
    data: usersList,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserLists,
  });
  //   useEffect(() => {
  //     if (id) {
  //       fetchCashRequestId(id as string)
  //         .then((data) => {
  //           setCheque(data);
  //           setLoading(false);
  //         })
  //         .catch((err) => {
  //           setError("Error fetching cheque details.");
  //           setLoading(false);
  //         });
  //     }
  //   }, [id]);
  const {
    data: cashRequestData,
    isLoading: isCashLoading,
    error: cashRequestError,
    // isPending,
  } = useQuery({
    queryKey: ["cash", id],
    queryFn: () => fetchCashRequestId(id as string), // Fetching cash data
    enabled: !!id, // Only fetch when ID is available
  });
  const handleSubmit = (values: any) => {
    updatedUserCash(values); // Submit the form data when submitted
    console.log(values);
  };
  const openPdfWindow = () => {
    const newWindow = window.open(`/print-invoice/${id}`, "_blank");
    if (newWindow) {
      newWindow.focus();
    }
  };

  if (isCashLoading) {
    return <LoadingSpinner />;
  }

  if (cashRequestError) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="flex justify-start mr-2 mt-2 gap-2">
        <Link
          className="btn  text-black uppercase"
          href="/erp-v2/cash-request/"
        >
          Back to cash list
        </Link>
        <button
          className="btn border-none bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-4 py-2 rounded uppercase transition"
          onClick={openPdfWindow}
        >
          print
        </button>
        {/* <Link
          className="btn  text-black uppercase"
          href="/erp-v2/cash-request/"
        >
          Back to cash list
        </Link> */}
      </div>
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
          cash_requisition_items: cashRequestData?.cash_requisition_items || [
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
          special_instructions: cashRequestData?.special_instructions || "",
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
          <Form className="">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 "> */}
            <div className="grid grid-cols-1  md:grid-cols-5 mb-2">
              {/* Heading for Special Information */}
              {/* {[
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
                          ))} */}

              {/* Form Fields */}
              {[
                {
                  type: "text",
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
                <div
                  key={item.name}
                  className={
                    item.type === "textarea"
                      ? "md:col-span-2 ml-2"
                      : "ml-2 mt-2"
                  }
                >
                  <label
                    htmlFor={item.name}
                    className="block text-sm font-bold uppercase text-center"
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
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      placeholder={item.placeholder}
                    />
                  ) : item.type === "select" ? (
                    <Field
                      as="select"
                      id={item.name}
                      name={item.name}
                      value={values.requested_by}
                      className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            </div>
            {/* Dynamic Items Table */}
            <div>
              {/* {[{ type: "heading", level: 2, text: "Items" }].map(
                              (item) => (
                                <div key="items-heading" className="col-span-2 mb-4">
                                  {item.type === "heading" && item.level === 2 && (
                                    <h2 className="font-bold text-lg">{item.text}</h2>
                                  )}
                                </div>
                              )
                            )} */}
              <FieldArray name="cash_requisition_items">
                {({ remove, push }) => (
                  <div>
                    <div className="mt-3">
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
                        className="btn bg-white border border-black text-black uppercase mb-2 mt-2"
                      >
                        Add Row
                      </button>
                    </div>
                    {/* <div className="flex justify-end mr-2">
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
                        className="btn bg-white border border-black text-black uppercase mb-2 mt-2"
                      >
                        Add Row
                      </button>
                    </div> */}
                    {/* Table to display items */}
                    {/* <div className=" shadow-sm">
                                    <table
                                      className="w-full table-auto border-collapse text-sm border border-black"
                                      style={{ width: "200%" }}
                                    >
                                      <thead className="dark:text-white text-center text-black"> */}
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
                          {/* Render each row of items */}
                          {values.cash_requisition_items.map((item, index) => (
                            <tr key={index}>
                              <td className=" p-2 ">
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
                                      placeholder="Search or type user"
                                      // value={item.item}
                                      value={item.item || ""}
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
                                        <option
                                          key={user.id}
                                          value={user.item}
                                        />
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
                              {/* <td className=" p-2">
                                <Field
                                  as="select"
                                  name={`cash_requisition_items[${index}].unit_of_measurement`}
                                  className="w-full border border-gray-200  text-center p-1 rounded"
                                  required
                                >
                                  <option value="">Select unit</option>
                                  {CULoading ? (
                                    <option value="">Loading...</option>
                                  ) : CUerror ? (
                                    <option value="">
                                      Error loading units
                                    </option>
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
                                </Field>
                              </td> */}
                              <td className="p-2">
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
                                    <option value="">
                                      Error loading units
                                    </option>
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

                                  // className="flex items-center gap-1 bg-white  text-red-800 border border-red-800 px-3 py-1.5 rounded-md text-xs shadow transition duration-200 uppercase"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* <div className="mt-4 grid grid-cols-3 gap-4">
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
      
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                  <div>
                                    <strong>Discount:</strong>
                                    <div className="w-full p-2 border">
                                      ₱
                                      {values.discount
                                        ? parseFloat(values.discount).toFixed(2)
                                        : "0.00"}
                                    </div>
                                  </div>
      
                                  <div>
                                    <strong>VAT %:</strong>
                                    <div className="w-full p-2 border">
                                      ₱
                                      {(() => {
                                        const totalBeforeDiscount =
                                          values.cash_requisition_items.reduce(
                                            (acc, item) =>
                                              acc +
                                              (item.quantity * item.unit_price || 0),
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
      
                                        return vatAmount.toFixed(2); // Display VAT amount
                                      })()}{" "}
                                    </div>
                                  </div>
      
                                  <div>
                                    <strong>Less EWT %:</strong>
                                    <div className="w-full p-2 border">
                                      ₱
                                      {(() => {
                                        const totalBeforeDiscount =
                                          values.cash_requisition_items.reduce(
                                            (acc, item) =>
                                              acc +
                                              (item.quantity * item.unit_price || 0),
                                            0
                                          );
      
                                        const discountAmount = parseFloat(
                                          values.discount || "0"
                                        );
                                        const discountedTotal =
                                          totalBeforeDiscount - discountAmount;
      
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
                                      ₱
                                      {(() => {
                                        const totalBeforeDiscount =
                                          values.cash_requisition_items.reduce(
                                            (acc, item) =>
                                              acc +
                                              (item.quantity * item.unit_price || 0),
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
      
                                        const ewtPercentage = parseFloat(
                                          values.less_ewt || "0"
                                        );
                                        const ewtAmount =
                                          (ewtPercentage / 100) * discountedTotal;
      
                                        const grandTotal =
                                          discountedTotal + vatAmount - ewtAmount;
      
                                        return grandTotal.toFixed(2); // Display Grand Total
                                      })()}
                                    </div>
                                  </div>
                                </div> */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-8 gap-6 uppercase text-center">
                      {/* First Row: Input Fields */}
                      {/* <div className="mt-3">
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
                            className="btn bg-white border border-black text-black uppercase mb-2 mt-2"
                          >
                            Add Row
                          </button>
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
                          {/* ₱
                          {values.discount
                            ? values.discount.toFixed(2)
                            : "0.00"} */}
                          {Number(values.discount || 0).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <strong className="text-xs">VAT Amount:</strong>
                        <div className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm">
                          ₱
                          {(() => {
                            const totalBeforeDiscount =
                              values.cash_requisition_items.reduce(
                                (acc, item) =>
                                  acc + (item.quantity * item.unit_price || 0),
                                0
                              );
                            const discountAmount = values.discount || 0;
                            const discountedTotal =
                              totalBeforeDiscount - discountAmount;
                            const vatPercentage = values.vat_percentage || 0;
                            const vatAmount =
                              (vatPercentage / 100) * discountedTotal;
                            return vatAmount.toFixed(2); // Display VAT amount
                          })()}
                        </div>
                      </div>
                      <div>
                        <strong className="text-xs">EWT Amount:</strong>
                        <div className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm">
                          ₱
                          {(() => {
                            const totalBeforeDiscount =
                              values.cash_requisition_items.reduce(
                                (acc, item) =>
                                  acc + (item.quantity * item.unit_price || 0),
                                0
                              );
                            const discountAmount = values.discount || 0;
                            const discountedTotal =
                              totalBeforeDiscount - discountAmount;
                            const ewtPercentage = values.less_ewt || 0;
                            const ewtAmount =
                              (ewtPercentage / 100) * discountedTotal;
                            return ewtAmount.toFixed(2); // Display EWT amount
                          })()}
                        </div>
                      </div>
                      <div>
                        <strong className="text-xs">Total:</strong>
                        <div className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm">
                          ₱
                          {values.cash_requisition_items
                            .reduce(
                              (acc, item) =>
                                acc + (item.quantity * item.unit_price || 0),
                              0
                            )
                            .toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <strong className="text-xs">Grand Total:</strong>
                        <div className="bg-gray-50 dark:bg-gray-dark dark:text-white text-center text-gray-900 border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-[4px] text-sm">
                          ₱
                          {(() => {
                            const totalBeforeDiscount =
                              values.cash_requisition_items.reduce(
                                (acc, item) =>
                                  acc + (item.quantity * item.unit_price || 0),
                                0
                              );
                            const discountAmount = values.discount || 0;
                            const discountedTotal =
                              totalBeforeDiscount - discountAmount;
                            const vatPercentage = values.vat_percentage || 0;
                            const vatAmount =
                              (vatPercentage / 100) * discountedTotal;
                            const ewtPercentage = values.less_ewt || 0;
                            const ewtAmount =
                              (ewtPercentage / 100) * discountedTotal;
                            const grandTotal =
                              discountedTotal + vatAmount - ewtAmount;
                            return grandTotal.toFixed(2); // Display Grand Total
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Second Row: Calculated Results */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* <div>
                          <strong>Discount:</strong>
                          <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                            ₱
                            {values.discount
                              ? values.discount.toFixed(2)
                              : "0.00"}
                          </div>
                        </div> */}

                      {/* <div>
                          <strong>VAT Amount:</strong>
                          <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                            ₱
                            {(() => {
                              const totalBeforeDiscount =
                                values.cash_requisition_items.reduce(
                                  (acc, item) =>
                                    acc +
                                    (item.quantity * item.unit_price || 0),
                                  0
                                );
                              const discountAmount = values.discount || 0;
                              const discountedTotal =
                                totalBeforeDiscount - discountAmount;
                              const vatPercentage = values.vat_percentage || 0;
                              const vatAmount =
                                (vatPercentage / 100) * discountedTotal;
                              return vatAmount.toFixed(2); // Display VAT amount
                            })()}
                          </div>
                        </div> */}

                      {/* <div>
                          <strong>EWT Amount:</strong>
                          <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                            ₱
                            {(() => {
                              const totalBeforeDiscount =
                                values.cash_requisition_items.reduce(
                                  (acc, item) =>
                                    acc +
                                    (item.quantity * item.unit_price || 0),
                                  0
                                );
                              const discountAmount = values.discount || 0;
                              const discountedTotal =
                                totalBeforeDiscount - discountAmount;
                              const ewtPercentage = values.less_ewt || 0;
                              const ewtAmount =
                                (ewtPercentage / 100) * discountedTotal;
                              return ewtAmount.toFixed(2); // Display EWT amount
                            })()}
                          </div>
                        </div> */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                      {/* <div>
                          <strong>Total:</strong>
                          <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                            ₱
                            {values.cash_requisition_items
                              .reduce(
                                (acc, item) =>
                                  acc + (item.quantity * item.unit_price || 0),
                                0
                              )
                              .toFixed(2)}
                          </div>
                        </div> */}

                      {/* <div>
                          <strong>Grand Total:</strong>
                          <div className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                            ₱
                            {(() => {
                              const totalBeforeDiscount =
                                values.cash_requisition_items.reduce(
                                  (acc, item) =>
                                    acc +
                                    (item.quantity * item.unit_price || 0),
                                  0
                                );
                              const discountAmount = values.discount || 0;
                              const discountedTotal =
                                totalBeforeDiscount - discountAmount;
                              const vatPercentage = values.vat_percentage || 0;
                              const vatAmount =
                                (vatPercentage / 100) * discountedTotal;
                              const ewtPercentage = values.less_ewt || 0;
                              const ewtAmount =
                                (ewtPercentage / 100) * discountedTotal;
                              const grandTotal =
                                discountedTotal + vatAmount - ewtAmount;
                              return grandTotal.toFixed(2); // Display Grand Total
                            })()}
                          </div>
                        </div> */}
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="modal-action">
              {/* <button type="submit" className="btn uppercase">
                Submit
              </button> */}
              {/* <button
                className="btn"
                type="button"
                onClick={() => setShowRegisterModal(false)}
              >
                Close
              </button> */}
              <Link
                className="btn uppercase text-black"
                href="/erp-v2/cash-request/"
              >
                {/* {" "} */}
                back
              </Link>
              <button type="submit" className="btn uppercase">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCash;
