import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Hits {
  objectID: number
  url: string
  title: string
}
export default function LearnHook() {
  const [data, setData] = useState({ hits: [] as Hits[] })
  const [query, setQuery] = useState('asd')

  useEffect(() => {
    let ignore = false

    async function fetchData () {
      const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query)
      if (!ignore) setData(result.data)
    }

    fetchData()

    return () => {
      ignore = true
    }
  }, [query])

  return (
    <>
      this is learn hook page
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {data.hits.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
