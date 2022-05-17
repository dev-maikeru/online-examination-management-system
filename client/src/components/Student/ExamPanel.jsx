// Eto yung panel pag mag eexam na
// Whole page ang sakop neto
// Mag rurun lang dapat to pag clinick yung start button sa exam description

import { useState, useEffect, useRef } from 'react'
import { RiTimerLine } from "react-icons/ri";
import { IoMdCheckmark } from 'react-icons/io'
import logo from '../../assets/images/logo-c.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { atom, useRecoilState, useRecoilValue } from 'recoil'

const EXAM_URL = `${process.env.REACT_APP_BASE_URL}/api/exams`

const studentAnswerState = atom({
  key: 'studentAnswerState',
  default: []
})

const correctAnswerState = atom({
  key: 'correctAnswerState',
  default: []
})

function ButtonChoices(props) {
    const [answer, setAnswer] = useRecoilState(studentAnswerState)
    const activeClass = 'ring-green-500 ring-offset-green-200 bg-green-300 outline-none ring-2 ring-offset-4'

    useEffect(() => {
     console.log(answer);
    }, [answer])
    
    const getChoiceValueHandler = (e) => {
       //* Set the answer of student
        const answerCopy = [...answer]
        answerCopy[props.questionNo] = e.target.value
        setAnswer(answerCopy)
    }

    return (
        <button
            onClick={getChoiceValueHandler}
            value={props.text}
            type="button"
            className={`p-3 rounded-xl shadow ${answer[props.questionNo] === props.text ? activeClass : 'bg-cyan-300 hover:bg-cyan-500'}`}>
            {props.text}
        </button>
    )
}

