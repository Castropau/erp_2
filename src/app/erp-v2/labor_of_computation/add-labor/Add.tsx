"use client";
// import { Boms, fetchBomList } from "@/api/bill_of_materials/fetchBill";
// import { fetchDefaultsList } from "@/api/bill_of_materials/fetchDefaults";
// import { BomUser, fetchbomUser } from "@/api/bill_of_materials/fetchUsers";
// import { AddLabor, registerLabor } from "@/api/labor_of_computation/addLabor";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Form, Field, Formik } from "formik";
import Link from "next/link";
import React from "react";
// import ActiveNav1 from "../_components/AddComponents/ActiveNav1";
// import ActiveNav2 from "../_components/AddComponents/ActiveNav2";
// import ActiveNav3 from "../_components/AddComponents/ActiveNav3";
// import ActiveNav4 from "../_components/AddComponents/ActiveNav4";
// import ActiveNav5 from "../_components/AddComponents/ActiveNav5";
// import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import Forms from "../_components/Functions/Forms";

const Add = () => {
  return (
    <div>
      <Link
        className="btn text-black uppercase"
        href="/erp-v2/labor_of_computation"
      >
        back to labor of computation
      </Link>
      <Forms />
    </div>
  );
};

export default Add;
