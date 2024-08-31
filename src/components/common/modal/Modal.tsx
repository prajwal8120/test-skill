import React, { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bgColor?: string;
  children: ReactNode;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  bgColor = "#FFF",
  className,
}) => {
  return (
    <div
      className={`w-full border fixed inset-0 z-50 flex flex-row items-center justify-center bg-[rgba(0,0,0,0.30)] transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={` ${className} rounded-[12px] relative p-[48px_24px] transition-transform duration-300  ${
          isOpen ? "scale-100" : "scale-95"
        } `}
        style={{ backgroundColor: bgColor }}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <RxCross2 size={25} color="black" />
        </button>
        <div
          className="max-h-[80vh] overflow-scroll "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
