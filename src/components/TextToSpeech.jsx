// TextToSpeech.js

import React, { useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const TextToSpeech = ({ text }) => {
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    if (text) {
      speak({ text });
    }
  }, [text, speak]);

  return null; // This component doesn't render anything visible
};

export default TextToSpeech;