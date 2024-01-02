import {Button} from "./Button.jsx";
import React from "react";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const ConfigTimerSection = ({title, getter, setter, maxValue, minValue, isTimer, isDisabled = false}) => {
  const isMinValueReached = getter <= (isTimer ? minValue * 60 : minValue);
  const isMaxValueReached = getter >= (isTimer ? maxValue * 60 : maxValue);

  return (
    <div className='w-72 mb-10'>
      <h1 className={`${isDisabled ? 'text-black-disabled' : 'text-black'} font-bold text-4xl`}>{title}</h1>
      <p
        className={`${isDisabled ? 'text-black-disabled' : 'text-black'} font-black text-8xl`}>{isTimer ? formatTime(getter) : getter}</p>
      <div className='flex items-stretch'>
        <Button
          onClick={() =>
            setter((previousValue) =>
              Math.max(
                previousValue - (isTimer ? minValue * 60 : minValue),
                isTimer ? minValue * 60 : minValue
              )
            )
          }
          label={`-${minValue}`}
          isDisabled={isMinValueReached}
        />
        <Button
          onClick={() =>
            setter((previousValue) =>
              Math.min(
                previousValue + (isTimer ? minValue * 60 : minValue),
                isTimer ? maxValue * 60 : maxValue
              )
            )
          }
          label={`+${minValue}`}
          isDisabled={isMaxValueReached}
        />
      </div>
    </div>
  );
};

const TimerSection = ({title, getter, isTimer}) => {
  return (
    <div className='w-72 mb-10'>
      <h1 className='text-black font-bold text-4xl'>{title}</h1>
      <p className='text-black font-black text-8xl'>{isTimer ? formatTime(getter) : getter}</p>
    </div>
  );
};

export {ConfigTimerSection, TimerSection};