import { useState, useEffect } from 'react'


const UpdatePic = () => {
    const [picture, setPicture] = useState("https://avatarfiles.alphacoders.com/275/275525.jpg")
    const [isSubmit, setIsSubmit] = useState(false)

    const getPhotoHandler = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPicture(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const changePictureHandler = (e) => {
        e.preventDefault()
        setIsSubmit(true)
        console.log(isSubmit)
    }
    useEffect(() => {
        if (isSubmit) {
            console.log(picture)
        }
    }, [])

    return (
        <div className="mt-4 lg:w-10/12 border p-5 rounded-sm mb-5 shadow">
            <h3 className="text-lg font-medium mb-5">Profile picture</h3>
            <form onSubmit={changePictureHandler}>
                <div className="flex justify-center m-5 h-52">
                    <img src={picture} alt="Profile pic" className="flex h-52 w-52 border-2 border-gray-500" />
                </div>

                <div className="max-w-2xl m-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Upload file</label>
                    <input onChange={getPhotoHandler} type="file" accept="image/*" className="w-full p-1 hover:bg-slate-200 transition ease-in font- border border-gray-300 rounded-lg cursor-pointer focus:outline-none" />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">PNG and JPG (MAX. 800x400px).</p>
                </div>

                <div className="flex justify-center pb-1">
                    <button
                        type="submit"
                        className={`w-52 py-2 px-4 bg-slate-400 hover:bg-slate-500 focus:ring-slate-500 focus:ring-offset-slate-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full`}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePic