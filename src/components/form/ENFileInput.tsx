import React, { useState, ChangeEvent } from "react";

interface ENFileInputProps {
  name: string;
  label?: string;
  required?: boolean;
  accept?: string;
  onFileChange: (file: File | null) => void;
}

const ENFileInput: React.FC<ENFileInputProps> = ({
  name,
  label,
  required = false,
  accept,
  onFileChange,
}) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setFileName(file.name);
      onFileChange(file);
    } else {
      setFileName("");
      onFileChange(null);
    }
  };

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={name} className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        <input
          id={name}
          type="file"
          accept={accept}
          required={required}
          onChange={handleFileChange}
          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm file:mr-4 file:py-1.5 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#81ba00]/15 file:text-[#81ba00] hover:file:bg-[#81ba00]/25 transition-colors cursor-pointer"
        />
        {fileName && (
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">{fileName}</span>
        )}
      </div>
    </div>
  );
};

export default ENFileInput;
