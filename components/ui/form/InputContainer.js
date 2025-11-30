const InputContainer = ({ children, cols }) => {
  let gridClasses;

  if (cols === 1) {
    gridClasses = "grid-cols-1";
  }
  if (cols === 2) {
    gridClasses = "grid-cols-1 sm:grid-cols-2 ";
  } else if (cols === 3) {
    gridClasses = "grid-cols-1 md:grid-cols-3";
  } else if (cols === 4) {
    gridClasses = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  }

  return <div className={`grid ${gridClasses} gap-6`}>{children}</div>;
};

export default InputContainer;
