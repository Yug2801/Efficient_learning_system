/* eslint-disable no-unused-vars */

import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './components/Mainn'
import Mainn from './components/Mainn'
import Loader from './components/Loader'
import Error from './components/Error'
import StarttState from './components/StarttState'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishedScreen from './components/FinishedScreen'

const initialState={
  questions:[],


  status:'loading',
  index:0,
  answer:null,
  points:0
}

function reducer(state,action){
    switch(action.type)
    {
      case 'dataRecieved':
        return{
          ...state,
          questions:action.payload,
          status:'ready'
        }
        case 'dataFailed':
          return{
            ...state,
            status:'error'
          }  
        case 'start':
            
            return{
              ...state,
              status:'active'
            }
         case 'inc':
            
            return{
              ...state,
              index:state.index+1,
              answer:null,
            }  
         case 'newAnswer':
           
            const question = state.questions.at(state.index);
            console.log(state.points);
            return{
              ...state,
              answer:action.payload,
              points:action.payload===question.correctOption?
              state.points+question.points:
              state.points

            } 
            case 'finish':
            
            return{
              ...state,
              status:'finished'
            }   
      default:
        throw new Error('action unknown')
    }
}

export default function App(){


  
  
  const [state,dispatch]=useReducer(reducer,initialState)
  const {questions,status,index,answer,points}=state;

  const numQuestions=questions.length;
  const maxPossiblePoints=questions.reduce((prev,curr)=>prev+curr.points,0);

  useEffect(function(){
    fetch('http://localhost:8000/questions')
    .then((res)=>res.json())
    .then((data)=>dispatch({type:'dataRecieved',payload:data}))
    .catch(()=>dispatch({type:'dataFailed'}));
  },[])

  return <div className='app'>
   <Header/>
   
   <Mainn>
    {status==='loading' && <Loader/>}
    {status==='error' && <Error/>}
    {status==='ready' && <StarttState numQuestions={numQuestions} dispatch={dispatch} /> }
    {status==='active'&& 
    <>
    <Progress
    index={index}
    numQuestions={numQuestions}
    points={points}
    answer={answer}
    maxPossiblePoints={maxPossiblePoints}
   />
    <Question 
    questions={questions} 
    index={index} 
    dispatch={dispatch} 
    answer={answer} />

    <NextButton dispatch={dispatch} answer={answer} index={index}
    numQuestions={numQuestions}/>
    </>
    }
    {status==='finished' && <FinishedScreen points={points} maxPossiblePoints={maxPossiblePoints} />}
   
    
   </Mainn>
  </div>
}