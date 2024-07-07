import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `bg-eclipse md:bg-midnight rounded-md min-h-[40px] p-4 text-snowWhite text-xs md:h-10 disabled:text-snowWhite disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 ease-in-out w-full`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const LightRowInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `bg-midnight md:bg-eclipse min-h-[40px] pl-4 text-snowWhite text-xs md:h-10 disabled:text-snowWhite disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 ease-in-out w-full`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
LightRowInput.displayName = "Input";

export { Input, LightRowInput };
