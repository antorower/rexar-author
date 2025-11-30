"use client";

const TextInput = ({ value, onChange, onFocus, onBlur, placeholder, name, label, maxLength = 1 }) => {
  const count = value?.length || 0;

  return (
    <div className="w-full">
      {label && <label className="block text-xs font-medium text-gray-600 mb-1 ml-2 select-none">{label}</label>}

      <div className="relative">
        <input type="text" onFocus={onFocus} onBlur={onBlur} name={name} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength} autoComplete="off" className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 pr-12" />

        {maxLength && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 select-none">
            {count}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
