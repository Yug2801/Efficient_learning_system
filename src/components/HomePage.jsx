import React from 'react';
import './HomePage.css';

function HomePage({ setHeaderHidden ,setHomeHidden,category,dispatch}) {
  const handleKnowYourLearningType = () => {
    // Call setHeaderHidden with false to show the header
    setHeaderHidden(false);
    setHomeHidden(false);
  };

  const handleLearningTypeSelection = (learningType) => {
    // Handle the selection of learning type here
    category = learningType;
    setHomeHidden(false);
    setHeaderHidden(false);
    dispatch({type:'search'});
  };

  return (
    <div className="homepage">
      <h1>Learn according to you</h1>
      <p>Select your learning type:</p>

      {/* Use individual buttons for each learning type */}
      <div className="learning-type-buttons">
        <button onClick={() => handleLearningTypeSelection('Visual')}>Visual</button>
        <button onClick={() => handleLearningTypeSelection('Verbal')}>Verbal</button>
        <button onClick={() => handleLearningTypeSelection('Auditory')}>Auditory</button>
      </div>
      
      <p>Don't know your learning type?</p>
      {/* Assign handleKnowYourLearningType function to onClick event */}
      <button onClick={handleKnowYourLearningType}>Know your learning type</button>
    </div>
  );
}

export default HomePage;
