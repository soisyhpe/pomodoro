import './timer.css';
import React, { useRef, useState, useEffect } from 'react';


const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Button = ({ onClick, label, isDisabled }) => (
  <button
    onClick={onClick}
    className={`w-full h-12 font-bold rounded-full text-4xl p-0 mr-1 ${isDisabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-gray-900 text-white cursor-pointer'
      }`}
    disabled={isDisabled}
  >
    {label}
  </button>
);

const ConfigTimerSection = ({ title, getter, setter, maxValue, minValue, isTimer }) => {
  const isMinValueReached = getter <= (isTimer ? minValue * 60 : minValue);
  const isMaxValueReached = getter >= (isTimer ? maxValue * 60 : maxValue);

  return (
    <div className='w-72 mb-10'>
      <h1 className='font-black text-4xl'>{title}</h1>
      <p className='font-bold text-8xl'>{isTimer ? formatTime(getter) : getter}</p>
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

const TimerSection = ({ title, getter, isTimer }) => {
  return (
    <div className='w-72 mb-10'>
      <h1 className='font-black text-4xl'>{title}</h1>
      <p className='font-bold text-8xl'>{isTimer ? formatTime(getter) : getter}</p>
    </div>
  );
};

function Timer() {

  ///User input 
  const [workingTime, setWorkingTime] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [round, setRound] = useState(3);

  //states
  const [unstarted, setUnstarted] = useState(true);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  //Retrieval of user input and use of it
  const [remainingTime, setRemainingTime] = useState(workingTime);
  const [remainingBreakTime, setRemainingBreakTime] = useState(breakDuration);
  const [remainingRounds, setRemainingRounds] = useState(round);

  //BreakTime && delayedStart
  const [isBreak, setIsBreak] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);
  const countdownConstant = 3
  const [countdown, setCountdown] = useState(countdownConstant);
  const [reducableRound, setReducableRound] = useState(false);
  const [end, setEnd] = useState(false);


  const startTimer = () => {
    setIsDelayed(true);
    setRemainingRounds(round);
    setRemainingTime(workingTime);
  }

  const pauseOrResumeTimer = () => {
    setPaused(!paused);
  }

  const roundPatch = () => {
    if (reducableRound) {
      setRemainingRounds((rounds) => rounds - 1);
      if (remainingRounds == 1) logicalEnd();
    }

    setReducableRound(false);
  }

  const logicalEnd = () => {
    setUnstarted(true);
    setStarted(false);
    setIsBreak(false);
    setRemainingRounds(round)
  }


  useEffect(() => {
    if (isDelayed) {
      const isDelayedIntervalId = setInterval(() => {
        setCountdown((count) => {
          if (count <= 0) {
            setIsDelayed(false)
            setUnstarted(false);
            setStarted(true);
            clearInterval(isDelayedIntervalId);
            return countdownConstant;
          }
          return --count;
        })
      }, 1000)
    }
    if (!unstarted && !isBreak) {
      const remainingTimeIntervalId = setInterval(() => {
        setRemainingTime((remainT) => {
          if (remainT <= 0 && !paused) {
            setIsBreak(true);
            setRemainingBreakTime(breakDuration);
            clearInterval(remainingTimeIntervalId);
            console.log(remainingTimeIntervalId);
            setReducableRound(true);
          }
          return paused ? remainT : remainT - 1
        });
      }, 1000);
      return () => clearInterval(remainingTimeIntervalId);
    }
    if (isBreak) {
      roundPatch();
      const remainingBreakTimeIntervalId = setInterval(() => {
        setRemainingBreakTime((remainB) => {
          if (remainB <= 0 && !paused) {
            setIsBreak(false);
            setRemainingTime(workingTime);
            clearInterval(remainingBreakTimeIntervalId);
          }
          return paused ? remainB : remainB - 1;
        });
      }, 1000);
      return () => clearInterval(remainingBreakTimeIntervalId);
    }
  }, [isBreak, paused, isDelayed])


  return (
    <div className='min-h-screen min-w-screen flex flex-col items-center justify-center'>
      {isDelayed ? (
        <p className='font-bold text-8xl mt-3'>{countdown}</p>
      ) : (
        <>
          {unstarted && (
            <>
              <ConfigTimerSection
                title='Working time'
                getter={workingTime}
                setter={setWorkingTime}
                maxValue={60}
                minValue={5}
                isTimer={true}
              />

              {round > 1 && (
                <ConfigTimerSection
                  title='Break duration'
                  getter={breakDuration}
                  setter={setBreakDuration}
                  maxValue={60}
                  minValue={5}
                  isTimer={true}
                />
              )}
              <ConfigTimerSection title='Round' getter={round} setter={setRound} maxValue={10} minValue={1} isTimer={false} />
              <div className='w-72'>
                <button
                  onClick={startTimer}
                  className='bg-gray-900 text-white w-full h-16 rounded-full font-bold text-4xl p-0 m-0'
                >Start
                </button>
              </div>
            </>
          )}

          {started && (
            <>
              {!isBreak && (
                <TimerSection
                  title='Remaining time'
                  getter={remainingTime}
                  isTimer={true}
                />)}
              {isBreak && remainingRounds > 0 && (
                <>
                  <TimerSection
                    title='Remaining break time'
                    getter={remainingBreakTime}
                    isTimer={true}
                  />
                  <TimerSection
                    title='Remaining rounds'
                    getter={remainingRounds}
                    isTimer={false}
                  />
                </>
              )}
              {!isBreak && remainingRounds == 1 && (
                <>
                  <TimerSection
                    title=''
                    getter={'Last round '}
                    isTimer={false}
                  />
                </>
              )}
              <div className='w-72'>
                <button
                  onClick={pauseOrResumeTimer}
                  className='bg-gray-900 text-white w-full h-16 rounded-full font-bold text-4xl p-0 m-0'
                >
                  {paused ? 'Resume' : 'Pause'}
                </button>
              </div>
            </>
          )}
        </>)}
    </div>
  );
}

export default Timer;
