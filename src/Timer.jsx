import './timer.css';
import {ConfigTimerSection, TimerSection} from "./TimerSection.jsx";
import React, {useRef, useState, useEffect} from 'react';
import {UsualButton} from "./Button.jsx";

function Timer() {

  ///User input
  const [workingTime, setWorkingTime] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [roundCount, setRoundCount] = useState(4);

  //states
  const [unstarted, setUnstarted] = useState(true);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  //Retrieval of user input and use of it
  const [remainingTime, setRemainingTime] = useState(workingTime);
  const [remainingBreakTime, setRemainingBreakTime] = useState(breakDuration);
  const [remainingRounds, setRemainingRounds] = useState(roundCount);

  //BreakTime && delayedStart
  const [isBreak, setIsBreak] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);
  const countdownConstant = 3
  const [countdown, setCountdown] = useState(countdownConstant);
  const [reducableRound, setReducableRound] = useState(false);
  const [end, setEnd] = useState(false);


  const startTimer = () => {
    setIsDelayed(true);
    setRemainingRounds(roundCount);
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
    setRemainingRounds(roundCount)
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
        <p className='text-black font-bold text-8xl'>{countdown}</p>
      ) : (
        <>
          {unstarted && (
            <>
              <ConfigTimerSection
                title='Work duration'
                getter={workingTime}
                setter={setWorkingTime}
                maxValue={60}
                minValue={1}
                isTimer={true}
                isDisabled={false}
              />

              <ConfigTimerSection
                title='Break duration'
                getter={breakDuration}
                setter={setBreakDuration}
                maxValue={60}
                minValue={1}
                isTimer={true}
                isDisabled={roundCount <= 1}
              />

              <ConfigTimerSection
                title='Round count'
                getter={roundCount}
                setter={setRoundCount}
                maxValue={10}
                minValue={1}
                isTimer={false}
                isDisabled={false}
              />

              <div className='w-72'>
                <UsualButton
                  onClick={startTimer}
                  label='Start'
                />
              </div>
            </>
          )}

          {started && (
            <>
              {!isBreak && (
                <TimerSection
                  title='Work'
                  getter={remainingTime}
                  isTimer={true}
                />)}

              {isBreak && remainingRounds > 0 && (
                <>
                  <TimerSection
                    title='Break'
                    getter={remainingBreakTime}
                    isTimer={true}
                  />
                </>
              )}

              <TimerSection
                title='Round'
                getter={`${roundCount - remainingRounds}/${roundCount}`}
                isTimer={false}
              />

              <div className='w-72'>
                <UsualButton
                  onClick={pauseOrResumeTimer}
                  label={paused ? 'Resume' : 'Pause'}
                />
              </div>
            </>
          )}
        </>)}
    </div>
  );
}

export default Timer;
