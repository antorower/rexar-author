const Section = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-sm font-semibold tracking-wide text-gray-700 uppercase select-none">{title}</h2>
    </div>
  );
};

export default Section;
