import React, { ChangeEvent, Ref, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Doc from "../../../assets/svg/csv.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onUpload?: () => void;
  fileInfo?: any;
  isUploaded?: boolean;
  fileInputRef?: Ref<HTMLInputElement>;
  isFileUploadError?: boolean;
  borderStyle?: string;
  title: string;
  fileTypeIns?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  onUpload,
  fileInfo,
  isUploaded,
  fileInputRef,
  isFileUploadError,
  borderStyle = "border-solid",
  title = "",
  fileTypeIns = "",
}) => {
  return (
    <label
      htmlFor="file-upload"
      className={`flex flex-col items-center justify-center px-6 py-4 h-[200px] border ${borderStyle} border-[#1C3268] rounded-lg cursor-pointer`}
    >
      {!isUploaded && !isFileUploadError && fileInfo ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image src={Doc} alt="File icon" width={32} height={40} />
              <span className="w-full absolute bottom-[6px] text-center text-white text-[9px] leading-[10px] font-bold">
                {fileInfo.extension}
              </span>
            </div>
            <p className="text-base text-[#1C3268] font-semibold">
              {fileInfo?.name}
            </p>
            <p className="text-gray-600">{fileInfo.size}</p>
          </div>
          <div className="w-full text-center">
            <Button
              className="bg-[#1C3268] font-semibold text-sm leading-4 hover:bg-[#1C3268]"
              onClick={onUpload}
            >
              Upload
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="border p-[10px] rounded-lg mb-3">
            <FiUploadCloud size={20} color="#1C3268" />
          </div>
          <p className="text-base font-semibold mb-1 text-[#1C3268]">{title}</p>
          <p className="text-[#B8B8D2] mb-4">
            {fileTypeIns}
            
          </p>
        </>
      )}
      <input
        id="file-upload"
        type="file"
        onChange={onFileChange}
        className="hidden"
        ref={fileInputRef}
      />
    </label>
  );
};

export default FileUpload;
