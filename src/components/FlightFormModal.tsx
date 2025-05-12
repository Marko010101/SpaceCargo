import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCities } from "../hooks/useCities";
import { useCountries } from "../hooks/useCountries";
import { useCreateFlight } from "../hooks/useCreateFlight";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { FlightRequest } from "../types/flight";
import CustomDatePicker from "./ui/DatePicker";
import Input from "./ui/Input";
import SelectField from "./ui/SelectionField";
import { useEffect, useMemo, useState } from "react";
import useUpdateFlight from "../hooks/useUpdateFlight";
import Button from "./ui/Button";
import toast from "react-hot-toast";

interface FlightFormModalProps {
  onClose: () => void;
  initialData?: FlightRequest & { id?: number };
}

const FlightFormModal = ({ onClose, initialData }: FlightFormModalProps) => {
  const { data: cities = [] } = useCities();
  const { data: countries = [] } = useCountries();
  const isEdit = Boolean(initialData?.id);

  const { mutate: createFlight, isPending: isCreating } = useCreateFlight();
  const { mutate: updateFlight, isPending: isUpdating } = useUpdateFlight();

  const ref = useOutsideClick(() => onClose());

  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FlightRequest>({
    defaultValues: {
      flightNumber: initialData?.flightNumber || "",
      flightDate: initialData?.flightDate || tomorrow.toISOString(),
      fromCountryId: initialData?.fromCountryId,
      fromCityId: initialData?.fromCityId,
      toCountryId: initialData?.toCountryId,
      toCityId: initialData?.toCityId,
    },
  });

  const [flightDate, setFlightDate] = useState<Date | null>(
    initialData?.flightDate ? new Date(initialData.flightDate) : tomorrow
  );

  const isDataEqual = (data: FlightRequest, initial: FlightRequest) => {
    return (
      data.flightNumber === initial.flightNumber &&
      data.flightDate === formatDateForBackend(new Date(initial.flightDate)) &&
      data.fromCountryId === initial.fromCountryId &&
      data.fromCityId === initial.fromCityId &&
      data.toCountryId === initial.toCountryId &&
      data.toCityId === initial.toCityId
    );
  };

  useEffect(() => {
    if (flightDate) {
      const formatted = flightDate.toISOString();
      setValue("flightDate", formatted);
    }
  }, [flightDate, setValue]);

  const fromCountryId = watch("fromCountryId");
  const toCountryId = watch("toCountryId");
  const fromCityId = watch("fromCityId");
  const toCityId = watch("toCityId");

  const formatDateForBackend = (date: Date): string => {
    const local = new Date(date);
    local.setHours(0, 0, 0, 0);
    const year = local.getFullYear();
    const month = String(local.getMonth() + 1).padStart(2, "0");
    const day = String(local.getDate()).padStart(2, "0");
    return `${year}-${month}-${day} 00:00:00`;
  };

  const onSubmit = (data: FlightRequest) => {
    if (flightDate) {
      data.flightDate = formatDateForBackend(flightDate);
    }

    if (isEdit && initialData?.id) {
      const initialComparable: FlightRequest = {
        flightNumber: initialData.flightNumber,
        flightDate: formatDateForBackend(new Date(initialData.flightDate)),
        fromCountryId: initialData.fromCountryId,
        fromCityId: initialData.fromCityId,
        toCountryId: initialData.toCountryId,
        toCityId: initialData.toCityId,
      };

      if (isDataEqual(data, initialComparable)) {
        toast("📋 Nothing was updated", {
          duration: 2000,
        });
        return;
      }

      updateFlight({ id: initialData.id, ...data }, { onSuccess: onClose });
    } else {
      createFlight(data, { onSuccess: onClose });
    }
  };

  const fromCountries = useMemo(() => countries.filter((c) => c.sendAllowed === "Y"), [countries]);
  const toCountries = useMemo(() => countries.filter((c) => c.receivedAllowed === "Y"), [countries]);
  const fromCities = useMemo(
    () => cities.filter((c) => c.countryId === fromCountryId && c.sendAllowed === "Y"),
    [cities, fromCountryId]
  );
  const toCities = useMemo(
    () => cities.filter((c) => c.countryId === toCountryId && c.receivedAllowed === "Y"),
    [cities, toCountryId]
  );

  const handleCountryChange = (field: "fromCountryId" | "toCountryId") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setValue(field, value);
    setValue(field === "fromCountryId" ? "fromCityId" : "toCityId", undefined);
    clearErrors([field, field === "fromCountryId" ? "fromCityId" : "toCityId"]);
  };

  const handleCityChange = (field: "fromCityId" | "toCityId") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    setValue(field, value);
    clearErrors(field);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div ref={ref} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl shadow-xl w-full max-w-max relative">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4">{isEdit ? "Edit Flight" : "Create Flight"}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div className="grid sm:grid-cols-2 gap-4 items-start">
            <Input
              className="dark:bg-slate-700"
              label="Flight Number"
              id="flightNumber"
              type="text"
              placeholder="Enter flight number"
              error={errors.flightNumber?.message}
              register={register}
              rules={{ required: "Flight number is required" }}
            />

            <div className="flex flex-col justify-start h-full">
              <CustomDatePicker
                selected={flightDate}
                onChange={(date) => {
                  if (date) {
                    date.setHours(0, 0, 0, 0);
                    setFlightDate(date);
                  } else {
                    setFlightDate(null);
                  }
                  clearErrors("flightDate");
                }}
                label="Flight Date"
                error={errors.flightDate?.message}
                showTimeSelect={false}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-start">
            <SelectField
              label="From Country"
              options={fromCountries}
              valueKey="countryId"
              labelKey="countryName"
              value={fromCountryId}
              registration={register("fromCountryId", {
                required: "From country is required",
                valueAsNumber: true,
                onChange: handleCountryChange("fromCountryId"),
              })}
              error={errors.fromCountryId?.message}
            />
            {fromCountryId ? (
              <SelectField
                label="From City"
                options={fromCities}
                valueKey="cityId"
                labelKey="cityName"
                value={fromCityId}
                registration={register("fromCityId", {
                  required: "From city is required",
                  valueAsNumber: true,
                  onChange: handleCityChange("fromCityId"),
                })}
                error={errors.fromCityId?.message}
              />
            ) : (
              <div></div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-3 ">
            <SelectField
              label="To Country"
              options={toCountries}
              valueKey="countryId"
              labelKey="countryName"
              value={toCountryId}
              registration={register("toCountryId", {
                required: "To country is required",
                valueAsNumber: true,
                onChange: handleCountryChange("toCountryId"),
              })}
              error={errors.toCountryId?.message}
            />
            {toCountryId ? (
              <SelectField
                label="To City"
                options={toCities}
                valueKey="cityId"
                labelKey="cityName"
                value={toCityId}
                registration={register("toCityId", {
                  required: "To city is required",
                  valueAsNumber: true,
                  onChange: handleCityChange("toCityId"),
                })}
                error={errors.toCityId?.message}
              />
            ) : (
              <div></div>
            )}
          </div>

          <Button type="submit" disabled={isCreating || isUpdating} className="w-full dark:hover:bg-slate-900 ">
            {isCreating || isUpdating
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
              ? "Update Flight"
              : "Create Flight"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FlightFormModal;
