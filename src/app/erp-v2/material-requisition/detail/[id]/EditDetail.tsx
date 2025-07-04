"use client";
// import { RequisitionCashOptions } from "@/api/cheque-request/fetchCashRequest";
import { ChequeId, fetchChequeById } from "@/api/cheque-request/fetchChequeId";
// import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditDetail = () => {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  // const queryClient = useQueryClient();
  const [cheque, setCheque] = useState<ChequeId | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [isEditing, setIsEditing] = useState(false);
  // const [rows, setRows] = useState<any[]>([]);
  // const [selectedCashRecord, setSelectedCashRecord] =
  //   useState<RequisitionCashOptions | null>(null);
  // const [showEditModal, setShowEditModal] = useState(false);

  // const handleSubmit = (values: any) => {
  //   //    updatedView(); // Call mutation
  //   console.log("test");
  // };
  useEffect(() => {
    if (id) {
      fetchChequeById(id as string)
        .then((data) => {
          setCheque(data);
          // setLoading(false);
        })
        .catch(() => {
          // setError("Error fetching cheque details.");
          // setLoading(false);
        });
    }
  }, [id]);
  return (
    <div>
      <Link
        className="btn border border-black uppercase"
        href={`/erp-v2/material-requisition`}
      >
        Back
      </Link>
      {/* {cheque?.serial_no} */}
      <div className="">
        <Formik
          initialValues={{
            serial_no: cheque?.serial_no || "",
          }}
          enableReinitialize={true}
          onSubmit={(values) => {
            // updatedUser(values);
            console.log(values);
            console.log("test");
          }}
        >
          {({}) => (
            <Form>
              <div className="py-4 text-start grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="mb-1">
                  <label
                    htmlFor="serial_no"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name of requestor
                  </label>
                  <Field
                    type="text"
                    id="serial_no"
                    name="serial_no"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="mb-1">
                  <label
                    htmlFor="serial_no"
                    className="block text-sm font-medium text-gray-700"
                  >
                    department
                  </label>
                  <Field
                    type="text"
                    id="serial_no"
                    name="serial_no"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="mb-1">
                  <label
                    htmlFor="serial_no"
                    className="block text-sm font-medium text-gray-700"
                  >
                    date requested
                  </label>
                  <Field
                    type="text"
                    id="serial_no"
                    name="serial_no"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="contact_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    date needed
                  </label>
                  <Field
                    type="text"
                    id="contact_number"
                    name="contact_number"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="mb-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    purpose
                  </label>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* table */}

                <div className="mb-1">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <table className="table table-xs w-full border-t rounded-lg shadow-lg">
                <thead className="bg-white text-black border border-b-2">
                  <tr className="text-center uppercase">
                    <th className="px-4 py-2 font-semibold">Serial No</th>
                    <th className="px-4 py-2 font-semibold">Purpose</th>
                    <th className="px-4 py-2 font-semibold">Requested By</th>
                    <th className="px-4 py-2 font-semibold">Date Requested</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                    <th className="px-4 py-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td>asd</td>
                    <td>asd</td>
                    <td>asd</td>
                    <td>asd</td>
                    <td>asd</td>
                    <td className="text-xs flex gap-2 text-center justify-center py-1 px-4">
                      <button
                        type="button"
                        className="btn border border-black text-black"
                      >
                        test
                      </button>
                      <button
                        type="button"
                        className="btn border border-black text-black"
                      >
                        test2
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <div className="py-4 text-start grid grid-cols-1 md:grid-cols-2 gap-1">
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      item received by
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      prepared by
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      date prepared
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      approved by
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      date approved
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      item return by
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      date return by
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
                <hr />
                <h1 className="mt-2">history</h1>
                <div className="py-4 text-start grid grid-cols-1 md:grid-cols-2 gap-1">
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      created by
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      date created
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      modified by
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      date modified
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      date approved
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      item return by
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      date return by
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <Link className="btn text-black uppercase" href="/erp-v2/user">
                  back
                </Link>
                <button type="submit" className="btn">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/* test */}
      {/* <table className="table table-xs w-full border-t rounded-lg shadow-lg">
        <thead className="bg-white text-black border border-b-2">
          <tr className="text-center uppercase">
            <th className="px-4 py-2 font-semibold">Serial No</th>
            <th className="px-4 py-2 font-semibold">Purpose</th>
            <th className="px-4 py-2 font-semibold">Requested By</th>
            <th className="px-4 py-2 font-semibold">Date Requested</th>
            <th className="px-4 py-2 font-semibold">Status</th>
            <th className="px-4 py-2 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
};

export default EditDetail;
