import React from "react";
import { UseFormRegister, RegisterOptions, FieldValues, Path } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label?: string;
  id: Path<T> | string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = <T extends FieldValues>({
  label,
  id,
  type = "text",
  placeholder,
  className = "",
  register,
  rules,
  error,
  ...props
}: InputProps<T>) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-normal mb-1.5 w-max" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`box-border bg-slate-100 appearance-none border border-accent-800 text-sm border-slate-300 dark:bg-inherit rounded w-full py-2.5 px-3 dark:border-slate-600 leading-tight placeholder:text-sm focus:outline-none focus:ring-1 dark:focus:ring-slate-700 focus:ring-slate-300 outline-slate-300 dark:outline-slate-600 ${className} ${
          error ? "border-red-500" : ""
        }`}
        {...(register ? register(id as Path<T>, rules) : {})}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
