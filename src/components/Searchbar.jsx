import React from 'react';

function Searchbar() {
  const fetchData = async () => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDq5Bnj_e6KKyCZ7w_VBec_WnBh0gW_sIs");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Write 5 points about project-"${newProjectName}" which we can write in our resume in bullet points ,we want exactly 5 lines only,make more emphasis on technology used,this is our Project Description-${newProjectDescription},modify it accordingly;`

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().split("\n");
      text = text.map((point) => point.replace(/- /, "").trim());

      setNewProjectDescription(text);
    } catch (error) {
      console.error("Error:", error);
     }
    };
  return (
    <div>
      
    </div>
  );
}

export default Searchbar;
