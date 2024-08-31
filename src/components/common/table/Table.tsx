"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { TableProps } from "@/interface/table";
import React from "react";

const Table: React.FC<TableProps> = ({
  tableHeader,
  children,
  isCheckBox,
  allChecked,
  onHeaderCheckboxChange,
  onSort,
}) => {
  const handleSort = (key: string) => {
    if (onSort) {
      onSort(key);
    }
  };
  return (
    <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-[#F8FAFC]">
          <tr>
            {tableHeader?.map((item, index) => (
              <th key={index}>
                <div
                  className={`flex flex-row items-center px-6 py-3 text-xs font-medium text-[#475569] tracking-wider ${
                    index != 0 && "justify-center"
                  }  gap-1 `}
                  onClick={() => handleSort(item?.headerName)}
                >
                  {isCheckBox && index === 0 && (
                    <Checkbox
                      checked={allChecked}
                      onCheckedChange={(checked: boolean) =>
                        onHeaderCheckboxChange?.(checked)
                      }
                    />
                  )}
                  <p>{item.headerName}</p>
                  {item.postIcon && (
                    <span className="ml-1 text-[#475569] cursor-pointer">
                      {item.postIcon}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
