"use client";
// import { BomUser, fetchbomUser } from "@/api/bill_of_materials/fetchUsers";
// import { fetchBomList } from "@/api/bom-quotation/fetchBom";
import { fetchlaborId } from "@/api/labor_of_computation/FetchLaborId";
// import {
//   UpdateLabor,
//   updateLabor,
// } from "@/api/labor_of_computation/updateLabor";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
// import { Form, Formik, Field } from "formik";
import { useParams } from "next/navigation";
import React, { useState } from "react";
// import ActiveNav1 from "../../_components/ModalComponents/ActiveNav1";
// import ActiveNav2 from "../../_components/ModalComponents/ActiveNav2";
// import ActiveNav3 from "../../_components/ModalComponents/ActiveNav3";
// import ActiveNav4 from "../../_components/ModalComponents/ActiveNav4";
// import ActiveNav5 from "../../_components/ModalComponents/ActiveNav5";
import Link from "next/link";
// import * as XLSX from "xlsx-js-style";
import NotFound from "@/components/Error/NotFound";
// import { exportLaborToExcel } from "../../_components/Functions/ExportExcel";
import { LaborExcelButton } from "../../_components/Functions/LaborExcelButton";
import EditForms from "../../_components/Functions/EditForms";

const EditLabor = () => {
  // const queryClient = useQueryClient();
  // const pathname = usePathname();
  // const [isEditing, setIsEditing] = useState(false); // New state to track edit mode

  const [showSuccess] = useState(false);
  // const [showSuccessdeleted, setShowSuccessDeleted] = useState(false);
  const params = useParams();
  // const id = router.query.id as string; // or however you get the ID
  const id = params.id as string; // Assuming your route is /edit-labor/[id]

  // const {
  //   data: BomData,
  //   isLoading: Bloading,
  //   isError: BeceiptError,
  //   error: berror,
  // } = useQuery({
  //   queryKey: ["bom"],
  //   queryFn: fetchBomList,
  // });

  const {
    data: LaborData,
    isLoading: Rloading,
    // isError: ReceiptError,
    error: rerror,
  } = useQuery({
    queryKey: ["labor", id],
    queryFn: () => fetchlaborId(id as string),
    enabled: !!id,
  });

  if (Rloading) {
    return <LoadingSpinner />;
  }

  if (rerror) {
    return <NotFound />;
  }
  if (!LaborData) return null; // or a loading spinner
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
          <span>Updated successfully!</span>
        </div>
      )}
      <div className="flex justify-start gap-2">
        <Link
          className="btn text-black uppercase"
          href="/erp-v2/labor_of_computation"
        >
          back to labor of computation
        </Link>
        {/* <button
          className="btn bg-green-600 hover:bg-green-700 text-white font-semibold uppercase"
          onClick={handleExcel}
        >
          export to excel
        </button> */}
        <LaborExcelButton
          data={{
            ...LaborData,
            roughing_ins: Array.isArray(LaborData?.roughing_ins)
              ? LaborData.roughing_ins
              : [LaborData?.roughing_ins], // wrap single object in array
            wiring_ins: Array.isArray(LaborData?.wiring_ins)
              ? LaborData.wiring_ins
              : [LaborData?.wiring_ins], // wrap single object in array
            device_installations: Array.isArray(LaborData?.device_installations)
              ? LaborData.device_installations
              : [LaborData?.device_installations], // wrap single object in array
            configurations: Array.isArray(LaborData?.configurations)
              ? LaborData.configurations
              : [LaborData?.configurations], // wrap single object in array
            testing_and_commissionings: Array.isArray(
              LaborData?.testing_and_commissionings
            )
              ? LaborData.testing_and_commissionings
              : [LaborData?.testing_and_commissionings], // wrap single object in array
            // similarly do this for other properties like wiring_ins, device_installations, etc.
          }}
          isLoading={Rloading}
        />

        {/* <LaborExcelButton data={LaborData} isLoading={Rloading} /> */}

        {/* <LaborExportButton data={LaborData} /> */}
      </div>
      <EditForms id={id} />
    </div>
  );
};

export default EditLabor;
