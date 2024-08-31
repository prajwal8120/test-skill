import FileUpload from "@/components/common/fileUpload/FileUpload";
import SearchBar from "@/components/common/searchBar/SearchBar";
import Table from "@/components/common/table/Table";
import { Button } from "@/components/ui/button";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgSortAz } from "react-icons/cg";
import { CiFilter, CiSearch } from "react-icons/ci";
import { FaArrowDownLong } from "react-icons/fa6";

const Page = () => {
  const InstructionContent = [
    "Ensure your video file is ready (accepted format: MP4).",
    "Check for clarity and completeness.",
    "Ensure the file size does not exceed 500MB.",
  ];
  const tableHeader = [
    { key: "videoSize", headerName: "Video Size", postIcon: "" },
    {
      key: "videoDetails",
      headerName: "Video Details",
      postIcon: "",
    },
    {
      key: "addedDate",
      headerName: "Added Date",
      postIcon: <FaArrowDownLong />,
    },
    {
      key: "videoCategory",
      headerName: "Video Category",
      postIcon: <FaArrowDownLong />,
    },
    {
      key: "managerId",
      headerName: "Manager ID",
      postIcon: <FaArrowDownLong />,
    },
    { key: "actions", headerName: "", postIcon: <BsThreeDotsVertical /> },
  ];

  return (
    <div className="px-8 py-6 flex flex-col gap-6">
      {/* Heading */}
      <h1 className="text-[28px] font-semibold leading-[34px] text-[#1C3268]">
        Skill-Up Lab
      </h1>
      <div className="px-8 py-6 border rounded-xl">
        <div className="w-[50%] m-auto flex flex-col gap-6">
          <div className=" flex flex-col gap-3 px-8 py-6  ">
            <h2 className="text-xl font-medium leading-[22px] text-[#1C3268]">
              Upload Instruction
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              {InstructionContent.map((content, index) => (
                <li key={index} className="text-[#121139] opacity-[0.70]">
                  {content}
                </li>
              ))}
            </ul>
          </div>
          <FileUpload
            title="Upload Video"
            fileTypeIns="Click on the button or drag & drop your file here"
            borderStyle="border-dashed"
            // onFileChange={() => console.log()}
            // onUpload={() => console.log()}
            // fileInfo={""}
            // isUploaded={false}
            // // fileInputRef={}
            // isFileUploadError={false}
          />
          <div className="flex flex-row justify-center">
            <Button className="bg-[#1C3268]">Upload</Button>
          </div>
        </div>
      </div>
      {/* Table container */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium leading-[34px] text-[#242424]">
          History
        </h2>
        {/* sorting and searching container */}
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
        <Table tableHeader={tableHeader} isCheckBox>
          <tr></tr>
        </Table>
      </div>
    </div>
  );
};

export default Page;
