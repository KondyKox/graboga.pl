import FilterDropdownProps from "@/types/FilterDropdownProps";

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="py-1 px-2 rounded bg-epic outline-none cursor-pointer max-w-28 md:min-w-40 md:max-w-40"
      >
        {options.map((option) => (
          <option key={option} value={option === "All" ? "" : option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
