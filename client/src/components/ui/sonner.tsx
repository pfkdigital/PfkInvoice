"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-oceanBlue group-[.toaster]:text-snowWhite group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-oceanBlue dark:group-[.toaster]:text-snowWhite",
          description:
            "group-[.toast]:text-snowWhite dark:group-[.toast]:text-snowWhite",
          actionButton:
            "group-[.toast]:bg-oceanBlue group-[.toast]:text-snowWhite dark:group-[.toast]:bg-oceanBlue dark:group-[.toast]:text-snowWhite",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
