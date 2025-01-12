import React from "react";
import { useFormContext } from "react-hook-form";

interface ENTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

const ENTextarea: React.FC<ENTextareaProps> = ({
  name,
  label,
  placeholder = "",
  rows = 4,
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
      <textarea
        {...register(name, { required: `${label} is required` })}
        placeholder={placeholder}
        rows={rows}
        className="border p-2 w-full outline-[#81BA00]"
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default ENTextarea;
