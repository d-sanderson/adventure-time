// @ts-nocheck

import './Prompt.css'
import { useStore } from '@nanostores/react';
import { currentPrompt } from '../../stores/promptStore';
import useInitialPrompt from '../../hooks/useInitialPrompt';

const Prompt = () => {
  useInitialPrompt()
  const $currentPrompt = useStore(currentPrompt)
  const narrative: string | undefined = $currentPrompt?.narrative

  return (
    <section>{narrative}</section>
  )
}

export default Prompt
