"use client";
import { Formik, Form, Field, FieldProps } from "formik";
import React, { useState, useEffect } from "react";
// import AddUnit from "../../../cheque-request/_components/Modal/AddUnit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { ChequeItems } from "@/api/cheque-request/fetchItems";
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
import { fetchVendorDataById } from "@/api/vendor/fetchVendorId";
import { useParams } from "next/navigation";
import { UpdateView, updateView } from "@/api/vendor/updateView";
import { CountryList, fetchCountryList } from "@/api/vendor/fetchCountry";
import NotFound from "@/components/Error/NotFound";
import Image from "next/image";
import ImageLogo from "../../../../images/logo.png";

function View({
  values,
}: // setFieldValue,
// countryList,
// isEditable,
{
  values: CountryList;
  setFieldValue: (field: string, value: string) => void;
  countryList: CountryList[];
}) {
  const [search, setSearch] = useState("");
  // const { id } = props;
  const [isEditable, setIsEditable] = useState(false); // State to toggle between edit and view mode
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState<any | null>(null);
  // const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  // const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  // const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchTermLocation, setSearchTermLocation] = useState("");
  // const [currentPageItems, setCurrentPageItems] = useState(1);
  const [currentPageUnits, setCurrentPageUnits] = useState(1);
  // const [search, setSearch] = useState(""); // State to manage the search query
  // const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const id = Number(params?.id);
  // const [search, setSearch] = useState("");

  // Track whether we've initialized the search input
  // const [hasInitialized, setHasInitialized] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);

  // State declarations (outside JSX)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);

  // Access Formik context to get values

  // Derive selected country and filtered list outside

  // Move useEffect OUTSIDE JSX

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };
  const handleCancel = () => {
    setIsEditable(false); // Switch back to readonly mode without saving
  };
  const queryClient = useQueryClient();

  const rowsPerPage = 1;
  const {
    // isLoading: DisLoading,
    // error: Derror,
    data: countryList,
  } = useQuery({
    queryKey: ["country"],
    queryFn: fetchCountryList,
  });
  // const selectedCountry = countryList?.find((c) => c.id === values.country);
  // const filtered = countryList?.filter((c) =>
  //   c.name.toLowerCase().includes(search.toLowerCase())
  // );
  const selectedCountry = values
    ? countryList?.find((c) => c.id === values.name)
    : undefined;

  const filtered = countryList?.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!hasInitialized && selectedCountry) {
      setSearch(selectedCountry.name);
      setHasInitialized(true);
    }
  }, [selectedCountry, hasInitialized]);
  // const {
  //   isLoading: isItemsLoading,
  //   error: itemsError,
  //   data: itemsData,
  // } = useQuery({
  //   queryKey: ["items"],
  //   queryFn: ChequeItems,
  // });

  const {
    isLoading: isUnitsLoading,
    // error: UnitsError,
    // data: unitsData,
  } = useQuery({
    queryKey: ["units"],
    queryFn: ChequeUnits,
  });

  const {
    data: VendorData,
    isLoading,
    // isError,
    error,
  } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => fetchVendorDataById(id),
    enabled: !!id,
  });

  const newVendorData = VendorData?.items.filter((data) =>
    Object.values(data).some(
      (val) =>
        typeof val == "string" &&
        val
          .toLocaleLowerCase()
          .includes(searchTermLocation?.toLocaleLowerCase() || "")
    )
  );

  // pagination
  const paginatedVendorData = newVendorData?.slice(
    (currentPageUnits - 1) * rowsPerPage,
    currentPageUnits * rowsPerPage
  );

  const totalPagesUnits = Math.ceil((newVendorData?.length || 0) / rowsPerPage);

  const { mutate: updateVendor } = useMutation({
    mutationFn: (data: UpdateView) => updateView(VendorData!.id, data),
    onSuccess: () => {
      console.log("vendor updated successfully");

      queryClient.invalidateQueries({ queryKey: ["vendor", id] });
      queryClient.invalidateQueries({ queryKey: ["vendor"] });
      // setShowEditModal(false);
    },
    onError: (error) => {
      console.error("Error updating cheque:", error);
    },
  });

  // const totalPagesItems = Math.ceil((itemsData?.length || 0) / rowsPerPage);

  // const totalPagesUnits = Math.ceil((VendorData?.length || 0) / rowsPerPage);
  // const totalPagesUnits = Math.ceil(
  //   (VendorData?.items?.length || 0) / rowsPerPage
  // );
  // const New = VendorData?.items?.slice(
  //   (currentPageUnits - 1) * rowsPerPage,
  //   currentPageUnits * rowsPerPage
  // );

  // const filteredItemsData = itemsData?.filter((item) =>
  //   item.item.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const filteredUnitsData = unitsData?.filter((location) =>
  //   location.unit_of_measurement
  //     .toLowerCase()
  //     .includes(searchTermLocation.toLowerCase())
  // );
  // const filteredUnitsData = unitsData?.filter((location) =>
  //   location.unit_of_measurement
  //     .toLowerCase()
  //     .includes(searchTermLocation.toLowerCase())
  // );

  // const paginatedUnitsData = filteredUnitsData?.slice(
  //   (currentPageUnits - 1) * rowsPerPage,
  //   currentPageUnits * rowsPerPage
  // );

  // const indexOfLastRowItems = currentPageItems * rowsPerPage;
  // const indexOfFirstRowItems = indexOfLastRowItems - rowsPerPage;

  // const currentItemsRows = filteredItemsData?.slice(
  //   indexOfFirstRowItems,
  //   indexOfLastRowItems
  // );

  // const indexOfLastRowUnits = currentPageUnits * rowsPerPage;
  // const indexOfFirstRowUnits = indexOfLastRowUnits - rowsPerPage;

  // const currentUnitsRows = filteredUnitsData?.slice(
  //   indexOfFirstRowUnits,
  //   indexOfLastRowUnits
  // );

  const handlePrevUnits = () => {
    if (currentPageUnits > 1) setCurrentPageUnits(currentPageUnits - 1);
  };

  const handleNextUnits = () => {
    if (currentPageUnits < totalPagesUnits)
      setCurrentPageUnits(currentPageUnits + 1);
  };

  // delete location mutation

  useEffect(() => {
    setCurrentPageUnits(1);
  }, [VendorData]);
  if (error) {
    return <NotFound />;
  }
  if (isLoading) {
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
      <div className="ml-auto">
        <Link href="/erp-v2/vendors">
          <button className="btn uppercase">
            {/* <IoMdArrowBack /> */}
            Back to vendor list
          </button>
        </Link>
      </div>
      {/* <div className="grid grid-cols-2 gap-6"> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* First Column: Personal Information Input */}
        <div className="space-y-4">
          {/* Button to toggle between Edit and Update */}
          {/* <div className="flex space-x-2 justify-end"> */}
          <div className="flex justify-end gap-2">
            {!isEditable ? (
              <button
                onClick={handleEditToggle}
                className="btn text-black cursor-pointer uppercase"
              >
                Edit
              </button>
            ) : (
              <>
                <button onClick={handleCancel} className="btn uppercase">
                  Cancel
                </button>
                {/* <button
                    onClick={handleEditToggle} // This would be where you handle the update logic
                    className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                  >
                    Update
                  </button> */}
              </>
            )}
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-1">
            <Image
              // src="/images/logo.png"
              src={ImageLogo}
              // Replace with the actual profile image URL
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
            <span className="ml-4 text-lg text-center font-semibold">
              {VendorData?.vendor}
            </span>
          </div>

          {/* Name Input */}
          {/* Formik Form for Personal Information */}
          <Formik
            initialValues={{
              vendor: VendorData?.vendor || "",
              contact_number: VendorData?.contact_number || "",
              email: VendorData?.email || "",
              address: VendorData?.address || "",
              country: VendorData?.country || "",
              tin: VendorData?.tin || "",
              contact_person: VendorData?.contact_person || "",
              bank_details: VendorData?.bank_details || "",
              description: VendorData?.description || "",
            }}
            enableReinitialize
            // onSubmit={(values) => {
            //   updateVendor(values);
            // }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await updateVendor(values);
                console.log("Client updated:", values);

                // Optionally show success alert
                setShowSuccess(true);
                setTimeout(() => {
                  window.location.href = "/erp-v2/vendors";
                }, 2000);
              } catch (error) {
                console.error("Update failed:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { type: "text", name: "vendor", label: "Vendor" },
                {
                  type: "text",
                  name: "contact_number",
                  label: "Contact Number",
                },
                { type: "email", name: "email", label: "Email" },
                { type: "text", name: "address", label: "Address" },
                { type: "text", name: "tin", label: "TIN" },
                {
                  type: "text",
                  name: "contact_person",
                  label: "Contact Person",
                },
                { type: "text", name: "bank_details", label: "Bank Details" },
                { type: "text", name: "description", label: "Description" },

                {
                  type: "select",
                  name: "country",
                  label: "Country",
                  options: countryList || [],
                },
                // ].map(({ type, name, label }) => (
              ]
                .filter(({ name }) => !(isEditable && name === "country"))
                .map(({ type, name, label }) => (
                  <div key={name} className="space-y-1">
                    <label
                      htmlFor={name}
                      className="text-sm font-medium uppercase"
                    >
                      {label}
                    </label>
                    <Field
                      type={type}
                      id={name}
                      name={name}
                      placeholder={`Enter ${label}`}
                      // className="w-full p-2.5 border rounded bg-gray-50 text-sm"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      readOnly={!isEditable}
                    />
                  </div>
                ))}

              {/* {isEditable && (
                <div className="space-y-1 col-span-1 md:col-span-2">
                  <label className="text-sm font-medium uppercase">
                    Country
                  </label>
                  <Field name="country">
                    {({ field, form }: FieldProps) => {
                      const selectedCountry = countryList?.find(
                        (c) => c.id === form.values.country
                      );
                      const filtered = countryList?.filter((c) =>
                        c.name.toLowerCase().includes(search.toLowerCase())
                      );

                      useEffect(() => {
                        if (!hasInitialized && selectedCountry) {
                          setSearch(selectedCountry.name);
                          setHasInitialized(true);
                        }
                      }, [selectedCountry, hasInitialized]);

                      return (
                        <div className="relative">
                          <input
                            type="text"
                            {...field}
                            value={search}
                            // name="country"
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={() => setIsOpen(true)}
                            onBlur={() =>
                              setTimeout(() => setIsOpen(false), 200)
                            }
                            placeholder="Search country..."
                            // className="w-full p-2.5 border rounded bg-gray-50 text-sm"
                            className=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-97.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            readOnly={!isEditable}
                          />
                          {isOpen && (
                            <div className="absolute w-full bg-white shadow-lg max-h-60 overflow-auto z-10">
                              {filtered!.length > 0 ? (
                                filtered?.map((country) => (
                                  <div
                                    key={country.id}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => {
                                      form.setFieldValue("country", country.id);
                                      setSearch(country.name);
                                      setIsOpen(false);
                                    }}
                                  >
                                    {country.name}
                                  </div>
                                ))
                              ) : (
                                <div className="p-2 text-gray-500">
                                  No countries found
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }}
                  </Field>
                </div>
              )} */}

              {isEditable && (
                <div className="space-y-1 col-span-1 md:col-span-2">
                  <label className="text-sm font-medium uppercase">
                    Country
                  </label>
                  {/* <Field name="country">
                    {({ field }: FieldProps) => (
                      <div className="relative">
                        <input
                          type="text"
                          {...field}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onFocus={() => setIsOpen(true)}
                          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                          placeholder="Search country..."
                          className=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-97.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly={!isEditable}
                        />
                        {isOpen && (
                          <div className="absolute w-full bg-white shadow-lg max-h-60 overflow-auto z-10">
                            {filtered!.length > 0 ? (
                              filtered!.map((country) => (
                                <div
                                  key={country.id}
                                  className="p-2 hover:bg-gray-200 cursor-pointer"
                                  onMouseDown={() => {
                                    setFieldValue("country", country.id);
                                    setSearch(country.name);
                                    setIsOpen(false);
                                  }}
                                >
                                  {country.name}
                                </div>
                              ))
                            ) : (
                              <div className="p-2 text-gray-500">
                                No countries found
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </Field> */}
                  <Field name="country">
                    {({ field, form }: FieldProps) => (
                      <div className="relative">
                        <input
                          type="text"
                          {...field}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onFocus={() => setIsOpen(true)}
                          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                          placeholder="Search country..."
                          className=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-97.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly={!isEditable}
                        />
                        {isOpen && (
                          <div className="absolute w-full bg-white shadow-lg max-h-60 overflow-auto z-10">
                            {filtered!.length > 0 ? (
                              filtered!.map((country) => (
                                <div
                                  key={country.id}
                                  className="p-2 hover:bg-gray-200 cursor-pointer"
                                  onMouseDown={() => {
                                    form.setFieldValue("country", country.id); // ✅ fixed
                                    setSearch(country.name);
                                    setIsOpen(false);
                                  }}
                                >
                                  {country.name}
                                </div>
                              ))
                            ) : (
                              <div className="p-2 text-gray-500">
                                No countries found
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              )}

              {/* Submit */}
              {isEditable && (
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="btn uppercase">
                    Update
                  </button>
                </div>
              )}
            </Form>
          </Formik>
        </div>

        {/* Second Column: Table */}
        <div className="bg-white p-4 rounded-lg  dark:bg-gray-dark dark:text-white">
          {/* <AddUnit /> */}
          {isUnitsLoading ? (
            <div>Loading locations...</div>
          ) : (
            <>
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
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table
                  style={{ width: "100%" }}
                  className="table-zebra table-xs w-full border border-gray-200 rounded-lg shadow-lg"
                >
                  <thead className="bg-white text-black  border-b-gray-400">
                    <tr className="text-sm font-medium text-center uppercase">
                      <th className="p-2 text-center">Product #</th>
                      <th className="p-2 text-center">Product Name</th>
                      <th className="p-2 text-center">Active</th>
                      <th className="p-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                  {VendorData?.items?.length > 0 ? (
                    VendorData?.items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-2 text-center">{item.item_no}</td>
                        <td className="p-2 text-center">{item.item}</td>
                        <td className="p-2 text-center">
                          {item.is_active ? "True" : "False"}
                        </td>
                        <td className="p-2 text-center">
                          <Link href={`/erp-v2/vendors/view-item/${item.id}`}>
                            <button className="uppercase px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition  gap-2">
                              View
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-500">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody> */}
                  <tbody>
                    {paginatedVendorData!.length > 0 ? (
                      paginatedVendorData?.map((item) => (
                        <tr key={item.id} className="">
                          <td className="p-2 text-center">{item.item_no}</td>
                          <td className="p-2 text-center">{item.item}</td>
                          <td className="p-2 text-center">
                            {item.is_active ? "True" : "False"}
                          </td>
                          <td className="text-xs flex gap-2 justify-center py-1 px-4">
                            <Link href={`/erp-v2/vendors/view-item/${item.id}`}>
                              <button className="hover:underline hover:cursor-pointer flex items-center gap-2   text-blue-800  px-4 py-2 transition duration-200 uppercase">
                                View
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="p-4 text-center text-gray-500"
                        >
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end items-center mt-4 gap-2">
                <button
                  onClick={handlePrevUnits}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
                  disabled={currentPageUnits === 1}
                >
                  Previous
                </button>
                <span className="text-xs mr-2">
                  Page {currentPageUnits} of {totalPagesUnits}
                </span>
                <button
                  onClick={handleNextUnits}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-500 hover:bg-maroon-800 transition"
                  disabled={currentPageUnits === totalPagesUnits}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default View;