const QuestionForm = ({ exam }) => {
    const counter = exam.length; //count the number of question
    const [currentQuestion, setCurrentQuestion] = useState(0) //counter for current question
    const questionList = useRef(new Array()) //* Reference for question list
    const studentAnswer = useRecoilValue(studentAnswerState)
    const correctAnswer = useRecoilValue(correctAnswerState)

    // button for next question
    const nextQuestionHandler = () => {
        if (!(currentQuestion >= counter - 1)) {
            const nextQuestion = currentQuestion + 1;
            //* Magscroll dun sa question list if hindi visible
            questionList.current[nextQuestion].scrollIntoView()
            setCurrentQuestion(nextQuestion)
        }
    }

    // button for previous question
    const previousQuestionHandler = () => {
        if (!(currentQuestion <= 0)) {
            const prevQuestion = currentQuestion - 1;
            //* Magscroll dun sa question list if hindi visible
            questionList.current[prevQuestion].scrollIntoView()
            setCurrentQuestion(prevQuestion)
        }
    }

    // function for link list
    const questionLinkHandler = (e) => {
        const newCurrent = e.target.value
        setCurrentQuestion(newCurrent)
        console.log(newCurrent)
    }

    const submitExam = () => {
        //test the computation of student score
        const result = correctAnswer.map((answer, index) => {
          if (answer === studentAnswer[index]) {
             return 1
          }
          return 0
        })
        const score = result.reduce((prev, curr) => prev + curr, 0)
        console.log('Score:', score);
    }

    return (
        <>
            <div className="relative flex flex-col justify-center align-middle items-center px-10">
                {/* Question form */}
                <div className="relative h-full lg:w-3/4 md:w-3/4 w-full flex flex-col mt-32 mx-10 border border-y-8 border-cyan-200  bg-slate-100 rounded-2xl shadow-md">
                    <div className="p-10">
                        <p >{currentQuestion + 1} of {counter}</p>
                    </div>

                    <div className="pb-10 px-5">
                        {/* Question */}
                        <div className="text-center mb-10">
                            <p className="text-xl">{exam[currentQuestion].question}</p>
                        </div>

                        {/* Choices */}
                        <div className="grid grid-cols-2 grid-flow-row gap-5 p-5 lg:px-20" role='group'>

                            {exam[currentQuestion].choices.map((choice, index) => {
                                return <ButtonChoices key={index} questionNo={currentQuestion} text={choice}/>
                            })}
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-5 w-96 mt-5 text-white">
                    <button onClick={previousQuestionHandler} className="bg-red-500 hover:bg-red-600 p-2  w-24 shadow-md rounded">Previous</button>
                    <button onClick={nextQuestionHandler} className="bg-green-400 hover:bg-green-500 p-2 w-24 shadow-md rounded">Next</button>
                </div>
                <div className='flex justify-center mt-12 border rounded-md p-5'>
                    <button onClick={submitExam} className='px-12 py-2 text-white bg-cyan-400 rounded-md shadow-md hover:bg-cyan-500'>Submit</button>
                </div>
            </div>

            {/* Link list */}
            <div className="xl:absolute xl:right-0 xl:top-16  flex justify-center -ml-16 xl:mt-32 pr-3">
                <div className="relative  xl:w-44 w-3/5 xl:h-48 h-28 overflow-y-scroll px-2 my-5 border">
                    <ul>
                        {Object.keys(exam).map((item, index) => {
                            return <div className='flex gap-4 items-center'>
                                    <li
                                      ref={(el) => questionList.current.push(el)}
                                      className={`${ currentQuestion === index ? 'text-cyan-400' : '' } font-medium cursor-pointer hover:underline underline-offset-4 hover:text-cyan-500`}
                                      onClick={questionLinkHandler}
                                      key={index}
                                      value={index}>Question {index + 1}
                                    </li>
                                     {studentAnswer[index] ? <IoMdCheckmark className='text-green-500'/> : ''}
                                   </div>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}


const ExamPanel = () => {
    const { id } = useParams()
    const [exam, setExam] = useState()
    const [correctAnswer, setCorrectAnswer] = useRecoilState(correctAnswerState)
    // sample exam
    const questionaire = [
        {
            questionId: 1,
            question: "What is the full meaning of DOM?",
            choices: [
                {
                    choiceText: "Document Object Model"
                },
                {
                    choiceText: "Dynamic Object Model"
                },
                {
                    choiceText: "Document Oriented Modulus"
                },
                {
                    choiceText: "Document Oriented Model"
                },
                {
                    choiceText: "Document Oriented Model"
                }
            ],
            correctAnswer: "Document Object Model",
            yourAnswer: "",
            points: 2
        },
        {
            questionId: 2,
            question: "The program that translates your code from a high-level language to the binary language is called ________",
            choices: [
                {
                    choiceText: "programmer"
                },
                {
                    choiceText: "compiler"
                },
                {
                    choiceText: "translator"
                },
                {
                    choiceText: "linker"
                }
            ],
            correctAnswer: "compiler",
            yourAnswer: "",
            points: 2
        },
        {
            questionId: 3,
            question: " In JavaScript, what is a block of statement?",
            choices: [
                {
                    choiceText: "Conditional block"
                },
                {
                    choiceText: "block that combines a number of statements into a single compound statement"
                },
                {
                    choiceText: "both conditional block and a single statement"
                },
                {
                    choiceText: "block that contains a single statement"
                }
            ],
            correctAnswer: "block that combines a number of statements into a single compound statement",
            yourAnswer: "",
            points: 2
        }
    ]

    useEffect(() => {
        const fetchExam = async () => {
            try {
                // change the url with the real examination url
                const response = await axios.get(EXAM_URL.concat(`/${id}`));
                setExam(response.data)
                const questions = response.data.questions.concat(response.data.groups)
                setCorrectAnswer(questions.map(question => question.answer))
            } catch (error) {
                console.log(error.response.data)
            }
        }
        fetchExam()
    }, [])

    return (
      <>
        {exam &&
        <>
          <div className="flex justify-center ">
              <div className="relative lg:w-3/4 md:w-3/4 w-full flex  items-center h-20 rounded-b-3xl shadow-md border">
                  <div className="flex items-center m-10 text-cyan-500">
                      <div className="absolute left-0 flex items-center px-5">
                          <img src={logo} alt="logo" className="w-30 h-10 rounded object-cover" />
                          {/* <h2 className="text-sm lg:text-1g font-bold text-slate-900 capitalize tracking-wider">Online Inc.</h2> */}
                      </div>

                      <div className='absolute right-0 flex flex-row-reverse px-5'>
                          <p className="text-lg font-medium">0:59:10</p>
                          <RiTimerLine className="w-8 h-8 " />
                      </div>
                  </div>
              </div>
          </div>
         
          <QuestionForm exam={exam.questions.concat(exam.groups)} />
         </>
        }
      </>
    )
}

export default ExamPanel