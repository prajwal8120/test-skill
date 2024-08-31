import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormProps } from "@/interface/form";

export const Form: React.FC<FormProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  prefix,
  prefixIcon,
  error,
  lable,
  disabled = false,
}) => (
  <div className="flex flex-col gap-2 w-full relative">
    <Label htmlFor={id} className="text-[#1C3268] text-sm font-medium">
      {lable}
    </Label>
    <div
      className={`flex items-center border rounded-md ${
        error ? "border-[#E14942]" : ""
      }`}
    >
      {prefix && (
        <span className="text-[#1C3268] px-3 py-2 rounded-l-md">{prefix}</span>
      )}
      {prefixIcon && (
        <span className="flex items-center justify-center p-2 text-[#1C3268] rounded-l-md">
          {prefixIcon}
        </span>
      )}
      <Input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`ml-0 p-2 w-full border-none rounded-r-md ${
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
        readOnly={disabled}
      />
    </div>
    {error && (
      <p className="text-[#E14942] text-xs font-normal leading-5">{error}</p>
    )}
  </div>
);
