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
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {label}
        </label>
      )}
      <select
        disabled={isLoading}
        {...register(name, { required: `${label} is required` })}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-hidden focus:border-[#81ba00] focus:ring-1 focus:ring-[#81ba00] transition-colors disabled:opacity-50"
      >
        <option value="" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-rose-500 text-xs font-medium block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default ENSelectField;
