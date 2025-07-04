"use client";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChequeItems } from "@/api/cheque-request/fetchItems";
import { ChequeUnits } from "@/api/cheque-request/fetchUnits";
// import { UpdateItems, updateItems } from "@/api/cheque-request/UpdateItem";
// import {
//   updateLocation,
//   UpdateLocation,
// } from "@/api/cheque-request/UpdateLocation";
// import { deleteItem } from "@/api/cheque-request/DeleteItem";
// import { deleteLocation } from "@/api/cheque-request/DeleteLocation";
import Link from "next/link";
// import { IoMdArrowBack } from "react-icons/io";
// import ViewClients from "../../_components/Modal/ViewClients";
import { useParams, useRouter } from "next/navigation";
import { fetchClientDataById } from "@/api/clients/fetchClientsView";
// import ViewClients from "../../_components/Modal/ViewClients";
import { updateClient, UpdateClient } from "@/api/clients/updateClient";
import NotFound from "@/components/Error/NotFound";
// import ViewQuo from "../../_components/ViewQuo";
// const [loadingId, setLoadingId] = useState<number | null>(null); // ✅ now valid

function View() {
  const [isEditable, setIsEditable] = useState(false); // State to toggle between edit and view mode
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState<any | null>(null);
  // const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  // const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  // const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  // const [searchTerm] = useState("");
  const [searchTermLocation, setSearchTermLocation] = useState("");
  // const [currentPageItems, setCurrentPageItems] = useState(1);
  const [currentPageUnits, setCurrentPageUnits] = useState(1);
  const [currentPagees, setCurrentPagee] = useState(1);
  // const [currentPages, setCurrentPages] = useState(1);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };
  const handleCancel = () => {
    setIsEditable(false); // Switch back to readonly mode without saving
  };
  const queryClient = useQueryClient();

  const rowsPerPage = 10;
  const handleViewClick = (id: string) => {
    setLoadingId(id);
    router.push(`/erp-v2/quotation/edit-quo/${id}`);
  };
  const {
    // isLoading: isItemsLoading,
    // error: itemsError,
    // data: itemsData,
  } = useQuery({
    queryKey: ["items"],
    queryFn: ChequeItems,
  });
  const {
    data: VendorData,
    isLoading: isCLoading,
    // isError: cerror,
    error: cerrors,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: () => fetchClientDataById(id),

    enabled: !!id,
  });

  const {
    isLoading: isUnitsLoading,
    // error: UnitsError,
    // data: unitsData,
  } = useQuery({
    queryKey: ["units"],
    queryFn: ChequeUnits,
  });
  const { mutate: updateClients } = useMutation({
    mutationFn: (data: UpdateClient) =>
      updateClient(VendorData!.id as number, data),
    onSuccess: () => {
      console.log("vendor updated successfully");

      queryClient.invalidateQueries({ queryKey: ["client", id] });
      queryClient.invalidateQueries({ queryKey: ["client"] });
      // setShowEditModal(false);
    },
    onError: (error) => {
      console.error("Error updating cheque:", error);
    },
  });

  // const filteredQuotations = VendorData?.quotations.filter(
  //   (q) =>
  //     q.project_name
  //       ?.toLowerCase()
  //       .includes(searchTermLocation.toLowerCase()) ||
  //     q.quotation_no?.toLowerCase().includes(searchTermLocation.toLowerCase())
  // );

  const newVendorData = VendorData?.quotations.filter((data) =>
    Object.values(data).some(
      (val) =>
        typeof val == "string" &&
        val
          .toLocaleLowerCase()
          .includes(searchTermLocation?.toLocaleLowerCase() || "")
    )
  );

  // const indexOfLastRowUnits = currentPageUnits * rowsPerPage;
  // const indexOfFirstRowUnits = indexOfLastRowUnits - rowsPerPage;
  // const currentUnitsRows = filteredQuotations?.slice(
  //   indexOfFirstRowUnits,
  //   indexOfLastRowUnits
  // );
  // const paginatedVendorData = newVendorData?.slice(
  //   (currentPageUnits - 1) * rowsPerPage,
  //   currentPageUnits * rowsPerPage
  // );

  const totalPagesUnits = Math.ceil((newVendorData?.length || 0) / rowsPerPage);
  // const totalPagesItems = Math.ceil((itemsData?.length || 0) / rowsPerPage);
  // const totalPagesUnits = Math.ceil((unitsData?.length || 0) / rowsPerPage);

  // const filteredItemsData = itemsData?.filter((item) =>
  //   item.item.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const filteredUnitsData = unitsData?.filter((location) =>
  //   location.unit_of_measurement
  //     .toLowerCase()
  //     .includes(searchTermLocation.toLowerCase())
  // );
  // const totalPagesUnits = Math.ceil(
  //   (filteredUnitsData?.length || 0) / rowsPerPage
  // );
  // const indexOfLastRowItems = currentPageItems * rowsPerPage;
  // const indexOfFirstRowItems = indexOfLastRowItems - rowsPerPage;

  // const indexOfLastRowUnits = currentPageUnits * rowsPerPage;
  // const indexOfFirstRowUnits = indexOfLastRowUnits - rowsPerPage;
  // const currentUnitsRows = filteredUnitsData?.slice(
  //   indexOfFirstRowUnits,
  //   indexOfLastRowUnits
  // );

  const ITEMS_PER_PAGE = 5;

  // Ensure quotations is always an array
  const quotationss = VendorData?.quotations || [];

  const totalPagess = Math.ceil(quotationss.length / ITEMS_PER_PAGE);
  // const startIndex = (currentPagees - 1) * ITEMS_PER_PAGE;
  // const paginatedQuotationss = quotationss.slice(
  //   startIndex,
  //   startIndex + ITEMS_PER_PAGE
  // );

  const ITEMS_PER_PAGES = 5;

  // Ensure quotations is always an array
  // const quotations = VendorData?.quotations || [];

  const totalPages = Math.ceil(quotationss.length / ITEMS_PER_PAGES);
  // const startIndexs = (currentPagees - 1) * ITEMS_PER_PAGES;
  // const paginatedQuotations = quotationss.slice(
  //   startIndexs,
  //   startIndexs + ITEMS_PER_PAGES
  // );
  const handlePrevUnits = () => {
    if (currentPageUnits > 1) setCurrentPageUnits(currentPageUnits - 1);
  };

  const handleNextUnits = () => {
    if (currentPageUnits < totalPagesUnits)
      setCurrentPageUnits(currentPageUnits + 1);
  };
  const handleNext = () => {
    if (currentPagees < totalPagess) setCurrentPagee((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPagees > 1) setCurrentPagee((prev) => prev - 1);
  };
  const filteredQuotationsLeft = VendorData?.quotations.filter((data) =>
    Object.values(data).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchTermLocation.toLowerCase())
    )
  );

  const filteredQuotationsRight = VendorData?.quotations.filter(
    (data) =>
      data.project_name
        ?.toLowerCase()
        .includes(searchTermLocation.toLowerCase()) ||
      data.quotation_no
        ?.toLowerCase()
        .includes(searchTermLocation.toLowerCase())
  );

  // LEFT TABLE (Created By / Date)
  // const totalPagesLeft = Math.ceil(
  //   (filteredQuotationsLeft?.length || 0) / rowsPerPage
  // );
  const paginatedLeft = filteredQuotationsLeft?.slice(
    (currentPagees - 1) * rowsPerPage,
    currentPagees * rowsPerPage
  );

  // RIGHT TABLE (Quotation / Project Name)
  // const totalPagesRight = Math.ceil(
  //   (filteredQuotationsRight?.length || 0) / rowsPerPage
  // );
  const paginatedRight = filteredQuotationsRight?.slice(
    (currentPageUnits - 1) * rowsPerPage,
    currentPageUnits * rowsPerPage
  );

  if (cerrors) {
    return <NotFound />;
  }
  if (isCLoading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          {/* Loading Spinner */}
          <div className="dark:border-gray-200 dark:border-t-white  w-16 h-16 border-4 border-t-4 border-gray-800 border-dashed rounded-full animate-spin"></div>

          <span className="text-lg text-gray-700 dark:text-white">
            Please wait...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="ml-auto">
        {/* <Link href="/erp-v2/clients">
          <button className="btn uppercase">
            Back to Clients
          </button>
        </Link> */}
      </div>
      {/* <div className="grid grid-cols-2 gap-6"> */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
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
        {/* Left Column */}
        <div className="">
          <div className="flex items-center">
            <div className="flex justify-start gap-2 mt-2">
              <Link href="/erp-v2/clients">
                <button className="btn uppercase">Back to Clients</button>
              </Link>
              {!isEditable ? (
                <button onClick={handleEditToggle} className="btn uppercase">
                  Edit
                </button>
              ) : (
                <>
                  <button onClick={handleCancel} className="btn uppercase">
                    Cancel
                  </button>
                </>
              )}
              <input
                type="search"
                className="w-120 mb-4 p-2 border rounded"
                placeholder="Search"
                value={searchTermLocation}
                onChange={(e) => {
                  setSearchTermLocation(e.target.value);
                  setCurrentPageUnits(1);
                }}
              />
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src="/images/logo.png"
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
            <span className=" text-lg text-center font-bold uppercase">
              {VendorData?.client}
            </span>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{
              client: VendorData?.client || "",
              address: VendorData?.address || "",
              contact_person: VendorData?.contact_person || "",
              position: VendorData?.position || "",
              contact_number: VendorData?.contact_number || "",
              email: VendorData?.email || "",
              date_created: VendorData?.date_created || "",
              created_by: VendorData?.created_by || "",
              id: "",
            }}
            enableReinitialize={true}
            // onSubmit={(values) => {
            //   updateClients(values);
            // }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await updateClients(values);
                console.log("Client updated:", values);

                // Optionally show success alert
                setShowSuccess(true);
                setTimeout(() => {
                  window.location.href = "/erp-v2/clients";
                }, 2000);
              } catch (error) {
                console.error("Update failed:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <Form className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-2">
              {/* Input Fields */}
              {[
                {
                  type: "text",
                  name: "client",
                  placeholder: "Vendor",
                  label: "Client",
                },
                {
                  type: "text",
                  name: "address",
                  placeholder: "Enter address",
                  label: "Address",
                },
                {
                  type: "text",
                  name: "contact_person",
                  placeholder: "Enter contact person",
                  label: "Contact Person",
                },
                {
                  type: "text",
                  name: "position",
                  placeholder: "Enter position",
                  label: "Position",
                },
                {
                  type: "text",
                  name: "contact_number",
                  placeholder: "Enter contact number",
                  label: "Contact Number",
                },
                {
                  type: "email",
                  name: "email",
                  placeholder: "Enter email",
                  label: "Email",
                },
              ].map((item) => (
                <div key={item.name} className="flex flex-col space-y-1">
                  <label
                    htmlFor={item.name}
                    className="text-center uppercase text-sm font-semibold text-gray-700 dark:text-white"
                  >
                    {item.label}
                  </label>
                  <Field
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    placeholder={item.placeholder}
                    readOnly={!isEditable}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              ))}
              {/* {isEditable && (
                <div className="modal-action">
                  <button type="submit" className=" btn uppercase">
                    Update
                  </button>
                </div>
              )} */}
              {isEditable && (
                <div className="col-span-6 flex justify-end">
                  <button type="submit" className="btn uppercase">
                    Update
                  </button>
                </div>
              )}
            </Form>
          </Formik>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div className="">
            {/* <input
              type="search"
              className="w-120 mb-4 p-2 border rounded"
              placeholder="Search"
              value={searchTermLocation}
              onChange={(e) => {
                setSearchTermLocation(e.target.value);
                setCurrentPageUnits(1);
              }}
            /> */}
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table
                style={{ width: "100%" }}
                className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg"
              >
                <thead className="bg-white text-black  border-b-gray-400">
                  <tr className="text-sm font-medium text-center uppercase">
                    <th className="p-2 text-center">created by</th>
                    <th className="p-2 text-center">date created </th>

                    {/* <th className="p-2 text-center">Actions</th> */}
                  </tr>
                </thead>
                {/* <tbody>
                  {VendorData?.quotations?.map((quotation) => (
                    <tr key={quotation.id} className="border-b">
                      <td className="p-2">{quotation.quotation_no}</td>
                      <td className="p-2">{quotation.project_name}</td>
                      <td className="p-2">
                        <button
                          //   onClick={() => handleViewQuotation(quotation.id)}
                          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                          View
                        </button>
                        <ViewQuo id={quotation.id} />
                      </td>
                    </tr>
                  ))}
                </tbody> */}
                <tbody>
                  {paginatedLeft!.length > 0 ? (
                    paginatedLeft!.map((quotation) => (
                      <tr key={quotation.id}>
                        <td className="p-2 text-center">
                          {quotation.created_by}
                        </td>
                        <td className="p-2 text-center">
                          {VendorData!.date_created}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="p-4 text-center text-gray-500">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-end items-center gap-2 mt-3 text-sm">
                <button
                  onClick={handlePrev}
                  disabled={currentPagees === 1}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-800 transition"
                >
                  Previous
                </button>

                <span className="text-gray-700 dark:text-white">
                  Page {currentPagees} of {totalPagess}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPagees === totalPagess}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-800 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          {/* {isEditable && (
                <div className="modal-action">
                  <button type="submit" className="btn uppercase">
                    Update
                  </button>
                </div>
              )}
            </Form>
          </Formik> */}

          {/* Second Column: Table */}
          <div className="bg-white rounded-lg  dark:bg-gray-700 dark:text-white">
            {/* <AddUnit /> */}
            {isUnitsLoading ? (
              <div>Loading locations...</div>
            ) : (
              <>
                {/* <input
                  type="search"
                  className="w-120 mb-4 p-2 border rounded"
                  placeholder="Search"
                  value={searchTermLocation}
                  onChange={(e) => {
                    setSearchTermLocation(e.target.value);
                    setCurrentPageUnits(1);
                  }}
                /> */}
                <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                  <table
                    style={{ width: "100%" }}
                    className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg"
                  >
                    <thead className="bg-white text-black  border-b-gray-400">
                      <tr className="text-sm font-medium text-center uppercase">
                        <th className="p-2 text-center">Quotation #</th>
                        <th className="p-2 text-center">Product Name</th>

                        <th className="p-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                  {VendorData?.quotations?.map((quotation) => (
                    <tr key={quotation.id} className="border-b">
                      <td className="p-2">{quotation.quotation_no}</td>
                      <td className="p-2">{quotation.project_name}</td>
                      <td className="p-2">
                        <button
                          //   onClick={() => handleViewQuotation(quotation.id)}
                          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                          View
                        </button>
                        <ViewQuo id={quotation.id} />
                      </td>
                    </tr>
                  ))}
                </tbody> */}
                    <tbody>
                      {paginatedRight && paginatedRight.length > 0 ? (
                        paginatedRight.map((unit) => (
                          <tr key={unit.id} className="">
                            <td className="p-2 text-center">
                              {unit.quotation_no}
                            </td>
                            <td className="p-2 text-center">
                              {unit.project_name}
                            </td>
                            <td className="p-2 flex justify-center items-center">
                              {/* <View id={unit.id} /> */}
                              <button
                                onClick={() =>
                                  handleViewClick(unit.id.toString())
                                }
                                className="hover:underline hover:cursor-pointer flex items-center gap-2   text-blue-800 transition duration-200 uppercase"
                                disabled={loadingId === unit.id.toString()}
                              >
                                {loadingId === unit.id.toString() ? (
                                  <span className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></span>
                                ) : (
                                  "View"
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="p-4 text-center text-gray-500"
                          >
                            No records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end items-center gap-2 mt-3 text-sm">
                  <button
                    onClick={handlePrevUnits}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-800 transition"
                    disabled={currentPageUnits === 1}
                  >
                    Previous
                  </button>
                  <span className="text-xs mr-2">
                    Page {currentPageUnits} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextUnits}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-800 transition"
                    disabled={currentPageUnits === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
