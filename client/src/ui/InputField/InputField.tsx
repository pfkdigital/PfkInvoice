import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";

type InputFieldProps = {
  form: any;
  inputName: string;
  label?: string;
  placeholder: string;
  description: string;
  className?: string;
  type: string;
};

const InputField = ({
  form,
  inputName,
  label,
  placeholder,
  className,
  type,
}: InputFieldProps) => {
  const isNumber = type === "number";
  return (
    <FormField
      control={form.control}
      name={inputName}
      render={({ field }) => (
        <FormItem className={"w-full"}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl className={className}>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
