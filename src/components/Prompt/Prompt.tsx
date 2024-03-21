import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useEffect, useState } from 'react'
import './Prompt.css'
import { useStore } from '@nanostores/react';
import { currentPrompt } from '../../stores/promptStore';

interface Props {
  prompt: string
}
const Prompt = ({ prompt }: Props) => {
  // read the store value with the `useStore` hook
  const $currentPrompt = useStore(currentPrompt);
  useEffect(() => {
    currentPrompt.set(prompt)
  }, [])
  return (
    <section>{$currentPrompt}</section>
  )
}

export default Prompt
