// import { fetchbomId } from "@/api/bill_of_materials/fetchBomId";
import { BomId, fetchbomId } from "@/api/bill_of_materials/fetchBomId";
import { fetchbomClient } from "@/api/bill_of_materials/fetchClients";
import { fetchbomUser } from "@/api/bill_of_materials/fetchUsers";
import { updateBomId, updatebomId } from "@/api/bill_of_materials/updateBomId";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

interface DeviceRow {
  item: string;
  description: string;
  quantity: string;
  unit_of_measurement: string;
  //   amount: string;
  srp: number;
}
interface BomIds {
  id: number;
}
const EditBom = (props: BomIds) => {
  const queryClient = useQueryClient();

  const { id } = props;
  const {
    data: BomData,
    isLoading: Rloading,
    isError: ReceiptError,
    error: rerror,
  } = useQuery({
    queryKey: ["bom", id],
    queryFn: () => fetchbomId(id),
    enabled: !!id,
  });
  const { mutate: updateBom } = useMutation({
    mutationFn: (data: updateBomId) => updatebomId(id, data),
    onSuccess: () => {
      console.log("delivery updated successfully");
      queryClient.invalidateQueries({ queryKey: ["bom", id] });
    },
    onError: (error) => {
      console.error("Error updating quotation:", error);
    },
  });
  const [activeNav, setActiveNav] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deviceRows, setDeviceRows] = useState<DeviceRow[]>([]);

  const [formData, setFormData] = useState({
    input1: BomData?.bom_no || "",
    input2: BomData?.date_created || "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
  });
  const {
    isLoading: Uloading,
    error: uerror,
    data: udata,
  } = useQuery<BomUser[]>({
    queryKey: ["users"],
    queryFn: fetchbomUser,
  });
  const {
    isLoading: Clientloading,
    error: clienterror,
    data: clientdata,
  } = useQuery<ClientUser[]>({
    queryKey: ["client"],
    queryFn: fetchbomClient,
  });

  useEffect(() => {
    if (BomData && BomData.device_header) {
      const headersFromData = BomData.device_header.map((header) => ({
        title: header.header || "",
        rows: header.items.map((item) => ({
          item: item.item,
          description: item.description,
          quantity: item.quantity.toString(),
          unit_of_measurement: item.unit_of_measurement.toString(),
          srp: item.srp,
        })),
      }));

      setNewHeaders(headersFromData);
    }
  }, [BomData]);

  useEffect(() => {
    if (BomData?.device_items) {
      // If device_items is an array:
      const devices = Array.isArray(BomData.device_items)
        ? BomData.device_items
        : [BomData.device_items]; // fallback for single item

      const formattedDevices = devices.map((device) => ({
        item: device.item || "",
        description: device.description || "",
        quantity: device.quantity || 0,
        unit_of_measurement: device.unit_of_measurement || "", // or you can hardcode a default
        // srp: device.item.srp || 0,
        srp: device.srp || 0,

        // total_amount: device.total_amount || 0, // Fetching the total_amount
        // total_amount: device.srp * device.quantity || 0,
        // total_amount: (device.srp || 0) * (device.quantity || 0), // ✅ computed from srp * quantity
        total_amount: (device.srp || 0) * (device.quantity || 0), // ✅ computed from srp * quantity
      }));

      setDeviceRows(formattedDevices);
    }
  }, [BomData]);
  useEffect(() => {
    if (BomData) {
      setFormData({
        input1: BomData.bom_no || "",
        input2: BomData.date_created || "", // Add any other default values as needed
        input3: BomData.sic.full_name || "",
        input4: BomData.client.client || "",
        input5: BomData.status || "",
        input6: BomData.eic.full_name || "",
        input7: BomData.project_name || "",
        input8: BomData.project_site || "",
      });
    }
  }, [BomData]);

  // Handle changes in input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [headers, setHeaders] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);
  const [newHeaders, setNewHeaders] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);

  const handleSave = () => {
    console.log("Form Data:", formData);
    console.log("Device Rows:", deviceRows);
    console.log("Headers:", headers);
    setShowEditModal(false);
  };

  const removeDeviceRow = (index: number) => {
    const updated = [...deviceRows];
    updated.splice(index, 1);
    setDeviceRows(updated);
  };

  const addHeader = () => {
    setNewHeaders([
      ...newHeaders,
      {
        title: "",
        rows: [
          {
            item: "",
            description: "",
            quantity: "",
            unit_of_measurement: "",
            srp: 0,
          },
        ],
      },
    ]);
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

  //   const addHeader = (e?: React.MouseEvent<HTMLButtonElement>) => {
  //     e?.preventDefault(); // prevent default form behavior if event passed

  //     setNewHeaders((prev) => [
  //       ...prev,
  //       {
  //         title: "",
  //         rows: [
  //           {
  //             item: "",
  //             description: "",
  //             quantity: "",
  //             unit_of_measurement: "",
  //             amount: "",
  //           },
  //         ],
  //       },
  //     ]);
  //   };

  //   const updateNewHeaderTitle = (index: number, value: string) => {
  //     const updated = [...newHeaders];
  //     updated[index].title = value;
  //     setNewHeaders(updated);
  //   };
  const updateNewHeaderTitle = (headerIndex: number, newTitle: string) => {
    setNewHeaders((prevHeaders) => {
      const updatedHeaders = [...prevHeaders];
      updatedHeaders[headerIndex].title = newTitle;
      return updatedHeaders;
    });
  };

  //   const updateNewHeaderRow = (
  //     headerIndex: number,
  //     rowIndex: number,
  //     key: keyof DeviceRow,
  //     value: string
  //   ) => {
  //     const updated = [...newHeaders];
  //     const row = updated[headerIndex].rows[rowIndex];
  //     row[key] = value;

  //     const quantity = parseFloat(row.quantity);
  //     const unitPrice = parseFloat(row.unitPrice);
  //     row.amount =
  //       !isNaN(quantity) && !isNaN(unitPrice)
  //         ? (quantity * unitPrice).toFixed(2)
  //         : "";

  //     setNewHeaders(updated);
  //   };
  const updateNewHeaderRow = (
    headerIndex: number,
    rowIndex: number,
    field: keyof DeviceRow,
    newValue: string
  ) => {
    setNewHeaders((prevHeaders) => {
      const updatedHeaders = [...prevHeaders];
      updatedHeaders[headerIndex].rows[rowIndex][field] = newValue;
      return updatedHeaders;
    });
  };

  const addRowToNewHeader = (headerIndex: number) => {
    const updated = [...newHeaders];
    updated[headerIndex].rows.push({
      item: "",
      description: "",
      quantity: "",
      unit_of_measurement: "",
      srp: 0,
    });
    setNewHeaders(updated);
  };
  //   const addRowToNewHeader = (headerIndex: number) => {
  //     setNewHeaders((prevHeaders) => {
  //       const updatedHeaders = [...prevHeaders];
  //       updatedHeaders[headerIndex].rows.push({
  //         item: "",
  //         description: "",
  //         quantity: "",
  //         unit_of_measurement: "",
  //         amount: "",
  //       });
  //       return updatedHeaders;
  //     });
  //   };
  //   const addRowToNewHeader = (headerIndex: number) => {
  //     setNewHeaders((prevHeaders) => {
  //       const updatedHeaders = [...prevHeaders];

  //       // Ensure that we are adding only one row and not multiple
  //       updatedHeaders[headerIndex].rows = [
  //         ...updatedHeaders[headerIndex].rows,
  //         {
  //           item: "",
  //           description: "",
  //           quantity: "",
  //           unit_of_measurement: "",
  //           amount: "",
  //         },
  //       ];

  //       return updatedHeaders;
  //     });
  //   };

  //   const removeRowFromNewHeader = (headerIndex: number, rowIndex: number) => {
  //     const updated = [...newHeaders];
  //     updated[headerIndex].rows.splice(rowIndex, 1);
  //     setNewHeaders(updated);
  //   };
  const removeRowFromNewHeader = (headerIndex: number, rowIndex: number) => {
    setNewHeaders((prevHeaders) => {
      const updatedHeaders = [...prevHeaders];
      updatedHeaders[headerIndex].rows.splice(rowIndex, 1);
      return updatedHeaders;
    });
  };

  const saveNewHeader = (index: number) => {
    const headerToSave = newHeaders[index];
    if (!headerToSave.title.trim()) return;
    setHeaders([...headers, headerToSave]);
    const updated = [...newHeaders];
    updated.splice(index, 1);
    setNewHeaders(updated);
  };

  const cancelNewHeader = (index: number) => {
    const updated = [...newHeaders];
    updated.splice(index, 1);
    setNewHeaders(updated);
  };

  const addRowToHeader = (headerIndex: number) => {
    const updated = [...headers];
    updated[headerIndex].rows.push({
      item: "",
      description: "",
      quantity: "",
      unit_of_measurement: "",
      amount: "",
    });
    setHeaders(updated);
  };

  const updateHeaderRow = (
    headerIndex: number,
    rowIndex: number,
    key: keyof DeviceRow,
    value: string
  ) => {
    const updated = [...headers];
    const row = updated[headerIndex].rows[rowIndex];
    row[key] = value;

    const quantity = parseFloat(row.quantity);
    const unit_of_measurement = parseFloat(row.unit_of_measurement);
    row.amount =
      !isNaN(quantity) && !isNaN(unit_of_measurement)
        ? (quantity * unit_of_measurement).toFixed(2)
        : "";

    setHeaders(updated);
  };

  const removeHeaderRow = (headerIndex: number, rowIndex: number) => {
    const updated = [...headers];
    updated[headerIndex].rows.splice(rowIndex, 1);
    setHeaders(updated);
  };
  const getHeaderSubtotal = (rows: DeviceRow[]) => {
    return rows.reduce((sum, row) => {
      const amount = parseFloat(row.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };

  const getTotalAmountIncludingNew = () => {
    const savedTotal = headers.reduce((sum, header) => {
      return sum + getHeaderSubtotal(header.rows);
    }, 0);

    const newHeadersTotal = newHeaders.reduce((sum, newHeader) => {
      return sum + getNewHeaderSubtotal(newHeader.rows);
    }, 0);

    return savedTotal + newHeadersTotal;
  };

  //   const getNewHeaderSubtotal = (rows: DeviceRow[]) => {
  //     return rows.reduce((sum, row) => {
  //       const amount = parseFloat(row.amount);
  //       return sum + (isNaN(amount) ? 0 : amount);
  //     }, 0);
  //   };
  const getNewHeaderSubtotal = (rows: DeviceRow[]) => {
    return rows.reduce((total, row) => {
      const quantity = parseFloat(row.quantity) || 0;
      const unit_of_measurement = parseFloat(row.unit_of_measurement) || 0;
      return total + quantity * unit_of_measurement;
    }, 0);
  };

  const [deviceRows2, setDeviceRows2] = useState<DeviceRow[]>([]);
  const [newHeaders2, setNewHeaders2] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);
  const [headers2, setHeaders2] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);
  const addHeader2 = () => {
    setNewHeaders2([
      ...newHeaders2,
      {
        title: "",
        rows: [
          {
            item: "",
            description: "",
            quantity: "",
            unitPrice: "",
            amount: "",
          },
        ],
      },
    ]);
  };
  const updateNewHeaderTitle2 = (index: number, value: string) => {
    const updated = [...newHeaders2];
    updated[index].title = value;
    setNewHeaders2(updated);
  };

  const updateNewHeaderRow2 = (
    headerIndex: number,
    rowIndex: number,
    key: keyof DeviceRow,
    value: string
  ) => {
    const updated = [...newHeaders2];
    const row = updated[headerIndex].rows[rowIndex];
    row[key] = value;

    const quantity = parseFloat(row.quantity);
    const unitPrice = parseFloat(row.unitPrice);
    row.amount =
      !isNaN(quantity) && !isNaN(unitPrice)
        ? (quantity * unitPrice).toFixed(2)
        : "";

    setNewHeaders2(updated);
  };
  const addRowToNewHeader2 = (headerIndex: number) => {
    const updated = [...newHeaders2];
    updated[headerIndex].rows.push({
      item: "",
      description: "",
      quantity: "",
      unitPrice: "",
      amount: "",
    });
    setNewHeaders2(updated);
  };

  const removeRowFromNewHeader2 = (headerIndex: number, rowIndex: number) => {
    const updated = [...newHeaders2];
    updated[headerIndex].rows.splice(rowIndex, 1);
    setNewHeaders2(updated);
  };
  const saveNewHeader2 = (index: number) => {
    const headerToSave = newHeaders2[index];
    if (!headerToSave.title.trim()) return;
    setHeaders2([...headers2, headerToSave]);
    const updated = [...newHeaders2];
    updated.splice(index, 1);
    setNewHeaders2(updated);
  };

  const cancelNewHeader2 = (index: number) => {
    const updated = [...newHeaders2];
    updated.splice(index, 1);
    setNewHeaders2(updated);
  };
  const getNewHeaderSubtotal2 = (rows: DeviceRow[]) => {
    return rows.reduce((sum, row) => {
      const amount = parseFloat(row.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };

  const getTotalAmountIncludingNew2 = () => {
    const savedTotal = headers2.reduce((sum, header) => {
      return sum + getHeaderSubtotal(header.rows);
    }, 0);

    const newHeadersTotal = newHeaders2.reduce((sum, newHeader) => {
      return sum + getNewHeaderSubtotal2(newHeader.rows);
    }, 0);

    return savedTotal + newHeadersTotal;
  };
  const removeDeviceRow2 = (index: number) => {
    const updated = [...deviceRows2];
    updated.splice(index, 1);
    setDeviceRows2(updated);
  };

  useEffect(() => {
    if (BomData?.material_header) {
      const headersFromMaterial = BomData.material_header.map((header) => ({
        title: header.header || "Untitled Header",
        rows: header.items.map((item) => ({
          item: item.item,
          description: item.description,
          quantity: item.quantity.toString(),
          unit_of_measurement: item.unit_of_measurement,
          srp: item.srp.toString(),
          amount: item.total_amount.toString(),
        })),
      }));

      setNewHeaders2(headersFromMaterial);
    }
  }, [BomData]);

  const [deviceRows3, setDeviceRows3] = useState<DeviceRow[]>([]);
  const [newHeaders3, setNewHeaders3] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);
  const [headers3, setHeaders3] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);

  const addHeader3 = () => {
    setNewHeaders3([
      ...newHeaders3,
      {
        title: "",
        rows: [
          {
            item: "",
            description: "",
            quantity: "",
            unitPrice: "",
            amount: "",
          },
        ],
      },
    ]);
  };
  const updateNewHeaderTitle3 = (index: number, value: string) => {
    const updated = [...newHeaders3];
    updated[index].title = value;
    setNewHeaders3(updated);
  };

  const updateNewHeaderRow3 = (
    headerIndex: number,
    rowIndex: number,
    key: keyof DeviceRow,
    value: string
  ) => {
    const updated = [...newHeaders3];
    const row = updated[headerIndex].rows[rowIndex];
    row[key] = value;

    const quantity = parseFloat(row.quantity);
    const unitPrice = parseFloat(row.unitPrice);
    row.amount =
      !isNaN(quantity) && !isNaN(unitPrice)
        ? (quantity * unitPrice).toFixed(2)
        : "";

    setNewHeaders3(updated);
  };
  const addRowToNewHeader3 = (headerIndex: number) => {
    const updated = [...newHeaders3];
    updated[headerIndex].rows.push({
      item: "",
      description: "",
      quantity: "",
      unitPrice: "",
      amount: "",
    });
    setNewHeaders3(updated);
  };

  const removeRowFromNewHeader3 = (headerIndex: number, rowIndex: number) => {
    const updated = [...newHeaders3];
    updated[headerIndex].rows.splice(rowIndex, 1);
    setNewHeaders3(updated);
  };
  const saveNewHeader3 = (index: number) => {
    const headerToSave = newHeaders3[index];
    if (!headerToSave.title.trim()) return;
    setHeaders3([...headers3, headerToSave]);
    const updated = [...newHeaders3];
    updated.splice(index, 1);
    setNewHeaders3(updated);
  };

  const cancelNewHeader3 = (index: number) => {
    const updated = [...newHeaders3];
    updated.splice(index, 1);
    setNewHeaders3(updated);
  };
  const getNewHeaderSubtotal3 = (rows: DeviceRow[]) => {
    return rows.reduce((sum, row) => {
      const amount = parseFloat(row.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };

  const getTotalAmountIncludingNew3 = () => {
    const savedTotal = headers3.reduce((sum, header) => {
      return sum + getHeaderSubtotal(header.rows);
    }, 0);

    const newHeadersTotal = newHeaders3.reduce((sum, newHeader) => {
      return sum + getNewHeaderSubtotal3(newHeader.rows);
    }, 0);

    return savedTotal + newHeadersTotal;
  };
  const removeDeviceRow3 = (index: number) => {
    const updated = [...deviceRows3];
    updated.splice(index, 1);
    setDeviceRows3(updated);
  };
  useEffect(() => {
    if (BomData?.labor_header) {
      const headersFromLabor = BomData.labor_header.map((header) => ({
        title: header.header || "Labor Header",
        rows: Array.isArray(header.items)
          ? header.items.map((item) => ({
              item: item.item,
              description: item.description || "",
              quantity: item.quantity?.toString() || "0",
              unit_of_measurement: item.unit_of_measurement || "",
              amount: item.total_amount?.toString() || "0",
            }))
          : [],
      }));

      setNewHeaders3(headersFromLabor);
    }
  }, [BomData]);

  useEffect(() => {
    if (BomData?.labor_items) {
      const laborItemsFormatted: DeviceRow[] = BomData.labor_items.map(
        (labor) => ({
          item: labor.item || "",
          description: labor.description || "",
          quantity: labor.quantity?.toString() || "0",
          unit_of_measurement: labor.unit_of_measurement || "",
          amount: labor.total_amount?.toString() || "0",
        })
      );

      setDeviceRows3(laborItemsFormatted);
    }
  }, [BomData]);

  const updateDeviceRow3 = (
    rowIndex: number,
    key: keyof DeviceRow,
    value: string | number
  ) => {
    setDeviceRows3((prevRows) => {
      const updated = [...prevRows];
      updated[rowIndex] = {
        ...updated[rowIndex],
        [key]: value,
      };
      return updated;
    });
  };

  const [deviceRows4, setDeviceRows4] = useState<DeviceRow[]>([]);

  const [newHeaders4, setNewHeaders4] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);
  const [headers4, setHeaders4] = useState<
    { title: string; rows: DeviceRow[] }[]
  >([]);

  const updateDeviceRow4 = (
    rowIndex: number,
    key: keyof DeviceRow,
    value: string | number
  ) => {
    setDeviceRows4((prevRows) => {
      const updated = [...prevRows];
      updated[rowIndex] = {
        ...updated[rowIndex],
        [key]: value,
      };
      return updated;
    });
  };
  const addHeader4 = () => {
    setNewHeaders4([
      ...newHeaders4,
      {
        title: "",
        rows: [
          {
            item: "",
            description: "",
            quantity: "",
            unit_of_measurement: "",
            amount: "",
          },
        ],
      },
    ]);
  };

  const updateNewHeaderTitle4 = (index: number, value: string) => {
    const updated = [...newHeaders4];
    updated[index].title = value;
    setNewHeaders4(updated);
  };

  const updateNewHeaderRow4 = (
    headerIndex: number,
    rowIndex: number,
    key: keyof DeviceRow,
    value: string
  ) => {
    const updated = [...newHeaders4];
    const row = updated[headerIndex].rows[rowIndex];
    row[key] = value;

    const quantity = parseFloat(row.quantity);
    const unitPrice = parseFloat(row.unit_of_measurement);
    row.amount =
      !isNaN(quantity) && !isNaN(unitPrice)
        ? (quantity * unitPrice).toFixed(2)
        : "";

    setNewHeaders4(updated);
  };
  const addRowToNewHeader4 = (headerIndex: number) => {
    const updated = [...newHeaders4];
    updated[headerIndex].rows.push({
      item: "",
      description: "",
      quantity: "",
      unit_of_measurement: "",
      amount: "",
    });
    setNewHeaders4(updated);
  };

  const removeRowFromNewHeader4 = (headerIndex: number, rowIndex: number) => {
    const updated = [...newHeaders4];
    updated[headerIndex].rows.splice(rowIndex, 1);
    setNewHeaders4(updated);
  };
  const saveNewHeader4 = (index: number) => {
    const headerToSave = newHeaders4[index];
    if (!headerToSave.title.trim()) return;
    setHeaders4([...headers4, headerToSave]);
    const updated = [...newHeaders4];
    updated.splice(index, 1);
    setNewHeaders4(updated);
  };

  const cancelNewHeader4 = (index: number) => {
    const updated = [...newHeaders4];
    updated.splice(index, 1);
    setNewHeaders4(updated);
  };
  const getNewHeaderSubtotal4 = (rows: DeviceRow[]) => {
    return rows.reduce((sum, row) => {
      const amount = parseFloat(row.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };

  const getTotalAmountIncludingNew4 = () => {
    const savedTotal = headers4.reduce((sum, header) => {
      return sum + getHeaderSubtotal(header.rows);
    }, 0);

    const newHeadersTotal = newHeaders4.reduce((sum, newHeader) => {
      return sum + getNewHeaderSubtotal4(newHeader.rows);
    }, 0);

    return savedTotal + newHeadersTotal;
  };
  const removeDeviceRow4 = (index: number) => {
    const updated = [...deviceRows4];
    updated.splice(index, 1);
    setDeviceRows4(updated);
  };
  //   useEffect(() => {
  //     if (BomData?.general_header) {
  //       const headersFromGeneral = BomData.general_header.map((header) => ({
  //         title: header.item || "General Header",
  //         rows: [
  //           {
  //             item: header.item || "",
  //             description: header.description || "",
  //             unit_of_measurement: header.unit_of_measurement || "",
  //             quantity: header.quantity || 0,
  //             srp: header.srp || 0,
  //             amount: header.header_sub_total?.toString() || "0",
  //           },
  //         ],
  //       }));

  //       setNewHeaders4(headersFromGeneral);
  //     }
  //   }, [BomData]);
  // useEffect(() => {
  //   if (BomData?.labor_items) {
  //     const laborItemsFormatted: DeviceRow[] = BomData.labor_items.map(
  //       (labor) => ({
  //         item: labor.item || "",
  //         description: labor.description || "",
  //         quantity: labor.quantity?.toString() || "0",
  //         unit_of_measurement: labor.unit_of_measurement || "",
  //         amount: labor.total_amount?.toString() || "0",
  //       })
  //     );

  //     setDeviceRows3(laborItemsFormatted);
  //   }
  // }, [BomData]);
  //   useEffect(() => {
  //     if (BomData?.general_header) {
  //       // Flatten the general_header data to populate deviceRows4
  //       const rowsFromGeneral = BomData.general_header.flatMap((header) =>
  //         header.items.map((item) => ({
  //           item: item.item || "",
  //           description: item.description || "",
  //           quantity: item.quantity?.toString() || "", // Ensure this is a string for input
  //           unit_of_measurement: item.unit_of_measurement || "",
  //           amount: (item.quantity * item.srp).toFixed(2),
  //         }))
  //       );

  //       // Update deviceRows4 with the extracted rows
  //       setDeviceRows4(rowsFromGeneral);
  //     }
  //   }, [BomData]);
  //   useEffect(() => {
  //     if (BomData?.general_header) {
  //       setDeviceRows4((prevRows) => {
  //         const rowsFromGeneral = BomData.general_header.flatMap(
  //           (header, hIndex) =>
  //             header.items.map((item, iIndex) => {
  //               const existing = prevRows.find(
  //                 (row) =>
  //                   row.item === item.item &&
  //                   row.description === item.description &&
  //                   row.quantity === item.quantity?.toString()
  //               );

  //               return {
  //                 item: item.item || "",
  //                 description: item.description || "",
  //                 quantity: item.quantity?.toString() || "",
  //                 unit_of_measurement: item.unit_of_measurement || "",
  //                 amount: (item.quantity * item.srp).toFixed(2),
  //                 subrows: existing?.subrows || [], // 🛠 Preserve existing subrows
  //               };
  //             })
  //         );

  //         return rowsFromGeneral;
  //       });
  //     }
  //   }, [BomData]);
  useEffect(() => {
    if (BomData?.general_header) {
      const rowsFromGeneral = BomData.general_header.map((header) => {
        return {
          item: header.item || "",
          description: header.description || "",
          quantity: header.quantity?.toString() || "",
          unit_of_measurement: header.unit_of_measurement || "",
          amount: ((header.quantity || 0) * (header.srp || 0)).toFixed(2),
          srp: header.srp?.toString() || "0",
          subrows:
            header.items?.map((item) => ({
              item: item.item || "",
              description: item.description || "",
              quantity: item.quantity?.toString() || "",
              unit_of_measurement: item.unit_of_measurement || "",
              amount: ((item.quantity || 0) * (item.srp || 0)).toFixed(2),
            })) || [],
        };
      });

      setDeviceRows4(rowsFromGeneral);
    }
  }, [BomData]);

  //   useEffect(() => {
  //     if (BomData?.general_header) {
  //       const generalRowsFormatted: DeviceRow[] = BomData.general_header.map(
  //         (general) => ({
  //           item: general.item || "",
  //           description: general.description || "",
  //           quantity: general.quantity?.toString() || "0",
  //           unitPrice: general.description?.toString() || "0",
  //           amount:
  //             (parseFloat(general.quantity) * parseFloat(general.srp)).toFixed(
  //               2
  //             ) || "0",
  //         })
  //       );

  //       setDeviceRows4(generalRowsFormatted);
  //     }
  //   }, [BomData]);

  const addSubRow4 = (rowIndex: number) => {
    const updatedRows = [...deviceRows4];
    const currentRow = updatedRows[rowIndex];

    const newSubRow = {
      item: "",
      description: "",
      quantity: "",
      unit_of_measurement: "",
      amount: "",
    };

    if (!currentRow.subrows) {
      currentRow.subrows = [];
    }

    currentRow.subrows.push(newSubRow);
    setDeviceRows4(updatedRows);
  };

  const updateSubRow4 = (
    rowIndex: number,
    subRowIndex: number,
    key: keyof SubRow,
    value: string
  ) => {
    setDeviceRows4((prevRows) => {
      const updatedRows = [...prevRows];
      const subrow = updatedRows[rowIndex].subrows?.[subRowIndex];
      if (subrow) {
        subrow[key] = value;

        // Update amount if quantity or unit price changed
        const quantity = parseFloat(subrow.quantity || "0");
        const unitPrice = parseFloat(subrow.unit_of_measurement || "0");
        subrow.amount = (quantity * unitPrice).toFixed(2);
      }
      return updatedRows;
    });
  };

  //   const removeSubRow4 = (rowIndex: number, subRowIndex: number) => {
  //     setDeviceRows4((prevRows) => {
  //       const updatedRows = [...prevRows];
  //       updatedRows[rowIndex].subrows?.splice(subRowIndex, 1);
  //       return updatedRows;
  //     });
  //   };
  const removeSubRow4 = (rowIndex: number, subRowIndex: number) => {
    setDeviceRows4((prevRows) => {
      const updatedRows = [...prevRows];

      // Clone the subrows safely
      const currentSubRows = updatedRows[rowIndex].subrows || [];

      // Filter out the subrow at the specified index
      const newSubRows = currentSubRows.filter((_, i) => i !== subRowIndex);

      // Assign the filtered subrows back
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        subrows: newSubRows,
      };

      return updatedRows;
    });
  };

  if (Rloading) {
    return (
      <div className="flex justify-center items-center space-x-2">
        {/* Spinner */}
        <div className="w-6 h-6 border-4 border-dashed border-gray-400 border-t-transparent rounded-full animate-spin dark:border-gray-200 dark:border-t-transparent"></div>

        <span className="text-sm text-gray-700 dark:text-gray-300">
          Loading...
        </span>
      </div>
    );
  }

  if (ReceiptError) {
    return <div>Error: {rerror?.message}</div>;
  }
  return (
    <div>
      <button
        className="btn btn-primary text-white px-6 py-2 rounded-md shadow hover:bg-blue-600"
        onClick={() => setShowEditModal(true)}
      >
        View
      </button>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 mt-15 backdrop-blur-sm ">
          <div
            className="absolute inset-0 "
            onClick={() => setShowEditModal(false)}
          />
          <div
            className="relative z-10 bg-white p-8 rounded-lg shadow-xl w-full max-w-5xl overflow-y-auto max-h-[90vh] dark:bg-gray-dark"
            onClick={(e) => e.stopPropagation()} // Prevent modal click from closing
          >
            <h2 className="text-2xl font-semibold mb-6 text-center ">
              Edit BOM
            </h2>
            {/* Form Inputs */}
            {/* <div className="grid grid-cols-2 gap-6 mb-6">
              {Object.keys(formData).map((key, index) => (
                <div key={index} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    {`Input ${index + 1}`}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="input input-bordered w-full p-3 rounded-md border border-gray-300"
                    placeholder={`Input ${index + 1}`}
                  />
                </div>
              ))}
            </div> */}
            <Formik
              initialValues={{
                input1: BomData?.bom_no || "",
                input2: BomData?.date || "",
                input3: BomData?.sic.id || "",
                input4: BomData?.client.id || "",
                input5: BomData?.status || "",
                input6: BomData?.eic.id || "",
                input7: BomData?.project_name || "",
                input8: BomData?.project_site || "",
                input9: BomData?.first_header || "",
              }}
              enableReinitialize={true} // important to update if BomData changes
              onSubmit={(values) => {
                const payload = {
                  bom_no: values.input1,
                  date: values.input2,
                  sic: values.input3,
                  client: values.input4,
                  status: values.input5,
                  eic: values.input6,
                  project_name: values.input7,
                  project_site: values.input8,
                  first_header: values.input9,

                  // 👇 device
                  device_items: deviceRows.map((row, index) => ({
                    item: row.item,
                    description: row.description,
                    quantity: Number(row.quantity),
                    srp: Number(row.srp),
                    unit_of_measurement: row.unit_of_measurement || "",
                    total_amount: Number(row.amount),
                    order: index + 1,
                  })),

                  // 👇 Add device header
                  device_header: newHeaders.map((header, hIndex) => ({
                    header: header.title,
                    header_sub_total: header.rows.reduce(
                      (sum, row) => sum + Number(row.amount),
                      0
                    ),
                    items: header.rows.map((row, rIndex) => ({
                      item: row.item,
                      description: row.description,
                      quantity: Number(row.quantity),
                      srp: Number(row.srp),
                      unit_of_measurement: row.unit_of_measurement || "",
                      total_amount: Number(row.amount),
                      order: rIndex + 1,
                    })),
                  })),
                  // material
                  material_items: deviceRows2.map((row, index) => ({
                    item: row.item,
                    description: row.description,
                    quantity: Number(row.quantity),
                    srp: Number(row.srp),
                    unit_of_measurement: row.unit_of_measurement || "",
                    total_amount: Number(row.amount),
                    order: index + 1,
                  })),

                  material_header: newHeaders2.map((header, hIndex) => ({
                    header: header.title,
                    header_sub_total: header.rows.reduce((sum, row) => {
                      const quantity = Number(row.quantity) || 0;
                      const srp = Number(row.srp) || 0;
                      return sum + quantity * srp;
                    }, 0),
                    items: header.rows.map((row, rIndex) => {
                      const quantity = Number(row.quantity) || 0;
                      const srp = Number(row.srp) || 0;
                      return {
                        item: row.item,
                        description: row.description,
                        quantity,
                        srp,
                        unit_of_measurement: row.unit_of_measurement || "",
                        total_amount: quantity * srp,
                        order: rIndex + 1,
                      };
                    }),
                  })),

                  // labor
                  labor_items: deviceRows3.map((row, index) => ({
                    item: row.item,
                    description: row.description,
                    quantity: row.quantity || 0,
                    srp: row.srp || 0,
                    unit_of_measurement: row.unit_of_measurement || "",
                    total_amount: Number(row.total_amount),
                    order: index + 1,
                  })),
                  labor_header: newHeaders3.map((header, hIndex) => ({
                    header: header.title,
                    header_sub_total: header.rows.reduce((sum, row) => {
                      const quantity = Number(row.quantity) || 0;
                      const unitPrice = Number(row.srp) || 0;
                      return sum + quantity * unitPrice;
                    }, 0),
                    items: header.rows.map((row, rIndex) => {
                      const quantity = Number(row.quantity) || 0;
                      const unitPrice = Number(row.srp) || 0;
                      return {
                        item: row.item,
                        description: row.description,
                        quantity,
                        srp: unitPrice,
                        unit_of_measurement: row.unit_of_measurement || "",
                        total_amount: quantity * unitPrice,
                        order: rIndex + 1,
                      };
                    }),
                  })),

                  // general
                  //   general_items: deviceRows4.map((row, index) => {
                  //     const quantity = Number(row.quantity) || 0;
                  //     const srp = Number(row.srp) || 0;
                  //     return {
                  //       item: row.item,
                  //       description: row.description,
                  //       quantity,
                  //       srp,
                  //       unit_of_measurement: row.unit_of_measurement || "",
                  //       total_amount: quantity * srp,
                  //       order: index + 1,
                  //     };
                  //   }),

                  //   general_header: newHeaders4.map((header, hIndex) => ({
                  //     header: header.title,
                  //     header_sub_total: header.rows.reduce((sum, row) => {
                  //       const quantity = Number(row.quantity) || 0;
                  //       const srp = Number(row.unit_of_measurement) || 0;
                  //       return sum + quantity * srp;
                  //     }, 0),
                  //     items: header.rows.map((row, rIndex) => {
                  //       const quantity = Number(row.quantity) || 0;
                  //       const srp = Number(row.unit_of_measurement) || 0;
                  //       return {
                  //         item: row.item,
                  //         description: row.description,
                  //         quantity,
                  //         srp,
                  //         unit_of_measurement: row.unit_of_measurement || "",
                  //         total_amount: quantity * srp,
                  //         order: rIndex + 1,
                  //       };
                  //     }),
                  //   })),
                  //   general_header: deviceRows4.map((row, index) => ({
                  //     item: row.item,
                  //     description: row.description,
                  //     quantity: row.quantity || 0,
                  //     srp: row.srp || 0,
                  //     unit_of_measurement: row.unit_of_measurement || "",
                  //     total_amount: Number(row.total_amount),
                  //     order: index + 1,
                  //   })),
                  //   general_header: deviceRows4.map((row, index) => ({
                  //     id: index + 1, // Set a unique ID based on index
                  //     header: row.item || "", // Set header to item or fallback to empty string
                  //     items: [
                  //       {
                  //         id: index + 1, // Item ID based on index
                  //         item: row.item || "", // Item name, fallback if empty
                  //         description: row.description || "", // Item description
                  //         quantity: Number(row.quantity) || 0, // Quantity (default to 0 if missing)
                  //         srp: Number(row.srp) || 0, // SRP (default to 0 if missing)
                  //         unit_of_measurement: row.unit_of_measurement || "", // Unit of measurement (fallback to empty string)
                  //         total_amount:
                  //           (Number(row.quantity) || 0) * (Number(row.srp) || 0), // Calculate total amount
                  //         order: index + 1, // Order based on index
                  //       },
                  //     ],
                  //     header_sub_total:
                  //       (Number(row.quantity) || 0) * (Number(row.srp) || 0), // Subtotal for header (can be customized)
                  //     order: (index + 1).toString(), // Set order based on index
                  //     item: row.item || "", // Fallback to empty string if no item
                  //     description: row.description || "", // Fallback to empty string if no description
                  //     quantity: Number(row.quantity) || 0, // Quantity
                  //     unit_of_measurement: row.unit_of_measurement || "", // Unit of measurement
                  //     srp: Number(row.srp) || 0, // SRP
                  //   })),
                  general_header: deviceRows4.map((row, index) => ({
                    // id: index + 1,
                    order: index + 1,
                    item: row.item,
                    description: row.description,
                    quantity: Number(row.quantity) || 0,
                    unit_of_measurement: row.unit_of_measurement,
                    srp: Number(row.srp) || 0,
                    header_sub_total:
                      (Number(row.quantity) || 0) * (Number(row.srp) || 0),
                    items:
                      row.subrows?.map((sub, subIndex) => ({
                        // id: subIndex + 1,
                        order: subIndex + 1,
                        item: sub.item,
                        description: sub.description,
                        quantity: Number(sub.quantity),
                        unit_of_measurement: sub.unit_of_measurement,
                        srp: 0, // or assign the actual SRP if available
                        total_amount: (Number(sub.quantity) || 0) * 0, // update if subrow has srp
                      })) || [],
                  })),
                };

                console.log(payload);
                updateBom(payload);
              }}
            >
              {({ values, handleChange }) => (
                <Form>
                  <div className="grid grid-cols-2 gap-6 mb-6 text-start">
                    {Object.keys(values).map((key, index) => (
                      <div key={index} className="flex flex-col">
                        <label className="text-sm font-medium  mb-2">
                          {(() => {
                            switch (key) {
                              case "input1":
                                return "BOM No.";
                              case "input2":
                                return "Date Created";
                              case "input3":
                                return "SIC";
                              case "input4":
                                return "Client";
                              case "input5":
                                return "Status";
                              case "input6":
                                return "EIC";
                              case "input7":
                                return "Project Name";
                              case "input8":
                                return "Project Site";
                              case "input9":
                                return "First Header";
                              default:
                                return `Input ${index + 1}`;
                            }
                          })()}
                        </label>

                        {key === "input2" ? (
                          // 📅 Date Input
                          <Field
                            type="date"
                            name={key}
                            value={values[key]}
                            onChange={handleChange}
                            className="dark:bg-gray-dark input input-bordered w-full  rounded-md border border-gray-300"
                          />
                        ) : key === "input3" ? (
                          // 👤 SIC Dropdown
                          <select
                            name={key}
                            value={values[key]}
                            onChange={handleChange}
                            className="dark:bg-gray-dark input input-bordered w-full  rounded-md border border-gray-300"
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
                            <option value="">Select Client</option>
                            {clientdata?.map((client) => (
                              <option key={client.id} value={client.id}>
                                {client.client}
                              </option>
                            ))}
                          </select>
                        ) : key === "input5" ? (
                          // 🔄 Status Dropdown
                          <select
                            name={key}
                            value={values[key]}
                            onChange={handleChange}
                            className="dark:bg-gray-dark input input-bordered w-full  rounded-md border border-gray-300"
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
                            value={values[key]}
                            onChange={handleChange}
                            className="dark:bg-gray-dark input input-bordered w-full  rounded-md border border-gray-300"
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
                            value={values[key]}
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
                  <div className="flex justify-between gap-2 mb-6">
                    {["Devices", "Materials", "Labor", "General", "Save"].map(
                      (label, index) => (
                        <button
                          type="button"
                          key={label}
                          onClick={() => setActiveNav(index + 1)}
                          className={`flex-1 py-2 rounded-md font-medium transition-all ${
                            activeNav === index + 1
                              ? "bg-blue-500 text-white shadow-md"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {label}
                        </button>
                      )
                    )}
                  </div>
                  {/* Devices Section */}
                  {activeNav === 1 && (
                    <>
                      <div className="space-y-6">
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() =>
                              setDeviceRows([
                                ...deviceRows,
                                {
                                  item: "",
                                  description: "",
                                  quantity: "",
                                  unit_of_measurement: "",
                                  srp: 0,
                                },
                              ])
                            }
                          >
                            Add Row
                          </button>
                          <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={addHeader}
                          >
                            Add Header
                          </button>
                        </div>

                        {/* Device Table */}
                        <table className="table-auto w-full text-sm text-left  border ">
                          <thead className="bg-gray-100 dark:bg-gray-dark">
                            <tr>
                              <th className="px-4 py-2">Item</th>
                              <th className="px-4 py-2">Description</th>
                              <th className="px-4 py-2">Quantity</th>
                              <th className="px-4 py-2">Unit of measurement</th>
                              <th className="px-4 py-2">Unit Price</th>
                              <th className="px-4 py-2">Amount</th>
                              <th className="px-4 py-2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {deviceRows.map((row, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2">
                                  <input
                                    type="text"
                                    value={row.item}
                                    onChange={(e) =>
                                      updateDeviceRow(
                                        index,
                                        "item",
                                        e.target.value
                                      )
                                    }
                                    className="w-full border p-1 rounded"
                                  />
                                </td>
                                <td className="px-4 py-2">
                                  <input
                                    type="text"
                                    value={row.description}
                                    onChange={(e) =>
                                      updateDeviceRow(
                                        index,
                                        "description",
                                        e.target.value
                                      )
                                    }
                                    className="w-full border p-1 rounded"
                                  />
                                </td>
                                <td className="px-4 py-2">
                                  <input
                                    type="number"
                                    value={row.quantity}
                                    onChange={(e) => {
                                      const updatedQuantity = parseFloat(
                                        e.target.value
                                      );
                                      const updatedTotalAmount =
                                        updatedQuantity * row.srp; // Recalculate total_amount based on updated quantity
                                      updateDeviceRow(
                                        index,
                                        "quantity",
                                        updatedQuantity
                                      );
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
                                      const updatedSrp = parseFloat(
                                        e.target.value
                                      );
                                      const updatedTotalAmount =
                                        row.quantity * updatedSrp; // Recalculate total_amount based on updated SRP
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
                                    className="w-full border p-1 rounded bg-gray-100 text-gray-700 dark:bg-gray-dark dark:border-white dark:text-white"
                                  />
                                </td>

                                <td className="px-4 py-2">
                                  <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
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
                          <tr key={headerIndex}>
                            <td colSpan={6}>
                              <div className="border p-4 bg-gray-50 rounded space-y-4 mt-4 dark:bg-gray-dark">
                                <input
                                  type="text"
                                  placeholder="Header Title"
                                  value={header.title}
                                  onChange={(e) =>
                                    updateNewHeaderTitle(
                                      headerIndex,
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-2 border rounded"
                                />

                                {header.rows.map((row, rowIndex) => (
                                  <div
                                    key={rowIndex}
                                    className="grid grid-cols-6 gap-2"
                                  >
                                    {[
                                      "item",
                                      "description",
                                      "quantity",
                                      "unit_of_measurement",
                                      "srp",
                                    ].map((field) => (
                                      <input
                                        key={field}
                                        type="text"
                                        placeholder={field}
                                        value={row[field as keyof DeviceRow]}
                                        onChange={(e) =>
                                          updateNewHeaderRow(
                                            headerIndex,
                                            rowIndex,
                                            field as keyof DeviceRow,
                                            e.target.value
                                          )
                                        }
                                        className="p-2 border rounded"
                                      />
                                    ))}
                                    <button
                                      className="bg-red-400 text-white px-2 py-1 rounded"
                                      onClick={() =>
                                        removeRowFromNewHeader(
                                          headerIndex,
                                          rowIndex
                                        )
                                      }
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}

                                <div className="flex justify-between items-center">
                                  <button
                                    type="button"
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() =>
                                      addRowToNewHeader(headerIndex)
                                    }
                                  >
                                    Add Row
                                  </button>

                                  <div className="space-x-2 flex items-center">
                                    <span className="text-sm font-semibold ">
                                      Subtotal: $
                                      {getNewHeaderSubtotal(
                                        header.rows
                                      ).toFixed(2)}
                                    </span>
                                    <button
                                      className="bg-blue-600 text-white px-4 py-2 rounded"
                                      onClick={() => saveNewHeader(headerIndex)}
                                    >
                                      Save Header
                                    </button>
                                    <button
                                      className="bg-gray-500 text-white px-4 py-2 rounded"
                                      onClick={() =>
                                        cancelNewHeader(headerIndex)
                                      }
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </div>

                      <div className="text-right text-xl font-bold mt-6">
                        Total Amount: ${getTotalAmountIncludingNew().toFixed(2)}
                      </div>
                    </>
                  )}
                  {activeNav === 2 && (
                    <>
                      <div className="space-y-6">
                        <div className="flex justify-end gap-4">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() =>
                              setDeviceRows2([
                                ...deviceRows2,
                                {
                                  item: "",
                                  description: "",
                                  quantity: "",
                                  unit_of_measurement: "",
                                  srp: 0,
                                },
                              ])
                            }
                          >
                            Add Row
                          </button>
                          <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={addHeader2}
                          >
                            Add Header
                          </button>
                        </div>

                        {/* Device Table */}
                        <table className="table-auto w-full text-sm text-left  border">
                          <thead className="bg-gray-100 dark:bg-gray-dark">
                            <tr>
                              <th className="px-4 py-2">Item2</th>
                              <th className="px-4 py-2">Description</th>
                              <th className="px-4 py-2">Quantity</th>
                              <th className="px-4 py-2">Unit Price</th>
                              <th className="px-4 py-2">Amount</th>
                              <th className="px-4 py-2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {deviceRows2.map((row, idx) => (
                              <tr key={idx}>
                                {Object.keys(row).map((field) => (
                                  <td key={field} className="px-4 py-2">
                                    {row[field as keyof DeviceRow]}
                                  </td>
                                ))}
                                <td className="px-4 py-2">
                                  <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => removeDeviceRow2(idx)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* New Header Forms */}
                        {newHeaders2.map((header, headerIndex) => (
                          <tr key={headerIndex}>
                            <td colSpan={6}>
                              <div className="border p-4 bg-gray-50 rounded space-y-4 mt-4 dark:bg-gray-dark">
                                <label htmlFor="">header title</label>
                                <input
                                  type="text"
                                  placeholder="Header Title"
                                  value={header.title}
                                  onChange={(e) =>
                                    updateNewHeaderTitle2(
                                      headerIndex,
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-2 border rounded"
                                />

                                {header.rows.map((row, rowIndex) => (
                                  <div
                                    key={rowIndex}
                                    className="grid grid-cols-6 gap-2 mb-4"
                                  >
                                    {[
                                      { key: "item", label: "Item" },
                                      {
                                        key: "description",
                                        label: "Description",
                                      },
                                      { key: "quantity", label: "Quantity" },
                                      {
                                        key: "unit_of_measurement",
                                        label: "Unit of Measurement",
                                      },
                                      { key: "srp", label: "SRP" },
                                    ].map(({ key, label }) => (
                                      <div key={key} className="flex flex-col">
                                        <label className="text-xs mb-1">
                                          {label}
                                        </label>
                                        <input
                                          type="text"
                                          placeholder={label}
                                          value={row[key as keyof DeviceRow]}
                                          onChange={(e) =>
                                            updateNewHeaderRow2(
                                              headerIndex,
                                              rowIndex,
                                              key as keyof DeviceRow,
                                              e.target.value
                                            )
                                          }
                                          className="p-2 border rounded"
                                        />
                                      </div>
                                    ))}
                                    <div className="flex items-end">
                                      <button
                                        className="bg-red-400 text-white px-2 py-1 rounded"
                                        onClick={() =>
                                          removeRowFromNewHeader2(
                                            headerIndex,
                                            rowIndex
                                          )
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ))}

                                <div className="flex justify-between items-center">
                                  <button
                                    type="button"
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() =>
                                      addRowToNewHeader2(headerIndex)
                                    }
                                  >
                                    Add Row
                                  </button>

                                  <div className="space-x-2 flex items-center">
                                    <span className="text-sm font-semibold text-gray-700">
                                      Subtotal: $
                                      {getNewHeaderSubtotal2(
                                        header.rows
                                      ).toFixed(2)}
                                    </span>
                                    <button
                                      className="bg-blue-600 text-white px-4 py-2 rounded"
                                      onClick={() =>
                                        saveNewHeader2(headerIndex)
                                      }
                                    >
                                      Save Header
                                    </button>
                                    <button
                                      className="bg-gray-500 text-white px-4 py-2 rounded"
                                      onClick={() =>
                                        cancelNewHeader2(headerIndex)
                                      }
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </div>
                      <div className="text-right text-xl font-bold mt-6">
                        Total Amount: $
                        {getTotalAmountIncludingNew2().toFixed(2)}
                      </div>
                    </>
                  )}
                  {activeNav === 3 && (
                    <>
                      <div className="space-y-6">
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() =>
                              setDeviceRows3([
                                ...deviceRows3,
                                {
                                  item: "",
                                  description: "",
                                  quantity: "",
                                  unit_of_measurement: "",
                                  srp: 0,
                                },
                              ])
                            }
                          >
                            Add Row
                          </button>
                          <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={addHeader3}
                          >
                            Add Header
                          </button>
                        </div>

                        {/* Device Table */}
                        <table className="table-auto w-full text-sm text-left  border">
                          <thead className="bg-gray-100 dark:bg-gray-dark">
                            <tr>
                              <th className="px-4 py-2">Item3</th>
                              <th className="px-4 py-2">Description</th>
                              {/* <th className="px-4 py-2">srp</th> */}
                              <th className="px-4 py-2">Quantity</th>
                              <th className="px-4 py-2">Unit Price</th>
                              <th className="px-4 py-2">Amount</th>
                              <th className="px-4 py-2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {deviceRows3.map((row, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2">
                                  <input
                                    type="text"
                                    value={row.item}
                                    onChange={(e) =>
                                      updateDeviceRow3(
                                        index,
                                        "item",
                                        e.target.value
                                      )
                                    }
                                    className="w-full border p-1 rounded"
                                  />
                                </td>
                                <td className="px-4 py-2">
                                  <input
                                    type="text"
                                    value={row.description}
                                    onChange={(e) =>
                                      updateDeviceRow3(
                                        index,
                                        "description",
                                        e.target.value
                                      )
                                    }
                                    className="w-full border p-1 rounded"
                                  />
                                </td>
                                {/* <td className="px-4 py-2">
                                  <input
                                    type="text"
                                    value={row.srp}
                                    onChange={(e) =>
                                      updateDeviceRow3(
                                        index,
                                        "srp",
                                        e.target.value
                                      )
                                    }
                                    className="w-full border p-1 rounded"
                                  />
                                </td> */}
                                <td className="px-4 py-2">
                                  <input
                                    type="number"
                                    value={row.quantity}
                                    onChange={(e) => {
                                      const quantity = e.target.value;
                                      const amount = (
                                        parseFloat(quantity) *
                                        parseFloat(row.unitPrice || "0")
                                      ).toFixed(2);
                                      updateDeviceRow3(
                                        index,
                                        "quantity",
                                        quantity
                                      );
                                      updateDeviceRow3(index, "amount", amount);
                                    }}
                                    className="w-full border p-1 rounded"
                                  />
                                </td>
                                <td className="px-4 py-2">
                                  <input
                                    type="number"
                                    value={row.unit_of_measurement || ""}
                                    onChange={(e) => {
                                      const unitPrice = e.target.value;
                                      const amount = (
                                        parseFloat(row.quantity || "0") *
                                        parseFloat(unitPrice)
                                      ).toFixed(2);
                                      updateDeviceRow3(
                                        index,
                                        "unit_of_measurement",
                                        unitPrice
                                      );
                                      updateDeviceRow3(index, "amount", amount);
                                    }}
                                    className="w-full border p-1 rounded"
                                  />
                                </td>
                                <td className="px-4 py-2">
                                  <input
                                    type="text"
                                    value={row.amount}
                                    readOnly
                                    className="w-full border p-1 rounded bg-gray-100 dark:bg-gray-dark dark:border-white dark:text-white"
                                  />
                                </td>
                                <td className="px-4 py-2">
                                  <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => removeDeviceRow3(index)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* New Header Forms */}
                        {newHeaders3.map((header, headerIndex) => (
                          <div
                            key={headerIndex}
                            className="border p-4 bg-gray-50 rounded space-y-4 mt-4 dark:bg-gray-dark"
                          >
                            <input
                              type="text"
                              placeholder="Header Title"
                              value={header.title}
                              onChange={(e) =>
                                updateNewHeaderTitle3(
                                  headerIndex,
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border rounded"
                            />

                            {header.rows.map((row, rowIndex) => (
                              <div
                                key={rowIndex}
                                className="grid grid-cols-6 gap-2"
                              >
                                {[
                                  "item",
                                  "description",
                                  "quantity",
                                  "unit_of_measurement",
                                  "amount",
                                ].map((field) => (
                                  <input
                                    key={field}
                                    type="text"
                                    placeholder={field}
                                    value={row[field as keyof DeviceRow]}
                                    onChange={(e) =>
                                      updateNewHeaderRow3(
                                        headerIndex,
                                        rowIndex,
                                        field as keyof DeviceRow,
                                        e.target.value
                                      )
                                    }
                                    className="p-2 border rounded"
                                  />
                                ))}
                                <button
                                  className="bg-red-400 text-white px-2 py-1 rounded"
                                  onClick={() =>
                                    removeRowFromNewHeader3(
                                      headerIndex,
                                      rowIndex
                                    )
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            ))}

                            <div className="flex justify-between items-center">
                              <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => addRowToNewHeader3(headerIndex)}
                              >
                                Add Row
                              </button>

                              <div className="space-x-2 flex items-center">
                                <span className="text-sm font-semibold ">
                                  Subtotal: $
                                  {getNewHeaderSubtotal3(header.rows).toFixed(
                                    2
                                  )}
                                </span>
                                <button
                                  className="bg-blue-600 text-white px-4 py-2 rounded"
                                  onClick={() => saveNewHeader3(headerIndex)}
                                >
                                  Save Header
                                </button>
                                <button
                                  className="bg-gray-500 text-white px-4 py-2 rounded"
                                  onClick={() => cancelNewHeader3(headerIndex)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-right text-xl font-bold mt-6">
                        Total Amount: $
                        {getTotalAmountIncludingNew3().toFixed(2)}
                      </div>
                    </>
                  )}
                  {/* Unit Price{" "} */}
                  {activeNav === 4 && (
                    <>
                      <div className="space-y-6">
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() =>
                              setDeviceRows4([
                                ...deviceRows4,
                                {
                                  item: "",
                                  description: "",
                                  quantity: "",
                                  unit_of_measurement: "",
                                  amount: "",
                                  subrows: [], // Add this!
                                },
                              ])
                            }
                          >
                            Add Row
                          </button>
                          {/* <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={addHeader4}
                          >
                            Add Header
                          </button> */}
                        </div>

                        {/* Device Table */}
                        <div className="overflow-x-auto">
                          <table className="table-auto w-full text-sm text-left  border">
                            <thead className="bg-gray-100 dark:bg-gray-dark">
                              <tr>
                                <th className="px-4 py-2">Item4</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Unit Price</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {deviceRows4.map((row, index) => (
                                <React.Fragment key={index}>
                                  {/* Main Row */}
                                  <tr>
                                    <td className="px-4 py-2">
                                      <input
                                        type="text"
                                        value={row.item}
                                        onChange={(e) =>
                                          updateDeviceRow4(
                                            index,
                                            "item",
                                            e.target.value
                                          )
                                        }
                                        className="w-full border p-1 rounded"
                                      />
                                    </td>
                                    <td className="px-4 py-2">
                                      <input
                                        type="text"
                                        value={row.description}
                                        onChange={(e) =>
                                          updateDeviceRow4(
                                            index,
                                            "description",
                                            e.target.value
                                          )
                                        }
                                        className="w-full border p-1 rounded"
                                      />
                                    </td>
                                    <td className="px-4 py-2">
                                      <input
                                        type="number"
                                        value={row.quantity}
                                        onChange={(e) => {
                                          const quantity = e.target.value;
                                          const amount = (
                                            parseFloat(quantity) *
                                            parseFloat(
                                              row.unit_of_measurement || "0"
                                            )
                                          ).toFixed(2);
                                          updateDeviceRow4(
                                            index,
                                            "quantity",
                                            quantity
                                          );
                                          updateDeviceRow4(
                                            index,
                                            "amount",
                                            amount
                                          );
                                        }}
                                        className="w-full border p-1 rounded"
                                      />
                                    </td>
                                    <td className="px-4 py-2">
                                      <input
                                        type="text"
                                        value={row.unit_of_measurement || ""}
                                        onChange={(e) => {
                                          const unitPrice = e.target.value;
                                          const amount = (
                                            parseFloat(row.quantity || "0") *
                                            parseFloat(unitPrice)
                                          ).toFixed(2);
                                          updateDeviceRow4(
                                            index,
                                            "unit_of_measurement",
                                            unitPrice
                                          );
                                          updateDeviceRow4(
                                            index,
                                            "amount",
                                            amount
                                          );
                                        }}
                                        className="w-full border p-1 rounded"
                                      />
                                    </td>
                                    <td className="px-4 py-2">
                                      <input
                                        type="text"
                                        value={row.amount}
                                        readOnly
                                        className="w-full border p-1 rounded bg-gray-100 dark:bg-gray-dark"
                                      />
                                    </td>
                                    <td className="px-4 py-2">
                                      <div className="flex flex-col gap-1">
                                        <button
                                          type="button"
                                          className="bg-red-500 text-white px-2 py-1 rounded"
                                          onClick={() =>
                                            removeDeviceRow4(index)
                                          }
                                        >
                                          Remove
                                        </button>
                                        <button
                                          type="button"
                                          className="bg-blue-500 text-white px-2 py-1 rounded"
                                          onClick={() => addSubRow4(index)}
                                        >
                                          + Subrow
                                        </button>
                                      </div>
                                    </td>
                                  </tr>

                                  {/* Subrows (if any) */}
                                  {row.subrows?.map((subrow, subIndex) => (
                                    <tr key={subIndex}>
                                      <td className="px-4 py-2 pl-10">
                                        {" "}
                                        {/* Indentation for subrow */}
                                        <input
                                          type="text"
                                          value={subrow.item}
                                          onChange={(e) =>
                                            updateSubRow4(
                                              index,
                                              subIndex,
                                              "item",
                                              e.target.value
                                            )
                                          }
                                          className="w-full border p-1 rounded"
                                        />
                                      </td>
                                      <td className="px-4 py-2">
                                        <input
                                          type="text"
                                          value={subrow.description}
                                          onChange={(e) =>
                                            updateSubRow4(
                                              index,
                                              subIndex,
                                              "description",
                                              e.target.value
                                            )
                                          }
                                          className="w-full border p-1 rounded"
                                        />
                                      </td>
                                      <td className="px-4 py-2">
                                        <input
                                          type="number"
                                          value={subrow.quantity}
                                          onChange={(e) => {
                                            const quantity = e.target.value;
                                            const amount = (
                                              parseFloat(quantity) *
                                              parseFloat(
                                                subrow.unit_of_measurement ||
                                                  "0"
                                              )
                                            ).toFixed(2);
                                            updateSubRow4(
                                              index,
                                              subIndex,
                                              "quantity",
                                              quantity
                                            );
                                            updateSubRow4(
                                              index,
                                              subIndex,
                                              "amount",
                                              amount
                                            );
                                          }}
                                          className="w-full border p-1 rounded"
                                        />
                                      </td>
                                      <td className="px-4 py-2">
                                        <input
                                          type="text"
                                          value={
                                            subrow.unit_of_measurement || ""
                                          }
                                          onChange={(e) => {
                                            const unitPrice = e.target.value;
                                            const amount = (
                                              parseFloat(
                                                subrow.quantity || "0"
                                              ) * parseFloat(unitPrice)
                                            ).toFixed(2);
                                            updateSubRow4(
                                              index,
                                              subIndex,
                                              "unit_of_measurement",
                                              unitPrice
                                            );
                                            updateSubRow4(
                                              index,
                                              subIndex,
                                              "amount",
                                              amount
                                            );
                                          }}
                                          className="w-full border p-1 rounded"
                                        />
                                      </td>
                                      <td className="px-4 py-2">
                                        <input
                                          type="text"
                                          value={subrow.amount}
                                          readOnly
                                          className="w-full border p-1 rounded bg-gray-100 dark:bg-gray-dark "
                                        />
                                      </td>
                                      <td className="px-4 py-2">
                                        <button
                                          type="button"
                                          className="bg-red-500 text-white px-2 py-1 rounded"
                                          onClick={() =>
                                            removeSubRow4(index, subIndex)
                                          }
                                        >
                                          Remove Subrow
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </React.Fragment>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="text-right text-xl font-bold mt-6">
                          Total Amount: $
                          {getTotalAmountIncludingNew4().toFixed(2)}
                        </div>
                      </div>
                    </>
                  )}
                  {/* Render Saved Headers */}
                  <div className="mt-6 space-y-4">
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

                        {/* Subtotal Display */}
                        <div className="text-right text-sm font-semibold text-gray-700 mt-2">
                          Subtotal: $
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
                  </div>
                  {/* Footer Buttons */}
                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      className="py-2 px-6 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="py-2 px-6 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                      //   onClick={handleSave}
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBom;
