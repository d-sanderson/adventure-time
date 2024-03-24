import React from 'react'
import './Choice.css'
import { currentPrompt } from '../../stores/promptStore';
import { useStore } from '@nanostores/react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prompts } from '../../prompts';

export interface ChoiceT {
  choice: {
    text: string;
    next: string;
  }
}
const Choice = (props: ChoiceT) => {
  const { choice } = props
  const $currentPrompt = useStore(currentPrompt)
  const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_API_KEY);

  const fetchData = async (previousPrompt: string, choice: string) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = prompts.choice(choice, previousPrompt)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
  };

  const handleClick = async () => {
    const response = await fetchData($currentPrompt as string, choice.text)
    currentPrompt.set(JSON.parse(response))
  }
  return (
    <button className='btn' onClick={handleClick}>{props.choice.text}</button>
  )
}

export default Choice
