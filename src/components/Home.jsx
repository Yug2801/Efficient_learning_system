// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg- text- py-12 bg-pink-100 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-extrabold mb-4 border ">Create Your Resume with Ease</h1>
        <p className="text-lg mb-8">
          Turn your information into a professional resume template in just a few clicks. Make a lasting impression on your future employers.
        </p>
        <div className="flex space-x-4">
          {/* <Link to="/registration" className="bg-white text-indigo-700 py-2 px-4 rounded-full hover:bg-indigo-700 hover:text-white transition duration-300 border border-black-100 ">
            Create Account
          </Link>
          <Link to="/login" className="bg-white text-indigo-700 py-2 px-4 rounded-full hover:bg-indigo-700 hover:text-white transition duration-300 border border-black-100 ">
            Login
          </Link> */}
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">How it Works</h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            {/* Step 1 */}
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-700 text-white">
                1
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-black-300">
                Sign up for a free account to get started. Your information is secure and confidential.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-700 text-white">
                2
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Fill in Your Details</h3>
              <p className="text-black-300">
                Enter your personal and professional details into our user-friendly form.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-700 text-white">
                3
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Generate Your Resume</h3>
              <p className="text-black-300">
                Click the generate button, and our app will transform your details into a stunning resume template.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
