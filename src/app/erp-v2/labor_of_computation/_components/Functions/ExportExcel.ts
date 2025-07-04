// import * as XLSX from "xlsx";
import * as XLSX from "xlsx-js-style";

//  interface MappedRowItem {
//   item: string;
//   ratio: string | number;
//   unit: string;
//   quantity: number;
//   manpower: number;
//   no_of_days: number;
//   labor_cost: number;
//   per_unit_cost: number;
// }

//  interface MappedHeaders {
//   sub_header: string;
//   items: MappedRowItem[];
// }
interface SubRoughingHeadersItem{
    //  id: number,
    manpower: string,
    no_of_days: string,
    total: string,
    per_unit_cost: string,
    order: number,
    item: string,
    ratio: string,
    unit: string,
    quantity: number,
    labor_cost: number,

}
interface RoughingSubHeaders{
    // id: number,
    items: SubRoughingHeadersItem,
    sub_header: string,

}
interface RoughingItems{
    // id: number,
    manpower: string,
    no_of_days: string,
    total: string,
    per_unit_cost: string,
    order: number,
    item: string,
    ratio: string,
    unit: string,
    quantity: number,
    labor_cost: number,
}
interface Roughing{
    // id: number,
    items: RoughingItems[],
    sub_headers: RoughingSubHeaders,
    items_sub_total: string,
    sub_headers_total: string,
    total: string,
    header: string,

   
}
interface WiringInsItem{
    // id: number,
     manpower: string,
    no_of_days: string,
    total: string,
    per_unit_cost: string,
    order: number,
    item: string,
    ratio: string,
    unit: string,
    quantity: number,
    labor_cost: number,
    
}
interface WiringInsHeadersItem{
    //  id: number,
    manpower: string,
    no_of_days: string,
    total: string,
    per_unit_cost: string,
    order: number,
    item: string,
    ratio: string,
    unit: string,
    quantity: number,
    labor_cost: number,

}
interface WiringIns{
    // id: number,
    items: WiringInsItem,
    sub_headers: WiringInsHeadersItem,
    item_sub_total: string,
    sub_headers_total: string,
    header: string,



}
interface DeviceItem{
    // id: number,
    manpower: string,
    no_of_days: string,
    total: string,
    per_unit_cost: string,
    order: number,
    item: string,
    ratio: string,
    unit: string,
    quantity: number,
    labor_cost: number,
}
interface DeviceHeadersItem{
    //  id: number,
    items: DeviceItem,
    items_sub_total: string,
    sub_header: string,
    

}
interface DeviceInstall{
    // id: number,
    items: DeviceItem,
    sub_headers: DeviceHeadersItem,
    sub_headers_total: string,
    header: string,
}
interface ConfigurationHeadersItem {
  id: number;
  items: ConfigurationItem;
  items_sub_total: string;
  sub_header: string;
}
interface ConfigurationItem{
    // id: number,
    manpower: string,
    no_of_days: string,
    total: string,
    per_unit_cost: string,
    order: number,
    item: string,
    ratio: string,
    unit: string,
    quantity: number,
    labor_cost: number,
}
interface ConfigurationInstall {
  id: number;
  items: ConfigurationItem;
  sub_headers: ConfigurationHeadersItem;
  sub_headers_total: string;
  header: string;
}
interface TestingInstallItem{
    // id: number,
    manpower: string,
    no_of_days: string,
    total: string,
    per_unit_cost: string,
    order: number,
    item: string,
    ratio: string,
    unit: string,
    quantity: number,
    labor_cost: number,
}
interface TestingHeadersItem {
  id: number;
  items: TestingSubItem;
  items_sub_total: string;
  sub_header: string;
}
interface TestingSubItem{
      //  id: number,
    manpower: string,
    no_of_days: string,
    total: string,
    per_unit_cost: string,
    order: number,
    item: string,
    ratio: string,
    unit: string,
    quantity: number,
    labor_cost: number,
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

// import * as XLSX from "xlsx";

// import * as XLSX from "xlsx";

export const exportLaborToExcel = (LaborData: LaborDataType) => {
  if (!LaborData) return;

  // Create new workbook
  const wb = XLSX.utils.book_new();

  // === Overview Sheet ===
  const overviewData = [
    ["Labor Computation"],
    [],
    ["Project Name:", LaborData.project_name],
    ["Project Duration:", LaborData.project_duration],
    ["System:", LaborData.system],
    ["LC No:", LaborData.lc_no],
    ["BOM No:", LaborData.bom],
    ["Date Created:", LaborData.date_created],
  ];
  const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);

  // Set column widths for overview
  overviewSheet["!cols"] = [
    { wch: 20 },
    { wch: 35 },
    ...Array(8).fill({ wch: 15 }),
  ];

  // Style overview sheet header and labels
  overviewSheet["A1"].s = {
    font: { bold: true, sz: 14 },
    alignment: { horizontal: "left" },
    fill: { fgColor: { rgb: "D9E1F2" } },
  };

  const labelCells = ["A3", "A4", "A5", "A6", "A7", "A8"];
  const valueCells = ["B3", "B4", "B5", "B6", "B7", "B8"];

  labelCells.forEach(cell => {
    if (overviewSheet[cell]) {
      overviewSheet[cell].s = {
        font: { bold: true },
        alignment: { horizontal: "left" },
        fill: { fgColor: { rgb: "FCE4D6" } },
      };
    }
  });

  valueCells.forEach(cell => {
    if (overviewSheet[cell]) {
      overviewSheet[cell].s = {
        alignment: { horizontal: "left" },
        fill: { fgColor: { rgb: "FFF2CC" } },
      };
    }
  });

  // Append overview sheet
  XLSX.utils.book_append_sheet(wb, overviewSheet, "Overview");

