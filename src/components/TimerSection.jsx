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
    <div className={`w-full ${isDisabled ? 'text-black-disabled' : 'text-black'}`}>

      <div className='flex flex-col gap-0'>

        {/* Title */}
        <div className='font-bold text-4xl'>{title}</div>

        {/* Timer value */}
        <div className='font-black text-8xl'>{isTimer ? formatTime(getter) : getter}</div>

        {/* Buttons */}
        <div className='flex flex-row gap-5'>

          {/* Decrease button */}
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
            isDisabled={isDisabled || isMinValueReached}
          />

          {/* Increase button */}
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
            isDisabled={isDisabled || isMaxValueReached}
          />

        </div>

      </div>

    </div>
  );
};

const TimerSection = ({title, getter, isTimer}) => {
  return (
    <div className='w-full text-black'>

      <div className='flex flex-col gap-0'>

        {/* Title */}
        <div className='font-bold text-4xl'>{title}</div>

        {/* Timer value */}
        <div className='font-black text-8xl'>{isTimer ? formatTime(getter) : getter}</div>

      </div>

    </div>
  );
};

export {ConfigTimerSection, TimerSection};