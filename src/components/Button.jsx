import React from "react";

const UsualButton = ({onClick, label, svgIcon: buttonIcon}) => (
  <div onClick={onClick}
       className='w-full h-16 rounded-full bg-black cursor-pointer select-none'>

    <div className='w-full h-full flex flex-row gap-5 justify-center items-center'>

      {/* Button icon */}
      <img src={buttonIcon} alt='Button icon' className='w-8'/>

      {/* Text button */}
      <div className='font-black text-white text-center text-4xl'>{label}</div>

    </div>

  </div>
);

const Button = ({onClick, label, isDisabled}) => (
  <div onClick={onClick}
       className={`${isDisabled ? 'bg-black-disabled cursor-not-allowed' : 'bg-black cursor-pointer'} w-full h-12 rounded-full select-none`}>

    <div className='w-full h-full flex justify-center items-center'>

      {/* Text button */}
      <div className={`font-black ${isDisabled ? 'text-white-disabled' : 'text-white'} text-center text-3xl`}>{label}</div>

    </div>

  </div>
);

export {UsualButton, Button};
