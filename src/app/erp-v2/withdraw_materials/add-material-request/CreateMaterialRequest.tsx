import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

// Simulated data for the table (replace with actual data as needed)
const tableData = [
  {
    id: 1,
    name: "Item 1",
    quantity: 10,
    unit: "pcs",
    specification: "Spec 1",
    description: "Description 1",
  },
  {
    id: 2,
    name: "Item 2",
    quantity: 5,
    unit: "pcs",
    specification: "Spec 2",
    description: "Description 2",
  },
  {
    id: 3,
    name: "Item 3",
    quantity: 20,
    unit: "pcs",
    specification: "Spec 3",
    description: "Description 3",
  },
  // Add more rows as needed
];

function CreateMaterialRequest() {
  const [requestor, setRequestor] = useState("");
  const [dateRequested, setDateRequested] = useState("");
  const [dateNeeded, setDateNeeded] = useState("");
  const [purpose, setPurpose] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "requestor") setRequestor(value);
    if (name === "dateRequested") setDateRequested(value);
    if (name === "dateNeeded") setDateNeeded(value);
    if (name === "purpose") setPurpose(value);
  };

  // Handle modal opening/closing
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle selecting a row from the modal
  const handleSelectRow = (row) => {
    setSelectedRows([...selectedRows, row]);
    toggleModal(); // Close the modal after selection
  };

  // Handle the table search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter table data based on search term
  // const filteredTableData = tableData.filter(
  //   (row) =>
  //     row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     row.specification.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredTableData = tableData.filter((row) => {
    // Remove all spaces and convert to lowercase for comparison
    const normalizedRowName = row.name.replace(/\s+/g, "").toLowerCase();
    const normalizedSearchTerm = searchTerm.replace(/\s+/g, "").toLowerCase();

    // Check if the normalized name matches the normalized search term
    return normalizedRowName.includes(normalizedSearchTerm);
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", {
      requestor,
      dateRequested,
      dateNeeded,
      purpose,
      selectedRows,
    });
  };

  // Handle cancel action (reset form)
  const handleCancel = () => {
    setRequestor("");
    setDateRequested("");
    setDateNeeded("");
    setPurpose("");
    setSelectedRows([]);
  };

  return (
    <>
      <h3 className="font-bold">Withdraw Materials</h3>
      <Link href="/erp-v2/withdraw_materials">
        <button className="btn btn-info">
          <FaArrowLeft />
          back
        </button>
      </Link>
      <div className="p-6 bg-gray-50">
        <h2 className="text-xl font-bold mb-6">Create Material Request</h2>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-4">
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700">
                Name of Requestor
              </label>
              <input
                type="text"
                name="requestor"
                value={requestor}
                onChange={handleInputChange}
                list="requestor-options"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Select or type requestor"
              />
              <datalist id="requestor-options">
                <option value="Requestor 1" />
                <option value="Requestor 2" />
                <option value="Requestor 3" />
                <option value="Requestor 4" />
              </datalist>
            </div>

            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700">
                Date of Request
              </label>
              <input
                type="date"
                name="dateRequested"
                value={dateRequested}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700">
                Date Needed
              </label>
              <input
                type="date"
                name="dateNeeded"
                value={dateNeeded}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Purpose
            </label>
            <input
              type="text"
              name="purpose"
              value={purpose}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Button to open Modal */}
          <div className="mb-4">
            <button
              type="button"
              onClick={toggleModal}
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Select Items
            </button>
          </div>

          {/* Display Selected Rows Below the Button */}
          <div className="mb-4">
            <h3 className="font-medium">Selected Items:</h3>
            <table className="min-w-full border-collapse table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Unit</th>
                  <th className="border px-4 py-2">Specification</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedRows.map((row, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{row.id}</td>
                    <td className="border px-4 py-2">{row.name}</td>
                    <td className="border px-4 py-2">{row.quantity}</td>
                    <td className="border px-4 py-2">{row.unit}</td>
                    <td className="border px-4 py-2">{row.specification}</td>
                    <td className="border px-4 py-2">{row.description}</td>
                    <td className="border px-4 py-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedRows(
                            selectedRows.filter((_, i) => i !== index)
                          )
                        }
                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-4">
            <Link
              className="w-full bg-blue-500 text-white text-center py-2 rounded-md"
              href="/erp-v2/withdraw_materials"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-opacity-50  flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-2/4">
              <h3 className="text-lg font-semibold mb-4">Select Items</h3>

              {/* Search input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>

              {/* Table */}
              <table className="min-w-full border-collapse table-auto">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Quantity</th>
                    <th className="border px-4 py-2">Unit</th>
                    <th className="border px-4 py-2">Specification</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTableData.map((row) => (
                    <tr key={row.id}>
                      <td className="border px-4 py-2">{row.id}</td>
                      <td className="border px-4 py-2">{row.name}</td>
                      <td className="border px-4 py-2">{row.quantity}</td>
                      <td className="border px-4 py-2">{row.unit}</td>
                      <td className="border px-4 py-2">{row.specification}</td>
                      <td className="border px-4 py-2">{row.description}</td>
                      <td className="border px-4 py-2">
                        <button
                          type="button"
                          onClick={() => handleSelectRow(row)}
                          disabled={selectedRows.some(
                            (selected) => selected.id === row.id
                          )} // Disable if already selected
                          className={`${
                            selectedRows.some(
                              (selected) => selected.id === row.id
                            )
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-blue-500"
                          } text-white py-1 px-2 rounded-md`}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Close Modal */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={toggleModal}
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateMaterialRequest;
