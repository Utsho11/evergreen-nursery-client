import React from "react";
import { useFormContext } from "react-hook-form";

interface ENInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
}

const ENInput: React.FC<ENInputProps> = ({
  name,
  label,
  type = "text",
  placeholder = "",
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
      <input
        {...register(name, { required: `field can not be empty!` })}
        type={type}
        placeholder={placeholder}
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

export default ENInput;
