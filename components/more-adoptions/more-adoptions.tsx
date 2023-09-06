'use client'

import useMoreAdoptions from '@/hooks/use-more-adoptions'
import React from 'react'
import AdoptionCard from '../adoption-listing/adoption-card'
import { Button } from '../ui/button'

type Props = {
  category?: string
}

const MoreAdoptions = (props: Props) => {
  const {moreAdoptions, loadMoreAdoptions} = useMoreAdoptions()
  console.log(moreAdoptions)
  return (
    <div>
      <div className="grid grid-cols-5 gap-6">
            {moreAdoptions?.map((adoption) => (
              <AdoptionCard key={adoption.id} data={adoption} />
            ))}
          </div>
      <Button onClick={loadMoreAdoptions}>Load More</Button>
    </div>
  )
}

export default MoreAdoptions