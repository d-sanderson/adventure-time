import './Choice.css'
import { currentPrompt } from '../../stores/promptStore';
import { useStore } from '@nanostores/react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prompts } from '../../prompts';
import { keyStore } from '../../stores/keyStore';
import { genreStore } from '../../stores/genreStore';

export interface ChoiceT {
  choice: {
    text: string;
    next: string;
  }
}
const Choice = (props: ChoiceT) => {
  const { choice } = props
  const $currentPrompt = useStore(currentPrompt)
  const $keyStore = useStore(keyStore)
  const $genreStore = useStore(genreStore)

  const genAI = new GoogleGenerativeAI($keyStore);

  const fetchData = async (previousPrompt: string, choice: string) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = prompts.choice(choice, previousPrompt, $genreStore)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
  };

  const handleClick = async () => {
    const response = await fetchData($currentPrompt, choice.text)
    currentPrompt.set(JSON.parse(response))
  }
  return (
    <button className='btn' onClick={handleClick}>{props.choice.text}</button>
  )
}

export default Choice
