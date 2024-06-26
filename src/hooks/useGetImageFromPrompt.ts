// @ts-nocheck


import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { currentPrompt } from '../stores/promptStore'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { keyStore } from '../stores/keyStore'

const useGetImageFromPrompt = () => {
  // pull in current prompt
  // useEffect that listens when current prop changes and set the new image
  const $currentPrompt = useStore(currentPrompt)

  const $keyStore = useStore(keyStore)

  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchPromptImage = async () => {
      const genAI = new GoogleGenerativeAI($keyStore); // Assuming you've stored your API key in an environment variable
      const model = genAI.getGenerativeModel({ model: "gemini-pro-version" });
      const narrative = $currentPrompt?.narrative
      const result = await model.generateContent([narrative]);
      console.log(result.response.text());
      setImage(result.response.text())
    };
    fetchPromptImage()
  }, [$currentPrompt])

  return image
}

export default useGetImageFromPrompt
