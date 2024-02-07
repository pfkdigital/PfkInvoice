type ButtonProps = {
  children: React.ReactNode;
  theme?: "primary" | "secondary";
  type?: "submit";
  id?: string;
};

function Button({ children, theme = "primary", type, id }: ButtonProps) {
  return (
    <button
      type={type && "submit"}
      className={`w-auto h-auto flex justify-between px-4 py-1.5 text-snowWhite cursor-pointer rounded-lg ${
        theme === "primary" ? "bg-oceanBlue hover:bg-navyBlue" : "bg-red"
      }`}
      id={id}
    >
      {children}
    </button>
  );
}

export default Button;
