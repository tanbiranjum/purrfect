import React from "react"

import AdoptionPost from "@/components/form/adoption-post"
import getCurrentUser from "../actions/get-current-user"
import { redirect } from "next/navigation"

type Props = {}

const PostAdoptionPage = async (props: Props) => {
  const user = await getCurrentUser()
  if(!user) {
    return redirect('/?login')
  }
  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-3xl">
        <AdoptionPost />
      </div>
    </div>
  )
}

export default PostAdoptionPage
