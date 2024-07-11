import { useState } from 'react'
import '../App.css'
import search from '../assets/icons/search.svg'
import { useStateContext } from '../context/StateContextProvider'
import { BackgroundLayout, WeatherCard, MiniCard } from '../components/weather'

function Forecast() {

  const [input, setInput] = useState('')
  const { weather, thisLocation, values, setPlace } = useStateContext()
  // console.log(weather)

  const submitCity = () => {
    setPlace(input)
    setInput('')
  }

  return (
    <div className='w-full mt-12 max-h-screen text-white px-8 '>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-sky-100 text-2xl mt-5'>Forecast</h1>
        <div className='bg-white w-[15rem] border border-white overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2 mt-5'>
          <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
          <input onKeyUp={(e) => {
            if (e.key === 'Enter') {
              // sumit the form
              submitCity()
            }
          }} type="text" placeholder='Search city' className='focus:outline-none w-full  text-green-500 text-lg' value={input} onChange={e => setInput(e.target.value)} />
        </div>
      </nav>
      <BackgroundLayout></BackgroundLayout>
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] text-white items-center justify-center'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className='flex justify-center  gap-8 flex-wrap w-[60%]'>
          {
            values?.slice(1, 7).map(curr => {
              return (
                <MiniCard
                  key={curr.datetime}
                  time={curr.datetime}
                  temp={curr.temp}
                  iconString={curr.conditions}
                />
              )
            })
          }
        </div>
      </main>
    </div>
  )
}

export default Forecast
