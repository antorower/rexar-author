"use client";

const SelectInput = ({ value, onChange, onFocus, onBlur, name, label, placeholder = "Επιλογή...", options = [] }) => {
  const displayPlaceholder = !value;

  return (
    <div className="w-full">
      {label && <label className="block text-xs font-medium text-gray-600 mb-1 ml-2 select-none">{label}</label>}

      <div className="relative">
        <select name={name} value={value} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} className={`w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 pr-10 ${displayPlaceholder ? "text-gray-400" : "text-gray-900"}`}>
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
      </div>
    </div>
  );
};

export default SelectInput;
