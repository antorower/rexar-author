const FormTitle = ({ icon, title, subtitle }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-10 w-10 rounded-2xl bg-indigo-50 flex items-center justify-center">{icon}</div>
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 select-none">{title}</h1>
        <p className="text-sm text-gray-500 select-none">{subtitle}</p>
      </div>
    </div>
  );
};

export default FormTitle;
