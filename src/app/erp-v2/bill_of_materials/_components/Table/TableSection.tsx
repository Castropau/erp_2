import React from "react";

interface DeviceRow {
  item: string;
  description: string;
  quantity: number;
  //   unitPrice: string;
  amount: string;
}

interface TableSectionProps {
  title: string;
  rows: DeviceRow[];
  onChange?: (rowIndex: number, field: keyof DeviceRow, value: string) => void;
  onRemoveRow?: (rowIndex: number) => void;
  onAddRow?: () => void;
  getSubtotal?: () => number;
}

const TableSection: React.FC<TableSectionProps> = ({
  title,
  rows,
  onChange,
  onRemoveRow,
  onAddRow,
  getSubtotal,
}) => {
  return (
    <div className="border p-4 bg-gray-50 rounded space-y-2">
      <h3 className="text-xl font-semibold">{title}</h3>
      <table className="table-auto w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Unit Prices</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {(
                [
                  "item",
                  "description",
                  "quantity",
                  "unitPrice",
                  "amount",
                ] as (keyof DeviceRow)[]
              ).map((field) => (
                <td key={field} className="px-4 py-2">
                  <input
                    type="text"
                    value={row[field]}
                    onChange={(e) =>
                      onChange && onChange(rIdx, field, e.target.value)
                    }
                    className="p-2 border rounded"
                  />
                </td>
              ))}
              <td className="px-4 py-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onRemoveRow && onRemoveRow(rIdx)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Subtotal Display */}
      <div className="text-right text-sm font-semibold text-gray-700 mt-2">
        Subtotal: ₱{getSubtotal ? getSubtotal().toFixed(2) : "0.00"}
      </div>

      <button
        className="bg-green-500 text-white px-4 py-1 rounded mt-2"
        onClick={() => onAddRow && onAddRow()}
      >
        Add Row
      </button>
    </div>
  );
};

export default TableSection;
