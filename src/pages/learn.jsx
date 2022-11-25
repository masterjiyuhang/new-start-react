import { useState } from 'react'

const Learn = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Learn</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

export default Learn
