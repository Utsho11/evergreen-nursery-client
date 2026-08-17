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
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        {...register(name, { required: `${label || "This field"} cannot be empty!` })}
        type={type}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:border-[#81ba00] focus:ring-1 focus:ring-[#81ba00] transition-colors"
      />
      {errors[name] && (
        <span className="text-rose-500 text-xs font-medium block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default ENInput;
