"use client";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Field, Form, Formik } from "formik";
import React from "react";
// import ActiveNav1 from "../_components/AddComponents/ActiveNav1";
// import ActiveNav2 from "../_components/AddComponents/ActiveNav2";
// import ActiveNav3 from "../_components/AddComponents/ActiveNav3";
// import ActiveNav4 from "../_components/AddComponents/ActiveNav4";
// import { AddBoms, registerBom } from "@/api/bill_of_materials/addBom";
// import { fetchSicUser, SicUser } from "@/api/bill_of_materials/fetchSic";
// import { EicUser, fetchEicUser } from "@/api/bill_of_materials/fetchEic";
// import {
//   ClientUser,
//   fetchbomClient,
// } from "@/api/bill_of_materials/fetchClients";
import Link from "next/link";
// import TableSection from "../_components/Table/TableSection";
import AddForm from "../_components/Function/AddForm";

const Add = () => {
  return (
    <div>
      <Link
        className="btn text-black uppercase"
        href="/erp-v2/bill_of_materials"
      >
        back to bill of materials
      </Link>
      <AddForm />
    </div>
  );
};

export default Add;
