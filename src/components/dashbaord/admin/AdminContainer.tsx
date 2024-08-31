"use client";
import Table from "@/components/common/table/Table";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import Card from "@/components/common/card/Card";
import { GrUserManager } from "react-icons/gr";
import { FaUsersGear } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineUpload } from "react-icons/hi";
import HomeIcon from "../../../assets/svg/home-2.svg";
import Image from "next/image";
import SearchBar from "@/components/common/searchBar/SearchBar";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import Modal from "@/components/common/modal/Modal";
import FileUpload from "@/components/common/fileUpload/FileUpload";
import { authGetRequest, authPostRequest } from "@/lib/apiClient";
import { RiDeleteBinLine } from "react-icons/ri";
import uploadFile from "../../../assets/svg/uploadFile.svg";
import { MdOutlineFileDownload } from "react-icons/md";
import { useEffect } from "react";
import { PiPencilSimple } from "react-icons/pi";
import { GoTrash } from "react-icons/go";
import TableCell from "@/components/common/tableCell/TableCell";
import { Checkbox } from "@/components/ui/checkbox";
import { formatFileSize, handleDownloadSampleFile } from "@/lib/helper";
// TODO : Refactor the code.
const tableHeader = [
  { key: "empId", headerName: "Emp ID", postIcon: "" },
  {
    key: "empName",
    headerName: "Employee Name",
    postIcon: <FaArrowDownLong />,
  },
  { key: "role", headerName: "Role", postIcon: <FaArrowDownLong /> },
  {
    key: "designation",
    headerName: "Designation",
    postIcon: <FaArrowDownLong />,
  },
  { key: "managerId", headerName: "Manager ID", postIcon: <FaArrowDownLong /> },
  { key: "actions", headerName: "", postIcon: <BsThreeDotsVertical /> },
];

