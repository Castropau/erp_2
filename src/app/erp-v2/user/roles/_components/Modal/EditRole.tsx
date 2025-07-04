import { updateRole, Updaterole } from "@/api/Roles/updateRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { Role } from "@/interfaces/Role"; // adjust path as needed

interface EditRoleProps {
  id: number;
  initialData?: Role; // optional prefill if available
}

const EditRole: React.FC<EditRoleProps> = ({ id, initialData }) => {
  const [modal, setModal] = useState(false);
  const [roleData, setRoleData] = useState<Role | null>(initialData || null);
  const queryClient = useQueryClient();

  const { mutate: updateRoleMutate } = useMutation({
    mutationFn: (data: updateRole) => Updaterole(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role"] });
      setModal(false);
    },
    onError: (error: Error) => {
      console.error("Error updating role:", error);
    },
  });

  const handleOpen = () => {
    if (initialData) {
      setRoleData(initialData);
      setModal(true);
    } else {
      // fallback or fetch role if needed
      const existingRole = queryClient
        .getQueryData<Role[]>(["role"])
        ?.find((r) => r.id === id);

      if (existingRole) {
        setRoleData(existingRole);
        setModal(true);
      } else {
        console.warn("Role not found in cache.");
      }
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="hover:cursor-pointer flex items-center gap-2 px-3 py-1 text-blue-600 hover:underline text-xs uppercase"
      >
        edit
      </button>

      {modal && roleData && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Edit Role
            </h3>

            <Formik
              initialValues={{ role: roleData.role || "" }}
              enableReinitialize
              onSubmit={(values) => {
                updateRoleMutate({ id: roleData.id, role: values.role });
              }}
            >
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium mb-1"
                  >
                    Role Name
                  </label>
                  <Field
                    type="text"
                    id="role"
                    name="role"
                    className="input input-bordered w-full px-3 py-2 rounded text-sm"
                    placeholder="Enter role name"
                  />
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="btn uppercase hover:cursor-pointer bg-gray-300 mr-2 hover:bg-gray-400 text-black px-4 py-2 rounded"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn uppercase hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Save
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

export default EditRole;
