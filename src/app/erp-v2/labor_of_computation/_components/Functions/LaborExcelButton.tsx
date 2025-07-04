import React from "react";
import { exportLaborToExcel } from "./ExportExcel";
// Assume LaborData is fetched/available in your component
// interface MappedRowItem {
//   item: string;
//   ratio: string | number;
//   unit: string;
//   quantity: number;
//   manpower: number;
//   no_of_days: number;
//   labor_cost: number;
//   per_unit_cost: number;
// }

// interface MappedHeaders {
//   sub_header: string;
//   items: MappedRowItem[];
// }
interface SubRoughingHeadersItem {
  //  id: number,
  manpower: string;
  no_of_days: string;
  total: string;
  per_unit_cost: string;
  order: number;
  item: string;
  ratio: string;
  unit: string;
  quantity: number;
  labor_cost: number;
}
interface RoughingSubHeaders {
  // id: number,
  items: SubRoughingHeadersItem;
  sub_header: string;
}
interface RoughingItems {
  // id: number,
  manpower: string;
  no_of_days: string;
  total: string;
  per_unit_cost: string;
  order: number;
  item: string;
  ratio: string;
  unit: string;
  quantity: number;
  labor_cost: number;
}
interface Roughing {
  // id: number,
  items: RoughingItems[];
  sub_headers: RoughingSubHeaders;
  items_sub_total: string;
  sub_headers_total: string;
  total: string;
  header: string;
}
interface WiringInsItem {
  // id: number,
  manpower: string;
  no_of_days: string;
  total: string;
  per_unit_cost: string;
  order: number;
  item: string;
  ratio: string;
  unit: string;
  quantity: number;
  labor_cost: number;
}
interface WiringInsHeadersItem {
  //  id: number,
  manpower: string;
  no_of_days: string;
  total: string;
  per_unit_cost: string;
  order: number;
  item: string;
  ratio: string;
  unit: string;
  quantity: number;
  labor_cost: number;
}
interface WiringIns {
  // id: number,
  items: WiringInsItem;
  sub_headers: WiringInsHeadersItem;
  item_sub_total: string;
  sub_headers_total: string;
  header: string;
}
interface DeviceItem {
  // id: number,
  manpower: string;
  no_of_days: string;
  total: string;
  per_unit_cost: string;
  order: number;
  item: string;
  ratio: string;
  unit: string;
  quantity: number;
  labor_cost: number;
}
interface DeviceHeadersItem {
  //  id: number,
  items: DeviceItem;
  items_sub_total: string;
  sub_header: string;
}
interface DeviceInstall {
  // id: number,
  items: DeviceItem;
  sub_headers: DeviceHeadersItem;
  sub_headers_total: string;
  header: string;
}
interface ConfigurationHeadersItem {
  id: number;
  items: ConfigurationItem;
  items_sub_total: string;
  sub_header: string;
}
interface ConfigurationItem {
  // id: number,
  manpower: string;
  no_of_days: string;
  total: string;
  per_unit_cost: string;
  order: number;
  item: string;
  ratio: string;
  unit: string;
  quantity: number;
  labor_cost: number;
}
interface ConfigurationInstall {
  id: number;
  items: ConfigurationItem;
  sub_headers: ConfigurationHeadersItem;
  sub_headers_total: string;
  header: string;
}
interface TestingInstallItem {
  // id: number,
  manpower: string;
  no_of_days: string;
  total: string;
  per_unit_cost: string;
  order: number;
  item: string;
  ratio: string;
  unit: string;
  quantity: number;
  labor_cost: number;
}
interface TestingHeadersItem {
  id: number;
  items: TestingSubItem;
  items_sub_total: string;
  sub_header: string;
}
interface TestingSubItem {
  //  id: number,
  manpower: string;
  no_of_days: string;
  total: string;
  per_unit_cost: string;
  order: number;
  item: string;
  ratio: string;
  unit: string;
  quantity: number;
  labor_cost: number;
}
interface TestingInstall {
  id: number;
  items: TestingInstallItem;
  sub_headers: TestingHeadersItem;
  sub_headers_total: string;
  header: string;
}
interface LaborDataType {
  project_name: string;
  project_duration: string;
  system: string;
  lc_no: string;
  bom: string;
  date_created: string;

  roughing_ins: Roughing[];
  wiring_ins: WiringIns[];
  device_installations: DeviceInstall[];
  configurations: ConfigurationInstall[];
  testing_and_commissionings: TestingInstall[];
}

interface LaborExcelButtonProps {
  data?: LaborDataType;
  isLoading?: boolean;
}

export const LaborExcelButton: React.FC<LaborExcelButtonProps> = ({
  data,
  isLoading,
}) => {
  return (
    <button
      className="btn bg-green-600 hover:bg-green-700 text-white font-semibold uppercase"
      onClick={() => data && exportLaborToExcel(data)}
      disabled={!data || isLoading}
      title={!data ? "Loading..." : "Export to Excel"}
    >
      Export to Excel
    </button>
  );
};
