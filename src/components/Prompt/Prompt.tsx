import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useEffect, useState } from 'react'
import './Prompt.css'
import { useStore } from '@nanostores/react';
import { currentPrompt } from '../../stores/promptStore';
import useInitialPrompt from '../../hooks/useInitialPrompt';

interface Props {
  prompt: string
}
const Prompt = () => {
  useInitialPrompt()
  // read the store value with the `useStore` hook
  const $currentPrompt = useStore(currentPrompt);


  return (
    <section>{$currentPrompt?.narrative}</section>
  )
}

export default Prompt
