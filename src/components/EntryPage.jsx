import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const EntryPage = () => {
  return (
    <div className="entry-page container">
      <h1 className="mt-5">Welcome to Our Learning System</h1>
      <p>Save Time with AI-Powered Prompt Engineering!</p>
      <div className="intro">
        <p>
          Our learning system is designed to streamline your self-learning journey by leveraging cutting-edge AI technologies, specifically through prompt engineering.
        </p>
        <p>
          With our system, you can generate tailored prompts that guide your learning process efficiently, providing you with the right resources and insights precisely when you need them.
        </p>
        <p>
          Whether you're studying a new subject, mastering a skill, or exploring a passion, our AI-powered platform ensures that your time is optimized, allowing you to focus on what truly matters – learning and growth.
        </p>
      </div>
      <div className="get-started-button">
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  );
};

export default EntryPage;
