import React from "react";
import { CiSearch } from "react-icons/ci";

type SearchBarProps = {
  placeholder?: string;
  icon?: JSX.Element | string;
  borderColor?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  icon: Icon = <CiSearch />,
  borderColor = "#CBD5E1",
  className = "",
  onChange,
}) => {
  return (
    <div
      className={`flex flex-row items-center gap-2 rounded-lg py-[10px] px-4 ${className} bg-[#FFF]`}
      style={{ border: `1px solid ${borderColor}` }}
    >
      {Icon && Icon}
      <input
        placeholder={placeholder}
        className="flex-1 outline-none"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
