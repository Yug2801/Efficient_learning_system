import React from 'react';

export default function StarttState({numQuestions,dispatch}) {
  return (
    <div className='start' >
        <h2>welcome to learning personality quiz</h2>
        <h3>{numQuestions} questions to check your learning personality type</h3>
        <button className='btn btn-ui' onClick={()=>dispatch({type:'start'})} >lets start</button>
      
    </div>
  );
}
