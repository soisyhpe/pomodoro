import './Timer.css'

function Timer() {


  return (
    <div className='h-screen flex items-center justify-center'>

      <div className='mb-12'>
        <h1 className='text-4xl'>Working time</h1>
        <p className='text-8xl'>25:00</p>
        <div className='flex items-stretch'>
          <button className='w-full h-12 rounded-full text-4xl p-0 mr-2'>-5</button>
          <button className='w-full h-12 rounded-full text-4xl p-0 ml-2'>+5</button>
        </div>
      </div>

      <div className='mb-12'>
        <h1 className='text-4xl'>Break duration</h1>
        <p className='text-8xl'>25:00</p>
        <div className='flex items-stretch'>
          <button className='w-full h-12 rounded-full text-4xl p-0 mr-2'>-5</button>
          <button className='w-full h-12 rounded-full text-4xl p-0 ml-2'>+5</button>
        </div>
      </div>

      <div className='mb-12'>
        <h1 className='text-4xl'>Round</h1>
        <p className='text-8xl'>4</p>
        <div className='flex items-stretch'>
          <button className='w-full h-12 rounded-full text-4xl p-0 mr-2'>-1</button>
          <button className='w-full h-12 rounded-full text-4xl p-0 ml-2'>+1</button>
        </div>
      </div>

      <div>
        <button className='w-72 h-16 rounded-full text-4xl p-0'>Start</button>
      </div>
    </div>
  )
}

export default Timer