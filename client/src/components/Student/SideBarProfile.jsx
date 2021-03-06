import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md'
import { FaHistory } from "react-icons/fa";
import getUserData from '../Auth/authService'
import { useNavigate } from 'react-router-dom'


function SidebarMenus(props) {
    const activeClass = { set1: "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-blue-500 to-cyan-400", set2: "-mr-1 font-medium" }
    const inactiveClass = { set1: "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-gray-600 group", set2: "group-hover:text-gray-700 dark:group-hover:text-gray-100" }

    return (
        <div className="">
            <Link onClick={props.active} className={props.isActive && props.elemIndex === props.activeIndex ? activeClass.set1 : inactiveClass.set1} to={props.endPoint}>
                {props.icon}
                <span className={`${ props.isActive && props.elemIndex === props.activeIndex ? activeClass.set2 : inactiveClass.set2 } dark:text-[#e2dddd]`}>{props.menuName}</span>
            </Link>
        </div>
    )
}

const SideBarProfile = () => {
    const [userData, setUserData] = useState({})
    const [activeLink, setActiveLink] = useState({ isActive: true, index: 0 })
    const sidebar = [
        {
            menuName: 'Exams',
            endPoint: '/student',
            icon: <MdDashboard className="dark:text-[#e2dddd]" />
        },
        {
            menuName: 'Activity',
            endPoint: '/student/activity',
            icon: <FaHistory className="dark:text-[#e2dddd]" />
        }
    ]
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData()
            setUserData(userData)
        }
        const token = localStorage.getItem('token')
        if (token) {
            fetchUserData()
        } else {
            //* Load hardcoded data if ibabypass yung url ng student
            //! Temporary data muna para hindi nawawala yung sidebar kung ibabypass
            setUserData({ username: 'Romeo Gatchalian' })
        }
    }, [])


    const activeLinkHandler = (isActive, index) => {
        const keys = Object.keys(activeLink)
        setActiveLink({ ...activeLink, [keys[0]]: isActive, [keys[1]]: index })
    }

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    
    return (
        <>
            {userData &&
                <aside className="sm:block hidden ml-5 pb-3 px-6 w-72 flex-col justify-between h-full border bg-white rounded-2xl shadow-lg dark:bg-[#1e2027] dark:border-[#292d35]">
                    <div>

                        <div className="mt-8 text-center">
                            <img src={`/profile-picture/${userData.picture}`} alt="" className="w-28 h-28 m-auto rounded-full object-cover" />
                            <h1 className='mt-4 text-md font-bold text-gray-600'>{`${userData.fullName}`}</h1>
                            <Link onClick={() => activeLinkHandler(false, 0)} to={'/student/profile'}>
                                <h5 className="text-lg font-normal text-gray-600 hover:text-cyan-500 hover:underline underline-offset-4 dark:text-[#e2dddd] dark:hover:text-cyan-400">{userData.username}</h5>
                            </Link>
                            
                            <span className=" text-gray-400 ">Student</span>
                        </div>

                        <div className="space-y-2 tracking-wide mt-8">
                            {sidebar.map((prop, index) => {
                                return <SidebarMenus elemIndex={index} activeIndex={activeLink.index} isActive={activeLink.isActive} active={() => activeLinkHandler(true, index)} key={index} menuName={prop.menuName} endPoint={prop.endPoint} icon={prop.icon} />
                            })}
                        </div>
                    </div>

                    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t mt-3 dark:border-gray-600">
                        <button onClick={() => logout()} className="px-4 py-3 flex items-center space-x-4 rounded-xl text-gray-600 group dark:text-[#e2dddd] hover:text-[#e2dddd] hover:bg-gradient-to-r from-blue-500 to-cyan-400 hover:font-medium w-full transition ease-in-out ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-[#e2dddd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="dark:text-[#e2dddd]">Logout</span>
                        </button>
                    </div>
                </aside>
            }
        </>
    )
}

export default SideBarProfile