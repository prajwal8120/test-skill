import { ReactNode } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowDownLong } from "react-icons/fa6";

interface TableHeaderItem {
  key: string;
  headerName: string;
  postIcon: ReactNode;
}

export const superAdminTableHeader: TableHeaderItem[] = [
  { key: "logo", headerName: "Logo", postIcon: null },
  {
    key: "organisation",
    headerName: "Organisation",
    postIcon: <FaArrowDownLong />,
  },
  { key: "industry", headerName: "Industry", postIcon: <FaArrowDownLong /> },
  { key: "employee", headerName: "Employee", postIcon: <FaArrowDownLong /> },
  { key: "actions", headerName: "", postIcon: <BsThreeDotsVertical /> },
];
