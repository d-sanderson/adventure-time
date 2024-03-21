import React, { useEffect } from 'react'
import { choiceStore } from '../../stores/choiceStore'
import { useStore } from '@nanostores/react'
import Choice from '../Choice/Choice'

const ChoiceGroup = ({ choices }) => {

const $choiceStore = useStore(choiceStore)

useEffect(() => {
  choiceStore.set(choices)
}, [choices])

  return (
    <>
    <div>{$choiceStore.map(el => <Choice choice={el} />)}</div>
    </>
  )
}

export default ChoiceGroup
