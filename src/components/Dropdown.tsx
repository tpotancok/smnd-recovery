export const Dropdown = ({
  label,
  value,
  name,
  placeholder,
  onChange,
  children,
  className,
}: {
  label: string;
  value: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactElement<HTMLOptionElement>[];
  className?: string;
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="label-base">
        {label}
        <span className="ml-1 text-red-500">*</span>
      </label>
      <select required id={name} value={value} onChange={onChange} className="input-base mt-2">
        <option disabled value="">
          {placeholder}
        </option>
        {children}
      </select>
    </div>
  );
};
