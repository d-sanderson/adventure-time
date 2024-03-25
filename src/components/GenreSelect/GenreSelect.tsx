import { useStore } from '@nanostores/react'
import React from 'react'
import { keyStore } from '../../stores/keyStore'
import './GenreSelect.css'
import Genre from '../Genre/Genre'
import { genreStore } from '../../stores/genreStore'

const GenreSelect = () => {
  const $keyStore = useStore(keyStore)
  const $genreStore = useStore(genreStore)
  const genres = [
    'Cyberpunk',
    'Western',
    'Fantasy',
    'Middle Earth',
    'Feudal Japan'
  ]
  if (!$keyStore) return null

  const handleClick = (e) => {
    console.log(e.target.value)
    genreStore.set(e.target.value)
  }
  return (
    <>
      <p>2. Select a genre for your adventure</p>
      <div>
        {genres.map(genre => <Genre onClick={handleClick} title={genre} />)}
      </div>

      {$genreStore && <>
      <p>You selected <span className='highlight'>{$genreStore}</span>. Is that correct?</p>
      <button onClick={() => {
        window.location.href = '/adventure'
      }}>Confirm?</button>
      </>}
    </>
  )
}

export default GenreSelect