function AdminContainer() {
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const [selectedCard, setSelectedCard] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUploaded, setIsuploaded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFileUploadError, setIsFileUploadError] = useState<boolean>(false);
  const [userCount, setUserCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
  const [creatorCount, setCreatorCount] = useState(0);
  const [adminTableData, setAdminTableData] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [orgName, setOrgName] = useState<string>("");
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: string;
    extension: string;
    file: File;
  } | null>(null);

  const getOrganizationDetails = useCallback(async (roleName: string) => {

    try {
      const response = await authGetRequest(
        `org/admin/view-all-users?page=0&size=10&role=${roleName}`
      );
      setAdminTableData(response?.data?.userDTOList);
      setUserCount(response?.data?.userCount);
      setManagerCount(response?.data?.managerCount);
      setCreatorCount(response?.data?.creatorCount);
      setOrgName(response?.data?.orgName);
    } catch (error) {
      console.error("Error fetching organization details:", error);
    }
  }, []);

  const handleCardClick = (cardNo: number) => {
    setSelectedCard(cardNo);
    setCheckedRows([]);
    setAllChecked(false);
  };

  const handleUploadFile = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    switch (selectedCard) {
      case 1:
        getOrganizationDetails("manager");
        break;
      case 2:
        getOrganizationDetails("creator");
        break;
      case 3:
        getOrganizationDetails("user");
        break;
      default:
        getOrganizationDetails("manager");
        break;
    }
  }, [selectedCard, getOrganizationDetails, isUploaded]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const extension = file.name.split(".").pop();
      setFileInfo({
        name: file.name,
        size: formatFileSize(file.size),
        extension: extension ? extension.toUpperCase() : "",
        file: file,
      });
    }
  };
  const handleFileUpload = async () => {
    if (fileInfo?.file) {
      const formData = new FormData();
      formData.append("file", fileInfo?.file);
      try {
        const response = await authPostRequest(
          "auth/register-emp-file",
          formData,
          true
        );
        console.log(response.data, "register emp");
        setIsuploaded(true);
      } catch (error) {
        setIsFileUploadError(true);
        setIsuploaded(false);
        console.error(error);
      }
    }
  };
  const handleFileUploadDone = () => {
    setIsModalOpen(false);
    setFileInfo(null);
    setIsuploaded(false);
    setIsFileUploadError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileDelete = () => {
    setFileInfo(null);
    setIsuploaded(false);
    setIsFileUploadError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleRowCheckboxChange = (empId: number) => {
    setCheckedRows((prev) =>
      prev.includes(empId)
        ? prev.filter((id) => id !== empId)
        : [...prev, empId]
    );
  };

  const handleHeaderCheckboxChange = (checked: boolean) => {
    setAllChecked(checked);
    setCheckedRows(
      checked ? adminTableData.map((item: any) => item.empId) : []
    );
  };

  useEffect(() => {
    if (adminTableData.length > 0) {
      setAllChecked(checkedRows.length === adminTableData.length);
    }
  }, [checkedRows, adminTableData.length]);

  const cardData = [
    {
      id: 1,
      title: "No of Managers",
      count: managerCount || 0,
      icon: <GrUserManager />,
    },
    {
      id: 2,
      title: "No of Creators",
      count: creatorCount || 0,
      icon: <FaUsersGear />,
    },
    {
      id: 3,
      title: "No of Users",
      count: userCount || 0,
      icon: <GrUserManager />,
    },
  ];

  return (
    <>
      {/* Heading */}
      <div className="flex flex-col gap-6 mx-8 pt-6">
        <div>
          <Image src={HomeIcon} alt="Home" className="h-5 w-5" />
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-[#1E293B] text-[28px] font-semibold">
              {orgName ? orgName : "Organization Name"}
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button
              className="bg-transparent border flex flex-row gap-2 text-[#1C3268] hover:bg-[#FFF] font-semibold"
              onClick={handleUploadFile}
            >
              <HiOutlineUpload />
              <span>Upload CSV</span>
            </Button>
            <Button className="bg-transparent border flex flex-row gap-2 hover:bg-[#1C3268] bg-[#1C3268] text-[#FFF] font-semibold">
              <IoMdAdd />
              <span>Add</span>
            </Button>
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
              onClick={() => handleCardClick(item.id)}
            />
          );
        })}
      </div>
      {/* table container */}
      <div className="flex flex-col gap-6 px-8">
        <div>
          <p className="text-[28px] font-semibold text-[#1C3268]">
            {selectedCard == 1
              ? "Managers"
              : selectedCard === 2
              ? "Creators"
              : "Users"}
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
            <Button className="text-[#C4C4C4] bg-transparent hover:bg-[#FFF]">
              Delete
            </Button>
            <Button className="bg-[#FFF] text-[#1C3268] flex items-center gap-2 border hover:bg-[#FFF] hover:text-[#1C3268] ">
              <CiFilter />
              <span className="font-medium text-sm">Filter</span>
            </Button>
            <Button className="bg-[#FFF] text-[#1C3268] flex items-center gap-2 border hover:bg-[#FFF] hover:text-[#1C3268]">
              <CgSortAz />
              <span className="font-medium text-sm">Sort</span>
            </Button>
          </div>
        </div>
        {/* Table */}
        <div>
          <Table
            tableHeader={tableHeader}
            isCheckBox
            onHeaderCheckboxChange={handleHeaderCheckboxChange}
            allChecked={allChecked}
          >
            {adminTableData?.map((item: any, index) => {
              return (
                <tr key={index} className="border border-b">
                  <TableCell className="flex flex-row gap-3">
                    <Checkbox
                      checked={checkedRows.includes(item.empId)}
                      onCheckedChange={() =>
                        handleRowCheckboxChange(item.empId)
                      }
                    />
                    {item.empId}
                  </TableCell>
                  <TableCell>{`${item.firstName} ${item.middleName || ""} ${
                    item.lastName || ""
                  }`}</TableCell>
                  <TableCell>{item.roleName}</TableCell>
                  <TableCell>{item.designation}</TableCell>
                  <TableCell>{item.managerEmpId || "-"}</TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-3  justify-center">
                      <GoTrash className="cursor-pointer h-4 w-4" />
                      <PiPencilSimple className="cursor-pointer h-4 w-4" />
                    </div>
                  </TableCell>
                </tr>
              );
            })}
          </Table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleFileUploadDone}>
        <div className="flex flex-col gap-5 w-full px-8 py-6">
          <div className="w-[684px]  flex flex-col gap-3  ">
            <p className="w-full text-[#1C3268] font-medium text-xl">
              Upload CSV File with the following columns
            </p>
            <ul className="list-disc pl-5 ">
              <li className="text-[#121139] opacity-[0.70]">First Name</li>
              <li className="text-[#121139] opacity-[0.70]">Middle Name</li>
              <li className="text-[#121139] opacity-[0.70]">Last Name</li>
              <li className="text-[#121139] opacity-[0.70]">Mobile Number</li>
            </ul>
          </div>
          <div className="flex flex-col gap-8 ">
            <div className="flex flex-row justify-between border-b w-full pb-3 px-1">
              <p className=" text-xl leading-[42px] font-semibold text-[#1C3268] ">
                Upload CSV
              </p>
              <Button
                className="bg-[#1C3268] text-xs font-semibold leading-4 text-[#FFF] hover:bg-[#1C3268] flex flex-row gap-2"
                onClick={handleDownloadSampleFile}
              >
                <MdOutlineFileDownload />
                Sample CSV
              </Button>
            </div>

            <div className="w-full">
              <FileUpload
                title="Select CSV file to upload"
                fileTypeIns="csv, xls, excel file (max. 800x400px)"
                onFileChange={handleFileChange}
                onUpload={handleFileUpload}
                fileInfo={fileInfo}
                isUploaded={isUploaded}
                fileInputRef={fileInputRef}
                isFileUploadError={isFileUploadError}
              />
            </div>
          </div>
          {/* uploaded file */}
          {isUploaded || isFileUploadError ? (
            <div className=" flex flex-col gap-[18px]">
              <div className="flex flex-col gap-2">
                {isUploaded && (
                  <p className="text-[#1C3268] font-semibold text-base leading-5">
                    Uploaded file
                  </p>
                )}

                <div
                  className={`border ${
                    isFileUploadError
                      ? "border-[#E14942] border-2"
                      : "border-[#D0D5DD] border-1"
                  } rounded-lg p-4`}
                >
                  <div className="flex flex-row gap-3">
                    <div>
                      <div className="relative">
                        <Image
                          src={uploadFile}
                          alt="File icon"
                          height={40}
                          width={32}
                        />
                        <span className="absolute top-3 right-3 w-full bg-[#079455] py-[2px] px-1 text-[white] rounded-[2px] font-bold text-[10px]">
                          CSV
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p
                            className={`text-sm font-medium leading-5 ${
                              isFileUploadError
                                ? "text-[#1C3268]"
                                : "text-[#249F5D]"
                            }`}
                          >
                            {fileInfo && fileInfo.name}
                          </p>
                          <p
                            className={`text-sm font-normal leading-5 ${
                              isFileUploadError
                                ? "text-[#E14942]"
                                : "text-[#1c3268]"
                            }`}
                          >
                            {isFileUploadError
                              ? `Upload failed. ${
                                  fileInfo && fileInfo.size > "1GB"
                                    ? "Your file size exceeds 1GB limit,"
                                    : ""
                                } please try again.`
                              : fileInfo
                              ? `${fileInfo.size}, 100% Uploaded`
                              : null}
                          </p>
                        </div>

                        <RiDeleteBinLine
                          color={isFileUploadError ? "#E14942" : "#1C3268B2"}
                          className="cursor-pointer"
                          onClick={handleFileDelete}
                        />
                      </div>
                      <p className="text-[#1C3268] text-sm font-normal leading-5 cursor-pointer">
                        {isFileUploadError && "Try again"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {isUploaded && (
                <div className="w-full flex flex-row-reverse">
                  <Button
                    className="w-fit ml-auto border text-sm font-semibold text-[#FFF] bg-[#1C3268] hover:bg-[#1C3268] border-none"
                    onClick={handleFileUploadDone}
                  >
                    Done
                  </Button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
}

export default AdminContainer;
