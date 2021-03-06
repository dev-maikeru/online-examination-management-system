import { useState } from 'react'

const InputCode = ({ getCodeFunction }) => {
    const [getCode, setGetCode] = useState("")

    const examCodeHandler = (e) => {
        e.preventDefault()
        getCodeFunction(getCode)
    }

    return (
        <div className="relative flex justify-center items-center p-2 lg:h-40 h-32 bg-white shadow-lg rounded-2xl mb-5 lg:ml-5 border dark:bg-[#1e2027] dark:border-[#292d35]">
            <div className="p-2 max-w-xl min-w-max rounded-lg border border-solid border-gray-300 shadow-md dark:border-gray-600">
                <form onSubmit={examCodeHandler}>
                    <div className="relative flex w-full">
                        <input
                            onChange={(e) => setGetCode(e.target.value)}
                            type="search"
                            className="flex w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-slate-600 focus:outline-none mr-1 dark:bg-[#17181C] dark:border-gray-800 dark:text-[#e2dddd]"
                            placeholder="Enter exam code" />
                        <button type="submit" className="px-6 py-2 border-2 text-white text-sm font-medium bg-[#7B9EBE] hover:bg-[#6e8eac] leading-tight rounded-md transition duration-150 ease-in-out dark:border-none">Enter</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InputCode
