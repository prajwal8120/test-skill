"use client";
import React, { useState } from "react";
import { GrUserManager } from "react-icons/gr";

type CardProps = {
  iconName?: JSX.Element;
  title?: string;
  count?: string | number;
  selected?: boolean;
  onClick?: () => void;
};
const Card: React.FC<CardProps> = ({
  iconName,
  title,
  count,
  onClick,
  selected,
}) => {
  return (
    <div
      style={{
        boxShadow: selected ? "0px 0px 0px 4px rgba(28, 50, 104, 0.20)" : "",
      }}
      className={`border border-[#CBD5E1] px-5 py-5 flex flex-col gap-3 w-[258px] rounded-lg bg-[#FFF] cursor-pointer`}
      onClick={onClick}
    >
      <div>{iconName ? iconName : <GrUserManager />}</div>
      <div>
        <p className="text-[#1C3268] font-medium text-base">{title}</p>
        <p className="text-[#5A5975] font-semibold text-2xl">{count}</p>
      </div>
    </div>
  );
};

export default Card;
