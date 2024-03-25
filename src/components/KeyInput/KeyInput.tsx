import { keyStore } from '../../stores/keyStore'
import { useStore } from '@nanostores/react'
import './KeyInput.css'

const KeyInput = () => {
  const $keyStore = useStore(keyStore)

  const handleReset = () => {
    keyStore.set(null)
  }
  if ($keyStore) {
    return (
      <>
        <p>Your key is <span className='highlight'>{$keyStore}</span>. Is that correct?
        {' '}<span className='highlight' onClick={handleReset}>Reset?</span></p>
      </>
    )
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const data = new FormData(e.target);
      keyStore.set(data.get('key'))
    }}>
      <input name="key" type='text' placeholder='Enter your Gemini API Key' />
      <button>Submit</button>
    </form>
  )
}

export default KeyInput
