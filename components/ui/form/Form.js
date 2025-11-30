"use client";
import { motion } from "framer-motion";
import FormTitle from "./FormTitle";

const Form = ({ title, subtitle, icon, onSubmit, children, className, buttonText }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className={`bg-white shadow-xl shadow-gray-200/40 border border-gray-200 rounded-3xl p-6 md:p-8 ${className}`}>
      <FormTitle icon={icon} title={title} subtitle={subtitle} />
      <form onSubmit={onSubmit} className={`space-y-8 bg-white ${className}`}>
        {children}
        <button type="submit" className="w-full px-4 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-md shadow-sm transition sticky bottom-4">
          {buttonText || "Υποβολή"}
        </button>
      </form>
    </motion.div>
  );
};

export default Form;
