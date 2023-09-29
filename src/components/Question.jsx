import React from 'react';
import Options from './Options';

export default function Question({questions,index,dispatch,answer}) {
    
    return (
    
    <div>
     <h4>{questions[index].question}</h4>

     <Options question={questions[index]} dispatch={dispatch} answer={answer}/> 

    </div>
  );
}
