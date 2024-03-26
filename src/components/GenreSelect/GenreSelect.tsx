import { useStore } from '@nanostores/react'
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
  if ($promptStore || !$keyStore) return null

  if ($keyStore && $genreStore && !$promptStore) return <p>Loading your story in set in {$genreStore}...</p>
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log((e.target as HTMLButtonElement).value)
    genreStore.set((e.target as HTMLButtonElement).value)
  }
  return (
    <>
      <p>2. Select a genre for your adventure</p>
      <div>
        {genres.map(genre => <Genre key={genre} onClick={handleClick} title={genre} />)}
      </div>
    </>
  )
}

export default GenreSelect
