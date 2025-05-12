import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  error?: string;
  maxDate?: Date;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
}

const CustomInput = forwardRef<HTMLInputElement, { value?: string; onClick?: () => void; error?: boolean }>(
  ({ value, onClick, error }, ref) => (
    <input
      className={`w-full h-10 p-2 border rounded ${
        error
          ? "border-red-500"
          : "border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-1 ring-slate-300 dark:ring-slate-600"
      } bg-slate-100 dark:bg-slate-700`}
      onClick={onClick}
      ref={ref}
      value={value}
      onChange={() => {}}
    />
  )
);

const CustomDatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  label,
  error,
  maxDate,
  showTimeSelect = false,
}) => {
  return (
    <div className="w-full">
      {label && <label className="block mb-1.5 text-sm">{label}</label>}
      <div className="relative">
        <DatePicker
          selected={selected}
          onChange={onChange}
          customInput={<CustomInput error={!!error} />}
          dateFormat="yyyy-MM-dd"
          maxDate={maxDate}
          showTimeSelect={showTimeSelect}
          placeholderText="Select date"
          showYearDropdown
          dropdownMode="select"
          popperClassName="z-50"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomDatePicker;
