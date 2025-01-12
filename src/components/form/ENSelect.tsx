import React from "react";
import { useFormContext } from "react-hook-form";

export type TOption = {
  value: string | number;
  label: string;
};

interface ENSelectFieldProps {
  name: string;
  label: string;
  options: TOption[];
  isLoading?: boolean;
}

const ENSelectField: React.FC<ENSelectFieldProps> = ({
  name,
  label,
  options,
  isLoading,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="block text-sm font-medium">{label}</span>
      </label>
      <select
        disabled={isLoading}
        {...register(name, { required: `${label} is required` })}
        className="border p-2 w-full outline-[#81BA00]"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default ENSelectField;
