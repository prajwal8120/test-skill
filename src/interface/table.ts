import { ReactNode } from "react";

export interface TableHeader {
  key: string;
  headerName: string;
  postIcon?: any;
}

export interface TableProps {
  tableHeader: TableHeader[];
  children: ReactNode;
  isCheckBox?: boolean;
  onHeaderCheckboxChange?: (checked: boolean) => void;
  allChecked?: boolean;
  onSort?: (key: string) => void;
}
