import React from 'react';

export default function StarttState({numQuestions,dispatch}) {
  return (
    <div className='start' >
        <h2>welcome to react quizz</h2>
        <h3>{numQuestions} questions to check your react mastery</h3>
        <button className='btn btn-ui' onClick={()=>dispatch({type:'start'})} >lets start</button>
      
    </div>
  );
}
