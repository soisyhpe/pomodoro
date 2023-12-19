import './timer.css';
import { useRef, useState } from 'react';

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
}

function Timer() {
  const [workingTime, setWorkingTime] = useState(5);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [round, setRound] = useState(3);
  const [breaker,setBreaker]= useState(false)

  const [started, setStarted] = useState(false);

  const [delayedStart, setDelayedStart] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const [breakTime,setBreakTime]=useState(breakDuration);

  const [startTime, setStartTime] = useState(null);

  const startTimer = () => {
    //IDK WHAT this is for 
    //setStarted(!started);

    // Add a 3-second delay before starting the timer
    if (!started) {
      setDelayedStart(true);
  
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            setDelayedStart(false);
      
            // Todo: Timer logic here
            setStarted(true);
            setStartTime(workingTime);
      
            
    }
  };
  

  return (
    <div className='min-h-screen min-w-screen flex flex-col items-center justify-center'>

      {delayedStart ? (
        <p className='font-bold text-8xl mt-3'>
          {countdown}
        </p>
      ) : (
        <> 
          {!started && (
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
            </>
          )}

          {started && !breaker &&(
              <TimerSection
                title='Remaining time'
                getter={startTime}
                isTimer={true}
              />)}
          {started && breaker &&(
              <TimerSection
                title='Break time left'
                getter={breakTime}
                isTimer={true}
              />)}
          {started && breaker && (
              <TimerSection
                title='Rounds left'
                getter={round}
                isTimer={false}
              />)}


          <div className='w-72'>
            <button
              onClick={startTimer}
              className='bg-gray-900 text-white w-full h-16 rounded-full font-bold text-4xl p-0 m-0'
            >
              {started ? 'Pause' : 'Start'}
            </button>
          </div>
        </>
      )}


    </div>
  );
}

export default Timer;
