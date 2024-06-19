import './timer.css';
import {ConfigTimerSection, TimerSection} from "./components/TimerSection.jsx";
import React, { useState, useEffect} from 'react';
import {UsualButton} from "./components/Button.jsx";
import playOrResumeButton from './assets/play_button.svg';
import pauseButton from './assets/pause_button.svg';
import cancelButton from './assets/cancel_button.svg';

function Timer() {

  //////////////////////// Const and States

  ///User input initial values to be stored
  const [workingTime, setWorkingTime] = useState(5*60);
  const [breakDuration, setBreakDuration] = useState(5*60);
  const [roundCount, setRoundCount] = useState(4);
  const countdownConst=3

  // pages
  const [countdownPage,setCountdownPage]= useState(false);
  const [homeScreen,setHomeScreen]=useState(true);
  const [breakPage,setBreakPage]=useState(false)

  //Main states
  const [paused,setPaused]=useState(false)
  const [started,setStarted]=useState(false)

  //remaining times
  const [remainingWorkTime, setRemainingWorkTime]=useState(workingTime);
  const [remainingBreakTime, setRemainingBreakTime] = useState(breakDuration);
  const [remainingRounds, setRemainingRounds]=useState(roundCount);
  const [countdown, setCountdown]=useState(countdownConst)

  //end and new ends
  const [workEnd, setWorkEnd]=useState(new Date().getTime())
  const [breakEnd, setBreakEnd]=useState(new Date().getTime())

  useEffect(() => {
    let interval;
  
    if (started && !paused) {
      if (workEnd === null)setWorkEnd(new Date().getTime() + remainingWorkTime * 1000);
      if (breakEnd === null)setBreakEnd(new Date().getTime() + remainingBreakTime * 1000);
      interval = setInterval(() => {
        if (!breakPage) {
          const newRemainingWorkTime = (workEnd - new Date().getTime()) / 1000;
          setRemainingWorkTime(newRemainingWorkTime);
          if (newRemainingWorkTime <= 1) {
            setBreakEnd(new Date().getTime() + breakDuration * 1000);
            setBreakPage(true);
          }
        } else {
          const newRemainingBreakTime = (breakEnd - new Date().getTime()) / 1000;
          setRemainingBreakTime(newRemainingBreakTime);
          if (newRemainingBreakTime <= 1) {
            setWorkEnd(new Date().getTime() + workingTime * 1000);
            setBreakPage(false);
            setRemainingRounds(prevRounds => prevRounds - 1);
          }
        }
  
        if (remainingRounds < 1 && breakPage) {
          setHomeScreen(true);
          setStarted(false);
          setCountdown(countdownConst);
        }
      }, 100);
    }
      paused && workEnd !== null && !breakPage && setRemainingWorkTime((workEnd - new Date().getTime()) / 1000);
      paused && workEnd !== null && !breakPage && setWorkEnd(null);
      paused && breakEnd !== null && breakPage && setRemainingBreakTime((breakEnd - new Date().getTime()) / 1000);
      paused && breakEnd !== null && breakPage && setBreakEnd(null);
    return () => clearInterval(interval);
  }, [started, paused, breakPage, workEnd, breakEnd, remainingRounds, remainingWorkTime, remainingBreakTime, breakDuration, workingTime, countdownConst]);

  const pauseOrResumeTimer=()=>setPaused(!paused)
  const exitTimer=()=>setHomeScreen(true)

  function startTimer(){setCountdownPage(true);}
  useEffect(() => {
    if (countdownPage){
      setCountdown(countdownConst)
    const isDelayedIntervalId = setInterval(() => {
      setCountdown((count) => {
        if (count <= 1) {
          setCountdownPage(false)
          setHomeScreen(false);
          setStarted(true);
          setBreakPage(false);
          setRemainingRounds(roundCount)
          clearInterval(isDelayedIntervalId);
          setWorkEnd(new Date().getTime()+workingTime*1000)
          setBreakEnd(new Date().getTime()+breakDuration*1000)
          return 0;
        }
        return --count;
      })
    }, 1000)}},[countdownPage]) 

  /////////////////////////////Event Listener
  
  
  //fullscreen
  document.addEventListener("keydown",
    (event)=>{event.key==='f' && (document.fullscreenElement? document.exitFullscreen():document.body.requestFullscreen())})

  // pause/play  
  document.addEventListener("keydown", function(event){event.key==='k' && setPaused(!paused)})


  return (
    <div className='min-w-screen min-h-screen flex flex-col justify-center items-center '>
      <div className='w-72 flex flex-col gap-10'>
        {countdownPage ? (
          <div className='font-bold text-black text-8xl text-center'>{countdown}</div>
        ) : (
          <>
            {homeScreen && (
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

                <UsualButton
                  onClick={startTimer}
                  label='Start'
                  svgIcon={playOrResumeButton}
                />
              </>
            )}

            {!homeScreen && (
              <>
                {!breakPage && (
                  <TimerSection
                    title='Work'
                    getter={Math.floor(remainingWorkTime)}
                    isTimer={true}
                  />
                )}

                {breakPage && (
                  <TimerSection
                    title='Break'
                    getter={Math.floor(remainingBreakTime)}
                    isTimer={true}
                  />
                )}

                <TimerSection
                  title='Round'
                  getter={`${roundCount - remainingRounds}/${roundCount}`}
                  isTimer={false}
                />

                <div className='flex flex-row gap-5'>

                  <div onClick={pauseOrResumeTimer}
                       className='w-full h-16 bg-black rounded-full cursor-pointer select-none'>

                    <div className='w-full h-full flex justify-center items-center'>

                      {/* Icon */}
                      <img src={paused ? playOrResumeButton : pauseButton} className='w-8'/>

                    </div>
                  </div>

                  {/* Cancel button */} 
                  <div onClick={exitTimer } 
                       className='w-full h-16 bg-red-700 rounded-full cursor-pointer select-none'>

                    <div className='w-full h-full flex justify-center items-center'>

                      {/* Icon */}
                      <img src={cancelButton} className='w-8'/>

                    </div>
                  </div>
                </div>

              </>
            )}
          </>)}
      </div>
    </div>
  );
}

export default Timer;
