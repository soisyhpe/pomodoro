import React from "react";

const Button = ({ onClick, label, isDisabled }) => (
  <button
    onClick={onClick}
    className={`w-full h-12 rounded-full m-1 ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 cursor-pointer'
    }`}
    disabled={isDisabled}
  >
    <p className='pt-1 inline-block align-middle text-white text-center text-4xl font-bold'>{label}</p>
  </button>
);

export default Button;