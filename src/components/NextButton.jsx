import React from 'react';

export default function NextButton({dispatch,answer,index,numQuestions,state,sendPointsToBackend,setCategory}) {
  return (
    (answer!=null && index<numQuestions-1)?
    <button className='btn btn-ui' onClick={()=>dispatch({type:'inc'})}>
      Next
    </button>:answer!=null? <button className='btn btn-ui' onClick={()=>dispatch({type:'finish',payload:{setCategory}})}>
      submit
    </button>:<></>
  );
}
