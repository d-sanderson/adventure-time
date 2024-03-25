import React, { useEffect } from 'react'
import { useStore } from '@nanostores/react'
import Choice from '../Choice/Choice'
import { currentPrompt } from '../../stores/promptStore'

const ChoiceGroup = () => {
  const $currentPrompt = useStore(currentPrompt);

  return (
    <div>{$currentPrompt?.choices?.map(el => <Choice key={el.next} choice={el} />)}</div>
  )
}

export default ChoiceGroup
