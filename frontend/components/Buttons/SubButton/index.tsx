type SubButtonProps = {
  label: string;
  type?: "reset" | "submit" | "button";
} & React.ComponentProps<"button">;

export const SubButton: React.FC<SubButtonProps> = ({ label, type = "submit", className = "", ...props}) => {
  return (
    <button type={type} className={`max-h-7 px-6 py-1 bg-amber-950 font-bold text-md rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-(--brand-400) lg:w-auto w-full mt-5 lg:mt-0 ${className}`}
      {...props}>
      {label}
    </button>
  );
};
