import React from "react";

const UsualButton = ({onClick, label}) => (
  <button
    onClick={onClick}
    className={`w-full h-16 rounded-full m-1 bg-black cursor-pointer'
    }`}
  >
    <p
      className={`pt-1.5 inline-block align-middle text-center text-white font-black text-4xl`}>{label}</p>
  </button>
);

const Button = ({onClick, label, isDisabled}) => (
  <button
    onClick={onClick}
    className={`w-full h-12 rounded-full m-1 ${isDisabled ? 'bg-black-disabled cursor-not-allowed' : 'bg-black cursor-pointer'
    }`}
    disabled={isDisabled}
  >
    <p
      className={`pt-1.5 inline-block align-middle ${isDisabled ? 'text-white-disabled' : 'text-white'} text-center text-3xl font-black`}>{label}</p>
  </button>
);

export {UsualButton, Button};