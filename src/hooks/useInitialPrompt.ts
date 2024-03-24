import { useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { currentPrompt } from '../stores/promptStore';
import { prompts } from '../prompts';

const useInitialPrompt = () => {
  useEffect(() => {
    const fetchInitialPrompt = async () => {
      const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_API_KEY); // Assuming you've stored your API key in an environment variable
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompts.initial);
      const response = await result.response.text();
      const formattedResponse = JSON.parse(response)
      currentPrompt.set(formattedResponse)
    };
    fetchInitialPrompt();
  }, []); // Run only once on component mount
};

export default useInitialPrompt;
