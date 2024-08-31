import React from "react";
import { FaAngleDown } from "react-icons/fa6";
interface Option {
  value: string;
  label: string;
}

interface CommonSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Select: React.FC<CommonSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative w-[360px] ">
      <select
        value={value}
        onChange={handleChange}
        className="block w-full px-4 py-2 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <FaAngleDown color="#475569" />
      </div>
    </div>
  );
};

export default Select;
