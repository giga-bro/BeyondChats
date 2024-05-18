import React, {useState, useEffect } from 'react'
import axios from 'axios'

const App: React.FC = () => {

  const [citiations, setCitiations] = useState<object[]>([])

  const fetchData = async () => {
    try {
      const res = await axios.post('https://beyondchats.onrender.com/get_citations', {
        headers: {
          'origin': 'http://localhost:5173',
        }
      })
      setCitiations(res.data)
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const extractDomain = (url:string) => {
    const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/g;
    const match = domainRegex.exec(url);
    return match ? match[1] : '';
  };


  return (
    <>
      <div className="h-screen w-screen bg-black">
        <div className="w-full h-1/10 lg:h-[10%] sm:h-[10%] flex justify-center items-center text-center text-white">
          <h1 className="text-5xl">Citations</h1>
        </div>
        <div className="w-full lg:h-[90%] sm:h-[90%] h-[90%] flex flex-wrap justify-center items-center overflow-y-scroll">
          {citiations?.length > 0 && citiations?.map((citation, index) => (
            <div
              className="w-full lg:m-[2%] my-[2%] sm:w-1/2 md:w-1/3 lg:w-1/4 h-1/3 m-1 card"
              key={index}
            >
              <div className="w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full h-4/5 overflow-hidden ">
                  <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {extractDomain(citation?.link)}
                  </h5>
                  <p className="mt-2 font-normal text-gray-700 lg:text-lg text-xs dark:text-gray-400">
                    {citation?.context?.length > 100
                      ? citation?.context?.slice(0, 150) + '...'
                      : citation?.context}
                  </p>
                </div>
                <div className="w-full h-1/5 flex justify-start items-center ">
                  <a
                    href={citation?.link}
                    className="mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
