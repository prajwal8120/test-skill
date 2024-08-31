import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

type AlertProps = {
  onClose: () => void;
  errorMessage: string;
};

const Alert: React.FC<AlertProps> = ({ onClose, errorMessage }) => {
  return (
    <div className="flex flex-row">
      <div className=" bg-[#CB1A14] w-[6px] rounded-l-lg" />
      <div className=" bg-[#FBEAE9] flex flex-row  px-4 py-3 rounded-sm w-full justify-between">
        <div className="flex flex-row gap-3 items-center">
          <div className=" border border-[#F2BCBA] rounded-[8px] p-[6px]  h-[24px]">
            <MdCheckCircle size={10} color="#CB1A14" />
          </div>
          <p className="text-xs text-[#CB1A14] font-normal leading-5 ">
            {errorMessage}
          </p>
        </div>

        <div>
          <div className="border-l border-[#353535  ] h-auto " />
          <div>
            <IoCloseOutline
              size={20}
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
