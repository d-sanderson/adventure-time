import React from 'react'
import useGetImageFromPrompt from '../../hooks/useGetImageFromPrompt'

const PromptImage = () => {
  const image = useGetImageFromPrompt()
  console.log(image)
  return (
    image && <img src={image} />
  )
}

export default PromptImage
