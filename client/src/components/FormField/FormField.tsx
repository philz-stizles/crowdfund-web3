import { ChangeEvent } from "react";

type Props = {
  label?: string;
  placeholder?: string;
  type?: string;
  isTextArea?: boolean;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

const FormField = ({
  label,
  placeholder,
  type = "text",
  isTextArea,
  value,
  onChange,
}: Props) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {label && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {label}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={onChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={onChange}
          type={type}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;
