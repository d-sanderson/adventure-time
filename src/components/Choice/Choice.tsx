import React from 'react'
import './Choice.css'
import { currentPrompt } from '../../stores/promptStore';
import { choiceStore } from '../../stores/choiceStore';
import { useStore } from '@nanostores/react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ChoiceT {
  text: string;
  next: string;
}
const Choice = ({ choice }: ChoiceT) => {
  const $currentPrompt = useStore(currentPrompt)
  const genAI = new GoogleGenerativeAI('AIzaSyCMjnrNxmI4zHSIXUroi92qshhyJwsCAN4');

  const fetchData = async (previousPrompt: string, choice: ChoiceT) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `The player selected ${choice}. Continue the telling the story, the last prompt was ${previousPrompt}. Return at least 2 choices.
    
    IMPORTANT: return response in JSON format [{}]
DO NOT INCLUDE BACKTICKS IN THE RESPONSE
sample response: 
{
  "narrative": "You stand at the edge of a towering forest, the sunlight dappling through the canopy above. The air is thick with the scent of pine and wildflowers, and the sound of birdsong fills the air. What do you do?",
  "choices": [
    {
      "text": "Step into the forest",
      "next": "forest_entrance"
    },
    {
      "text": "Turn around and head back the way you came",
      "next": "return_to_town"
    }
  ]
}
    `
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log({ text })
    return text
  };

  const handleClick = async () => {
    const response = await fetchData($currentPrompt as string, choice.next)
    console.log(response)
    currentPrompt.set(JSON.parse(response).narrative)
    choiceStore.set(JSON.parse(response).choices)
  }
  return (
    <button className='btn' onClick={handleClick}>{choice.text}</button>
  )
}

export default Choice
