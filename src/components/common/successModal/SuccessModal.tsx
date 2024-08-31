import React from "react";
import Modal from "@/components/common/modal/Modal";
import { FcOk } from "react-icons/fc";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  additionalInfo?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message = "",
  additionalInfo = "",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-10 w-[541px]">
        <div className="flex justify-center">
          <FcOk size={88} color="white" />
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-2xl leading-[34px] text-[#1C3268] text-center">
            {title}
          </p>
          <p className="font-normal text-2xl leading-7 text-[#5A5975] text-center">
            {message}
          </p>
        </div>

        {additionalInfo && (
          <p className="font-normal text-base leading-6 text-[#5A5975] text-center">
            {additionalInfo}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default SuccessModal;