  // === Border style used in all sheets ===
  const borderStyle = {
    top: { style: "thin", color: { auto: 1 } },
    bottom: { style: "thin", color: { auto: 1 } },
    left: { style: "thin", color: { auto: 1 } },
    right: { style: "thin", color: { auto: 1 } },
  };

  // === Section Sheet Builder ===
  const buildSectionSheet = (sectionName: string, sectionData: any[]) => {
    if (!sectionData) return;

    const colsCount = 9;
    const sheetData: any[] = [];
    const mergeRanges: number[] = [];
    let rowCounter = 1;
    let totalLabor = 0;
    let totalUnit = 0;

    sectionData.forEach((block: any) => {
      // Section headers merged across all columns
      if (block.header) {
        const headerRow = Array(colsCount).fill("");
        headerRow[0] = block.header;
        sheetData.push(headerRow);
        mergeRanges.push(sheetData.length - 1);
      }

      // Sub-headers with possible items
      if (block.sub_headers) {
        block.sub_headers.forEach((sub: any) => {
          if (sub.sub_header) {
            const subHeaderRow = Array(colsCount).fill("");
            subHeaderRow[0] = sub.sub_header;
            sheetData.push(subHeaderRow);
            mergeRanges.push(sheetData.length - 1);
          }

          if (sub.items?.length) {
            // Add column headers for items
            sheetData.push([
              "#",
              "ITEM",
              "RATIO",
              "UNIT",
              "QUANTITY",
              "MANPOWER",
              "NO. OF DAYS",
              "LABOR COST",
              "PER UNIT COST",
            ]);

            // Add items rows
            sub.items.forEach((item: any) => {
              const labor = Number(item.labor_cost || 0);
              const unit = Number(item.per_unit_cost || 0);

              sheetData.push([
                rowCounter++,
                item.item || "",
                item.ratio || "",
                item.unit || "",
                item.quantity || "",
                item.manpower || "",
                item.no_of_days || "",
                labor,
                unit,
              ]);

              totalLabor += labor;
              totalUnit += unit;
            });

            // Empty row for spacing
            sheetData.push([]);
          }
        });
      }

      // Items directly under block
      if (block.items?.length) {
        sheetData.push([
          "#",
          "ITEM",
          "RATIO",
          "UNIT",
          "QUANTITY",
          "MANPOWER",
          "NO. OF DAYS",
          "LABOR COST",
          "PER UNIT COST",
        ]);

        block.items.forEach((item: any) => {
          const labor = Number(item.labor_cost || 0);
          const unit = Number(item.per_unit_cost || 0);

          sheetData.push([
            rowCounter++,
            item.item || "",
            item.ratio || "",
            item.unit || "",
            item.quantity || "",
            item.manpower || "",
            item.no_of_days || "",
            labor,
            unit,
          ]);

          totalLabor += labor;
          totalUnit += unit;
        });

        sheetData.push([]);
      }
    });

    // Add subtotal and grand total rows if there is data
    if (rowCounter > 1) {
      sheetData.push([
        "",
        "Subtotal",
        "",
        "",
        "",
        "",
        "",
        totalLabor,
        totalUnit,
      ]);
      sheetData.push([
        "",
        "Grand Total",
        "",
        "",
        "",
        "",
        "",
        totalLabor,
        totalUnit,
      ]);
    }

    // Generate sheet from data array
    const sheet = XLSX.utils.aoa_to_sheet(sheetData);

    // Set merges for headers and subheaders
    sheet["!merges"] = mergeRanges.map((r) => ({
      s: { r, c: 0 },
      e: { r, c: colsCount - 1 },
    }));

    // Set column widths uniformly
    sheet["!cols"] = Array(colsCount).fill({ wch: 15 });

    // Style cells
    Object.keys(sheet).forEach((key) => {
      if (!key.match(/^[A-Z]+\d+$/)) return;
      const cell = sheet[key];
      const rowNum = parseInt(key.match(/\d+/)![0]) - 1;
      const colLetter = key.match(/[A-Z]+/)![0];
      const rowArray = sheetData[rowNum];

      // Style merged header rows
      if (mergeRanges.includes(rowNum)) {
        if (colLetter === "A") {
          cell.s = {
            font: { bold: true, sz: 14, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4F81BD" } },
            alignment: { horizontal: "center", vertical: "center" },
          };
        }
        return;
      }

      // Style column header rows
      if (rowArray?.[1] === "ITEM") {
        cell.s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "D9E1F2" } },
          alignment: { horizontal: "center" },
          border: borderStyle,
        };
      }
      // Style subtotal & grand total rows
      else if (rowArray?.[1] === "Subtotal" || rowArray?.[1] === "Grand Total") {
        cell.s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "FFE699" } },
          alignment: { horizontal: "center" },
          border: borderStyle,
        };
      }
      // Style regular data rows
      else if (rowArray?.length > 0) {
        cell.s = {
          alignment: { horizontal: "center" },
          border: borderStyle,
        };
      }
    });

    // Append the section sheet to workbook
    XLSX.utils.book_append_sheet(wb, sheet, sectionName);
  };

  // Build all section sheets
  buildSectionSheet("Roughing", LaborData.roughing_ins);
  buildSectionSheet("Wiring", LaborData.wiring_ins);
  buildSectionSheet("Device Installation", LaborData.device_installations);
  buildSectionSheet("Configuration", LaborData.configurations);
  buildSectionSheet("Testing & Commissioning", LaborData.testing_and_commissionings);

  // Create filename with date
  const date = new Date().toLocaleDateString().replace(/\//g, "-");
  XLSX.writeFile(wb, `${LaborData.lc_no}-${date}.xlsx`);
};


