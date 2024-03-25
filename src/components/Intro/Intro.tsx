import { useStore } from '@nanostores/react'
import './Intro.css'
import { currentPrompt } from '../../stores/promptStore'

const Intro = () => {

  const $promptStore = useStore(currentPrompt)

  if($promptStore) return null
  return (
    <>
      <h1>✨Welcome to Adventure Time!✨</h1>
      <p>
        ✨ Adventure time is a choose your own adventure simulator that leverages
        Gemini Generative AI to craft a compelling custom adventure in the world
        of your choosing!✨
      </p>
      <p>
        1) In order to begin please enter your Gemini API Key. You can get one <a
          href="ai.google.dev">here</a>
      </p>
    </>
  )
}

export default Intro
