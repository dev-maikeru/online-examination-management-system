import { useState, useEffect } from 'react'
import axios from 'axios';
import getUserData from '../../Auth/authService'

const USER_URL = `${process.env.REACT_APP_BASE_URL}/api/users`

function InputField({ data, formErrors, dataHandler, toggle }) {
    let error = " ";
    Object.keys(formErrors).map((keyName, keyIndex) => {
        if (keyName === data[0]) {
            error = formErrors[keyName]
        }
    })

    return (
        <div className="flex flex-col mb-3">
            <label className="font-semibold mb-1 ml-5 capitalize dark:text-[#e2dddd]">{data[0]}</label>
            <div className="flex relative ">
                {toggle ?
                    <input
                        value={data[1]}
                        onChange={dataHandler}
                        name={data[0]}
                        type="text"
                        className="ml-5 mr-10 rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-[#17181C] dark:border-[#17181C] dark:text-[#e2dddd]" />
                    : <p className="ml-5 mr-10 py-1 px-4 text-lg font-sans cursor-pointer dark:text-[#e2dddd]">{data[1]}</p>}
            </div>
            <p className="text-red-600 text-sm font-normal ml-6">{error}</p>
        </div>
    )
}

const EditInfo = (props) => {

    const [formData, setFormData] = useState(props.user)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    console.log(formData);

    const formDataHandler = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // if (name === 'email' || name === 'username') {
        //     //* If sa username or email field nagtatype si user call this function
        //     // checkIfAlreadyExists(name, value)
        // }
    }

    const formValidation = (data) => {
        const errors = {}
        const validator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if (!data.name) {
            errors.name = "Name is required!"
        }
        if (/\d/.test(data.name)) {
            errors.name = "Name field must contain only letters!"
        }
        if (!data.username) {
            errors.username = "Username is required!"
        }
        if (!data.email) {
            errors.email = "Email is required!"
        } else if (!validator.test(data.email)) {
            errors.email = "This is not a valid email format!"
        }


        return errors
    }

    const onSubmitHandle = (e) => {
        e.preventDefault()
        setFormErrors(formValidation(formData))
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const updateUserData = async () => {
                const { _id } = await getUserData()
                const newUserData = await axios.patch(USER_URL.concat(`/${_id}`), { 
                    fullName: formData.name, 
                    username: formData.username,
                    email: formData.email 
                })
                window.location.reload(false)
            }
            updateUserData()
        }
    }, [formErrors])

    return (
        <div className="my-5 lg:w-10/12 border p-5 rounded-md shadow-md bg-white dark:bg-[#26292F] dark:border-[#26292F]">
            <form onSubmit={onSubmitHandle} autoComplete="off">
                <h3 className="text-lg font-medium mb-3 ml-5 dark:text-[#e2dddd]">Edit Information</h3>

                {Object.entries(formData).map((data, index) => {
                    if (data[0] === 'name' || data[0] === 'username' || data[0] === 'email') {
                        return <InputField data={data} key={index} formErrors={formErrors} dataHandler={formDataHandler} toggle={props.toggle} />
                    }
                    return null
                })}

                <div className="flex justify-center py-4">
                    <button
                        type='submit'
                        className={`${ props.toggle ? 'block' : 'hidden' } w-52 py-2 px-4 bg-slate-400 hover:bg-slate-500 focus:ring-slate-500 focus:ring-offset-slate-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full`}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditInfo