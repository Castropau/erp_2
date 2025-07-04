// import { updateRole, Updaterole } from "@/api/Roles/updateRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
// import { Role } from "@/interfaces/Role"; // adjust path as needed
import { DepartmentL } from "@/api/depts/fetchDepartment";
import {
  updateDepartment,
  Updatedepartment,
} from "@/api/depts/updateDepartment";

interface EditDeptProps {
  id: number;
  initialData?: DepartmentL; // optional prefill if available
}

const EditDept: React.FC<EditDeptProps> = ({ id, initialData }) => {
  const [modal, setModal] = useState(false);
  const [departmentData, setdepartmentData] = useState<DepartmentL | null>(
    initialData || null
  );
  const queryClient = useQueryClient();

  const { mutate: updateDepartmentUp } = useMutation({
    mutationFn: (data: updateDepartment) => Updatedepartment(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
      setModal(false);
    },
    onError: (error: Error) => {
      console.error("Error updating role:", error);
    },
  });

  const handleOpen = () => {
    if (initialData) {
      setdepartmentData(initialData);
      setModal(true);
    } else {
      // fallback or fetch role if needed
      const existingRole = queryClient
        .getQueryData<DepartmentL[]>(["department"])
        ?.find((r) => r.id === id);

      if (existingRole) {
        setdepartmentData(existingRole);
        setModal(true);
      } else {
        console.warn("department not found in cache.");
      }
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-3 py-1 hover:cursor-pointer text-blue-600 hover:underline text-xs uppercase"
      >
        edit
      </button>

      {modal && departmentData && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Edit department
            </h3>

            <Formik
              initialValues={{ department: departmentData.department || "" }}
              enableReinitialize
              onSubmit={(values) => {
                updateDepartmentUp({
                  id: departmentData.id,
                  department: values.department,
                });
              }}
            >
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium mb-1"
                  >
                    Department Name
                  </label>
                  <Field
                    type="text"
                    id="department"
                    name="department"
                    className="input input-bordered w-full px-3 py-2 rounded text-sm"
                    placeholder="Enter department name"
                  />
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="btn uppercase mr-2 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn uppercase bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    save
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDept;
