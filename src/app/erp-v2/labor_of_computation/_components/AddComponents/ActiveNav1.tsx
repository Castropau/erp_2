import { Boms, fetchBomList } from "@/api/bill_of_materials/fetchBill";
import { fetchDefaultsList } from "@/api/bill_of_materials/fetchDefaults";
import { BomUser, fetchbomUser } from "@/api/bill_of_materials/fetchUsers";
import { AddLabor, registerLabor } from "@/api/labor_of_computation/addLabor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

// }
const ActiveNav1 = () => {
  const [activeNav] = useState(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (activeNav === 1) {
      fetchDefaults(); // <- only fetch when nav = 1
    }
  }, [activeNav]);

  const {
    data: LaborData,
    // isLoading: Rloading,
    // isError: ReceiptError,
    // error: rerror,
    refetch: fetchDefaults,
  } = useQuery({
    queryKey: ["defaults"],
    queryFn: fetchDefaultsList,
    enabled: false, // prevent automatic fetch
  });

  // const {
  //   data: BomData,
  //   isLoading: Bloading,
  //   isError: BeceiptError,
  //   error: berror,
  // } = useQuery({
  //   queryKey: ["bom"],
  //   queryFn: fetchBomList,
  // });
  useEffect(() => {
    if (activeNav === 1) {
      fetchDefaults();
    }
  }, [activeNav]);

  // const {
  //   mutate: updatedLabor,
  //   isError,
  //   error,
  // } = useMutation({
  //   mutationFn: (data: AddLabor) => registerLabor(data),
  //   onSuccess: () => {
  //     console.log("registered successfully");
  //     queryClient.invalidateQueries({ queryKey: ["labor"] });
  //     // setShowRegisterModal(false);
  //   },
  //   onError: (error: any) => {
  //     console.error("Registration error:", error);
  //   },
  // });
  // const [showEditModal, setShowEditModal] = useState(false);
  const [deviceRows, setDeviceRows] = useState<DeviceRow[]>([]);

  // const [formData, setFormData] = useState({
  //   input1: LaborData?.bom_no || "",
  //   input2: LaborData?.date_created || "",
  //   input3: "",
  //   input4: "",
  //   input5: "",
  //   input6: "",
  //   input7: "",
  //   input8: "",
  // });
  const {
    // isLoading: Uloading,
    // error: uerror,
    // data: udata,
  } = useQuery<BomUser[]>({
    queryKey: ["users"],
    queryFn: fetchbomUser,
  });

  const {
    // isLoading: Clientloading,
    // error: clienterror,
    // data: clientdata,
  } = useQuery<Boms[]>({
    queryKey: ["bom"],
    queryFn: fetchBomList,
  });
  type SectionKey =
    | "roughing_ins"
    | "wiring_ins"
    | "device_installations"
    | "configurations"
    | "testing_and_commissionings";

  interface Subtitle {
    title: string;
    manuallyAdded: boolean;
    rows: MappedRowItem[];
  }

  interface SectionHeader {
    header: string;
    rows: Subtitle[];
    showSubHeaderButton: boolean;
  }

  // const newHeadersData: Record<SectionKey, SectionHeader[]> = {
  //   roughing_ins: [],
  //   wiring_ins: [],
  //   device_installations: [],
  //   configurations: [],
  //   testing_and_commissionings: [],
  // };
  interface Subtitle {
    title: string;
  }
  // useEffect(() => {
  //   if (LaborData && LaborData.length) {
  //     const sectionKeys = Object.keys(LaborData[0]) as SectionKey[];

  //     const newHeadersData: Record<SectionKey, SectionHeader[]> = {
  //       roughing_ins: [],
  //       wiring_ins: [],
  //       device_installations: [],
  //       configurations: [],
  //       testing_and_commissionings: [],
  //     };

  //     sectionKeys.forEach((sectionKey) => {
  //       const sectionArray = LaborData[0][sectionKey];

  //       if (Array.isArray(sectionArray)) {
  //         sectionArray.forEach((sectionEntry: any) => {
  //           const mainHeaderTitle =
  //             sectionEntry.header ||
  //             sectionKey.replace(/_/g, " ").toUpperCase();

  //           const subHeaders =
  //             sectionEntry.sub_headers?.length > 0
  //               ? sectionEntry.sub_headers
  //               : [
  //                   {
  //                     sub_header: "",
  //                     items: sectionEntry.items || [],
  //                   },
  //                 ];

  //           const formattedSubHeaders = subHeaders.map(
  //             (sub: any): Subtitle => ({
  //               title: sub.sub_header || "",
  //               manuallyAdded: false,
  //               rows:
  //                 sub.items?.map(
  //                   (item: any): MappedRowItem => ({
  //                     item: item.item || "",
  //                     ratio: item.ratio || "",
  //                     unit: item.unit || "",
  //                     quantity: 0,
  //                     manpower: "",
  //                     no_of_days: "",
  //                     labor_cost: 0,
  //                     per_unit_cost: "",
  //                   })
  //                 ) || [],
  //             })
  //           );

  //           const showSubHeaderButton = formattedSubHeaders.some(
  //             (sub: Subtitle) => sub.title === ""
  //           );

  //           newHeadersData[sectionKey].push({
  //             header: mainHeaderTitle,
  //             rows: formattedSubHeaders,
  //             showSubHeaderButton,
  //           });
  //         });
  //       }
  //     });

  //     setNewHeaders(newHeadersData.roughing_ins);
  //     // setNewHeaders2(newHeadersData.wiring_ins);
  //     // setNewHeaders3(newHeadersData.device_installations);
  //     // setNewHeaders4(newHeadersData.configurations);
  //     // setNewHeaders5(newHeadersData.testing_and_commissionings);
  //   }
  // }, [LaborData]);
  interface SectionEntry {
    id: number;
    header: string;
    items: LaborItem[];
    sub_headers: SubHeader[];
    items_sub_total: number;
    sub_headers_total: number;
  }
  interface SubHeader {
    id: number;
    sub_header: string;
    items: LaborItem[];
  }
  interface LaborItem {
    item: string;
    ratio: string;
    unit: string;
    quantity: number;
    labor_cost: number;
    manpower: string; // number in raw data, converted to string in MappedRowItem
    no_of_days: string; // number in raw data, converted to string in MappedRowItem
    total: string;
    per_unit_cost: string; // number in raw data, converted to string in MappedRowItem
    order: string;
    id: number;
  }
  useEffect(() => {
    const roughingIns = LaborData?.[0]?.roughing_ins;

    if (roughingIns && Array.isArray(roughingIns)) {
      const allHeaders: MappedHeader[] = roughingIns.map(
        (section: SectionEntry): MappedHeader => {
          const subHeaders: MappedSubHeader[] = Array.isArray(
            section.sub_headers
          )
            ? section.sub_headers.map(
                (sub: SubHeader): MappedSubHeader => ({
                  title: sub.sub_header,
                  rows: sub.items.map(
                    (item: LaborItem): MappedRowItem => ({
                      item: item.item,
                      ratio: item.ratio,
                      unit: item.unit,
                      quantity: item.quantity,
                      manpower: item.manpower,
                      no_of_days: item.no_of_days,
                      labor_cost: item.labor_cost,
                      per_unit_cost: item.per_unit_cost,
                    })
                  ),
                })
              )
            : [];

          const directItems: MappedSubHeader[] =
            section.items && section.items.length > 0
              ? [
                  {
                    title: "",
                    rows: section.items.map(
                      (item: LaborItem): MappedRowItem => ({
                        item: item.item,
                        ratio: item.ratio,
                        unit: item.unit,
                        quantity: item.quantity,
                        manpower: item.manpower,
                        no_of_days: item.no_of_days,
                        labor_cost: item.labor_cost,
                        per_unit_cost: item.per_unit_cost,
                      })
                    ),
                  },
                ]
              : [];

          return {
            header: section.header,
            rows: [...subHeaders, ...directItems],
          };
        }
      );

      setNewHeaders(allHeaders);
    }
  }, [LaborData]);
  const [newHeaders, setNewHeaders] = useState<MappedHeader[]>([]);

  const removeDeviceRow = (index: number) => {
    const updated = [...deviceRows];
    updated.splice(index, 1);
    setDeviceRows(updated);
  };

  const updateSubHeaderTitle = (
    headerIndex: number,
    subIndex: number,
    title: string
  ) => {
    const updatedHeaders = [...newHeaders];
    if (updatedHeaders[headerIndex]?.rows[subIndex]) {
      updatedHeaders[headerIndex].rows[subIndex].title = title;
      setNewHeaders(updatedHeaders);
    }
  };
  const updateDeviceRow = (
    rowIndex: number,
    key: keyof DeviceRow,
    value: string | number
  ) => {
    setDeviceRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        [key]: value,
      };
      return updatedRows;
    });
  };

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

  interface MappedSubHeader {
    // items: any;
    title: string;
    rows: MappedRowItem[];
  }

  interface MappedHeader {
    header: string;
    rows: MappedSubHeader[];
  }
  interface RoughingItems {
    // id: number,
    manpower: string;
    no_of_days: string;
    total: string;
    per_unit_cost: string;
    order: number;
    item: string;
    ratio: string;
    unit: string;
    quantity: number;
    labor_cost: number;
  }
  interface Roughing {
    // id: number,
    items: RoughingItems[];
    sub_headers: string;
    items_sub_total: string;
    sub_headers_total: string;
    total: string;
    header: string;
    sub_header: string;
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

  interface MappedSubHeader {
    title: string;
    rows: MappedRowItem[];
  }

  interface MappedHeader {
    header: string;
    rows: MappedSubHeader[];
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
  useEffect(() => {
    const roughingIns = LaborData?.[0]?.roughing_ins;

    if (roughingIns && Array.isArray(roughingIns)) {
      const allHeaders: MappedHeader[] = roughingIns.map(
        (section: Roughing): MappedHeader => {
          const subHeaders: MappedSubHeader[] = Array.isArray(
            (section as any).sub_headers
          )
            ? (section as any).sub_headers.map(
                (sub: any): MappedSubHeader => ({
                  title: sub.sub_header,
                  rows: sub.items.map(
                    (item: RoughingItems): MappedRowItem => ({
                      item: item.item,
                      ratio: item.ratio,
                      unit: item.unit,
                      quantity: item.quantity,
                      manpower: item.manpower,
                      no_of_days: item.no_of_days,
                      labor_cost: item.labor_cost,
                      per_unit_cost: item.per_unit_cost,
                    })
                  ),
                  // items: undefined,
                })
              )
            : [];

          const directItems: MappedSubHeader[] =
            section.items && section.items.length > 0
              ? [
                  {
                    title: "",
                    rows: section.items.map(
                      (item: RoughingItems): MappedRowItem => ({
                        item: item.item,
                        ratio: item.ratio,
                        unit: item.unit,
                        quantity: item.quantity,
                        manpower: item.manpower,
                        no_of_days: item.no_of_days,
                        labor_cost: item.labor_cost,
                        per_unit_cost: item.per_unit_cost,
                      })
                    ),
                    // items: undefined,
                  },
                ]
              : [];

          return {
            header: section.header,
            rows: [...subHeaders, ...directItems],
          };
        }
      );

      setNewHeaders(allHeaders);
    }
  }, [LaborData]);

  const updateNewHeaderMainTitle = (headerIndex: number, value: string) => {
    const updatedHeaders = [...newHeaders];
    if (updatedHeaders[headerIndex]) {
      updatedHeaders[headerIndex].header = value;
      setNewHeaders(updatedHeaders);
    }
  };

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
  interface MappedRowItems {
    item: string;
    ratio: string;
    unit: string;
    quantity: string;
    manpower: string;
    no_of_days: string;
    labor_cost: string;
    per_unit_cost: string;
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

  type RowField = keyof MappedRowItem;

  const updateNewHeaderRow = (
    headerIndex: number,
    subIndex: number,
    rowIndex: number,
    field: RowField,
    value: string
  ) => {
    const updatedHeaders = [...newHeaders];

    const row = updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex];

    if (field === "quantity" || field === "labor_cost") {
      (row[field] as unknown as number) = Number(value);
    } else {
      (row[field] as string) = value;
    }

    setNewHeaders(updatedHeaders);
  };

  const removeRowFromNewHeader = (
    headerIndex: number,
    subIndex: number,
    rowIndex: number
  ) => {
    const updatedHeaders = [...newHeaders];
    if (
      updatedHeaders[headerIndex] &&
      updatedHeaders[headerIndex].rows[subIndex] &&
      updatedHeaders[headerIndex].rows[subIndex].rows[rowIndex]
    ) {
      updatedHeaders[headerIndex].rows[subIndex].rows.splice(rowIndex, 1);
      setNewHeaders(updatedHeaders);
    }
  };
  const addRowToNewHeader = (headerIndex: number, subIndex: number) => {
    const updatedHeaders: MappedHeader[] = [...newHeaders];

    if (
      updatedHeaders[headerIndex] &&
      updatedHeaders[headerIndex].rows[subIndex]
    ) {
      updatedHeaders[headerIndex].rows[subIndex].rows.push({
        item: "",
        ratio: "",
        unit: "",
        quantity: 0,
        manpower: "",
        no_of_days: "",
        labor_cost: 0,
        per_unit_cost: "",
      });

      setNewHeaders(updatedHeaders);
    }
  };

  return (
    <>
      {activeNav === 1 && (
        <>
          <div className="space-y-1 text-sm">
            {/* <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={addHeader}
              >
                Add Header
              </button>
            </div> */}

            {/* Device Table */}
            <table className="table-auto w-full text-sm text-left border">
              <thead className="bg-gray-100 dark:bg-gray-dark">
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">ratio</th>
                  <th className="px-4 py-2">unit</th>
                  <th className="px-4 py-2">qty in manpower</th>
                  <th className="px-4 py-2">no of days</th>
                  <th className="px-4 py-2">labor cost total</th>
                  <th className="px-4 py-2">per unit cost</th>
                  <th className="px-4 py-2">action</th>
                </tr>
              </thead>
              <tbody>
                {deviceRows.map((row, index) => (
                  <tr key={index}>
                    {/* Device Row Inputs */}
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={row.item}
                        onChange={(e) =>
                          updateDeviceRow(index, "item", e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) =>
                          updateDeviceRow(index, "description", e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) => {
                          const updatedQuantity = parseFloat(e.target.value);
                          const updatedTotalAmount = updatedQuantity * row.srp; // Recalculate total_amount based on updated quantity
                          updateDeviceRow(index, "quantity", updatedQuantity);
                          updateDeviceRow(
                            index,
                            "total_amount",
                            updatedTotalAmount
                          ); // Update the total_amount field
                        }}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={row.unit_of_measurement}
                        onChange={(e) =>
                          updateDeviceRow(
                            index,
                            "unit_of_measurement",
                            e.target.value
                          )
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={row.srp} // Fetch only the srp (unit price) value from your API data
                        onChange={(e) => {
                          const updatedSrp = parseFloat(e.target.value);
                          const updatedTotalAmount = row.quantity * updatedSrp; // Recalculate total_amount based on updated SRP
                          updateDeviceRow(index, "srp", updatedSrp);
                          updateDeviceRow(
                            index,
                            "total_amount",
                            updatedTotalAmount
                          ); // Update total_amount
                        }}
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={row.total_amount} // Display total_amount as calculated
                        onChange={(e) => {
                          // If you want to allow reverse calculation, implement logic here
                          // Optionally: Recalculate quantity or srp based on the total amount
                        }}
                        readOnly // Optional: Make it readonly or editable depending on your requirements
                        className="w-full border p-1 rounded bg-gray-100 text-gray-700"
                      />
                    </td>

                    <td className="px-4 py-2">
                      <button
                        className="bg-white border border-red-800 text-white px-2 py-1 rounded"
                        onClick={() => removeDeviceRow(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {newHeaders.map((header, headerIndex) => (
              <div key={headerIndex} className="mb-8">
                {/* Main Header Title & First Sub Header Title in a single line */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  {/* Main Header Title */}
                  <input
                    type="text"
                    placeholder="Main Header Title"
                    value={header.header || ""}
                    onChange={(e) =>
                      updateNewHeaderMainTitle(headerIndex, e.target.value)
                    }
                    className="flex-1 min-w-[200px] p-2 border-2 border-red-500 rounded text-center font-bold uppercase"
                  />

                  {/* Conditionally render Sub Header Title only if value exists */}
                  {header.rows[0]?.title?.trim() && (
                    <input
                      type="text"
                      placeholder="Sub Header Title"
                      value={header.rows[0].title}
                      // onChange={(e) =>
                      //   updateNewHeaderRow(
                      //     headerIndex,
                      //     0,
                      //     0,
                      //     "title",
                      //     e.target.value
                      //   )
                      // }
                      onChange={
                        (e) =>
                          updateSubHeaderTitle(headerIndex, 0, e.target.value) // ✅ use index 0
                      }
                      className="flex-1 min-w-[200px] p-2 border-2 border-blue-500 rounded text-center font-semibold"
                    />
                  )}
                </div>

                {/* Remaining Sub Header Rows */}
                {header.rows.map((subHeader, subIndex) => (
                  <div key={subIndex} className="mb-6">
                    {subIndex !== 0 &&
                      (subHeader.title?.trim() || "").length > 0 && (
                        <div className="mb-2 flex justify-center">
                          <input
                            type="text"
                            placeholder="Sub Header Title"
                            value={subHeader.title || ""}
                            // onChange={(e) =>
                            //   updateNewHeaderRow(
                            //     headerIndex,
                            //     subIndex,
                            //     0,
                            //     "title",
                            //     e.target.value
                            //   )
                            // }
                            onChange={(e) =>
                              updateSubHeaderTitle(
                                headerIndex,
                                subIndex,
                                e.target.value
                              )
                            }
                            className="flex-1 min-w-[200px] p-2 border-2 border-blue-500 rounded text-center font-semibold"
                          />
                        </div>
                      )}

                    {/* Table */}
                    <div className="mt-2 text-left">
                      <button
                        type="button"
                        className="bg-white uppercase text-black border border-black px-4 py-2 rounded"
                        onClick={() => addRowToNewHeader(headerIndex, subIndex)}
                      >
                        Add Row
                      </button>
                    </div>
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                      <table
                        style={{ width: "100%" }}
                        className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg"
                      >
                        <thead className="bg-white text-black  border-b-gray-400">
                          <tr className="text-sm font-medium text-center uppercase">
                            {[
                              "Item",
                              "Ratio",
                              "Unit",
                              "Quantity",
                              "Manpower",
                              "No. of Days",
                              "Labor Cost",
                              "Per Unit Cost",
                              "Actions",
                            ].map((title) => (
                              <th key={title} className="px-4 py-2">
                                {title}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {subHeader.rows.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              // className={`${
                              //   rowIndex % 2 === 0
                              //     ? "bg-gray-100 dark:bg-gray-800"
                              //     : "bg-white dark:bg-gray-700"
                              // }`}
                            >
                              {(
                                [
                                  "item",
                                  "ratio",
                                  "unit",
                                  "quantity",
                                  "manpower",
                                  "no_of_days",
                                  "labor_cost",
                                  "per_unit_cost",
                                ] as (keyof MappedRowItem)[]
                              ).map((field) => (
                                <td key={field} className="">
                                  <input
                                    type="text"
                                    value={row[field] || ""}
                                    placeholder={field}
                                    onChange={(e) =>
                                      updateNewHeaderRow(
                                        headerIndex,
                                        subIndex,
                                        rowIndex,
                                        field,
                                        e.target.value
                                      )
                                    }
                                    className="w-full border border-gray-200  text-center p-1 rounded"
                                  />
                                </td>
                              ))}
                              <td className="px-4 py-2">
                                <button
                                  type="button"
                                  className="hover:cursor-pointer ml-2 text-xs text-red-700 hover:underline uppercase"
                                  onClick={() =>
                                    removeRowFromNewHeader(
                                      headerIndex,
                                      subIndex,
                                      rowIndex
                                    )
                                  }
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Add Row Button */}
                    {/* <div className="mt-2 text-left">
                      <button
                        type="button"
                        className="bg-white uppercase text-black border border-black px-4 py-2 rounded"
                        onClick={() => addRowToNewHeader(headerIndex, subIndex)}
                      >
                        Add Row
                      </button>
                    </div> */}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="text-right text-xl font-bold mt-6">
            {/* Total Amount: ₱{getTotalAmountIncludingNew().toFixed(2)} */}
          </div>
        </>
      )}
    </>
  );
};

export default ActiveNav1;
