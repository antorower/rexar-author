"use client";

const NumberInput = ({ value, onChange, onFocus, onBlur, placeholder, name, label, min = 0, max = 1 }) => {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1 select-none">{label}</label>
      <input onFocus={onFocus} onBlur={onBlur} min={min} max={max} autoComplete="false" type="number" name={name} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full ml-2 rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" />
    </div>
  );
};

export default NumberInput;
