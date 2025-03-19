import React from "react";
import Sidebar from "../../components/sidebar";
import Users from "../user/_components/users";
import Card from "../user/_components/card";

export default function Page() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:ml-64 flex-grow">
        <Card />
        <br />
        <Users />
      </div>
    </div>
  );
}
