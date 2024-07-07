import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";

type InputFieldProps = {
  form: any;
  inputName: string;
  label: string;
  placeholder: string;
  description: string;
  className?: string;
};

const InputField = ({
  form,
  inputName,
  label,
  placeholder,
  className,
}: InputFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={inputName}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl className={className}>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
