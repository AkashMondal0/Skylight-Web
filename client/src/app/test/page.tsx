import { configs } from '@/configs'
import React from 'react'

const Test = () => {
  return (
    <div>
      {configs.serverApi.baseUrl}
    </div>
  )
}

export default Test
