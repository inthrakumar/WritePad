'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { folderContents } from '@/types/types'

const DocPage = () => {
  const url = usePathname()
  const [data, setData] = useState<folderContents | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetch(`/api/foldercontents?folderName=${encodeURIComponent(url)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (fetchedData.ok) {
          const data = await fetchedData.json()
          setData(data)
        } else {
          console.error('Failed to fetch data')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [url])

  return (
    <div>
      <h1>URL: {url}</h1>
      <div>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default DocPage
