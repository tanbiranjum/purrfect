import React from "react"

import AdoptionPost from "@/components/form/adoption-post"

type Props = {}

const PostAdoptionPage = (props: Props) => {
  return (
    <div className="bg-white py-8">
      <div className="max-w-3xl mx-auto">
        <AdoptionPost />
      </div>
    </div>
  )
}

export default PostAdoptionPage
