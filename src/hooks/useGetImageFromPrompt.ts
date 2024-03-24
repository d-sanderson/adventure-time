import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { currentPrompt } from '../stores/promptStore'
import { GoogleGenerativeAI } from '@google/generative-ai'

const useGetImageFromPrompt = () => {
  // pull in current prompt
  // useEffect that listens when current prop changes and set the new image
  const $currentPrompt = useStore(currentPrompt)

  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchPromptImage = async () => {
      const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_API_KEY); // Assuming you've stored your API key in an environment variable
      const model = genAI.getGenerativeModel({ model: "gemini-pro-version" });

      const result = await model.generateContent([$currentPrompt?.narrative]);
      console.log(result.response.text());
      setImage(result.response.text())
    };
    fetchPromptImage()
  }, [$currentPrompt])

  return image
}

export default useGetImageFromPrompt
