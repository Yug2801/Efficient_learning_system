from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)
# import React, { useState } from 'react';
# import axios from 'axios';

# const QuizApp = () => {
#     const [questions] = useState([
#         "When finding your way, what do you rely on? (Select multiple options)",
#         "To save more money and decide between a range of options, what would you do? (Select multiple options)",
#         "When learning how to play a new board game or card game, what would you do? (Select multiple options)",
#         "When learning from the Internet, what do you prefer? (Select multiple options)",
#         "To find out more about a tour that you're going on, what would you do? (Select multiple options)"
#     ]);

#     // Initialize userResponses state as a 5x4 matrix of zeros
#     const [userResponses, setUserResponses] = useState(Array.from({ length: 5 }, () => Array(4).fill(0)));
#     const [predictedLearningStyle, setPredictedLearningStyle] = useState('');

#     const handleAnswerSelection = (questionIndex, optionIndex) => {
#       setUserResponses(prevResponses => {
#           const newResponses = [...prevResponses];
#           newResponses[questionIndex][optionIndex] = newResponses[questionIndex][optionIndex] === 0 ? 1 : 0; // Toggle the selected option
#           return newResponses;
#       });
#   };
  
#   const handleSubmit = async () => {
#     try {
#         // Flatten the user responses matrix to match the backend format
#         const newResponses = userResponses.flatMap((responses, questionIndex) => (
#             responses.map((response, optionIndex) => (
#                 response // Include only the binary response value
#             ))
#         ));
        
#         const response = await axios.post('http://localhost:5000/api/predict', { user_responses: newResponses });
#         setPredictedLearningStyle(response.data.predicted_learning_style);
#     } catch (error) {
#         console.error('Error submitting quiz:', error);
#     }
# };

#     const renderOptions = (questionIndex) => {
#         return [1, 2, 3, 4].map(optionIndex => (
#             <div key={optionIndex}>
#                 <input type="checkbox" id={option${optionIndex}} onChange={() => handleAnswerSelection(questionIndex, optionIndex - 1)} />
#                 <label htmlFor={option${optionIndex}}>{optionIndex}</label>
#             </div>
#         ));
#     };

#     const renderQuestions = () => {
#         return questions.map((question, index) => (
#             <div key={index}>
#                 <h3>{question}</h3>
#                 {renderOptions(index)}
#             </div>
#         ));
#     };

#     return (
#         <div>
#             <h1>Quiz App</h1>
#             {renderQuestions()}
#             <button onClick={handleSubmit}>Submit</button>
#             {predictedLearningStyle && <p>Predicted learning style: {predictedLearningStyle}</p>}
#         </div>
#     );
# };

# export default QuizApp;
# Load the pretrained model
clf = joblib.load('learning_style_classifier.pkl')

@app.route('/api/predict', methods=['POST'])
def predict_learning_style():
    try:
        data = request.json  # Get JSON data containing user responses
        print(data)
        user_responses = data.get('user_responses', [])  # Extract user responses
        transformed_responses = np.array(user_responses) 
        transformed_responses = transformed_responses.reshape(-1, 4) # Convert responses to NumPy array
        predicted_learning_style = clf.predict(transformed_responses)[0]  # Make prediction
        return jsonify({'predicted_learning_style': predicted_learning_style})
    except Exception as e:
        print("Error predicting learning style:", e)
        return jsonify({'error': 'Internal server error'})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
# import React, { useState } from 'react';
# import axios from 'axios';

# function App() {
#   const [subject, setSubject] = useState('');
#   const [category, setCategory] = useState('');
#   const [level, setLevel] = useState('');

#   const handleSubmit = async (e) => {
#     e.preventDefault();
#     try {
#       await axios.post('http://localhost:5000/feedback', { subject, category, level });
#       console.log('Feedback submitted successfully');
#       // You can add further actions upon successful feedback submission
#     } catch (error) {
#       console.error('Error submitting feedback:', error);
#     }
#   };

#   return (
#     <div className="App">
#       <h1>Feedback Form</h1>
#       <form onSubmit={handleSubmit}>
#         <div>
#           <label htmlFor="subject">Subject:</label>
#           <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
#         </div>
#         <div>
#           <label htmlFor="category">Category:</label>
#           <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
#         </div>
#         <div>
#           <label htmlFor="level">Level:</label>
#           <input type="text" id="level" value={level} onChange={(e) => setLevel(e.target.value)} />
#         </div>
#         <button type="submit">Submit Feedback</button>
#       </form>
#     </div>
#   );
# }

# export default App;