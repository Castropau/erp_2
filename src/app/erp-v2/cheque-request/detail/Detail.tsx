"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { IoMdArrowBack, IoMdCreate, IoMdMore, IoMdPrint } from "react-icons/io";
import Link from "next/link";

interface PageProps {}

function Detail(props: PageProps) {
  const [tableData, setTableData] = useState<any[]>([]);

  const handleSubmit = (values: any) => {
    // Append form data to the table
    setTableData([...tableData, values]);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="ml-auto">
        <Link href="/erp-v2/cheque-request">
          <button className="btn btn-info">
            <IoMdArrowBack />
            Back to Cheque List
          </button>
        </Link>
      </div>

      {/* Formik Form */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Item & Location</h3>
          <div className="flex gap-4">
            <IoMdPrint className="cursor-pointer text-lg" title="Print" />
            <IoMdCreate className="cursor-pointer text-lg" title="Edit" />
            <IoMdMore className="cursor-pointer text-lg" title="More options" />
          </div>
        </div>
        <Formik
          initialValues={{
            item: "",
            description: "",
            quantity: 0,
            unitOfMeasurement: "",
            price: 0,
            total: 0,
            location: "",
          }}
          onSubmit={handleSubmit}
          className="space-y-6 md:space-y-8"
          action="#"
        >
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  type: "text",
                  name: "item",
                  label: "Serial#",
                  placeholder: "Enter the serial number",
                },
                {
                  type: "date",
                  name: "date",
                  label: "date",
                },
                {
                  type: "text",
                  name: "name_of_org",
                  label: "name of org",
                  placeholder: "name of org",
                },
                {
                  type: "text",
                  name: "payable_to",
                  label: "payable to",
                  placeholder: "payable to",
                },
                {
                  type: "text",
                  name: "address",
                  label: "address",
                  placeholder: "Enter address",
                },
                {
                  type: "text",
                  name: "purpose",
                  label: "Purpose",
                  placeholder: "Purpose",
                },
                {
                  type: "text",
                  name: "requested_by",
                  label: "Requested by",
                  placeholder: "Requested by",
                },
              ].map((item) => (
                <div key={item.name} className="space-y-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    {item.label}
                  </label>
                  <Field
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder={item.placeholder}
                    required
                  />
                </div>
              ))}

              <div className="flex justify-between mt-4">
                {/* <button
                  type="submit"
                  className="w-full text-white bg-info focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center mt-4 hover:shadow-lg transition-all duration-200 ease-in-out"
                >
                  Add to Table
                </button> */}
              </div>
            </div>
          </Form>
        </Formik>
      </div>

      {/* Table to display data */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        {/* <h3 className="text-xl font-semibold mb-4">Entered Data</h3> */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="text-blue-500">
              <th className="p-2 text-left">No</th>
              <th className="p-2 text-left">Date of Purchase</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Cheque Number</th>
              <th className="p-2 text-left">Remark</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{data.item}</td>
                <td className="p-2">{data.description}</td>
                <td className="p-2">{data.quantity}</td>
                <td className="p-2">{data.unitOfMeasurement}</td>
                <td className="p-2">{data.price}</td>
                <td className="p-2">{data.total}</td>
                <td className="p-2">{data.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <span className="justify-end">Total: </span> */}
        <div className="flex justify-end mt-4">
          <span className="font-semibold">Total: 123123123123123</span>
        </div>
      </div>
    </div>
  );
}

export default Detail;
