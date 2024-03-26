import React from 'react'


interface Props {
  title: string
  onClick: (e: any) => void
}

const Genre = ({ title, onClick }: Props) => {
  return (
    <button value={title} onClick={(e) => onClick(e)}>{title}</button>
  )
}

export default Genre
