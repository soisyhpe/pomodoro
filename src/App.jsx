import {useState, useRef} from 'react'
import './App.css'
[]=useRef();

// 17h50 : initial date
// 17h55 : stop
// 18h00 : resume
// (18h00 - 17h50) = 10min : current (this is not good)

// fuckMaxwell = (18h00 - 17h50)
// fuckMaxwell - (18h00 - 17h50) = 5 min : correct

function App() {
  const startingDate = /* todo */;
  const expectedEndingDate = /* todo */;

  const workingDuration = /* todo */;
  const breakDuration = /* todo */;
  const roundsNumber = /* todo */;

  /* todo: workingDuration render */
  /* todo: breakDuration render */
  /* todo: roundsNumber render */

  /* todo: remainingTime render */

  const startTimer = (event) => {
    /* todo: 
         - initialize every constants
         - check bad behaviours (e.g. negative workingDuration, breakDuration, roundsNumber...)
         - once everything is good: starting timer and
         - ...
    */

    stopTime = new Date();

    console.log(stopTime);
    stopTime.setMinutes(stopTime.getMinutes() + 5);
    console.log(stopTime);

    setInterval(() => {
      setText(stopTime.getMinutes());
    }, 1000);

    event.preventDefault();
  };

  return (
    <div>
      <form>
        <h2>{text}</h2>
        <input id="text" type="text"/>
        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}

export default App;