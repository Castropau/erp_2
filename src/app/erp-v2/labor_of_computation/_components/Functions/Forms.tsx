import { Formik, Form, Field } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ActiveNav1 from "../AddComponents/ActiveNav1";
import ActiveNav2 from "../AddComponents/ActiveNav2";
import ActiveNav3 from "../AddComponents/ActiveNav3";
import ActiveNav4 from "../AddComponents/ActiveNav4";
import ActiveNav5 from "../AddComponents/ActiveNav5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBomList } from "@/api/bill_of_materials/fetchBill";
import { fetchDefaultsList } from "@/api/bill_of_materials/fetchDefaults";
import { AddLabor, registerLabor } from "@/api/labor_of_computation/addLabor";
import { BomUser, fetchbomUser } from "@/api/bill_of_materials/fetchUsers";

const Forms = () => {
  interface MappedRowItem {
    item: string;
    ratio: string;
    unit: string;
    quantity: number;
    manpower: string; // converting number to string on mapping
    no_of_days: number; // converting number to string on mapping
    labor_cost: number;
    per_unit_cost: string; // converting number to string on mapping
  }

  interface MappedSubHeader {
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
    no_of_days: number;
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
  interface MappedHeaders {
    sub_header: string;
    header: string;
    rows: MappedSubHeaders[];
  }
  interface MappedSubHeaders {
    order: string;
    labor_cost: string;
    manpower: string;
    quantity: number;
    unit: string;
    ratio: string;
    item: string;
    title: string;
    rows: MappedRowItems[];
  }
  interface MappedRowItems {
    order: string;
    item: string;
    ratio: string;
    unit: string;
    quantity: number;
    manpower: string;
    no_of_days: string;
    labor_cost: number;
    per_unit_cost: string;
  }
  interface TestingInstallItem {
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

  //   interface Heading {
  //     items: TestingInstallItem[];
  //     sub_header: string;
  //   }
  //   interface SubHeaderItem {
  //     sub_header?: string;
  //     items?: TestingInstallItem[];
  //   }

  interface TestingInstallItem {
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
  interface FormattedSubHeader {
    items: any;
    sub_header: string;
    title: string;
    manuallyAdded: boolean;
    rows: {
      item: string;
      ratio: string;
      unit: string;
      quantity: string;
      manpower: string;
      no_of_days: string;
      labor_cost: string;
      per_unit_cost: string;
    }[];
  }
  interface Subtitle {
    title: string;
  }

  interface LaborItem {
    item: string;
    ratio: string;
    unit: string;
    quantity: number;
    labor_cost: number;
    manpower: string; // number in raw data, converted to string in MappedRowItem
    no_of_days: number; // number in raw data, converted to string in MappedRowItem
    total: string;
    per_unit_cost: string; // number in raw data, converted to string in MappedRowItem
    order: string;
    id: number;
  }

  interface SubHeader {
    id: number;
    sub_header: string;
    items: LaborItem[];
  }

  interface SectionEntry {
    id: number;
    header: string;
    items: LaborItem[];
    sub_headers: SubHeader[];
    items_sub_total: number;
    sub_headers_total: number;
  }

  interface LaborSectionMap {
    roughing_ins: SectionEntry[];
    wiring_ins: SectionEntry[];
    device_installations: SectionEntry[];
    configurations: SectionEntry[];
    testing_and_commissionings: SectionEntry[];
  }

  interface FormattedSubHeader {
    title: string;
    manuallyAdded: boolean;
    rows: {
      item: string;
      ratio: string;
      unit: string;
      quantity: string;
      manpower: string;
      no_of_days: string;
      labor_cost: string;
      per_unit_cost: string;
    }[];
  }

  //   interface FormattedHeaderBlock {
  //     header: string;
  //     rows: FormattedSubHeader[];
  //     showSubHeaderButton: boolean;
  //   }
  //   interface RoughingSubHeaders {
  //     // id: number,
  //     items: SubRoughingHeadersItem;
  //     sub_header: string;
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

  interface ItemRow {
    item: string;
    ratio: string;
    unit: string;
    quantity: string;
    manpower: string;
    no_of_days: string;
    labor_cost: string;
    per_unit_cost: string;
  }

  interface SubHeaderBlock {
    title: string;
    manuallyAdded: boolean;
    rows: ItemRow[];
  }

  interface SectionHeader {
    items: never[];
    sub_headers: any;
    header: string;
    rows: SubHeaderBlock[];
    showSubHeaderButton: boolean;
  }
  const [newHeaders, setNewHeaders] = useState<MappedHeader[]>([]);
  const [newHeaders2, setNewHeaders2] = useState<MappedHeader[]>([]);
  const [newHeaders3, setNewHeaders3] = useState<MappedHeader[]>([]);
  const [newHeaders4, setNewHeaders4] = useState<MappedHeader[]>([]);
  const [newHeaders5, setNewHeaders5] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);
  const [showSuccess, setShowSuccess] = useState(false);

  //   const [setIsEditing] = useState(false); // New state to track edit mode
  const [activeNav, setActiveNav] = useState(1);

  const queryClient = useQueryClient();

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
    // refetch: fetchDefaults,
  } = useQuery({
    queryKey: ["defaults"],
    queryFn: fetchDefaultsList,
    enabled: false, // prevent automatic fetch
  });

  useEffect(() => {
    if (!LaborData || !LaborData.length) return;

    const sectionKeys = Object.keys(LaborData[0]);

    const newHeadersData = {
      roughing_ins: [],
      wiring_ins: [],
      device_installations: [],
      configurations: [],
      testing_and_commissionings: [],
    } as Record<string, any[]>;

    sectionKeys.forEach((sectionKey) => {
      const sectionArray = LaborData[0][sectionKey as keyof LaborSectionMap];

      if (Array.isArray(sectionArray)) {
        sectionArray.forEach((sectionEntry: SectionHeader) => {
          const mainHeaderTitle =
            sectionEntry.header || sectionKey.replace(/_/g, " ").toUpperCase();

          const subHeaders = sectionEntry.sub_headers?.length
            ? sectionEntry.sub_headers
            : [
                {
                  sub_header: "",
                  items: sectionEntry.items || [],
                },
              ];

          const formattedSubHeaders = subHeaders.map(
            (sub: FormattedSubHeader) => ({
              title: sub.sub_header || "",
              manuallyAdded: false,
              rows:
                sub.items?.map((item: TestingInstallItem) => ({
                  item: item.item || "",
                  ratio: item.ratio || "",
                  unit: item.unit || "",
                  quantity: "",
                  manpower: "",
                  no_of_days: "",
                  labor_cost: item.labor_cost?.toString() || "",
                  per_unit_cost: "",
                })) || [],
            })
          );

          const showSubHeaderButton = formattedSubHeaders.some(
            (sub: Subtitle) => sub.title === ""
          );

          newHeadersData[sectionKey].push({
            header: mainHeaderTitle,
            rows: formattedSubHeaders,
            showSubHeaderButton,
          });
        });
      }
    });

    setNewHeaders(newHeadersData.roughing_ins);
    setNewHeaders2(newHeadersData.wiring_ins);
    setNewHeaders3(newHeadersData.device_installations);
    setNewHeaders4(newHeadersData.configurations);
    setNewHeaders5(newHeadersData.testing_and_commissionings);
  }, [LaborData]);

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

  //   useEffect(() => {
  //     const roughingIns = LaborData?.[0]?.roughing_ins;

  //     if (roughingIns && Array.isArray(roughingIns)) {
  //       const allHeaders: MappedHeader[] = roughingIns.map(
  //         (section: Roughing): MappedHeader => {
  //           const subHeaders: MappedSubHeader[] = Array.isArray(
  //             (section as any).sub_headers
  //           )
  //             ? (section as any).sub_headers.map(
  //                 (sub: any): MappedSubHeader => ({
  //                   title: sub.sub_header,
  //                   rows: sub.items.map(
  //                     (item: RoughingItems): MappedRowItem => ({
  //                       item: item.item,
  //                       ratio: item.ratio,
  //                       unit: item.unit,
  //                       quantity: item.quantity,
  //                       manpower: item.manpower,
  //                       no_of_days: item.no_of_days,
  //                       labor_cost: item.labor_cost,
  //                       per_unit_cost: item.per_unit_cost,
  //                     })
  //                   ),
  //                   //   items: undefined,
  //                 })
  //               )
  //             : [];

  //           const directItems: MappedSubHeader[] =
  //             section.items && section.items.length > 0
  //               ? [
  //                   {
  //                     title: "",
  //                     rows: section.items.map(
  //                       (item: RoughingItems): MappedRowItem => ({
  //                         item: item.item,
  //                         ratio: item.ratio,
  //                         unit: item.unit,
  //                         quantity: item.quantity,
  //                         manpower: item.manpower,
  //                         no_of_days: item.no_of_days,
  //                         labor_cost: item.labor_cost,
  //                         per_unit_cost: item.per_unit_cost,
  //                       })
  //                     ),
  //                     // items: undefined,
  //                   },
  //                 ]
  //               : [];

  //           return {
  //             header: section.header,
  //             rows: [...subHeaders, ...directItems],
  //           };
  //         }
  //       );

  //       setNewHeaders(allHeaders);
  //     }
  //   }, [LaborData]);

  useEffect(() => {
    const wiringIns = LaborData?.[0]?.wiring_ins;

    if (wiringIns && Array.isArray(wiringIns)) {
      const allHeaders: MappedHeader[] = wiringIns.map(
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

      setNewHeaders2(allHeaders);
    }
  }, [LaborData]);

  //   useEffect(() => {
  //     const roughingIns = LaborData?.[0]?.wiring_ins;

  //     if (roughingIns && Array.isArray(roughingIns)) {
  //       const allHeaders: MappedHeader[] = roughingIns.map(
  //         (section: Roughing): MappedHeader => {
  //           const subHeaders: MappedSubHeader[] = Array.isArray(
  //             (section as any).sub_headers
  //           )
  //             ? (section as any).sub_headers.map(
  //                 (sub: any): MappedSubHeader => ({
  //                   title: sub.sub_header,
  //                   rows: sub.items.map(
  //                     (item: RoughingItems): MappedRowItem => ({
  //                       item: item.item,
  //                       ratio: item.ratio,
  //                       unit: item.unit,
  //                       quantity: item.quantity,
  //                       manpower: item.manpower,
  //                       no_of_days: item.no_of_days,
  //                       labor_cost: item.labor_cost,
  //                       per_unit_cost: item.per_unit_cost,
  //                     })
  //                   ),
  //                   //   items: undefined,
  //                 })
  //               )
  //             : [];

  //           const directItems: MappedSubHeader[] =
  //             section.items && section.items.length > 0
  //               ? [
  //                   {
  //                     title: "",
  //                     rows: section.items.map(
  //                       (item: RoughingItems): MappedRowItem => ({
  //                         item: item.item,
  //                         ratio: item.ratio,
  //                         unit: item.unit,
  //                         quantity: item.quantity,
  //                         manpower: item.manpower,
  //                         no_of_days: item.no_of_days,
  //                         labor_cost: item.labor_cost,
  //                         per_unit_cost: item.per_unit_cost,
  //                       })
  //                     ),
  //                     // items: undefined,
  //                   },
  //                 ]
  //               : [];

  //           return {
  //             header: section.header,
  //             rows: [...subHeaders, ...directItems],
  //           };
  //         }
  //       );

  //       setNewHeaders2(allHeaders);
  //     }
  //   }, [LaborData]);

  useEffect(() => {
    const deviceInstallations = LaborData?.[0]?.device_installations;

    if (deviceInstallations && Array.isArray(deviceInstallations)) {
      const allHeaders: MappedHeader[] = deviceInstallations.map(
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

      setNewHeaders3(allHeaders);
    }
  }, [LaborData]);

  //   useEffect(() => {
  //     const roughingIns = LaborData?.[0]?.device_installations;

  //     if (roughingIns && Array.isArray(roughingIns)) {
  //       const allHeaders: MappedHeader[] = roughingIns.map(
  //         (section: Roughing): MappedHeader => {
  //           const subHeaders: MappedSubHeader[] = Array.isArray(
  //             (section as any).sub_headers
  //           )
  //             ? (section as any).sub_headers.map(
  //                 (sub: any): MappedSubHeader => ({
  //                   title: sub.sub_header,
  //                   rows: sub.items.map(
  //                     (item: RoughingItems): MappedRowItem => ({
  //                       item: item.item,
  //                       ratio: item.ratio,
  //                       unit: item.unit,
  //                       quantity: item.quantity,
  //                       manpower: item.manpower,
  //                       no_of_days: item.no_of_days,
  //                       labor_cost: item.labor_cost,
  //                       per_unit_cost: item.per_unit_cost,
  //                     })
  //                   ),
  //                   //   items: undefined,
  //                 })
  //               )
  //             : [];

  //           const directItems: MappedSubHeader[] =
  //             section.items && section.items.length > 0
  //               ? [
  //                   {
  //                     title: "",
  //                     rows: section.items.map(
  //                       (item: RoughingItems): MappedRowItem => ({
  //                         item: item.item,
  //                         ratio: item.ratio,
  //                         unit: item.unit,
  //                         quantity: item.quantity,
  //                         manpower: item.manpower,
  //                         no_of_days: item.no_of_days,
  //                         labor_cost: item.labor_cost,
  //                         per_unit_cost: item.per_unit_cost,
  //                       })
  //                     ),
  //                     // items: undefined,
  //                   },
  //                 ]
  //               : [];

  //           return {
  //             header: section.header,
  //             rows: [...subHeaders, ...directItems],
  //           };
  //         }
  //       );

  //       setNewHeaders3(allHeaders);
  //     }
  //   }, [LaborData]);

  useEffect(() => {
    const roughingIns = LaborData?.[0]?.configurations;

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
                      manpower: item.manpower, // manpower is number, convert to string for MappedRowItem
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

      setNewHeaders4(allHeaders);
    }
  }, [LaborData]);

  //   useEffect(() => {
  //     const roughingIns = LaborData?.[0]?.configurations;

  //     if (roughingIns && Array.isArray(roughingIns)) {
  //       const allHeaders: MappedHeader[] = roughingIns.map(
  //         (section: Roughing): MappedHeader => {
  //           const subHeaders: MappedSubHeader[] = Array.isArray(
  //             (section as any).sub_headers
  //           )
  //             ? (section as any).sub_headers.map(
  //                 (sub: any): MappedSubHeader => ({
  //                   title: sub.sub_header,
  //                   rows: sub.items.map(
  //                     (item: RoughingItems): MappedRowItem => ({
  //                       item: item.item,
  //                       ratio: item.ratio,
  //                       unit: item.unit,
  //                       quantity: item.quantity,
  //                       manpower: item.manpower,
  //                       no_of_days: item.no_of_days,
  //                       labor_cost: item.labor_cost,
  //                       per_unit_cost: item.per_unit_cost,
  //                     })
  //                   ),
  //                   items: undefined,
  //                 })
  //               )
  //             : [];

  //           const directItems: MappedSubHeader[] =
  //             section.items && section.items.length > 0
  //               ? [
  //                   {
  //                     title: "",
  //                     rows: section.items.map(
  //                       (item: RoughingItems): MappedRowItem => ({
  //                         item: item.item,
  //                         ratio: item.ratio,
  //                         unit: item.unit,
  //                         quantity: item.quantity,
  //                         manpower: item.manpower,
  //                         no_of_days: item.no_of_days,
  //                         labor_cost: item.labor_cost,
  //                         per_unit_cost: item.per_unit_cost,
  //                       })
  //                     ),
  //                     items: undefined,
  //                   },
  //                 ]
  //               : [];

  //           return {
  //             header: section.header,
  //             rows: [...subHeaders, ...directItems],
  //           };
  //         }
  //       );

  //       setNewHeaders4(allHeaders);
  //     }
  //   }, [LaborData]);
  const {
    mutate: updatedLabor,
    // isError,
    // error,
  } = useMutation({
    mutationFn: (data: AddLabor) => registerLabor(data),
    onSuccess: () => {
      console.log("registered successfully");
      queryClient.invalidateQueries({ queryKey: ["labor"] });
      // setShowRegisterModal(false);
    },
    onError: (error) => {
      console.error("Registration error:", error);
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
          <span>submitted successfully!</span>
        </div>
      )}
      <Formik
        initialValues={{
          input1: "",
          // input4:
          //   BomData?.find(
          //     (bom) => bom.bom_no === LaborData?.bom
          //   )?.id?.toString() || "",
          input4:
            BomData?.find(
              (bom) => bom.bom_no === LaborData?.[0]?.bom
            )?.id?.toString() || "",
          input7: "",
          input8: "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          const processHeaders = (headersArray: MappedHeaders[]) =>
            headersArray
              .filter((header) => header.rows?.length > 0) // Filter headers with rows
              .map((header, headerIndex) => ({
                header: header.header || `Header ${headerIndex + 1}`,
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
                    sub_header:
                      sub.title ||
                      // header.subHeaderInput ||
                      header.sub_header ||
                      `Sub Header ${subIndex + 1}`,
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
            project_name: values.input1,
            bom: values.input4,
            system: values.input7,
            project_duration: values.input8,
            roughing_ins: processHeaders(
              newHeaders as unknown as MappedHeaders[]
            ),
            wiring_ins: processHeaders(
              newHeaders2 as unknown as MappedHeaders[]
            ),
            device_installations: processHeaders(
              newHeaders3 as unknown as MappedHeaders[]
            ),
            configurations: processHeaders(
              newHeaders4 as unknown as MappedHeaders[]
            ),
            testing_and_commissionings: processHeaders(
              newHeaders5 as unknown as MappedHeaders[]
            ),
          };

          console.log("Submitting form data:", formData);

          try {
            await updatedLabor(formData);
            console.log(formData);

            // setIsEditing(false);
            setShowSuccess(true); // Show the success alert

            setTimeout(() => {
              window.location.href = "/erp-v2/labor_of_computation/"; // 🔁 Redirect to dashboard
            }, 2000);
          } catch (error) {
            console.error("Submission failed:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 mb-1 text-start">
              {Object.keys(values).map((key, index) => {
                const fieldMetadata: Record<
                  string,
                  { label: string; placeholder: string }
                > = {
                  input1: {
                    label: "Project Name",
                    placeholder: "Enter Project Name",
                  },
                  input3: { label: "SIC", placeholder: "Select SIC" },
                  input4: { label: "BOM", placeholder: "Select BOM" },
                  input5: { label: "Status", placeholder: "Select Status" },
                  input6: { label: "EIC", placeholder: "Select EIC" },
                  input7: { label: "System", placeholder: "Enter System" },
                  input8: {
                    label: "Project Duration",
                    placeholder: "Enter Project Duration",
                  },
                  input9: {
                    label: "First Header",
                    placeholder: "Enter First Header",
                  },
                };

                const metadata = fieldMetadata[key] || {
                  label: `Input ${index + 1}`,
                  placeholder: `Input ${index + 1}`,
                };

                return (
                  <div key={key} className="flex flex-col">
                    <label className="text-sm font-bold uppercase">
                      {metadata.label}
                    </label>

                    {key === "input3" ? (
                      <select
                        name={key}
                        onChange={handleChange}
                        className="input input-bordered w-full p-3 rounded-md border border-gray-300"
                      >
                        <option value="">{metadata.placeholder}</option>
                        {udata?.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.full_name}
                          </option>
                        ))}
                      </select>
                    ) : key === "input4" ? (
                      <select
                        name={key}
                        value={values[key]}
                        onChange={handleChange}
                        className="dark:bg-gray-dark input input-bordered w-full rounded-md border border-gray-300"
                      >
                        <option value="">{metadata.placeholder}</option>
                        {BomData?.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.bom_no}
                          </option>
                        ))}
                      </select>
                    ) : key === "input5" ? (
                      <select
                        name={key}
                        onChange={handleChange}
                        className="input input-bordered w-full p-3 rounded-md border border-gray-300"
                      >
                        <option value="">{metadata.placeholder}</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Revise">Revise</option>
                        <option value="Noted">Noted</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    ) : key === "input6" ? (
                      <select
                        name={key}
                        onChange={handleChange}
                        className="input input-bordered w-full p-3 rounded-md border border-gray-300"
                      >
                        <option value="">{metadata.placeholder}</option>
                        {udata?.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.full_name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Field
                        type="text"
                        name={key}
                        onChange={handleChange}
                        className="dark:bg-gray-dark input input-bordered w-full p-3 rounded-md border border-gray-300"
                        placeholder={metadata.placeholder}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between gap-2 mb-1 text-sm">
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
                  className={`flex-1 rounded-md uppercase font-medium transition-all ${
                    activeNav === index + 1
                      ? "btn bg-blue-500 text-white shadow-md"
                      : "btn bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {activeNav === 1 && <ActiveNav1 />}

            {activeNav === 2 && <ActiveNav2 />}
            {activeNav === 3 && <ActiveNav3 />}
            {/* Unit Price{" "} */}
            {activeNav === 4 && <ActiveNav4 />}
            {activeNav === 5 && <ActiveNav5 />}
            {/* Render Saved Headers */}
            {/* <div className="mt-6 space-y-4">
                              {headers4.map((header, hIdx) => (
                                <div
                                  key={hIdx}
                                  className="border p-4 bg-gray-50 rounded space-y-2"
                                >
                                  <h3 className="text-xl font-semibold">
                                    {header.title}
                                  </h3>
                                  <table className="table-auto w-full text-sm text-left text-gray-700">
                                    <thead className="bg-gray-200">
                                      <tr>
                                        <th className="px-4 py-2">Item</th>
                                        <th className="px-4 py-2">Description</th>
                                        <th className="px-4 py-2">Quantity</th>
                                        <th className="px-4 py-2">Unit Price</th>
                                        <th className="px-4 py-2">Amount</th>
                                        <th className="px-4 py-2">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {header.rows.map((row, rIdx) => (
                                        <tr key={rIdx}>
                                          {[
                                            "item",
                                            "description",
                                            "quantity",
                                            "unitPrice",
                                            "amount",
                                          ].map((field) => (
                                            <td key={field} className="px-4 py-2">
                                              <input
                                                type="text"
                                                value={row[field as keyof DeviceRow]}
                                                onChange={(e) =>
                                                  updateHeaderRow4(
                                                    hIdx,
                                                    rIdx,
                                                    field as keyof DeviceRow,
                                                    e.target.value
                                                  )
                                                }
                                                className="p-2 border rounded"
                                              />
                                            </td>
                                          ))}
                                          <td className="px-4 py-2">
                                            <button
                                              className="bg-red-500 text-white px-2 py-1 rounded"
                                              onClick={() => removeHeaderRow4(hIdx, rIdx)}
                                            >
                                              Remove
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
          
                                  <div className="text-right text-sm font-semibold text-gray-700 mt-2">
                                    Subtotal: ₱
                                    {getHeaderSubtotal4(header.rows).toFixed(2)}
                                  </div>
          
                                  <button
                                    className="bg-green-500 text-white px-4 py-1 rounded mt-2"
                                    onClick={() => addRowToHeader4(hIdx)}
                                  >
                                    Add Row
                                  </button>
                                </div>
                              ))}
                            </div> */}
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
                {" "}
                back
              </Link>
              <button
                className="btn text-black uppercase"
                //   onClick={handleSave}
                type="submit"
              >
                submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forms;
