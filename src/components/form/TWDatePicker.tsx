import { DatePicker } from "@nextui-org/date-picker";
import { Controller, useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  variant?: "underlined" | "faded" | "flat" | "bordered";
  size?: "sm" | "md" | "lg";
  radius: "none" | "sm" | "md" | "lg" | "full";
}

const TWDatePicker = ({
  label,
  name,
  variant = "bordered",
  radius,
}: IProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => (
        <DatePicker
          className="min-w-full sm:min-w-[225px]"
          label={label}
          {...fields}
          showMonthAndYearPickers
          errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
          isInvalid={!!errors[name]}
          radius={radius}
          variant={variant}
        />
      )}
    />
  );
};

export default TWDatePicker;
