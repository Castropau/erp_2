import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useQuery } from "@tanstack/react-query";
import { fetchPermission, PermissionList } from "@/api/User/fetchPermission";

function ModuleAccess() {
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch permissions with React Query
  const {
    data: permissions,
    isLoading,
    error,
  } = useQuery<PermissionList[]>({
    queryKey: ["permissions"],
    queryFn: fetchPermission,
  });

  // While loading or error, show some feedback
  if (isLoading) return <div>Loading permissions...</div>;
  if (error) return <div>Error loading permissions</div>;

  // Create initial form values: one checkbox per permission (all false)
  const initialValues =
    permissions?.reduce((acc, perm) => {
      acc[perm.codename] = false;
      return acc;
    }, {} as Record<string, boolean>) || {};

  return (
    <div>
      <button className="btn btn-xs" onClick={() => setShowEditModal(true)}>
        Module Access
      </button>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Module Access</h2>

            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                console.log("Selected permissions:", values);
                setSubmitting(false);
                setShowEditModal(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                    {permissions?.map((perm) => (
                      <label
                        key={perm.id}
                        className="flex items-center space-x-2"
                      >
                        <Field
                          type="checkbox"
                          name={perm.codename}
                          className="checkbox"
                        />
                        <span>{perm.name}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      className="btn btn-ghost uppercase"
                      onClick={() => setShowEditModal(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn uppercase"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save"}
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
}

export default ModuleAccess;
