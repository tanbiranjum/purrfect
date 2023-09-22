import React from "react"
import Image from "next/image"
import Link from "next/link"

import { SafeAdoptionListing } from "@/app/types/index"

import { AspectRatio } from "../ui/aspect-ratio"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Label } from "../ui/label"
import AdoptionDeleteButton from "./adoption-delete-button"
import { timeFromNow } from "@/lib/utils"

export interface AdoptionCardProps {
  data: SafeAdoptionListing
  actionButton?: boolean
}

const AdoptionCard: React.FC<AdoptionCardProps> = ({
  data,
  actionButton = false,
}) => {
  return (
    <Link href={`/adoption/${data.id}`} className="block">
      {/* New Card */}
      <Card>
        <CardHeader>
          <CardTitle>{data.pet.name}</CardTitle>
          <CardDescription>
            Posted on: {timeFromNow(data.createdAt.toLocaleString())}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <Image
              src={data.pet.imageSrc || ""}
              alt={data.pet.name || "pet image"}
              className="w-full rounded-md"
              width={100}
              height={100}
            />
          </AspectRatio>
        </CardContent>
        <CardFooter className="flex gap-2 flex-wrap">
          <Badge variant="secondary">{data.pet.gender}</Badge>
          <Badge variant="secondary">{data.pet.age} years</Badge>
          <Badge variant="secondary">
            {data.adopted ? "Adopted" : "Not Adopted"}
          </Badge>
          {actionButton && (
            <div className="top-4">
              <AdoptionDeleteButton
                id={data.id}
                applicantId={data.applicant.id}
              />
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}

export default AdoptionCard
