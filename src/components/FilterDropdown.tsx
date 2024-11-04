import FilterDropdownProps from "@/types/FilterDropdownProps";

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="mr-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="py-1 px-2 rounded bg-epic outline-none"
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
