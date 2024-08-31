import React from "react";
type TableCellProps = {
  children: React.ReactNode;
  className?: string;
};

const TableCell: React.FC<TableCellProps> = ({ children, className = "" }) => {
  return (
    <td
      className={`text-center px-6 py-3 text-[#1E293B] text-xs font-normal leading-[18px] ${className}`}
    >
      {children}
    </td>
  );
};

export default TableCell;