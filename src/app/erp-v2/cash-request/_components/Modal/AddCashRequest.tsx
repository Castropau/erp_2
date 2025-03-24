"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCirclePlus } from "react-icons/fa6";
import { Formik, Field, Form, FieldArray } from "formik";
import { registerUser } from "@/api/User/registerUser";
import { RegisterEmployee } from "@/interfaces/RegisterEmployee";
import { fetchUserLists } from "@/api/cash-request/fetchUsers";

export default function AddCashRequest() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: registerEmployee } = useMutation({
    mutationFn: (data: RegisterEmployee) => registerUser(data),
    onSuccess: () => {
      console.log("registered");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  // users fetch
  const {
    isLoading: DisLoading,
    error: Derror,
    data: usersList,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserLists,
  });

  const unitsList = ["kg", "unit", "box", "liter", "meter"];

  const handleSubmit = (values: any) => {
    console.log("Form data to submit:", values);
    registerEmployee(values);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-info"
          onClick={() => setShowRegisterModal(true)}
        >
          <FaCirclePlus className="w-6 h-5 btn-info" />
          Add Cash Request
        </button>
      </div>

      {showRegisterModal && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-7xl">
            <h3 className="font-bold text-lg">Create New Cash Request</h3>

            <Formik
              initialValues={{
                special_instructions: "",
                project_name: "",
                delivery_address: "",
                requested_by: "",
                date: "",
                request: "",
                items: [
                  {
                    item: "",
                    quantity: "",
                    unit: "",
                    description: "",
                    supplier: "",
                    unit_price: "",
                    total: "",
                  },
                ],
              }}
              onSubmit={handleSubmit}
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
                        name: "date",
                        placeholder: "Select date",
                        label: "Date",
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
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder={item.placeholder}
                          />
                        ) : item.type === "select" ? (
                          <Field
                            as="select"
                            id={item.name}
                            name={item.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                      <FieldArray name="items">
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
                                  total: "",
                                })
                              }
                              className="btn btn-info mt-4"
                            >
                              Add Item
                            </button>

                            {/* Table to display items */}
                            {/* <div className="mt-4 overflow-x-auto"> */}
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
                                {values.items.map((item, index) => (
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
                                            name={`items[${index}].item`}
                                            list={`usersList-${index}`}
                                            className="w-full p-2 border"
                                            placeholder="Search or type user"
                                            value={item.item}
                                            onChange={(e) =>
                                              setFieldValue(
                                                `items[${index}].item`,
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
                                        name={`items[${index}].quantity`}
                                        className="w-full p-2 border"
                                        placeholder="Quantity"
                                      />
                                    </td>
                                    <td className="border p-2">
                                      <Field
                                        as="select"
                                        name={`items[${index}].unit`}
                                        className="w-full p-2 border"
                                      >
                                        <option value="">Select unit</option>
                                        {unitsList.map((unit, idx) => (
                                          <option key={idx} value={unit}>
                                            {unit}
                                          </option>
                                        ))}
                                      </Field>
                                    </td>
                                    <td className="border p-2">
                                      <Field
                                        type="text"
                                        name={`items[${index}].description`}
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
                                            name={`items[${index}].item`}
                                            list={`usersList-${index}`}
                                            className="w-full p-2 border"
                                            placeholder="Search or type user"
                                            value={item.item}
                                            onChange={(e) =>
                                              setFieldValue(
                                                `items[${index}].item`,
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
                                        name={`items[${index}].unit_price`}
                                        className="w-full p-2 border"
                                        placeholder="Unit Price"
                                      />
                                    </td>
                                    <td className="border p-2">
                                      <Field
                                        type="number"
                                        name={`items[${index}].total`}
                                        className="w-full p-2 border"
                                        placeholder="Total"
                                        disabled
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
                                ))}
                              </tbody>
                            </table>
                            <tr>
                              <td colSpan={6} className="border p-2">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <strong>Discount:</strong>
                                    <div className="w-full p-2 border">
                                      ₱
                                      {values.items
                                        .reduce(
                                          (acc, item) =>
                                            acc +
                                            parseFloat(item.discount || "0"),
                                          0
                                        )
                                        .toFixed(2)}
                                    </div>
                                  </div>

                                  <div>
                                    <strong>Vat %:</strong>
                                    <div className="w-full p-2 border">
                                      {values.items.reduce(
                                        (acc, item) =>
                                          acc +
                                          parseFloat(
                                            item.vat_percentage || "0"
                                          ),
                                        0
                                      )}
                                      %
                                    </div>
                                  </div>

                                  <div>
                                    <strong>Less EWT %:</strong>
                                    <div className="w-full p-2 border">
                                      {values.items.reduce(
                                        (acc, item) =>
                                          acc +
                                          parseFloat(
                                            item.ewt_percentage || "0"
                                          ),
                                        0
                                      )}
                                      %
                                    </div>
                                  </div>

                                  <div>
                                    <strong>Total:</strong>
                                    <div className="w-full p-2 border">
                                      ₱
                                      {values.items
                                        .reduce(
                                          (acc, item) =>
                                            acc + parseFloat(item.total || "0"),
                                          0
                                        )
                                        .toFixed(2)}
                                    </div>
                                  </div>

                                  <div>
                                    <strong>Vat Value:</strong>
                                    <div className="w-full p-2 border">
                                      ₱
                                      {values.items
                                        .reduce(
                                          (acc, item) =>
                                            acc +
                                            parseFloat(item.vat_value || "0"),
                                          0
                                        )
                                        .toFixed(2)}
                                    </div>
                                  </div>

                                  <div>
                                    <strong>EWT Value:</strong>
                                    <div className="w-full p-2 border">
                                      ₱
                                      {values.items
                                        .reduce(
                                          (acc, item) =>
                                            acc +
                                            parseFloat(item.ewt_value || "0"),
                                          0
                                        )
                                        .toFixed(2)}
                                    </div>
                                  </div>

                                  <div>
                                    <strong>Grand Total:</strong>
                                    <div className="w-full p-2 border">
                                      ₱
                                      {values.items
                                        .reduce(
                                          (acc, item) =>
                                            acc +
                                            parseFloat(item.grand_total || "0"),
                                          0
                                        )
                                        .toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </div>
                          //   </div>
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
