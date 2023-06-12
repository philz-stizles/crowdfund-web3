type Props = {
  isLoading?: false;
  isDisabled?: false;
  type?: "button" | "submit" | "reset";
  title: string;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  type = "button",
  title,
  onClick,
  className,
  isLoading = false,
  isDisabled = false,
}: Props) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
