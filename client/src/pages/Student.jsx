import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/Student/NavigationBar';
import Dashboard from '../components/Student/Dashboard';
import SideBarProfile from '../components/Student/SideBarProfile';

const Student = () => {
    return (
        <div>
            <NavigationBar />

            <div className="flex">
                <SideBarProfile />

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/exams" exact element={<Board />} />
                </Routes>
            </div>
        </div>
    )
}

export default Student