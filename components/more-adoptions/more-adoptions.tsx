'use client'

import useMoreAdoptions from '@/hooks/use-more-adoptions'
import React from 'react'
import { Button } from '../ui/button'

type Props = {
  category?: string
}

const MoreAdoptions = (props: Props) => {
  const {moreAdoptions, loadMoreAdoptions} = useMoreAdoptions()
  console.log(moreAdoptions)
  return (
    <div>
      <Button onClick={loadMoreAdoptions}>Load More</Button>
    </div>
  )
}

export default MoreAdoptions