"use client";
import { UserButton } from "@clerk/nextjs";

const Button = () => {
  return (
    <div className="p-4 flex justify-center border-t border-gray-300">
      <UserButton />
    </div>
  );
};

export default Button;
