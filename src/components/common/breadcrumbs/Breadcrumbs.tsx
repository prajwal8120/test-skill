import React from "react";
import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";

interface BreadcrumbItem {
  label?: string;
  path: string;
  icon?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode | string;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = "/",
  className = "",
}) => {
  return (
    <nav
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex flex-row gap-3 items-center ${
            index === items?.length - 1 &&
            "bg-[#F1F5F9] px-2 py-1 rounded-[6px]"
          }`}
        >
          <Link
            href={item.path}
            className="flex items-center text-[#475569] font-medium text-sm"
          >
            {item.icon && <Image src={item.icon} alt="Icon" height={20} width={20}/>}
            {item.label && item.label}
          </Link>
          {index < items.length - 1 && (
            <span className="text-[#CBD5E1]">{separator}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
