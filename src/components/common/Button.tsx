import React from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  bgColor?: string; // new prop to accept background color
};

const Button: React.FC<ButtonProps> = ({ onClick, children, bgColor }) => {
  const styles: Record<string, string> = {
    default: "bg-cyan-500 hover:bg-cyan-700",
    red: "bg-red-500 hover:bg-red-700",
    orange: "bg-orange-500 hover:bg-orange-700",
    green: "bg-green-500 hover:bg-green-700",
    blue: "bg-blue-500 hover:bg-blue-700",
    indigo: "bg-indigo-500 hover:bg-indigo-700",
    purple: "bg-purple-500 hover:bg-purple-700",
    pink: "bg-pink-500 hover:bg-pink-700",
  };

  if (!bgColor) {
    const colors = Object.keys(styles);
    bgColor = colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <button
      className={`${styles[bgColor]} m-1 text-white font-medium py-2 px-4 rounded-full inline-block`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
