import { useStore } from '@nanostores/react'
import React from 'react'
import { keyStore } from '../../stores/keyStore'
import './GenreSelect.css'
import Genre from '../Genre/Genre'
import { genreStore } from '../../stores/genreStore'
import { currentPrompt } from '../../stores/promptStore'

const GenreSelect = () => {
  const $keyStore = useStore(keyStore)
  const $genreStore = useStore(genreStore)
  const $promptStore = useStore(currentPrompt)
  const genres = [
    'Cyberpunk',
    'Western',
    'Fantasy',
    'Middle Earth',
    'Feudal Japan',
    'Meow Wolf'
  ]
  if (!$keyStore || $genreStore) return null

  if($keyStore && $genreStore && !$promptStore) return <p>Loading</p>
  const handleClick = (e) => {
    console.log(e.target.value)
    genreStore.set(e.target.value)
  }
  return (
    <>
      <p>2. Select a genre for your adventure</p>
      <div>
        {genres.map(genre => <Genre key={genre} onClick={handleClick} title={genre} />)}
      </div>

      {$genreStore && <>
      <p>You selected <span className='highlight'>{$genreStore}</span>. Is that correct?</p>
      <button onClick={() => {
        // window.location.href = '/adventure'
      }}>Confirm?</button>
      </>}
    </>
  )
}

export default GenreSelect
