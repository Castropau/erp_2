import { Formik, Form, Field } from "formik";
import Link from "next/link";
import React, { useState } from "react";

import { fetchlaborId } from "@/api/labor_of_computation/FetchLaborId";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { usePathname } from "next/navigation";
import { fetchBomList } from "@/api/bill_of_materials/fetchBill";
import {
  UpdateLabor,
  updateLabor,
} from "@/api/labor_of_computation/updateLabor";
import { BomUser, fetchbomUser } from "@/api/bill_of_materials/fetchUsers";
import ActiveNav1 from "../ModalComponents/ActiveNav1";
import ActiveNav2 from "../ModalComponents/ActiveNav2";
import ActiveNav3 from "../ModalComponents/ActiveNav3";
import ActiveNav4 from "../ModalComponents/ActiveNav4";
import ActiveNav5 from "../ModalComponents/ActiveNav5";
interface EditFormsProps {
  id: string;
}
const EditForms = ({ id }: EditFormsProps) => {
  //   const [isEditing, setIsEditing] = useState(false); // New state to track edit mode

  const [showSuccess, setShowSuccess] = useState(false);
  const queryClient = useQueryClient();

  //   const [headers, setHeaders] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);

  const [newHeaders] = useState([]);

  //   const [deviceRows2, setDeviceRows2] = useState<DeviceRow[]>([]);
  const [newHeaders2] = useState<{ title: string; rows: DeviceRow[] }[]>([]);
  //   const [headers2, setHeaders2] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);

  //   const [deviceRows3, setDeviceRows3] = useState<DeviceRow[]>([]);
  const [newHeaders3] = useState<{ title: string; rows: DeviceRow[] }[]>([]);
  //   const [headers3, setHeaders3] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);

  //   const [deviceRows4, setDeviceRows4] = useState<DeviceRow[]>([]);

  const [newHeaders4] = useState<{ title: string; rows: DeviceRow[] }[]>([]);
  //   const [headers4, setHeaders4] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);

  //   const [deviceRows5, setDeviceRows5] = useState<DeviceRow[]>([]);

  const [newHeaders5] = useState<{ title: string; rows: DeviceRow[] }[]>([]);
  //   const [headers5, setHeaders5] = useState<
  //     { title: string; rows: DeviceRow[] }[]
  //   >([]);
  interface MappedSubHeader {
    items: any;
    title: string;
    rows: MappedRowItem[];
  }
  interface DeviceRow {
    item: string;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    amount: string;
    total_amount: string;
    rows: MappedSubHeader[];
    srp: number;
  }
  interface MappedRowItem {
    item: string;
    ratio: string;
    unit: string;
    quantity: number;
    manpower: string;
    no_of_days: string;
    labor_cost: number;
    per_unit_cost: string;
  }
  //   interface LaborDataType {
  //     project_name: string;
  //     project_duration: string;
  //     system: string;
  //     lc_no: string;
  //     bom: string;
  //     date_created: string;

  //     roughing_ins: Roughing[];
  //     wiring_ins: WiringIns[];
  //     device_installations: DeviceInstall[];
  //     configurations: ConfigurationInstall[];
  //     testing_and_commissionings: TestingInstall[];
  //   }
  //   interface TestingInstall {
  //     id: number;
  //     items: TestingInstallItem;
  //     sub_headers: TestingHeadersItem;
  //     sub_headers_total: string;
  //     header: string;
  //   }
  //   interface TestingHeadersItem {
  //     id: number;
  //     items: TestingSubItem;
  //     items_sub_total: string;
  //     sub_header: string;
  //   }
  //   interface TestingSubItem {
  //     //  id: number,
  //     manpower: string;
  //     no_of_days: string;
  //     total: string;
  //     per_unit_cost: string;
  //     order: number;
  //     item: string;
  //     ratio: string;
  //     unit: string;
  //     quantity: number;
  //     labor_cost: number;
  //   }
  //   interface TestingInstallItem {
  //     // id: number,
  //     manpower: string;
  //     no_of_days: string;
  //     total: string;
  //     per_unit_cost: string;
  //     order: number;
  //     item: string;
  //     ratio: string;
  //     unit: string;
  //     quantity: number;
  //     labor_cost: number;
  //   }
  //   interface ConfigurationInstall {
  //     id: number;
  //     items: ConfigurationItem;
  //     sub_headers: ConfigurationHeadersItem;
  //     sub_headers_total: string;
  //     header: string;
  //   }
  //   interface ConfigurationHeadersItem {
  //     id: number;
  //     items: ConfigurationItem;
  //     items_sub_total: string;
  //     sub_header: string;
  //   }
  //   interface ConfigurationItem {
  //     // id: number,
  //     manpower: string;
  //     no_of_days: string;
  //     total: string;
  //     per_unit_cost: string;
  //     order: number;
  //     item: string;
  //     ratio: string;
  //     unit: string;
  //     quantity: number;
  //     labor_cost: number;
  //   }
  //   interface DeviceInstall {
  //     // id: number,
  //     items: DeviceItem;
  //     sub_headers: DeviceHeadersItem;
  //     sub_headers_total: string;
  //     header: string;
  //   }
  //   interface DeviceHeadersItem {
  //     //  id: number,
  //     items: DeviceItem;
  //     items_sub_total: string;
  //     sub_header: string;
  //   }
  //   interface DeviceItem {
  //     // id: number,
  //     manpower: string;
  //     no_of_days: string;
  //     total: string;
  //     per_unit_cost: string;
  //     order: number;
  //     item: string;
  //     ratio: string;
  //     unit: string;
  //     quantity: number;
  //     labor_cost: number;
  //   }
  //   interface WiringIns {
  //     // id: number,
  //     items: WiringInsItem;
  //     sub_headers: WiringInsHeadersItem;
  //     item_sub_total: string;
  //     sub_headers_total: string;
  //     header: string;
  //   }
  //   interface WiringInsHeadersItem {
  //     //  id: number,
  //     manpower: string;
  //     no_of_days: string;
  //     total: string;
  //     per_unit_cost: string;
  //     order: number;
  //     item: string;
  //     ratio: string;
  //     unit: string;
  //     quantity: number;
  //     labor_cost: number;
  //   }
  //   interface WiringInsItem {
  //     // id: number,
  //     manpower: string;
  //     no_of_days: string;
  //     total: string;
  //     per_unit_cost: string;
  //     order: number;
  //     item: string;
  //     ratio: string;
  //     unit: string;
  //     quantity: number;
  //     labor_cost: number;
  //   }
  //   interface SubRoughingHeadersItem {
  //     //  id: number,
  //     manpower: string;
  //     no_of_days: string;
  //     total: string;
  //     per_unit_cost: string;
  //     order: number;
  //     item: string;
  //     ratio: string;
  //     unit: string;
  //     quantity: number;
  //     labor_cost: number;
  //   }
  //   interface RoughingSubHeaders {
  //     // id: number,
  //     items: SubRoughingHeadersItem;
  //     sub_header: string;
  //   }
  //   interface RoughingItems {
  //     // id: number,
  //     manpower: string;
  //     no_of_days: string;
  //     total: string;
  //     per_unit_cost: string;
  //     order: number;
  //     item: string;
  //     ratio: string;
  //     unit: string;
  //     quantity: number;
  //     labor_cost: number;
  //   }
  //   interface Roughing {
  //     // id: number,
  //     items: RoughingItems[];
  //     sub_headers: RoughingSubHeaders;
  //     items_sub_total: string;
  //     sub_headers_total: string;
  //     total: string;
  //     header: string;
  //   }
  interface MappedHeaders {
    title: string;
    sub_header: string;
    header: string;
    rows: MappedSubHeaders[];
    items: MappedRowItem[];
  }
  interface MappedSubHeaders {
    order: any;
    labor_cost: any;
    manpower: any;
    quantity: any;
    unit: any;
    ratio: any;
    item: any;
    title: string;
    rows: MappedRowItems[];
  }
  interface MappedRowItems {
    order: any;
    item: string;
    ratio: string;
    unit: string;
    quantity: number;
    manpower: string;
    no_of_days: string;
    labor_cost: number;
    per_unit_cost: string;
  }
  const [activeNav, setActiveNav] = useState(1);
  //   const pathname = usePathname();

  const {
    // isLoading: Uloading,
    // error: uerror,
    data: udata,
  } = useQuery<BomUser[]>({
    queryKey: ["users"],
    queryFn: fetchbomUser,
  });
  const {
    data: BomData,
    // isLoading: Bloading,
    // isError: BeceiptError,
    // error: berror,
  } = useQuery({
    queryKey: ["bom"],
    queryFn: fetchBomList,
  });
  const {
    data: LaborData,
    // isLoading: Rloading,
    // isError: ReceiptError,
    // error: rerror,
  } = useQuery({
    queryKey: ["labor", id],
    queryFn: () => fetchlaborId(id as string),
    enabled: !!id,
  });
  const { mutate: updatedLabor } = useMutation({
    mutationFn: (laborData: UpdateLabor) =>
      updateLabor(id as string, laborData),
    onSuccess: () => {
      console.log("labor updated successfully");
      queryClient.invalidateQueries({ queryKey: ["labor", id] });
    },
    onError: (error) => {
      console.error("Error updating quotation:", error);
      console.log(updatedLabor);
    },
  });
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
      <Formik
        initialValues={{
          input1: LaborData?.project_name || "",
          input4:
            BomData?.find(
              (bom) => bom.bom_no === LaborData?.bom
            )?.id?.toString() || "",
          input7: LaborData?.system || "",
          input8: LaborData?.project_duration || "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          const processHeaders = (headersArray: MappedHeaders[]) =>
            headersArray
              .filter((header) => header.rows?.length > 0)
              .map((header, headerIndex) => ({
                header: header.title || `Header ${headerIndex + 1}`,
                items: header.rows
                  .filter(
                    (item) =>
                      !item.rows &&
                      Object.values(item).some(
                        (val) =>
                          val !== null &&
                          val !== undefined &&
                          val.toString().trim() !== ""
                      )
                  )
                  .map((item: MappedSubHeaders) => ({
                    item: item.item,
                    ratio: item.ratio,
                    unit: item.unit,
                    quantity: Number(item.quantity) || 0,
                    manpower: Number(item.manpower) || 0,
                    labor_cost: Number(item.labor_cost) || 0,
                    order: Number(item.order) || 0,
                  })),
                sub_headers: header.rows
                  .filter((sub) => sub.rows?.length > 0)
                  .map((sub, subIndex) => ({
                    sub_header: sub.title || `Sub Header ${subIndex + 1}`,
                    items: sub.rows
                      .filter((item) =>
                        Object.values(item).some(
                          (val) =>
                            val !== null &&
                            val !== undefined &&
                            val.toString().trim() !== ""
                        )
                      )
                      .map((item) => ({
                        item: item.item,
                        ratio: item.ratio,
                        unit: item.unit,
                        quantity: Number(item.quantity) || 0,
                        manpower: Number(item.manpower) || 0,
                        labor_cost: Number(item.labor_cost) || 0,
                        order: Number(item.order) || 0,
                      })),
                  })),
              }));

          const formData = {
            // id: ,
            project_name: values.input1,
            bom: values.input4,
            system: values.input7,
            project_duration: values.input8,
            roughing_ins: [
              ...processHeaders(newHeaders),
              ...processHeaders(newHeaders2 as unknown as MappedHeaders[]),
              ...processHeaders(newHeaders3 as unknown as MappedHeaders[]),
              ...processHeaders(newHeaders4 as unknown as MappedHeaders[]),
              ...processHeaders(newHeaders5 as unknown as MappedHeaders[]),
            ],
          };

          console.log("Submitting:", formData);
          // updatedLabor(formData);
          try {
            await updatedLabor(formData);
            console.log(formData);

            // setIsEditing(false);
            setShowSuccess(true); // Show the success alert

            // setTimeout(() => {
            //   window.location.href = "/erp-v2/labor_of_computation/"; // 🔁 Redirect to dashboard
            // }, 2000);
          } catch (error) {
            console.error("Submission failed:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            {/* <Link
              className="btn text-black uppercase"
              href="/erp-v2/labor_of_computation"
            >
              back
            </Link> */}
            {/* <div className="grid grid-cols-2 gap-3 mb-2 text-start"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 mb-1 text-start">
              {Object.keys(values).map((key, index) => (
                <div key={index} className="flex flex-col">
                  <label className="text-sm font-bold  mb-2 uppercase ">
                    {(() => {
                      switch (key) {
                        case "input1":
                          return "Project name";
                        case "input4":
                          return "BOM";
                        case "input7":
                          return "system";
                        case "input8":
                          return "Project duration";

                        default:
                          return `Input ${index + 1}`;
                      }
                    })()}
                  </label>

                  {key === "input3" ? (
                    // 👤 SIC Dropdown
                    <select
                      name={key}
                      // value={values[key]}
                      onChange={handleChange}
                      className="input input-bordered w-full p-3 rounded-md border border-gray-300"
                    >
                      <option value="">Select SIC</option>
                      {udata?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.full_name}
                        </option>
                      ))}
                    </select>
                  ) : key === "input4" ? (
                    // 👥 Client Dropdown
                    <select
                      name={key}
                      value={values[key]}
                      onChange={handleChange}
                      className="dark:bg-gray-dark input input-bordered w-full  rounded-md border border-gray-300"
                    >
                      <option value="">Select BOM</option>
                      {BomData?.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.bom_no}
                        </option>
                      ))}
                    </select>
                  ) : key === "input5" ? (
                    // 🔄 Status Dropdown
                    <select
                      name={key}
                      // value={values[key]}
                      onChange={handleChange}
                      className="input input-bordered w-full p-3 rounded-md border border-gray-300"
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Revise">Revise</option>
                      <option value="Noted">Noted</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : key === "input6" ? (
                    // 🧑‍💼 EIC Dropdown
                    <select
                      name={key}
                      // value={values[key]}
                      onChange={handleChange}
                      className="input input-bordered w-full p-3 rounded-md border border-gray-300"
                    >
                      <option value="">Select EIC</option>
                      {udata?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.full_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    // 📝 Default Text Input (including input9 for first_header)
                    <Field
                      type="text"
                      name={key}
                      // value={values[key]}
                      onChange={handleChange}
                      className="dark:bg-gray-dark input input-bordered w-full p-3 rounded-md border border-gray-300"
                      placeholder={
                        key === "input9"
                          ? "Enter First Header"
                          : `Input ${index + 1}`
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            {/* <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md"
                  >
                    Save
                  </button> */}
            {/* Navigation */}
            <div className="flex justify-between gap-2 mb-1">
              {[
                "roughing-ins",
                "wiring-ins",
                "device installation",
                "configuration",
                "Testing & commissioning",
                // "Save",
              ].map((label, index) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => setActiveNav(index + 1)}
                  className={`flex-1 py-2 rounded-md uppercase font-medium transition-all ${
                    activeNav === index + 1
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div>
              {/* Devices Section */}
              {/* {activeNav ===  && <EditLabor id={labor.id} />} */}
              {activeNav === 1 && <ActiveNav1 id={id!} />}
              {activeNav === 2 && <ActiveNav2 id={id!} />}

              {activeNav === 3 && <ActiveNav3 id={id!} />}
              {/* Unit Price{" "} */}
              {activeNav === 4 && <ActiveNav4 id={id!} />}
              {activeNav === 5 && <ActiveNav5 id={id!} />}
            </div>
            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              {/* <button
                className="py-2 px-6 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button> */}
              <Link
                className="btn text-black uppercase"
                href="/erp-v2/labor_of_computation"
              >
                back
              </Link>
              <button
                className="btn text-black uppercase"
                //   onClick={handleSave}
                type="submit"
              >
                update
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditForms;
