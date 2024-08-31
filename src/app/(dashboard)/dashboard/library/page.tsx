"use client";
import Image from "next/image";
import React, { useState } from "react";
import HomeIcon from "@/assets/svg/home-2.svg";
import { Button } from "@/components/ui/button";
import { GrUserManager } from "react-icons/gr";
import { FaArrowDownLong, FaUsersGear } from "react-icons/fa6";
import Card from "@/components/common/card/Card";
import { CiFilter, CiSearch } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";
import SearchBar from "@/components/common/searchBar/SearchBar";
import Breadcrumbs from "@/components/common/breadcrumbs/Breadcrumbs";
import { FaAngleRight } from "react-icons/fa6";
import Table from "@/components/common/table/Table";
import { BsThreeDotsVertical } from "react-icons/bs";
const cardData = [
  {
    id: 1,
    title: "No of Learning bytes Count",
    count: 100,
    icon: <GrUserManager />,
    breadcrumbTitle: "Storage Usages",
    header: "Learning Byte Count",
  },
  {
    id: 2,
    title: "No of Subscribed Libraries",
    count: 34,
    icon: <FaUsersGear />,
    breadcrumbTitle: "Subscribed Library",
    header: "Subscribed Libraries",
  },
  {
    id: 3,
    title: "Total Space Usage",
    count: "80GB",
    icon: <GrUserManager />,
    breadcrumbTitle: "Storage Usage",
    header: "Space Usages",
  },
];

const initialBreadcrumbItems = [
  { path: "/dashboard", icon: HomeIcon },
  { label: "Library", path: "/library" },
  { label: "Storage Usages", path: "/library" },
];
const tableHeader = [
  { key: "byteName", headerName: "Byte Name" },
  { key: "category", headerName: "Category", postIcon: <FaArrowDownLong /> },
  { key: "dateAdded", headerName: "Date Added", postIcon: <FaArrowDownLong /> },
  { key: "duration", headerName: "Duration", postIcon: <FaArrowDownLong /> },
  {
    key: "storageUsed",
    headerName: "Storage Used",
    postIcon: <FaArrowDownLong />,
  },
  {
    key: "noOfViews",
    headerName: "No of Views",
    postIcon: <FaArrowDownLong />,
  },
  {
    key: "completionRate",
    headerName: "Completion Rate",
    postIcon: <FaArrowDownLong />,
  },
  { key: "action", headerName: "Action" },
];
const tableData = [
  {
    id: 1,
    byteName: "Byte 1",
    category: "Category 1",
    dateAdded: "2023-01-01",
    duration: "5 min",
    storageUsed: "500 MB",
    noOfViews: 100,
    completionRate: "80%",
    action: "Remove",
  },
  {
    id: 2,
    byteName: "Byte 2",
    category: "Category 2",
    dateAdded: "2023-01-02",
    duration: "10 min",
    storageUsed: "1 GB",
    noOfViews: 200,
    completionRate: "90%",
    action: "Remove",
  },
  {
    id: 3,
    byteName: "Byte 3",
    category: "Category 3",
    dateAdded: "2023-01-03",
    duration: "15 min",
    storageUsed: "1.5 GB",
    noOfViews: 300,
    completionRate: "95%",
    action: "Remove",
  },
];

const Page = () => {
  const [selectedCard, setSelectedCard] = useState<number>(1);
  const [breadcrumbItems, setBreadcrumbItems] = useState(
    initialBreadcrumbItems
  );
  const handleCardClick = (cardNo: number, cardTitle: string) => {
    setSelectedCard(cardNo);
    setBreadcrumbItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[newItems.length - 1] = {
        ...newItems[newItems.length - 1],
        label: cardTitle,
      };
      return newItems;
    });
  };
  return (
    <>
      {/* Heading */}
      <div className="flex flex-col gap-6 mx-8 pt-6">
        <div>
          <Breadcrumbs items={breadcrumbItems} separator={<FaAngleRight />} />
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-[#1E293B] text-[28px] font-semibold">Library</p>
          </div>
        </div>
      </div>

      {/* card */}
      <div className="flex flex-row gap-6 my-5 bg-[#FCFCFC] p-8">
        {cardData?.map((item, index) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              count={item.count}
              iconName={item.icon}
              selected={selectedCard === item.id}
              onClick={() => handleCardClick(item.id, item.breadcrumbTitle)}
            />
          );
        })}
      </div>

      {/* table container */}
      <div className="flex flex-col gap-6 px-8">
        <div>
          <p className="text-[28px] font-semibold text-[#1C3268]">
            {selectedCard === 1
              ? "Learning Byte Count"
              : selectedCard === 2
              ? "Subscribed Libraries"
              : "Storage Usages"}
          </p>
        </div>

        {/* sort filter */}
        <div className="flex flex-row justify-between items-center">
          <div>
            <SearchBar
              placeholder="Search"
              icon={<CiSearch />}
              className="w-[360px] text-[#475569]"
            />
          </div>
          <div className="flex flex-row items-center gap-4">
            <Button className="bg-[#FFF] text-[#1C3268] flex items-center gap-2 border hover:bg-[#FFF] hover:text-[#1C3268]">
              <CgSortAz />
              <span className="font-medium text-sm">Sort</span>
            </Button>
          </div>
        </div>
        {/* Table */}
        <div>
          <Table tableHeader={tableHeader}>
            <tr></tr>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Page;
