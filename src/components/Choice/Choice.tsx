import React from 'react'
import './Choice.css'
import { currentPrompt } from '../../stores/promptStore';
import { useStore } from '@nanostores/react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ChoiceT {
  choice: {
    text: string;
    next: string;
  }
}
const Choice = (props: ChoiceT) => {
  const { choice } = props
  const $currentPrompt = useStore(currentPrompt)
  const genAI = new GoogleGenerativeAI('AIzaSyCMjnrNxmI4zHSIXUroi92qshhyJwsCAN4');

  const fetchData = async (previousPrompt: string, choice: string) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `The player selected ${choice}. Continue the telling the story, the last prompt was ${previousPrompt}. Return at least 2 choices. Continue the story and remember that it takes place in the Meow Wolf universe.
    Explore interesting fantasy elements and themes, such as unique magic systems, mythical creatures, and political intrigue.
    
IMPORTANT: return response in JSON format [{}]
DO NOT INCLUDE BACKTICKS IN THE RESPONSE
sample response: 
{
  "narrative": "creative narrative here",
  "choices": [
    {
      "text": "Choice 1",
      "next": "choice_1"
    },
    {
      "text": "Choice 2",
      "next": "choice_2"
    }
  ]
}
    `

    console.log(prompt)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log({ text: choice })
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
