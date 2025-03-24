import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const validatedForm = (values: any) => {
  const errors: any = {};
  if (!values.fullName) {
    errors.fullName = "Full Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  return errors;
};

function ModuleAccess() {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div>
      <button className="btn btn-xs" onClick={() => setShowEditModal(true)}>
        Module Access
      </button>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Module Access</h2>
            <Formik
              initialValues={{ fullName: "", email: "" }}
              validate={validatedForm}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  console.log(values);
                  setSubmitting(false);
                  setShowEditModal(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="fullName">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="input w-full border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="input w-full border border-gray-300 rounded p-2"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn btn-secondary mr-2"
                      onClick={() => setShowEditModal(false)} // Close modal
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
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
