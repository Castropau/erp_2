"use client";

import { useQuery } from "@tanstack/react-query";

/** api */
import { fetchUserList } from "@/api/User/fetchUserList";
import { fetchRoleData } from "@/api/Roles/Roles";

/** components */
import UserList from "./_components/Table/UserList";
// import CreateUser from "./_components/Modal/CreateUser";
import Card from "./_components/Card/card";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaBuilding, FaUsers } from "react-icons/fa6";
import ServerError from "@/components/Error/ServerError";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { DepartmentL, fetchDepartmentData } from "@/api/depts/fetchDepartment";

export default function Page() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserList,
  });

  const { data: roleList } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoleData,
  });
  const {
    data: datas,
    // isLoading: loading,
    // error: derror,
  } = useQuery<DepartmentL[]>({
    queryKey: ["department"],
    queryFn: fetchDepartmentData,
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error instanceof Error) return <ServerError />;

  const uniqueDepartments = new Set(datas?.map((user) => user.department));
  const departmentCount = uniqueDepartments.size;

  const uniqueRoles = new Set(roleList?.map((user) => user.role));
  const roleCount = uniqueRoles.size;

  const uniqueUsers = new Set(data?.map((user) => user.id));
  const usersCount = uniqueUsers.size;

  return (
    <div className="">
      <div>
        <div className="grid grid-cols-3 gap-3 mb-5 mt-5">
          <Card
            title={`Total of ${usersCount} Users`}
            name="Users"
            color="white"
            border="black"
            icon={<FaUsers size="1.5em" />}
          />
          <Card
            title={`Total of ${departmentCount} Departments`}
            color="white"
            border="black"
            name="Departments"
            icon={<FaBuilding size="1.5em" />}
          />
          <Card
            title={`Total of ${roleCount} Roles`}
            name="Roles"
            color="white"
            border="black"
            icon={<MdAdminPanelSettings size="1.5em" />}
          />
        </div>
        <div className="overflow-x-auto">{/* <CreateUser /> */}</div>
        <UserList />
      </div>
    </div>
  );
}
