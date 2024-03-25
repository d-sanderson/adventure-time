import React from 'react'
import ChoiceGroup from '../components/ChoiceGroup/ChoiceGroup'
import Prompt from '../components/Prompt/Prompt'
import { useStore } from '@nanostores/react'
import { keyStore } from '../stores/keyStore'
import { currentPrompt } from '../stores/promptStore'
import { genreStore } from '../stores/genreStore'

const AdventureTime = () => {
  const $keyStore = useStore(keyStore)
  const $genreStore = useStore(genreStore)

  if (
    !$keyStore ||
    !$genreStore
  ) return null

  return (
    <>
      {/* <PromptImage />  */}
      <Prompt />
      <aside>
        <ChoiceGroup />
      </aside>

    </>
  )
}

export default AdventureTime
