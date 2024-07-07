import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

type SelectFieldProps = {
  fieldName: string;
  fieldLabel: string;
  placeholder?: string;
  form: any;
  options: () => React.ReactNode;
  styles?: string;
};

const SelectField = ({
  fieldName,
  placeholder,
  form,
  options,
  styles,
}: SelectFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={styles}>
          <Select
            onValueChange={(e) => console.log(e)}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{options()}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
