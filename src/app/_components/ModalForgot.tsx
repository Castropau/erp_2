import React, { useState } from "react";

const ModalForgot = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="   text-blue-600 text-sm  hover:underline hover:cursor-pointer"
        onClick={() => setShowRegisterModal(true)}
      >
        {/* <FaCirclePlus className="w-6 h-5 btn-info" /> */}
        Forgot password?
      </button>
      {showRegisterModal && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-md rounded-lg shadow-lg bg-white p-6">
            {/* if there is a button in form, it will close the modal */}
            {/* <button className="btn">Close</button> */}
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              If you forgot your credentials please contact the admin
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                className="btn bg-gray-200 uppercase text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                onClick={() => setShowRegisterModal(false)}
              >
                Close
              </button>
            </div>
          </div>
          {/* <button
            type="button"
            className="btn bg-gray-200 uppercase text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
            onClick={() => setShowRegisterModal(false)}
          >
            Close
          </button> */}
        </dialog>
      )}
    </div>
  );
};

export default ModalForgot;
