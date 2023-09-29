import React from 'react';

export default function FinishedScreen({points,maxPossiblePoints}) {
    const percentage=(points/maxPossiblePoints)*100;
  return (
    <p className='result'>
      you scored <strong>{points}</strong> out of {maxPossiblePoints}
      ({Math.ceil(percentage)}%)
    </p>
  );
}
