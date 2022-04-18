import { useState, useEffect } from 'react'

function SignUpItems() {
  const initialValue = {
    username: '',
    email: '',
    password: '',
    role: ''
  }
  const [formData, setFormData] = useState(initialValue) //state for handling data fields
  const [formErrors, setFormErrors] = useState({}) // state for handling errors in each fields
  const [isSubmit, setIsSubmit] = useState(false)

  // get value in each field
  const formDataHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

  }

  // form submit button
  const signUpSubmit = (e) => {
    e.preventDefault()
    setFormErrors(formValidation(formData))
    setIsSubmit(true)

  }

  // validate each field
  const formValidation = (data) => {
    const errors = {}

    if (!data.username) {
      errors.username = "Username is required!"
    }

    if (!data.email) {
      errors.email = "Email is required!"
    }

    if (!data.password) {
      errors.password = "Password is required!"
    } else if (!data.password.length < 4) {
      errors.password = "Password must be more than 4 characters."
    }

    if (!data.role) {
      errors.role = "Select User type."
    }

    return errors
  }

  // to check if there is no error
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData)
    }
  }, [formErrors])

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
      <div className="mt-2 w-72">
        <form action="#" autoComplete="off" onSubmit={signUpSubmit} >
          <div className="flex flex-col mb-6">
            <label className="font-normal mb-2">Username</label>
            <div className="flex relative ">
              <input value={formData.username}
                onChange={formDataHandler}
                name="username"
                type="text"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" placeholder="Your username" />
            </div>
            <p className="text-red-600">{formErrors.username}</p>
          </div>


          <div className="flex flex-col mb-6">
            <label className="font-normal mb-2">Email</label>
            <div className="flex relative ">
              <input value={formData.email}
                onChange={formDataHandler}
                name="email"
                type="text"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" placeholder="Your email" />
            </div>
            <p className="text-red-600">{formErrors.email}</p>
          </div>

          <div className="flex flex-col mb-6">
            <label className="font-normal mb-2">Password</label>
            <div className="flex relative ">
              <input value={formData.password}
                onChange={formDataHandler}
                name="password"
                type="password"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" placeholder="Your password" />
            </div>
            <p className="text-red-600">{formErrors.password}</p>
          </div>

          <div className="flex flex-col mb-6">
            <label className="font-normal mb-2">User Role</label>

            <div className="flex justify-evenly ">
              <div className="font-medium">
                <input
                  onChange={formDataHandler}
                  type="radio"
                  value="Student"
                  name="role"
                /> Student
              </div>
              <div className="font-medium">
                <input
                  onChange={formDataHandler}
                  type="radio"
                  value="Faculty"
                  name="role"
                /> Faculty
              </div>
            </div>
            <p className="text-red-600">{formErrors.role}</p>
          </div>

          <div className="flex w-full">
            <button
              type="submit"
              className="py-2 px-4  bg-slate-400 hover:bg-slate-500 focus:ring-slate-500 focus:ring-offset-slate-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full ">
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center mt-6">
        <span className="inline-flex items-center text-sm font-light text-center text-gray-500 ">
          Already have an account?
        </span>
        <a href="#" className="inline-flex items-center text-md font-light text-center ml-1 text-gray-500 hover:text-sky-400" >
          Signin
        </a>
      </div>
    </div>
  )
}

export default SignUpItems