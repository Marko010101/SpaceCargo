import { useState, useEffect } from "react";
import { Country } from "../../types/country";
import { City } from "../../types/citiy";
import { UseFormRegisterReturn } from "react-hook-form";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type SelectOption = Country | City;

interface SelectFieldProps<T extends SelectOption> {
  label: string;
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  registration: UseFormRegisterReturn;
  error?: string;
  value?: number | string;
  disabled?: boolean;
}

const SelectField = <T extends SelectOption>({
  label,
  options,
  valueKey,
  labelKey,
  registration,
  error,
  value,
  disabled,
}: SelectFieldProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);
  const ref = useOutsideClick(() => setIsOpen(false));

  useEffect(() => {
    const matched = options.find((o) => o[valueKey] === value);
    setSelected(matched ?? null);
  }, [value, options, valueKey]);

  const handleSelect = (option: T) => {
    setSelected(option);
    setIsOpen(false);

    if (registration.onChange) {
      registration.onChange({
        target: {
          name: registration.name,
          value: option[valueKey],
        },
      });
    }
  };

  return (
    <div ref={ref} className="relative">
      <label htmlFor={registration.name} className="block mb-1 text-sm w-max">
        {label}
      </label>

      <div
        id={`${registration.name}-button`}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${registration.name}-label`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        className={`border border-slate-300 dark:border-slate-600 dark:bg-slate-700 bg-slate-100 cursor-pointer p-2 ${
          error ? "border-red-500" : ""
        } ${isOpen ? "rounded-t " : "rounded"}`}
      >
        {selected ? String(selected[labelKey]) : `Select ${label}`}
      </div>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby={`${registration.name}-label`}
          className={`${
            error ? "-mt-5" : ""
          } absolute top-full left-0 right-0 z-10 border border-t-0 border-slate-300 dark:border-slate-700  bg-slate-100 dark:bg-slate-700 rounded-b shadow-lg max-h-48 overflow-y-auto`}
        >
          {options.map((option) => (
            <li
              key={String(option[valueKey])}
              role="option"
              aria-selected={selected?.[valueKey] === option[valueKey]}
              className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {String(option[labelKey])}
            </li>
          ))}
        </ul>
      )}

      <input
        id={registration.name}
        type="hidden"
        name={registration.name}
        ref={registration.ref}
        value={selected ? String(selected[valueKey]) : ""}
        onBlur={registration.onBlur}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
export default SelectField;
