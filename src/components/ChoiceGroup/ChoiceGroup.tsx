// @ts-nocheck

import { useStore } from '@nanostores/react'
import Choice, { type ChoiceT } from '../Choice/Choice'
import { currentPrompt } from '../../stores/promptStore'

const ChoiceGroup = () => {
  const $currentPrompt = useStore(currentPrompt);

  return (
    <div>{($currentPrompt?.choices as { text: string, next: string }[])?.map(el => <Choice key={el.next} choice={el} />)}</div>
  )
}

export default ChoiceGroup
