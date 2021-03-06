import React, { useEffect, useState } from 'react'
import './bg.css'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Faculty/Dashboard'
import Profile from '../components/Faculty/Profile';
import QuestionBanks from '../components/Faculty/QuestionBanks'
import Questions from '../components/Faculty/Questions'
import UpdateQuestionForm from '../components/Faculty/UpdateQuestionForm'
import UpdateExamForm from '../components/Faculty/UpdateExamForm'
import Exams from '../components/Faculty/Exams'
import ExamPreview from '../components/Faculty/ExamPreview'
import StudentListTable from '../components/Faculty/StudentListTable'
import PrintExamResult from '../components/Faculty/PrintExamResult'
import ExamForm from '../components/Faculty/ExamForm'
import Reports from '../components/Faculty/Reports'
import Sidebar from '../components/Faculty/Sidebar'
import Background from '../components/Faculty/Background'
import Header from '../components/Faculty/Header'
import { useRecoilValue } from 'recoil'
import sidebarState from '../components/Faculty/sidebarAtom'
import { useNavigate  } from 'react-router-dom'
import getUserData from '../components/Auth/authService';

function Content({children}) {
  return(
    <div className="overflow-auto h-screen pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
        {children}
    </div>
  )
}
function Faculty() {
  const isSidebarVisible = useRecoilValue(sidebarState)
  const navigate = useNavigate()
  const [isFaculty, setIsFaculty] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    //* If user is not authenticated, it cannot bypass a protected component
    if (!token) {
      navigate('/')
    }

    const getUserRole = async () => {
      const { role } = await getUserData()
      if(role === 'Student') {
        setIsFaculty(false)
        navigate('/student')
      } else {
        setIsFaculty(true)
      } 
    }
    getUserRole()
  }, [])
  
  return (
    <>
    {localStorage.getItem('token') && isFaculty &&
      <Background>
        <Sidebar/>
        <main className={`flex flex-col gap-4 main-container sm:w-[100vw] h-auto ${isSidebarVisible ? 'w-[100vw]' : 'w-[100vw]'}`}>
          <header className='w-full'>
            <Header/>
          </header>
          <Content>
            <Routes>
              {/* //* Child routes of /faculty */}
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="profile/*" element={<Profile />} />
              <Route path="banks" element={<QuestionBanks/>} /> 
              <Route path="banks/:id" element={<Questions/>} />
              <Route path="question/edit/:id" element={<UpdateQuestionForm/>} />
              <Route path="exams" element={<Exams/>} />
              <Route path="exams/:id" element={<ExamPreview/>} />
              <Route path="student/list" element={<StudentListTable/>} />
              <Route path="result/view" element={<PrintExamResult/>} />
              <Route path="exams/form" element={<ExamForm/>} />
              <Route path="exams/:id/edit" element={<UpdateExamForm/>} />
              <Route path="reports" element={<Reports/>} />
            </Routes>
          </Content>
        </main>
      </Background>
    }
    </>
  )
}

export default Faculty