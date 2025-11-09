export const FilterSection = ({ title, options, checked, onChange }) => (
  <div>
    <h4 className="text-lg font-semibold text-gray-800 mb-3">{title}</h4>
    <div className="grid gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:text-red-500"
        >
          <input
            type="checkbox"
            checked={checked.includes(opt)}
            onChange={() => onChange(opt)}
            className="accent-red-500"
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);
