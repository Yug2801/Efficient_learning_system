import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./ChatBot.css";
import axios from 'axios';
import TextToSpeech from "./TextToSpeech";

var category = 0;

var categoryy= 'verbal';
function ChatBot({categor,setCategory}) {
  
const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [selectedValue, setSelectedValue] = useState(0);
  const [personType, setpersontype] = useState("");
  const [level, setlevel] = useState(0);
  const [chats, setChats] = useState([]);
  const [saved, setsaved] = useState("");
  const [curr, setcurr] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const API_KEY = "AIzaSyDq5Bnj_e6KKyCZ7w_VBec_WnBh0gW_sIs"
  const [subject,setSubject] = useState('Science')
  const prompts =[
    [ // Auditory
        [ // point-wise
            [ // Beginner
                `Illustrate the foundational concepts of ${topic} using analogies and simple explanations to make complex ideas more accessible.`,
                `Provide a beginner-friendly overview of ${topic}, emphasizing practical relevance and real-life applications to engage learners.`,
                `Describe the basic principles of ${topic} using clear and concise language, ensuring that beginners can follow along easily.`
            ],
            [ // Intermediate
                `Discuss the practical implications of ${topic} in various contexts, drawing connections between theory and real-world practice.`,
                `Examine the underlying principles of ${topic} and their significance in solving complex problems across different domains.`,
                `Explore the interdisciplinary aspects of ${topic}, exploring its connections with diverse fields and disciplines.`
            ],
            [ // Advanced
                `Delve into the advanced theories and methodologies of ${topic}, exploring cutting-edge research and developments.`,
                `Discuss the cutting-edge developments in ${topic}, exploring emerging technologies and their potential impact on the field.`,
                `Analyze the advanced theories and methodologies of ${topic}, providing critical insights into its applications and limitations.`
            ]
        ],
        [ // with example
            [ // Beginner
                `Explain the basic principles of ${topic} using everyday language and relatable examples to aid comprehension.`,
                `Break down the key components of ${topic} into bite-sized pieces, making it easy for beginners to grasp the core concepts.`,
                `Provide a beginner-friendly overview of ${topic}, emphasizing practical relevance and real-life applications to engage learners.`
            ],
            [ // Intermediate
                `Discuss the practical implications of ${topic} in various contexts, drawing connections between theory and real-world practice.`,
                `Examine the underlying principles of ${topic} and their significance in solving complex problems across different domains.`,
                `Explore the interdisciplinary aspects of ${topic}, exploring its connections with diverse fields and disciplines.`
            ],
            [ // Advanced
                `Critically evaluate the current state of ${topic}, discussing emerging trends and challenges in the field.`,
                `Synthesize the latest advancements in ${topic}, presenting a comprehensive overview of current research directions and future prospects.`,
                `Analyze the advanced theories and methodologies of ${topic}, providing critical insights into its applications and limitations.`
            ]
        ],
        [ // storytelling
            [ // Beginner
                `Engage beginners by narrating a story that illustrates the foundational concepts of ${topic}, making learning enjoyable and memorable.`,
                `Tell a story that simplifies the understanding of ${topic} for beginners, using clear language and relatable examples.`,
                `Narrate a story that highlights the practical applications of ${topic} in everyday life, helping beginners connect with the subject.`
            ],
            [ // Intermediate
                `Weave a narrative around ${topic} to demonstrate its relevance and practical significance, helping learners understand its real-world implications.`,
                `Engage learners by narrating a story that showcases the interdisciplinary nature of ${topic}, highlighting its connections with diverse fields.`,
                `Tell a story that explores the historical context of ${topic}, tracing its development over time and its impact on society.`
            ],
            [ // Advanced
                `Craft a compelling narrative that delves into the ethical dilemmas associated with ${topic}, prompting reflection and critical thinking.`,
                `Tell a story that imagines the future possibilities of ${topic}, exploring potential advancements and their implications for humanity.`,
                `Narrate a story that examines the role of ${topic} in addressing global challenges, inspiring listeners to consider its broader impact.`
            ]
        ]
    ],
    [ // Visual
        [ // point-wise
            [ // Beginner
                `Explain the basic principles of ${topic} using everyday language and relatable examples to aid comprehension.`,
                `Break down the key components of ${topic} into bite-sized pieces, making it easy for beginners to grasp the core concepts.`,
                `Provide a beginner-friendly overview of ${topic}, emphasizing practical relevance and real-life applications to engage learners.`
            ],
            [ // Intermediate
                `Explore the core principles and applications of ${topic}, emphasizing its role in different fields and industries.`,
                `Discuss the practical implications of ${topic} in various contexts, drawing connections between theory and real-world practice.`,
                `Examine the underlying principles of ${topic} and their significance in solving complex problems across different domains.`
            ],
            [ // Advanced
                `Delve into the advanced theories and methodologies of ${topic}, exploring cutting-edge research and developments.`,
                `Critically evaluate the current state of ${topic}, discussing emerging trends and challenges in the field.`,
                `Explore the frontier of ${topic} research, addressing unresolved questions and proposing innovative solutions.`
            ]
        ],
        [ // with example
            [ // Beginner
                `Introduce the fundamental concepts of ${topic} in a straightforward manner, focusing on building a solid understanding from the ground up.`,
                `Provide an introductory overview of ${topic}, covering the basics in a way that is engaging and easy to follow.`,
                `Explain the core principles of ${topic} in plain language, focusing on practical insights and everyday applications.`
            ],
            [ // Intermediate
                `Discuss the core principles and applications of ${topic}, emphasizing its role in modern society and industry.`,
                `Analyze the key components and methodologies of ${topic}, highlighting its importance in driving innovation and progress.`,
                `Explore the interdisciplinary nature of ${topic}, investigating its connections with related fields and disciplines.`
            ],
            [ // Advanced
                `Synthesize the latest advancements in ${topic}, presenting a comprehensive overview of current research directions and future prospects.`,
                `Analyze the advanced theories and methodologies of ${topic}, providing critical insights into its applications and limitations.`,
                `Examine the theoretical foundations of ${topic} in depth, discussing recent advancements and their implications.`
            ]
        ],
        [ // storytelling
            [ // Beginner
                `Provide a beginner-friendly overview of ${topic} through a storytelling approach, engaging learners with relatable narratives.`,
                `Narrate a simple story illustrating the application of ${topic} in real-life scenarios, making it easier for beginners to understand.`,
                `Tell a story that highlights the importance of ${topic} in solving everyday problems, capturing the interest of beginner learners.`
            ],
            [ // Intermediate
                `Weave a narrative around ${topic} to demonstrate its relevance and practical significance, helping learners understand its real-world implications.`,
                `Engage learners by narrating a story that showcases the interdisciplinary nature of ${topic}, highlighting its connections with diverse fields.`,
                `Tell a story that explores the historical context of ${topic}, tracing its development over time and its impact on society.`
            ],
            [ // Advanced
                `Craft a compelling narrative that delves into the ethical dilemmas associated with ${topic}, prompting reflection and critical thinking.`,
                `Tell a story that imagines the future possibilities of ${topic}, exploring potential advancements and their implications for humanity.`,
                `Narrate a story that examines the role of ${topic} in addressing global challenges, inspiring viewers to consider its broader impact.`
            ]
        ]
    ],
    [ // Verbal
        [ // point-wise
            [ // Beginner
                `Explain the basic principles of ${topic} using everyday language and relatable examples to aid comprehension.`,
                `Break down the key components of ${topic} into bite-sized pieces, making it easy for beginners to grasp the core concepts.`,
                `Provide a beginner-friendly overview of ${topic}, emphasizing practical relevance and real-life applications to engage learners.`
            ],
            [ // Intermediate
                `Discuss the practical implications of ${topic} in various contexts, drawing connections between theory and real-world practice.`,
                `Examine the underlying principles of ${topic} and their significance in solving complex problems across different domains.`,
                `Explore the interdisciplinary aspects of ${topic}, exploring its connections with diverse fields and disciplines.`
            ],
            [ // Advanced
                `Delve into the advanced theories and methodologies of ${topic}, exploring cutting-edge research and developments.`,
                `Critically evaluate the current state of ${topic}, discussing emerging trends and challenges in the field.`,
                `Explore the frontier of ${topic} research, addressing unresolved questions and proposing innovative solutions.`
            ]
        ],
        [ // with example
            [ // Beginner
                `Introduce the fundamental concepts of ${topic} in a straightforward manner, focusing on building a solid understanding from the ground up.`,
                `Provide an introductory overview of ${topic}, covering the basics in a way that is engaging and easy to follow.`,
                `Explain the core principles of ${topic} in plain language, focusing on practical insights and everyday applications.`
            ],
            [ // Intermediate
                `Discuss the core principles and applications of ${topic}, emphasizing its role in modern society and industry.`,
                `Analyze the key components and methodologies of ${topic}, highlighting its importance in driving innovation and progress.`,
                `Explore the interdisciplinary nature of ${topic}, investigating its connections with related fields and disciplines.`
            ],
            [ // Advanced
                `Synthesize the latest advancements in ${topic}, presenting a comprehensive overview of current research directions and future prospects.`,
                `Analyze the advanced theories and methodologies of ${topic}, providing critical insights into its applications and limitations.`,
                `Examine the theoretical foundations of ${topic} in depth, discussing recent advancements and their implications.`
            ]
        ],
        [ // storytelling
            [ // Beginner
                `Provide a beginner-friendly overview of ${topic} through a storytelling approach, engaging learners with relatable narratives.`,
                `Narrate a simple story illustrating the application of ${topic} in real-life scenarios, making it easier for beginners to understand.`,
                `Tell a story that highlights the importance of ${topic} in solving everyday problems, capturing the interest of beginner learners.`
            ],
            [ // Intermediate
                `Weave a narrative around ${topic} to demonstrate its relevance and practical significance, helping learners understand its real-world implications.`,
                `Engage learners by narrating a story that showcases the interdisciplinary nature of ${topic}, highlighting its connections with diverse fields.`,
                `Tell a story that explores the historical context of ${topic}, tracing its development over time and its impact on society.`
            ],
            [ // Advanced
                `Craft a compelling narrative that delves into the ethical dilemmas associated with ${topic}, prompting reflection and critical thinking.`,
                `Tell a story that imagines the future possibilities of ${topic}, exploring potential advancements and their implications for humanity.`,
                `Narrate a story that examines the role of ${topic} in addressing global challenges, inspiring viewers to consider its broader impact.`
            ]
        ]
    ]
]

  const options = ["point-wise", "storytelling", "with example"]; // Define options for the dropdown

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vars = await axios.post('http://localhost:5000/feedback', { subject, categor, level });
      setlevel(vars.data.level);
      setSubject(vars.data.subject);
      categoryy = vars.data.category;
      setCategory(vars.data.category);

      // You can add further actions upon successful feedback submission
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        if (chats.length > 0 ) {
          setcurr(chats[chats.length - 1].content);
      } else {
          setcurr(saved);
      }
      

    console.log(prompts[category][selectedValue][level]);
    console.log(category);
    console.log(level);
    console.log(message);
      const prompt = prompts[category][selectedValue][level][0];
      


        setsaved(curr);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textt = response.text().split("\n").join("");
        const text = textt.replace(/\*{2,}|\(\)|\[\]/g, ''); // Remove consecutive asterisks and empty brackets

  



        let msgs = [...chats]; // Copying the array to avoid mutating state directly
        msgs.push({ role: "ai", content: text });
        setChats(msgs);
        setIsTyping(false);
        window.scrollTo(0, document.body.scrollHeight);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (isTyping) {
      fetchData();
    }
  }, [isTyping, chats, selectedValue, personType]); // Added 'selectedValue' as a dependency

  const chat = (e, message) => {
    e.preventDefault();
    handleSubmit(e);
    if (!message) return;
    setIsTyping(true);
    let msgs = [...chats]; // Copying the array to avoid mutating state directly
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    setMessage("");
  };

  return (
    <main>
      <h1>Chat AI Tutorial</h1>

      <section className="white-text proper-spacing">
        {chats.map((chat, index) => (
          <p key={index} className={chat.role === 'user' ? 'user-msg' : 'ai-msg'}>
            <span className="role">{chat.role.toUpperCase()}</span>
            <span className="separator">:</span>
            <span className="content">{chat.content}</span>
          </p>
        ))}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing..." : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
      <div className="input-wrapper">
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => {setMessage(e.target.value);setTopic(e.target.value);console.log(message);}}
        />
        <div className="custom-dropdown">
          <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
            <div className="selected-value">{selectedValue}</div>
            <div className="dropdown-arrow">&#9660;</div>
          </div>
          {isOpen && (
            <div className="dropdown-options">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-option"
                  onClick={() => setSelectedValue(index)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="chat-buttons">
          <button className="visual-button" onClick={()=>{setlevel(0);setIsTyping(true);console.log(personType);}}>beginner</button>
          <button className="auditory-button" onClick={()=>{setlevel(1);setIsTyping(true);console.log(personType);}}>intermediate</button>
          <button className="kinesthetic-button" onClick={()=>{setlevel(2);setIsTyping(true);console.log(personType);}}>advanced</button>
        </div>

        <div className="chat-buttons">
          <button className="visual-button" onClick={()=>{setpersontype(1);setIsTyping(true);console.log(personType);}}>Visual</button>
          <button className="auditory-button" onClick={()=>{setpersontype(0);setIsTyping(true);console.log(personType);}}>Auditory</button>
          <button className="verbal-button" onClick={()=>{setpersontype(2);setIsTyping(true);console.log(personType);}}>Verbal</button>
        </div>
        
      </form>
    </main>
  );
}

export default ChatBot;
