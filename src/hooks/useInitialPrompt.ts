// @ts-nocheck

import { useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { currentPrompt } from '../stores/promptStore';
import { prompts } from '../prompts';
import { genreStore } from '../stores/genreStore';
import { useStore } from '@nanostores/react';
import { keyStore } from '../stores/keyStore';

const useInitialPrompt = () => {
  const $genreStore = useStore(genreStore)
  const $keyStore = useStore(keyStore)

  useEffect(() => {
    const fetchInitialPrompt = async () => {
      const genAI = new GoogleGenerativeAI($keyStore); // Assuming you've stored your API key in an environment variable
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompts.initial($genreStore));
      const response = await result.response.text();
      const formattedResponse = JSON.parse(response)
      currentPrompt.set(formattedResponse)
    };
    fetchInitialPrompt();
  }, []); // Run only once on component mount
};

export default useInitialPrompt;
